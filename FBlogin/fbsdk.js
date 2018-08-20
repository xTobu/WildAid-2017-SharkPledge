function statusChangeCallback(res) {
	console.log(res.status);
	console.log(res.authResponse.userID);
}
//檢查登入狀態
// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

window.fbAsyncInit = function() {
	FB.init({
		appId: '386218468563078',
		cookie: true,
		xfbml: true,
		version: 'v3.0',
	});

	FB.AppEvents.logPageView();
	FB.getLoginStatus(function(response) {
		console.log(response);
		if (response.status == 'connected') {
			console.log(response.authResponse.userID);
			var userID = response.authResponse.userID;
			$('img').attr(
				'src',
				'http://graph.facebook.com/' + userID + '/picture?type=large'
			);
		} else {
			$('.btnLogin').show();
		}
	});
};

(function(d, s, id) {
	var js,
		fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s);
	js.id = id;
	js.src = 'https://connect.facebook.net/en_US/sdk.js';
	fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
