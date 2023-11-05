from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()


class UserCreateViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "email": "test@example.com",
            "password": "testpassword",
            "re_password": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
        }

    def test_create_user(self):
        response = self.client.post("/auth/users/", self.user_data, format="json")
        self.assertEqual(response.status_code, 201)

    def test_create_user_invalid_data(self):
        # Testing with incomplete data
        incomplete_data = {
            "email": "test@example.com",
        }
        response = self.client.post("/auth/users/", incomplete_data, format="json")
        self.assertEqual(response.status_code, 400)

    def test_create_user_existing_email(self):
        # Creating a user with the same email should fail
        response1 = self.client.post("/auth/users/", self.user_data, format="json")
        self.assertEqual(response1.status_code, 201)

        response2 = self.client.post("/auth/users/", self.user_data, format="json")
        self.assertEqual(response2.status_code, 400)


class UserProfileViewTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "email": "test@example.com",
            "password": "testpassword",
            "first_name": "John",
            "last_name": "Doe",
        }
        self.user = User.objects.create_user(**self.user_data)
        self.client.force_authenticate(user=self.user)


def test_get_user_profile(self):
    response = self.client.get("/journalstore/profiles/")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data["email"], self.user.email)


def test_update_user_profile(self):
    updated_data = {
        "first_name": "Jane",
        "last_name": "Smith",
    }
    response = self.client.put("/journalstore/profiles/", updated_data, format="json")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.data["first_name"], "Jane")
    self.assertEqual(response.data["last_name"], "Smith")


def test_update_user_profile_invalid_data(self):
    invalid_data = {
        "email": "newemail@example.com",
    }
    response = self.client.put("/journalstore/profiles/", invalid_data, format="json")
    self.assertEqual(response.status_code, 400)
