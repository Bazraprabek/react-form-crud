import React from "react";
import { Link } from "react-router-dom";
import DynamicTable from "../components/DynamicTable";

const Dashboard = () => {
  return (
    <section className="dashboard container-fluid py-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Dashboard</h2>
        <Link to="/register" className="btn btn-primary">
          Add User
        </Link>
      </div>
      <div className="pt-2">
        <DynamicTable />
      </div>
    </section>
  );
};

export default Dashboard;
