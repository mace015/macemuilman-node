jQuery(document).ready(function($) {
    "use strict";

    $('body.preloader').jpreLoader({
        showSplash : false,
        loaderVPos : '50%',
    }).css('visibility','visible');


    if (typeof revapi1 !== "undefined") {
        revapi1.bind("revolution.slide.onloaded",function (e) {
            $('.revolution_slider_overlayed .tp-bgimg').after('<div class="tp-overlay"></div>');
        });
    }

    $('.scroll').on('click', function(e) {
        e.preventDefault();
        var href = $(this).attr('href');
        var hash = href.split('#');
        var url_hash = '#' + hash[1];
        if ($(url_hash).length > 0) {
            var offset = ($(window).width()<968) ? 20 : 100;
            $('html, body').animate({
                scrollTop: $(url_hash).offset().top-offset
            }, 1000);
        }
        else{
            location.href = href;
        }
        if($(window).width()<968){
            var $menu_responsive = $('#ABdev_main_header nav');
            $menu_responsive.animate({width:'toggle'},350);
        }
    });


    $('#back_to_top').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 900);
        return false;
    });


    $('#vozxcf-submit').on('click', function(e) {
        e.preventDefault();
        var $button=$(this);
        var $form = $button.parents('form');
        var $wrapper = $form.parents('#vozxcf-wrapper');
        $wrapper.find('.vozxcf-response-output').slideUp(300);
        $button.val('Sending').prop('disabled', true).addClass('disabled');
        var success_msg = '';
        if($form.find('#formid').val()=='planner'){
            success_msg = "Project details are successfuly sent. Thank you for your interest, we will respond as soon as possible.";
        }
        else{
            success_msg = "Message is successfuly sent. Thank you for your interest, we will respond as soon as possible.";
        }
        var str = $form.serialize() + '&action=js';
        $.ajax({
            type: "POST",
            url: 'php/sendmail.php',
            data: str,
            success: function(msg){
                if(msg == "OK"){
                    $button.val('SENDED');
                    $('.gtt_reg_data_field').prop('disabled', true).addClass('disabled_text_input');
                    var form_height = $form.outerHeight();
                    $form.slideUp(1200);
                    $('html, body').animate({scrollTop: $(window).scrollTop() - form_height});
                    $wrapper.find('.vozxcf-response-output').addClass('success').html(success_msg).slideDown(600);
                }
                else{
                    $button.val('SEND').prop('disabled', false).removeClass('disabled');
                    $wrapper.find('.vozxcf-response-output').html(msg).slideDown(600);
                }
            }
        });
        return false;
    });


    //shop tweaks

    $('a.shop-review-link').on('click', function(e) {
       e.preventDefault();
       $('.shop-tabs')
       $(".shop-tabs>ul.tabs>li.reviews_tab>a").click();
       $('html, body').animate({scrollTop: $(".shop-tabs").offset().top-100}, 1000);
    });

    $(window).load(function(){
        var $product_image = $('.shop ul.products li.product > a img');
        var $product_button = $('.shop ul.products li.product a.button');
        var $image_height = $product_image.outerHeight()/2;
        $product_button.css({'margin-left': - $product_button.outerWidth()/2 + 'px', 'top' : $image_height + 'px'});
    });

    //Menu Cart hover

    var menu_cart = $('#shop_links'), subelement = menu_cart.find('.cart_dropdown_widget').css({display:'none', opacity: 0});

    if(subelement.find('h2').length>0){
        menu_cart.hover(
            function(){ subelement.css({display:'block'}).stop().animate({opacity:1}); },
            function(){ subelement.stop().animate({opacity:0}, function(){ subelement.css({display:'none'}); }); }
        );
    }

    //List/Grid toggle

    $( document ).ready(function() {
        $('.shop .gridlist-toggle a#grid').empty().append('<i class="ci_icon-th"></i>');
        $('.shop .gridlist-toggle a#list').empty().append('<i class="ci_icon-th-list"></i>');
    });

    $('.home.page .vozx_section_DD').waypoint(function(direction) {
        var section_id = $(this).attr('id');
        if(section_id!==undefined){
            $('.current-menu-item, .current-menu-ancestor').removeClass('current-menu-item').removeClass('current-menu-ancestor');
            if(direction==='down'){
                var $menu_item = $('#main_menu a[href=#'+section_id+']').parent();
                if($menu_item.length>0){
                    $menu_item.addClass('current-menu-item');
                }
                else{
                    $('#main_menu .current_page_item').addClass('current-menu-item');
                }
            }
            else if(direction==='up'){
                var previous_section_id = $(this).prevAll('[id]:first').attr('id');
                var $menu_item = $('#main_menu a[href=#'+previous_section_id+']').parent();
                if($menu_item.length>0){
                    $menu_item.addClass('current-menu-item');
                }
                else{
                    $('#main_menu .current_page_item').addClass('current-menu-item');
                }
            }
        }
    },{
      offset: 100
    });

    var $main_slider = $('#ABdev_main_slider');
    $main_slider.height('auto');
    var $main_header = $('#ABdev_main_header');
    var $header_spacer = $('#ABdev_header_spacer');
    var $sticky_main_header = $('.sticky_main_header');
    var $switch_main_header = $('.switch_main_header');

    $('#ABdev_main_slider.ABdev_parallax_slider').height($(window).height());

    var header_height = $main_header.outerHeight();

    $header_spacer.height(header_height);

    var admin_toolbar_height = parseInt($('html').css('marginTop'), 10);
    var $topBar = $('#top_bar');
    var topBar_height = $topBar.outerHeight();
    var $main_logo = $('#main_logo');
    var $inverted_logo = $('#inverted_logo');

    function header_switch(){
        var $header_spacer_transparent = $('#ABdev_header_spacer_transparent');
         if($(document).scrollTop() < $main_slider.height() && $(window).width()>979){
             if($(document).scrollTop() < $switch_main_header.height()){
                $header_spacer_transparent.remove();
                $switch_main_header.addClass('transparent').removeClass('default').fadeIn();
                $main_logo.hide();
                $inverted_logo.show();
             }
             else{
                 $switch_main_header.fadeOut();
             }
         }
         else{
             $switch_main_header.removeClass('transparent').addClass('default').slideDown();
             var default_height = $switch_main_header.outerHeight();
             $main_logo.show();
             $inverted_logo.hide();
             $header_spacer_transparent.height(default_height);
         }
    }

    function sticky_header(){
        $(document).scroll(function(){
            header_switch();
            var scroll_top = $(document).scrollTop();
            var padding_diff = Math.floor(scroll_top/2);
            padding_diff = (padding_diff > 20) ? 20 : padding_diff;
            if(padding_diff==20 && $(window).width()>979){
                $sticky_main_header.addClass('sticky_header_low');
            }
            else{
                $sticky_main_header.removeClass('sticky_header_low');
            }
        });
    }

    sticky_header();
    header_switch();

    /* centered menu */

    function menu_scroll(){
        var $header_spacer_center = $('#ABdev_header_spacer_center');
        var $main_header_centered = $('#ABdev_main_header.header_layout_centered');
        if($(window).width()>767 && $main_slider.length > 0){
            $(document).scroll(function(){
                var scroll_top = $(document).scrollTop();
                var padding_diff = Math.floor(scroll_top/2);
                padding_diff = (padding_diff > 20) ? 20 : padding_diff;
                $header_spacer_center.remove();
                if(padding_diff==20){
                    $main_header_centered.addClass('smaller fixed');
                }
                else{
                    $main_header_centered.removeClass('smaller fixed');
                }
            });
        } else{
            $main_header_centered.addClass('smaller fixed');
            $header_spacer_center.height(91);
        }
    }

    menu_scroll();

    $('.main_menu_item_logo').prev().addClass('no_slash');


    // Search toggle
    $('.search-icon').on('click', function(e) {
        e.preventDefault();
        var $that = $(this);
        var $wrapper = $('.search-box-wrapper');

        $that.toggleClass('active');
        $wrapper.slideToggle('300');

        if ($that.hasClass('active')) {
            $wrapper.find('input').focus();
        }
    });


    $('.accordion-group').on('show', function() {
        $(this).find('i').removeClass('icon-plus').addClass('icon-minus');
    });
    $('.accordion-group').on('hide', function() {
        $(this).find('i').removeClass('icon-minus').addClass('icon-plus');
    });


    var sf, body;
    body = $('body');
    sf = $('#main_menu');
    if($('#ABdev_menu_toggle').css('display') === 'none') {
        // enable superfish when the page first loads if we're on desktop
        sf.superfish({
            delay:          300,
            animation:      {opacity:'show',height:'show'},
            animationOut:   {height:'hide'},
            speed:          'fast',
            speedOut:       'fast',
            cssArrows:      false,
            disableHI:      true /* load hoverIntent.js in header to use this option */,
            onBeforeShow:   function(){
                var ww = $(window).width();
                var locUL = this.parent().offset().left + this.width();
                var locsubUL = this.parent().offset().left + this.parent().width() + this.width();
                var par = this.parent();
                // if(par.hasClass("menu-item-depth-0") && (locUL > ww)){
                //     this.css('marginLeft', "-"+(locUL-ww+20)+"px");
                // }
                // else if (!par.hasClass("menu-item-depth-0") && (locsubUL > ww)){
                //     this.css('left', "-"+(this.width())+"px");
                // }
            }
        });
    }

    $('.vozx-tabs-timeline').each(function(){
        var $this = $(this);
        var $tabs = $this.find('ul > li');
        var tabsCount = $tabs.length;
        $tabs.addClass('tab_par_'+tabsCount);
    });


    $(".fancybox").fancybox({
        'transitionIn'      : 'elastic',
        'transitionOut'     : 'elastic',
        'titlePosition'     : 'over',
        'cyclic'            : true,
        'overlayShow'       : true,
        'titleFormat'       : function(title, currentArray, currentIndex) {
            return '<span id="fancybox-title-over">Image ' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? ' &nbsp; ' + title : '') + '</span>';
        }
    });

    var $menu_responsive = $('#ABdev_main_header nav');
    $('#ABdev_menu_toggle').on('click', function() {
        $menu_responsive.animate({width:'toggle'},350);
    });

    $('.submit').on('click', function() {
        $(this).closest("form").submit();
    });

    $('input, textarea').placeholder();

    var $content = $("#timeline_posts");
    var $loader = $("#timeline_loading");
    var itemSelector = ('.timeline_post');

    function timeline_classes(){
        $content.find(itemSelector).each(function(){
           var posLeft = $(this).css("left");
           if(posLeft == "0px"){
               $(this).removeClass('timeline_post_right').addClass('timeline_post_left');
           }
           else{
               $(this).removeClass('timeline_post_left').addClass('timeline_post_right');
           }
        });
    }

    $content.imagesLoaded( function() {
        $content.masonry({
          columnWidth: ".timeline_post_first",
          gutter: 100,
          itemSelector: itemSelector,
        });
        timeline_classes();
    });

    $(window).on('scroll', function () {
        if ($(window).scrollTop() + $(window).height()  >= $(document).height() - $('#ABdev_main_footer').height()) {
             if(!( $loader.hasClass('timeline_loading_loader') || $loader.hasClass('timeline_no_more_posts'))){
                load_posts();
            }
        }
    });

    var pageNumber = 1;
    function load_posts(){
        if(!($loader.hasClass('timeline_loading_loader') || $loader.hasClass('timeline_no_more_posts'))){
            pageNumber++;
            var url = $loader.data("ajaxurl");
            $.ajax({
                type: "GET",
                dataType   : "html",
                url: url,
                success : function(data){
                    var $data = $(data);
                    if($data.length){
                        var $newElements = $data.css({ opacity: 0 });
                        $content.append( $newElements );
                        $content.imagesLoaded(function(){
                            $loader.removeClass('timeline_loading_loader');
                            $content.masonry( 'appended', $newElements, false );
                            $newElements.animate({ opacity: 1 });
                            timeline_classes();
                        });
                    } else {
                        $loader.removeClass('timeline_loading_loader').html('No more posts.');
                    }
                },
                beforeSend : function(){
                    $loader.addClass('timeline_loading_loader').html('');
                },
                error : function(jqXHR, textStatus, errorThrown) {
                    $loader.html(jqXHR + " :: " + textStatus + " :: " + errorThrown);
                },
                complete : function(){
                    $loader.removeClass('timeline_loading_loader');
                    timeline_classes();
                }
            });
        }
        return false;
    }

    /* Counter */

    $('.vozx_countdown.simple_style').each(function() {
        var $this = $(this);
        var countDownString = $this.data("value");

        function update_countown_element($element,number){
            $element.html(number);
            var $span = $element.next('span');
            if(parseInt(number) == 1){
                $span.html($span.data("singular"));
            }
            else{
                $span.html($span.data("plural"));
            }
        }

        $this.find('.simple.countdown.year').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%Y'));
        });

        $this.find('.simple.countdown.month').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%m'));
        });

        $this.find('.simple.countdown.day').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%d'));
        });

        $this.find('.simple.countdown.hour').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%H'));
        });

        $this.find('.simple.countdown.minute').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%M'));
        });

        $this.find('.simple.countdown.second').countdown(countDownString).on('update.countdown', function(event){
            update_countown_element($(this),event.strftime('%S'));
        });
    });


    $('.vozx_countdown.flip_style').each(function() {
        var $this = $(this);
        var countDownString = $this.data("value");

        function zeroPad(num, places) {
          var zero = places - num.toString().length + 1;
          return Array(+(zero > 0 && zero)).join("0") + num;
        }

        function update_flip_countown_element($element,new_number,if_negative){
            var current_number = parseInt($element.find('.count.curr').html());
            if(current_number!=new_number && !$element.hasClass('in_a_flip')){
                var $span = $element.find('span');
                if(parseInt(new_number) == 1){
                    $span.html($span.data("singular"));
                }
                else{
                    $span.html($span.data("plural"));
                }
                setTimeout(function(){
                    $element.addClass('flip in_a_flip');
                },5);
                setTimeout(function(){
                    $element.find('.count.curr').html(zeroPad(new_number, 2));
                },510);
                setTimeout(function(){
                    $element.removeClass('flip in_a_flip');
                    new_number = (new_number-1 === -1) ? if_negative : new_number-1;
                    $element.find('.count.next').html(zeroPad(new_number, 2));
                },600);
            }
        }

        $this.find('.flip_element.year .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%Y'),0);
        });

        $this.find('.flip_element.month .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%m'),11);
        });

        $this.find('.flip_element.day .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%d'),30);
        });

        $this.find('.flip_element.hour .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%H'),23);
        });

        $this.find('.flip_element.minute .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%M'),59);
        });

        $this.find('.flip_element.second .count.curr.top').countdown(countDownString).on('update.countdown', function(event){
            update_flip_countown_element($(this).parent(),event.strftime('%S'),59);
        });

    });

    /*  isotope portfolio  */

    var sortBy = 'original-order';
    var columnWidth = '.portfolio_item';
    $('.ABdev_latest_portfolio').each(function(){
        var $current_portfolio = $(this);
        if( $current_portfolio.find('.portfolio_item').hasClass('portfolio_masonry_fullwidth')){
            sortBy = 'random';
            columnWidth = '.portfolio_item.small';
        }
        $current_portfolio.imagesLoaded( function() {
            $current_portfolio.isotope({
                layoutMode: 'masonry',
                masonry: {
                  columnWidth: columnWidth
                },
                itemSelector : '.portfolio_item',
                sortBy: sortBy
            });
        });
    });

    $('.portfolio_filter_button').on('click', function() {
        var $portfolio_filter_clicked_button = $(this);
        if ( $portfolio_filter_clicked_button.hasClass('selected') ) {
            return false;
        }
        var $portfolio_filter = $portfolio_filter_clicked_button.parents('.portfolio_filter');
        $portfolio_filter.find('.selected').removeClass('selected');
        $portfolio_filter_clicked_button.addClass('selected');
        var options = {},
            key = $portfolio_filter.attr('data-option-key'),
            value = $portfolio_filter_clicked_button.attr('data-option-value');
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
            changeLayoutMode( $portfolio_filter_clicked_button, options );
        } else {
            $portfolio_filter.next('.ABdev_latest_portfolio').isotope( options );
        }
        return false;
    });

    /*Nivo Slider in Portfolio*/

    $(window).load(function() {

        $('#portfolio_gallery_slider').nivoSlider({
            effect:'fade', // Specify sets like: 'fold,fade,sliceDown'
            pauseTime:3000, // How long each slide will show
            directionNav:false, // Next & Prev navigation
            controlNavThumbs:true,
            controlNavThumbsFromRel:false,
            manualAdvance: false,
        });

        /* carouFredSel */

        $('.ABp_latest_portfolio').each(function (){
            var $prev = $(this).find('.portfolio_prev');
            var $next = $(this).find('.portfolio_next');
            $(this).find('ul').carouFredSel({
                prev: $prev,
                next: $next,
                auto: false,
                width: '100%',
                scroll: 1,
            });

        });

        $('.vozx-carousel').each(function (){
            var $prev = $(this).find('.carousel_prev');
            var $next = $(this).find('.carousel_next');

            var $autoPlay = $(this).data("autoplay") == '0' ? false : true;
            var $items = $(this).data("items");
            var $effect = $(this).data("effect");
            var $easing = $(this).data("easing");
            var $duration = $(this).data("duration");

            $(this).find('ul').carouFredSel({
                prev: $prev,
                next: $next,
                width: '100%',
                play: true,
                auto: $autoPlay,
                scroll: {
                    items: $items,
                    fx: $effect,
                    easing: $easing,
                    duration: $duration,
                }
            });
        });


        /*filling the body hack*/
        var difference = $(document).height()-$('body').height();
        var spacer = '<span class="clear full_body_spacer" style="display:block;"></span>';

        if (difference>0) {
            $(spacer).insertBefore('#ABdev_main_footer');
            $(document).find('.full_body_spacer').css('height', difference+'px');
        }

    });


    $(window).resize(function() {

        timeline_classes();

        // sticky_header();

        $('.ABdev_latest_portfolio').isotope('layout');

         if($('#ABdev_menu_toggle').css('display') === 'none' && !sf.hasClass('sf-js-enabled')) {
            // you only want SuperFish to be re-enabled once (sf.hasClass)
            $menu_responsive.show();
            sf.superfish({
                delay:          300,
                animation:      {opacity:'show',height:'show'},
                animationOut:   {height:'hide'},
                speed:          'fast',
                speedOut:       'fast',
                cssArrows:      false,
                disableHI:      true /* load hoverIntent.js in header to use this option */,
                onBeforeShow:   function(){
                    var ww = $(window).width();
                    var locUL = this.parent().offset().left + this.width();
                    var locsubUL = this.parent().offset().left + this.parent().width() + this.width();
                    var par = this.parent();
                    if(par.hasClass("menu-item-depth-0") && (locUL > ww)){
                        this.css('marginLeft', "-"+(locUL-ww+20)+"px");
                    }
                    else if (!par.hasClass("menu-item-depth-0") && (locsubUL > ww)){
                        this.css('left', "-"+(this.width())+"px");
                    }
                }
            });
        } else if($('#ABdev_menu_toggle').css('display') != 'none' && sf.hasClass('sf-js-enabled')) {
            // smaller screen, disable SuperFish
            sf.superfish('destroy');
            $menu_responsive.hide();
        }
    });

    /*Testimonial*/

    $('.ABt_testimonials_wrapper').each(function() {
        var $slider = $(this).find('.ABt_testimonials_slide');
        var fx = $slider.data("fx");
        var play = $slider.data("play");
        var easing = $slider.data("easing");
        var direction = $slider.data("direction");
        var duration = parseInt($slider.data("duration"), 10);
        var pauseonhover = $slider.data("pauseonhover");
        var timeoutduration = parseInt($slider.data("timeoutduration"), 10);
        var $prev = $(this).find('.ABt_prev');
        var $next = $(this).find('.ABt_next');
        var $pagination = $(this).find('.ABt_pagination');
        $slider.carouFredSel({
            prev   : $prev,
            next   : $next,
            pagination: $pagination,
            direction       : direction,
            responsive : true,
            auto   : {
                play            : play,
                fx              : fx,
                easing          : easing,
                duration        : duration,
                pauseOnHover    : pauseonhover,
                timeoutDuration : timeoutduration,
            },
            scroll   : {
                fx              : fx,
                easing          : easing,
                duration        : duration,
            },
            width  : 'auto',
            items  : {
                visible:1,
            },
        });
    });

    $('.ABt_form').each(function(){
        var $form = $(this);
        var $wrapper = $(this).parent();
        $form.ajaxForm({
            url: ABt_custom.ajaxurl,
            beforeSubmit: function () {
                $wrapper.find('.ABt_success_message').html(ABt_custom.sending).slideDown(400);
            },
            success: function (responseText)  {
                if(responseText === "OK"){
                    $form.animate({ height: '0px' }, 800, function() {
                        $form.hide();
                    });
                    $wrapper.find('.ABt_success_message').delay(400).html(ABt_custom.success).slideDown(600);
                }
                else {
                    $wrapper.find('input[type=text], textarea').each( function(){
                        if($(this).val() === ''){
                            $(this).addClass('ABt_field_error');
                        }
                        else{
                            $(this).removeClass('ABt_field_error');
                        }
                    });
                    $wrapper.find('.ABt_success_message').html(ABt_custom.error).slideDown(600);
                }
            },
        });
    });  /*ABt_custom je neki url koji pokazuje na admin-ajax.php!*/

    $('.ABt_form input, .ABt_form textarea').placeholder();

    /*Shop functionality*/

    /*Price slider*/

    // Get markup ready for slider
    $( 'input#min_price, input#max_price' ).hide();
    $( '.price_slider, .price_label' ).show();

    // Price slider uses jquery ui
    var min_price = $( '.price_slider_amount #min_price' ).data( 'min' ),
        max_price = $( '.price_slider_amount #max_price' ).data( 'max' ),
        current_min_price = parseInt( min_price, 10 ),
        current_max_price = parseInt( max_price, 10 );


    $(function() {
        var options = {
            range: true,
            animate: true,
            min: min_price,
            max: max_price,
            values: [ current_min_price, current_max_price ],
            slide: function(event, ui) {
                var min = ui.values[0],
                    max = ui.values[1];

                $("#price_label").val("$" + min + " - $" + max);
            }
        }, min, max;

        // $(".price_slider").slider(options);

        // min = $(".price_slider").slider("values", 0);
        // max = $(".price_slider").slider("values", 1);

        $("#price_label").val("$" + min + " - $" + max);

    });

    $('.a.shop-review-link').on('click', function() {
        $( '.reviews_tab a' ).click();
        return true;
    });

    // Star ratings for comments

    $( '#rating' ).hide().before( '<p class="stars"><span><a class="star-1" href="#">1</a><a class="star-2" href="#">2</a><a class="star-3" href="#">3</a><a class="star-4" href="#">4</a><a class="star-5" href="#">5</a></span></p>' );

    $( 'body' )
        .on( 'click', '#respond p.stars a', function() {
            var $star   = $( this ),
                $rating = $( this ).closest( '#respond' ).find( '#rating' );

            $rating.val( $star.text() );
            $star.siblings( 'a' ).removeClass( 'active' );
            $star.addClass( 'active' );

            return false;
        })
        .on( 'click', '#respond #submit', function() {
            var $rating = $( this ).closest( '#respond' ).find( '#rating' ),
                rating  = $rating.val();

            if ( $rating.size() > 0 && ! rating && wc_single_product_params.review_rating_required === 'yes' ) {
                alert( wc_single_product_params.i18n_required_rating_text );

                return false;
            }
        });

    // Quantity buttons
    $( 'div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)' ).addClass( 'buttons_added' ).append( '<input type="button" value="+" class="plus" />' ).prepend( '<input type="button" value="-" class="minus" />' );

    // Target quantity inputs on product pages
    $( 'input.qty:not(.product-quantity input.qty)' ).each( function() {
        var min = parseFloat( $( this ).attr( 'min' ) );

        if ( min && min > 0 && parseFloat( $( this ).val() ) < min ) {
            $( this ).val( min );
        }
    });

    $( document ).on( 'click', '.plus, .minus', function() {

        // Get values
        var $qty        = $( this ).closest( '.quantity' ).find( '.qty' ),
            currentVal  = parseFloat( $qty.val() ),
            max         = parseFloat( $qty.attr( 'max' ) ),
            min         = parseFloat( $qty.attr( 'min' ) ),
            step        = $qty.attr( 'step' );

        // Format values
        if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
        if ( max === '' || max === 'NaN' ) max = '';
        if ( min === '' || min === 'NaN' ) min = 0;
        if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

        // Change the value
        if ( $( this ).is( '.plus' ) ) {

            if ( max && ( max == currentVal || currentVal > max ) ) {
                $qty.val( max );
            } else {
                $qty.val( currentVal + parseFloat( step ) );
            }

        } else {

            if ( min && ( min == currentVal || currentVal < min ) ) {
                $qty.val( min );
            } else if ( currentVal > 0 ) {
                $qty.val( currentVal - parseFloat( step ) );
            }

        }

        // Trigger change event
        $qty.trigger( 'change' );
    });


    var vozx_options = {"vozx_tipsy_opacity":"0.8","vozx_custom_map_style":""};



    $('.vozx_section_dd').each(function(){
        if ($(this).data('background_image')){
            var background_image = $(this).data('background_image');
            $(this).css('background-image', 'url(' + background_image + ')');
        }
    });


    $('.vozx-image-callout-box').each(function(){
        if ($(this).data('background_image')){
            var background_image = $(this).data('background_image');
            $(this).css('background-image', 'url(' + background_image + ')');
        }
    });



