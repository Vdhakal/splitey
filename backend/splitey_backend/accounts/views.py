from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer
from .models import User

class UserRegistrationAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response({
            "user": serializer.data,
            "message": "User registered successfully!"
        }, status=status.HTTP_201_CREATED, headers=headers)


# login api
class UserLoginAPIView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={"request": request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        tokens = serializer.get_tokens_for_user(user)

        return Response({
            "tokens": tokens,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email
            },
            "message": "Login successful!"
        }, status=status.HTTP_200_OK)