var hosturl = null;
// switch (location.origin) {
// 	case 'https://www.wildaidtaiwan.org':
// 		hosturl = 'https://globalsharkpledge.org';
// 		break;
// 	default:
// 		hosturl = 'https://wildaid.webgene.com.tw';
// }
if (location.origin.indexOf('webgene') != -1) {
	hosturl = 'https://wildaid.webgene.com.tw';
} else {
	hosturl = 'https://globalsharkpledge.org';
}
var $Mixitup = {
	data: {
		isReady: false,
	},
	Var: {
		MIU: null,
		NowFilter: null,
	},
	Function: {
		GetLogoElement: function(obj, set_number) {
			var data = {
				shortname: obj.short_name,
				statement: obj.caption,
				img_url: null,
				category: null,
				com_url: obj.com_url || 'javascript:void(0)',
			};

			//判斷
			switch (obj.classify) {
				case '批發零售業':
					data.category = 1;
					break;
				case '交通運輸業':
					data.category = 2;
					break;
				case '住宿餐飲業':
					data.category = 3;
					break;
				case '食品業':
					data.category = 4;
					break;
				case '金融業':
					data.category = 5;
					break;
				case '旅遊業':
					data.category = 6;
					break;
				case '教育業':
					data.category = 7;
					break;
				case '教育藝文業':
					data.category = 7;
					break;
				case '電信業':
					data.category = 8;
					break;
				case '廣告業':
					data.category = 9;
					break;
				case '廣告/設計/公關經紀業':
					data.category = 9;
					break;
				case '娛樂業':
					data.category = 10;
					break;
				case '娛樂攝影業':
					data.category = 10;
					break;
				case '非營利單位':
					data.category = 11;
					break;
				case '其他':
                    data.category = 12;
                    break;
				// 0813 第三波修改 新增選項
				case '房地產業':
                    data.category = 13;
                    break;
				case '印刷出版業':
                    data.category = 14;
                    break;
				case '廣播電視業':
                    data.category = 15;
                    break;
				case '專門設計相關業':
					data.category = 16;
					break;
			}
			if (obj.logo_pic)
				data.img_url =
					hosturl +
					'/' +
					obj.logo_pic.substring(2, obj.logo_pic.length);
			else data.img_url = hosturl + '/asset/svg/fin-w-comp.svg';

			var res =
				"<li class='item mix category-" +
				data.category +
				' item_set' +
				set_number +
				"'><a  target='_blank' href='" +
				data.com_url +
				"'><div class='fin'><img src='" +
				data.img_url +
				"' alt='' /></div><div class='hover'><div class='inner'><div class='statement'><div class='inner'><span class='icon-qt-top'></span><span class='icon-qt-bt'></span><p class='state'>" +
				data.statement +
				"</p></div><p class='comp-name'><span>" +
				data.shortname +
				'</span></p></div></div></div></a></li>';

			return res;
		},

		Init: function() {
			var containerElm = document.querySelector(
				'section.company-logo div.content ul'
			);
			var $containerElm = $('section.company-logo div.content ul');
			$containerElm.html('');

			$.ajax({
				async: true,
				type: 'POST',
				url: hosturl + '/api/logo_list',
				dataType: 'json',

				complete: function(data) {},
				success: function(data) {
					$.each(data, function(index, value) {
						if (device.mobile()) {
							$containerElm.append(
								$Mixitup.Function.GetLogoElement(
									value,
									Math.floor(index / 2)
								)
							);
						} else {
							$containerElm.append(
								$Mixitup.Function.GetLogoElement(
									value,
									Math.floor(index / 3)
								)
							);
						}

						if (index == data.length - 1) {
							//重新設定高度
							$ScrollMagic.Scenes.company.duration(
								$('section.company-logo').height()
							);

							$Mixitup.Var.MIU = mixitup(containerElm, {
								load: {
									//sort: 'published-date:desc'
								},
								animation: {
									effects: 'scale',
									duration: 700,
									animateResizeContainer: false,
								},
							});
							//company-logo
							$TweenMax.Company.SetDefaultCSS(
								$('section.company-logo li.item')
							);
							//當完成
							$Mixitup.data.isReady = true;
							$('.loadingBox').fadeOut();
						}
					});
				},
				error: function(data) {
					console.log(data);
					//                                alert("【影片連結】格式錯誤");
				},
			});
		},
		filter: function(tag) {
			var $this = $Mixitup.Var.MIU;
			$this.filter(tag).then(function(state) {
				$Mixitup.Var.NowFilter = tag;
			});
		},
	},
};
$(function() {
	// $Mixitup.Function.Init();
});
