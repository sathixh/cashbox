document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('loginError');
    
    // Check credentials
    if (username === 'admin' && password === 'admin123') {
        // Store login state
        sessionStorage.setItem('isLoggedIn', 'true');
        // Redirect to main application
        window.location.href = 'index.html';
    } else {
        errorElement.textContent = 'Invalid username or password';
        errorElement.style.display = 'block';
    }
}); 
