function PopLink(theUrl, theName, theSpecs, confirm)
{
    confirm = (typeof confirm !== 'undefined') ? confirm : false;
    if (confirm && theName == '_top')
    {
        if (!window.confirm('You are about to leave this page and go to ' + theUrl + '.  Are you sure?'))
            return;
    }
    window.open(theUrl, theName, theSpecs);
}

function refreshTheGame()
{
    window.parent.location = window.location;
}