# Auth App

A production-ready full-stack authentication and authorization application built using **Java Spring Boot** and **React (TypeScript)**. The application provides secure user authentication using **JWT**, **OAuth 2.0**, **Access Tokens**, and **Refresh Tokens**, following modern security best practices.

## Features

- User Registration & Login
- JWT Authentication
- Access Token & Refresh Token Authentication
- OAuth 2.0 Login (Google & GitHub)
- Role-Based Authorization (RBAC)
- Spring Security Integration
- Secure REST APIs
- Password Encryption using BCrypt
- Refresh Token Rotation
- Protected Routes in React
- Persistent Authentication
- User Profile Management
- Global Exception Handling
- Input Validation
- Responsive UI

## Backend

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT (JSON Web Token)
- OAuth 2.0
- MySQL
- Maven

## Frontend

- React
- TypeScript
- Vite
- Axios
- React Router
- Zustand (State Management)
- Tailwind CSS

## Authentication Flow

1. User logs in using Email/Password or OAuth (Google/GitHub).
2. Backend validates credentials.
3. JWT Access Token is generated.
4. Refresh Token is generated and securely stored.
5. Frontend attaches the Access Token to protected API requests.
6. When the Access Token expires, the Refresh Token is used to generate a new Access Token without requiring the user to log in again.
7. If both tokens expire or become invalid, the user must log in again.

## Security Features

- BCrypt Password Hashing
- Stateless Authentication
- JWT-based Authorization
- OAuth 2.0 Authentication
- Refresh Token Mechanism
- CORS Configuration
- Secure HTTP-only Refresh Token Cookies
- Role-Based Access Control (RBAC)
- Custom Authentication Filter
- Custom Exception Handling

## Tech Stack

### Backend
- Java
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- MySQL
- Maven

### Frontend
- React
- TypeScript
- Vite
- Axios
- Zustand
- Tailwind CSS

## Future Enhancements

- Email Verification
- Forgot Password
- Two-Factor Authentication (2FA)
- Account Lock after Multiple Failed Attempts
- Audit Logs
- Docker Deployment
- AWS Deployment
