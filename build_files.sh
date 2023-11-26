#!/bin/bash

# Install Python dependencies
pip install -r requirements.txt

# Run Django migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Optionally, you may run other commands, such as compressing assets or creating a production-ready build.

# Move the collected static files to the desired directory
mv static staticfiles_build
