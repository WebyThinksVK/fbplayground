// Teak integration code for 'Jackpot Party' using Javascript
//
// For more documentation, go here: https://app.teak.io/docs/javascript

// --------------------------------------
// Carrot initialization
// --------------------------------------

(function(){window.teak=window.teak||[];window.teak.methods=["init","identify","postAction","postAchievement","postHighScore","canMakeFeedPost","popupFeedPost","reportNotificationClick","reportFeedClick","sendRequest","acceptRequest"];window.teak.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);window.teak.push(t);return window.teak}};for(var e=0;e<window.teak.methods.length;e++){var t=window.teak.methods[e];window.teak[t]=window.teak.factory(t)}var n=document.createElement("script");n.type="text/javascript";n.async=true;n.src="//d2h7sc2qwu171k.cloudfront.net/teak.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(n,r)})()
window.teak.init(appID, teakKey);
window.teak.identify(playerID, accessToken);
