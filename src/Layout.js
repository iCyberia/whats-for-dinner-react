import React, { useState } from 'react';
import './Layout.css';

function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="layout">
            {/* Top toggle bar for mobile */}
            <div className="mobile-header">
                <button className="toggle-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
            </div>

            {/* Sidebar nav */}
            <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href="/">🏠 Home</a></li>
                    <li><a href="/menu">📅 Upcoming Menu</a></li>
                    <li><a href="/grocery">🛒 Grocery List</a></li>
                    <li><a href="/add">🍽️ Add Dish</a></li>
                </ul>
            </nav>

            <main>{children}</main>
        </div>
    );
}

export default Layout;
