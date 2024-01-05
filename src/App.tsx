import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes from "./routes";
import Sidenav from "./parts/Sidenav";

import { useAdminii3UIController } from "./context";

function App() {
  // @ts-ignore
  const { layout } = useAdminii3UIController();

  type RouteItem = {
    route?: string;
    component: React.ReactNode;
    key: string;
    collapse?: RouteItem[];
    // Add any other properties as needed
  };

  const getRoutes = (allRoutes: RouteItem[]): (JSX.Element | null)[] => {
    // @ts-ignore
    return allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route key={route.key} path={route.route} element={route.component} />
        );
      }

      return null;
    });
  };

  return (
    <>
      {layout === "dashboard" && (
        <Sidenav brandName="Adminii" routes={routes} />
      )}

      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  );
}

export default App;
