// if (location.origin.indexOf('webgene') != -1) {
// 	Index.Data.hosturl = 'https://wildaid.webgene.com.tw';
// } else {
// 	Index.Data.hosturl = 'https://globalsharkpledge.org';
// }

window.fbAsyncInit = function() {
	FB.init({
		appId: (location.origin.indexOf('webgene') != -1)?'274803009785835':'386218468563078',
		cookie: true,
		xfbml: true,
		version: 'v3.0',
	});

	// FB.AppEvents.logPageView();
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

function statusChangeCallback(response) {
	console.log('statusChangeCallback');
	console.log(response);
}
