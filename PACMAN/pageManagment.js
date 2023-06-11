function switch_pages(show, hide)
{
    document.getElementById(show).style.display='block';
    document.getElementById(hide).style.display='none';
    return false;
}

function validate_signup(username, name, password, date)
{
    if(!validate_username(username))
    {
        alert("Username too short. Username has to be at least 5 characters.");
        return false;
    }
    else if(!validate_date(date))
    {
        alert("Invalid Date. Enter a date before current date.");
        return false;
    }
    else if(!validate_password(password))
    {
        alert("Invalide password. Password has to be at least 8 characters.");
        return false;
    }
    else if(!validate_name(name))
    {
        alert("Invalid name. Name has to be more than 1 character and less than 20");
        return false;
    }
    else if(is_username_taken(username))
    {
        alert("Username already taken. Try a new one!");
        return false;
    }
    else return true;
}

function validate_login(username, password)
{
    if (validate_password(password) && validate_username(username))
    {
        if(password == get_password_by_name(username))
        {
            return true;
        }
    }
    return false;
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
    return username.length >=5
}

function validate_name(name)
{
    return (name.length > 1 && name.length<20)
}

