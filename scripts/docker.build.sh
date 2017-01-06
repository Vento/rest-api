#!/bin/bash

export DOCKER_AUTH=$DOCKER_USERNAME/vento-auth
export DOCKER_CONFIG=$DOCKER_USERNAME/vento-config
export DOCKER_GATEWAY=$DOCKER_USERNAME/vento-gateway
export DOCKER_LOGGING=$DOCKER_USERNAME/vento-logging
export DOCKER_MATCH=$DOCKER_USERNAME/vento-match
export DOCKER_MONITORING=$DOCKER_USERNAME/vento-monitoring
export DOCKER_PROFILE=$DOCKER_USERNAME/vento-profile
export DOCKER_REGISTRY=$DOCKER_USERNAME/vento-registry
export COMMIT=${TRAVIS_COMMIT::7}
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`

if [ "$TRAVIS_BRANCH" == "master" ]; then
	docker --version
	docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
	
	echo ${DOCKER_AUTH}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/auth-service
	docker build -t ${DOCKER_AUTH}:${COMMIT} .
	docker tag ${DOCKER_AUTH}:${COMMIT} ${DOCKER_AUTH}:${TAG} 
	docker push ${DOCKER_AUTH}

	echo ${DOCKER_CONFIG}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/config
	docker build -t ${DOCKER_CONFIG}:${COMMIT} .
	docker tag ${DOCKER_CONFIG}:${COMMIT} ${DOCKER_CONFIG}:${TAG} 
	docker push ${DOCKER_CONFIG}

	echo ${DOCKER_GATEWAY}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/gateway
	docker build -t ${DOCKER_GATEWAY}:${COMMIT} .
	docker tag ${DOCKER_GATEWAY}:${COMMIT} ${DOCKER_GATEWAY}:${TAG} 
	docker push ${DOCKER_GATEWAY}

	echo ${DOCKER_LOGGING}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/logging
	docker build -t ${DOCKER_LOGGING}:${COMMIT} .
	docker tag ${DOCKER_LOGGING}:${COMMIT} ${DOCKER_LOGGING}:${TAG} 
	docker push ${DOCKER_LOGGING}

	echo ${DOCKER_MATCH}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/match-service
	docker build -t ${DOCKER_MATCH}:${COMMIT} .
	docker tag ${DOCKER_MATCH}:${COMMIT} ${DOCKER_MATCH}:${TAG} 
	docker push ${DOCKER_MATCH}

	echo ${DOCKER_MONITORING}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/monitoring
	docker build -t ${DOCKER_MONITORING}:${COMMIT} .
	docker tag ${DOCKER_MONITORING}:${COMMIT} ${DOCKER_MONITORING}:${TAG} 
	docker push ${DOCKER_MONITORING}

	echo ${DOCKER_PROFILE}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/profile-service
	docker build -t ${DOCKER_PROFILE}:${COMMIT} .
	docker tag ${DOCKER_PROFILE}:${COMMIT} ${DOCKER_PROFILE}:${TAG} 
	docker push ${DOCKER_PROFILE}

	echo ${DOCKER_REGISTRY}:${TAG}:${COMMIT}
	cd ${TRAVIS_BUILD_DIR}/registry
	docker build -t ${DOCKER_REGISTRY}:${COMMIT} .
	docker tag ${DOCKER_REGISTRY}:${COMMIT} ${DOCKER_REGISTRY}:${TAG} 
	docker push ${DOCKER_REGISTRY}
	
	cd ${TRAVIS_BUILD_DIR}
fi

echo $?

