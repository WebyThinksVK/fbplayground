function purchaseItemFromFacebook(openGraphURL, requestInfo) {
    if (incompatibleBrowser)
    {
        popUnsupportedWarning();
    }
    else
    {
        var requestID = requestInfo !== undefined ? requestInfo + '_' + (new Date).getTime() : '';
        displayFlashScreenshot();
        KT.applicationSuspended();
        FB.ui(
            {
                method: 'pay',
                action: 'purchaseitem',
                product: openGraphURL,
                request_id: requestID
            },
            purchaseCompleteCallback
        );
    }
}

function purchaseCompleteCallback(data) {
    var a = 500, b = 500;

    function purchasePolling() {
        $.getJSON(appServer + 'shop/verify/facebook',
            { signed_request: data.signed_request },
            function (response) {
                if (response.status)
                {
                    if (response.status == 'ok')
                    {
                        hideFlashScreenshot();
                        getSWF('flashContent').onPurchaseComplete(response);
                        KT.applicationRestored();
                    }
                    else if (response.status == 'pending')
                    {
                        var c = a + b;
                        a = b; b = c;

                        window.setTimeout(purchasePolling, c);
                    }
                }
            }
        );
    }

    if (data.signed_request)
        purchasePolling();
}
