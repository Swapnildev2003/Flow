# Scalable Web App with Authentication & Dashboard

This is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js). It features secure authentication, a protected dashboard, and CRUD operations for tasks.

## Tech Stack

-   **Frontend**: React (Vite), TailwindCSS, Axios, React Router DOM, Lucide React
-   **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, BcryptJS, Helmet

## Features

-   **Authentication**: User Signup & Login with JWT and Bcrypt hashing.
-   **Protected Routes**: Dashboard access is restricted to authenticated users.
-   **Dashboard**:
    -   View user-specific tasks.
    -   Add new tasks.
    -   Edit existing tasks.
    -   Delete tasks.
-   **Security**:
    -   Passwords hashed before storage.
    -   JWT token used for API authorization.
    -   Helmet middleware for HTTP security headers.
-   **UI/UX**: Modern, responsive design with gradients, glassmorphism, and micro-interactions.

## Getting Started

### Prerequisites

-   Node.js installed.
-   MongoDB running locally on default port `27017` (or update `MONGODB_URI` in `server/.env`).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd <repo-name>
    ```

2.  **Setup Backend**:
    ```bash
    cd server
    npm install
    # Create .env file with:
    # PORT=5000
    # MONGODB_URI=mongodb://localhost:27017/webapp_db
    # JWT_SECRET=your_super_secret_key
    ```
    Start the server:
    ```bash
    npm run dev
    ```

3.  **Setup Frontend**:
    ```bash
    cd ../client
    npm install
    ```
    Start the client:
    ```bash
    npm run dev
    ```

4.  **Access the App**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

-   `POST /api/users`: Register a new user.
-   `POST /api/users/login`: Login user.
-   `GET /api/users/profile`: Get user profile (Protected).
-   `GET /api/tasks`: Get user's tasks (Protected).
-   `POST /api/tasks`: Create a new task (Protected).
-   `PUT /api/tasks/:id`: Update a task (Protected).
-   `DELETE /api/tasks/:id`: Delete a task (Protected).

## Validation

-   Frontend: Form validation for required fields.
-   Backend: Mongoose schema validation and controller checks.
