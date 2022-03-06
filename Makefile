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
.PHONY: docker-upload
docker-upload:
	make docker-build
	export DOCKER_ID_USER=${DOCKER_ID_USER}
	docker login
	docker tag time-series-forecaster_api ${DOCKER_ID_USER}/time-series-forecaster-api
	docker tag time-series-forecaster_ui ${DOCKER_ID_USER}/time-series-forecaster-ui
	docker push ${DOCKER_ID_USER}/time-series-forecaster-api
	docker push ${DOCKER_ID_USER}/time-series-forecaster-ui