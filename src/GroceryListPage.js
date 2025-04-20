import React, { useEffect, useState } from 'react';

function GroceryListPage() {
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/upcomingmenu/grocerylist')
    .then((res) => {
      if (!res.ok) throw new Error('Failed to fetch grocery list');
      return res.json();
    })
    .then(setIngredients)
    .catch(() => setError('Failed to load grocery list.'));
}, []);


  return (
    <div>
      <h1>Grocery List</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Ingredient</th>
            <th style={{ padding: '0.5rem', textAlign: 'left' }}>Quantity</th>
            
          </tr>
        </thead>
        <tbody>
          {ingredients.map((item, index) => (
            <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '0.5rem' }}>{item.name}</td>
              <td style={{ padding: '0.5rem' }}>{item.quantity} {item.unit}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GroceryListPage;
