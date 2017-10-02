function PostToTimeline2(friendFacebookID, imageStr, captionStr, descriptionStr, trafficSource, ktVars) 
{
    if (incompatibleBrowser)
    {
        popUnsupportedWarning();
    }
    else
    {
        var ts = trafficSource ? "&trafficSource=" + trafficSource : "";
        var ktArray = ktVars.split("=");
        var ktValues = [];

        for (index = 0; index < ktArray.length; index++) {
            ktValues[index] = ktArray[index].split('&')[0];
        }

        var subtype_1 = ktValues[1] || "";
        var subtype_2 = ktValues[2] || "";
        var subtype_3 = ktValues[3] || "";

        var kt_u = ktValues[4] || "";
        var newKTVars = "st1=" + subtype_1 + "&st2=" + subtype_2 + "&st3=" + subtype_3 + "&kt_u=" + kt_u;

        //displayFlashScreenshot();
        FB.api(
            "/me/article",
            "POST",
            {
        "object": "{\"fb:app_id\":\"178259235850786\",\"og:type\":\"article\",\"og:url\":\"https://apps.facebook.com/lucky-sevens\",\"og:title\":\" " + captionStr + "\",\"og:image\":\" " + imageStr + "\"}"            },
            function (response) {
                console.log('FUCK');
                console.log(JSON.stringify(response));
              if (response && !response.error) {
                 console.log(JSON.stringify(response));
                 console.log('FUCK');
              }
            }
        );
    }
}
