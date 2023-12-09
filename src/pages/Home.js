import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = ({ onLogout }) => {
  return (
      <div className="home-container">
        <div className="content">
          <h1>Welcome to Bank Management system</h1>
          <p>Manage your banks efficiently with our platform.</p>
          <Link to="/login" className="btn btn-primary">Login</Link>
        </div>
      </div>
  );
}

export default Home;
