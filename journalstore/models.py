from django.db import models
from account.models import CustomUser  # Import your custom user model
from django.conf import settings


class JournalStyle(models.Model):
    background_color = models.CharField(
        max_length=50,
        default="#FFFFFF",  # Example default background color
    )
    font = models.TextField(
        default="Arial, sans-serif",  # Example default font
    )
    font_size = models.CharField(
        max_length=50,
        default="16px",  # Example default font size
    )
    font_color = models.CharField(
        max_length=50,
        default="#000000",  # Example default font color
    )


class Label(models.Model):
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    # Add any other fields related to labels as needed


class JournalEntry(models.Model):
    title = models.CharField(max_length=255)
    contents = models.TextField(blank=True, null=True)
    is_bookmarked = models.BooleanField(default=False)
    journal_style = models.OneToOneField(
        JournalStyle, on_delete=models.SET_NULL, null=True
    )

    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    is_favorite = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        # Check if the JournalStyle is already set
        if not self.journal_style_id:
            # If not, create a new JournalStyle with default values
            journal_style = JournalStyle.objects.create()
            self.journal_style = journal_style

        super(JournalEntry, self).save(*args, **kwargs)


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
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
