function inviteFriends(trackingTag) {
    var params = {
        method: 'apprequests',
        message: 'Come join the fun at Jackpot Party Social Casino today!',
        filters: ['app_non_users'],
        data: 'type=invite&tracking=' + trackingTag
    };

    displayFlashScreenshot();
    KT.applicationSuspended();
    FB.ui(params, onInviteComplete);
}

function onInviteComplete(response) {
    hideFlashScreenshot();
    KT.applicationRestored();
    if (response && ((typeof response.error_code) == 'undefined')) {
        getSWF('flashContent').onInviteComplete(response);
    }
}
