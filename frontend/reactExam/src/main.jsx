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
        element: <MainPage route={"games"} />,
      },
      {
        path: "/psgames",
        element: <MainPage route={"psgames"} />,
      },
      {
        path: "/xboxgames",
        element: <MainPage route={"xboxgames"} />,
      },
      {
        path: "/pcgames",
        element: <MainPage route={"pcgames"} />,
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

// Page to show all games. +++
// Platform selector
// Multiplayer selector
// Status selector
// Edit modal to change status
// Padaryti veikiantį search
// Onclick - nuveda į game page. +++
// Error handling
