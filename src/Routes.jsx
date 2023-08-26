import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Editor, Home, Error, App } from "./views";
import { WebView } from "./layouts";
import Preivew from "./views/Preview";
import Website from "./views/Website";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/editor/:uid/:id/:page",
    element: <Editor />,
  },
  {
    path: "/app/:userUid",
    element: <App />,
  },
  {
    path: "/preview/:id/:page",
    element: <Preivew />,
  },
  {
    path: "/websites/:uid/:id",
    element: <Website />,
  },
]);

const Routes = () => {
  return <RouterProvider router={router} />;
};

export default Routes;
