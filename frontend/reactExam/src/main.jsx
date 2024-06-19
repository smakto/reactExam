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
import { GeneralContextProvider } from "./contexts/useContext";

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
        path: "/psgames",
        element: <MainPage />,
      },
      {
        path: "/xboxgames",
        element: <MainPage />,
      },
      {
        path: "/pcgames",
        element: <MainPage />,
      },
      {
        path: "/multiplayer",
        element: <MainPage />,
      },
      {
        path: "/genre/:genre",
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
    <GeneralContextProvider>
      <RouterProvider router={router} />
    </GeneralContextProvider>
  </React.StrictMode>
);
