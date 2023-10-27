from rest_framework import serializers
from .models import JournalStyle, Label, JournalEntry, Profile, UserFeedbackManager


class JournalStyleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalStyle
        fields = "__all__"


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = "__all__"


class JournalEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntry
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class UserFeedbackManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserFeedbackManager
        fields = "__all__"
