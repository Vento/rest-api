FROM openjdk:8-jre-alpine
MAINTAINER vvasiloud
ADD ./target/config.jar /app/
CMD ["java", "-Xmx200m", "-jar", "/app/config.jar"]
EXPOSE 8888
