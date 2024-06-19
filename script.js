document.addEventListener('DOMContentLoaded', () => {
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');
    
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }
    if (btnSignUp) {
        btnSignUp.addEventListener('click', register);
    }
    if (btnLogout) {
        btnLogout.addEventListener('click', logout);
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    async function login() {
        const usernamelogin = document.getElementById('inputUserName').value;
        const passwordlogin = document.getElementById('inputPassWord').value;
        
        if (usernamelogin.length < 5 || passwordlogin.length < 8) {
            alert('Username must be more than 5 characters and password more than 8 characters.');
            return;
        }

        const response = await fetch('https://665736849f970b3b36c864e7.mockapi.io/login1');
        const data = await response.json();

        let user = data.find(user => user.userName === usernamelogin && user.password === passwordlogin);

        if (user) {
            localStorage.setItem('userName', user.userName);
            window.location.href = "profile.html";
        } else {
            alert('Incorrect username or password');
        }
    }

    async function register() {
        const usernameSignUp = document.getElementById('inputUserName1').value;
        const emailSignUp = document.getElementById('inputEmail').value;
        const passwordSignUp = document.getElementById('inputPassWord1').value;

        if (usernameSignUp.length < 5) {
            alert('Username must be more than 5 characters.');
            return;
        }

        if (!validateEmail(emailSignUp)) {
            alert('Invalid email.');
            return;
        }

        if (passwordSignUp.length < 8) {
            alert('Password must be more than 8 characters.');
            return;
        }

        const response = await fetch('https://665736849f970b3b36c864e7.mockapi.io/login1', {
            method: 'POST',
            body: JSON.stringify({
                userName: usernameSignUp,
                email: emailSignUp,
                password: passwordSignUp
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const data = await response.json();
        localStorage.setItem('userName', data.userName);
        window.location.href = "./index.html";
    }

    function logout() {
        localStorage.removeItem('userName');
        window.location.href = "index.html";
    }

    if (window.location.pathname.endsWith('profile.html')) {
        const username = localStorage.getItem('userName');
        if (!username) {
            window.location.href = "index.html";
        } else {
            document.getElementById('username').textContent = username;
        }
    }
});
