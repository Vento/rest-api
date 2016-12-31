#!/bin/sh

if [ "$TRAVIS_BRANCH" == "master" ]; then
	docker --version
	docker login -e "$DOCKER_EMAIL" -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
	
	docker build -t ${DOCKER_AUTH}:${TRAVIS_COMMIT} ./auth-service
	docker tag -f ${DOCKER_AUTH}:${TRAVIS_COMMIT} ${DOCKER_AUTH}:latest && docker push ${DOCKER_AUTH}:latest

	docker build -t ${DOCKER_CONFIG}:${TRAVIS_COMMIT} ./config
	docker tag -f ${DOCKER_CONFIG}:${TRAVIS_COMMIT} ${DOCKER_CONFIG}:latest && docker push ${DOCKER_CONFIG}:latest

	docker build -t ${DOCKER_GATEWAY}:${TRAVIS_COMMIT} ./gateway
	docker tag -f ${DOCKER_GATEWAY}:${TRAVIS_COMMIT} ${DOCKER_GATEWAY}:latest && docker push ${DOCKER_GATEWAY}:latest

	docker build -t ${DOCKER_LOGGING}:${TRAVIS_COMMIT} ./logging
	docker tag -f ${DOCKER_LOGGING}:${TRAVIS_COMMIT} ${DOCKER_LOGGING}:latest && docker push ${DOCKER_LOGGING}:latest
	
	docker build -t ${DOCKER_MATCH}:${TRAVIS_COMMIT} ./match-service
	docker tag -f ${DOCKER_MATCH}:${TRAVIS_COMMIT} ${DOCKER_MATCH}:latest && docker push ${DOCKER_MATCH}:latest
	
	docker build -t ${DOCKER_MONITORING}:${TRAVIS_COMMIT} ./monitoring
	docker tag -f ${DOCKER_MONITORING}:${TRAVIS_COMMIT} ${DOCKER_MONITORING}:latest && docker push ${DOCKER_MONITORING}:latest
	
	docker build -t ${DOCKER_PROFILE}:${TRAVIS_COMMIT} ./profile-service
	docker tag -f ${DOCKER_PROFILE}:${TRAVIS_COMMIT} ${DOCKER_PROFILE}:latest && docker push ${DOCKER_PROFILE}:latest
	
	docker build -t ${DOCKER_REGISTRY}:${TRAVIS_COMMIT} ./registry
	docker tag -f ${DOCKER_REGISTRY}:${TRAVIS_COMMIT} ${DOCKER_REGISTRY}:latest && docker push ${DOCKER_REGISTRY}:latest
	
fi

