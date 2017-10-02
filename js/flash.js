function getFlashVersion() {
    try // ie
    {
        try
        {
            // avoid fp6 minor version lookup issues
            // see: http://blog.deconcept.com/2006/01/11/getvariable-setvariable-crash-internet-explorer-flash-6/
            var axo = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
            try
            {
                axo.AllowScriptAccess = 'always';
            }
            catch(e)
            {
                return '6_0_0';
            }
        }
        catch(e) { }

        return new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, '_').match(/^_?(.+)_?$/)[1];
    } // other browsers
    catch(e)
    {
        try
        {
            if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)
            {
            return (navigator.plugins["Shockwave Flash 2.0"] ||
                    navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, "_").match(/^_?(.+)_?$/)[1];
            }
        }
        catch(e) { }
    }

    return '0_0_0';
}

function getSWF(movieName) {
    if (navigator.appName.indexOf("Microsoft") != -1)
        return window[movieName];
    else
        return document[movieName];
}

function displayFlashScreenshot() {
    // Move the Flash object off the screen and place the screenshot img
    $j('#wrap').css('text-align', 'left').css('top', '-10000px').css('position', 'relative');
    $j('#imageContent').css('top', '10000px');
}

function hideFlashScreenshot() {
    // Move the screenshot img off the screen and place the Flash object
    $j('#wrap').css('text-align', 'center').css('top', '0px').css('position', 'relative');
    $j('#imageContent').css('top', '-10000px');
}

function onFlashHide(info) {
    if (info.state == 'opened')
        displayFlashScreenshot();
    else
    {
        hideFlashScreenshot();
        getSWF('flashContent').onHideFlashScreenshot();
    }
}

function popUnsupportedBanner()
{
    var bannerDom = document.createElement('div');
    bannerDom.id = 'browserBanner';

    var innerHtml = document.createElement('div');

    innerHtml.innerHTML += 'Your browser is no longer supported. Some features may be unavailable.<br/><br/>';
    // innerHtml.innerHTML += '<span id="btnCloseBanner" class="unsuportedClose">X</span>';

    bannerDom.appendChild(innerHtml);

    var wrapNode = document.getElementById('wrap');
    wrapNode.insertBefore(bannerDom, wrapNode.childNodes[0]);

    // $('#btnCloseBanner').click(function(){
    //     $('#browserBanner').remove();
    // });
}

function popUnsupportedWarning()
{
    displayFlashScreenshot();
    KT.applicationSuspended();

    var dialogDom = document.createElement('div');
    dialogDom.id = 'browserDialog';

    var modalBG = document.createElement('div');
    modalBG.setAttribute('class', 'modalBG');

    var innerHtml = document.createElement('div');
    innerHtml.setAttribute('class', 'unsupportedDialog');

    innerHtml.innerHTML += "We've encountered a problem with your browser.<br/>";
    innerHtml.innerHTML += 'Please upgrade your browser to enjoy all of Jackpot Party Casino!<br/><br/>';
    innerHtml.innerHTML += 'Contact <a target="_top" href="mailto:ie9@jackpotpartycasino.zendesk.com?subject=Browser%20Support">ie9@jackpotpartycasino.zendesk.com</a> for help.<br/><br/>';
    innerHtml.innerHTML += '<span id="btnCloseDialog" class="unsuportedClose" style="top:0px; right:0px;">X</span>';

    dialogDom.appendChild(modalBG);
    dialogDom.appendChild(innerHtml);

    var wrapNode = document.getElementById('wrap');
    wrapNode.insertBefore(dialogDom, wrapNode.childNodes[0]);

    $j('#btnCloseDialog').click(function(){
        $j('#browserDialog').remove();
        hideFlashScreenshot();
        getSWF('flashContent').onHideFlashScreenshot();
        KT.applicationRestored();
    });

    if (isUnsupportedBrowser)
        KT.showDialogBrowser();
}

var incompatibleBrowser = false;
var isUnsupportedBrowser = false;

function loadSWF() {
    if (typeof KT !== 'undefined')
        KT.preEmbedSWF();

    var flashvars = {
        playerID: playerID,
        appServerHostName: appServer,
        cdnHostName: cdnServer,
        slotHostName: slotServer,
        assetHostName: assetServer,
        upsightKey: upsightKeyCanvas,
        upsightURL: upsightURLCanvas,
        upsight2Key: upsight2KeyCanvas,
        upsight2URL: upsight2URLCanvas,
        gender: genderCanvas,
        birthday: ''
    };

    for (var key in extraFlashVars)
        flashvars[key] = extraFlashVars[key];

    var params = {
        wmode: 'direct',
        allowScriptAccess: 'always',
        allowfullscreen: 'true',
        menu: 'false'
    };

    var attributes = { };

    swfobject.embedSWF(
        cdnServer + 'JackpotPartyCasino.swf',
        'flashContent',
        '100%', '1024',
        '11.0',
        null,
        flashvars,
        params,
        attributes,
        function (result) {
            if (result.success)
            {
                if (isNewPlayer && (typeof KT !== 'undefined'))
                    KT.hasFlash();
                $j('#flashContent').css('background', '#000');
            }
            else
            {
                if (isNewPlayer && (typeof KT !== 'undefined'))
                    KT.failedHasFlash();
                $j('#noFlashContainer').css('display', 'block');
            }
        }
    );

    var systemInfo = {
        flash_version: getFlashVersion(),
        browser: BrowserDetect.browser,
        browser_version: BrowserDetect.version,
        system: BrowserDetect.OS
    };

    if (unsupportedEnabled)
    {
        isUnsupportedBrowser = unsupportedBrowsers[systemInfo.browser] !== undefined;
        incompatibleBrowser = isUnsupportedBrowser && (unsupportedBrowsers[systemInfo.browser].indexOf(systemInfo.browser_version) !== -1 || unsupportedBrowsers[systemInfo.browser][0] <= 0);

        if (incompatibleBrowser)
        {
            popUnsupportedBanner();
            popUnsupportedWarning();
        }
    }

    $j.getJSON(appServer + 'stats/update/' + playerID, {stats: systemInfo}, function(data) {});

    getSWF('flashContent').oncontextmenu = function()
    {
        return false;
    }
}