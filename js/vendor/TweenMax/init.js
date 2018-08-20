var TM = {
    Index: function () {
        var toScale09 = {
            scale: 0.9,
            immediateRender: false
        }
        var toScale10 = {
            scale: 1,
            ease: Back.easeOut.config(4.5),
            onComplete: function () {}

        };
        var tl = new TimelineMax({
            delay: 0,
            paused: true,
        });
//
//        tl.fromTo($('.main h2'), 0.5, toScale09, toScale10)
//            .fromTo($('.main p.sub'), 0.5, toScale09, toScale10)
//            .fromTo($('.main .btn_gy'), 0.5, toScale09, toScale10)
         tl.fromTo( $('.main h2, .main p.sub, .main .btn_gy'), 0.5, toScale09, toScale10)
        //       
        tl.play()
    },
    Tour: {
        ClearProps: function (target) {
            TweenMax.set(
                target, {
                    clearProps: "all"
                })
        },
        SliderOut: function (target) {
            var jp_arrow=(Header.url_lang=='zh') ? '-15px' : '-25px';
            TweenMax.staggerTo(target, 0.7, {
                x: 100,
                autoAlpha: 1,
                ease: Back.easeOut.config(2),
            }, 0.25, function () {
                TweenLite.to(target.find('.bg').eq(0), 0.75, {
                    x: 0,
                    width: "90%",
                    autoAlpha: 1,
                    ease: Back.easeOut.config(1.5),
                });
                
                var isMobile=0;
                if(device.desktop())
                    isMobile=1;
                TweenLite.to(target.find('.arrow').eq(0), .3, {
                    opacity: isMobile,
                    width: "140px",
                    bottom: jp_arrow,
                    left: '70%',
                    ease: Back.easeOut.config(1.5)
                });

            });
        }


    },
    List: {
        KillAll: function (target) {
            TweenMax.killAll();
            TweenMax.set(
                target, {
                    css: {
                        scale: 1,
                        opacity: 1
                    }
                })
        },
        SetDefaultCSS: function (target) {
            target.parent().css('opacity', '1');
            target.css('scale', '0');
            target.css('opacity', '0');
            //            TweenMax.set(
            //                target, {
            //                    css: {
            //                        scale: 0,
            //                        opacity: 0
            //                    }
            //                })
        },
        ClearProps: function (target) {
            TweenMax.set(
                target, {
                    clearProps: "all"
                })
        },
        ClickTab: function (target) {
            TweenLite.to($('.underline'), 0.3, {
                css: {
                    left: target + "%"
                },
                ease: Power0.easeIn,
            });
        },
        PopOut: function (target) {
            var $this = this;
            TweenMax.staggerFromTo(target, 0.7, {
                scale: 0.7,
                immediateRender: false
            }, {
                scale: 1,
                autoAlpha: 1,
                ease: Back.easeOut.config(3),
            }, 0.25, function () {
                //                //開放使用
                //                List.Models.EndProgress();
                //                target.addClass('hasPopout');
            });
        },
    },
    Mix: {
        Q: function (target) {
            TweenMax.to(target, 0.8, {
                ease:  Power1.easeInOut,
                scale: 1.1,                
               repeat: -1,
                repeatDelay: .1,
                yoyo: true
            })
        },
        UD:function(target){
            TweenMax.to(target, 0.7, {
                ease:  Power1.easeInOut,
                y:-5,
               repeat: -1,
                repeatDelay: 0,
                yoyo: true
            })
        }
    }
}
