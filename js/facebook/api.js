window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId: appID,
        cookie: true,
        frictionlessRequests: true,
        xfbml : true,
        hideFlashCallback: onFlashHide,
        version: 'v2.5'
    });

    FB.Canvas.setSize();
    
    loadSWF();
};

// Only works after `FB.init` is called
function myFacebookLogin() {
  FB.login(function(){}, {scope: 'publish_actions'});
}

// Load the SDK's source Asynchronously
// Note that the debug version is being actively developed and might
// contain some type checks that are overly strict.
// Please report such bugs using the bugs tool.
console.log('MADE IT HERE');
$j(document).ready(function () {
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});