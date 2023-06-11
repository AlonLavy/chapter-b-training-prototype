function is_user_created(name, password)
{
    const user = get_user_by_name(name);
    if(user == null)
    {
        return null;
    }
    else
    {
        return user == password;
    }
}

function create_user(name, password)
{
    localStorage.setItem(name, password);
}

function get_user_by_name(name)
{
    localStorage.getItem(name);
}