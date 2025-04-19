from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import UserRegisterSerializer
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
