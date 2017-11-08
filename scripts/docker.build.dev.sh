#!/bin/bash

export DOCKER_USERNAME="vvasiloud"
export DOCKER_AUTH=${DOCKER_USERNAME}/vento-auth
export DOCKER_CONFIG=${DOCKER_USERNAME}/vento-config
export DOCKER_GATEWAY=${DOCKER_USERNAME}/vento-gateway
export DOCKER_ELASTICSEARCH=${DOCKER_USERNAME}/vento-elasticsearch
export DOCKER_KIBANA=${DOCKER_USERNAME}/vento-kibana
export DOCKER_LOGSTASH=${DOCKER_USERNAME}/vento-logstash
export DOCKER_MATCH=${DOCKER_USERNAME}/vento-match
export DOCKER_MONITORING=${DOCKER_USERNAME}/vento-monitoring
export DOCKER_PROFILE=${DOCKER_USERNAME}/vento-profile
export DOCKER_REGISTRY=${DOCKER_USERNAME}/vento-registry
export DOCKER_TRACING=${DOCKER_USERNAME}/vento-tracing

export TAG="latest"

	docker --version
	docker login

	echo ${DOCKER_AUTH}:${TAG}
	cd ../auth-service
	docker build -t ${DOCKER_AUTH}:${TAG} .
	docker push ${DOCKER_AUTH}:${TAG}

	echo ${DOCKER_CONFIG}:${TAG}
	cd ../config
	docker build -t ${DOCKER_CONFIG}:${TAG} .
	docker push ${DOCKER_CONFIG}:${TAG}

	echo ${DOCKER_GATEWAY}:${TAG}
	cd ../gateway
	docker build -t ${DOCKER_GATEWAY}:${TAG} .
	docker push ${DOCKER_GATEWAY}:${TAG}

	echo ${DOCKER_ELASTICSEARCH}:${TAG}
	cd ../logging/elasticsearch
	docker build -t ${DOCKER_ELASTICSEARCH}:${TAG} .
	docker push ${DOCKER_ELASTICSEARCH}:${TAG}

	echo ${DOCKER_KIBANA}:${TAG}
	cd ../logging/kibana
	docker build -t ${DOCKER_KIBANA}:${TAG} .
	docker push ${DOCKER_KIBANA}:${TAG}

	echo ${DOCKER_LOGSTASH}:${TAG}
	cd ../logging/logstash
	docker build -t ${DOCKER_LOGSTASH}:${TAG} .
	docker push ${DOCKER_LOGSTASH}:${TAG}

	echo ${DOCKER_MATCH}:${TAG}
	cd ../match-service
	docker build -t ${DOCKER_MATCH}:${TAG} .
	docker push ${DOCKER_MATCH}:${TAG}

	echo ${DOCKER_MONITORING}:${TAG}
	cd ../monitoring
	docker build -t ${DOCKER_MONITORING}:${TAG} .
	docker push ${DOCKER_MONITORING}:${TAG}

	echo ${DOCKER_PROFILE}:${TAG}
	cd ../profile-service
	docker build -t ${DOCKER_PROFILE}:${TAG} .
	docker push ${DOCKER_PROFILE}:${TAG}

	echo ${DOCKER_REGISTRY}:${TAG}
	cd ../registry
	docker build -t ${DOCKER_REGISTRY}:${TAG} .
	docker push ${DOCKER_REGISTRY}:${TAG}

	echo ${DOCKER_TRACING}:${TAG}
	cd ../tracing
	docker build -t ${DOCKER_TRACING}:${TAG} .
	docker push ${DOCKER_TRACING}:${TAG}

echo $?