/*********** Parallax ************************************************************/

    $('.vozx-parallax').each(function(){
        var parallax_amount = $(this).data('parallax');
        var background_image = $(this).data('background_image');
        if(!jQuery.browser.mobile && background_image!==undefined){
            $(this).css('background-image', 'url(' + background_image + ')');
            $(this).parallax("50%", parallax_amount,false);
        }
        else{
            $(this).css('background-attachment', 'scroll');
        }
    });



    // $('.vozx-video-bg .section_video_background').mediaelementplayer( {pauseOtherPlayers: false} );

    function vozx_resize_video_bg($section){
        var $video = $section.find('.vozx_video_background');
        $video.width('auto');
        var video_height = $video.height();
        var ratio = $video.width()/video_height;
        var difference = $section.height()-video_height;
        if(difference>0){
            $video.width((video_height+difference)*ratio);
        }
    }

    $('.vozx-video-bg').each(function(){
        vozx_resize_video_bg($(this));
        $(this).find('.vozx_video_background').css({'visibility':'visible'});
    });


/*********** Animations ************************************************************/
    if(!jQuery.browser.mobile){
        $('.vozx-animo').each(function(){
            var $animated = $(this);
            var animation = $animated.data('animation');
            var timing = $animated.data('timing');
            var duration = $animated.data('duration')/1000;
            var delay = parseInt($animated.data('delay'),10);
            $animated.waypoint({
                handler: function(direction) {
                    if(!$animated.hasClass('animation_completed')){
                        if(delay>0){
                            setTimeout(function() {
                                $animated.addClass('animation_completed').animo( { animation: animation, duration: duration, timing: timing} );
                            }, delay);
                        } else{
                            $animated.addClass('animation_completed').animo( { animation: animation, duration: duration, timing: timing} );
                        }
                    }
                },
                offset: function(){
                    var trigger_pt = (typeof $animated.data('trigger_pt')!== 'undefined') ? $animated.data('trigger_pt').toString(10) : '0';
                    if(trigger_pt.indexOf("%")>0){
                        trigger_pt = $animated.outerHeight()*parseInt(trigger_pt,10)/100;
                    }
                    var wh = $(window).height();
                    var pixels = wh - parseInt(trigger_pt,10);
                    return pixels;
                }
            });

        });
    } else{
        $(".vozx-animo").css({visibility: "visible"});
    }

    $(".vozx-animo-children").each(function(){
        var $animated = $(this);
        var animation = $animated.data('animation');
        var duration = $animated.data('duration')/1000;
        var delay = parseInt($animated.data('delay'),10);
        var difference = 0;
        $animated.children().each(function(){
            var $element = $(this);
            $element.waypoint({
                handler: function(direction) {
                    if(!$element.hasClass('animation_completed')){
                        if(delay>0){
                            setTimeout(function() {
                                $element.addClass('animation_completed').animo( { animation: animation, duration: duration} );
                            }, difference);
                            difference = difference + delay;
                        } else{
                            $element.addClass('animation_completed').animo( { animation: animation, duration: duration} );
                        }
                    }
                },
                offset: 'bottom-in-view'
            });
        });

    });


