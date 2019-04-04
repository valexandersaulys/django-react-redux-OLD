from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer
    
    def post(self, request, *args, **kwargs):
        """When posting, we want to create a new user"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)  # check that data is good
        user = serializer.save()  # django automatically hashes the password
        _, user_token = AuthToken.objects.create(user)  # annoying change from tutorial
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context).data,
            "token": user_token # return a token for auth use in header
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True) 
        user = serializer.validated_data
        _, user_token = AuthToken.objects.create(user) 
        return Response({
            "user": UserSerializer(user,context=self.get_serializer_context).data,
            "token": user_token 
        })


class UserAPI(generics.RetrieveAPIView):
    """This will give us user auth info given a valid token"""
    permission_classes = [
        permissions.IsAuthenticated,  # check to see we're authenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user



