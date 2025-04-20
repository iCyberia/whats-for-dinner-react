import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './HomePage';
import UpcomingMenuPage from './UpcomingMenuPage';
import GroceryListPage from './GroceryListPage';

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<UpcomingMenuPage />} />
<Route path="/grocery" element={<GroceryListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
