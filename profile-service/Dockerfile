FROM openjdk:8-jre-alpine
MAINTAINER vvasiloud
ADD ./target/profile-service.jar /app/
CMD ["java", "-Xmx200m",  "-Dspring.profiles.active=production", "-jar", "/app/profile-service.jar"]
EXPOSE 1000