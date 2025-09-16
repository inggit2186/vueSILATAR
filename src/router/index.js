import {createRouter, createWebHistory} from 'vue-router';
import Swal from 'sweetalert2';

import Index from '../views/pages/index/index.vue'
import About from '../views/pages/about/about.vue'
import Listing from '../views/pages/add-listing/Add.vue'
import BlogDetail from '../views/pages/blog/blog-details/BlogDetails.vue'
import BlogGridSidebar from '../views/pages/blog/blog-grid-sidebar/BlogGrid.vue'
import blogGrid from '../views/pages/blog/blog-grid/BlogGrid.vue'
import BlogListSidebar from '../views/pages/blog/blog-list-sidebar/BlogLsidebar.vue'
import BlogList from '../views/pages/blog/blog-list/BList.vue'
import BookMark from '../views/pages/bookmarks/Bookmark'
import Categories from '../views/pages/categories/Categories.vue'
import Contact from '../views/pages/contact/Contact.vue'
import Dashboard from '../views/pages/dashboard/Dashboard.vue'
import Error404 from '../views/pages/Error/error404/Error404.vue'
import Error500 from '../views/pages/Error/error500/Error500.vue'
import Faq from '../views/pages/faq/Faq.vue'
import ForgotPass from '../views/pages/forgot-password/Password.vue'
import Gallery from '../views/pages/gallery/Gallery.vue'
import HowItWorks from '../views/pages/howitworks/HowitWorks.vue'
import ListingGridSidebar from '../views/pages/list/listing-grid-sidebar/GridSidebar.vue'
import listGrid from '../views/pages/list/listing-grid/ListingGrid.vue'
import ListingSidebar from '../views/pages/list/listing-list-sidebar/ListingListSidebar.vue'
import ListMapGrid from '../views/pages/list/listingmap-grid/ListingmapGrid.vue'
import listListingMap from '../views/pages/list/listingmap-list/ListingmapList.vue'
import LoginPage from '../views/pages/Login/Login.vue'
import Message from '../views/pages/messages/Message.vue'
import MyListing from '../views/pages/my-listing/List.vue'
import PricingPage from '../views/pages/pricing/Pricing.vue'
import Privacy from '../views/pages/privacy-policy/PrivacyPolicy.vue'
import Profiles from '../views/pages/profile/Profile.vue'
import Reviews from '../views/pages/reviews/Review.vue'
import Service from '../views/pages/service-details/ServiceDetails.vue'
import SignUp from '../views/pages/signup/Signup.vue'
import TermsAndConditions from '../views/pages/terms-conditions/TermsConditions.vue'
import IndexTwo from '../views/pages/indextwo/indexTwo.vue'
import IndexThree from '../views/pages/home/indexTemplate.vue'
import IndexFour from '../views/pages/indexfour/indexFour.vue'
import IndexFive from '../views/pages/indexfive/indexFive.vue'

//profil
import JanjiTemu from '../views/pages/profile/JanjiTemu.vue'
import UserData from '../views/pages/profile/UserData.vue'
import KegiatanHarian from '../views/pages/profile/KegiatanHarian.vue'
import LaporanKinerja from '../views/pages/profile/LaporanKinerja.vue'
import KinerjaBawahan from '../views/pages/profile/KinerjaBawahan.vue'
import slipGajix from '../views/pages/profile/SlipGajix.vue'
import rekapPresensiASN from '@/views/pages/profile/rekapPresensi.vue';
import laporanPengaduan from '@/views/pages/profile/laporanPengaduan.vue'
import laporanKetidakhadiran from '@/views/pages/profile/laporanKetidakhadiran.vue'
import apkSilatar from '@/views/pages/profile/apkSilatar.vue';
import listKonsultasi from '@/views/pages/profile/listKonsultasi.vue';
import laporHumas from '@/views/pages/profile/laporHumas.vue';

//satudata
import SatudataHome from '../views/pages/satudata/SatuDataHome.vue'

