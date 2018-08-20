(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	(i[r] =
		i[r] ||
		function() {
			(i[r].q = i[r].q || []).push(arguments);
		}),
		(i[r].l = 1 * new Date());
	(a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-111648280-1', 'auto');

var ga_data = {
    isFinish: false,
	prePage: '',
    currPage: '',
    currPage2: '',
    currJoin: 'Join',
    preClick:'',
};
function gapage(page) {
	//為了讓BUR開啟和關閉時 gapage會記錄回去
	if (page == 'menu') {
		ga_data.prePage = ga_data.currPage;
	}
	//紀錄當前的 Join 步驟
	if (page.indexOf('corporation_') >= 0 || page.indexOf('Individual_') >= 0) {
		
		ga_data.currJoin = page;
    }
    
    // 記錄當前 gapage
	ga_data.currPage = page;
	ga('send', 'pageview', page);
	console.log(
		'%c PageView: ' + page + ' ',
		'background: #222; color: #bada55'
	);
}

function gaclick(evt) {
    //不重複紀錄 upload
    if(evt.indexOf('_join_upload') >= 0 && ga_data.preClick.indexOf('_join_reupload') >= 0){
        return
    }
    ga_data.preClick = evt;
	ga('send', 'event', 'click', evt);
	console.log(
		'%c EventClick: ' + evt + ' ',
		'background: #222; color: #6de6ff'
	);
}

function trackWaitJump(event, url) {
	setTimeout(function() {
		location.href = url;
	}, 100);
	if (event) gaclick(event);
}

function routeJump(event, name) {
	setTimeout(function() {
		location.pathname = '/' + name;
	}, 100);
	if (event) gaclick(event);
}

