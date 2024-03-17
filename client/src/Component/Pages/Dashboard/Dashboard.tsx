import React from "react";
import Img from "../../../assets/Dashboards/welcomeDashboard.png";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-4xl">Bienvenido</h2>
      <img src={Img} alt="imagen de inicio" />
    </div>
  );
};

export default Dashboard;
