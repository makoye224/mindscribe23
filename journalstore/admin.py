from django.contrib import admin
from .models import JournalStyle, Label, JournalEntry, Profile, UserFeedbackManager

@admin.register(JournalStyle)
class JournalStyleAdmin(admin.ModelAdmin):
    list_display = ('id', 'background_color', 'font', 'font_size', 'font_color')

@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_date')

@admin.register(JournalEntry)
class JournalEntryAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_date', 'is_favorite', 'user')
    list_filter = ('is_favorite', 'user')
    search_fields = ('title', 'contents', 'user__username')

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'birthday', 'contact_email', 'phone_number')

@admin.register(UserFeedbackManager)
class UserFeedbackManagerAdmin(admin.ModelAdmin):
    list_display = ('user_email', 'message_date')

