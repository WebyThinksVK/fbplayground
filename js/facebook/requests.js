var MAX_FRIENDS_PER_REQUEST = 50;
var GIFT_MESSAGE = '$$ for you to bet and win big!';
var INVITE_MESSAGE = 'Come join the fun at Jackpot Party Casino Slots today!';
var ASK_MESSAGE = 'Send me a gift to Spin and Win big!'

var INVITE = 'invite';
var GIFT   = 'gift';
var REGIFT = 'regift';
var ASK    = 'ask';
var HELP   = 'help';

function recordRequests(requestType, friends, giftType) {
    $.getJSON(
        appServer + 'requests/' + requestType + '/' + playerID,
        { 'ids': friends.join(',') },
        { 'giftType': giftType },
        function (result) { }
    );

    hideFlashScreenshot();
    KT.applicationRestored();
    getSWF('flashContent').onRequestsSent(requestType, friends);
}

function sendBatchedRequestsToFriends(requestType, friends, trackingTag, giftType, excludeIDs) {
    if (incompatibleBrowser)
    {
        popUnsupportedWarning();
    }
    else
    {
        friends = friends.filter(function (value) { return value; });

        if (friends.length === 0)
            return;

        var sendBatch, params = {
            method: 'apprequests',
            message: getMessageText(requestType),
            data: 'type=' + requestType + '&tracking=' + trackingTag + '&giftType=' + giftType,
            access_token: accessToken,
            action_type: 'send',
        };

        if (excludeIDs && (excludeIDs.length > 0))
            params.exclude_ids = excludeIDs.join(',');

        if ((requestType === GIFT) || (requestType === REGIFT) || (requestType === HELP))
            params.object_id = giftObjectID;
        else if (requestType === INVITE)
            params.object_id = inviteObjectID;
        else if (requestType === ASK)
            params.object_id = requestObjectID;

        var sendRequest = function (batch) {
            if (batch.length > 0) {
                params.to = batch.join(',');
                displayFlashScreenshot();
                FB.ui(params, function (response) {
                    if (response && (typeof response.error_code) === 'undefined') {
                        recordRequests(requestType, response.to, giftType);
                        sendBatch();
                    }
                });
            }
        };

        (sendBatch = function () { sendRequest(friends.splice(0, MAX_FRIENDS_PER_REQUEST)); })();
    }
}

function sendInviteRequestToFriends(trackingTag, friends, excludeIDs) {
    sendBatchedRequestsToFriends(INVITE, friends, trackingTag, 1, excludeIDs);
}

function sendGiftRequestToFriends(trackingTag, friends, giftType, excludeIDs) {
    sendBatchedRequestsToFriends(GIFT, friends, trackingTag, giftType, excludeIDs);
}

function sendRegiftRequestToFriends(trackingTag, friends, giftType, excludeIDs) {
    sendBatchedRequestsToFriends(REGIFT, friends, trackingTag, giftType, excludeIDs);
}

function sendAskRequestToFriends(trackingTag, friends, excludeIDs) {
    sendBatchedRequestsToFriends(ASK, friends, trackingTag, 1, excludeIDs);
}

function sendHelpRequestToFriends(trackingTag, friends, giftType, excludeIDs) {
    sendBatchedRequestsToFriends(HELP, friends, trackingTag, giftType, excludeIDs);
}

function getMessageText(type)
{
    if (type === INVITE)
    {
        return INVITE_MESSAGE;
    }

    if (type == ASK)
    {
      return ASK_MESSAGE;
    }

    var giftAmountText = (giftAmount / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return GIFT_MESSAGE.replace('$$', '$' + giftAmountText);
}

function sendRequestsToFriends(requestType, filterList, trackingTag, excludeIDs, giftType) {
    if (incompatibleBrowser)
    {
        popUnsupportedWarning();
    }
    else
    {
        var params = {
            method: 'apprequests',
            message: getMessageText(requestType),
            filters: filterList,
            data: 'type=' + requestType + '&tracking=' + trackingTag + '&giftType=' + giftType
        };

        if (excludeIDs && (excludeIDs.length > 0))
            params.exclude_ids = excludeIDs;

        displayFlashScreenshot();
        KT.applicationSuspended();
        FB.ui(params, function (response) {
            if (response && response.to) {
                recordRequests(requestType, response.to, giftType);
            }
        });
    }
}

function sendGiftsToFriends(trackingTag, excludeIDs, giftType) {
    sendRequestsToFriends(GIFT, ['app_users'], trackingTag, excludeIDs, giftType);
}

function sendRegiftsToFriends(trackingTag, excludeIDs, giftType) {
    sendRequestsToFriends(REGIFT, ['app_users'], trackingTag, excludeIDs, giftType);
}

function sendInvitesToFriends(trackingTag, excludeIDs) {
    sendRequestsToFriends(INVITE, ['app_non_users'], trackingTag, excludeIDs);
}

function sendAsksToFriends(trackingTag, excludeIDs) {
    sendRequestsToFriends(ASK, ['app_users'], trackingTag, excludeIDs);
}

function sendHelpsToFriends(trackingTag, excludeIDs, giftType) {
    sendRequestsToFriends(HELP, ['app_users'], trackingTag, excludeIDs, giftType);
}
