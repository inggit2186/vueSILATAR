<template>
    <header class="header header-three">
        <div class="container">
            <nav class="navbar navbar-expand-lg header-nav">
                <div class="navbar-header">
                    <a id="mobile_btn" href="javascript:void(0);">
                        <span class="bar-icon d-none d-sm-block">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </a>
                    <router-link to="/" class="navbar-brand logo">
                        <img src="../assets/img/logo.png" style="width:200px" class="img-fluid" alt="Logo">
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
    computed:{
            currentPath() {
                return this.$route.name
            },
            ListingsMenu() {
            return this.$route.name == 'listing-grid' || this.$route.name == 'listing-grid-sidebar' || this.$route.name == 'listing-list-sidebar' || this.$route.name == 'listingmap-list'  || this.$route.name == 'listingmap-grid';
            },
            PagesMenu() {
                return this.$route.name == 'about' || this.$route.name == 'service-details' || this.$route.name == 'pricing' || this.$route.name == 'faq' || this.$route.name == 'gallery' || this.$route.name == 'categories'
                || this.$route.name == 'howitworks' || this.$route.name == 'terms-condition' || this.$route.name == 'privacy-policy' || this.$route.name == 'error-404' || this.$route.name == 'error-500';
            },
            UserMenu() {
                return this.$route.name == 'dashboard' || this.$route.name == 'profile' || this.$route.name == 'my-listing' || this.$route.name == 'user-appointment' ||this.$route.name == 'bookmarks' || this.$route.name == 'messages' || this.$route.name == 'reviews' || this.$route.name == 'add-listing';
            },
            BlogMenu() {
                return this.$route.name == 'blog-list' || this.$route.name == 'blog-grid' || this.$route.name == 'blog-details' || this.$route.name == 'blog-list-sidebar' || this.$route.name == 'blog-grid-sidebar';
            }
        },
        mounted() {
            this.setupHeaderBindings();
        },
        beforeUnmount() {
            this.teardownHeaderBindings();
        },
        methods: {
            setupHeaderBindings() {
                this.teardownHeaderBindings();

                this._onHeaderScroll = () => {
                    const sticky = $('.header')
                    const scroll = $(window).scrollTop()

                    if (scroll >= 50) sticky.addClass('fixed');
                    else sticky.removeClass('fixed');
                }

                this._onMobileBtnClick = () => {
                    $('.main-wrapper').toggleClass('slide-nav');
                    $('.sidebar-overlay').toggleClass('opened');
                    $('html').addClass('menu-opened');
                    return false;
                }

                this._onOverlayClick = function () {
                    $('html').removeClass('menu-opened');
                    $(this).removeClass('opened');
                    $('.main-wrapper').removeClass('slide-nav');
                }

                this._onMenuCloseClick = () => {
                    $('html').removeClass('menu-opened');
                    $('.sidebar-overlay').removeClass('opened');
                    $('.main-wrapper').removeClass('slide-nav');
                }

                $(window).on('scroll.navbarThree', this._onHeaderScroll);
                if (!$('.sidebar-overlay').length) {
                    $('body').append('<div class="sidebar-overlay"></div>');
                }
                $(document).on('click.navbarThree', '#mobile_btn', this._onMobileBtnClick);
                $(document).on('click.navbarThree', '.sidebar-overlay', this._onOverlayClick);
                $(document).on('click.navbarThree', '#menu_close', this._onMenuCloseClick);
            },
            teardownHeaderBindings() {
                $(window).off('scroll.navbarThree', this._onHeaderScroll);
                $(document).off('click.navbarThree', '#mobile_btn', this._onMobileBtnClick);
                $(document).off('click.navbarThree', '.sidebar-overlay', this._onOverlayClick);
                $(document).off('click.navbarThree', '#menu_close', this._onMenuCloseClick);
            },
        },
}
</script>
