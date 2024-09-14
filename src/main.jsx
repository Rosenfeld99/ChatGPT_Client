import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './routes/homePage/HomePage';
import DashboardPage from './routes/dashboardPage/DashboardPage';
import ChatPage from './routes/chatPage/ChatPage';
import RootLayout from './layouts/rootLayout/RootLayout';
import DashboardLayout from './layouts/dashboardLayout/DashboardLayout';
import SignInPage from './routes/signInPage/SignInPage';
import SignUpPage from './routes/signUpPage/SignUpPage';
import NotFoundPage from './routes/notFoundPage/NotFoundPage';
import { ClerkProvider } from '@clerk/clerk-react';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats/:id",
            element: <ChatPage />,
          },
        ],
      },
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

 // protected clerk
 const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

 if (!PUBLISHABLE_KEY) {
     throw new Error("Missing Publishable Key")
 }

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.Fragment>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.Fragment>,
)