/*********** Accordions ************************************************************/
    $( ".vozx-accordion" ).accordion({
        collapsible: true,
        active: false,
        heightStyle: "content",
        create: function( event, ui ) {
            var expanded = $(this).data("expanded");
            if(expanded===0){
                expanded = false;
            }
            else{
                expanded = expanded-1;
            }
            $(this).accordion( "option", "active", expanded);
        },
    });


/*********** Tabs ************************************************************/
    $('.vozx-tabs').each(function() {
        var $tabs = $(this);
        var effect = $tabs.data("effect");
        var optionSelected = $tabs.data("selected")-1;
        var directions;
        if($tabs.hasClass('vozx-tabs-horizontal')){
            directions = {'after':'right', 'before':'left'};
        }
        else{
            directions = {'after':'down', 'before':'up'};
        }
        $tabs.tabs({
            active:optionSelected,
            beforeActivate: function( event, ui ) {
                if(effect==='slide'){
                    var parent = ui.oldPanel.parent();
                    var diffHeight = parent.height() - (ui.oldPanel.height() - ui.newPanel.height());
                    parent.animate({height: diffHeight}, 300, function() {
                        parent.height('auto');
                    });
                    if (ui.newTab.index() > ui.oldTab.index()){
                        $tabs.tabs( "option", "show", { effect: "slide", direction: directions.after, duration: 400 } );
                    }
                    else{
                        $tabs.tabs( "option", "show", { effect: "slide", direction: directions.before, duration: 400 } );
                    }
                }
                else if(effect==='fade'){
                    $tabs.tabs( "option", "show", true );
                }
            },
        });
    });

    function vozx_tabs_responsive(){
        $('.vozx-tabs').each(function(){
            var $tabs = $(this);
            if($tabs.width() < parseInt($tabs.data('break_point'))){
                $tabs.addClass('vozx-tabs-fullwidthtabs');
            }
            else{
                $tabs.removeClass('vozx-tabs-fullwidthtabs');
            }
        });
    }

    vozx_tabs_responsive();



