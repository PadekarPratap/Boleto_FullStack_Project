from django.urls import path
from .views import *

urlpatterns = [
    path("movies/", MovieListView.as_view()),
    path("movies/<int:movie_pk>/", MovieDetailView.as_view()),
    path("tickets/", TicketListView.as_view()),
    path("tickets/<int:user_pk>/", TicketByUserView.as_view()),
    path("theatres/", TheatreListView.as_view()),
    path("theatres/<int:movie_pk>/", TheatreByMovieView.as_view()),
    path("seats/", SeatListView.as_view()),
    path("bookings/", BookingListView.as_view()),
]
