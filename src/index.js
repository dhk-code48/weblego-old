import React from "react";
import ReactDOM from "react-dom/client";
import "./utils/index.css";
import Routes from "./Routes";
import { AppContextProvider } from "./context/AppContext";
import GlobalDndContext from "./utils/dnd-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContextProvider>
    <GlobalDndContext>
      <Routes />
    </GlobalDndContext>
  </AppContextProvider>
);