/*********** Alert Box ************************************************************/
    $( ".vozx_alert_box_close" ).click(function(){
        var $parent = $(this).parent();
        $parent.animate({height:"0px", paddingTop:"0px", paddingBottom:"0px", margin:"0px", opacity:"0"},400);
    });


/*********** Stats excerpt counter ************************************************************/
    function vozx_counter($object,interval,max,increment) {
        var number = parseInt($object.text(),10) + increment;
        if (number < max){
            setTimeout(function() {vozx_counter($object,interval,max,increment);} ,interval);
            $object.text(number);
        }
        else{
            $object.text(max);
        }
    }

    if(!jQuery.browser.mobile){
         $(".vozx_stats_number").each(function(){
            var $animated = $(this);
            var animation = $animated.data('animation');
            var timing = $animated.data('timing');
            var duration = $animated.data('duration')/1000;
            var delay = parseInt($animated.data('delay'),10);
            var max = $(this).data('number');
            var increment = 1;
            if (max > 50) increment = 10;
            if (max > 500) increment = 100;
            if (max > 5000) increment = 200;
            if (max > 10000) increment = 1000;
            var interval = $animated.data('duration')/(max/increment);
            $animated.text('0');
            $animated.waypoint({
                handler: function(direction) {
                    if(!$animated.hasClass('animation_completed')){
                        if(delay>0){
                            setTimeout(function() {
                                $animated.addClass('animation_completed').animo( { animation: animation, duration: duration, timing: timing} );
                                vozx_counter($animated, interval, max, increment);
                            }, delay);
                        } else{
                            $animated.addClass('animation_completed').animo( { animation: animation, duration: duration, timing: timing} );
                            vozx_counter($animated, interval, max, increment);
                        }
                    }
                },
                offset: function(){
                    var trigger_pt = (typeof $animated.data('trigger_pt')!== 'undefined') ? $animated.data('trigger_pt').toString(10) : '0';
                    if(trigger_pt.indexOf("%")>0){
                        trigger_pt = $animated.outerHeight()*parseInt(trigger_pt,10)/100;
                    }
                    var wh = $(window).height();
                    var pixels = wh - parseInt(trigger_pt,10);
                    return pixels;
                }
            });

        });

    } else{
        $(".vozx_stats_number").each(function() {
            var max = $(this).data("number");
            $(this).text(max);
        });
    }


