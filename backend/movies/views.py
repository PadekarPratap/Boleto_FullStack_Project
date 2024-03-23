from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly,
    IsAuthenticated,
    IsAdminUser,
    BasePermission,
    SAFE_METHODS,
)

from .models import *
from .serializers import *
from users.models import User
from users.serializer import UserSerializer


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class MovieListView(APIView):
    permission_classes = [ReadOnly | IsAdminUser]

    def get(self, request):
        name = request.GET.get("name", None)
        genre = request.GET.get("genre", None)
        language = request.GET.get("language", None)
        rating = request.GET.get("rating", None)
        movies = Movie.objects.all()
        if name:
            movies = movies.filter(name__icontains=name)
        if genre:
            movies = movies.filter(genre__icontains=genre)
        if language:
            movies = movies.filter(language__icontains=language)
        if rating:
            movies = movies.filter(rating__iexact=rating)
        movie_serializer = MovieSerializer(movies, many=True)
        return Response(
            {"message": "Movies fetched successfully", "data": movie_serializer.data},
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        movie_serializer = MovieSerializer(data=request.data)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return Response(
                {"message": "Movie added successfully", "data": movie_serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"message": "Movie could not be added", "errors": movie_serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


class MovieDetailView(APIView):
    permission_classes = [ReadOnly | IsAdminUser]

    def get_object(self, movie_pk):
        try:
            return Movie.objects.get(id=movie_pk)
        except Movie.DoesNotExist:
            raise Http404

    def get(self, request, movie_pk):
        movie = self.get_object(movie_pk)
        movie_serializer = MovieSerializer(movie)
        return Response(
            {"message": "Movie fetched successfully", "data": movie_serializer.data},
            status=status.HTTP_200_OK,
        )

    def put(self, request, movie_pk):
        movie = self.get_object(movie_pk)
        movie_serializer = MovieSerializer(movie, data=request.data, partial=True)
        if movie_serializer.is_valid():
            movie_serializer.save()
            return Response(
                {
                    "message": "Movie updated successfully",
                    "data": movie_serializer.data,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {
                "message": "Movie could not be updated",
                "errors": movie_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def delete(self, request, movie_pk):
        movie = self.get_object(movie_pk=movie_pk)
        movie_serializer = MovieSerializer(movie)
        movie.delete()
        return Response(
            {"message": "Movie deleted successfully", "data": movie_serializer.data},
            status=status.HTTP_200_OK,
        )


class TheatreListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        theatres = Theatre.objects.all()
        theatre_serializer = TheatreSerializer(theatres, many=True)
        return Response(
            {
                "message": "Theatres fetched successfully",
                "data": theatre_serializer.data,
            }
        )

    def post(self, request):
        theatre_serializer = TheatreSerializer(data=request.data)
        if theatre_serializer.is_valid():
            theatre_serializer.save()
            return Response(
                {
                    "message": "Theatre added successfully",
                    "data": theatre_serializer.data,
                }
            )
        return Response(
            {
                "message": "Theatre could not be added",
                "errors": theatre_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class TheatreByMovieView(APIView):
    def get(self, request, movie_pk):
        print("Hello world")
        try:
            movie = Movie.objects.get(id=movie_pk)
        except Movie.DoesNotExist:
            return Response(
                {
                    "message": "Movie not found",
                }
            )
        theatres = Theatre.objects.filter(movies__in=[movie])
        theatre_serializer = TheatreSerializer(theatres, many=True)
        return Response(
            {
                "message": "Theatres fetched successfully",
                "data": theatre_serializer.data,
            }
        )


class TicketListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickets = Ticket.objects.all()
        ticket_serializer = TicketSerializer(tickets, many=True)
        return Response(
            {
                "message": "Tickets fetched successfully",
                "data": ticket_serializer.data,
            }
        )

    def post(self, request):
        ticket_serializer = TicketSerializer(data=request.data)
        if ticket_serializer.is_valid():
            ticket_serializer.save()
            return Response(
                {
                    "message": "Ticket added successfully",
                    "data": ticket_serializer.data,
                }
            )
        return Response(
            {
                "message": "Ticket could not be added",
                "errors": ticket_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class TicketByUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, user_pk):
        tickets = Ticket.objects.filter(user=user_pk)
        user = User.objects.get(id=user_pk)
        user_serializer = UserSerializer(user)
        ticket_serializer = TicketSerializer(tickets, many=True)
        return Response(
            {
                "message": "Tickets for the user fetched successfully",
                "data": ticket_serializer.data,
                "user": user_serializer.data,
            }
        )


class SeatListView(APIView):
    # permission_classes = [ReadOnly | IsAdminUser]

    def get(self, request):
        theatre_id = request.GET.get("theatre", None)
        movie_id = request.GET.get("movie", None)
        seats = Seat.objects.all()
        if theatre_id:
            seats = seats.filter(theatre=theatre_id)
        if movie_id:
            seats = seats.filter(movie=movie_id)
        seat_serializer = SeatSerializer(seats, many=True)
        return Response(
            {
                "message": "Seats fetched successfully",
                "data": seat_serializer.data,
            }
        )

    def post(self, request):
        seat_serializer = SeatSerializer(data=request.data, many=True)
        if seat_serializer.is_valid():
            seat_serializer.save()
            return Response(
                {
                    "message": "Seat added successfully",
                    "data": seat_serializer.data,
                }
            )
        return Response(
            {
                "message": "Seat could not be added",
                "errors": seat_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )


class BookingListView(APIView):
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.GET.get("user", None)
        bookings = Booking.objects.all()
        if user_id:
            bookings = bookings.filter(user=user_id)
        booking_serializer = BookingSerializer(bookings, many=True)
        return Response(
            {
                "message": "Bookings fetched successfully",
                "data": booking_serializer.data,
            }
        )

    def post(self, request):
        booking_serializer = BookingSerializer(data=request.data)
        if booking_serializer.is_valid():
            booking_serializer.save()
            return Response(
                {
                    "message": "Booking added successfully",
                    "data": booking_serializer.data,
                }
            )
        return Response(
            {
                "message": "Booking could not be added",
                "errors": booking_serializer.errors,
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
