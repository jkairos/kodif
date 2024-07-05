# Use Amazon Corretto 17 as a parent image
FROM amazoncorretto:17

# Set the working directory in the container
WORKDIR /app

# Copy the compiled output JAR file and any other necessary files to the container
COPY build/libs/virtualfsadmin-1.0-SNAPSHOT.jar virtualfsadmin.jar

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "virtualfsadmin.jar"]
