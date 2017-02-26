FROM openjdk:8-jre
MAINTAINER vvasiloud
ADD ./target/tracing.jar /app/
CMD ["java", "-Xmx200m", "-Dspring.profiles.active=production", "-jar", "/app/tracing.jar"]
EXPOSE 9411