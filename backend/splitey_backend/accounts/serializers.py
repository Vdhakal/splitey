from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'full_name', 'email', 'password')

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            full_name=validated_data['full_name']
        )
        user.set_password(validated_data['password'])  # <-- Crucial method
        user.save()
        return user


# user login serializer
class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Use custom auth method to support email login
        user = authenticate(request=self.context.get('request'), email=email, password=password)

        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled.")

        data['user'] = user
        return data

    def get_tokens_for_user(self, user):
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }