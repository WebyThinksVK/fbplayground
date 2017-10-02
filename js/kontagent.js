var KT = {
    key: upsightKeyCanvas,
    params: ktParams,

    init: function () {
        // configure and instantiate Kontagent object
        this.api = new KontagentApi(KT.key, KT.params);

        this.basicData = JSON.stringify({
            flash_version: getFlashVersion(),
            browser: BrowserDetect.browser,
            version: BrowserDetect.version,
            system: BrowserDetect.OS
        });

        this.appTrackingTag = 0;

        if (isNewPlayer)
            this.arrivedAtPage();
    },

    applicationSuspended: function () {
        this.appTrackingTag = this.api.genUniqueTrackingTag();
        var data = JSON.parse(this.basicData);
        data.tracking_tag = this.appTrackingTag;

        this.api.trackEvent(
            playerID,
            'suspended',
            {
                subtype1: 'application',
                data: JSON.stringify(data)
            },
            function (data) { }
        );
    },

    applicationRestored: function () {
        var data = JSON.parse(this.basicData);
        data.tracking_tag = this.appTrackingTag;

        this.api.trackEvent(
            playerID,
            'restored',
            {
                subtype1: 'application',
                data: JSON.stringify(data)
            },
            function (data) { }
        );
    },

    arrivedAtPage: function () {
        this.api.trackEvent(
            playerID,
            'arrived_at_page',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    calledFBAsyncInit: function () {
        this.api.trackEvent(
            playerID,
            'called_fb_async_init',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    finishedFBInit: function () {
        this.api.trackEvent(
            playerID,
            'finished_fb_init',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    preEmbedSWF: function () {
        this.api.trackEvent(
            playerID,
            'pre_embed_swf',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    hasFlash: function () {
        this.api.trackEvent(
            playerID,
            'has_flash',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    failedHasFlash: function () {
        this.api.trackEvent(
            playerID,
            'failed_has_flash',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    clickedGetFlash: function () {
        this.api.trackEvent(
            playerID,
            'clicked_download_flash_button',
            {
                subtype1: 'ux',
                subtype2: 'new_player',
                subtype3: 'tutorial',
                value: '1',
                level: '1',
                data: this.basicData
            },
            function (data) { }
        );
    },

    showLikeGame: function () {
        this.api.trackEvent(
            playerID,
            'shown1',
            {
                subtype1: 'ux',
                subtype2: 'like_app'
            },
            function (data) { }
        );
    },

    clickedGameHubLink: function (barPosition, name) {
        this.api.trackEvent(
            playerID,
            barPosition,
            {
                subtype1: 'loyalty',
                subtype2: 'game_hub_bar',
                subtype3: name
            }
        );
    },

    showDialogBrowser: function () {
        this.api.trackEvent(
            playerID,
            'impression',
            {
                subtype1: 'ux',
                subtype2: 'unsupported',
                subtype3: 'browser',
                data: JSON.stringify({
                    browser: BrowserDetect.browser,
                    browser_version: BrowserDetect.version
                })
            },
            function (data) { }
        );
    },
};

KT.init();
