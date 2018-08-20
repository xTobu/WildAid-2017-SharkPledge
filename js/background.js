$(document).ready(function () {
    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $("#top-image").mousemove(function (e) {
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 50;
        var newvalueY = height * pageY * -1 - 100;
        //max -20~20
        rotateXdeg = 10 * -2 * (pageY / $(window).height())
        rotateYdeg = 10 * -2 * (pageX / $(window).height())
        //console.log(rotateXdeg)
        $('#top-image').css({
            "background-position": newvalueX + "px  " + newvalueY + "px",
            "transform": "rotateY(" + (rotateYdeg) + "deg)  " + "rotateX(" + rotateXdeg + "deg)"
        });
        //        $('#top-image').css({
        //            "transform": "rotateX(20deg)"
        //        })
    });
});
