#!/bin/bash

java -Xmx100m -jar ../config/target/config.jar &&
java -Xmx100m -jar ../registry/target/registry.jar &&
java -Xmx100m -jar ../gateway/target/gateway.jar &&
java -Xmx100m -jar ../auth-service/target/auth-service.jar &&
java -Xmx100m -jar ../profile-service/target/profile-service.jar &&
java -Xmx100m -jar ../match-service/target/match-service.jar &&
java -Xmx100m -jar ../monitoring/target/monitoring.jar
