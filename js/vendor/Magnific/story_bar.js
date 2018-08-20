var story_bar = {
	ajaxData: [],
	current: '',
	currentUrl_zh: '',
	currentUrl_en: '',
	// lang:
	//   getUrlParameter("lang") != "zh" && getUrlParameter("lang") != "en"
	//     ? "zh"
	//     : getUrlParameter("lang"),
	lang: window.location.hash.split('/')[1],
	function: {
		createStoryUser: function(urlYT, urlImg, name, lang) {
			var nowlang = story_bar.lang;

			//判斷當前選擇語系, 不符合便回傳空值
			if (nowlang != lang) return '';

			var user =
				'<a class="story-bar__a" href="https://www.youtube.com/watch?v=' +
				urlYT +
				'">' +
				'    <div class="story-bar__user">' +
				'        <div class="story-bar__user-avatar ' +
				(story_bar.current == name ? 'story-bar__active' : '') +
				'" style="background-image: url(' +
				urlImg +
				')"></div>' +
				'        <div class="story-bar__user-name" style="display:none"><span>' +
				name +
				'</span></div>' +
				'    </div>' +
				'</a>';

			return user;
		},
		createLangBtn: function(lang) {
			story_bar.ajaxData.forEach(function(element, index) {
				if (element.name == story_bar.current) {
					if (lang == 'zh' && element.lang == lang) {
						story_bar.currentUrl_zh = element.url;
					}

					if (lang == 'en' && element.lang == lang) {
						story_bar.currentUrl_en = element.url;
					}
				}
			});
			var divBtn =
				"<a class='lang-bar__a' href='https://www.youtube.com/watch?v=" +
				(lang == 'zh'
					? story_bar.currentUrl_zh
					: story_bar.currentUrl_en) +
				"'><div class='lang-bar__circle " +
				(story_bar.lang == lang ? 'lang-bar__active' : '') +
				"'><span>" +
				(lang == 'zh' ? '中' : 'En') +
				'</span></div></a>';
			return divBtn;
		},
		createStory: function(target) {
			$('.story-bar').remove();
			$('.lang-bar').remove();

			$(target).append(story_bar.div());

			//人物切換
			$('.story-bar__a').on('click', function() {
				var selected = $(this)
					.find('.story-bar__user-name span')
					.text();
				story_bar.current = selected;
			});

			//語系切換
			$('.lang-bar__a').on('click', function(e) {
				// e.preventDefault();
				// e.stopPropagation();
				// console.log('語系切換');
				// $player.seekTo(Math.floor(Math.random()*30))
				if ($(this).index() == 0) {
					story_bar.lang = 'zh';
				}
				if ($(this).index() == 1) {
					story_bar.lang = 'en';
				}
			});

			$('.story-bar__a,.lang-bar__a').magnificPopup({
				type: 'iframe',
			});

			$.magnificPopup.instance.open = function(data) {
				$.magnificPopup.proto.open.call(this, data);

				story_bar.function.createStory('.mfp-content');

				/** 增加 YOUTUBE API https://stackoverflow.com/questions/29993448/detect-end-of-youtube-video-in-magnific-popup */
				function onPlayerStateChange(event) {
					switch (event.data) {
						case YT.PlayerState.ENDED:
							// var index =
							// 	$('.story-bar__user-avatar').index(
							// 		$('.story-bar__active')
							// 	) + 1;
							// $('.story-bar__user-avatar')
							// 	.eq(index == $('.story-bar__user-avatar').length ? 0 : index)
							// 	.click();
							//$.magnificPopup.close();
							//$player.seekTo(0)
							break;
					}
				}
				$player = null
				$player = new YT.Player('player', {
					events: {
						onStateChange: onPlayerStateChange,
					},
				});
			};
		},
		updateData: function(name, enurl, zhurl) {
			story_bar.current = name;
			story_bar.currentUrl_en = enurl;
			story_bar.currentUrl_zh = zhurl;
		},
		calcYoutube: function(url) {
			var p = /^(?:https?:\/\/)?(?:(?:www|m)\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
			return url.match(p) ? RegExp.$1 : false;
		},
	},
	div: function() {
		var divStoryBar = document.createElement('div');
		divStoryBar.classList.add('story-bar');
		$.each(story_bar.ajaxData, function(key, value) {
			var user = story_bar.function.createStoryUser(
				value.url,
				value.pic,
				value.name,
				value.lang
			);
			divStoryBar.insertAdjacentHTML('beforeend', user);
		});
		var strDiv =
			divStoryBar.outerHTML +
			"<div class='lang-bar'>" +
			this.function.createLangBtn('zh') +
			this.function.createLangBtn('en') +
			'</div>';

		return strDiv;
	},

	init: function() {
		$.ajax({
			async: true,
			type: 'GET',
			url: Index.Data.hosturl + '/api/youtube',
			dataType: 'json',

			complete: function(data) {},
			success: function(data) {
				$.each(data, function(key, value) {
					value.url = story_bar.function.calcYoutube(value.url);
					story_bar.ajaxData.push(value);
				});
				// console.log(story_bar.ajaxData);
				//設定影片預設
				story_bar.function.updateData(
					'昆凌',
					'ush6xLxXvrs',
					'bgOHPcraP8U'
				);
				// var person = ["昆凌", "胡楓", "周杰倫"];
				// person.forEach(function(element, index) {
				//   var o = {};
				//   o.name = element;
				//   o.zh = data.tw[index];
				//   o.en = data.en[index];
				//   story_bar.temp_data.push(o);
				// });
			},
			error: function(err) {
				// console.log(err)
			},
		});
	},
};
$(function() {
	story_bar.init();
});
