FROM openjdk:8-jre-alpine
MAINTAINER vvasiloud
ADD ./target/auth-service.jar /app/
CMD ["java", "-Xmx200m", "-Dspring.profiles.active=production", "-jar", "/app/auth-service.jar"]
EXPOSE 3000