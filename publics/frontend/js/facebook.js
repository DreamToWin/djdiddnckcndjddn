window.fbAsyncInit = function() {
    var app_id = $('#fb-root').data('app');
    var baseURL = $('#baseURL').attr('href');
    FB.init({
        appId: app_id, // App ID
        channelUrl: baseURL + 'publics/facebook/chanel.html', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        frictionlessRequests: true, // enable frictionless requests		
        xfbml: true, // parse XFBML
        oauth: true //enable Oauth
    });
    // Additional initialization code here
    //Next, find out if the user is logged in
    $('.facebook_login').click(function(e) {
        e.preventDefault();
        FB.login(function(response) {
            if (response.authResponse) {
                parent.location = baseURL + 'account/login_facebook'; //redirect uri after closing the facebook popup
            }
        }, {scope: 'email,read_stream,publish_stream,user_birthday,user_location,user_work_history,user_hometown,user_photos'}); //permissions for facebook
    });
}; //fbAsyncInit
// Load the JavaScript SDK Asynchronously
(function(d) {
    var app_id = $('#fb-root').data('app');
    var js, id = 'facebook-jssdk';
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=" + app_id;
    d.getElementsByTagName('head')[0].appendChild(js);
}(document));