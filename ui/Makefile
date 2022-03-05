APP_NAME="time-series-forecaster-ui"
VERSION="0.0.1"

.PHONY: start
start:
	npm run dev

.PHONY: test
test:
	npm run test

.PHONY: docker-build
docker-build:
	docker build --tag ${APP_NAME}:${VERSION} .

.PHONY: docker-start
docker-start:
	docker run -d -p 80:80 --name ${APP_NAME} ${APP_NAME}:${VERSION}