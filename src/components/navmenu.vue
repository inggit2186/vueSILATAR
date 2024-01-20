<template>
    <div class="main-menu-wrapper">
        <div class="menu-header">
            <router-link to="/" class="menu-logo">
                <img src="../assets/img/logo.png" class="img-fluid" alt="Logo">
            </router-link>
            <a id="menu_close" class="menu-close" href="javascript:void(0);"> <i class="fas fa-times"></i></a>
        </div>
        <ul class="navbar-nav main-nav my-2 my-lg-0">
            <li class="has-submenu megamenu active"
            :class="{'active': currentPath == 'index' || currentPath == '/index-2' || currentPath == '/index-3' || currentPath == '/index-4' }">
                <router-link to="/"><i-fluent-home-person-24-filled /> &nbsp;Home</router-link>
            </li>
            <li :class="{'active': currentPath == 'satuanKerja/getSeksi'}">
                <router-link to="/satuanKerja/getSeksi"><i-vaadin-office /> &nbsp;Satuan Kerja</router-link>
            </li>
            <!--
            <li class="has-submenu" :class=" ListingsMenu ? 'active' : 'notactive'">
                <a href="javascrip:void(0)">Listings <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu" >
                    <li :class="currentPath == 'listing-grid' ? 'active' : 'notactive'"><router-link to="/listing-grid">Listing Grid</router-link></li>
                    <li :class="currentPath == 'listing-grid-sidebar' ? 'active' : 'notactive'"><router-link to="/listing-grid-sidebar">Listing Grid Sidebar</router-link></li>
                    <li :class="currentPath == 'listing-list-sidebar' ? 'active' : 'notactive'"><router-link to="/listing-list-sidebar">Listing List Sidebar</router-link></li>
                    <li :class="currentPath == 'listingmap-list' ? 'active' : 'notactive'"><router-link to="/listingmap-list">Listing List Map</router-link></li>
                    <li :class="currentPath == 'listingmap-grid' ? 'active' : 'notactive'"><router-link to="/listingmap-grid">Listing Grid Map</router-link></li>
                </ul>
            </li>
            <li class="has-submenu" :class=" PagesMenu ? 'active' : 'notactive'">
                <router-link to="">Pages <i class="fas fa-chevron-down"></i></router-link>
                <ul class="submenu">
                    <li class="active" :class="currentPath == 'about' ? 'active' : 'notactive'"><router-link to="/about">About Us</router-link></li>
                    <li :class="currentPath == 'service-details' ? 'active' : 'notactive'"><router-link to="/service-details">Service Details </router-link></li>
                    <li :class="currentPath == 'pricing' ? 'active' : 'notactive'"><router-link to="/pricing">Pricing</router-link></li>
                    <li :class="currentPath == 'faq' ? 'active' : 'notactive'"><router-link to="/faq">FAQ</router-link></li>
                    <li :class="currentPath == 'gallery' ? 'active' : 'notactive'"><router-link to="/gallery">Gallery</router-link></li>
                    <li :class="currentPath == 'categories' ? 'active' : 'notactive'"><router-link to="/categories">Category</router-link></li>
                    <li :class="currentPath == 'howitworks' ? 'active' : 'notactive'"><router-link to="/howitworks">How it Works</router-link></li>
                    <li :class="currentPath == 'terms-condition' ? 'active' : 'notactive'"><router-link to="/terms-condition">Terms & Conditions</router-link></li>
                    <li :class="currentPath == 'privacy-policy' ? 'active' : 'notactive'"><router-link to="/privacy-policy">Privacy Policy</router-link></li>
                    <li :class="currentPath == 'error-404' ? 'active' : 'notactive'"><router-link to="/error-404">404 Error</router-link></li>
                    <li :class="currentPath == 'error-500' ? 'active' : 'notactive'"><router-link to="/error-500">500 Error</router-link></li>
                </ul>
            </li>
            <li class="has-submenu" :class=" UserMenu ? 'active' : 'notactive'">
                <a href="javascript:void()">User Pages <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu">
                    <li :class="currentPath == 'dashboard' ? 'active' : 'notactive'"><router-link to="dashboard">Dashboard</router-link></li>
                    <li :class="currentPath == 'profile' ? 'active' : 'notactive'"><router-link to="profile">Profile</router-link></li>
                    <li :class="currentPath == 'my-listing' ? 'active' : 'notactive'"><router-link to="my-listing">My Listing</router-link></li>
                    <li :class="currentPath == 'bookmarks' ? 'active' : 'notactive'"><router-link to="bookmarks">Bookmarks</router-link></li>
                    <li :class="currentPath == 'messages' ? 'active' : 'notactive'"><router-link to="messages">Messages</router-link></li>
                    <li :class="currentPath == 'reviews' ? 'active' : 'notactive'"><router-link to="reviews">Reviews</router-link></li>
                    <li :class="currentPath == 'add-listing' ? 'active' : 'notactive'"><router-link to="add-listing">Add Listing</router-link></li>
                </ul>
            </li>
            <li class="has-submenu" :class=" BlogMenu ? 'active' : 'notactive'">
                <a href="javascript:void()">Blog <i class="fas fa-chevron-down"></i></a>
                <ul class="submenu">
                    <li :class="currentPath == 'blog-list' ? 'active' : 'notactive'"><router-link to="/blog-list">Blog List</router-link></li>
                    <li :class="currentPath == 'blog-grid' ? 'active' : 'notactive'"><router-link to="/blog-grid">Blog Grid</router-link></li>
                    <li :class="currentPath == 'blog-details' ? 'active' : 'notactive'"><router-link to="/blog-details">Blog Details</router-link></li>
                    <li :class="currentPath == 'blog-list-sidebar' ? 'active' : 'notactive'"><router-link to="/blog-list-sidebar">Blog List Sidebar</router-link></li>
                    <li :class="currentPath == 'blog-grid-sidebar' ? 'active' : 'notactive'"><router-link to="/blog-grid-sidebar">Blog Grid Sidebar</router-link></li>
                </ul>
            </li>
            -->
            <li :class="{'active': currentPath == 'contact'}">
                <router-link to="/contact"><i-gg-phone /> &nbsp;Kontak Kami</router-link>
            </li>
            <li :class="{'active': currentPath == 'UnitKerja'}">
                <router-link to="/UnitKerja"><BBadge variant="warning" style="font-size: medium;"><i-ri-customer-service-2-fill /> &nbsp;Pelayanan</BBadge></router-link>
            </li>
            <li v-if="auth && user.dept.kategori == 'kantor'" :class="{'active': currentPath == 'Admin Panel'}" class="d-block d-sm-none">
                <router-link to="/admin"><BBadge variant="danger" style="font-size: medium;"><i-wpf-administrator /> &nbsp;Admin Panel</BBadge></router-link>
            </li>
            <li v-if="auth && user.dept.kategori == 'kantor'" :class="{'active': currentPath == 'Profile'}" class="d-block d-sm-none">
                <router-link to="/dashboard"><BBadge variant="success" style="font-size: medium;"><i class="feather-grid"></i> &nbsp;Profil</BBadge></router-link>
            </li>
            <li v-if="!auth" class="d-block d-sm-none" style="padding:5% 5% 5% 5%;">
                <lu><router-link to="/login"><BBadge variant="danger" style="font-size: medium;float: left;"><i-solar-login-3-bold /> &nbsp;LOGIN</BBadge></router-link></lu>
                <lu><router-link to="/signup"><BBadge variant="dark" style="font-size: medium;float: right"><i-mdi-register /> &nbsp;DAFTAR</BBadge></router-link></lu>
            </li>
        </ul>
    </div>
    <div class="d-flex align-items-center block-e">
        <div v-if="!auth" class="cta-btn">
            <router-link to="/login" class="btn">LOGIN  / </router-link>
            <router-link to="/signup" class="btn ms-1">  DAFTAR</router-link>
        </div>
        <div v-else class="nav header-navbar-rht">
            <!--
            <li v-if="user.dept.kategori == 'kantor'" class="nav-item">
                <router-link class="nav-link header-login add-listing" to="/UnitKerja"><i-wpf-administrator /> &nbsp;Admin</router-link>
            </li>
            -->
            <li class="nav-item dropdown has-arrow logged-item" :disabled="loading">
                <a v-if="!loading" href="#" class="dropdown-toggle profile-userlink" data-bs-toggle="dropdown" aria-expanded="false">
                    <img :src="pp" alt="">
                    <span>{{user.name}}</span>
                </a>
                <span v-else><i-svg-spinners-bars-scale-middle />  Good Bye...</span>
                <div class="dropdown-menu dropdown-menu-end">
                    <router-link v-if="user.dept.kategori == 'kantor'" class="dropdown-item" to="/admin" style="background-color: gray;color: aliceblue;"><i-wpf-administrator />&nbsp; Admin Panel</router-link>
                    <b-button class="dropdown-item" @click="personalFile()" style="background-color: seagreen;color: aliceblue;"><i-fluent-folder-16-filled />&nbsp; Personal File</b-button>
                    <router-link class="dropdown-item" to="/dashboard"><i class="feather-grid"></i>&nbsp; Dashboard</router-link>
                    <router-link class="dropdown-item" to="/profile"><i class="fa-solid fa-user"></i>&nbsp; Profile Settings</router-link>
                    <router-link class="dropdown-item" to="/my-listing"><i class="feather-list"></i>&nbsp; My Request</router-link>
                    <router-link class="dropdown-item" to="/user-appointment"><i-icon-park-solid-appointment />&nbsp; Appointment</router-link>
                    <b-button class="dropdown-item" @click="logout()">
                        <span><i class="fas fa-light fa-circle-arrow-left"></i>&nbsp; Logout</span>
                    </b-button>
                </div>
            </li>						
        </div>
    </div>
