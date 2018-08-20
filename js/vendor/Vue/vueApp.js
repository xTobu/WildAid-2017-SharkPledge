//iife
(function() {})();

var vueApp = new Vue({
	el: '#vueApp',
	router: indexVueRouter,
	i18n: indexVueI18n,
	data: {
		isScrolledTop: false, // 開始滾動
		isOverCategory: false, // 連署企業的Category超過了window.scrollY
		
	},
	computed: {
		maxlengthShortName: function() {
			return this.$route.name == 'zh' ? 18 : 18;
		},
		langclass: function() {
			return this.$route.name;
		},
	},

	created: function() {
		// 語系
		this.$i18n.locale = this.$route.name;
		this.handleScroll();
	},

	mounted: function() {
		window.addEventListener('scroll', this.handleScroll);
		var $this = this;
		this.handleTest();
		$(function() {
			$Fabric.init();
			$ScrollMagic.init();
			$Mixitup.Function.Init();
			Index.Setup();
			bubbler();
		});


		// console.log(Validation.Result());
	},
	methods: {
		handleScroll: function() {
			// console.log('scroll');
			// 判斷滾動增加HEADER
			window.scrollY != 0 && $('div.burBox a').hasClass('active') != true
				? (this.isScrolledTop = true)
				: (this.isScrolledTop = false);

			// (
			// 	$(".company-logo .main h2").offset().top < window.scrollY + 200
			// ) ? this.isOverCategory = true: this.isOverCategory = false
			// console.log(this.isOverCategory);

			if (
				window.scrollY + 200 >
				$('.company-logo .main h2').offset().top
			) {
				this.isOverCategory = true;
			} else {
				this.isOverCategory = false;
			}
		},
		waitFor: function(ms) {
			return new Promise(function(resolve, reject) {
				setTimeout(function() {
					resolve();
				}, ms);
			});
		},
		handleTest: function() {
			this.waitFor(2000).then(function() {
				//console.log(1);
			});
			
		},
		
	},
	watch: {
		$route: function() {
			// 監控route改變時 跟著切換i18n的語系
			this.$i18n.locale = this.$route.name;
			Index.Data.lang = this.$route.name;
			story_bar.lang = this.$route.name;
		},
	},
});
function sleep(ms) {
	return new Promise(function(resolve, reject) {
		setTimeout(function() {
			resolve();
		}, ms);
	});
}
// async function testsleep() {
// 	await sleep(2000);
// 	console.log(2);
// 	await sleep(2000);
// 	console.log(4)
// }

// testsleep();
sleep(1000).then(function() {
	// console.log(123);
});

if (this.getMobileOperatingSystem()) {
	screen.orientation.onchange = function() {
		var way = screen.orientation.type.match(/\w+/)[0];
		if (way == 'landscape') {
			$('.trans_bg').removeClass('input_focus');
		}
	};
}

$('input, textarea,select').on('focus', function() {
	$('.trans_bg').addClass('input_focus');
});

function getMobileOperatingSystem() {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/android/i.test(userAgent)) {
		return true;
	}
	return false;
}
