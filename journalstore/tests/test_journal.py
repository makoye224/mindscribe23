import pytest
from rest_framework.test import APIClient
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from django.urls import reverse


# AUTHENTICATION TESTS
@pytest.mark.django_db
class TestCreateUser:
    def test_creating_user_with_valid_details_returns_201(self):
        client = APIClient()
        response = client.post(
            "/auth/users/",
            {
                "email": "example@example.com",
                "password": "strong@Password",
                "re_password": "strong@Password",
            },
        )

        assert response.status_code == status.HTTP_201_CREATED


# JOURNALSTORE TESTS
@pytest.mark.django_db
class TestJournalEntry:
    def test_valid_user_creates_journal_returns_201(self):
        # Use the API's login endpoint to obtain a token
        client = APIClient()
        client.post(
            "/auth/users/",
            {
                "email": "example@example.com",
                "password": "strong@Password",
                "re_password": "strong@Password",
            },
        )

        response = client.post(
            "/journalstore/journals/",
            {"title": "a", "contents": "b", "user": 1},
        )

        assert response.status_code == status.HTTP_201_CREATED

    def test_if_no_user_returns_400(self):
        client = APIClient()
        response = client.post(
            "/journalstore/journals/", {"title": "a", "contents": ""}
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