//keuangan
import keuanganMenu from '@/views/pages/layananMenu/keuanganMenu/keuanganMenu.vue';
import presensiMenu from '@/views/pages/layananMenu/keuanganMenu/presensiMenu.vue';
import amprahGaji from '@/views/pages/layananMenu/keuanganMenu/amprahGaji.vue';
import amprahDoc from '@/views/pages/layananMenu/keuanganMenu/amprahDoc.vue';
import listKeuangan from '@/views/pages/layananMenu/keuanganMenu/ListKeuangan.vue';
import docKeuangan from '@/views/pages/layananMenu/keuanganMenu/docKeuangan.vue';
import dipaList from '@/views/pages/layananMenu/keuanganMenu/dipaList.vue';
import laporanKeuangan from '@/views/pages/layananMenu/keuanganMenu/laporanKeuangan.vue';
import docAudit from '@/views/pages/layananMenu/keuanganMenu/docAudit.vue';
import rekapPresensi from '@/views/pages/layananMenu/keuanganMenu/rekapPresensi.vue';

import layananMenu from '../views/pages/layananMenu/ListingGrid.vue'
import pelayananList from '@/views/pages/layananMenu/pelayananList.vue'
import satkerList from '@/views/pages/satuanKerja/satkerList.vue';
import detailPegawai from '@/views/pages/satuanKerja/asnList.vue'
import detailSatker from '@/views/pages/satuanKerja/detailSatker.vue';
import menuList from '@/views/pages/InternalKantor/menuList.vue'
import kategoriTamu from '@/views/pages/InternalKantor/kategoriTamu.vue';
import internalSatkerVue from '@/views/pages/InternalKantor/internalSatker.vue';
import addBukuTamuVue from '@/views/pages/InternalKantor/addBukuTamu.vue';
import listPetugasVue from '@/views/pages/InternalKantor/listPetugas.vue';
import listPetugas2Vue from '@/views/pages/layananMenu/listPetugas2';
import rateUsVue from '@/views/pages/InternalKantor/rateUs.vue';
import layananDetailVue from '@/views/pages/layananMenu/layananDetail.vue';
import addRequestVue from '@/views/pages/layananMenu/addRequest.vue';
import uploadSyaratVue from '@/views/pages/layananMenu/uploadSyarat.vue';
import addAppointmentVue from '@/views/pages/layananMenu/addAppointment.vue';
import satuDataVue from '@/views/pages/layananMenu/satuData.vue';
import pengaduanMenuVue from '@/views/pages/layananMenu/pengaduanMenu.vue'
import persuratanMenuVue from '@/views/pages/layananMenu/persuratanMenu.vue'
import peraturanSE from '@/views/pages/layananMenu/peraturanSE.vue'
import ruangKonsultasi from '@/views/pages/layananMenu/ruangKonsultasi.vue';
import uploadLaporan from '@/views/pages/layananMenu/laporanMenu/uploadLaporan.vue';
import uploadPemberkasan from '@/views/pages/layananMenu/laporanMenu/uploadPemberkasan.vue';
import jenisUsaha from '@/views/pages/layananMenu/seksiMenu/jenisUsaha.vue';
import halalMenu from '@/views/pages/layananMenu/seksiMenu/halalMenu.vue';
import kecMenu from '@/views/pages/layananMenu/seksiMenu/kecMenu.vue';
import listp3h from '@/views/pages/layananMenu/seksiMenu/listp3h.vue';

