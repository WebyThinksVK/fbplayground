'use strict';

function getFacebookFriends() {
    verifyFacebookPermission('user_friends', function () {
        var swf = getSWF('flashContent');
        var params = {
            access_token: accessToken,
            fields: ['picture', 'id', 'first_name', 'last_name', 'name'].join(',')
        };

        var getFriends = function(endpoint, callback) {
            FB.api(endpoint, 'get', params, callback);
        };

        getFriends('/me/friends?limit=200', function (response) { swf.onFacebookFriendsLoaded(response); });
        getFriends('/me/invitable_friends?limit=200', function (response) { swf.onInvitableFriendsLoaded(response); });
    });
}
