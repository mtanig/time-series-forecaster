APP_NAME="time-series-forecaster-api"
PORT?=5001

.PHONY: start
start:
	cd .. && gunicorn -b 0.0.0.0:${PORT} --workers 1 --threads 1 --timeout 300 api:app

.PHONY: start-dev
start-dev:
	cd .. && \
	PORT=${PORT} \
	PYTHONPATH=${PYTHONPATH}:./api \
	python api/__init__.py

.PHONY: install
install:
	pip install -r requirements.txt

.PHONY: test
test:
	pytest -vvv -s tests/unit/*

.PHONY: test-request
test-request:
	curl -X POST -H 'Content-Type: application/json' -d @tests/data/valid_full_request.json http://localhost:5001/forecast

.PHONY: docker-build
docker-build:
	docker build --tag ${APP_NAME} .

.PHONY: docker-start
docker-start:
	docker run -it -d -p ${PORT}:${PORT} --name ${APP_NAME} ${APP_NAME}