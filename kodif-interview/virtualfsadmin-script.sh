#!/bin/bash

# Function to clean up all Docker images and containers
clean_all() {
  echo "Cleaning up all Docker images and containers..."
  docker rm -f virtualfsadmin-container 2>/dev/null
  docker rm -f virtualfsfe-client-container 2>/dev/null
  docker rm -f virtualfsfe-server-container 2>/dev/null
  docker rmi -f virtualfsadmin:latest 2>/dev/null
  docker rmi -f virtualfsfe-client:latest 2>/dev/null
  docker rmi -f virtualfsfe-server:latest 2>/dev/null
  docker image prune -f
}

# Function to clean up backend Docker images and containers
clean_backend() {
  echo "Cleaning up backend Docker images and containers..."
  docker rm -f virtualfsadmin-container 2>/dev/null
  docker rmi -f virtualfsadmin:latest 2>/dev/null
  docker image prune -f
}

# Function to clean up frontend Docker images and containers
clean_frontend() {
  echo "Cleaning up frontend Docker images and containers..."
  docker rm -f virtualfsfe-client-container 2>/dev/null
  docker rm -f virtualfsfe-server-container 2>/dev/null
  docker rmi -f virtualfsfe-client:latest 2>/dev/null
  docker rmi -f virtualfsfe-server:latest 2>/dev/null
  docker image prune -f
}

# Function to build the backend Docker image
build_backend() {
  clean_backend
  echo "Building the backend project..."
  cd virtualfsadmin || exit
  ./gradlew bootJar
  echo "Building the backend Docker image..."
  docker build -t virtualfsadmin:latest .
  cd ..
}

# Function to build the frontend Docker images
build_frontend() {
  clean_frontend
  echo "Building the frontend client..."
  cd virtualfsfe/client || exit
  npm install --legacy-peer-deps
  npm run build
  echo "Building the frontend client Docker image..."
  docker build -t virtualfsfe-client:latest .
  cd ../..

  echo "Building the frontend server..."
  cd virtualfsfe/server || exit
  npm install --legacy-peer-deps
  echo "Building the frontend server Docker image..."
  docker build -t virtualfsfe-server:latest .
  cd ../..
}

# Function to start the backend Docker container
start_backend() {
  echo "Starting the backend Docker container..."
  docker run -d -p 8080:8080 --name virtualfsadmin-container virtualfsadmin:latest
  if [ $? -ne 0 ]; then
    echo "Failed to start the backend Docker container."
  else
    echo "Backend Docker container started successfully."
  fi
  docker ps -a | grep virtualfsadmin-container
}

# Function to start the frontend Docker containers
start_frontend() {
  echo "Starting the frontend client Docker container..."
  docker run -d -p 3000:3000 --name virtualfsfe-client-container virtualfsfe-client:latest
  if [ $? -ne 0 ]; then
    echo "Failed to start the frontend client Docker container."
  else
    echo "Frontend client Docker container started successfully."
  fi

  echo "Starting the frontend server Docker container..."
  docker run -d -p 3001:3001 --name virtualfsfe-server-container virtualfsfe-server:latest
  if [ $? -ne 0 ]; then
    echo "Failed to start the frontend server Docker container."
  else
    echo "Frontend server Docker container started successfully."
  fi

  docker ps -a | grep virtualfsfe-client-container
  docker ps -a | grep virtualfsfe-server-container
}

# Function to stop the backend Docker container
stop_backend() {
  echo "Stopping the backend Docker container..."
  docker stop virtualfsadmin-container
  docker rm virtualfsadmin-container
}

# Function to stop the frontend Docker containers
stop_frontend() {
  echo "Stopping the frontend Docker containers..."
  docker stop virtualfsfe-client-container
  docker rm virtualfsfe-client-container
  docker stop virtualfsfe-server-container
  docker rm virtualfsfe-server-container
}

# Function to stop all Docker containers
stop_all_containers() {
  stop_backend
  stop_frontend
}

# Display the menu
while true; do
  echo "Select an option:"
  echo "1. Build backend Docker image"
  echo "2. Build frontend Docker images"
  echo "3. Build all Docker images"
  echo "4. Start backend Docker container"
  echo "5. Start frontend Docker containers"
  echo "6. Start all Docker containers"
  echo "7. Stop backend Docker container"
  echo "8. Stop frontend Docker containers"
  echo "9. Stop all Docker containers"
  echo "10. Exit"
  read -rp "Enter your choice: " choice

  case $choice in
    1)
      build_backend
      ;;
    2)
      build_frontend
      ;;
    3)
      build_backend
      build_frontend
      ;;
    4)
      start_backend
      ;;
    5)
      start_frontend
      ;;
    6)
      start_backend
      start_frontend
      ;;
    7)
      stop_backend
      ;;
    8)
      stop_frontend
      ;;
    9)
      stop_all_containers
      ;;
    10)
      echo "Exiting..."
      exit 0
      ;;
    *)
      echo "Invalid choice, please select a valid option."
      ;;
  esac
done
