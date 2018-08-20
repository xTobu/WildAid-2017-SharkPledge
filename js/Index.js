var $player;
var Index = {
	Element: {
		init: function() {
			//openingLogo
			this.openingLogo = $('div.wrap div.openingLogo');
			//logo
			this.logo = $('a.logo');
			this.life_logo = $('a.life-logo');
			//fb
			this.fb = $('div.social a').eq(0);
			//yt
			this.yt = $('div.social a').eq(1);
			//footer_social
			this.footer_social = $('footer ul')
				.eq(0)
				.find('li');
			this.footer_right = $('footer ul')
				.eq(1)
				.find('li');

			//bur
			this.bur = $('a.bur');
			//menu
			this.pcMenu = $('header').find('li');
			this.mMenu = $('div.menuBox').find('li');
			this.mMenu_icon = $('div.menuBox').find('li:eq(4) a');
			//整塊固定物件
			this.FixedElement = $('div.fixed-element');

			//section index
			/////////////////////////
			this.index = {
				immediately: $('section.index a.btn'),
			};
			//section intro
			this.intro = {
				company: $('section.intro a.btn-blue').eq(0),
				personal: $('section.intro a.btn-blue').eq(1),
			};
			//section join
			/////////////////////////
			var $join = $('section.join');
			var $form = $('div.cirBox div.form');
			//下拉選單 綁定改變

			//沒選擇時要灰色
			if (
				$('div.cirBox div.form')
					.find('option:selected')
					.val() == 0
			)
				$('div.cirBox div.form')
					.find('select')
					.css('color', '#737373');
			$form.find('select').on('change', function() {
				$(this)
					.parent()
					.removeClass('warn');
				$element.join.form.category = $(this).find('option:selected');
				if (Index.Element.join.form.category.val() == 0)
					$('div.cirBox div.form')
						.find('select')
						.css('color', '#737373');
				else
					$('div.cirBox div.form')
						.find('select')
						.css('color', '#555');
			});
			this.join = {
				step_now: 0,
				step_now_personal: 1,
				form: {
					category: $form.find('option:selected'),
					name: $form.find('input').eq(0),
					shortname: $form.find('input').eq(1),
					com_url: $form.find('input[name="com_url"]'),
					// taxid: $form.find("input").eq(2),
					// statement: $form.find("textarea")
				},
				btn: {
					// 個人宣言的左右箭頭
					personal_left: $join.find('div.arrow_personal a.left'),
					personal_right: $join.find('div.arrow_personal a.right'),

					// 企業宣言的左右箭頭
					left: $join.find('div.arrow_company a.left'),
					right: $join.find('div.arrow_company a.right'),

					//Personal
					personal: {
						login: $('section.join div.main-per:eq(1) a.btn-blue'),
						agree: $('section.join div.main-per:eq(2) a.btn-blue'),
						sharetofb: $(
							'section.join div.main-per:eq(3) a.btn-blue'
						),
					},
					//step 1
					upload: $form.parent().find('a.btn-blue'),

					//step2
					reupload: $('div.s2-main')
						.find('a.btn-blue')
						.eq(0),
					preview: $('div.s2-main')
						.find('a.btn-blue')
						.eq(1),
					plus: $('div.s2-main').find('a.plus'),
					minus: $('div.s2-main').find('a.minus'),

					//step3
					submit: $('div.s3-main').find('a.btn-blue'),
				},
				input: {
					upload: $form.parent().find('input#upload'),
				},
				GetFormData: function() {
					var FormVal = {};
					for (var prop in this.form) {
						FormVal[prop] = this.form[prop].val();
					}
					return FormVal;
				},
			};

			//section company-logo
			/////////////////////////
			var $company = $('section.company-logo');
			this.company = {
				category: $company.find('div.category'),
				category_m: $company.find('div.category-m'),
			};
			//連署企業 左側選擇顯示
			if (!device.mobile()) {
				Index.Element.company.category.addClass('hidden');
				Index.Element.company.category.removeClass('show');
			}
		},
	},
	Var: {},
	Data: {
		hosturl: null,
		lang: 'zh',
		form_type: undefined,
		url_list: {
			logo: null,
			logo2: null,
			fb: null,
			tvc: null,
			youtube: null,
			contact: 'https://wildaid.org/',
			privacy: 'http://www.wildaidchina.org/',
		},
		fbInfo: {
			id: '',
			name: '',
			email: '',
		},
		person_list: [],
		init: function(callback) {
			// switch (location.origin) {
			// 	case 'https://www.wildaidtaiwan.org':
			// 		this.hosturl = 'https://www.wildaidtaiwan.org';
			// 		break;
			// 	default:
			// 		this.hosturl = 'https://wildaid.webgene.com.tw';
			// }

			if (location.origin.indexOf('webgene') != -1) {
				this.hosturl = 'https://wildaid.webgene.com.tw';
			} else {
				this.hosturl = 'https://globalsharkpledge.org';
			}
			var url_list = this.url_list;
			// this.lang =
			// 	getUrlParameter('lang') != 'zh' &&
			// 	getUrlParameter('lang') != 'en'
			// 		? 'zh'
			//         : getUrlParameter('lang');
			this.lang = vueApp.$route.name;
			// console.warn(vueApp.$route.name);
			$.ajax({
				async: true,
				type: 'GET',
				url: Index.Data.hosturl + '/api/count_user',
				dataType: 'json',

				success: function(data) {
					function addCommas(val) {
						return val
							.toString()
							.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
					}
					$('div.navBox .count p span').text(
						addCommas(data.user_count)
					);
				},
				error: function(data) {
					console.log(data);
				},
			});

			$.ajax({
				async: true,
				type: 'POST',
				url: Index.Data.hosturl + '/api/url_list',
				dataType: 'json',

				complete: function(data) {},
				success: function(data) {
					//                    console.log(data)
					url_list.fb = data[0].fb;
					url_list.tvc =
						'https://www.youtube.com/watch?v=' +
						Index.Function.GetYoutubeID(data[0].tvc);
					url_list.logo = data[0].logo;
					//life_logo
					url_list.logo2 = data[0].logo2;
					url_list.youtube = data[0].youtube;
					callback();
				},
				error: function(data) {
					// console.log(data)
					//                                alert("【影片連結】格式錯誤");
				},
			});
		},
	},
	Function: {
		GotoStep: function(step_goto, callback) {
			//console.log('gotostep');
			//console.log(step_goto);
			var $step = $('section.join div.content.contentCompany');
			var $step_now = Index.Element.join.step_now;

			//忘記為何而加 12/22
			//            $element.join.btn.left.removeClass('hidden')
			//            $element.join.btn.right.removeClass('hidden')

			$element.join.btn.left.css('pointer-events', 'none');
			$element.join.btn.right.css('pointer-events', 'none');
			$element.join.btn.minus.css('pointer-events', 'none');
			$element.join.btn.plus.css('pointer-events', 'none');
			$element.join.btn.preview.css('pointer-events', 'none');
			$element.join.btn.reupload.css('pointer-events', 'none');
			$element.join.btn.upload.css('pointer-events', 'none');
			$element.join.btn.submit.css('pointer-events', 'none');

			$step.eq($step_now).fadeOut('slow', function() {
				$step.eq(step_goto).fadeIn('slow', function() {
					Index.Element.join.step_now = step_goto;

					switch (step_goto) {
						case 0:
							//點擊切換時已經紀錄過
							//gapage('corporation_join');
							$element.join.btn.left.addClass('hidden');
							$element.join.btn.left.css(
								'pointer-events',
								'none'
							);

							if ($element.join.input.upload.val()) {
								// $element.join.btn.right.removeClass('hidden');
								// $element.join.btn.right.css(
								// 	'pointer-events',
								// 	'auto'
								// );
								$element.join.btn.right.addClass('hidden');
								$element.join.btn.right.css(
									'pointer-events',
									'none'
								);
							} else {
								$element.join.btn.right.addClass('hidden');
								$element.join.btn.right.css(
									'pointer-events',
									'none'
								);
							}

							break;
						case 1:
							gapage('corporation_resize');
							$element.join.btn.left.removeClass('hidden');
							$element.join.btn.left.css(
								'pointer-events',
								'auto'
							);

							$element.join.btn.right.addClass('hidden');
							$element.join.btn.right.css(
								'pointer-events',
								'none'
							);

							var $canvas = $Fabric.Var.finBox;
							if ($canvas.item(0)) {
								$canvas.item(
									0
								).text = Index.Element.join.form.shortname.val();
								$canvas.renderAll();
							}

							break;
						case 2:
							gapage('corporation_preview');
							$element.join.btn.left.removeClass('hidden');
							$element.join.btn.left.css(
								'pointer-events',
								'auto'
							);
							$element.join.btn.right.addClass('hidden');
							$element.join.btn.right.css(
								'pointer-events',
								'none'
							);
							break;
						case 3:
							gapage('corporation_finish');
							ga_data.isFinish = true;
							$element.join.btn.left.addClass('hidden');
							$element.join.btn.right.addClass('hidden');
							$element.join.btn.left.css(
								'pointer-events',
								'none'
							);
							$element.join.btn.right.css(
								'pointer-events',
								'none'
							);
							break;
					}

					$element.join.btn.minus.css('pointer-events', 'auto');
					$element.join.btn.plus.css('pointer-events', 'auto');
					$element.join.btn.preview.css('pointer-events', 'auto');
					$element.join.btn.reupload.css('pointer-events', 'auto');
					$element.join.btn.upload.css('pointer-events', 'auto');
					$element.join.btn.submit.css('pointer-events', 'auto');

					callback();
				});
			});
		},
		GotoStep_personal: function(step_goto, callback) {
			//console.log('gotostep');
			//console.log(step_goto);
			var $step = $('section.join div.content:eq(0)').find('.main-per');
			var $step_now = Index.Element.join.step_now_personal;

			$step.eq($step_now).fadeOut('slow', function() {
				$step.eq(step_goto).fadeIn('slow', function() {
					Index.Element.join.step_now_personal = step_goto;

					switch (step_goto) {
						// 同意連署
						case 2:
							gapage('Individual_preview');
							// gapage('go_3');
							break;
						// 分享至FACEBOOK
						case 3:
							gapage('Individual_finish');
							// gapage('finish');

							break;
					}
					callback();
				});
			});
		},
		GetYoutubeID: function(url) {
			var p = /^(?:https?:\/\/)?(?:(?:www|m)\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
			return url.match(p) ? RegExp.$1 : false;
		},
		ShowPopup: function(str) {
			$('.popup')
				.find('.inner p')
				.html(str);
			$('.popup').fadeIn();
		},
		appendPersonalUser: function(user) {
			var color = ['#e95464', '#e8ecef', '#84b9cb', '#aacf53', '#f8b862'];
			var fontsize = [18, 22, 26];
			var topVal = Math.random() * 90;
			var className = new Date().getTime();
			var rndColor = Math.floor(Math.random() * color.length);
			var rndFontsize = Math.floor(Math.random() * fontsize.length);
			var speed = Math.floor(Math.random() * 10) + 15;
			var speed_m = speed - 5;
			var objPledge = {
				'拒吃、拒買野生動物產製品': {
					zh: '拒吃、拒買野生動物產製品',
					en:
						'Not to eat shark fin soup and serve shark fin soup at any banquets hosted by me',
				},
				'願共同守護鯊魚，愛護海洋': {
					zh: '共同愛護鯊魚，守護海洋',
					en: 'To save sharks and the oceans',
				},
				'我不吃魚翅，也不以魚翅宴請他人': {
					zh: '拒吃魚翅，也不以魚翅宴請他人',
					en: 'Not to eat and buy wildlife products',
				},
			};

			var tempCaption = user.caption;
			user.caption = objPledge[tempCaption][Index.Data.lang];
			var strUser =
				'<div class="userBox personalUser" id="user' +
				className +
				'" style="color:' +
				color[rndColor] +
				'; font-size:' +
				fontsize[rndFontsize] +
				'px">' +
				'	<span class="photo">' +
				'		<img src="' +
				user.logo_pic +
				'" alt="">' +
				'	</span> ' +
				'	<span>' +
				user.name +
				'</span>' +
				'	<span class="user-caption" data-caption="' +
				tempCaption +
				'" >：' +
				user.caption +
				'</span>' +
				' </div>';
			$('section.personal').append(strUser);

			this.animatePersonalUser(
				$('#user' + className),
				topVal,
				!device.mobile() ? speed : speed_m
			);
		},
		animatePersonalUser: function(target, top, duration) {
			new TweenMax.set(target, {
				top: top + '%',
				onComplete: function() {
					new TweenMax.from(target, duration, {
						left: '100%',
						ease: Linear.easeNone,
						onComplete: function() {
							$(this.target).remove();
						},
					});
				},
			});
		},
	},
	Listener: {
		init: function() {
			//初始設置
			///////////////////////////////////
			$element = Index.Element;
			$function = Index.Function;
			$data = Index.Data;

			//Header Footer
			///////////////////////////////////

			if (!device.desktop()) $('section.index div.platebg').hide();

			//滾動時Header加入class
			// 滾動移到VUE

			//popup close
			$('.popup')
				.find('a.btn-blue')
				.on('click', function(e) {
					e.preventDefault();
					$('.popup').fadeOut();
				});

			//bur
			$element.bur.click(function(e) {
				//gapage('menu');
				e.preventDefault();
				e.stopPropagation();

				//紀錄 menu pageview
				if (!$(this).hasClass('active')) {
					gapage('menu');
					$('header').removeClass('scrolled');
					$('.logoBox').addClass('disappear');
				} else {
					gapage(ga_data.prePage);
					$('.logoBox').removeClass('disappear');
					if (window.scrollY != 0) {
						$('header').addClass('scrolled');
					}
				}

				$(this).toggleClass('active');
				$('.overlay').toggleClass('open');
				Index.Element.FixedElement.find('div.scroll').toggle();

				/* 加上overflow hidden 但失敗 */
				// $('html').toggleClass('overflowhidden');
				// $('body').toggleClass('overflowhidden');

				/* 05/21 俊翔 註解 */
				// if ($ScrollMagic.Temp.index.top) {
				// 	return;
				// }
				// if ($(this).hasClass('active')) {
				// 	if (!device.desktop() && window.scrollY>0) {
				// 		$ScrollMagic.Temp.index.scrolled = false;
				// 		$('header').removeClass('scrolled');
				// 		Index.Element.logo
				// 			.find('img')
				// 			.attr('src', './asset/svg/logo-w.svg');
				// 		Index.Element.life_logo
				// 			.find('img')
				// 			.attr('src', './asset/svg/life-logo-w.svg');
				// 	}
				// } else {
				// 	if (
				// 		!device.desktop() && window.scrollY ==0
				// 	) {
				// 		//                            alert('>= 0.55')
				// 		$ScrollMagic.Temp.index.scrolled = true;
				// 		$('header').addClass('scrolled');
				// 		Index.Element.logo
				// 			.find('img')
				// 			.attr('src', './asset/svg/logo-b.svg');
				// 		Index.Element.life_logo
				// 			.find('img')
				// 			.attr('src', './asset/svg/life-logo.svg');
				// 	}
				// }

				return;
			});

			//menu
			var delay_time = 600;
			var inMobule = 0;
			var hh = $('header').height();
			var index_top = $('.intro').offset().top;
			var intro_top = $('.intro').offset().top - (hh / 2 + 10);
			var join_top = $('.join').offset().top;
			var celebrity_top = $('.personal').offset().top - 5;

			if ($(window).width() > 1300) {
				celebrity_top = celebrity_top + 25;
			}

			if (device.mobile()) {
				intro_top = intro_top - hh;
				celebrity_top = celebrity_top - hh;
				join_top = join_top - 75;
			}

			if (device.desktop()) {
				join_top = join_top + (hh / 2 + 10);
				if (
					navigator.userAgent.indexOf('Safari') != -1 &&
					navigator.userAgent.indexOf('Chrome') == -1
				) {
					celebrity_top = $('.personal').offset().top - (hh / 2 + 10);
				}
			}

			if (device.tablet()) {
				intro_top = intro_top - hh / 2 - 30;
				//                join_top = join_top-(hh/2)-30;
				celebrity_top = celebrity_top - hh / 2 - 15;
			}

			$element.pcMenu.on('click', function(e) {
				// touchstart mousedown
				e.preventDefault();
				e.stopPropagation();

				//點擊滾動時不跑SCROLLMAGIC
				$ScrollMagic.Temp.scolling = true;
				setTimeout(function() {
					$ScrollMagic.Temp.scolling = false;
				}, 700);

				$(this)
					.parent()
					.find('li a')
					.removeClass('active');
				$(this)
					.find('a')
					.addClass('active');
				var time = 600;
				if (
					navigator.userAgent.indexOf('Safari') != -1 &&
					navigator.userAgent.indexOf('Chrome') == -1
				) {
					//time = 0;
				}
				var body = $('html, body');

				switch ($(this).index()) {
					//關於無翅聯盟
					case 0:
						gaclick('menu_about');
						body.stop().animate(
							{
								scrollTop: intro_top,
							},
							time
						);
						break;
					//加入聯盟
					case 1:
						gaclick('menu_join');
						body.stop().animate(
							{
								scrollTop: join_top,
							},
							time
						);
						break;
					//聯盟英雄榜
					case 2:
						gaclick('menu_member');
						body.stop().animate(
							{
								scrollTop: celebrity_top,
							},
							time
						);
						break;
					case 3:
						//護鯊短片
						gaclick('menu_video');
						$.magnificPopup.open({
							type: 'iframe',
							removalDelay: 160,
							preloader: false,
							fixedContentPos: false,
							items: {
								//src: url_list.tvc
								src:
									'https://www.youtube.com/watch?v=' +
									(vueApp.$route.name == 'zh'
										? story_bar.currentUrl_zh
										: story_bar.currentUrl_en),
							},
							callbacks: {
								beforeClose: function() {
									if (
										navigator.userAgent.indexOf('Safari') !=
											-1 &&
										navigator.userAgent.indexOf('Chrome') ==
											-1
									) {
										//delay_time = 0;
										$('html').removeClass('overflowhidden');
									} else {
										$('html').removeClass('overflowhidden');
										$('body').removeClass('overflowhidden');
									}
								},
								open: function() {
									if (
										navigator.userAgent.indexOf('Safari') !=
											-1 &&
										navigator.userAgent.indexOf('Chrome') ==
											-1
									) {
										//delay_time = 0;
										$('html').addClass('overflowhidden');
									} else {
										$('html').addClass('overflowhidden');
										$('body').addClass('overflowhidden');
									}
									function onPlayerStateChange(event) {
										switch (event.data) {
											case YT.PlayerState.ENDED:
												// var index =
												// 	$(
												// 		'.story-bar__user-avatar'
												// 	).index(
												// 		$('.story-bar__active')
												// 	) + 1;
												// $('.story-bar__user-avatar')
												// 	.eq(
												// 		index ==
												// 		$(
												// 			'.story-bar__user-avatar'
												// 		).length
												// 			? 0
												// 			: index
												// 	)
												// 	.click();
												// $player.seekTo(0)
												// $.magnificPopup.close();
												break;
										}
									}
									$player = null;
									$player = new YT.Player('player', {
										events: {
											onStateChange: onPlayerStateChange,
										},
									});
									story_bar.function.createStory(
										'.mfp-content'
									);
								},
								close: function() {},
							},
						});
						break;
					//房子
					case 4:
						body.stop().animate(
							{
								scrollTop: index_top,
							},
							time
						);
						break;
					// Facebook
					case 5:
						gaclick('menu_fb');
						window.open(Index.Data.url_list.fb);
						break;
					// Youtube
					case 6:
						gaclick('menu_yt');
						window.open(Index.Data.url_list.youtube);

						break;
				}
				return;
			});
			$element.mMenu.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				//點擊滾動時不跑SCROLLMAGIC
				$ScrollMagic.Temp.scolling = true;
				setTimeout(function() {
					$ScrollMagic.Temp.scolling = false;
				}, 700);

				$(this)
					.parent()
					.find('li a')
					.removeClass('active');
				$(this)
					.find('a')
					.addClass('active');

				var $index = $(this).index();
				if ($index != 3) {
					setTimeout(function() {
						$element.bur.click();
					}, delay_time * 1.5);
				}

				setTimeout(function() {
					if (
						navigator.userAgent.indexOf('Safari') != -1 &&
						navigator.userAgent.indexOf('Chrome') == -1
					) {
						//delay_time = 0;
					}
					switch ($index) {
						//關於無翅聯盟
						case 0:
							gaclick('menu_about');
							$('html, body')
								.stop()
								.animate(
									{
										scrollTop: intro_top,
									},
									delay_time
								);
							break;
						//加入聯盟
						case 1:
							gaclick('menu_join');
							$('html, body')
								.stop()
								.animate(
									{
										scrollTop: join_top,
									},
									delay_time
								);
							break;
						//聯盟英雄榜
						case 2:
							gaclick('menu_member');
							$('html, body')
								.stop()
								.animate(
									{
										scrollTop: celebrity_top,
									},
									delay_time
								);
							break;
						case 3:
							gaclick('menu_video');
							$.magnificPopup.open({
								type: 'iframe',
								removalDelay: 160,
								preloader: false,
								fixedContentPos: false,
								items: {
									//src: url_list.tvc
									src:
										'https://www.youtube.com/watch?v=' +
										(vueApp.$route.name == 'zh'
											? story_bar.currentUrl_zh
											: story_bar.currentUrl_en),
								},
								callbacks: {
									beforeClose: function() {
										if (
											navigator.userAgent.indexOf(
												'Safari'
											) != -1 &&
											navigator.userAgent.indexOf(
												'Chrome'
											) == -1
										) {
											//delay_time = 0;
											$('html').removeClass(
												'overflowhidden'
											);
										} else {
											$('html').removeClass(
												'overflowhidden'
											);
											$('body').removeClass(
												'overflowhidden'
											);
										}
									},
									open: function() {
										if (
											navigator.userAgent.indexOf(
												'Safari'
											) != -1 &&
											navigator.userAgent.indexOf(
												'Chrome'
											) == -1
										) {
											//delay_time = 0;
											$('html').addClass(
												'overflowhidden'
											);
										} else {
											$('html').addClass(
												'overflowhidden'
											);
											$('body').addClass(
												'overflowhidden'
											);
										}

										story_bar.function.createStory(
											'.mfp-content'
										);
									},
									close: function() {},
								},
							});
							break;
						// //房子
						// case 4:

						// 	$('html, body')
						// 		.stop()
						// 		.animate(
						// 			{
						// 				scrollTop: index_top,
						// 			},
						// 			delay_time
						// 		);
						// 	break;
						// // Facebook
						// case 5:
						// gaclick('menu_fb');
						// 	window.open(Index.Data.url_list.fb);
						// 	break;
						// // Youtube
						// case 6:
						// gaclick('menu_yt');
						// 	window.open(Index.Data.url_list.youtube);

						// 	break;
					}
				}, delay_time);
				return;
			});
			$element.mMenu_icon.on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				//點擊滾動時不跑SCROLLMAGIC
				switch ($(this).index()) {
					//房子
					case 0:
						$('.bur').removeClass('active');
						$('.overlay').removeClass('open');
						$('html, body')
							.stop()
							.animate(
								{
									scrollTop: index_top,
								},
								delay_time
							);
						break;
					// Facebook
					case 1:
						gaclick('menu_fb');
						window.open(Index.Data.url_list.fb);
						break;
					// Youtube
					case 2:
						gaclick('menu_yt');
						window.open(Index.Data.url_list.youtube);

						break;
				}
			});

			//換語系
			$('.lang a').on('click', function(e) {
				e.preventDefault();
				e.stopPropagation();
				var $this = $(this);
				var lang = $this.data('lang');
				if (lang != vueApp.$route.name) {
					vueApp.$router.push({
						name: $this.data('lang'),
					});
					if ($('a.bur').hasClass('active')) {
						$element.bur.click();
					}
				}

				var objPledge = {
					'拒吃、拒買野生動物產製品': {
						zh: '拒吃、拒買野生動物產製品',
						en:
							'Not to eat shark fin soup and serve shark fin soup at any banquets hosted by me',
					},
					'願共同守護鯊魚，愛護海洋': {
						zh: '共同愛護鯊魚，守護海洋',
						en: 'To save sharks and the oceans',
					},
					'我不吃魚翅，也不以魚翅宴請他人': {
						zh: '拒吃魚翅，也不以魚翅宴請他人',
						en:
							'Not to eat and buy wildlife products',
					},
                };                
                
                $.each($('.user-caption'), function(key, value) {                      
                    $(this).text('： '+objPledge[$(this).data('caption')][vueApp.$route.name])
                });
                
               
			});
			//index
			//////////////////////
			$element.index.immediately.on('click', function(e) {
				e.preventDefault();
				gaclick('index_go');
				$('html, body')
					.stop()
					.animate(
						{
							scrollTop: join_top,
						},
						delay_time
					);
			});

			//intro
			///////////////////////
			var funcBtnBlue = function(e) {
				e.preventDefault();
				var $this = $(this);
				$('html, body')
					.stop()
					.animate(
						{
							scrollTop: join_top,
						},
						delay_time
					);
				setTimeout(function() {
					switch ($this.index()) {
						//個人宣言
						case 1:
							gaclick('index_Individual_go');
							$(
								'section.join div.main-per:eq(0) div.cirBox a.btn-blue'
							)
								.eq(0)
								.click();
							return;
						//企業宣言
						case 0:
							gaclick('index_corporation_go');
							$(
								'section.join div.main-per:eq(0) div.cirBox a.btn-blue'
							)
								.eq(1)
								.click();
							return;
					}
				}, delay_time / 2);
			};
			$element.intro.company.on('click', funcBtnBlue);

			$element.intro.personal.on('click', funcBtnBlue);

			//join
			///////////////////////

			//Step Intro
			$('section.join div.main-per:eq(0) div.cirBox a.btn-blue').on(
				'click',
				function(e) {
					e.preventDefault();
					switch ($(this).index() - 1) {
						//個人宣言
						case 0:
							gapage('Individual_join');
							Index.Data.form_type = 'personal';
							if (Index.Element.join.step_now != 0) {
								$element.join.btn.left.addClass('hidden');
								$element.join.btn.right.addClass('hidden');
							}
							$('section.join .content').hide();
							$('section.join .main-per').hide();
							$('section.join .main-per')
								.eq(1)
								.show();
							Index.Element.join.step_now_personal = 1;
							$('section.join .content')
								.eq(0)
								.fadeIn('slow', function() {});
							// Index.Function.GotoStep_personal(1,function() {})
							return;

						//企業宣言
						case 1:
							gapage('corporation_join');
							Index.Data.form_type = 'company';

							$('section.join .content').hide();
							if (Index.Element.join.step_now == 3) {
								Index.Element.join.step_now = 0;
							}
							$function.GotoStep(
								$element.join.step_now,
								function() {}
							);
							// $('section.join .content').fadeOut('slow', function() {

							// });
							return;
					}
				}
			);

			//個人連署　登入FACEBOOK
			var changeFBInfo = function(name, userid) {
				$('.main-per:eq(2)')
					.find('.cirBox p')
					.text(name);
				$('.main-per:eq(3)')
					.find('.cirBox .name p:eq(1)')
					.text(name);
				$('.main-per:eq(2)')
					.find('.cirBox div.photo img')
					.attr(
						'src',
						'https://graph.facebook.com/' +
							userid +
							'/picture?type=large'
					);
			};
			$element.join.btn.personal.login.on('click', function(e) {
				e.preventDefault();
				// console.log('個人連署　登入FACEBOOK');
				gaclick('Individual_join_upload');
				if (isFacebookApp() || isLineApp()) {
					Index.Function.ShowPopup(
						vueApp.$route.name == 'zh'
							? '建議使用Safari、Chrome或預設瀏覽器瀏覽本網站，以利活動參與。'
							: 'Please visit this site with default browser.'
					);
					return;
				}
				FB.login(
					function(response) {
						if (response.authResponse) {
							FB.api('/me', { fields: 'id,name,email' }, function(
								response
							) {
								console.log(response);
								Index.Data.fbInfo = response;
								changeFBInfo(response.name, response.id);
								Index.Function.GotoStep_personal(
									2,
									function() {}
								);
							});
						} else {
							console.log(
								'User cancelled login or did not fully authorize.'
							);
						}
					},
					{ scope: 'email' }
				);
			});

			//個人連署　同意連署
			$element.join.btn.personal.agree.on('click', function(e) {
				e.preventDefault();
				// console.log('個人連署　同意連署');
				gaclick('Individual_preview_comfirm');
				var arrayPledge = [
					'我不吃魚翅，也不以魚翅宴請他人',
					'拒吃、拒買野生動物產製品',
					'願共同守護鯊魚，愛護海洋',
				];
				var caption = arrayPledge[Math.floor(Math.random() * 3)];
				$.ajax({
					async: true,
					type: 'POST',
					url: Index.Data.hosturl + '/api/send_user',
					dataType: 'json',
					data: {
						fbid: Index.Data.fbInfo.id,
						name: Index.Data.fbInfo.name,
						logo_pic:
							'https://graph.facebook.com/' +
							Index.Data.fbInfo.id +
							'/picture?type=large',
						email: Index.Data.fbInfo.email,
						caption: caption,
					},
					success: function(data) {
						if (data.status != '110') {
						} else {
							Index.Function.ShowPopup(
								vueApp.$route.name == 'zh'
									? '您已經連署過囉！<br />謝謝您對海洋保育的幫助！'
									: 'You have joined the Pledge,<br />thank you for your support in ocean conservation!'
							);
						}
						Index.Function.GotoStep_personal(3, function() {
							var newUser = {
								name: Index.Data.fbInfo.name,
								logo_pic:
									'https://graph.facebook.com/' +
									Index.Data.fbInfo.id +
									'/picture?type=large',
								caption: caption,
							};
							setTimeout(function() {
								Index.Function.appendPersonalUser(newUser);
								Index.Data.person_list.push(newUser);
							}, 1000);
						});
					},
					error: function(data) {
						console.log('error');
					},
				});
			});
			//個人連署　分享到我的塗鴉牆
			$element.join.btn.personal.sharetofb.on('click', function(e) {
				e.preventDefault();
				// console.log('個人連署　分享到我的塗鴉牆');
				gaclick('Individual_finish_fbshare');
				FB.ui(
					{
						method: 'share',
						// hashtag: '#Test#1123',
						// mobile_iframe: true,
						href: 'https://globalsharkpledge.org',
						// quote:"我支持 『 沒有買賣，就沒有殺害 』\n1）我拒吃魚翅，也不以魚翅宴請他人\n2）拒吃、拒買野生動物產製品\n3）願共同守護鯊魚，愛護海洋",
					},
					function(response) {
						if (response.length == 0) {
							alert('分享成功!');
						} else {
							console.log('user clicked cancel');
						}
					}
				);
			});

			//Step 1
			// 左右箭頭 預設隱藏
			$element.join.btn.left.addClass('hidden');
			$element.join.btn.right.addClass('hidden');
			$element.join.btn.personal_left.addClass('hidden');
			$element.join.btn.personal_right.addClass('hidden');

			$element.join.btn.left.on('click', function(e) {
				e.preventDefault();
				$function.GotoStep($element.join.step_now - 1, function() {});
			});

			// });
			$element.join.btn.right.on('click', function(e) {
				e.preventDefault();
				$function.GotoStep($element.join.step_now + 1, function() {});
			});

			$element.join.btn.personal_left.on('click', function(e) {
				e.preventDefault();
			});

			// });
			$element.join.btn.personal_right.on('click', function(e) {
				e.preventDefault();
			});
			//--form
			//del_pos
			//先關閉
			$('section.join a.del_pos').hide();
			$('section.join a.del_pos').bind('touchstart mousedown', function(
				e
			) {
				e.preventDefault();
				$(this)
					.parent()
					.find('input')
					.val('');
				$(this).hide();
			});

			//企業名稱
			$element.join.form.name.on('input paste focus', function(e) {
				$(this).val()
					? $(this)
							.parent()
							.find('a.del_pos')
							.show()
					: $(this)
							.parent()
							.find('a.del_pos')
							.hide();
				// console.log($(this).parent())
			});
			$element.join.form.name.on('input paste', function(e) {
				$(this)
					.parent()
					.removeClass('warn');
			});
			$element.join.form.name.on('blur', function(e) {
				$(this)
					.parent()
					.find('a.del_pos')
					.hide();
			});

			//簡稱
			$element.join.form.shortname.on('input paste focus', function(e) {
				$(this).val()
					? $(this)
							.parent()
							.find('a.del_pos')
							.show()
					: $(this)
							.parent()
							.find('a.del_pos')
							.hide();
			});
			$element.join.form.shortname.on('blur', function(e) {
				$(this)
					.parent()
					.find('a.del_pos')
					.hide();
			});
			$element.join.form.shortname.on('input paste', function(e) {
				$(this)
					.parent()
					.removeClass('warn');
			});

			//統一編號
			// $element.join.form.taxid.on("input paste focus", function (e) {
			// 	$(this).val() ?
			// 		$(this)
			// 		.parent()
			// 		.find("a.del_pos")
			// 		.show() :
			// 		$(this)
			// 		.parent()
			// 		.find("a.del_pos")
			// 		.hide();
			// 	//只可以數字
			// 	this.value = this.value.replace(/[^0-9]/g, "");
			// });
			// $element.join.form.taxid.on("blur", function (e) {
			// 	$(this)
			// 		.parent()
			// 		.find("a.del_pos")
			// 		.hide();
			// });
			// $element.join.form.taxid.on("input paste", function (e) {
			// 	$(this)
			// 		.parent()
			// 		.removeClass("warn");
			// });

			//想說的話
			// $element.join.form.statement.on("input paste", function (e) {
			// 	$(this)
			// 		.parent()
			// 		.removeClass("warn");
			// });

			//上傳 input
			$element.join.input.upload.on('change', function(e) {
				if (this.files && this.files[0]) {
					var fileSize = this.files[0].size / 1024 / 1024;
					if (fileSize > 2) {
						alert('照片最大僅支持2MB');
					} else {
						/////////////////////////////////////////
						//12.22  新增Fabric 做法
						/////////////////////////////////////////

						var file = e.target.files[0];
						var reader = new FileReader();
						reader.onload = function(f) {
							var data = f.target.result;

							//scale slider reset
							//console.log($Fabric.Temp.ScaleNow);
							$Fabric.Temp.ScaleNow = 6;
							$('.range').val(6);
							$('.scale .cir').css('left', '50%');
							//先清除第一張圖
							$canvas = $Fabric.Var.finBox;
							if ($canvas.item(1))
								$canvas.remove($canvas.item(1));

							//跳到下一個步驟
							Index.Function.GotoStep(1, function() {
								var shortname = Index.Element.join.form.shortname.val();

								$Fabric.Function.Create(shortname, function() {
									$Fabric.Function.UploadImage(
										data,
										function() {}
									);
								});
							});
						};
						reader.readAsDataURL(file);
					}
				} else {
				}
			});

			//上傳企業LOGO
			$element.join.btn.upload.on('click', function(e) {
				e.preventDefault();
				gaclick('corporation_join_upload');
				//清空
				$element.join.input.upload.val('');
				var $form_li_list = $('section.join').find('li');
				//清空全部li warn
				$form_li_list.removeClass('warn');
				var getValidate = Validation.Result();
				if (!getValidate.Status) {
					var AlertString = '';
					var Resp = getValidate.Resp;
					//                    console.log(Resp)
					for (var prop in Resp) {
						//                        AlertString += Resp[prop][0] + "\n"
						AlertString += Resp[prop][0] + '<br>';
						switch (prop) {
							case 'category':
								$form_li_list.eq(0).addClass('warn');
								break;
							case 'name':
								$form_li_list.eq(1).addClass('warn');
								break;
							case 'shortname':
								$form_li_list.eq(2).addClass('warn');
								break;

							// case "taxid":
							// 	$form_li_list.eq(3).addClass("warn");
							// 	break;
							// case "statement":
							// 	$form_li_list.eq(4).addClass("warn");
							// 	break;
						}
					}
					Index.Function.ShowPopup(AlertString);
					return;
				} else {
					$element.join.input.upload.click();
				}
			});

			//Step 2

			// 改變
			$('.range').on('change input', function(e) {
				var oldval = $Fabric.Temp.ScaleNow;
				var newval = parseInt($(this).val(), 10);
				var $canvas = $Fabric.Var.finBox;
				var step = $Fabric.Temp.ScaleStep;
				if (oldval < newval) {
					var x = newval - oldval;
					$Fabric.Var.finBox.item(1).scaleX =
						$Fabric.Var.finBox.item(1).scaleX + step * x;
					$Fabric.Var.finBox.item(1).scaleY =
						$Fabric.Var.finBox.item(1).scaleY + step * x;
				}
				if (oldval > newval) {
					var x = oldval - newval;
					$Fabric.Var.finBox.item(1).scaleX =
						$Fabric.Var.finBox.item(1).scaleX - step * x;
					$Fabric.Var.finBox.item(1).scaleY =
						$Fabric.Var.finBox.item(1).scaleY - step * x;
				}

				$canvas.renderAll();
				$Fabric.Temp.ScaleNow = newval;

				$('.range').val(newval);
			});

			//減
			$element.join.btn.minus.on('click', function(e) {
				e.preventDefault();

				if ($Fabric.Temp.ScaleNow == 0) return;

				var $canvas = $Fabric.Var.finBox;
				var step = $Fabric.Temp.ScaleStep;
				$Fabric.Var.finBox.item(1).scaleX =
					$Fabric.Var.finBox.item(1).scaleX - step;
				$Fabric.Var.finBox.item(1).scaleY =
					$Fabric.Var.finBox.item(1).scaleY - step;
				$Fabric.Var.finBox.renderAll();

				var circle = $('.scale .cir');
				var oldval = $Fabric.Temp.ScaleNow;
				var newval = $Fabric.Temp.ScaleNow - 1;
				$Fabric.Temp.ScaleNow = newval;
				circle.css('left', newval * 8.334 + '%');
				$('.range').val(newval);
			});

			//加
			$element.join.btn.plus.on('click', function(e) {
				e.preventDefault();
				if ($Fabric.Temp.ScaleNow == 6) return;
				var $canvas = $Fabric.Var.finBox;
				var step = $Fabric.Temp.ScaleStep;
				$Fabric.Var.finBox.item(1).scaleX =
					$Fabric.Var.finBox.item(1).scaleX + step;
				$Fabric.Var.finBox.item(1).scaleY =
					$Fabric.Var.finBox.item(1).scaleY + step;
				$Fabric.Var.finBox.renderAll();

				var circle = $('.scale .cir');
				var oldval = $Fabric.Temp.ScaleNow;
				var newval = $Fabric.Temp.ScaleNow + 1;
				$Fabric.Temp.ScaleNow = newval;
				circle.css('left', newval * 8.334 + '%');
				$('.range').val(newval);
			});

			//重新上傳LOGO
			$element.join.btn.reupload.on('click', function(e) {
				e.preventDefault();
				gaclick('corporation_join_reupload');
				$element.join.input.upload.val('');
				$element.join.btn.upload.click();
			});

			//預覽
			$element.join.btn.preview.on('click', function(e) {
				e.preventDefault();
				gaclick('corporation_join_preview');
				Index.Function.GotoStep(2, function() {
					$Fabric.Function.GetDataURL_Preview(function(res) {
						var s3_finBox = $('div.s3-main').find('div.finBox img');
						// var s3_statement = $("div.s3-main").find("p.state");
						var s3_shortname = $('div.s3-main').find(
							'p.comp-name span'
						);

						var $form = Index.Element.join.form;

						//丟值到站存
						Index.Element.join.data = {
							shortname: $form.shortname.val(),
							//category: $form.category.text(),
							// statement: $form.statement.val(),
							// taxid: $form.taxid.val(),
							name: $form.name.val(),
							com_url: $form.com_url.val(),
						};
						switch (Index.Element.join.form.category.val()) {
							case '1':
								Index.Element.join.data.category = '批發零售業';
								break;
							case '2':
								Index.Element.join.data.category = '交通運輸業';
								break;
							case '3':
								Index.Element.join.data.category = '住宿餐飲業';
								break;
							case '4':
								Index.Element.join.data.category = '食品業';
								break;
							case '5':
								Index.Element.join.data.category = '金融業';
								break;
							case '6':
								Index.Element.join.data.category = '旅遊業';
								break;
							case '7':
								Index.Element.join.data.category = '教育藝文業';
								break;
							case '8':
								Index.Element.join.data.category = '電信業';
								break;
							case '9':
								Index.Element.join.data.category = '廣告/設計/公關經紀業';
								break;
							case '10':
								Index.Element.join.data.category = '娛樂攝影業';
								break;
							case '11':
								Index.Element.join.data.category = '非營利單位';
								break;
							case '12':
								Index.Element.join.data.category = '其他';
								break;
							case '13':
								Index.Element.join.data.category = '房地產業';
								break;
							case '14':
								Index.Element.join.data.category = '印刷出版業';
								break;
							case '15':
								Index.Element.join.data.category = '廣播電視業';
								break;
							case '16':
								Index.Element.join.data.category =
									'專門設計相關業';
								break;
						}
						var $data = Index.Element.join.data;

						//換字
						//s3_statement.text($data.statement);
						s3_shortname.text(
							$data.shortname + ' / ' + $data.category
						);

						//換圖片
						s3_finBox.attr('src', res);
					});
				});
			});

			//Step 3
			//送出連屬
			$element.join.btn.submit.on('click', function(e) {
				e.preventDefault();
				gaclick('corporation_send');
				var $data = Index.Element.join.data;

				$Fabric.Function.GetDataURL_Result(
					Index.Element.join.data.shortname,
					function(dataurl) {
						var $btn = Index.Element.join.btn;

						$.ajax({
							async: true,
							type: 'POST',
							url: Index.Data.hosturl + '/api/send_logo',
							dataType: 'json',
							data: {
								//name
								name: $data.name,

								//shortname
								short_name: $data.shortname,

								//category
								classify: $data.category,

								//taxid
								com_num: $data.taxid,

								//com_url
								com_url: $data.com_url,

								//base64
								logo_pic: dataurl.split(',')[1],

								// 原圖logo
								o_logo_pic: $Fabric.Temp.ori_logo.split(',')[1],

								//statement
								caption: $data.statement,
							},
							beforeSend: function(xhr) {
								$btn.submit.val('資料傳送中...');
								$btn.submit.css('pointer-events', 'none');
							},
							success: function(data) {
								Index.Function.GotoStep(3, function() {
									$('div.s4-main')
										.find('div.fin-img img')
										.attr(
											'src',
											$Fabric.Temp.PreviewDataURL
										);
								});
							},
							error: function(data) {
								console.log('ajax error');
							},
						});
					}
				);
			});

			//company
			/////////////////////////
			//做邊篩選選單
			$element.company.category.find('li').on('click', function(e) {
				e.preventDefault();
				// 清空上面彈幕
				$('.userBox').remove();
				$TweenMax.Company.KillAll($('section.company-logo li.item'));

				//新增 active to a tag
				var listLi = $element.company.category.find('li');
				listLi.find('a').removeClass('active');
				$(this)
					.find('a')
					.addClass('active');

                var $index = $(this).index();
				if ($index == 0) {
					$Mixitup.Function.filter('all');
					$ScrollMagic.Scenes.company.duration(
						$('section.company-logo').height()
					);
				} else {
					$Mixitup.Function.filter('.category-' + $(this).data('category'));
					$ScrollMagic.Scenes.company.duration(
						$('section.company-logo').height()
					);
				}
			});

			$element.company.category_m
				.find('select')
				.on('change', function(e) {
					e.preventDefault();

					$TweenMax.Company.KillAll(
						$('section.company-logo li.item')
					);
					$index = this.value;

					//新增 active to a tag
					var listLi = $element.company.category.find('li');
					listLi.find('a').removeClass('active');
					$(this)
						.find('a')
						.eq($index)
						.addClass('active');

					if ($index == 0) {
						$Mixitup.Function.filter('all');
					} else {
						$Mixitup.Function.filter('.category-' + $index);
					}
				});
		},
	},
	Setup: function() {
		this.Data.init(function() {
			var url_list = Index.Data.url_list;

			//護鯊短片
			// Index.Element.pcMenu.eq(3).magnificPopup({
			// 	type: 'iframe',
			// 	removalDelay: 160,
			// 	preloader: false,
			// 	fixedContentPos: false,
			// 	items: {
			// 		//2018/05/07
			// 		//src: url_list.tvc
			// 		src: story_bar.currentUrl_zh,
			// 	},
			// 	callbacks: {
			// 		beforeClose: function() {
			// 			// Callback available since v0.9.0
			// 			console.log('Popup close has been initiated');
			// 			$('html').css(
			// 				'overflow',
			// 				'auto'
			// 			);
			// 			// $('html').toggleClass('scroll_disable');
			// 		},
			// 		open: function() {
			// 			gaclick('menu_video');
			// 			// $('html').toggleClass('scroll_disable');
			// 			story_bar.function.createStory('.mfp-content');
			// 			$('html').css(
			// 				'overflow',
			// 				'hidden'
			// 			);
			// 			// $(".mfp-content").append(story_bar.div());
			// 			// $(".story-bar__a").magnificPopup({
			// 			//   type: "iframe"
			// 			// });
			// 		},
			// 		close: function() {},
			// 	},
			// });
			// Index.Element.mMenu.eq(3).magnificPopup({
			// 	items: {
			// 		src: url_list.tvc,
			// 	},
			// 	callbacks: {
			// 		open: function() {
			// 			gaclick('menu_video');
			// 			story_bar.function.createStory('.mfp-content');
			// 			//                        gaclick('bar_' + Header.url_lang + '_tvc');
			// 		},
			// 		close: function() {},
			// 	},
			// 	type: 'iframe',
			// });

			if (device.tablet()) {
				Index.Element.pcMenu
					.eq(3)
					.on('touchstart mousedown', function(e) {
						e.preventDefault();
						Index.Element.pcMenu.eq(3).click();
					});
				Index.Element.mMenu
					.eq(3)
					.on('touchstart mousedown', function(e) {
						e.preventDefault();
						Index.Element.mMenu.eq(3).click();
					});
			}

			//logo
			Index.Element.logo.click(function(e) {
				e.preventDefault();
				window.open(url_list.logo);
				gaclick('menu_Logo');
				return;
			});
			Index.Element.life_logo.click(function(e) {
				e.preventDefault();
				window.open(url_list.logo2);
				//                gaclick('menu_Logo')
				return;
			});
			//fb
			Index.Element.fb.click(function(e) {
				e.preventDefault();
				window.open(url_list.fb);
				gaclick('menu_fb');
				return;
			});
			//yt
			Index.Element.yt.click(function(e) {
				e.preventDefault();
				window.open(url_list.youtube);
				gaclick('menu_yt');
				return;
			});
			//footer_social
			Index.Element.footer_social.click(function(e) {
				e.preventDefault();
				var $index = $(this).index();
				switch ($index) {
					case 0:
						window.open(url_list.fb);
						gaclick('menu_fb');
						break;
					case 1:
						window.open(url_list.youtube);
						gaclick('menu_yt');
						break;
				}
			});

			//footer_right
			Index.Element.footer_right.click(function(e) {
				e.preventDefault();
				var $index = $(this).index();
				switch ($index) {
					case 0:
						gaclick('contact_us');
						window.open(url_list.contact);
						break;
					case 1:
						gaclick('privacy_policy ');
						$('div.privacy').fadeIn();
						break;
				}
			});

			//右下 加入宣言
			$('.btn-join').on('click', function(e) {
				e.preventDefault();
				var delay_time = 600;
				if (
					navigator.userAgent.indexOf('Safari') != -1 &&
					navigator.userAgent.indexOf('Chrome') == -1
				) {
					//delay_time = 0;
				}
				gaclick('index_join');
				$('html, body')
					.stop()
					.animate(
						{
							scrollTop: $('.join').offset().top,
						},
						delay_time
					);
			});
			// 隱私權 關閉
			$('div.privacy')
				.find('a.closeBtn')
				.on('click', function(e) {
					e.preventDefault();
					$('div.privacy').fadeOut();
				});
		});
		this.Element.init();
		this.Listener.init();
		// $.magnificPopup.open({
		// 	type: 'iframe',
		// 	removalDelay: 160,
		// 	preloader: false,
		// 	fixedContentPos: false,
		// 	items: {
		// 		//src: url_list.tvc
		// 		src:
		// 			'https://www.youtube.com/watch?v=bgOHPcraP8U'
		// 	},
		// 	callbacks: {
		// 		beforeClose: function() {
		// 			$('html').removeClass('overflowhidden');
		// 			$('body').removeClass('overflowhidden');
		// 		},
		// 		open: function() {
		// 			$('html').addClass('overflowhidden');
		// 			$('body').addClass('overflowhidden');
		// 			story_bar.function.createStory(
		// 				'.mfp-content'
		// 			);
		// 		},
		// 		close: function() {},
		// 	},
		// });
		// 彈幕
		$.ajax({
			async: true,
			type: 'GET',
			url: Index.Data.hosturl + '/api/user_caption',
			dataType: 'json',
			complete: function(data) {},
			beforeSend: function() {},
			success: function(data) {
                
				Index.Data.person_list = data;

				setInterval(function() {
					if (!document.hasFocus()) return;

					var index = Math.floor(
						Math.random() * Index.Data.person_list.length
					);
					Index.Function.appendPersonalUser(
						Index.Data.person_list[index]
					);
				}, 350 * (Math.floor(Math.random() * 3) + 5));
			},
			error: function(data) {
				console.log(data);
			},
		});
	},
};

