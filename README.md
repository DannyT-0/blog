# Blog Application

## Overview

This application is a full-stack blog platform with separate backend and frontend components. It allows for creating, updating, and deleting blog posts, as well as user authentication for blog authors.

## Features

- User authentication using JWT
- Create, read, update, and delete blog posts
- Comment system for blog posts
- Separate author interface for managing posts and comments
- RESTful API design
- Frontend for displaying blog posts to readers

## Tech Stack

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication
- Frontend:
  - HTML, CSS, JavaScript
  - Fetch API for data retrieval

## API Endpoints

- `/api/posts` - GET, POST
- `/api/posts/:id` - GET, PUT, DELETE
- `/api/comments` - POST
- `/api/comments/:id` - PUT, DELETE
- `/api/auth/login` - POST
- `/api/auth/register` - POST

## Setup and Installation

1. Clone the repository
2. Navigate to the backend directory
3. Run `npm install` to install dependencies
4. Run `npm start` to start the server
5. Navigate to the frontend directory
6. Open `index.html` in a web browser

## Usage

- Readers can view blog posts and leave comments
- Authors can log in to create, edit, and delete posts
- Authors can also manage comments

## Deployment

- Backend: Deploy to a PaaS like Heroku or DigitalOcean
- Frontend: Deploy to a static hosting service like Netlify or GitHub Pages

## Future Improvements

- Implement rich text editing for blog posts
- Add pagination for blog posts
- Implement user roles (admin, author, reader)
- Add search functionality
- Implement social media sharing

## Contributing

Contributions are welcome. Please fork the repository and create a pull request with your changes.
