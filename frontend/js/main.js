const API = 'https://VOTRE-APP.onrender.com/api';
let token = localStorage.getItem('token');

function showPage(pageId) {
  document.querySelectorAll('.splash, .page').forEach(el => el.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

async function inscription() {
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const date_naissance = document.getElementById('reg-date').value;
  const errorEl = document.getElementById('reg-error');

  try {
    const res = await fetch(`${API}/auth/inscription`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, date_naissance })
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.message;
      return;
    }
    showPage('connexion');
  } catch (err) {
    errorEl.textContent = 'Erreur serveur';
  }
}

async function connexion() {
  const email = document.getElementById('con-email').value;
  const password = document.getElementById('con-password').value;
  const errorEl = document.getElementById('con-error');

  try {
    const res = await fetch(`${API}/auth/connexion`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) {
      errorEl.textContent = data.message;
      return;
    }
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    token = data.token;
    showPage('flow');
  } catch (err) {
    errorEl.textContent = 'Erreur serveur';
  }
}

window.onload = () => {
  if (token) {
    showPage('flow');
  } else {
    showPage('splash');
  }
}


function deconnexion() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  token = null;
  showPage('splash');
}