FROM python:3.8-slim

WORKDIR /api

EXPOSE 5001

COPY controllers controllers
COPY libs libs
COPY models models
COPY services services
ADD __init__.py .
ADD requirements.txt .

RUN pip install -r requirements.txt

ENTRYPOINT cd .. && gunicorn -b 0.0.0.0:5001 --workers 1 --threads 1 --timeout 300 api:app