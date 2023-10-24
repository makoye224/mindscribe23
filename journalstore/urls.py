from django.urls import path
from rest_framework import routers
from . import views

# Create a DefaultRouter instance
router = routers.DefaultRouter()

# Register viewsets with the router
router.register("journals", views.JournalEntryViewSet, basename="journalentries")
router.register("labels", views.LabelViewSet, basename="labels")
router.register("styles", views.JournalStyleViewSet, basename="journalstyles")
router.register("profile", views.ProfileViewSet, basename="profile")
router.register(
    "feedback", views.UserFeedbackManagerViewSet, basename="usermanagerfeedback"
)
router.register("user-entries", views.UserJournalEntriesViewSet, basename="userentries")

# URL patterns
urlpatterns = []

# Extend urlpatterns with router URLs
urlpatterns += router.urls
