# VirtualFSAdmin

## Pre-requisites

### Java 17
To run the backend Spring Boot application, you need to have Java 17 installed.

#### Install Java 17

- **Linux:**
  ```sh
  sudo apt update
  sudo apt install openjdk-17-jdk
  ```

- **macOS:**
  ```sh
  brew install openjdk@17
  ```

- **Windows:**
   1. Download the Java 17 installer from the [Oracle website](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).
   2. Run the installer and follow the instructions.

### Gradle 8.5
Gradle is required to build and run the project.

#### Install Gradle 8.5

- **Linux:**
  ```sh
  sudo apt update
  sudo apt install gradle
  ```

- **macOS:**
  ```sh
  brew install gradle
  ```

- **Windows:**
   1. Download the Gradle 8.5 binary from the [Gradle website](https://gradle.org/releases/).
   2. Unzip the downloaded file and add the `bin` directory to your `PATH`.

## Using Gradle

### Clean the Project
To clean the project:
```sh
./gradlew clean
```

### Build the Project
To build the project:
```sh
./gradlew build
```

### Run the Spring Boot Application
To start the Spring Boot application:
```sh
./gradlew bootRun
```

### Run Unit Tests
To run the unit tests:
```sh
./gradlew test
```

