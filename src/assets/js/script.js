/*
Author       : Dreamguys
Template Name: Listee - Bootstrap Template
Version      : 1.0
*/

(function($) {
	"use strict";
	
	var $slimScrolls = $('.slimscroll');
	var $wrapper = $('.main-wrapper');
	
	// Sidebar
	
	if($(window).width() <= 991) {
		var Sidemenu = function() {
			this.$menuItem = $('.main-nav a');
		};

		function init() {
			var $this = Sidemenu;
			$('.main-nav a').on('click', function(e) {
				if($(this).parent().hasClass('has-submenu')) {
					e.preventDefault();
				}
				if(!$(this).hasClass('submenu')) {
					$('ul', $(this).parents('ul:first')).slideUp(350);
					$('a', $(this).parents('ul:first')).removeClass('submenu');
					$(this).next('ul').slideDown(350);
					$(this).addClass('submenu');
				} else if($(this).hasClass('submenu')) {
					$(this).removeClass('submenu');
					$(this).next('ul').slideUp(350);
				}
			});
		}

	// Sidebar Initiate
	
	init();
	}

	// Sticky Header
	
	$(window).scroll(function(){
	  var sticky = $('.header'),
	      scroll = $(window).scrollTop();
	  if (scroll >= 50) sticky.addClass('fixed');
	  else sticky.removeClass('fixed');
	});

	// Mobile menu sidebar overlay
	
	$('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function() {
		$('main-wrapper').toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});	
	
	$(document).on('click', '.sidebar-overlay', function() {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});
	
	$(document).on('click', '#menu_close', function() {
		$('html').removeClass('menu-opened');
		$('.sidebar-overlay').removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});

	// Select 2
	
	if ($('.select').length > 0) {
		$('.select').select2({
			minimumResultsForSearch: -1,
			width: '100%'
		});
	}
	
	if ($('.category-select').length > 0) {
		$(".category-select").select2({
			placeholder: "Choose Category",
			allowClear: false
		});
	}
	
	if ($('.loc-select').length > 0) {
		$(".loc-select").select2({
			placeholder: "Choose Location",
			allowClear: false
		});
	}
	
	if ($('.region select').length > 0) {
		$(".region select").select2({
			placeholder: "Region",
			allowClear: false
		});
	}
		
	// Fade in Scroll 
	
	if($('.main-wrapper .aos').length>0){
		AOS.init({
			duration:1200,
			once:true
		});
	}
	
	// Datetimepicker Date
	
	if($('.datetimepicker').length > 0 ){
		$('.datetimepicker').datetimepicker({			
			format: 'DD-MM-YYYY',
			icons: {
				up: "fas fa-angle-up",
				down: "fas fa-angle-down",
				next: 'fas fa-angle-right',
				previous: 'fas fa-angle-left'
			}
		});
	}
	
	// Scroll Down
	
	if($('.price-down').length>0){
		$('.price-down').on('click', function() {
			$('html, body').animate({ scrollTop: $("#price").offset().top - 85}, 150); 
		});
	}
	
	// Featured Slider
	
	if($('.owl-carousel.featured-slider').length > 0) {
		$('.owl-carousel.featured-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:true,
			dots:false,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			navContainer: '.mynav2',
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:2
				},
				700:{
					items:3
				},
				1000:{
					items:4
				}
			}
		})
	}
	
	// Testimonial Slider
	
	if($('.owl-carousel.testi-slider').length > 0) {
		$('.owl-carousel.testi-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:true,
			dots: false,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			navContainer: '.mynav1',
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:1
				},
				700:{
					items:2
				},
				1000:{
					items:2
				}
			}
		})
	}
	
	//Partners Slider
	
	if($('.owl-carousel.partnerslist').length > 0) {
		$('.owl-carousel.partnerslist').owlCarousel({
			loop:true,
			margin:24,
			nav:true,
			autoplay:true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			navContainer: '.mynav',
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:2
				},
				700:{
					items:4
				},
				1000:{
					items:6
				}
			}
		})
	}
	
	//Search Slider
	
	if($('.owl-carousel.search-slider').length > 0) {
		$('.owl-carousel.search-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			autoplay:true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:2
				},
				700:{
					items:3
				},
				1000:{
					items:4
				}
			}
		})
	}
	
	//Blog Slider
	
	if($('.owl-carousel.blog-slider').length > 0) {
		$('.owl-carousel.blog-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:2
				},
				800:{
					items:3
				},
				1000:{
					items:3
				}
			}
		})
	}
	
	//Feedback Slider
	
	if($('.owl-carousel.feedback-slider').length > 0) {
		$('.owl-carousel.feedback-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:2
				},
				900:{
					items:3
				},
				1000:{
					items:3
				}
			}
		})
	}
	
	//Venue Slider
	
	if($('.owl-carousel.venue-slider').length > 0) {
		$('.owl-carousel.venue-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:2
				},
				700:{
					items:2
				},
				1000:{
					items:3
				}
			}
		})
	}
	
	//Celebeate Slider
	
	if($('.owl-carousel.celebrate-slider').length > 0) {
		$('.owl-carousel.celebrate-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:1
				},
			}
		})
	}
	
	//Portfolio Slider
	
	if($('.owl-carousel.portfolio-slider').length > 0) {
		$('.owl-carousel.portfolio-slider').owlCarousel({
			loop:true,
			margin:24,
			nav:false,
			dots: true,
			smartSpeed: 2000,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsive:{
				0:{
					items:1
				},
				
				550:{
					items:1
				},
			}
		})
	}
	
	// Testimonial Slider
	
	if($('.destination-slider').length > 0 ){
		$('.destination-slider').owlCarousel({
			items:4,
			margin:24,
			nav:false,
			dots:true,
			rtl: false,
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1170:{
					items:4 ,
					loop:true
				}
			}
		});	
	}
	
	// Recommended Slider 
	
	if($('.recommended-slider').length > 0 ){
		$('.recommended-slider').owlCarousel({
			items:4,
			margin:24,
			nav:false,
			dots:true,
			rtl: false,
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1170:{
					items:4 ,
					loop:true
				}
			}
		});	
	}	
	
	// Feedback Slider 
	
	if($('.testim-slider').length > 0 ){
		$('.testim-slider').owlCarousel({
			items:3,
			margin:24,
			nav:false,
			dots:true,
			rtl: false,
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:2
				},
				1170:{
					items:3 ,
					loop:true
				}
			}
		});	
	}	
	
	// Category Slider 
	
	if($('.cat-slider').length > 0 ){
		$('.cat-slider').owlCarousel({
			items:6,
			margin:24,
			nav:true,
			dots:false,
			rtl: false,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			navContainer: '.mynav3',
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:3
				},
				1170:{
					items:4 ,
					loop:true
				},
				1200:{
					items:5 ,
					loop:true
				},
				1400:{
					items:6 ,
					loop:true
				}
			}
		});	
	}	
	
	// Category Slider 
	
	if($('.business-slider').length > 0 ){
		$('.business-slider').owlCarousel({
			items:4,
			margin:24,
			nav:true,
			dots:false,
			rtl: false,
			navText : ["<i class='fa-solid fa-angle-left'></i>","<i class='fa-solid fa-angle-right'></i>"],
			responsiveClass:true,
			responsive:{
				0:{
					items:1
				},
				768:{
					items:3
				},
				1170:{
					items:3 ,
					loop:true
				},
				1200:{
					items:4 ,
					loop:true
				}
			}
		});	
	}	
	
	// Select Favourite
	
	$('.fav-icon').on('click', function() {
		$(this).toggleClass('selected');
	});
	
	// For Testimonial Positioning
	
	var window_width = $(window).outerWidth();
    var container_width = $('.container').outerWidth();
    var full_width = window_width - container_width
    var right_position_value = full_width / 2
    $('.testimonials-section .testimonial-heading  ').css('left', right_position_value);	
	
	//Stick Sidebar
	
	if ($(window).width() > 767) {
		if($('.theiaStickySidebar').length > 0) {
			$('.theiaStickySidebar').theiaStickySidebar({
			  // Settings
			  additionalMarginTop: 30
			});
		}
	}
	
    //Range Slider
	
	if($('.input-range').length > 0) {
		$(".input-range").ionRangeSlider({
			type: "single",
			grid: true,
			min: 0,
			max: 100,
			from: 50,
			to: 100       
		});
	}
	
	$('.input-range').on('input', function () {
        $('.demo span').html(this.value);
    });
	
	//Show Filter
	
	$(".btn.filterbtn").on('click', function() {
		  $(".showfilter").toggleClass("filter-open");
	});		
	
	// Password eye
	
	if($('.toggle-password').length > 0) {
		$(document).on('click', '.toggle-password', function() {
			$(this).toggleClass("feather-eye feather-eye-off");
			var input = $(".pass-input");
			if (input.attr("type") == "password") {
				input.attr("type", "text");
			} else {
				input.attr("type", "password");
			}
		});
	}	
	
	//Image Upload
	
	 $('.image-upload').change(function(){
        $(".settings-upload-img").html('');
        for (var i = 0; i < $(this)[0].files.length; i++) {
            $(".settings-upload-img").append('<img src="'+window.URL.createObjectURL(this.files[i])+'">');
        }
    });	
	
	//Media Image Upload
	
	 $('.media-section .featured-img1 .image-upload').change(function(){
        $(".featured-img1 .media-image").html('');
        for (var i = 0; i < $(this)[0].files.length; i++) {
            $(".media-section .featured-img1 .media-image").append('<img src="'+window.URL.createObjectURL(this.files[i])+'">');
        }
    });	
	
	$('.media-section .featured-img2 .image-upload').change(function(){
        $(".featured-img2 .media-image").html('');
        for (var i = 0; i < $(this)[0].files.length; i++) {
            $(".media-section .featured-img2 .media-image").append('<img src="'+window.URL.createObjectURL(this.files[i])+'">');
        }
    });		
	
	//Messages
	
	var chatAppTarget = $('.chat-window');
    (function() {
        if ($(window).width() > 991)
            chatAppTarget.removeClass('chat-slide');
        
        $(document).on("click",".chat-window .chat-users-list a.media",function () {
            if ($(window).width() <= 991) {
                chatAppTarget.addClass('chat-slide');
            }
            return false;
        });
        $(document).on("click","#back_user_list",function () {
            if ($(window).width() <= 991) {
                chatAppTarget.removeClass('chat-slide');
            }    
            return false;
        });
    })();
	
	//Datatable
	
	if($('#listdata-table').length > 0) {		
		$('#listdata-table').dataTable( { 
		    "autoWidth": false,
			 "columns": [
				{ "width": "135" },
				null,
				null,
				null,
				null
			],		
			searching: false,
			paging: false, 
			info: false
		} );
	}	
	
})(jQuery);



	