# Use an official Node.js runtime as the base image
# This version (18-alpine) is lightweight and suitable for production
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This allows us to install dependencies before copying the rest of the code,
# which helps with Docker layer caching.
COPY package*.json ./

# Install application dependencies
# The --omit=dev flag ensures that development dependencies are not installed,
# making the final image smaller.
RUN npm install --omit=dev

# Copy the rest of your application code to the working directory
# The .dockerignore file (if you create one) can exclude files like node_modules
COPY . .

# Expose the port your Node.js application listens on
# Assuming your app.js listens on port 3000. Adjust if different.
EXPOSE 3000

# Define the command to run your application when the container starts
# 'node app.js' assumes your main entry point is app.js
CMD [ "node", "app.js" ]

# Optional: If your application needs specific environment variables, define them here
# ENV NODE_ENV=production
# ENV PORT=3000
