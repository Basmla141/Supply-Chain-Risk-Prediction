// =====================================================
//  login.js - RiskChain AI Login Page JavaScript Logic
// =====================================================

/**
 * switchTab(tab)
 * Toggles between the Login and Register forms.
 * @param {string} tab - 'login' or 'register'
 */
function switchTab(tab) {
  // Toggle active class on the tab buttons (index 0 = login, index 1 = register)
  document.querySelectorAll('.tab').forEach((t, i) =>
    t.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1))
  );

  // Show/hide the correct form
  document.getElementById('loginForm').style.display    = tab === 'login'    ? 'block' : 'none';
  document.getElementById('registerForm').style.display = tab === 'register' ? 'block' : 'none';
}

/**
 * doLogin()
 * Reads the email and password, sends a POST request to the login API,
 * and redirects to '/' on success.
 */
async function doLogin() {
  const email    = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const errEl    = document.getElementById('loginError');

  errEl.style.display = 'none';

  // Client-side validation: both fields must be filled
  if (!email || !password) {
    errEl.textContent  = '[ERR] Missing parameters.';
    errEl.style.display = 'block';
    return;
  }

  try {
    // POST to Django backend login endpoint
    const r = await fetch('/api/auth/login/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email, password })
    });

    const d = await r.json();

    if (d.status === 'success') {
      window.location.href = '/';          // Redirect to dashboard
    } else {
      errEl.textContent  = '[ERR] ' + (d.message || 'Invalid credentials.');
      errEl.style.display = 'block';
    }

  } catch (e) {
    errEl.textContent  = '[ERR] Connection refused by host.';
    errEl.style.display = 'block';
  }
}

/**
 * doRegister()
 * Reads name, email, and password, sends a POST request to the register API,
 * and redirects to '/' on success.
 */
async function doRegister() {
  const name     = document.getElementById('regName').value;
  const email    = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const errEl    = document.getElementById('regError');

  errEl.style.display = 'none';

  // Client-side validation
  if (!name || !email || !password) {
    errEl.textContent  = '[ERR] Missing parameters.';
    errEl.style.display = 'block';
    return;
  }

  try {
    // POST to Django backend register endpoint
    const r = await fetch('/api/auth/register/', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ name, email, password })
    });

    const d = await r.json();

    if (d.status === 'success') {
      window.location.href = '/';           // Redirect to dashboard
    } else {
      errEl.textContent  = '[ERR] ' + (d.message || 'Registration failed.');
      errEl.style.display = 'block';
    }

  } catch (e) {
    errEl.textContent  = '[ERR] Connection refused by host.';
    errEl.style.display = 'block';
  }
}

// -------------------------------------------------------
// Global keyboard shortcut: press Enter to submit the
// currently visible form (login or register).
// -------------------------------------------------------
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const lf = document.getElementById('loginForm');
    if (lf.style.display !== 'none') {
      doLogin();
    } else {
      doRegister();
    }
  }
});
