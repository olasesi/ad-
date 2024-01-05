import React from "react";
import { useAdminii3UIController } from "./../../../context";
import HomeImage from "./../../../assets/images/icons/home.png";

interface SidenavCollapseProps {
  icon: React.ReactNode;
  name: string;
  active?: boolean;
}

function SidenavCollapse({ icon, name, active }: SidenavCollapseProps) {
  const [controller] = useAdminii3UIController();
  const { miniSidenav } = controller;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ minWidth: "32px", minHeight: "32px", color: "white" }}>
          {typeof icon === "string" ? <img src={HomeImage} alt="home" /> : icon}
        </div>

        <p
          style={{
            marginLeft: "10px",
            opacity: miniSidenav || (miniSidenav) ? 0 : 1,
            maxWidth:
              miniSidenav || (miniSidenav) ? 0 : "100%",
            transition: "opacity 300ms, max-width 300ms",
            color: "white", // Add your desired text color
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
}

export default SidenavCollapse;
