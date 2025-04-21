import React, { useEffect, useState } from 'react';

function UpcomingMenuPage() {
  const [allMeals, setAllMeals] = useState([]);
  const [upcomingMeals, setUpcomingMeals] = useState([]);
  const [selectedMealId, setSelectedMealId] = useState('');
  const [error, setError] = useState(null);

  // Load all meals for the dropdownapi
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/meals`)
      .then(res => res.json())
      .then(setAllMeals)
      .catch(() => setError('Failed to fetch meals.'));
  }, []);

  // Load upcoming meals
  const loadUpcoming = () => {
    fetch(`${process.env.REACT_APP_API_BASE}/api/upcomingmenu`)
      .then(res => res.json())
      .then(setUpcomingMeals)
      .catch(() => setError('Failed to fetch upcoming meals.'));
  };

  useEffect(() => {
    loadUpcoming();
  }, []);

  // Add a meal
  function handleAddMeal() {
    if (!selectedMealId) return;
    fetch(`${process.env.REACT_APP_API_BASE}/api/upcomingmenu/${selectedMealId}`, {
      method: 'POST'
    })
      .then(() => {
        setSelectedMealId('');
        loadUpcoming();
      })
      .catch(() => alert('Failed to add meal'));
  }

  // Remove a meal
  function handleRemove(id) {
    fetch(`${process.env.REACT_APP_API_BASE}/api/upcomingmenu/${id}`, {
      method: 'DELETE'
    })
      .then(loadUpcoming)
      .catch(() => alert('Failed to remove meal'));
  }

  // Clear all meals
  function handleClearAll() {
    Promise.all(upcomingMeals.map(m => 
      fetch(`${process.env.REACT_APP_API_BASE}/api/upcomingmenu/${m.id}`, { method: 'DELETE' })
    ))
      .then(loadUpcoming)
      .catch(() => alert('Failed to clear meals'));
  }

  return (
    <div>
      <h1>Upcoming Menu</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginBottom: '1rem' }}>
        <select
          value={selectedMealId}
          onChange={(e) => setSelectedMealId(e.target.value)}
        >
          <option value="">-- Select a Meal --</option>
          {allMeals.map(meal => (
            <option key={meal.id} value={meal.id}>
              {meal.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddMeal} style={{ marginLeft: '0.5rem' }}>Add Meal</button>
      </div>

      <p>Total Meals: {upcomingMeals.length}</p>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Meal</th>
            <th style={{ textAlign: 'left', padding: '0.5rem' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {upcomingMeals.map(meal => (
            <tr key={meal.id}>
              <td style={{ padding: '0.5rem' }}>{meal.dish?.name}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => handleRemove(meal.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {upcomingMeals.length > 0 && (
        <button onClick={handleClearAll} style={{ marginTop: '1rem' }}>
          Clear All Meals
        </button>
      )}
    </div>
  );
}

export default UpcomingMenuPage;
