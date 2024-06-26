$(document).ready(function(){
    $(this).scrollTop(0);
});
    
navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

$(document).ready(function () {
    /* Fixed menu */
    var length = $('#menu').height() - $('.wrapper-menu').height() + $('#menu').offset().top +200;

    $(document).scroll(function () {

        var scroll = $(this).scrollTop();
        var height = $('.wrapper-menu').height() + 'px';

        if (scroll < $('#menu').offset().top+435) {

            $('.wrapper-menu').css({
                'position': 'absolute',
                'top': '475px'
            });

        } else if (scroll > length) {
            $('.wrapper-menu').addClass('disapear-menu');
            setTimeout(
            function(){
                $('.wrapper-menu').removeClass('disapear-menu');
                $('.wrapper-menu').css({
                    'position': 'absolute',
                    //'bottom': '0',
                    'top': '0px'
                });
            }, 300);

            // $('.wrapper-menu').css({
            //     'position': 'absolute',
            //     //'bottom': '0',
            //     'top': '0px'
            // });

        } else {

            $('.wrapper-menu').css({
                'position': 'fixed',
                'top': '38px',
            });

        }
    });

});


$(window).scroll(function(event) {
    if ($(window).scrollTop()>=130) $('body').addClass('flowers-leaves');
    else $('body').removeClass('flowers-leaves');
});


$('.carousel').carousel({
  interval: 4000
})

$('.btn-menu').click(function() {
    $('#select-nav').click();
    return false;
});


$(window).load(function() {
    $("body").removeClass("preload");
});


var device = Detect();
if (device=='smartphone') {
    $('body').addClass('mobile');
}

if (device=='tablet') {
    $('body').addClass('mobile');
}

if (device=='desktop') {
    $('body').addClass('computer');
}

$('.btn-menu').click(function(){
    $('html').addClass('overflowhidden');
    $('body').addClass('open-menu menu-zindex');
});

$('.btnCloseMenu, #menu-overlay ul li a').click(function(){
    $('html').removeClass('overflowhidden');
    $('body').removeClass('open-menu');
    $('body').addClass('menu-zindex');
    setTimeout(
    function(){
        $('body').removeClass('menu-zindex');
    }, 300);
});


/* detect touch */
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() <= h){
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}


$(".scrollto").click(function() { 
    var scrolltarget = $(this).attr('href');
    var li = $(this).parent().parent().find('li');
    var toposition = li.index($(this).parent());

    var fromposition = li.index($(this).parent().parent().find('li.active'));
    var nbrposition = parseInt(fromposition)-parseInt(toposition);
    if (nbrposition<0) nbrposition = nbrposition*-1;

     $('html, body').animate({
        scrollTop:$(scrolltarget).offset().top-160
    }, nbrposition*700);
    
    return false;
});

    paceOptions = {
        startOnPageLoad : false,
      // Disable the 'elements' source
      elements: false,

      // Only show the progress on regular and ajax-y page navigation,
      // not every request
      restartOnRequestAfter: false
    }

if ($(window).width() < 960) {
   $('.accordion-mobile').click(function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next().slideUp();
        }
        else{
            //$('.custom-accordion.active').removeClass('active').next().slideUp();
            $(this).addClass('active').next().slideDown();
            $('html, body').animate({
                scrollTop:$(this).offset().top - 100
            }, 600);
        }
        return false;
    });
}
paceOptions = {
    startOnPageLoad : false,
    // Disable the 'elements' source
    elements: false,

    // Only show the progress on regular and ajax-y page navigation,
    // not every request
    restartOnRequestAfter: false
}

if ($(window).width() < 480) {
    $(window).resize(function() {
        $('header').css('height',$(window).height());
    });
    $('header').css('height',$(window).height());
}

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();
