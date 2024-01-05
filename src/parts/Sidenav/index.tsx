import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAdminii3UIController, setMiniSidenav } from "./../../context";
import SidenavCollapse from "./styles/SidenavCollapse";

interface RouteItem {
  type: string;
  name: string;
  icon?: React.ReactNode;
  title?: string;
  key: string;
  href?: string;
  route?: string;
}

interface SidenavProps {
  brandName: string;
  routes: RouteItem[];
}

function Sidenav({ brandName, routes }: SidenavProps) {
  const [controller, dispatch] = useAdminii3UIController();
  const { miniSidenav, darkMode } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    window.addEventListener("resize", handleMiniSidenav);
    handleMiniSidenav();

    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  const renderRoutes = routes.map(({ type, name, icon, title, key, href, route }: RouteItem) => {
    if (type === "collapse") {
        return (
            <Link key={key} to={route || '/'} style={{ textDecoration: "none" }}>
              <SidenavCollapse name={name} icon={icon} active={key === collapseName} />
            </Link>
          );
    } else if (type === "title") {
      return (
        <p
          key={key}
          style={{
            textTransform: "uppercase",
            color: "white",
            display: "block",
            fontSize: "0.75rem",
            fontWeight: "bold",
            marginTop: "0.5rem",
            marginBottom: "0.25rem",
            marginLeft: "1rem",
          }}
        >
          {title}
        </p>
      );
    } else if (type === "divider") {
      return <hr key={key} style={{ margin: 0, borderColor: "#444" }} />;
    }

    return null;
  });

  return (
    <div style={{ width: miniSidenav ? "80px" : "250px", backgroundColor: "#333", height: "100%" }}>
      {/* Rest of your JSX */}
      <ul>{renderRoutes}</ul>
      {/* Rest of your JSX */}
    </div>
  );
}

export default Sidenav;
