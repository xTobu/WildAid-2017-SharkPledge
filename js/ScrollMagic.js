//new ScrollMagic.Scene({
//        triggerElement: "section.intro",
//        duration: '100%',
//    })
//    .addTo(this.Controller)
//    //                .addIndicators() // add indicators (requires plugin)
//
//    .on("enter leave", function (e) {
//        //											$("#state").text(e.type == "enter" ? "inside" : "outside");
//    })
//    .on("start end", function (e) {
//        //											$("#lastHit").text(e.type == "start" ? "top" : "bottom");
//    })
//    .on("progress", function (e) {
//        //											$("#progress").text(e.progress.toFixed(3));
//        console.log('intro')
//
//    })
var personal_seti;
var entered = false;
var entryprogress;
var $ScrollMagic = {
	Controller: null,
	Scenes: {
		init: function() {},
	},
	Function: {},
	Methods: {
		updatePageHint: function(isDark, num) {
			isDark
				? Index.Element.FixedElement.addClass('dark')
				: Index.Element.FixedElement.removeClass('dark');
			Index.Element.FixedElement.find('div.page')
				.find('li')
				.eq(0)
				.text(num);
		},
		updateMenuCurrent: function(current) {
			//console.log(123)
			if (!$ScrollMagic.Temp.scolling) {
				Index.Element.pcMenu.find('a').removeClass('active');
				Index.Element.pcMenu
					.find('a')
					.eq(current)
					.addClass('active');

				Index.Element.mMenu.find('a').removeClass('active');
				Index.Element.mMenu
					.find('a')
					.eq(current)
					.addClass('active');
			}
		},
	},
	Temp: {
		now: null,
		scolling: false,
		plate: false,
		celebrity: {
			triggered: false,
		},
		index: {
			scrolled: false,
			top: true,
		},
	},
	init: function() {
		this.Controller = new ScrollMagic.Controller();
		this.Scenes = {
			// //index
			// index: new ScrollMagic.Scene({
			//         triggerElement: "section.index",
			//         duration: $("section.index").height(),
			//     })
			//     .addTo(this.Controller)
			//     .on("enter", function (e) {
			//         gapage('index')
			//         Index.Element.FixedElement.removeClass('dark')
			//         Index.Element.FixedElement.find('div.page').find('li').eq(0).text('1')
			//         if (!$ScrollMagic.Temp.scolling) {
			//             Index.Element.pcMenu.find('a').removeClass('active');
			//             Index.Element.pcMenu.find('a').eq(4).addClass('active');

			//             Index.Element.mMenu.find('a').removeClass('active');
			//             Index.Element.mMenu.find('a').eq(4).addClass('active');
			//         }
			//     })
			//     .on("leave", function (e) {})
			//     .on("progress", function (e) {

			//         if (!entered) {
			//             entered = true;
			//             entryprogress = e.progress.toFixed(3)
			//             if (device.desktop() || device.tablet())
			//                 entryprogress = 0.550
			//         }

			//         var $progress = e.progress.toFixed(3)
			//         if ($progress <= entryprogress) {
			//             if (!device.desktop()) {
			//                 $ScrollMagic.Temp.index.top = true;
			//                 $ScrollMagic.Temp.index.scrolled = false;
			//                 $('header').removeClass('scrolled')
			//                 Index.Element.logo.find('img').attr('src', './asset/svg/logo-w.svg')
			//                 Index.Element.life_logo.find('img').attr('src', './asset/svg/life-logo-w.svg')

			//             }

			//             if (device.desktop() && !$ScrollMagic.Temp.index.top) {
			//                 $ScrollMagic.Temp.index.top = true;
			//                 // if (!$ScrollMagic.Temp.plate) {
			//                 //     $ScrollMagic.Temp.plate = true;

			//                 //     if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

			//                 //     } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {

			//                 //     } else {
			//                 //         $('section.index div.cover').plate({
			//                 //             element: $('section.index div.platebg'),
			//                 //             perspective: 600,
			//                 //             maxRotation: 2,
			//                 //             animationDuration: 200
			//                 //         });
			//                 //         $('section.index').css('top', '-5%');
			//                 //         $('section.index').css('left', '-5%');
			//                 //         $('section.intro canvas').css('top', '-240px')
			//                 //     }

			//                 // }
			//                 $('header').removeClass('scrolled')
			//                 $element.logo.find('img').attr('src', './asset/svg/logo-w.svg')
			//                  Index.Element.life_logo.find('img').attr('src', './asset/svg/life-logo-w.svg')
			//             }
			//             if (device.tablet()) {

			//                 $ScrollMagic.Temp.index.top = true;
			//                 $ScrollMagic.Temp.index.scrolled = false;
			//                 $('header').removeClass('scrolled')
			//                 Index.Element.logo.find('img').attr('src', './asset/svg/logo-w.svg')
			//                  Index.Element.life_logo.find('img').attr('src', './asset/svg/life-logo-w.svg')

			//             }

			//         }

			//         if ($progress > entryprogress) {

			//             if (!device.desktop() && (!$ScrollMagic.Temp.index.scrolled)) {
			//                 //                             alert('$progress > 0.55')
			//                 $ScrollMagic.Temp.index.top = false;
			//                 $ScrollMagic.Temp.index.scrolled = true;
			//                 $('header').addClass('scrolled')
			//                 Index.Element.logo.find('img').attr('src', './asset/svg/logo-b.svg')
			//                 Index.Element.life_logo.find('img').attr('src', './asset/svg/life-logo.svg')

			//             }

			//             if (device.desktop() && $ScrollMagic.Temp.index.top) {

			//                 $ScrollMagic.Temp.index.top = false;
			//                 if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {

			//                 } else if (navigator.userAgent.indexOf("Mac OS X") > 0) {

			//                 } else {
			//                     // if ($ScrollMagic.Temp.plate) {
			//                     //     $ScrollMagic.Temp.plate = false;
			//                     //     $('section.index div.cover').plate('remove');
			//                     //     $('section.index').css('top', '0%');
			//                     //     $('section.intro canvas').css('top', '-140px')
			//                     //     //                            $('section.index').css('left', '0%');
			//                     // }
			//                 }

			//                 $('header').addClass('scrolled')
			//                 $element.logo.find('img').attr('src', './asset/svg/logo-b.svg')
			//                 $element.life_logo.find('img').attr('src', './asset/svg/life-logo.svg')
			//             }

			//         }

			//     }),

			//intro
			intro: new ScrollMagic.Scene({
				triggerElement: 'section.intro',
				duration: $('section.intro').height(),
			})
				.addTo(this.Controller)
				.on('enter', function(e) {
					gapage('index');
					$ScrollMagic.Methods.updatePageHint(true, 1);

					$ScrollMagic.Methods.updateMenuCurrent(0);
				})
				.on('leave', function(e) {})
				.on('progress', function(e) {}),
			//join
			join: new ScrollMagic.Scene({
				triggerElement: 'section.join',
				duration: $('section.join').height(),
			})
				.addTo(this.Controller)
				.on('enter', function(e) {
					gapage(ga_data.currJoin);
					// if (ga_data.isFinish) {
					// 	gapage('go_3')
					// } else {
					// 	gapage('go_1')
					// }
					$ScrollMagic.Methods.updatePageHint(true, 2);
					$ScrollMagic.Methods.updateMenuCurrent(1);
				})
				.on('leave', function(e) {})
				.on('progress', function(e) {}),
			//personal
			personal: new ScrollMagic.Scene({
				triggerElement: 'section.personal',
				duration: $('section.personal').height(),
			})
				.addTo(this.Controller)
				.on('enter', function(e) {
					// var index = Math.floor(
					// 	Math.random() * Index.Data.person_list.length
					// );
					
					// Index.Function.appendPersonalUser(
					// 	Index.Data.person_list[index]
					// );
					// personal_seti = setInterval(function() {
					// 	if (
					// 		Index.Element.pcMenu
					// 			.find('a')
					// 			.index($('.active')) != 1 ||
					// 		!document.hasFocus()
					// 	)
					// 		return;

					// 	var index = Math.floor(
					// 		Math.random() * Index.Data.person_list.length
					// 	);
					// 	Index.Function.appendPersonalUser(
					// 		Index.Data.person_list[index]
					// 	);
					// }, 350 * (Math.floor(Math.random() * 3) + 5));
					
					gapage('Individual');
					if (ga_data.isFinish) {
					} else {
					}
					$ScrollMagic.Methods.updatePageHint(false, 3);
					$ScrollMagic.Methods.updateMenuCurrent(1);
				})
				.on('leave', function(e) {
					clearInterval(personal_seti);
				})
				.on('progress', function(e) {}),
			//celebrity
			celebrity: new ScrollMagic.Scene({
				triggerElement: 'section.celebrity',
				duration: $('section.celebrity').height(),
			})
			/* 移除名人區 */
				// .addTo(this.Controller)
				.on('enter', function(e) {
					gapage('celebrity');
					//$ScrollMagic.Methods.updatePageHint(false, 4);
					$ScrollMagic.Methods.updateMenuCurrent(2);

					if (!$ScrollMagic.Temp.celebrity.triggered) {
						$ScrollMagic.Temp.celebrity.triggered = true;
						startTimer();
					}
				})
				.on('leave', function(e) {
					//顯示social
					if (device.ipad()) {
						Index.Element.FixedElement.find('div.page').removeClass(
							'hidden'
						);
					}
				})
				.on('progress', function(e) {
					//隱藏social
					var $progress = e.progress.toFixed(3);
					if (device.ipad()) {
						if ($progress < 0.6) {
							Index.Element.FixedElement.find(
								'div.page'
							).addClass('hidden');
						} else {
							Index.Element.FixedElement.find(
								'div.page'
							).removeClass('hidden');
						}
					}

					//離開COMPANY時
					if (!device.mobile()) {
						//console.log('cele');
						// Index.Element.company.category.addClass('hidden');
						// Index.Element.company.category.removeClass('show');
						// 
					}
				}),
			// company
			company: new ScrollMagic.Scene({
				triggerElement: 'section.company-logo',
				duration: $('section.company-logo').height(),
			})
				.addTo(this.Controller)
				.on('enter', function(e) {
					gapage('corporation');
					$ScrollMagic.Methods.updatePageHint(false, 4);

					//連署企業 左側選擇顯示
					if (!device.mobile()) {
						// console.log('company');
						Index.Element.company.category.removeClass('hidden');
						Index.Element.company.category.addClass('show');
						Index.Element.FixedElement.find('div.scroll').hide();
					}
					$ScrollMagic.Methods.updateMenuCurrent(2);
				})
				.on('leave', function(e) {
					//連署企業 左側選擇顯示
					//console.log("leave")
					Index.Element.company.category.addClass('hidden');
					Index.Element.company.category.removeClass('show');
					Index.Element.FixedElement.find('div.scroll').show();
				})
				.on('progress', function(e) {
					var $progress = e.progress.toFixed(3);
					//console.log($progress)
					if ($progress > 0.2) {
						// 企業圖片 彈出
						$TweenMax.Company.Popout();
						//重設高度
						$ScrollMagic.Scenes.company.duration(
							$('section.company-logo').height()
						);
					}

					if (device.mobile()) {
						if ($progress > 0.8) {
							Index.Element.FixedElement.find(
								'div.scroll'
							).hide();
						} else {
							Index.Element.FixedElement.find(
								'div.scroll'
							).show();
						}
					}
				}),
		};
	},
};

$(function() {});
