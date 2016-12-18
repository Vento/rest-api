FROM openjdk:8-jre
MAINTAINER vvasiloud
ADD ./target/gateway.jar /app/
CMD ["java", "-Xmx200m", "-Dspring.profiles.active=production", "-jar", "/app/gateway.jar"]
EXPOSE 9000