from django.db import models
from account.models import CustomUser  # Import your custom user model
from django.conf import settings
from django.db.models import Q


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

    class Meta:
        # Create a unique constraint on user and title
        constraints = [
            models.UniqueConstraint(fields=["user", "title"], name="unique_user_title")
        ]

    def save(self, *args, **kwargs):
        # Check if the JournalStyle is already set
        if not self.journal_style_id:
            # If not, create a new JournalStyle with default values
            journal_style = JournalStyle.objects.create()
            self.journal_style = journal_style

        super(JournalEntry, self).save(*args, **kwargs)

    @classmethod
    def search_entries(cls, user, query):
        """
        Search for journal entries based on title or contents.
        """
        return cls.objects.filter(
            Q(title__icontains=query, user=user)
            | Q(contents__icontains=query, user=user)
        )


class Label(models.Model):
    name = models.CharField(max_length=255)
    created_date = models.DateTimeField(auto_now_add=True)
    journals = models.ManyToManyField(JournalEntry, related_name="labels", blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, default=None
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "name"], name="unique_label_per_user"
            )
        ]


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