</template>

<script>
export default {
    data() {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            const pp = import.meta.env.VITE_APP_ST_URL+'/'+user.noid+'/'+user.pp
            
            return {
                user: user || {},
                pp: pp || '../assets/img/profile-img.jpg',
                auth: true,
                loading: false
            };
        }else{
            return {auth: false};
        }
    },
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
                return this.$route.name == 'admin' || this.$route.name == 'dashboard' || this.$route.name == 'profile' || this.$route.name == 'my-listing' || this.$route.name == 'user-appointment' || this.$route.name == 'bookmarks' || this.$route.name == 'messages' || this.$route.name == 'reviews' || this.$route.name == 'add-listing';
            },
            BlogMenu() {
                return this.$route.name == 'blog-list' || this.$route.name == 'blog-grid' || this.$route.name == 'blog-details' || this.$route.name == 'blog-list-sidebar' || this.$route.name == 'blog-grid-sidebar';
            }
        },
        mounted() {
            let lastroute = this.$router.options.history.state.back

            if(this.$route.path != lastroute){
                $('html').removeClass('menu-opened');
                $('.sidebar-overlay').removeClass('opened');
                $('main-wrapper').removeClass('slide-nav');
            }
            
            $(window).scroll(function(){
                var sticky = $('.header'),
                scroll = $(window).scrollTop();
                    if (scroll >= 50) sticky.addClass('fixed');
                    else sticky.removeClass('fixed');
            });
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
        methods:{
            personalFile() {
                this.$swal.fire({
                    title: 'Under Construction!',
                    html: 'Mohon Maaf... Halaman Sedang dalam Perbaikan!',
                    icon: 'info',
                })
            },
            async logout() {
                try{
                    this.loading = true
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/logout', {}, { headers });
                   if(response.data.success == true){
                    localStorage.clear();
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/login');
                   }else{
                    localStorage.clear();
                    this.$router.push('/login');
                   }
                } catch (error) {
                    console.error(error.response.status);
                    if(error.response.status == 401){
                        localStorage.clear();
                        this.$router.push('/login');
                    }
                } finally {
                    this.loading = false;
                }
            },
        },
}
</script>