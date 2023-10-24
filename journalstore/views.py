from rest_framework import viewsets
from rest_framework import permissions
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


class UserJournalEntriesViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter the queryset to retrieve journal entries for the current user
        user = self.request.user
        return JournalEntry.objects.filter(user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Set the user to the authenticated user before saving
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
