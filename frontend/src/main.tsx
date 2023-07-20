import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { CreateAccount } from "./pages/CreateAccount";
import { CreateProfilePage } from "./pages/CreateProfile";
import Users from "./pages/Users";
import { APP_ROUTES } from "./contsants";
import Home from "./pages/Home";
import Bank from "./pages/Bank";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateAccount />,
  },
  {
    path: "/create-profile",
    element: <CreateProfilePage />,
  },
  {
    path: "/create-account",
    element: <Home />,
  },
  {
    path: APP_ROUTES.users,
    element: <Users />,
  },
  {
    path: APP_ROUTES.bank,
    element: <Bank />,
  },
  {
    path: APP_ROUTES.profile().format,
    element: <Profile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
