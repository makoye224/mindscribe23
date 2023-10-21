from rest_framework import viewsets
from .models import JournalStyle, Label, JournalEntry, Profile, UserFeedbackManager
from .serializers import (
    JournalStyleSerializer,
    LabelSerializer,
    JournalEntrySerializer,
    ProfileSerializer,
    UserFeedbackManagerSerializer,
)


class JournalStyleViewSet(viewsets.ModelViewSet):
    queryset = JournalStyle.objects.all()
    serializer_class = JournalStyleSerializer


class LabelViewSet(viewsets.ModelViewSet):
    queryset = Label.objects.all()
    serializer_class = LabelSerializer


class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class UserFeedbackManagerViewSet(viewsets.ModelViewSet):
    queryset = UserFeedbackManager.objects.all()
    serializer_class = UserFeedbackManagerSerializer
