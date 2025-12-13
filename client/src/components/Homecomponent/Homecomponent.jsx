import React from 'react';
import './Homecomponent.css';
import { FaUser, FaChartLine, FaCog } from 'react-icons/fa';

const HomeComponent = () => {
  return (
    <div className="home">
      <h1 className="title">Welcome 👋</h1>
      <p className="description">Explore your dashboard</p>

      <div className="cards">
        <div className="card"><FaUser /> Profile</div>
        <div className="card"><FaChartLine /> Analytics</div>
        <div className="card"><FaCog /> Settings</div>
      </div>
    </div>
  );
};

export default HomeComponent;
