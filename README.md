# CHAT AI

This project is a Chat AI application designed to offer chat functionality, enhanced with a fully responsive interface. It includes authentication via Clerk, which allows login options via Google, LinkedIn and GitHub. The project uses a modern technology stack including React, Vite, TailwindCSS and React Query to manage the state. It also integrates with the Gemini API for image analysis.

## Demo

![Profile manage gif](https://res.cloudinary.com/djwetaeqt/image/upload/v1727816156/%D7%A2%D7%95%D7%AA%D7%A7_%D7%A9%D7%9C_cover_im2_wo0oej.png)


## Table of Contents

- About
- Features
- Technologies Used
- Setup Instructions
- Project Structure
- State Management



## About
This project is a Chat AI application with the following key capabilities:

- Real-time chat with user authentication using Clerk.
- Support for authentication with Google, LinkedIn, and GitHub.
- Responsive design, ensuring an optimal experience across different devices.
- Integration with Gemini API for image analysis and response questen.
## Features

- User Authentication: Secure authentication with Clerk and options for Google, LinkedIn, and GitHub.
- Real-Time Messaging: Seamless real-time chat experience.
- Image Analysis: Ability to analyze images using Gemini API.
- Responsive Design: Optimized for desktop, tablet, and mobile devices.
- User-Centric Design: Built with user experience in mind, leveraging Figma for prototyping and - design.


## Technologies Used

**Frontend**
- React: JavaScript library for building dynamic user interfaces.
- Vite: Next-generation frontend tooling for fast builds.
- TailwindCSS: Utility-first CSS framework for styling.
- React Query: Efficient state and server data management.


**Backend**
- Docker: Containerization for seamless development and deployment.
- Clerk: Authentication solution supporting social logins (Google, LinkedIn, GitHub).
- Swagger: API documentation and testing.
- Express: Server with Node,js.

[🔗 Link to server repo](https://github.com/Rosenfeld99/ChatGPT_Backend)

## Setup Instructions

Clone the repository:

```bash
  git clone https://github.com/Rosenfeld99/ChatGPT_Client
```
Install dependencies:

```bash
  npm install
```

Create a Firebase project and add your Firebase configuration to the project:

- Go to the Firebase console.
- Create a new project.
- Register your app with Firebase.
- Copy the Firebase configuration and add it to your project.

Create a .env file in the root directory and add your Firebase configuration:

```bash
VITE_IMAGE_KIT_ENDPOINT=""
VITE_IMAGE_KIT_PUBLIC_KEY=""
VITE_GEMINI_PUBLIC_KEY=""
VITE_CLERK_PUBLISHABLE_KEY=""
VITE_CLERK_FRONTEND_API=""
CLERK_SECRET_KEY=""

```

Start the development server:

```bash
  npm run dev
```
## State Management

The global state of the application is managed using Context API, which allows for efficient state management and easy access to state across various components.

- Auth Context: Manages user authentication state.
- Chat Context: Manages real-time messaging state.


The global state management is handled using React Query, providing an optimized way to manage and synchronize server state across the application.

**Key Contexts:**
- Authentication Context: Manages authentication state using Clerk.
- Chat Context: Manages real-time messaging state with React Query.


## Project Structure
```bash
/src
  ├── components     # Reusable UI components
  ├── layouts        # Outlet layouts 
  ├── routes          # Application pages (Chat, Login, etc.)
  ├── services       # API and authentication services
  ├── styles         # Global CSS and Tailwind configurations
  └── lib          # Helper functions and utilities
  ```
