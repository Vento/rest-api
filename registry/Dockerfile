FROM openjdk:8-jre-alpine
MAINTAINER vvasiloud
ADD ./target/registry.jar /app/
CMD ["java", "-Xmx200m", "-Dspring.profiles.active=production", "-jar", "/app/registry.jar"]
EXPOSE 8761