import React, { useState } from 'react';

function AddDishPage() {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState([
    { name: '', quantity: '', unit: '' }
  ]);
  const [message, setMessage] = useState('');

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredientRow = () => {
    setIngredients([...ingredients, { name: '', quantity: '', unit: '' }]);
  };

  const removeIngredientRow = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const handleSubmit = async () => {
    if (!dishName.trim()) {
      alert('Dish name is required.');
      return;
    }

    const validIngredients = ingredients.filter(i => i.name.trim());
    if (validIngredients.length === 0) {
      alert('Please add at least one ingredient.');
      return;
    }

    const payload = {
      name: dishName,
      ingredients: validIngredients.map(i => ({
        ingredientName: i.name,
        quantity: parseFloat(i.quantity) || 0,
        unit: i.unit
      }))
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/api/dishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to add dish.');

      setMessage('✅ Dish added successfully!');
      setDishName('');
      setIngredients([{ name: '', quantity: '', unit: '' }]);
    } catch (err) {
      console.error(err);
      setMessage('❌ Error: Could not add dish.');
    }
  };

  return (
    <div>
      <h1>Add a Dish</h1>

      <label>
        Dish Name:
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          style={{ marginLeft: '1rem' }}
        />
      </label>

      <h3 style={{ marginTop: '1rem' }}>Ingredients</h3>
      {ingredients.map((ingredient, index) => (
        <div key={index} style={{ marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Name"
            value={ingredient.name}
            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <input
            type="text"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
            style={{ marginRight: '0.5rem', width: '80px' }}
          />
          <input
            type="text"
            placeholder="Unit"
            value={ingredient.unit}
            onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
            style={{ marginRight: '0.5rem', width: '100px' }}
          />
          <button onClick={() => removeIngredientRow(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addIngredientRow}>Add Ingredient</button>

      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleSubmit}>Submit Dish</button>
      </div>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
}

export default AddDishPage;
