# Use official Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all remaining project files
COPY . .

# Expose the port, the app runs on
EXPOSE 80

# Start the app
CMD ["npm", "start"]
