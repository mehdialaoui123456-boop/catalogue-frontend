const API = 'http://localhost:5000/api';

// ── Recipes ───────────────────────────────────────────────────

// Get all recipes (no auth needed)
async function getRecipes(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/recipes${query ? '?' + query : ''}`);
  return res.json();
}

// Get single recipe by id
async function getRecipe(id) {
  const res = await fetch(`${API}/recipes/${id}`);
  return res.json();
}

// Create recipe (needs token)
async function createRecipe(recipe) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(recipe)
  });
  return res.json();
}

// Update recipe (needs token, owner only)
async function updateRecipe(id, recipe) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(recipe)
  });
  return res.json();
}

// Delete recipe (needs token, owner only)
async function deleteRecipe(id) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/recipes/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

// ── Auth ──────────────────────────────────────────────────────

// Login and save token
async function login(email, password) {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}