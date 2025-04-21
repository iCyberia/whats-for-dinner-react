import React, { useEffect, useState } from 'react';

function HomePage() {
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/upcomingmenu`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch upcoming meals');
        return res.json();
      })
      .then((data) => {
        console.log("✅ API Response:", data);
        setUpcomingMeals(data);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load upcoming menu');
      })
      .finally(() => setLoading(false)); // Always set loading to false
  }, []);
  

  function handleEatMeal(id) {
    fetch(`${process.env.REACT_APP_API_BASE}/api/upcomingmenu/${id}`, {
      method: 'DELETE'
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to remove meal');
        setUpcomingMeals(upcomingMeals.filter((meal) => meal.id !== id));
        setShowPrompt(false);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to remove meal.');
      });
  }

  function handlePickDinner() {
    if (upcomingMeals.length === 0) return;
    const random = upcomingMeals[Math.floor(Math.random() * upcomingMeals.length)];
    setSelectedMeal(random);
    setShowPrompt(true);
  }

  return (
    <div>
      <h1>What's for Dinner?</h1>
      {loading && <p>Loading upcoming meals...</p>}

      <button onClick={handlePickDinner} style={{ marginBottom: '1rem' }}>
        Pick Tonight's Dinner
      </button>

      {showPrompt && selectedMeal && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#fefefe',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          <h3>How about: {selectedMeal.dish?.name || 'Unknown Dish'}?</h3>
          <button onClick={() => handleEatMeal(selectedMeal.id)}>Eat It</button>
          <button onClick={handlePickDinner} style={{ marginLeft: '0.5rem' }}>Not Tonight</button>
          <button onClick={() => setShowPrompt(false)} style={{ marginLeft: '0.5rem' }}>Cancel</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Meal</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map((meal) => (
            <tr key={meal.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '0.5rem' }}>{meal.dish?.name || 'Unknown Dish'}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => handleEatMeal(meal.id)}>Eat It</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
