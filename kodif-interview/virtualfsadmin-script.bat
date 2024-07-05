@echo off

REM Function to clean up all Docker images and containers
:clean_all
echo Cleaning up all Docker images and containers...
docker rm -f virtualfsadmin-container 2>nul
docker rm -f virtualfsfe-client-container 2>nul
docker rm -f virtualfsfe-server-container 2>nul
docker rmi -f virtualfsadmin:latest 2>nul
docker rmi -f virtualfsfe-client:latest 2>nul
docker rmi -f virtualfsfe-server:latest 2>nul
docker image prune -f
goto :eof

REM Function to clean up backend Docker images and containers
:clean_backend
echo Cleaning up backend Docker images and containers...
docker rm -f virtualfsadmin-container 2>nul
docker rmi -f virtualfsadmin:latest 2>nul
docker image prune -f
goto :eof

REM Function to clean up frontend Docker images and containers
:clean_frontend
echo Cleaning up frontend Docker images and containers...
docker rm -f virtualfsfe-client-container 2>nul
docker rm -f virtualfsfe-server-container 2>nul
docker rmi -f virtualfsfe-client:latest 2>nul
docker rmi -f virtualfsfe-server:latest 2>nul
docker image prune -f
goto :eof

REM Function to build the backend Docker image
:build_backend
call :clean_backend
echo Building the backend project...
cd virtualfsadmin
gradlew.bat bootJar
echo Building the backend Docker image...
docker build -t virtualfsadmin:latest .
cd ..
goto menu

REM Function to build the frontend Docker images
:build_frontend
call :clean_frontend
echo Building the frontend client...
cd virtualfsfe\client
npm install --legacy-peer-deps
npm run build
echo Building the frontend client Docker image...
docker build -t virtualfsfe-client:latest .
cd ..

echo Building the frontend server...
cd ..\server
npm install --legacy-peer-deps
echo Building the frontend server Docker image...
docker build -t virtualfsfe-server:latest .
cd ..\..
goto menu

REM Function to start the backend Docker container
:start_backend
echo Starting the backend Docker container...
docker run -d -p 8080:8080 --name virtualfsadmin-container virtualfsadmin:latest
if %errorlevel% neq 0 (
    echo Failed to start the backend Docker container.
) else (
    echo Backend Docker container started successfully.
)
docker ps -a | findstr virtualfsadmin-container
goto menu

REM Function to start the frontend Docker containers
:start_frontend
echo Starting the frontend client Docker container...
docker run -d -p 3000:3000 --name virtualfsfe-client-container virtualfsfe-client:latest
if %errorlevel% neq 0 (
    echo Failed to start the frontend client Docker container.
) else (
    echo Frontend client Docker container started successful
