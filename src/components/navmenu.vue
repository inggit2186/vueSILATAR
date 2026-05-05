<template>
    <div class="main-menu-wrapper d-flex justify-content-between align-items-center">
        <div class="menu-header">
            <router-link to="/" class="menu-logo">
                <img src="../assets/img/logo.png" class="img-fluid" alt="Logo">
            </router-link>
            <a id="menu_close" class="menu-close" href="javascript:void(0);"> <i class="fas fa-times"></i></a>
        </div>
        <ul class="navbar-nav main-nav my-2 my-lg-0 d-flex flex-row">
            <li
class="has-submenu megamenu active"
            :class="{'active': currentPath == 'index' || currentPath == '/index-2' || currentPath == '/index-3' || currentPath == '/index-4' }">
                <router-link to="/"><i-fluent-home-person-24-filled /> &nbsp;Home</router-link>
            </li>
            <li :class="{'active': currentPath == 'satuanKerja/getSeksi'}">
                <router-link to="/satuanKerja/getSeksi"><i-vaadin-office /> &nbsp;Satuan Kerja</router-link>
            </li>
            
            <li :class="{'active': currentPath == 'contact'}">
                <router-link to="/contact"><i-gg-phone /> &nbsp;Kontak Kami</router-link>
            </li>
            <li :class="{'active': currentPath == 'UnitKerja'}">
                <router-link to="/UnitKerja"><BBadge variant="warning" style="font-size: medium;"><i-ri-customer-service-2-fill /> &nbsp;Pelayanan</BBadge></router-link>
            </li>
            <li v-if="auth && user.dept.kategori == 'kantor'" :class="{'active': currentPath == 'Admin Panel'}" class="d-block d-sm-none">
                <router-link to="/admin"><BBadge variant="danger" style="font-size: medium;"><i-wpf-administrator /> &nbsp;Admin Panel</BBadge></router-link>
            </li>
            <li v-if="auth" :class="{'active': currentPath == 'Profile'}" class="d-block d-sm-none">
                <router-link to="/dashboard"><BBadge variant="success" style="font-size: medium;"><i class="feather-grid"></i> &nbsp;Profil</BBadge></router-link>
            </li>
            <li v-if="auth" :class="{'active': currentPath == 'Kinerja Harian'}" class="d-block d-sm-none">
                <router-link to="/kinerja-harian"><BBadge variant="success" style="font-size: medium;"><i-mdi-worker /> &nbsp;Kinerja</BBadge></router-link>
            </li>
            <li v-if="!auth" class="d-block d-sm-none" style="padding:5% 5% 5% 5%;">
                <li><router-link to="/login"><BBadge variant="danger" style="font-size: medium;float: left;"><i-solar-login-3-bold /> &nbsp;LOGIN</BBadge></router-link></li>
                <li><router-link to="/signup"><BBadge variant="dark" style="font-size: medium;float: right"><i-mdi-register /> &nbsp;DAFTAR</BBadge></router-link></li>
            </li>
        </ul>
        
    </div>
    <div class="d-flex align-items-center block-e justify-content-between">
        <div v-if="!auth" class="cta-btn d-flex align-items-center">
            <router-link to="/login" class="btn me-2">LOGIN</router-link>
            <router-link to="/signup" class="btn">DAFTAR</router-link>
        </div>
        <div v-else class="nav header-navbar-rht d-flex align-items-center">
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
                    <router-link v-if="user.dept.kategori == 'kantor'" class="dropdown-item" to="/admin" style="background-color: #6a1f2b;color: #f6d78a;"><i-wpf-administrator />&nbsp; Admin Panel</router-link>
                    <b-button class="dropdown-item" to="/userdata" style="background-color: #1f3c2d;color: #f8ecd1;"><i-fluent-folder-16-filled />&nbsp; Personal File</b-button>
                    <router-link class="dropdown-item" to="/dashboard"><i class="feather-grid"></i>&nbsp; Dashboard</router-link>
                    <router-link class="dropdown-item" to="/profile"><i class="fa-solid fa-user"></i>&nbsp; Profil</router-link>
                    <router-link class="dropdown-item" to="/my-listing"><i class="feather-list"></i>&nbsp; Layanan</router-link>
                    <router-link class="dropdown-item" to="/personal/rekappresensiasn/Personal"><i-heroicons-finger-print-16-solid />&nbsp; Laporan Presensi</router-link>
                    <router-link class="dropdown-item" to="/kinerja-harian"><i-mdi-worker />&nbsp; Laporan Kinerja</router-link>
                    <router-link v-if="hasMadrasahAccess" class="dropdown-item" to="/madrasah"><i-feather-book-open />&nbsp; Laporan Madrasah</router-link>
                    <router-link class="dropdown-item" to="/apksilatar"><i-uil-android />&nbsp; SILATAR Android</router-link>
                    <b-button class="dropdown-item logout-item" variant="danger" @click="logout()">
                        <span><i class="fas fa-light fa-circle-arrow-left"></i>&nbsp; Logout</span>
                    </b-button>
                </div>
            </li>						
        </div>
    </div>
  
