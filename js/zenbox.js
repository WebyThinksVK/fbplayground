
$j(document).ready(function () {
    if (typeof(Zenbox) !== 'undefined') {
        Zenbox.init({
            dropboxID: zenboxID,
            url: 'https://phantomefx.zendesk.com',
            tabTooltip: 'Support',
            tabImageURL: 'https://p2.zdassets.com/external/zenbox/images/tab_support.png',
            tabColor: '#ffcc33',
            tabPosition: 'Left',
            hide_tab: true,
            request_subject: playerID.toString()
        });
    }
});

function showZenbox() {
    var iframe = createElements();
    Jquery(iframe).show();
}

function createElements() {
    $j('body,html').scrollTop(0);
    $j('body,html').css('overflow','hidden');

    var iframe = $('<iframe>', {
            src: appServer + 'support/' + playerID,
            id: 'zenbox_iframe',
            frameborder: 0,
            scrolling: 'no'
        }),
        close = $('<button>', {
            id: 'zenbox_close',
            text: 'x'
        }),
        div = $('<div>', {
            id: 'zenbox'
        });

    $j(close).appendTo(div);
    $j(iframe).appendTo(div);
    $j(div).appendTo('#greyout');

    document.getElementById('zenbox_close').addEventListener('click', zenboxClose);
    document.getElementById('greyout').addEventListener('click', zenboxClose);

    Jquery("#greyout").fadeIn();

    return iframe;
}

function zenboxClose(evt) {
    evt.preventDefault();
    zenbox = $('#zenbox').remove();

    $j("#greyout").fadeOut(300, function()
    {
        $j('body,html').css('overflow','');
        $j("#cataboomInnerContainer").empty();
        $j("#cataboomXButton").css('display', 'none');
        showFlash();
    });
}
