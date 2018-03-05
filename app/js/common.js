$(function() {




    $(".dropdown").hover(
        function() {
            if(window.matchMedia('(max-width: 767px)').matches){
                return;
            }

            //if($('ul',this).is(":animated")) return;

            // $( 'ul',this).fadeIn();
            ID = setTimeout(()=>{
                $( 'ul',this).fadeIn();
            }, 300)
        }, function() {

            if(window.matchMedia('(max-width: 767px)').matches){
                return;
            }
            clearTimeout(ID);
            $('ul',this ).fadeOut();
        }
    );





    $(".login-language .login .btn-login").on('click', function (e) {
        event.preventDefault();
        if($(this).next('.login_form').is(":animated")) return;

        $(this).toggleClass('active');

        $(this).next('.login_form').fadeToggle();
    });


    $(".language.dropdown").unbind('mouseenter mouseleave');
    $(".language.dropdown").click(function () {
        if($('ul',this).is(":animated")) return;

        $( 'ul',this).fadeToggle();
    });



    $('.rate .tabs-nav a').on('click', function(event) {
        event.preventDefault();

        let targetId = $(this).attr('href');

        $('.rate .tabs-content div').removeClass('show');
        $('.rate .tabs-nav div').removeClass('show');
        $('.rate .tabs-nav a').removeClass('active');


        $('.rate .tabs-content '+ targetId).addClass('show');
        $(this).addClass('active');

    });

    try{
        $('.step_content .drop-parent.active >a').next('.drop-content').slideDown();
    }
    catch(e) {}


    $('.step_content .drop-parent >a').on('click', function(event) {
        event.preventDefault();
        if($(this).closest('.drop-parent').hasClass('active')){
            $(this).next('.drop-content').slideUp();
            $('.step_content .drop-parent').removeClass('active');
            return;
        }
        //alert('frf');
        if($(this).next('.drop-content').is(":animated")) return;

        //$('.step_content .drop-content').css({display:'none'});
        $('.step_content .drop-content').slideUp();
        $('.step_content .drop-parent').removeClass('active');



        $(this).next('.drop-content').slideDown();
        $(this.parentNode).addClass('active');

    });

    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });

    $('.number input').bind("change keyup input click", function() {
         if (this.value.match(/[^0-9.]/g)) {
            this.value = this.value.replace(/[^0-9.]/g, '');
         }
       // this.value = this.value.replace(/(\d)(?=(\d{3})+([^\d.]|$))/g, '$1 ');
        //this.value = this.value.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
       // this.value = number_format(this.value, 2, '.', ' ');
    });

    $('.another-option >a').click(function () {
        event.preventDefault();
        if($(this).next('.hidden-option').is(":animated")) return;
        $(this).next('.hidden-option').fadeToggle();
    });


    $('.load_more').click(function () {
        event.preventDefault();


        //$('.feedback_left',this.parentNode).toggle();
        $('.feedback_right',this.parentNode).fadeIn();
        $(this).remove();
    });


    $('.close-menu').click(function () {
        event.preventDefault();


            $('.top-line__nav').fadeOut();
            $("body").css("overflow", "auto");


    });

    $('.top-line__nav_mobile-btn a').click(function () {
        event.preventDefault();

        $("body").css("overflow", "hidden");
        $('.top-line__nav').fadeIn();
        $('.top-line__nav').css({display:'flex'});


    });

    let mobileOptions = () =>{
        if(window.matchMedia('(max-width: 767px)').matches){
            try{


                $('.another-option >a').css({display:'none'});
                $('.hidden-option').removeClass('hidden-option');
                $('.mobile-another-option >a').css({display:'flex'});

                $('.mobile_options').addClass('hidden-option');
            }
            catch(e) {}


        }
        else {
            $('.desktop.another-option >a').css({display:'flex'});
            $('.mobile_options').removeClass('hidden-option');
            $('.mobile-another-option >a').css({display:'none'});

            $('.desktop-options').addClass('hidden-option');
        }
    };

    let contactsInEnd = () =>{
        if(window.matchMedia('(max-width: 767px)').matches){
            try{

                $('#contacts').appendTo('.top-line__nav nav >ul');

            }catch(e){}
        }
        else{
            $('#contacts').insertBefore( $('.top-line__nav nav >ul .dropdown'));
        }

    };

    function returnMenu() {
        if(window.matchMedia('(min-width: 767px)').matches){
            try{

                $('.top-line__nav').fadeIn();
                $('.top-line__nav nav .dropdown ul').css({display:'none'});


            }catch(e){}
        }
        else{
            try{

                $('.top-line__nav').css({display:'none'});

                $('.top-line__nav nav .dropdown ul').css({display:'block'});


            }catch(e){}
        }
    }


    mobileOptions();
    window.addEventListener("orientationchange", function () {
        mobileOptions();
        contactsInEnd();
        returnMenu();
    }, false);


    $(window).resize(function () {
        mobileOptions();
        contactsInEnd();
        returnMenu();
    });

    $(".with-tip input").bind('change keyup input click', function (e) {

        let count = $(this).val().length;
        if(count > 0){
            $(this.parentNode).addClass('verified');
            $(this).next('.tip').fadeOut();
            return;
        }
        $(this.parentNode).removeClass('verified');
        $(this).next('.tip').fadeIn();
    });


    $('.login_form .btn-close').click(function () {
        $(this).closest('.login_form').fadeOut();
        $(this).closest('.login').children('.btn-login').removeClass('active');
    });

    $(document).click( function(event){
        let language = $(event.target).closest(".language").length;
        let loginForm = $(event.target).closest(".login").length;
        let anotherOption = $(event.target).closest(".another-option").length;

        if( language || loginForm || anotherOption) // родитель выпадающего списка
            return;

        $(".language ul").fadeOut();
        $(".login_form").fadeOut();
        $(".login_form").closest('.login').children('.btn-login').removeClass('active');
        $(".hidden-option").fadeOut();
        event.stopPropagation();
    });

    $('.step:first-child .step_content .option:not(".option_another")').on('click', function () {
        event.preventDefault();

        $('.option.active',this.closest('.step_content')).removeClass('active');
        $(this).addClass('active');
        $('.hidden-option',this.closest('.step_content')).fadeOut();

    });
    $('.step:nth-child(2) .step_content .option:not(".option_another")').on('click', function () {
        event.preventDefault();
        $('.option.active',this.closest('.step_content')).removeClass('active');
        $(this).addClass('active');
        $('.hidden-option',this.closest('.step_content')).fadeOut();
    });

    $('.message_success .btn-close, .message_failed .btn-close').click( function(event){
        $(this.parentNode).fadeOut();
        console.log($(this.parentNode));
    });


    $('.partner .drop-parent >a, .slide-tabs .drop-parent >a').on('click', function (e) {
        event.preventDefault();
        //console.log('rwf');
        if($(this).next('.drop-content').is(":animated")) return;

        $(this.parentNode).toggleClass('active');

        $(this).next('.drop-content').slideToggle();

    });

    function activeDown() {
        try {
            $('.partner .drop-parent.active >a, .slide-tabs .drop-parent.active >a').next('.drop-content').slideDown();

        } catch(e){}
    }

    activeDown();


    function number_format(number, decimals, dec_point, thousands_sep) {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + (Math.round(n * k) / k)
                    .toFixed(prec);
            };
        // Fix for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
            .split('.');
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
        }
        if ((s[1] || '')
                .length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1)
                .join('0');
        }
        return s.join(dec);
    }


   // var Highcharts = require('highcharts');
   // import {Highcharts} from '/highcharts'
