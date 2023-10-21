from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"journalstyles", views.JournalStyleViewSet)
router.register(r"labels", views.LabelViewSet)
router.register(r"journalentries", views.JournalEntryViewSet)
router.register(r"profiles", views.ProfileViewSet)
router.register(r"userfeedbacks", views.UserFeedbackManagerViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
