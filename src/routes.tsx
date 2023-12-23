import React, { ReactElement } from "react";
import Dashboard from "./layouts/dashboard";
import NFTMarketplace from "./layouts/NFT-marketplace";
import Tables from "./layouts/tables";
import Kanban from "./layouts/kanban";
import Profile from "./layouts/profile";
import SignIn from "./layouts/authentication/sign-in";

import NFTMarketplaceImage from "./assets/images/icons/nftmarketplace.png";
import TableImage from "./assets/images/icons/table.png";
import KanbanImage from "./assets/images/icons/kanban.png";
import HomeImage from "./assets/images/icons/home.png";
import SigninImage from "./assets/images/icons/signin.png";
import ProfileImage from "./assets/images/icons/user.png";

interface Route {
  type: string;
  name: string;
  key: string;
  icon: ReactElement;
  route: string;
  component: ReactElement;
}

const routes: Route[] = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <img src={HomeImage} alt="home" />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "NFT Marketplace",
    key: "nft",
    icon: <img src={NFTMarketplaceImage} alt="nft-marketplace" />,
    route: "/nft-marketplace",
    component: <NFTMarketplace />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <img src={TableImage} alt="table" />,
    route: "/tables",
    component: <Tables />,
  },

  {
    type: "collapse",
    name: "Kanban",
    key: "kanban",
    icon: <img src={KanbanImage} alt="kanban" />,
    route: "/kanban",
    component: <Kanban />,
  },

  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <img src={ProfileImage} alt="profile" />,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <img src={SigninImage} alt="signin" />,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
];

export default routes;
