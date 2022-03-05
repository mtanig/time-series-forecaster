PORT ?= 5001

.PHONY: start
start:
	cd .. && gunicorn -b 127.0.0.1:${PORT} --workers 1 --threads 1 --timeout 300 api:app

.PHONY: start-dev
start-dev:
	cd .. && \
	PORT=${PORT} \
	PYTHONPATH=${PYTHONPATH}:./api \
	python api/__init__.py

.PHONY: test
test:
	pytest -vvv -s tests/unit/*