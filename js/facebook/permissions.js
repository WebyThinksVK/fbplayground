function getFacebookPermissions()
{
    FB.api(
        '/me/permissions',
        'get',
        {
            access_token: accessToken
        },
        function(response)
        {
            getSWF('flashContent').OnFacebookPermissionsLoaded(response);
        }
    );
}

function getFriendsPermissions()
{
    FB.login(
        function(response)
        {
            getSWF('flashContent').OnGetFriendsPermsLoaded(response.authResponse);
        },
        {
            scope: 'user_friends',
            return_scopes: true,
        }
    );
}

function rerequestFriendsPermissions()
{
    FB.login(
        function(response)
        {
            getSWF('flashContent').OnRerequestFriendsPermsLoaded(response.authResponse);
        },
        {
            scope: 'user_friends',
            return_scopes: true,
            auth_type: 'rerequest'
        }
    );
}

function getPublishPermissions()
{
    FB.login(
        function(response)
        {
            getSWF('flashContent').OnGetPublishPermsLoaded(response.authResponse);
        },
        {
            scope: 'publish_actions',
            return_scopes: true,
        }
    );
}

function rerequestPublishPermissions()
{
    FB.login(
        function(response)
        {
            getSWF('flashContent').OnRerequestPublishPermsLoaded(response.authResponse);
        },
        {
            scope: 'publish_actions',
            return_scopes: true,
            auth_type: 'rerequest'
        }
    );
}

var playerPermissions = null;

function verifyFacebookPermission(scopeName, callback)
{
    if (playerPermissions === null)
    {
        FB.api(
            '/me/permissions',
            'get',
            {
                access_token: accessToken
            },
            function (response)
            {
                if ((response.data !== undefined) && response.data)
                {
                    playerPermissions = response.data;
                    reVerifyFBPermissions(scopeName, callback);
                }
            }
        );
    }
    else
    {
        reVerifyFBPermissions(scopeName, callback);
    }
}

function reVerifyFBPermissions(scopeName, callback)
{
    var count = playerPermissions.length;
    for (var idx = 0; idx < count; idx++)
    {
        if ((playerPermissions[idx].permission === scopeName) && (playerPermissions[idx].status === 'granted'))
        {
            callback();
            return;
        }
    }

    FB.login(
        function (response)
        {
            var permissions = response.authResponse.grantedScopes.split(',');
            var granted = false;

            var count = permissions.length;
            for (var idx = 0; idx < count; idx++)
            {
                granted = permissions[idx] === scopeName;

                playerPermissions.push({
                    permission: permissions[idx],
                    status: 'granted'
                });
            }

            if (granted)
                callback();
        },
        {
            scope: scopeName,
            return_scopes: true
        }
    );
}