//cPanel
import adminasnList from '@/views/pages/adminpanel/asnList.vue'
import AdminMenuVue from '@/views/pages/adminpanel/AdminMenu.vue'
import ListRequestVue from '@/views/pages/adminpanel/ListRequest.vue'
import DetailRequestVue from '@/views/pages/adminpanel/DetailRequest.vue'
import DetailTamu from '@/views/pages/tamu/detailTamu.vue'
import VerifCKH from '@/views/pages/adminpanel/LaporanKinerja.vue'
import adminSatker from '@/views/pages/adminpanel/SatuanKerja.vue'
import rekapKinerja from '@/views/pages/adminpanel/RekapKinerja.vue'
import allRekapKinerja from '@/views/pages/adminpanel/AllRekapKinerja.vue'
import slipGaji from '@/views/pages/adminpanel/SlipGaji.vue'
import slipTukin from '@/views/pages/adminpanel/SlipTukin.vue'
import rekapLaporan from '@/views/pages/adminpanel/rekapLaporan.vue'
import rekapPemberkasan from '@/views/pages/adminpanel/rekapPemberkasan.vue'
import cekPemberkasan from '@/views/pages/adminpanel/cekPemberkasan.vue';
import laporanHumas from '@/views/pages/adminpanel/laporanHumas.vue';
import nilaiSKP from '@/views/pages/adminpanel/nilaiSKP.vue';

//other
import AddSKP from '@/views/pages/adminpanel/addSKP.vue';
import rekapnilaiSKP from '@/views/pages/adminpanel/rekapnilaiSKP.vue';

