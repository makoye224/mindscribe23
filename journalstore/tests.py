from django.test import TestCase
from account.models import CustomUser
from .models import JournalStyle, Label, JournalEntry, Profile, UserFeedbackManager
from datetime import datetime


class JournalStyleTestCase(TestCase):
    def test_create_journal_style(self):
        style = JournalStyle.objects.create(
            background_color="White", font="Arial", font_size="12px", font_color="Black"
        )
        self.assertEqual(style.background_color, "White")


class LabelTestCase(TestCase):
    def test_create_label(self):
        label = Label.objects.create(name="Test Label")
        self.assertEqual(label.name, "Test Label")


class JournalEntryTestCase(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create(username="testuser")

    def test_create_journal_entry(self):
        style = JournalStyle.objects.create(
            background_color="White", font="Arial", font_size="12px", font_color="Black"
        )
        entry = JournalEntry.objects.create(
            title="Test Entry", journal_style=style, user=self.user
        )
        self.assertEqual(entry.title, "Test Entry")
        self.assertEqual(entry.user, self.user)


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = CustomUser.objects.create(username="testuser")

    def test_create_profile(self):
        profile = Profile.objects.create(
            user=self.user,
            birthday=datetime(2000, 1, 1),
            contact_email="test@example.com",
            phone_number="123-456-7890",
        )
        self.assertEqual(profile.user, self.user)
        self.assertEqual(profile.birthday, datetime(2000, 1, 1))
        self.assertEqual(profile.contact_email, "test@example.com")


class UserFeedbackManagerTestCase(TestCase):
    def test_create_user_feedback(self):
        feedback = UserFeedbackManager.objects.create(
            user_email="test@example.com", message_content="Test feedback"
        )
        self.assertEqual(feedback.user_email, "test@example.com")
