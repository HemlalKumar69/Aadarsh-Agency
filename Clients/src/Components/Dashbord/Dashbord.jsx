import React from "react";
import Navbarfrist from "./Navbarfrist";
import DashboardNav from "./DashboardNav";
import DashboardCards from "./DashboardCards";

const Dashboard = () => {
  return (
    <div>
      <Navbarfrist />
      <DashboardNav />
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
