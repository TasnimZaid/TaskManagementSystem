# TaskManagementSystem

## Task Management System
This project is a Task Management System designed to help users add, update, and delete tasks. It is built with a modern tech stack, including Node.js, React, PostgreSQL, and JSON Web Tokens (JWT) for authentication and secure user management.

## Features
Add Tasks: Users can create new tasks with relevant details.
Update Tasks: Modify existing tasks to update their status or details.
Delete Tasks: Remove tasks that are no longer needed.
User Authentication: Secure user login and signup processes using JWT.
## Tech Stack
Frontend: Built with React.js for a dynamic and responsive user interface.
Backend: Powered by Node.js, handling API requests and interactions with the PostgreSQL database.
Database: PostgreSQL is used for storing task data efficiently.
Authentication: Implemented using JSON Web Tokens (JWT) for secure user authentication and session management.
Authentication with JWT
Overview
JSON Web Tokens (JWT) are used to handle user authentication and manage user sessions securely. Here's how JWT is utilized in this project:

## User Registration (Sign Up):

Users can sign up by providing their email, password, and other details.
Passwords are hashed before storing them in the PostgreSQL database to ensure security.
Upon successful registration, the server responds with a success message.
## User Login:

Users log in using their email and password.
The server verifies the credentials against the database.
If the credentials are valid, the server generates a JWT, which includes the user's unique ID and other claims.
This JWT is sent back to the client and is used to authenticate subsequent requests.
## JWT Tokens:

 Generation: After successful login, a JWT is created using a secret key. This token includes a payload with user information and an expiration time.
 Storage: The JWT is stored in the client (usually in local storage or a cookie).
Validation: For protected routes, the server validates the JWT sent with the request. If the token is valid and not expired, access is granted; otherwise, the request is denied.
## User Authentication:

Protected Routes: Routes that require authentication are protected using middleware that checks for a valid JWT.
Session Management: JWTs help manage user sessions. Since tokens are stateless, the server doesn't need to keep track of active sessions, enhancing scalability.
Example Workflow
## Sign Up:

Request: POST /signup with user details.
Response: Success message.
Login:

Request: POST /login with email and password.
Response: JWT token.
Access Protected Route:

Request: GET /tasks with JWT in the Authorization header.
Response: List of tasks if JWT is valid; otherwise, an error message.