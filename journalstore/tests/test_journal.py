import pytest
from rest_framework.test import APIClient
from rest_framework import status

#Tests for Login, Signup, Reset Password, Logout
# AUTHENTICATION TESTS
@pytest.mark.django_db
#Creating a user with all proper credentials 
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
        
#Test for users with invalid credentials
class TestInvalidUserCreds
    def test_creating_user_with_invalid_details_returns_400(self):
        client = APIClient()
        response = client.post(
            "/auth/users/",
            {
                "email": "invalid-email",  # Provide an invalid email
                "password": "weak@Password",         # Provide an invalid password
                "re_password": "mismatch@Password",  # Provide a password that doesn't match
            },
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST

#------------------------------------------------------------------------------
#Test for Viewing all Recently created entries 
# JOURNALSTORE TESTS

# Define the API endpoint for journal creation
journal_endpoint = "/journalstore/journals/"

@pytest.mark.django_db
class TestJournalEntry:
    def test_if_no_user_returns_400(self):
        client = APIClient()
        response = client.post(
            "/journalstore/journals/", {"title": "a", "contents": ""}
        )

        assert response.status_code == status.HTTP_400_BAD_REQUEST



# Pytest for new users with no journal entries
def test_create_journal_for_new_users():
    client = APIClient()
    user_id = "new_user"

    response = client.post(
        journal_endpoint,
        {"title": "Journal Title", "contents": "Journal Content"},
    )

    assert response.status_code == status.HTTP_200_OK

# Pytest for returning users with previous journal entries
def test_create_journal_for_returning_users_with_entries():
    client = APIClient()
    user_id = "returning_user"

    response = client.post(
        journal_endpoint,
        {"title": "Journal Title", "contents": "Journal Content"},
    )

    assert response.status_code == status.HTTP_200_OK

# Pytest for returning users with no journal entries
def test_create_journal_for_returning_users_with_no_entries():
    client = APIClient()
    user_id = "returning_user_no_entries"

    response = client.post(
        journal_endpoint,
        {"title": "Journal Title", "contents": "Journal Content"},
    )

    assert response.status_code == status.HTTP_200_OK

# Pytest for a general case where the user has deleted all entries
def test_create_journal_for_user_with_deleted_entries():
    client = APIClient()
    user_id = "user_with_deleted_entries"

    response = client.post(
        journal_endpoint,
        {"title": "Journal Title", "contents": "Journal Content"},
    )

    assert response.status_code == status.HTTP_200_OK

#------------------------------------------------------------------------------
#Tests for Creating, editing, and deleting journal entries


#------------------------------------------------------------------------------
#Tests for Bookmarking journal entries

#Test for checking if entry is bookmarked 
def test_check_if_entry_is_bookmarked():
    client = APIClient()
    response = client.get(journal_endpoint)
    
    assert response.status_code == status.HTTP_200_OK
    assert response.json()["is_bookmarked"] is True

#Test for when not bookmarked
def test_check_if_entry_is_notbookmarked():
    client = APIClient()
    response = client.get(journal_endpoint)
    
    assert response.status_code == status.HTTP_404_NOT_FOUND
    assert response.json()["is_bookmarked"] is False 

#------------------------------------------------------------------------------
#Tests for Viewing bookmarked journal entries

#------------------------------------------------------------------------------
#Tests for Creating, editing, and deleting personalized organization labels

#------------------------------------------------------------------------------
#Tests for Viewing labeled entries

#------------------------------------------------------------------------------
#Tests for Search functionality for key terms or phrases 

#------------------------------------------------------------------------------
#Tests for editing personal profile 
#------------------------------------------------------------------------------
if __name__ == '__main__':
    pytest.main()