/*********** Knob ************************************************************/
    $(".vozx_knob_wrapper").each(function(){
        var $wrapper = $(this);
        var $knob = $wrapper.find(".vozx_knob");
        var $number_sign = $wrapper.find(".vozx_knob_number_sign");
        var $number = $wrapper.find(".vozx_knob_number");

        $knob.knob({
            'displayInput' : false,
        });

        var canvas_width = $wrapper.find("canvas").width();

        $number_sign.css({
            'visibility' : 'visible',
            'lineHeight' : canvas_width+'px',
        });

        if(!jQuery.browser.mobile){
            $knob.val(0).trigger('change');
            $wrapper.waypoint({
                handler: function(direction) {
                    if(!$wrapper.hasClass('animation_completed')){
                        $wrapper.addClass('animation_completed');
                        $({value: 0}).animate({value: $knob.data("number")}, {
                            duration: 1000,
                            easing:'swing',
                            step: function()
                            {
                                var current = Math.ceil(this.value);
                                $knob.val(current).trigger('change');
                                $number.html(current);
                            }
                        });
                    }
                },
                offset:'95%'
            });
        } else{
            $number.html($knob.data("number"));
        }
    });



/*********** PrettyPrint ************************************************************/
    $(function(){
      window.prettyPrint && prettyPrint();
    });


