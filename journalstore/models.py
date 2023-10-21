from django.db import models
from account.models import CustomUser  # Import your custom user model


class JournalStyle(models.Model):
    background_color = models.CharField(max_length=50)
    font = models.TextField()
    font_size = models.CharField(max_length=50)
    font_color = models.CharField(max_length=50)


class Label(models.Model):
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    # Add any other fields related to labels as needed


class JournalEntry(models.Model):
    title = models.CharField(max_length=255)
    contents = models.TextField(blank=True, null=True)
    is_bookmarked = models.BooleanField(default=False)
    journal_style = models.OneToOneField(JournalStyle, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_favorite = models.BooleanField(default=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)


class Profile(models.Model):
    user = models.OneToOneField(
        CustomUser, on_delete=models.CASCADE
    )  # Update the OneToOneField to use your custom user model
    birthday = models.DateField(blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(
        upload_to="profile_pics/", blank=True, null=True
    )


class UserFeedbackManager(models.Model):
    user_email = models.EmailField()
    message_content = models.TextField()
    message_date = models.DateTimeField(auto_now_add=True)
