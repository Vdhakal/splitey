# accounts/authentication.py
from firebase_admin import auth as firebase_auth, credentials, initialize_app
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings
from .models import User

import firebase_admin

if not firebase_admin._apps:
    cred = credentials.Certificate("accounts/firebase.json")  # ⬅️ download from Firebase Console
    initialize_app(cred)

class FirebaseAuthentication(BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        id_token = auth_header.split(' ')[1]

        try:
            decoded_token = firebase_auth.verify_id_token(id_token)
        except Exception as e:
            raise AuthenticationFailed(f"Invalid Firebase token: {str(e)}")

        email = decoded_token.get('email')
        uid = decoded_token.get('uid')
        full_name = decoded_token.get('name', email)

        user, created = User.objects.get_or_create(email=email, defaults={
            'full_name': full_name,
            'is_active': True
        })

        return (user, None)
