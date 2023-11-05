import pytest
from rest_framework.test import APIClient
from rest_framework import status


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
    def test_if_no_user_returns_400(self):
        client = APIClient()
        response = client.post(
            "/journalstore/journals/", {"title": "a", "contents": ""}
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST
