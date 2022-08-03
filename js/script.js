/*global $, document, window, setTimeout*/

// VARIABLES
var Nav                 = $("header nav"),
    menuButton          = $("header nav .navigation .nav-menu-button"),
    firstLine           = $("header nav .navigation .nav-menu-button span:first-of-type"),
    lastLine            = $("header nav .navigation .nav-menu-button span:last-of-type"),
    navMenuContainer    = $("header nav .navigation .nav-menu-container"),
    menuLinks           = $("header nav .navigation .nav-menu li a"),
    portfolioItems      = $(".portfolio .portfolio-items .item"),
    portfolioContent    = $(".portfolio .portfolio-content .portfolio-items"),
    testimonialsSlider  = $('.testimonials .testimonials-content .slider'),
    ScrollToTop         = $("#Scroll-To-Top"),
    Html                = $("html"),
    Body                = $("body"),
    htmlBody            = $("html, body"),
    $document           = $(document),
    $window             = $(window),
    ScrollTopPlusVal    = 0,
    sliderDirection;

// Sliders Direction Based on Page Direction
if (Html.attr("dir") === "ltr") {
    
    sliderDirection  = false;
    
} else if (Html.attr("dir") === "rtl") {
    
    sliderDirection  = true;
    
}

$(function () {
    
    "use strict";
    
    // Nav Fixed on Scroll
    if ($window.scrollTop() > 0) {
        Nav.addClass("fixed");
    } else {
        Nav.removeClass("fixed");
    }
    
    $window.on("scroll", function () {
        if ($window.scrollTop() > 0) {
            Nav.addClass("fixed");
        } else {
            Nav.removeClass("fixed");
        }
    });
    
    // Scroll to Top Button
    function scrolltopbtn() {
        if (Html.attr("dir") === "ltr") {
            
            if ($window.scrollTop() >= 600) {
                ScrollToTop.css("right", 20 + ScrollTopPlusVal);
            } else {
                ScrollToTop.css("right", "-40px");
            }
            
        } else if (Html.attr("dir") === "rtl") {
            
            if ($window.scrollTop() >= 600) {
                ScrollToTop.css("left", 20 + ScrollTopPlusVal);
            } else {
                ScrollToTop.css("left", "-40px");
            }
            
        }
    }
    
    scrolltopbtn();
    
    $window.on("scroll", function () {
        scrolltopbtn();
    });
    
    ScrollToTop.on("click", function () {
        Body.animate({
            marginRight: "",
            marginLeft: ""
        }, 0);
        htmlBody.animate({
            scrollTop: 0
        }, 600);
    });
    
    // Show and Hide Menu
    $document.on('click', function (e) {
        
        if ($(e.target).closest($("header nav .navigation .nav-menu-button:not(.button-when-menu-is-open)")).length) {
            
            menuButton.addClass("button-when-menu-is-open");
            
            firstLine.addClass("first-line-when-menu-is-open");
            lastLine.addClass("last-line-when-menu-is-open");
            
            ScrollTopPlusVal = navMenuContainer.outerWidth();
            scrolltopbtn();
            
            if (Html.attr("dir") === "ltr") {
                
                navMenuContainer.animate({
                    right: 0
                }, 0).css("boxShadow", "-2px 0px 10px 0px rgba(0, 0, 0, 0.2)");
                Body.animate({
                    marginRight: navMenuContainer.outerWidth(),
                    marginLeft: "-" + navMenuContainer.outerWidth()
                }, 0);
                Nav.animate({
                    right: navMenuContainer.outerWidth(),
                    left: "-" + navMenuContainer.outerWidth()
                }, 0);
                
            } else if (Html.attr("dir") === "rtl") {
                
                navMenuContainer.animate({
                    left: 0
                }, 0).css("boxShadow", "2px 0px 10px 0px rgba(0, 0, 0, 0.2)");
                Body.animate({
                    marginLeft: navMenuContainer.outerWidth(),
                    marginRight: "-" + navMenuContainer.outerWidth()
                }, 0);
                Nav.animate({
                    left: navMenuContainer.outerWidth(),
                    right: "-" + navMenuContainer.outerWidth()
                }, 0);
                
            }
            
        } else if ($(e.target).closest($("header nav .navigation .button-when-menu-is-open")).length) {
            
            menuButton.removeClass("button-when-menu-is-open");
            
            firstLine.removeClass("first-line-when-menu-is-open");
            lastLine.removeClass("last-line-when-menu-is-open");
            
            ScrollTopPlusVal = 0;
            scrolltopbtn();
            
            if (Html.attr("dir") === "ltr") {
                
                navMenuContainer.animate({
                    right: "-" + navMenuContainer.outerWidth()
                }, 0).css("boxShadow", "");
                
            } else if (Html.attr("dir") === "rtl") {
                
                navMenuContainer.animate({
                    left: "-" + navMenuContainer.outerWidth()
                }, 0).css("boxShadow", "");
                
            }
            
            Body.animate({
                marginRight: "",
                marginLeft: ""
            }, 0);
            Nav.animate({
                right: "",
                left: ""
            }, 0);
            
        } else if (!$(e.target).closest(navMenuContainer).length) {
            
            $("header nav .navigation .button-when-menu-is-open").click();
            
        }
        
    });
    
    // Smooth Scroll
    if (menuLinks.attr("data-value")) {
        
        menuLinks.on("click", function (e) {
            
            e.preventDefault();
            
            htmlBody.animate({
                scrollTop: $($(this).data('value')).offset().top
            }, 600);
            
        });
        
    }
    
    // Add Class Active to Menu Links on Scrolling
    $window.on('scroll', function () {
        
        var cur_pos = $(this).scrollTop();
        
        $("body > .section").each(function () {
            
            var top     = $(this).offset().top - 100,
                bottom  = top + $(this).outerHeight();
            
            if (cur_pos >= top && cur_pos <= bottom) {
                
                $('header .nav-menu-container .nav-menu li a[data-value="#' + $(this).attr('id') + '"]').addClass("active").parent("li").siblings("li").children("a").removeClass("active");
                
            }
            
        });
        
    });
    
    // Fire Magnific Popup Plugin in About us Section
    if ($('.about').length) {
        $(".about .section-content .about-video").magnificPopup({
            delegate: 'a',
            type: 'iframe'
        });
        
        $(".about .section-content .section-text .video-play-button a").on("click", function () {
            $(".about .section-content .about-video a").click();
        });
    }
    
    // Image Pan Effect on Hover in Portfolio Section
    portfolioItems.on('mousemove', function (e) {
        $(this).find('img').css({
            transformOrigin: ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 + '%'
        });
    });
    
    // Fire Magnific Popup Plugin in Portfolio Section
    if ($('.portfolio').length) {
        portfolioItems.each(function () {
            
            if (!$(this).attr('href') || $(this).attr('href') === '#') {
                
                $(this).attr('href', $(this).children("img").attr('src'));
                
            }
            
        });
        
        portfolioContent.magnificPopup({
            delegate: '.item:not(.hidden)',
            type: 'image',
            gallery: {
                enabled: true
            },
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        });
    }
    
    // Tilt Plugin in Team Section
    if ($('.team').length) {
        
        $('.team .team-content .team-member').tilt({
            maxTilt: 10,
            speed: 500
        });
        
        // Fire Direction Aware Hover Plugin in Team Section
        $('.team .team-content .team-member').hoverdir();
        
    }
    
    if ($('.testimonials').length || $('.clients').length) {
        
        // Fire Owl Carousel Slider Plugin in Testimonials Section
        testimonialsSlider.owlCarousel({
            loop: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 6000,
            autoplaySpeed: 600,
            dragEndSpeed: 600,
            dotsSpeed: 600,
            rtl: sliderDirection,
            responsive: {
                0: {
                    center: false,
                    autoWidth: false,
                    items: 1
                },
                768: {
                    center: true,
                    autoWidth: true,
                    items: 3
                }
            }
        });
        
        // Fire Owl Carousel Slider Plugin in Clients Section
        $('.clients .clients-content').owlCarousel({
            loop: true,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 6000,
            autoplaySpeed: 600,
            dragEndSpeed: 600,
            dots: false,
            rtl: sliderDirection,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
        
    }
    
    // Nice Scroll Plugin
    Html.niceScroll({
        cursorcolor: $("footer").css("backgroundColor"),
        background: "#ffffff",
        cursorborder: "none",
        cursorwidth: "4px",
        cursorborderradius: "3px",
        cursorminheight: 130,
        hidecursordelay: 1000,
        boxzoom: true,
        horizrailenabled: false,
        zindex: "5000"
    });

    // Fix NiceScroll Plugin After Loading
    $window.on("scroll", function () {
        Html.getNiceScroll().resize();
    });
    
});

$window.on("load", function () {
    
    "use strict";
    
    // Preloader
    $(".preloader").delay(400).fadeOut(600, function () {
        $(this).remove();
    });
    
    // Filtering Portfolio
    $(".portfolio .portfolio-content ul.work-cat li").on("click", function () {
        $(this).addClass("active").siblings("li").removeClass("active");
    });
    
    $(".portfolio .portfolio-content ul.work-cat li:first-of-type").on("click", function () {
        portfolioItems.removeClass("hidden").hide(0).show(0);
    });
    
    $(".portfolio .portfolio-content ul.work-cat li:not(:first-of-type)").on("click", function () {
        portfolioItems.hide(0).addClass("hidden");
        $('.' + $(this).data('value')).removeClass("hidden").show(0);
    });
    
    // Height of Testimonials Slider Paragraph
    var testimonialsP   = $('.testimonials .testimonials-content .slider .item p'),
        maxHeight       = -1,
        paragraphHeight = function () {
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
            $(this).height(maxHeight);
        };
    
    setTimeout(function () {
        testimonialsP.each(paragraphHeight);
    }, 300);
    
    testimonialsSlider.on("afterChange", function () {
        testimonialsP.each(paragraphHeight);
    });
    
});