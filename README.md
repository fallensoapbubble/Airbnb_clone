# Airbnb-Clone




# Project Setup

## Prerequisites
- Node.js
- npm (Node Package Manager)
- nodemon (installed globally)

## Installation

### Step 1: Initialize the Project
1. Initialize a new Node.js project:
   ```bash
   npm init -y
   ```

### Step 2: Install Dependencies
1. Install EJS:
   ```bash
   npm i ejs
   ```
2. Install Mongoose:
   ```bash
   npm i mongoose
   ```
3. Install Express:
   ```bash
   npm i express
   ```

### Step 3: Create Necessary Files and Folders
1. Create the main application file:
   ```bash
   touch app.js
   ```
2. Create the models folder and the listing.js file:
   ```bash
   mkdir models
   cd models
   touch listing.js
   ```

### Step 4: Start the Server
1. Start the server using nodemon:
   ```bash
   nodemon app.js
   ```

## Notes
- Ensure that you have nodemon installed globally. If not, you can install it using:
  ```bash
  npm install -g nodemon
  ```
- Adjust the paths and filenames as necessary to match your project structure.

A beginner-friendly attempt to recreate core functionality of Airbnb using Node.js, Express, MongoDB, and EJS. This project was built as a hands-on exercise to understand backend development and server-side rendering in web applications.