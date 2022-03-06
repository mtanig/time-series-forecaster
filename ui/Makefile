APP_NAME="time-series-forecaster-ui"

.PHONY: start
start:
	npm run dev

.PHONY: start-port-80
start-port-80:
	npm run dev-port-80

.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm run test

.PHONY: docker-build
docker-build:
	docker build --tag ${APP_NAME} .

.PHONY: docker-start
docker-start:
	docker run -d -p 80:80 --name ${APP_NAME} ${APP_NAME}