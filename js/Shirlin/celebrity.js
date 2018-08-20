var startTime = 6,
    currentTime = 0,
    myTimer,
    now = 1,
    totalSlide,
    isPc = true,
    delayTime = 1000,
    myTimerSpeed = 1000,
    progressing = false; //

function resetTimer() {
    stopTimer();
    currentTime = startTime;
}

function startTimer() {

    if (currentTime <= 0) {
        resetTimer();
        startTimer();
    } else {
        myTimer = setInterval(timerTick, myTimerSpeed);
    }

}

function stopTimer() {
    clearInterval(myTimer);
}

function timerTick() {
    currentTime--;
    if (currentTime == 0) {
        startTimer();
        changeSlide('right');
    }
}

function detectPc() {
    ($(window).innerWidth() < 768) ? isPc = false: isPc = true;


}

function changeSlide(side, goto) {

    if (progressing)
        return;
    progressing = true;

    if (now == goto)
        return

    if (side == 'right') {
        (now == totalSlide) ? now = 1: now++;
    }
    if (side == 'left') {
        (now > 1) ? now-- : now = totalSlide;
    }

    if (side == 'custom') {
        now = goto;
    }


    // (isPc) ? delayTime = 1000: delayTime = 600;
    $('.pic_0' + now + ',.sb_0' + now).addClass('in');
   $('section.celebrity .main').find('.active').addClass('out');
    $('.dot').removeClass('active');
    $('.dot_0' + now).addClass('active');
    setTimeout(function () {
        $('.active.out').removeClass('active').removeClass('out');
        $('.in').addClass('active').removeClass('in');
        progressing = false;
    }, delayTime)

}


$(function () {

    totalSlide = $('.celeBox').find('.pic').length;
    for (var i = 1; i <= totalSlide; i++) {
        // console.log(i);
        $('.sliderBox').find('ul').append('<li><a class="dot dot_0' + i + '"></a></li>');
    }
    $('.celebrity').find('.dot_01, .sb_01, .pic_01').addClass('active');
    

    //sliderBox
    $('.sliderBox li').on('touchstart mousedown', function (e) {
        e.preventDefault()
        e.stopPropagation()
        resetTimer();
        changeSlide('custom', $(this).index() + 1);
        startTimer();
    })

    //m
    $('section.celebrity .arrowBox').on('touchstart mousedown', 'a', function (e) {
        e.preventDefault()
        // console.log(now);
        console.log(1);
        resetTimer();
        if ($(this).hasClass('left')) {
            changeSlide('left');
        } else {
            changeSlide('right');
        }
        startTimer();
    });

    //pc
    $('body').on('click', 'section.celebrity .active', function (e) {
        e.preventDefault()
        // console.log(e);
        console.log(2);
        resetTimer();
        if ($(this).parents('.slide').hasClass('left')) {
            changeSlide('left');
        } else {
            changeSlide('right');
        }
        startTimer();
    });

    //播放
    $('.pic a.play').on('click',function(e){
        e.preventDefault()
        e.stopPropagation();
        var name = $(this).data('name')
        var url_zh=$(this).data('url-zh')
        var url_en=$(this).data('url-en')
        story_bar.function.updateData(
            name,
            url_en,
            url_zh
        );
        $.magnificPopup.open({
            type: 'iframe',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            items: {
                src:
                    'https://www.youtube.com/watch?v=' +
                    (vueApp.$route.name == 'zh'
                        ? story_bar.currentUrl_zh
                        : story_bar.currentUrl_en),
            },
            callbacks: {                
                open: function() {

                    $('html').css('overflow', 'hidden');
                    story_bar.function.createStory(
                        '.mfp-content'
                    );
                },
                beforeClose: function() {                    
                    $('html').css('overflow', 'auto');
                },
                close: function() {},
            },
        });

    })


//    startTimer();


});
$(window).resize(function () {
    detectPc();
});