// Create the chart
    try {
        Highcharts.chart('container', { /*Highcharts options*/ });


        Highcharts.chart('container', {
            chart: {
                type: 'area',
                spacingBottom: 30
            },
            title: {
                text: 'Fruit consumption *'
            },
            subtitle: {
                text: '* Jane\'s banana consumption is unknown',
                floating: true,
                align: 'right',
                verticalAlign: 'bottom',
                y: 15
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 150,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
            },
            xAxis: {
                categories: ['Apples', 'Pears', 'Oranges', 'Bananas', 'Grapes', 'Plums', 'Strawberries', 'Raspberries']
            },
            yAxis: {
                title: {
                    text: 'Y-Axis'
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        this.x + ': ' + this.y;
                }
            },
            plotOptions: {
                area: {
                    fillOpacity: 0.5
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'John',
                data: [0, 1, 4, 4, 5, 2, 3, 7]
            }, {
                name: 'Jane',
                data: [1, 0, 3, null, 3, 1, 2, 1]
            }]
        });
    } catch(e){}




    $('.twice  .step_content .drop-parent_responsive >a').on('click', function(event) {
        event.preventDefault();
        if($(this).next('.drop-content_responsive').is(":animated")) return;
        if(window.matchMedia('(min-width: 540px)').matches){
            return;
        }

        $(this).next('.drop-content_responsive').slideToggle();
        $(this.parentNode).toggleClass('closed');
        //console.log('wcw');
    });

    $('.login-language .logged_form .btn-close').on('click', function(event) {
        $(this).closest('.logged_form').fadeOut();
    });

    // function closedDrop() {
    //
    //
    //     //$('.twice .step_content .drop-parent_responsive.closed .drop-content_responsive').slideDown();
    //     $('.twice .step_content .drop-parent_responsive.closed >a').next('.drop-content_responsive').slideDown();
    //
    // }
    // closedDrop();

    $('.popup-with-move-anim').magnificPopup({
        type: 'inline',

        fixedContentPos: false,
        fixedBgPos: true,

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-slide-bottom'
    });
});