// switch (location.origin) {
// 	case 'https://www.wildaidtaiwan.org':
// 		Index.Data.hosturl = 'https://www.wildaidtaiwan.org';
// 		break;
// 	case 'https://wildaidtaiwan.org':
// 		Index.Data.hosturl = 'https://www.wildaidtaiwan.org';
// 		break;
// 	default:
// 		Index.Data.hosturl = 'https://wildaid.webgene.com.tw';
// }
// if (location.origin.indexOf('wildaidtaiwan') != -1) {
// 	Index.Data.hosturl = 'https://www.wildaidtaiwan.org';
// } else {
// 	Index.Data.hosturl = 'https://wildaid.webgene.com.tw';
// }

if (location.origin.indexOf('webgene') != -1) {
	Index.Data.hosturl = 'https://wildaid.webgene.com.tw';
} else {
	Index.Data.hosturl = 'https://globalsharkpledge.org';
}

$(function() {
	//    Index.Element.pcMenu.eq(1).click();
});

window.onload = function() {
	// 後端進入後 快速填值
	var QuickUpdate = function() {
		// setTimeout(function() {
		//快速更新資料 2018-01-08
		var match,
			pl = /\+/g, // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function(s) {
				return decodeURIComponent(s.replace(pl, ' '));
			},
			query = window.location.search.substring(1);
		urlParams = {};
		while ((match = search.exec(query)))
			urlParams[decode(match[1])] = decode(match[2]);
		//console.log(urlParams)
		if (urlParams.create == 'true') {
			$('section.join div.main-per:eq(0) div.cirBox a.btn-blue')
				.eq(1)
				.click();
			Index.Element.pcMenu.eq(1).click();

			$('section.join select option').each(function() {
				if ($(this).text() == urlParams.classify) {
					console.log(urlParams.classify);
					$(this).attr('selected', true);
					Index.Element.join.form.category.val($(this).val());
					Index.Element.join.form.category.text(urlParams.classify);
				}
			});
			Index.Element.join.form.name.val(urlParams.name);
			Index.Element.join.form.shortname.val(urlParams.shortname);
			// Index.Element.join.form.taxid.val(urlParams.com_num);
			// Index.Element.join.form.statement.val(urlParams.caption);
			//?create=true&name=企業名稱&shortname=六字企業簡稱&classify=教育業&com_num=1234567&caption=十六字無刺魚肚
		}
		//	}, 1300);
	};

	// 開始Intro的動態
	var startIntro = function() {
		Index.Element.openingLogo.fadeOut('slow', function() {
			//叫回滾軸
			$('html').removeClass('overflowhidden');
			$('body').removeClass('overflowhidden');

			$('.index .ttBox').addClass('drawed');

			$('.index .ttBox').css('box-shadow', '0 9px 6px -6px #2a4464');
			$TweenMax.Intro.init(0, function() {
				QuickUpdate();
			});
		});
	};

	if (device.desktop()) {
		$('.category-m').hide();
		// if (
		// 	navigator.userAgent.indexOf('Safari') != -1 &&
		// 	navigator.userAgent.indexOf('Chrome') == -1
		// ) {
		// 	//                        $('section.intro canvas').css('top', '-240px')
		// } else if (navigator.userAgent.indexOf('Mac OS X') > 0) {
		// } else {
		// 	$('section.index').css('top', '-5%');
		// 	$('section.index').css('left', '-5%');
		// 	$('section.index').css('height', '110%');
		// 	$('section.index').css('width', '110%');
		// 	$('section.intro canvas').css('top', '-240px');
		// 	$ScrollMagic.Temp.plate = true;
		// }
	}
	if (device.tablet()) {
		$('.company-logo').css('background-attachment', 'inherit');
	}

	Index.Element.openingLogo = $('div.wrap div.openingLogo');

	var images = [
		//背景圖
		'../img/opening-bg1.jpg',
		'../img/opening-bg2.jpg',
		'../img/opening-bg3.jpg',
		//        './img/opening-bg4.jpg',
		'./asset/svg/logo-b.svg',
		'./asset/svg/life-logo.svg',
		//        //LOGO
		//        './asset/svg/fin-w-comp.svg',
		//        './asset/svg/logo-b.svg',
	];
	if (device.mobile()) {
		images = [
			//背景圖
			'../img/opening-bg1_m.jpg',
			'../img/opening-bg2_m.jpg',
			'../img/opening-bg3_m.jpg',
			//        './img/opening-bg4_m.jpg',
			'./asset/svg/logo-b.svg',
			'./asset/svg/life-logo.svg',
			//
		];
	}
	var openingLogo_now = 2;

	var openingLogo = [];
	var isMobile = device.mobile() ? '_m' : '';
	var hosturl = null;
	// switch (location.origin) {
	// 	case 'https://www.wildaidtaiwan.org':
	// 		hosturl = 'https://www.wildaidtaiwan.org';
	// 		break;
	// 	default:
	// 		hosturl = 'https://wildaid.webgene.com.tw';
	// }

	if (location.origin.indexOf('webgene') != -1) {
		hosturl = 'https://wildaid.webgene.com.tw';
	} else {
		hosturl = 'https://globalsharkpledge.org';
	}
	function preloadImages(srcs, callback) {
		var img;
		var remaining = srcs.length;
		for (var i = 0; i < srcs.length; i++) {
			img = new Image();
			img.onload = function() {
				--remaining;
				if (remaining <= 0) {
					callback();
				}
			};
			img.src = srcs[i];
		}
	}
	// preloadImages(images, function() {});

	$.ajax({
		async: true,
		type: 'GET',
		url: hosturl + '/api/logoTop4',
		dataType: 'json',
		complete: function(data) {},
		beforeSend: function() {},
		success: function(data) {
			$.each(data, function(index, value) {
				images.push(
					Index.Data.hosturl +
						'/' +
						value.logo_pic.substring(3, value.logo_pic.length)
				);
				openingLogo.push(
					Index.Data.hosturl +
						'/' +
						value.logo_pic.substring(3, value.logo_pic.length)
				);
			});

			$.preload(images, function(last) {
				if (last) {
					$('.loadingPage').fadeOut(0, function() {
						$('.openingLogo .partner').css(
							'background-image',
							'url(' + openingLogo[0] + ')'
						);
						$('.openingLogo .partner').fadeIn(0, function() {
							var openInterval = setInterval(function() {
								if (openingLogo_now == 3) {
									clearInterval(openInterval);
									$('.openingLogo').css(
										'background-image',
										'url(./img/opening-bg' +
											openingLogo_now +
											isMobile +
											'.jpg)'
									);
									$('.openingLogo .partner').fadeOut(
										500,
										function() {
											$('.ttBox').addClass('drawed');
											//先等1.2秒 讓白框跑完
											setTimeout(function() {
												$TweenMax.tt.init(
													//字跳出來後 等待多久
													1200,
													function() {
														//開始 INTRO 的動畫
														startIntro();
													}
												);
											}, 1200);
										}
									);

									return;
								}
								if (openingLogo_now <= 2) {
									//換上背景圖
									$('.openingLogo').css(
										'background-image',
										'url(./img/opening-bg' +
											openingLogo_now +
											isMobile +
											'.jpg)'
									);

									$('.openingLogo .partner').css(
										'background-image',
										'url(' +
											openingLogo[openingLogo_now - 1] +
											')'
									);
									openingLogo_now++;
								}
							}, 1000);

							//跳過
							$('.openingLogo').on('click', function(e) {
								e.preventDefault();
								openingLogo_now = 3;
								clearInterval(openInterval);

								//開始 INTRO 的動畫
								startIntro();
							});
						});
					});
				}
			});
		},
		error: function(data) {
			console.log(data);
		},
	});
};
