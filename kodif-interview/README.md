# VirtualFS Project

## Pre-requisites

### 1. Docker
Docker is required to build and run the containerized applications.

#### Linux
1. Update your existing list of packages:
   ```sh
   sudo apt update
   ```
2. Install the required packages:
   ```sh
   sudo apt install apt-transport-https ca-certificates curl software-properties-common
   ```
3. Add the GPG key for the official Docker repository:
   ```sh
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   ```
4. Add the Docker repository to APT sources:
   ```sh
   sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
   ```
5. Update the package database with the Docker packages from the newly added repo:
   ```sh
   sudo apt update
   ```
6. Install Docker:
   ```sh
   sudo apt install docker-ce
   ```
7. Add your user to the Docker group:
   ```sh
   sudo usermod -aG docker ${USER}
   ```

#### macOS
1. Download Docker Desktop for Mac from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac/).
2. Open the downloaded `.dmg` file and drag the Docker icon to the Applications folder.
3. Launch Docker from the Applications folder.

#### Windows
1. Download Docker Desktop for Windows from [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows/).
2. Run the installer and follow the instructions.
3. Once installed, open Docker Desktop from the Start menu.

### 2. Backend
For the backend, you need Java 17 and Gradle 8.5.

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

### 3. Frontend
For the frontend, you need Node.js 18.18.2 and npm 10.6.0.

#### Install Node.js 18.18.2
- **Linux:**
  ```sh
  curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  ```

- **macOS:**
  ```sh
  brew install node@18
  ```

- **Windows:**
  1. Download the Node.js 18.18.2 installer from the [Node.js website](https://nodejs.org/en/download/).
  2. Run the installer and follow the instructions.

## Scripts for Linux, macOS, and Windows

In the root of the project, you will find scripts for managing the backend and frontend Docker containers.

- **Linux and macOS:** `virtualfsadmin-script.sh`
- **Windows:** `virtualfsadmin-script.bat`

### Available Options

The scripts provide the following options:

1. **Build backend Docker image:** Cleans and builds the backend Docker image.
2. **Build frontend Docker images:** Cleans and builds the frontend Docker images.
3. **Build all Docker images:** Cleans and builds both backend and frontend Docker images.
4. **Start backend Docker container:** Starts the backend Docker container.
5. **Start frontend Docker containers:** Starts the frontend Docker containers.
6. **Start all Docker containers:** Starts both backend and frontend Docker containers.
7. **Stop backend Docker container:** Stops and removes the backend Docker container.
8. **Stop frontend Docker containers:** Stops and removes the frontend Docker containers.
9. **Stop all Docker containers:** Stops and removes all Docker containers.
10. **Exit:** Exits the script.

### How to Use

#### Linux and macOS
1. Make the script executable:
   ```sh
   chmod +x virtualfsadmin-script.sh
   ```
2. Run the script:
   ```sh
   ./virtualfsadmin-script.sh
   ```

#### Windows
1. Run the batch file:
   ```sh
   virtualfsadmin-script.bat
   ```

### Example Docker Commands

To see all Docker images and their sizes, you can use the following command:
```sh
docker images
```

For a more detailed view:
```sh
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}"
```

