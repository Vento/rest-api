FROM openjdk:8-jre-alpine
MAINTAINER vvasiloud
ADD ./target/monitoring.jar /app/
CMD ["java", "-Xmx200m", "-Dspring.profiles.active=production", "-jar", "/app/monitoring.jar"]
EXPOSE 8989 8080