import React, { useState } from 'react';
import './Layout.css';
import logo from './logo.png';

function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">
      {/* Mobile Toggle Button */}
      <div className="mobile-header">
        <button className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/">🏠 Home</a></li>
          <li><a href="/menu">📅 Upcoming Menu</a></li>
          <li><a href="/grocery">🛒 Grocery List</a></li>
          <li><a href="/add">🍽️ Add Dish</a></li>
        </ul>
      </nav>

      {/* Main Content Area */}
      <div className="main-content">
        <header className="app-header">
          <img src={logo} alt="Logo" className="app-logo" ></img>
          
        </header>

        <main>{children}</main>
      </div>
    </div>
  );
}

export default Layout;
