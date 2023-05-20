# # docker file to run node package 

# # Base image
# FROM node:18.16-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./



# # Install dependencies
# RUN npm install

# # Bundle app source
# COPY . .

# # Expose port
# EXPOSE 4547

# # Run app
# CMD ["npm", "start"]


# Use the latest Ubuntu Server image as the base image
FROM ubuntu:latest

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y nodejs npm

# Set the working directory inside the container
WORKDIR /app

# Copy the 'Bilbo' folder from the local directory to the container
COPY . /app/

# Install project dependencies
RUN cd /app/ && \
    npm install

# Expose port 8080
EXPOSE 8080

# Run the Node.js project
CMD ["node", "/app/index.js"]

# docker build -t my-node-project .

# docker run -d -p 8080:8080 my-node-project
