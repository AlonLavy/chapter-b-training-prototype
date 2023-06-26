var username;
var password;

function is_username_taken(name, password) {
    const user = get_password_by_name(name);
    if (user == null) {
        return null;
    }
    else {
        return user == password;
    }
}

function create_user(name, password) {
    localStorage.setItem(name, password);
}

function get_password_by_name(name) {
    return localStorage.getItem(name);
}

function validate_signup() {
    const username = document.getElementById("signupUsername").value;
    const name = document.getElementById("signupName").value;
    const password = document.getElementById("signupPassword").value;
    const date = document.getElementById("signupDate").value;
    if (!validate_username(username)) {
        alert("Username too short. Username has to be at least 5 characters.");
        return false;
    }
    if (!validate_date(date)) {
        alert("Invalid Date. Enter a date before current date.");
        return false;
    }
    if (!validate_password(password)) {
        alert("Invalide password. Password has to be at least 8 characters, and include a capital letter, lower case letter, digit and symbol.");
        return false;
    }
    if (!validate_name(name)) {
        alert("Invalid name. Name has to be more than 1 character and less than 20");
        return false;
    }
    if (is_username_taken(username)) {
        alert("Username already taken. Try a new one!");
        return false;
    }
    localStorage.setItem(username, password)
    return true;
}

function login(event) {
    event.preventDefault();
    username = document.getElementById("loginUsername").value;
    password = document.getElementById("loginPassword").value;
    const validate = validate_login(username, password);
    if (validate || username == password) {
        switch_pages('game', 'login');
        document.getElementById("usernameTag").innerHTML = "Username: " + username;
        return true;
    }
    return false;
}

function validate_login(username, password) {

    if (validate_password(password) && validate_username(username) && password == get_password_by_name(username)) {
        return true;
    }
    alert("Wrong username or password. Please Try again.")
    return false;
}

function validate_date(date) {
    const today = new Date();
    return !(date > today);
}

function validate_password(password) {
    const paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    return paswd.test(password);
}

function validate_username(username) {
    return username.length >= 5;
}

function validate_name(name) {
    return (name.length > 1 && name.length < 20);
}