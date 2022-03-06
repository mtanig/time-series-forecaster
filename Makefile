# With Docker
.PHONY: start
start:
	docker-compose -f docker-compose.yaml up -d

.PHONY: stop
stop:
	docker-compose -f docker-compose.yaml down

.PHONY: start-local
start-local:
	docker-compose -f docker-compose-local.yaml up -d

.PHONY: stop-local
stop-local:
	docker-compose -f docker-compose-local.yaml down

.PHONY: docker-build
docker-build:
	docker-compose -f docker-compose-local.yaml build

DOCKER_ID_USER=mtani
APP_NAME_API=time-series-forecaster-api
APP_NAME_UI=time-series-forecaster-ui
.PHONY: docker-upload
docker-upload:
	make docker-build
	export DOCKER_ID_USER=${DOCKER_ID_USER}
	docker login
	docker tag time-series-forecaster_api ${DOCKER_ID_USER}/${APP_NAME_API}
	docker tag time-series-forecaster_ui ${DOCKER_ID_USER}/${APP_NAME_UI}
	docker push ${DOCKER_ID_USER}/${APP_NAME_API}
	docker push ${DOCKER_ID_USER}/${APP_NAME_UI}

VERSION=0.0.1
.PHONY: docker-upload-with-version
docker-upload-with-version:
	make docker-upload
	docker tag ${DOCKER_ID_USER}/${APP_NAME_API} ${DOCKER_ID_USER}/${APP_NAME_API}:${VERSION}
	docker tag ${DOCKER_ID_USER}/${APP_NAME_UI} ${DOCKER_ID_USER}/${APP_NAME_UI}:${VERSION}
	docker push ${DOCKER_ID_USER}/${APP_NAME_API}:${VERSION}
	docker push ${DOCKER_ID_USER}/${APP_NAME_UI}:${VERSION}

# Without Docker
.PHONY: start-ui-without-docker
start-ui-without-docker:
	cd ui && sudo make start-port-80

.PHONY: install-ui
install-ui:
	cd ui && make install

.PHONY: start-api-without-docker
start-api-without-docker:
	cd api && make start

.PHONY: install-api
install-api:
	cd api && make install