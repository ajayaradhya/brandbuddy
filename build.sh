#!/usr/bin/env bash
# Install deps and build frontend
./build_frontend.sh
# Collect static files
python manage.py collectstatic --noinput
