import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { App } from "./App";
import { MainPage } from "./pages/MainPage";

import "./index.css";
import { AddGamePage } from "./pages/AddGamePage";
import { SingleGamePage } from "./pages/SingleGame";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Navigate to="/games" />,
      },
      {
        path: "/games",
        element: <MainPage />,
      },
      {
        path: "/addGame",
        element: <AddGamePage />,
      },
      {
        path: "/games/:id",
        element: <SingleGamePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Page to show all games. +++
// Platform selector
// Multiplayer selector
// Status selector
// Edit modal to change status
// Padaryti veikiantį search
// Onclick - nuveda į game page. +++
// Error handling
