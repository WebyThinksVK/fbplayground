function constructPostParams(params, type, ogURL, ktVars) {
    params[type] = appServer + ogURL;

    if (ktVars)
        params['ref'] = ktVars;

    return params;
}

function PostToTimeline(friendFacebookID, pictureURL, captionStr, descriptionStr, trafficSource, ktVars) {
    if (incompatibleBrowser)
    {
        popUnsupportedWarning();
    }
    else
    {
        var ts = trafficSource ? '&trafficSource=' + trafficSource : '',
        ktArray = ktVars.split('='),
        ktValues = [];

        for (var index = 0; index < ktArray.length; index++) {
            ktValues[index] = ktArray[index].split('&')[0];
        }

        var subtype_1 = ktValues[1] || '',
            subtype_2 = ktValues[2] || '',
            subtype_3 = ktValues[3] || '',
            kt_u = ktValues[4] || '',
            newKTVars = 'st1=' + subtype_1 + '&st2=' + subtype_2 + '&st3=' + subtype_3 + '&kt_u=' + kt_u;

        displayFlashScreenshot();
        FB.ui(
            {
                method: 'feed',
                link: 'https://apps.facebook.com/' + appNamespace + '?' + newKTVars + ts,
                picture: pictureURL,
                name: 'Jackpot Party Casino',
                caption: captionStr,
                description: descriptionStr,
                app_id: appID,
                to: friendFacebookID
            },
            function (response) {
                if (response && (typeof response.error_code) === 'undefined') {
                    getSWF('flashContent').onTimelinePostComplete(response, ktVars);
                }
            }
        );
    }
}

function PostToOpenGraph(action, type, ogURL, ktVars) {
    if (incompatibleBrowser)
    {
        popUnsupportedWarning();
    }
    else
    {
        var params = constructPostParams({}, type, ogURL, ktVars);

        displayFlashScreenshot();
        KT.applicationSuspended();
        FB.ui(
            {
                method: 'share_open_graph',
                action_type: appNamespace + ':' + action,
                action_properties: JSON.stringify(params)
            },
            function (response) {
                hideFlashScreenshot();
                KT.applicationRestored();
                if (response && (typeof response.error_code) === 'undefined') {
                    getSWF('flashContent').onOpenGraphPostComplete(response, ktVars);
                }
            }
        );
    }
}

function PostSlotToOpenGraph(params, ktVars) {
    PostToOpenGraph('play', 'slot', ['og', 'slot', params.game_id].join('/'), ktVars);
}

function PostLevelUpToOpenGraph(params, ktVars) {
    PostToOpenGraph('gain', 'level', ['og', 'level', gender, params.level].join('/'), ktVars);
}

function PostJackpotToOpenGraph(params, ktVars) {
    PostToOpenGraph('win', 'jackpot', ['og', 'jackpot', gender, params.game_id, params.amount].join('/'), ktVars);
}

function PostTournamentWinToOpenGraph(params, ktVars) {
    PostToOpenGraph('win', 'tournament', ['og', 'tournament', 'win', params.place, params.amount].join('/'), ktVars);
}

function PostDailyBonusToOpenGraph(params, ktVars) {
    PostToOpenGraph('collect', 'daily_bonus', ['og', 'daily_bonus', params.amount].join('/'), ktVars);
}

function PostCashOutToOpenGraph(params, ktVars) {
    PostToOpenGraph('get', 'win', ['og', 'win', params.amount].join('/'), ktVars);
}

function PostBigWinToOpenGraph(params, ktVars) {
    PostToOpenGraph('hit', 'big_win', ['og', 'big_win', params.win_amount, params.bet_amount, params.slot_name].join('/'), ktVars);
}
