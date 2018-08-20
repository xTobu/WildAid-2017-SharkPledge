function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/android/i.test(userAgent)) {
		return true;
	}
	return false;
}
if (getMobileOperatingSystem()) {
	screen.orientation.onchange = function() {
		var way = screen.orientation.type.match(/\w+/)[0];
		if (way == 'landscape') {
			$('.trans_bg').removeClass('input_focus');
		}
	};
}

$('input,textarea,select').on('focus', function() {
	$('.trans_bg').addClass('input_focus');
});

//取得 Parameter
function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(location.search);
	return results === null
		? ''
		: decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var Common = {
	methods: {
		getRandNum12: function() {
			return this.r4() + this.r4() + this.r4();
		},
		r4: function() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		},
	},
};

function isFacebookApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("FBAN") > -1) || (ua.indexOf("FBAV") > -1);
}

function isLineApp() {
    var ua = navigator.userAgent || navigator.vendor || window.opera;
    return (ua.indexOf("Line") > -1);
}