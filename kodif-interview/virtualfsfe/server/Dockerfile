# Use Node.js as the base image
FROM node:18.18.2

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expose the port the server runs on
EXPOSE 3001

# Start the server
CMD ["npm", "start"]
