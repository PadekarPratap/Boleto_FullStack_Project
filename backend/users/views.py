from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer

from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.
class SignUpView(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.filter(email=data["email"])
        if user.exists():
            return Response(
                {"message": "User already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
        user_serializer = UserSerializer(data=data)
        if user_serializer.is_valid():
            user_serializer.save()
            return Response(
                {"message": "User created successfully", "data": user_serializer.data},
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {
                "message": "User could not be created",
                "errors": user_serializer.errors,
            },
            status=status.HTTP_201_CREATED,
        )


class LoginView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.get(email=data["email"])
            if user:
                isValidPassword = user.check_password(data["password"])
                if isValidPassword:
                    user_serializer = UserSerializer(user)
                    refresh_token = RefreshToken.for_user(user=user)
                    return Response(
                        {
                            "message": "User logged in successfully!",
                            "data": user_serializer.data,
                            "refresh_token": str(refresh_token),
                            "access_token": str(refresh_token.access_token),
                        },
                        status=status.HTTP_200_OK,
                    )
        except:
            return Response(
                {"message": "Invalid credentials. Please try again"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class GenerateToken(APIView):
    def post(self, request):
        data = request.data
        try:
            refresh_token = RefreshToken(data["refresh_token"])
            access_token = refresh_token.access_token
            return Response(
                {
                    "message": "Access Token generated successfully!",
                    "access_token": str(access_token),
                }
            )
        except:
            return Response(
                {
                    "message": "Invalid refresh token. Please try again",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
