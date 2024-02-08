# Use Node.js Alpine as base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --prduction

# Copy the rest of the application
COPY src/ src/

# Compile TypeScript to JavaScript
COPY tsconfig.* .
RUN npm run build

# Command to run the application
CMD ["node", "build/index.js"]
