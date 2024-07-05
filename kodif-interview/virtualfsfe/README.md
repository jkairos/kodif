# VirtualFSFE

## Pre-requisites

### Node.js 18.18.2 and npm 10.6.0
To run the frontend applications, you need to have Node.js 18.18.2 and npm 10.6.0 installed.

#### Install Node.js 18.18.2 and npm

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

## Project Structure
The frontend consists of two separate projects: `client` and `server`.

- **Client**: Contains the components and uses axios to make requests to the server.
- **Server**: Runs an Express server which calls the endpoints in the backend.

### Advantages of Separation
- **Modularity**: Easier to manage and scale each part of the application separately.
- **Maintenance**: Simplifies the process of updating and testing individual components.
- **Flexibility**: Allows independent deployment and scaling of client and server.

## Using npm

### Clean the Project
To clean the project:
```sh
rm -rf node_modules
```

### Install Dependencies
To install the dependencies:
```sh
npm install --legacy-peer-deps
```

### Run the Application
To start the application:
```sh
npm run start
```

### Run Unit Tests
To run the unit tests:
```sh
npm test
```

### Client
Navigate to the `client` directory and run the following commands:

```sh
cd client
npm install --legacy-peer-deps
npm run start
```

### Server
Navigate to the `server` directory and run the following commands:

```sh
cd server
npm install --legacy-peer-deps
npm run start
```

### Running Unit Tests
#### Client
To run the unit tests in the `client` directory:

```sh
cd client
npm test
```

#### Server
To run the unit tests in the `server` directory:

```sh
cd server
npm test
```