/*********** Tooltip ************************************************************/
    $('.vozx_tooltip').tipsy({
        fade: true,
        opacity: vozx_options.vozx_tipsy_opacity,
        gravity: function(){
            var gravity = $(this).data("gravity");
            gravity = (gravity !== undefined) ? gravity : 's';
            return gravity;
        }
    });


/*********** Back to Top ************************************************************/
    $('.vozx_divider a').click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, 'slow');
    });


/*********** Team Member ************************************************************/
    $('.vozx_team_member_modal_link').click(function(e){
        e.preventDefault();
        var $parent = $(this).closest('.vozx_team_member');
        var $modal = $parent.find('.vozx_team_member_modal');
        var $section = $parent.closest('.vozx_section_dd');
        $modal.detach().appendTo('body').fadeIn().addClass('vozx_team_member_modal_opened');
        $parent.addClass('vozx_team_member_with_opened_modal');
    });
    $('.vozx_team_member_modal_close').click(function(e){
        e.preventDefault();
        $(this).parent().fadeOut('slow', function(){
            $(this).detach().appendTo($('.vozx_team_member_with_opened_modal')).removeClass('vozx_team_member_modal_opened');
            $('.vozx_team_member_with_opened_modal').removeClass('vozx_team_member_with_opened_modal');
        })
    });
    $(document).on('keydown', function(e) {
        if ( e.keyCode === 27 ) { //ESC
            $('.vozx_team_member_modal_opened').fadeOut('slow', function(){
                $(this).detach().appendTo($('.vozx_team_member_with_opened_modal')).removeClass('vozx_team_member_modal_opened');
                $('.vozx_team_member_with_opened_modal').removeClass('vozx_team_member_with_opened_modal');
            })
        }
    });


/*********** Progress Bar ************************************************************/
    if(!jQuery.browser.mobile){
        $(".vozx_meter .vozx_meter_percentage").width(0).each(function(){
            var $bar = $(this);
            var newwidth = $bar.data("percentage") + '%';
            $bar.waypoint({
                handler: function(direction) {
                    if(!$bar.hasClass('animation_completed')){
                        $bar.addClass('animation_completed').animate({width: newwidth}, {
                            duration:1500,
                            step: function(now) {
                                $bar.find('span').html(Math.floor(now) + '%');
                                var above_tenths = Math.floor(now/10);
                                for(var i=1; i<=above_tenths; i++){
                                    $bar.addClass('vozx_meter_above'+above_tenths*10);
                                }
                            }
                        });
                    }
                },
                offset: 'bottom-in-view'
            });
        });
    } else{
        $(".vozx_meter .vozx_meter_percentage").each(function(){
            var $bar = $(this);
            var newwidth = $bar.data("percentage");
            $bar.css('width', newwidth+'%');
            for(var i=0; i<=newwidth; i++){
                var above_tenths = Math.floor(i/10);
                $bar.addClass('vozx_meter_above'+above_tenths*10);
            }

        });
    }


    /*********** Google Maps ************************************************************/
    //contact page google maps
    function initialize_gmap($element) {
        var myLatlng = new google.maps.LatLng($element.data('lat'),$element.data('lng'));
        var markerLatlng = new google.maps.LatLng($element.data('markerlat'),$element.data('markerlng'));
        var scrollwheel = ($element.data('scrollwheel') == 1 ? true : false);
        var mapTypeControl = ($element.data('maptypecontrol') == 1 ? true : false);
        var panControl = ($element.data('pancontrol') == 1 ? true : false);
        var zoomControl = ($element.data('zoomcontrol') == 1 ? true : false);
        var scaleControl = ($element.data('scalecontrol') == 1 ? true : false);
        var styles = vozx_options.vozx_custom_map_style;
        var map_type = google.maps.MapTypeId.ROADMAP;
        if ($element.data('map_type') == 'SATELLITE') map_type = google.maps.MapTypeId.SATELLITE;
        if ($element.data('map_type') == 'HYBRID') map_type = google.maps.MapTypeId.HYBRID;
        if ($element.data('map_type') == 'TERRAIN') map_type = google.maps.MapTypeId.TERRAIN;
      var mapOptions = {
        zoom: parseInt($element.data('zoom'),10),
        center: myLatlng,
        mapTypeId: map_type,
        styles: jQuery.parseJSON(styles),
        scrollwheel: scrollwheel,
        mapTypeControl: mapTypeControl,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        panControl: panControl,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        zoomControl: zoomControl,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: scaleControl,
        scaleControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_LEFT
        },
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        }
      };
      var elemnt_id = $element.attr('id');
      var map = new google.maps.Map(document.getElementById(elemnt_id), mapOptions);
      var infowindow = new google.maps.InfoWindow({
          content: $element.data('markercontent')
      });
      var marker = new google.maps.Marker({
          position: markerLatlng,
          map: map,
          title: $element.data('markertitle'),
          icon: $element.data('markericon')
      });
      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });
    }


    $('.vozx_google_map').each(function(){
        google.maps.event.addDomListener(window, 'load', initialize_gmap($(this)));
    });


    $(window).resize(function() {
        $(".vozx_knob_wrapper").each(function(){
            var $number_sign = $(this).find(".vozx_knob_number_sign");
            var canvas_width = $(this).find("canvas").width();
            $number_sign.css({
                'lineHeight' : canvas_width+'px',
            });
        });

        $('.vozx-video-bg').each(function(){
            vozx_resize_video_bg($(this));
        });

        vozx_tabs_responsive();

    });


    /*********** Simple Subscribe ************************************************************/
    $(".ABss_form").submit(function() {
        "use strict";
        var str = $(this).serialize() + '&action=ABss_save_subscriber';
        var $form = $(this);
        var $wrapper = $(this).parent();
        $.ajax({
            type: "POST",
            url: ABss_custom.ajaxurl,
            data: str,
            success: function(msg){
                if(msg === "OK"){
                    $form.animate({ height: '0px' }, 800, function() {
                        $form.hide();
                    });
                    $wrapper.find('.ABss_success_message').delay(400).html(ABss_custom.success).slideDown(600);
                }
                else {
                    $wrapper.find('.ABss_subscriber_email').addClass('ABss_field_error').attr("placeholder", ABss_custom.error).val('').focus();
                }
            }
        });
        return false;
    });

    $('.ABss_form input').placeholder();


    /*********** Tweet Scroller ************************************************************/
    $('.ab-tweet-scroller').each(function() {
        var $this =  $(this);
        var $slider = $this.find('.ab-tweet-scroller-inner');
        var fx = $this.data("fx");
        var play = $this.data("play");
        var easing = $this.data("easing");
        var direction = $this.data("direction");
        var duration = parseInt($this.data("duration"), 10);
        var pauseonhover = $this.data("pauseonhover");
        var timeoutduration = parseInt($this.data("timeoutduration"), 10);
        var $prev = $this.find('.ab-tweet-prev');
        var $next = $this.find('.ab-tweet-next');
        $slider.carouFredSel({
            prev   : $prev,
            next   : $next,
            direction       : 'left',
            responsive : true,
            auto   : {
                play            : play,
                fx              : fx,
                easing          : easing,
                duration        : duration,
                pauseOnHover    : pauseonhover,
                timeoutDuration : timeoutduration,
            },
            scroll   : {
                fx              : fx,
                easing          : easing,
                duration        : duration,
            },
            width  : 'auto',
            items  : {
                visible:1,
            },
            onCreate:function(){
                $this.css('height','auto');
            }
        });
    });

});


