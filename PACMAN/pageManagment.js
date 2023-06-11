function switch_pages(show, hide)
{
    document.getElementById(show).style.display='block';
    document.getElementById(hide).style.display='none';
    return false;
}

function validate_signup(username, name, password, date, email)
{

}

function validate_login(username, password)
{

}

function validate_date(date)
{
    const today = new Date();
    return !(date > today)
}

function validate_password(password)
{
    return password.length >=8;
}

function validate_username(username)
{
    return username.length >=8
}

