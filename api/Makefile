PORT ?= 5000

.PHONY: start
start:
	cd .. && gunicorn -b 127.0.0.1:${PORT} --workers 1 --threads 1 --timeout 300 api:app

.PHONY: test
test:
	pytest -vvv -s tests/unit/*