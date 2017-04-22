FROM openjdk:8-jre-alpine
MAINTAINER vvasiloud
ADD ./target/match-service.jar /app/
CMD ["java", "-Xmx200m", "-Dspring.profiles.active=production", "-jar", "/app/match-service.jar"]
EXPOSE 2000