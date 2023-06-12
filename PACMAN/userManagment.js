function is_username_taken(name, password) { //arrow function 
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
    localStorage.getItem(name);
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
    else if (!validate_date(date)) {
        alert("Invalid Date. Enter a date before current date.");
        return false;
    }
    else if (!validate_password(password)) {
        alert("Invalide password. Password has to be at least 8 characters.");
        return false;
    }
    else if (!validate_name(name)) {
        alert("Invalid name. Name has to be more than 1 character and less than 20");
        return false;
    }
    else if (is_username_taken(username)) {
        alert("Username already taken. Try a new one!");
        return false;
    }
    else return true;
}

function validate_login(username, password) {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    if (validate_password(password) && validate_username(username) && password == get_password_by_name(username)) { // exapnd the if
        return true;
    }
    return false;
}

function validate_date(date) {
    const today = new Date();
    return !(date > today);
}

function validate_password(password) {
    return password.length >= 8; //regex for digit and symbol
}

function validate_username(username) {
    return username.length >= 5;
}

function validate_name(name) {
    return (name.length > 1 && name.length < 20);
}