</template>

<style scoped>
:deep(.dropdown-menu) {
    background: linear-gradient(180deg, #2a171a 0%, #1a0f12 100%);
    border: 1px solid rgba(214, 171, 76, 0.18);
    box-shadow: 0 20px 40px rgba(12, 7, 9, 0.32);
}

:deep(.dropdown-menu .dropdown-item) {
    color: #fff4dc;
    border-bottom: 1px solid rgba(255, 244, 220, 0.08);
    background: transparent;
}

:deep(.dropdown-menu .dropdown-item:hover),
:deep(.dropdown-menu .dropdown-item:focus) {
    background: rgba(214, 171, 76, 0.12);
    color: #fff4dc;
}

:deep(.dropdown-menu .dropdown-item:last-child) {
    border-bottom: none;
}

:deep(.dropdown-menu .btn.dropdown-item) {
    text-align: left;
}

:deep(.dropdown-menu .btn.dropdown-item span) {
    color: inherit;
}

:deep(.dropdown-menu .logout-item) {
    display: block;
    width: 100%;
    background: linear-gradient(135deg, #d6ab4c, #ab1739) !important;
    color: #fffdf6 !important;
    border: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 8px 18px rgba(171, 23, 57, 0.18);
    text-align: left;
    padding: 0.7rem 0.95rem;
    text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
    min-height: 42px;
}

:deep(.dropdown-menu .logout-item:hover),
:deep(.dropdown-menu .logout-item:focus) {
    background: linear-gradient(135deg, #e0ba62, #c82349) !important;
    color: #fffdf6 !important;
}

:deep(.dropdown-menu .logout-item span) {
    color: inherit !important;
    font-weight: 700;
}

:deep(.dropdown-menu .logout-item i) {
    color: inherit !important;
}

:deep(.dropdown-menu .logout-item.btn),
:deep(.dropdown-menu .logout-item.btn-primary),
:deep(.dropdown-menu .logout-item.btn-secondary),
:deep(.dropdown-menu .logout-item.btn-danger) {
    background: linear-gradient(135deg, #d6ab4c, #ab1739) !important;
    border: none !important;
    color: #fffdf6 !important;
}

:deep(.dropdown-menu .logout-item.dropdown-item),
:deep(.dropdown-menu .logout-item.dropdown-item:hover),
:deep(.dropdown-menu .logout-item.dropdown-item:focus),
:deep(.dropdown-menu .logout-item.btn-danger),
:deep(.dropdown-menu .logout-item.btn-danger:hover),
:deep(.dropdown-menu .logout-item.btn-danger:focus) {
    background: linear-gradient(135deg, #d6ab4c, #ab1739) !important;
    color: #fffdf6 !important;
}
</style>

<script>
import { canAccessMadrasah } from '@/utils/madrasahAccess'

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
            },
            MadrasahMenu() {
                return this.$route.path.startsWith('/madrasah')
            },
            hasMadrasahAccess() {
                return this.auth && canAccessMadrasah(this.user)
            }
        },
        mounted() {
            let lastroute = this.$router.options.history.state.back

            if(this.$route.path != lastroute){
                $('html').removeClass('menu-opened');
                $('.sidebar-overlay').removeClass('opened');
                $('.main-wrapper').removeClass('slide-nav');
            }
            
            $(window).scroll(function(){
                var sticky = $('.header'),
                scroll = $(window).scrollTop();
                    if (scroll >= 50) sticky.addClass('fixed');
                    else sticky.removeClass('fixed');
            });
            $('body').append('<div class="sidebar-overlay"></div>');
            $(document).on('click', '#mobile_btn', function () {
                $('.main-wrapper').toggleClass('slide-nav');
                $('.sidebar-overlay').toggleClass('opened');
                $('html').addClass('menu-opened');
                return false;
            });

            $(document).on('click', '.sidebar-overlay', function () {
                $('html').removeClass('menu-opened');
                $(this).removeClass('opened');
                $('.main-wrapper').removeClass('slide-nav');
            });

            $(document).on('click', '#menu_close', function () {
                $('html').removeClass('menu-opened');
                $('.sidebar-overlay').removeClass('opened');
                $('.main-wrapper').removeClass('slide-nav');
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