/******************************************
-   PREPARE PLACEHOLDER FOR SLIDER  -
******************************************/


var setREVStartSize_first = function() {
var tpopt = new Object();
tpopt.startwidth = 1170;
tpopt.startheight = 850;
tpopt.container = jQuery('#rev_slider_1_1');
tpopt.fullScreen = "off";
tpopt.forceFullWidth="off";

tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize_first();


var tpj=jQuery;
tpj.noConflict();
var revapi1;

tpj(document).ready(function() {

if(tpj('#rev_slider_1_1').revolution == undefined)
revslider_showDoubleJqueryError('#rev_slider_1_1');
else
revapi1 = tpj('#rev_slider_1_1').show().revolution(
{
dottedOverlay:"none",
delay:5000,
startwidth:1170,
startheight:850,
hideThumbs:200,

thumbWidth:100,
thumbHeight:50,
thumbAmount:3,

simplifyAll:"off",

navigationType:"bullet",
navigationArrows:"solo",
navigationStyle:"round",

touchenabled:"on",
onHoverStop:"off",
nextSlideOnWindowFocus:"off",

swipe_threshold: 0.7,
swipe_min_touches: 1,
drag_block_vertical: false,

keyboardNavigation:"off",

navigationHAlign:"right",
navigationVAlign:"bottom",
navigationHOffset:75,
navigationVOffset:45,

soloArrowLeftHalign:"left",
soloArrowLeftValign:"center",
soloArrowLeftHOffset:20,
soloArrowLeftVOffset:0,

soloArrowRightHalign:"right",
soloArrowRightValign:"center",
soloArrowRightHOffset:20,
soloArrowRightVOffset:0,

shadow:0,
fullWidth:"on",
fullScreen:"off",

spinner:"spinner0",

stopLoop:"off",
stopAfterLoops:-1,
stopAtSlide:-1,

shuffle:"off",

autoHeight:"off",
forceFullWidth:"off",

hideTimerBar:"on",
hideThumbsOnMobile:"off",
hideNavDelayOnMobile:1500,
hideBulletsOnMobile:"off",
hideArrowsOnMobile:"off",
hideThumbsUnderResolution:0,
hideSliderAtLimit:0,
hideCaptionAtLimit:601,
hideAllCaptionAtLilmit:0,
startWithSlide:0
});

}); /*ready*/


var setREVStartSize_second = function() {
var tpopt = new Object();
tpopt.startwidth = 1170;
tpopt.startheight = 700;
tpopt.container = jQuery('#rev_slider_9_1');
tpopt.fullScreen = "off";
tpopt.forceFullWidth="on";

tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize_second();


var tpj=jQuery;
tpj.noConflict();
var revapi9;

tpj(document).ready(function() {

if(tpj('#rev_slider_9_1').revolution == undefined)
revslider_showDoubleJqueryError('#rev_slider_9_1');
else
revapi9 = tpj('#rev_slider_9_1').show().revolution(
{
dottedOverlay:"twoxtwo",
delay:6000,
startwidth:1170,
startheight:700,
hideThumbs:200,

thumbWidth:100,
thumbHeight:50,
thumbAmount:4,


simplifyAll:"off",

navigationType:"bullet",
navigationArrows:"solo",
navigationStyle:"round",

touchenabled:"on",
onHoverStop:"off",
nextSlideOnWindowFocus:"off",

swipe_threshold: 0.7,
swipe_min_touches: 1,
drag_block_vertical: false,



keyboardNavigation:"off",

navigationHAlign:"right",
navigationVAlign:"bottom",
navigationHOffset:75,
navigationVOffset:45,

soloArrowLeftHalign:"left",
soloArrowLeftValign:"center",
soloArrowLeftHOffset:20,
soloArrowLeftVOffset:0,

soloArrowRightHalign:"right",
soloArrowRightValign:"center",
soloArrowRightHOffset:20,
soloArrowRightVOffset:0,

shadow:0,
fullWidth:"on",
fullScreen:"off",

spinner:"spinner0",

stopLoop:"off",
stopAfterLoops:-1,
stopAtSlide:-1,

shuffle:"off",

autoHeight:"off",
forceFullWidth:"on",



hideThumbsOnMobile:"off",
hideNavDelayOnMobile:1500,
hideBulletsOnMobile:"off",
hideArrowsOnMobile:"off",
hideThumbsUnderResolution:0,

hideSliderAtLimit:0,
hideCaptionAtLimit:601,
hideAllCaptionAtLilmit:0,
startWithSlide:0
});


}); /*ready*/


var setREVStartSize_third = function() {
var tpopt = new Object();
tpopt.startwidth = 1170;
tpopt.startheight = 700;
tpopt.container = jQuery('#rev_slider_10_1');
tpopt.fullScreen = "off";
tpopt.forceFullWidth="off";

tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize_third();


var tpj=jQuery;
tpj.noConflict();
var revapi10;

tpj(document).ready(function() {

if(tpj('#rev_slider_10_1').revolution == undefined)
revslider_showDoubleJqueryError('#rev_slider_10_1');
else
revapi10 = tpj('#rev_slider_10_1').show().revolution(
{
dottedOverlay:"twoxtwo",
delay:6000,
startwidth:1170,
startheight:700,
hideThumbs:200,

thumbWidth:100,
thumbHeight:50,
thumbAmount:3,


simplifyAll:"off",

navigationType:"bullet",
navigationArrows:"solo",
navigationStyle:"round",

touchenabled:"on",
onHoverStop:"off",
nextSlideOnWindowFocus:"off",

swipe_threshold: 0.7,
swipe_min_touches: 1,
drag_block_vertical: false,

parallax:"scroll",
parallaxBgFreeze:"off",
parallaxLevels:[5,10,15,20,25,30,35,40,45,50],
parallaxDisableOnMobile:"on",


keyboardNavigation:"off",

navigationHAlign:"right",
navigationVAlign:"bottom",
navigationHOffset:75,
navigationVOffset:45,

soloArrowLeftHalign:"left",
soloArrowLeftValign:"center",
soloArrowLeftHOffset:20,
soloArrowLeftVOffset:0,

soloArrowRightHalign:"right",
soloArrowRightValign:"center",
soloArrowRightHOffset:20,
soloArrowRightVOffset:0,

shadow:0,
fullWidth:"on",
fullScreen:"off",

spinner:"spinner0",

stopLoop:"off",
stopAfterLoops:-1,
stopAtSlide:-1,

shuffle:"off",

autoHeight:"off",
forceFullWidth:"off",



hideThumbsOnMobile:"off",
hideNavDelayOnMobile:1500,
hideBulletsOnMobile:"off",
hideArrowsOnMobile:"on",
hideThumbsUnderResolution:0,

hideSliderAtLimit:0,
hideCaptionAtLimit:601,
hideAllCaptionAtLilmit:0,
startWithSlide:0
});




}); /*ready*/





var setREVStartSize_fourth = function() {
var tpopt = new Object();
tpopt.startwidth = 1170;
tpopt.startheight = 600;
tpopt.container = jQuery('#rev_slider_11_1');
tpopt.fullScreen = "on";
tpopt.forceFullWidth="off";

tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize_fourth();


var tpj=jQuery;
tpj.noConflict();
var revapi11;

tpj(document).ready(function() {

if(tpj('#rev_slider_11_1').revolution == undefined)
revslider_showDoubleJqueryError('#rev_slider_11_1');
else
revapi11 = tpj('#rev_slider_11_1').show().revolution(
{
dottedOverlay:"twoxtwo",
delay:7000,
startwidth:1170,
startheight:600,
hideThumbs:200,

thumbWidth:100,
thumbHeight:50,
thumbAmount:5,


simplifyAll:"off",

navigationType:"bullet",
navigationArrows:"solo",
navigationStyle:"round",

touchenabled:"on",
onHoverStop:"off",
nextSlideOnWindowFocus:"off",

swipe_threshold: 0.7,
swipe_min_touches: 1,
drag_block_vertical: false,



keyboardNavigation:"on",

navigationHAlign:"right",
navigationVAlign:"bottom",
navigationHOffset:40,
navigationVOffset:100,

soloArrowLeftHalign:"left",
soloArrowLeftValign:"center",
soloArrowLeftHOffset:20,
soloArrowLeftVOffset:0,

soloArrowRightHalign:"right",
soloArrowRightValign:"center",
soloArrowRightHOffset:20,
soloArrowRightVOffset:0,

shadow:0,
fullWidth:"off",
fullScreen:"on",

spinner:"spinner0",

stopLoop:"off",
stopAfterLoops:-1,
stopAtSlide:-1,

shuffle:"off",


forceFullWidth:"off",
fullScreenAlignForce:"off",
minFullScreenHeight:"400",

hideThumbsOnMobile:"off",
hideNavDelayOnMobile:1500,
hideBulletsOnMobile:"off",
hideArrowsOnMobile:"off",
hideThumbsUnderResolution:0,

fullScreenOffsetContainer: "#ABdev_main_header #wpadminbar",
fullScreenOffset: "",
hideSliderAtLimit:0,
hideCaptionAtLimit:601,
hideAllCaptionAtLilmit:0,
startWithSlide:0
});




}); /*ready*/



var setREVStartSize_fifth = function() {
var tpopt = new Object();
tpopt.startwidth = 570;
tpopt.startheight = 338;
tpopt.container = jQuery('#rev_slider_2_1');
tpopt.fullScreen = "off";
tpopt.forceFullWidth="off";

tpopt.container.closest(".rev_slider_wrapper").css({height:tpopt.container.height()});tpopt.width=parseInt(tpopt.container.width(),0);tpopt.height=parseInt(tpopt.container.height(),0);tpopt.bw=tpopt.width/tpopt.startwidth;tpopt.bh=tpopt.height/tpopt.startheight;if(tpopt.bh>tpopt.bw)tpopt.bh=tpopt.bw;if(tpopt.bh<tpopt.bw)tpopt.bw=tpopt.bh;if(tpopt.bw<tpopt.bh)tpopt.bh=tpopt.bw;if(tpopt.bh>1){tpopt.bw=1;tpopt.bh=1}if(tpopt.bw>1){tpopt.bw=1;tpopt.bh=1}tpopt.height=Math.round(tpopt.startheight*(tpopt.width/tpopt.startwidth));if(tpopt.height>tpopt.startheight&&tpopt.autoHeight!="on")tpopt.height=tpopt.startheight;if(tpopt.fullScreen=="on"){tpopt.height=tpopt.bw*tpopt.startheight;var cow=tpopt.container.parent().width();var coh=jQuery(window).height();if(tpopt.fullScreenOffsetContainer!=undefined){try{var offcontainers=tpopt.fullScreenOffsetContainer.split(",");jQuery.each(offcontainers,function(e,t){coh=coh-jQuery(t).outerHeight(true);if(coh<tpopt.minFullScreenHeight)coh=tpopt.minFullScreenHeight})}catch(e){}}tpopt.container.parent().height(coh);tpopt.container.height(coh);tpopt.container.closest(".rev_slider_wrapper").height(coh);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(coh);tpopt.container.css({height:"100%"});tpopt.height=coh;}else{tpopt.container.height(tpopt.height);tpopt.container.closest(".rev_slider_wrapper").height(tpopt.height);tpopt.container.closest(".forcefullwidth_wrapper_tp_banner").find(".tp-fullwidth-forcer").height(tpopt.height);}
};

/* CALL PLACEHOLDER */
setREVStartSize_fifth();


var tpj=jQuery;
tpj.noConflict();
var revapi2;

tpj(document).ready(function() {

if(tpj('#rev_slider_2_1').revolution == undefined)
revslider_showDoubleJqueryError('#rev_slider_2_1');
else
revapi2 = tpj('#rev_slider_2_1').show().revolution(
{
dottedOverlay:"none",
delay:9000,
startwidth:570,
startheight:338,
hideThumbs:200,

thumbWidth:100,
thumbHeight:50,
thumbAmount:1,


simplifyAll:"off",

navigationType:"none",
navigationArrows:"solo",
navigationStyle:"round",

touchenabled:"on",
onHoverStop:"on",
nextSlideOnWindowFocus:"off",

swipe_threshold: 0.7,
swipe_min_touches: 1,
drag_block_vertical: false,



keyboardNavigation:"off",

navigationHAlign:"center",
navigationVAlign:"bottom",
navigationHOffset:0,
navigationVOffset:20,

soloArrowLeftHalign:"left",
soloArrowLeftValign:"center",
soloArrowLeftHOffset:20,
soloArrowLeftVOffset:20,

soloArrowRightHalign:"right",
soloArrowRightValign:"center",
soloArrowRightHOffset:20,
soloArrowRightVOffset:20,

shadow:0,
fullWidth:"on",
fullScreen:"off",

spinner:"spinner0",

stopLoop:"off",
stopAfterLoops:-1,
stopAtSlide:-1,

shuffle:"off",

autoHeight:"off",
forceFullWidth:"off",


hideTimerBar:"on",
hideThumbsOnMobile:"off",
hideNavDelayOnMobile:1500,
hideBulletsOnMobile:"off",
hideArrowsOnMobile:"off",
hideThumbsUnderResolution:0,

hideSliderAtLimit:0,
hideCaptionAtLimit:0,
hideAllCaptionAtLilmit:0,
startWithSlide:0                    });




}); /*ready*/


/**
 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
 *
 * jQuery.browser.mobile will be true if the browser is a mobile device
 *
 **/
(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);


