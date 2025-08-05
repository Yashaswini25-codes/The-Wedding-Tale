document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');

    function showMessage(message, isError = false) {
        messageDiv.textContent = message;
        messageDiv.className = isError ? 'error' : 'success';
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            action: 'login',
            username: this.username.value,
            password: this.password.value
        };

        fetch('auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, data.status === 'error');
            if (data.status === 'success') {
                loginForm.reset();
                // Redirect or update UI as needed
            }
        })
        .catch(error => showMessage('An error occurred', true));
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = {
            action: 'signup',
            username: this.username.value,
            email: this.email.value,
            password: this.password.value
        };

        fetch('auth.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showMessage(data.message, data.status === 'error');
            if (data.status === 'success') {
                signupForm.reset();
                // Redirect or update UI as needed
            }
        })
        .catch(error => showMessage('An error occurred', true));
    });
});