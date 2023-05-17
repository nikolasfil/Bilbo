# docker file to run node package 

# Base image
FROM node:18.16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./



# Install dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 4547

# Run app
CMD ["npm", "start"]
