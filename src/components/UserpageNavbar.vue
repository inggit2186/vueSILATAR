<template>
    <header class="header header-three">
        <div class="container">
            <nav class="navbar navbar-expand-lg header-nav" 
                   >
                <div class="navbar-header">
                    <a id="mobile_btn" href="javascript:void(0);">
                        <span class="bar-icon">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <router-link to="/" class="navbar-brand logo">
                        <img src="../assets/img/logo.svg" class="img-fluid" alt="Logo">
                    </router-link>
                    <router-link to="/" class="navbar-brand logo-small">
							<img src="../assets/img/logo.png" class="img-fluid" alt="Logo">
                    </router-link>
                </div>
                <navmenu />
            </nav>
        </div>
</header>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
    mounted() {
        $('body').append('<div class="sidebar-overlay"></div>');
	$(document).on('click', '#mobile_btn', function () {
		$('main-wrapper').toggleClass('slide-nav');
		$('.sidebar-overlay').toggleClass('opened');
		$('html').addClass('menu-opened');
		return false;
	});

	$(document).on('click', '.sidebar-overlay', function () {
		$('html').removeClass('menu-opened');
		$(this).removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});

	$(document).on('click', '#menu_close', function () {
		$('html').removeClass('menu-opened');
		$('.sidebar-overlay').removeClass('opened');
		$('main-wrapper').removeClass('slide-nav');
	});
    },
}
</script>