import React from "react";
import Routes from "./routes";
import { useRoutes } from "react-router-dom";

export const App = () => {
  const routing = useRoutes(Routes);
  return <>{routing}</>;
};
