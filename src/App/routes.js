import React from "react";
import { Navigate } from "react-router-dom";
import { MainLayout, DashboardLayout } from "../components/views";
import { Login, Register, AdminRegister } from "../components/SignUp";
import { Chat, Feed } from "../components";
import { AuthWrapper } from "../helper/AuthWrapper";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Navigate to={"console/chat"} /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Register /> },
      { path: "/admin", element: <AdminRegister /> },
    ],
  },
  {
    path: "/console",
    element: <DashboardLayout />,
    children: [
      {
        path: "chat",
        element: (
          <AuthWrapper>
            <Chat />
          </AuthWrapper>
        ),
      },
      {
        path: "feed",
        element: (
          <AuthWrapper>
            <Feed />
          </AuthWrapper>
        ),
      },
    ],
  },
];

export default routes;
