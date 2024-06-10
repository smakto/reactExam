import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { App } from "./App";
import { GamePage } from "./pages/GamePage";

import "./index.css";

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
        element: <GamePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Page to show all games.
// Platform selector
// Multiplayer selector
// Status selector
// Edit modal to change status
// Padaryti veikiantį search
// Doubleclick - nuveda į game page.
// Error handling
