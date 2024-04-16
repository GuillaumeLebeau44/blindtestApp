import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Blindtest, { loadSongsData } from "./pages/Blindtest";
import Score, { loadScoresData } from "./pages/Score";
import "./styles/index.scss";
import Admin from "./pages/Admin";
import EndlessBlindtest from "./pages/EndlessBlindtest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Blindtest />,
        loader: loadSongsData,
      },
      {
        path: "/endless",
        element: <EndlessBlindtest />,
        loader: loadSongsData,
      },
      {
        path: "/leaderboard",
        element: <Score />,
        loader: loadScoresData,
      },
      {
        path: "/admin",
        element: <Admin />,
        loader: loadSongsData,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
