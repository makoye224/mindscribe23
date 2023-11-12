from journalstore.models import Label, JournalEntry
import pytest
from rest_framework.test import APIClient
from account.serializers import User
from rest_framework import status


@pytest.fixture
def authenticated_client():
    client = APIClient()
    user = User.objects.create_user(email="testuser@user.com", password="test@password")

    # Ensure that the user ID is not None and not zero
    assert (
        user.id is not None and user.id != 0
    ), "User ID should be assigned by the database."

    client.force_authenticate(user)
    return client


# Tests for Login, Signup, Reset Password, Logout
# AUTHENTICATION TESTS
@pytest.mark.django_db
class TestCreateUser:
    def test_creating_user_with_valid_details_returns_201(self):
        client = APIClient()
        response = client.post(
            "/auth/users/",
            {
                "email": "example@example.com",
                "password": "Strong@Password",
                "re_password": "Strong@Password",
            },
        )

        assert response.status_code == status.HTTP_201_CREATED


# Test for users with invalid credentials
@pytest.mark.django_db
class TestInvalidUserCreds:
    def test_creating_user_with_invalid_details_returns_400(self):
        client = APIClient()
        response = client.post(
            "/auth/users/",
            {
                "email": "invalid-email",  # Provide an invalid email
                "password": "weak@Password",  # Provide an invalid password
                "re_password": "mismatch@Password",  # Provide a password that doesn't match
            },
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST


# ------------------------------------------------------------------------------
# Test for Viewing, creating, editing, deleting journal entries
# JOURNALSTORE TESTS
@pytest.mark.django_db
class TestJournalStore:
    def test_anonymous_user_journal_creation_returns_401(self):
        client = APIClient()
        response = client.post(
            "/journalstore/journals/", {"title": "a", "contents": "", "user": "1"}
        )

        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_journal_creation_valid_user_returns_201(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        print("response: ", response)
        user_id = response.data.get("id")
        response = client.post(
            "/journalstore/journals/", {"title": "a", "contents": "", "user": user_id}
        )

        assert response.status_code == status.HTTP_201_CREATED

    def test_journal_creation_without_user_input_field_returns_400(
        self, authenticated_client
    ):
        client = authenticated_client
        response = client.post(
            "/journalstore/journals/", {"title": "a", "contents": ""}
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

    def test_get_journalstore_endpoints(self, authenticated_client):
        client = authenticated_client
        response = client.get("/journalstore/")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert "journals" in data
        assert "labels" in data
        assert "styles" in data
        assert "profile" in data
        assert "feedback" in data
        assert "user-entries" in data
        assert "user-labels" in data

    def test_get_journals(self, authenticated_client):
        client = authenticated_client
        response = client.get("/journalstore/journals/")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert isinstance(data, list)

    def test_get_labels(self, authenticated_client):
        client = authenticated_client
        response = client.get("/journalstore/labels/")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert isinstance(data, list)

    def test_get_styles(self, authenticated_client):
        client = authenticated_client
        response = client.get("/journalstore/styles/")

        assert response.status_code == status.HTTP_200_OK
        data = response.json()

        assert isinstance(data, list)

    def test_delete_journal_entry(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        print("response: ", response)
        user_id = response.data.get("id")
        # Create a journal entry
        response_create = client.post(
            "/journalstore/journals/",
            {"title": "Test Entry", "contents": "", "user": user_id},
        )
        assert response_create.status_code == status.HTTP_201_CREATED
        entry_id = response_create.data["id"]

        # Delete the created journal entry
        response_delete = client.delete(f"/journalstore/journals/{entry_id}/")
        assert response_delete.status_code == status.HTTP_204_NO_CONTENT

        # Verify that the entry is no longer in the database
        with pytest.raises(JournalEntry.DoesNotExist):
            JournalEntry.objects.get(id=entry_id)

    def test_update_journal_entry(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        user_id = response.data.get("id")
        # Create a journal entry
        response_create = client.post(
            "/journalstore/journals/",
            {"title": "Test Entry", "contents": "", "user": user_id},
        )
        assert response_create.status_code == status.HTTP_201_CREATED
        entry_id = response_create.data["id"]

        print(entry_id)
        # Update the created journal entry
        updated_data = {
            "title": "Updated Entry",
            "contents": "New content",
            "user": user_id,
        }
        response_update = client.put(
            f"/journalstore/journals/{entry_id}/", updated_data
        )
        assert response_update.status_code == status.HTTP_200_OK

        # Verify that the entry is updated in the database
        updated_entry = JournalEntry.objects.get(id=entry_id)
        assert updated_entry.title == "Updated Entry"
        assert updated_entry.contents == "New content"
    
        # Attempt to make a journal entry with missing title for entry  
        def test_create_journal_entry_with_missing_fields_returns_400(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        user_id = response.data.get("id")

        # Attempt to create a journal entry with missing "title" field
        response_create = client.post(
            "/journalstore/journals/",
            {"contents": "", "user": user_id},
        )

        assert response_create.status_code == status.HTTP_400_BAD_REQUEST
    

    # Trying to make a journal entry with duplicate journal entry names 
       def test_create_journal_entry_with_duplicate_title_returns_400(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        user_id = response.data.get("id")

        # Create a journal entry with a specific title
        response_create = client.post(
            "/journalstore/journals/",
            {"title": "Unique Title", "contents": "", "user": user_id},
        )
        assert response_create.status_code == status.HTTP_201_CREATED

        # Attempt to create another journal entry with the same title
        response_duplicate = client.post(
            "/journalstore/journals/",
            {"title": "Unique Title", "contents": "", "user": user_id},
        )

        assert response_duplicate.status_code == status.HTTP_400_BAD_REQUEST

    
# ------------------------------------------------------------------------------
# Test for Viewing, Creating, Editing, Deleting Labels
    def test_delete_label(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        user_id = response.data.get("id")
        # Create a label
        response_create = client.post(
            "/journalstore/labels/", {"name": "Test Label", "user": user_id}
        )
        assert response_create.status_code == status.HTTP_201_CREATED
        label_id = response_create.data["id"]

        # Delete the created label
        response_delete = client.delete(f"/journalstore/labels/{label_id}/")
        assert response_delete.status_code == status.HTTP_204_NO_CONTENT

        # Verify that the label is no longer in the database
        with pytest.raises(Label.DoesNotExist):
            Label.objects.get(id=label_id)

    def test_update_label(self, authenticated_client):
        client = authenticated_client
        response = client.get(
            "/auth/users/me/",
            {"email": "testuser@user.com", "password": "test@password"},
        )
        print("response: ", response)
        user_id = response.data.get("id")
        # Create a label
        response_create = client.post(
            "/journalstore/labels/", {"name": "Test Label", "user": user_id}
        )
        assert response_create.status_code == status.HTTP_201_CREATED
        label_id = response_create.data["id"]

        # Update the created label
        updated_data = {"name": "Updated Label"}
        response_update = client.put(f"/journalstore/labels/{label_id}/", updated_data)
        assert response_update.status_code == status.HTTP_200_OK

        # Verify that the label is updated in the database
        updated_label = Label.objects.get(id=label_id)
        assert updated_label.name == "Updated Label"

        # Test for creating a label with a duplicate name
    def test_create_label_with_duplicate_name_returns_400(authenticated_client):
    client = authenticated_client
    response = client.get(
        "/auth/users/me/",
        {"email": "testuser@user.com", "password": "test@password"},
    )
    user_id = response.data.get("id")

    # Create a label with a specific name
    response_create = client.post(
        "/journalstore/labels/", {"name": "Test Label", "user": user_id}
    )
    assert response_create.status_code == status.HTTP_201_CREATED

    # Attempt to create another label with the same name
    response_duplicate = client.post(
        "/journalstore/labels/", {"name": "Test Label", "user": user_id}
    )

    assert response_duplicate.status_code == status.HTTP_400_BAD_REQUEST

# ------------------------------------------------------------------------------
# Bookmarking/Unbookmarking and Viewing Bookmarked Entries
# ------------------------------------------------------------------------------
# Search Functionality
# ------------------------------------------------------------------------------
# Editing profile 


