# urls.py

from django.urls import path, re_path
from . import views

urlpatterns = [re_path(r"^(?:.*)/?$", views.render_react_frontend, name="frontend")]
