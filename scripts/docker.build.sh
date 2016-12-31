#!/bin/bash

export DOCKER_AUTH=$DOCKER_USERNAME/vento-auth
export DOCKER_CONFIG=$DOCKER_USERNAME/vento-config
export DOCKER_GATEWAY=$DOCKER_USERNAME/vento-gateway
export DOCKER_LOGGING=$DOCKER_USERNAME/vento-logging
export DOCKER_MATCH=$DOCKER_USERNAME/vento-match
export DOCKER_MONITORING=$DOCKER_USERNAME/vento-monitoring
export DOCKER_PROFILE=$DOCKER_USERNAME/vento-profile
export DOCKER_REGISTRY=$DOCKER_USERNAME/vento-registry
export COMMIT=${TRAVIS_COMMIT::6}
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
ls -la
if [ "$TRAVIS_BRANCH" == "master" ]; then
	docker --version
	docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
	
	echo ${DOCKER_AUTH}:${TAG}:${COMMIT}
	docker build -t ${DOCKER_AUTH}:${COMMIT} -f ../auth-service/Dockefile
	docker tag ${DOCKER_AUTH}:${COMMIT} ${DOCKER_AUTH}:${TAG} && docker push ${DOCKER_AUTH}:${TAG}

	echo ${DOCKER_CONFIG}:${TAG}:${COMMIT}
	docker build -t ${DOCKER_CONFIG}:${COMMIT} -f ../config/Dockefile
	docker tag ${DOCKER_CONFIG}:${COMMIT} ${DOCKER_CONFIG}:${TAG} && docker push ${DOCKER_CONFIG}:${TAG}

	echo ${DOCKER_GATEWAY}:${TAG}:${COMMIT}
	docker build -t ${DOCKER_GATEWAY}:${COMMIT} -f ../gateway/Dockefile
	docker tag ${DOCKER_GATEWAY}:${COMMIT} ${DOCKER_GATEWAY}:${TAG} && docker push ${DOCKER_GATEWAY}:${TAG}

	echo ${DOCKER_LOGGING}:${TAG}:${COMMIT}
	docker build -t ${DOCKER_LOGGING}:${COMMIT} -f ../logging/Dockefile
	docker tag ${DOCKER_LOGGING}:${COMMIT} ${DOCKER_LOGGING}:${TAG} && docker push ${DOCKER_LOGGING}:${TAG}

	echo ${DOCKER_MATCH}:${TAG}:${COMMIT}	
	docker build -t ${DOCKER_MATCH}:${COMMIT} -f ../match-service/Dockefile
	docker tag ${DOCKER_MATCH}:${COMMIT} ${DOCKER_MATCH}:${TAG} && docker push ${DOCKER_MATCH}:${TAG}

	echo ${DOCKER_MONITORING}:${TAG}:${COMMIT}		
	docker build -t ${DOCKER_MONITORING}:${COMMIT} -f ../monitoring/Dockefile
	docker tag ${DOCKER_MONITORING}:${COMMIT} ${DOCKER_MONITORING}:${TAG} && docker push ${DOCKER_MONITORING}:${TAG}

	echo ${DOCKER_PROFILE}:${TAG}:${COMMIT}	
	docker build -t ${DOCKER_PROFILE}:${COMMIT} -f ../profile-service/Dockefile
	docker tag ${DOCKER_PROFILE}:${COMMIT} ${DOCKER_PROFILE}:${TAG} && docker push ${DOCKER_PROFILE}:${TAG}

	echo ${DOCKER_REGISTRY}:${TAG}:${COMMIT}		
	docker build -t ${DOCKER_REGISTRY}:${COMMIT} -f ../registry/Dockefile
	docker tag ${DOCKER_REGISTRY}:${COMMIT} ${DOCKER_REGISTRY}:${TAG} && docker push ${DOCKER_REGISTRY}:${TAG}
	
fi

echo $?