const routes = [
    {
        path: '/',
        name: 'index',
        component: IndexThree
    },
    {
        path: '/internal',
        name: 'Internal Kantor',
        component: menuList
    },
    {
        path: '/bukutamu',
        name: 'Kategori Tamu',
        component: kategoriTamu
    },
    {
        path: '/bukutamu/:id',
        name: 'Buku Tamu',
        component: internalSatkerVue
    },
    {
        path: '/guest/:nav/:id',
        name: 'Petugas Tamu',
        component: listPetugasVue
    },
    {
        path: '/bukutamu/:cat/:tipe/:id',
        name: 'Tamu Baru',
        component: addBukuTamuVue
    },
    {
        path: '/rateUs',
        name: 'Rate Us',
        component: rateUsVue
    },
    {
        path: '/UnitKerja',
        name: 'Unit Kerja',
        component: layananMenu
    },
    {
        path: '/satuanKerja/:id',
        name: 'Satuan Kerja',
        component: satkerList
    },
    {
        path: '/satker/:id',
        name: 'Detail Satker',
        component: detailSatker
    },
    {
        path: '/ASN/:id',
        name: 'Detail Pegawai',
        component: detailPegawai
    },
    {
        path:'/Pelayanan/:id',
        name: 'Menu Pelayanan',
        component: pelayananList
    },
    {
        path:'/Layanan/:id',
        name: 'Layanan Umum',
        component: Categories
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/Persuratan/:id',
        name: 'Persuratan',
        component: persuratanMenuVue
    },
    {
        path: '/Pengaduan/:id',
        name: 'Pengaduan',
        component: pengaduanMenuVue
    },
    {
        path: '/suratedaran/:id',
        name: 'Peraturan Surat Edaran',
        component: peraturanSE
    },
    {
        path: '/keuangan',
        name: 'Layanan Keuangan',
        component: keuanganMenu,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/dipa/:id',
        name: 'Daftar Dokumen',
        component: listKeuangan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/dipa/:xid/laporanKeuangan',
        name: 'Laporan Keuangan',
        component: laporanKeuangan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/dipa/:xid/:id',
        name: 'Dokumen DIPA',
        component: docKeuangan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/layanankeuangan/:id',
        name: 'Daftar DIPA',
        component: dipaList,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/amprah',
        name: 'Amprah',
        component: amprahDoc,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/amprah/:id',
        name: 'Amprah Gaji',
        component: amprahGaji,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/audit/:id',
        name: 'Dokumen Audit',
        component: docAudit,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/presensi',
        name: 'Rekap Presensi',
        component: rekapPresensi,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/presensi/rekap',
        name: 'Rekap PUSAKA',
        component: rekapPresensi,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/add-listing',
        name: 'Add Listing',
        component: Listing
    },
    {
        path: '/blog-details',
        name: 'blog-details',
        component: BlogDetail
    },
    {
        path: '/blog-grid-sidebar',
        name: 'blog-grid-sidebar',
        component: BlogGridSidebar
    },
    {
        path: '/blog-grid',
        name: 'blog-grid',
        component: blogGrid 
    },
    {
        path: '/blog-list-sidebar',
        name: 'blog-list-sidebar',
        component: BlogListSidebar
    },
    {
        path: '/blog-list',
        name: 'blog-list',
        component: BlogList
    },
    {
        path: '/bookmarks',
        name: 'Bookmarks',
        component: BookMark,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories
    },
    {
        path: '/contact',
        name: 'Kontak Kami',
        component: Contact
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/error-404',
        name: 'error-404',
        component: Error404
    },
    {
        path: '/error-500',
        name: 'error-500',
        component: Error500
    },
    {
        path: '/faq',
        name: 'faq',
        component: Faq
    },
    {
        path: '/forgot-password',
        name: 'Password',
        component: ForgotPass
    },
    {
        path: '/gallery',
        name: 'gallery',
        component: Gallery
    },
    {
        path: '/howitworks',
        name: 'howitworks',
        component: HowItWorks
    },
    {
        path: '/listing-grid-sidebar',
        name: 'listing-grid-sidebar',
        component: ListingGridSidebar
    },
    {
        path: '/listing-grid',
        name: 'listing-grid',
        component: listGrid
    },
    {
        path: '/listing-list-sidebar',
        name: 'listing-list-sidebar',
        component: ListingSidebar
    },
    {
        path: '/listingmap-grid',
        name: 'listingmap-grid',
        component: ListMapGrid
    },
    {
        path: '/listingmap-list',
        name: 'listingmap-list',
        component: listListingMap
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/messages',
        name: 'Messages',
        component: Message,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/my-listing',
        name: 'My Listing',
        component: MyListing,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/my-konsultasi',
        name: 'My Konsultasi',
        component: listKonsultasi,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/user-appointment',
        name: 'User Appointment',
        component: JanjiTemu,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/detailtamu/:id',
        name: 'Detail Tamu',
        component: DetailTamu,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: PricingPage
    },
    {
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: Privacy
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profiles,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/kinerja-harian',
        name: 'Kinerja Harian',
        component: KegiatanHarian,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/laporan-humas',
        name: 'Laporan Humas',
        component: laporHumas,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/laporankinerja',
        name: 'Laporan Kinerja',
        component: LaporanKinerja,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/kinerjabawahan',
        name: 'Kinerja Bawahan',
        component: KinerjaBawahan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/:id/asnlist',
        name: 'List ASN Admin',
        component: adminasnList,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/:id/rekappresensiasn/:xid',
        name: 'Rekap Presensi ASN',
        component: rekapPresensiASN,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/:id/laporanpengaduan',
        name: 'Laporan Pengaduan',
        component: laporanPengaduan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/:id/laporanketidakhadiran',
        name: 'Laporan Ketidakhadiran',
        component: laporanKetidakhadiran,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/laporan/:xid/:zid/:id',
        name: 'Laporan Satker',
        component: uploadLaporan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/pemberkasan/:id',
        name: 'Pemberkasan Layanan',
        component: uploadPemberkasan,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/userdata',
        name: 'Data Pegawai',
        component: UserData,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/cashbon',
        name: 'Personal Cashbon',
        component: slipGajix,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/satudata',
        name: 'Satu Data',
        component: SatudataHome,
    },
    {
        path: '/reviews',
        name: 'Reviews',
        component: Reviews,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/LayananDetail/:cid/:xid/:id',
        name: 'Detail Layanan',
        component: layananDetailVue,
    },
    {
        path: '/request/:cid/:xid/:id',
        name: 'Add Request',
        component: addRequestVue,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/uploadsyarat/:id',
        name: 'Upload Syarat',
        component: uploadSyaratVue,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/satkerdata/:id',
        name: 'Satker Data',
        component: satuDataVue,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/:xid/:id',
        name: 'List Pegawai Kantor',
        component: listPetugas2Vue,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/Appointment/:xid/:id',
        name: 'Add Appointment',
        component: addAppointmentVue,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/Konsultasi/:xid/:id',
        name: 'Ruang Konsultasi',
        component: ruangKonsultasi,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/admin',
        name: 'Admin Panel',
        component: AdminMenuVue,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/listreq/:id',
        name: 'Daftar Request',
        component: ListRequestVue,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/detailrequest/:id',
        name: 'Detail Request',
        component: DetailRequestVue,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/verifckh',
        name: 'Laporan CKH',
        component: VerifCKH,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/verif/:xid/:id',
        name: 'Verifikasi CKH',
        component: adminSatker,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/1081/:xid/:id',
        name: 'Verifikasi TPG Penmad',
        component: rekapPemberkasan,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/lappresensi/:xid/:id',
        name: 'Laporan Presensi',
        component: adminSatker,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/ckh/:xid/:id',
        name: 'Rekap CKH',
        component: rekapKinerja,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/rekaplaporan/:id/:xid',
        name: 'Rekap Laporan',
        component: rekapLaporan,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/rekappemberkasan/:xid/:id/:zid',
        name: 'Rekap Pemberkasan',
        component: rekapPemberkasan,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/cekpemberkasan/:xid/:id',
        name: 'Cek Pemberkasan',
        component: cekPemberkasan,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/slipgaji',
        name: 'Slip Gaji',
        component: slipGaji,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/sliptukin/:xid/:id',
        name: 'Slip Kategori Tukin',
        component: slipTukin,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/verif/:xid/:id',
        name: 'Verifikasi Humas',
        component: adminSatker,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/humas/:xid/:id',
        name: 'Rekap Laporan Humas',
        component: laporanHumas,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/allRekapKinerja/:id',
        name: 'All Rekap CKH',
        component: allRekapKinerja,
    },
    {
        path: '/signup',
        name: 'Signup',
        component: SignUp
    },
    {
        path: '/terms-condition',
        name: 'terms-condition',
        component: TermsAndConditions
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            userLogout: true
          }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: Error404
    },
    {
        path: '/error500',
        name: '500',
        component: Error500
    },
    {
        path: '/apksilatar',
        name: 'APK SILATAR',
        component: apkSilatar,
        meta: {
            requiresAuth: true
          }
    },
    {
        path: '/nilaiSKP',
        name: 'Penilaian SKP',
        component: nilaiSKP,
    },
    {
        path: '/usaha',
        name: 'Jenis Usaha',
        component: jenisUsaha,
    },
    {
        path: '/:id/certhalal',
        name: 'Sertifikasi Halal',
        component: halalMenu,
    },
    {
        path: '/:jid/:id/domisili',
        name: 'Domisili Kecamatan',
        component: kecMenu,
    },
    {
        path: '/p3h/:id',
        name: 'List P3H',
        component: listp3h,
    },
    {
        path: '/addnilaiSKP/:id',
        name: 'Blanko Penilaian SKP',
        component: AddSKP,
    },
    {
        path: '/penilaianskp',
        name: 'Rekap Penilaian SKP',
        component: rekapnilaiSKP,
        meta: {
            requiresAdmin: true
          }
    },
   

]
export const router = createRouter({
    history: createWebHistory('/v2'),
    linkActiveClass: 'active',
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
       // Check if the user is logged in
       if (localStorage.getItem('user')) {
         next();
       } else {
         next({
           path: '/login',
           query: { redirect: to.fullPath }
         });
       }
    }else if (to.matched.some(record => record.meta.superAdmin)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.hakses.includes("superadmin")){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.Admin)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.hakses.includes("admin")){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.Keuangan)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.hakses.includes("keuangan")){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.SubbagTU)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.hakses.includes("subbagtu")){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.Petugas)) {
        // Check if the user is logged in
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            if(userData.hakses.includes("petugas")){
                next()
            }else{
                Swal.fire({
                    title: ':: Restricted Area ::',
                    text: 'Anda Tidak Memiliki Akses ke Bagian Ini !!',
                    icon: 'error',
                })
                next({
                    path: '/',
                  });
            }
        } else {
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          });
        }
     }else if (to.matched.some(record => record.meta.userLogout)) {
        
        localStorage.clear()
        next({
            path: '/login',
          });
     } else {
       next();
    }
   });

