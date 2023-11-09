from rest_framework import viewsets
import django
from rest_framework import permissions
from .models import JournalStyle, Label, JournalEntry, Profile, UserFeedbackManager
from .serializers import (
    JournalStyleSerializer,
    LabelSerializer,
    JournalEntrySerializer,
    ProfileSerializer,
    UserFeedbackManagerSerializer,
)

from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers


class JournalStyleViewSet(viewsets.ModelViewSet):
    queryset = JournalStyle.objects.all()
    serializer_class = JournalStyleSerializer
    permission_classes = [permissions.IsAuthenticated]


class LabelViewSet(viewsets.ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    permission_classes = [permissions.IsAuthenticated]


class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


class UserFeedbackManagerViewSet(viewsets.ModelViewSet):
    queryset = UserFeedbackManager.objects.all()
    serializer_class = UserFeedbackManagerSerializer


class UserJournalEntriesViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return JournalEntry.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except serializers.ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except django.db.utils.IntegrityError:
            raise serializers.ValidationError(
                {"error": "A journal entry with the same title already exists."}
            )


class UserLabelViewSet(viewsets.ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter the queryset to retrieve journal entries for the current user
        user = self.request.user
        return Label.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Set the user to the authenticated user before saving
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
