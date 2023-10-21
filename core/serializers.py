from store.models import Customer
from djoser.serializers import (
    UserSerializer as BaseUserSerializer,
    UserCreateSerializer as BaseUserCreateSerializer,
)
from .models import User


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model: User
        fields = ["id", "username", "password", "email", "first_name", "last_name"]


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model: User
        fields = ["id", "username", "email", "first_name", "last_name"]


class CustomUserCreateSerializer(UserCreateSerializer):
    def create(self, validated_data):
        user = self.Meta.model.objects.create_user(**validated_data)
        return user
