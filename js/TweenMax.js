var $TweenMax = {
	Index: {
		init: function(delay, callback) {
			var toScale09 = {
				scale: 0.9,
				immediateRender: false,
			};
			var toScale10 = {
				scale: 1,
				y: -75,
				opacity: 1,
				//                ease: Back.easeOut.config(2),
				onComplete: function() {},
			};
			var tl = new TimelineMax({
				delay: 0,
				paused: true,
			});

			//
			tl
				.fromTo($('.index .tt'), 0.5, toScale09, toScale10)
				//                .fromTo($('section.index div.main h2'), 0.5, toScale09, toScale10)
				.fromTo(
					$('section.index div.main p,section.index div.main h2'),
					0.5,
					toScale09,
					toScale10
				)
				.fromTo(
					$('section.index div.main div.btnIndex'),
					0.5,
					toScale09,
					toScale10
				);
			//        tl.fromTo($('.index .tt,section.index div.main h2, section.index div.main p, section.index div.main div.btnIndex'), 0.5, toScale09, toScale10)
			//
			tl.play();
			console.log('tm index');
			setTimeout(function() {
				callback();
			}, delay);
		},
	},
	tt: {
		init: function(delay, callback) {
			var toScale09 = {
				scale: 0.9,
				immediateRender: false,
			};
			var toScale10 = {
				scale: 1,
				y: -75,
				opacity: 1,
				//                ease: Back.easeOut.config(2),
				onComplete: function() {},
			};
			var tl = new TimelineMax({
				delay: 0.2,
				paused: true,
			});

			tl.fromTo($('.openingLogo .tt'), 0.5, toScale09, toScale10)
			
			tl.play();
			setTimeout(function() {
				callback();
			}, delay);
		},
	},
	Intro: {
		data: {
			done: false,
		},
		init: function(delay, callback) {
			
			var toScale09 = {
				scale: 0.9,
				immediateRender: false,
			};
			var toScale10 = {
				scale: 1,
				y: -75,
				opacity: 1,
				//                ease: Back.easeOut.config(2),
				onComplete: function() {},
			};
			var tl = new TimelineMax({
				delay: 0.2,
				paused: true,
			});

			//
			tl
				//.fromTo($('section.intro div.pic1 img'), 0.4, toScale09, toScale10)
				.fromTo(
					$('section.intro div.badgeBox'),
					0.4,
					toScale09,
					toScale10
				)
				.fromTo($('section.intro div.txt'), 0.4, toScale09, toScale10);
			//        tl.fromTo($('.index .tt,section.index div.main h2, section.index div.main p, section.index div.main div.btnIndex'), 0.5, toScale09, toScale10)
			//
			tl.play();
			setTimeout(function() {
				$('section.intro div.badgeBox').css('z-index', 99);
				$('section.intro div.txt').css('z-index', 99);
				callback();
			}, delay);
		},
	},
	Company: {
		data: {
			popouted: false,
		},
		CreateArray: function() {
			var array = [];
			var length = Math.floor(
				($('section.company-logo li.item').length - 1) / 3
			);
			if (device.mobile())
				length = Math.floor(
					($('section.company-logo li.item').length - 1) / 2
				);
			for (var i = 0; i <= length; i++) {
				var variable = $('section.company-logo li.item_set' + i);
				array.push(variable);
			}
			return array;
		},
		KillAll: function(target) {
			TweenMax.killAll();
			TweenMax.set(target, {
				css: {
					scale: 1,
					opacity: 1,
				},
			});
		},
		SetDefaultCSS: function(target) {
			target.parent().css('opacity', '1');
			target.css('scale', '0');
			target.css('opacity', '0');
		},
		Popout: function() {
			if (this.data.popouted) return;
			if (!$Mixitup.data.isReady) return;
			if ($('.openingLogo').css('display') != 'none') return;
			this.data.popouted = true;
			var array = this.CreateArray();
			TweenMax.staggerFromTo(
				array,
				0.5,
				{
					scale: 0.7,
					immediateRender: false,
				},
				{
					scale: 1,
					autoAlpha: 1,
					//                ease: Back.easeOut.config(3),
				},
				0.85,
				function() {
					//                //開放使用
					//                List.Models.EndProgress();
					//                target.addClass('hasPopout');
				}
			);
		},
	},
	Personal:{
		
	}
};
