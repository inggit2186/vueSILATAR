import {createRouter, createWebHistory} from 'vue-router';
import Swal from 'sweetalert2';

import { canAccessMadrasah, getStoredUser } from '@/utils/madrasahAccess'

const About = () => import('../views/pages/about/about.vue')
const AddSKP = () => import('@/views/pages/adminpanel/addSKP.vue')
const AdminMadrasahBulanan = () => import('@/views/pages/adminpanel/AdminMadrasahLaporanBulanan.vue')
const AdminMadrasahGuru = () => import('@/views/pages/adminpanel/AdminMadrasahGuru.vue')
const AdminMadrasahIndex = () => import('@/views/pages/adminpanel/AdminMadrasahIndex.vue')
const AdminMadrasahPegawai = () => import('@/views/pages/adminpanel/AdminMadrasahPegawai.vue')
const AdminMadrasahProfil = () => import('@/views/pages/adminpanel/AdminMadrasahProfil.vue')
const AdminMadrasahSemester = () => import('@/views/pages/adminpanel/AdminMadrasahLaporanSemester.vue')
const adminasnList = () => import('@/views/pages/adminpanel/asnList.vue')
const adminSatker = () => import('@/views/pages/adminpanel/SatuanKerja.vue')
const AdminMenuVue = () => import('@/views/pages/adminpanel/AdminMenu.vue')
const allRekapKinerja = () => import('@/views/pages/adminpanel/AllRekapKinerja.vue')
const amprahDoc = () => import('@/views/pages/layananMenu/keuanganMenu/amprahDoc.vue')
const amprahGaji = () => import('@/views/pages/layananMenu/keuanganMenu/amprahGaji.vue')
const apkSilatar = () => import('@/views/pages/profile/apkSilatar.vue')
const addAppointmentVue = () => import('@/views/pages/layananMenu/addAppointment.vue')
const addBukuTamuVue = () => import('@/views/pages/InternalKantor/addBukuTamu.vue')
const addRequestVue = () => import('@/views/pages/layananMenu/addRequest.vue')
const layananDetailVue = () => import('@/views/pages/layananMenu/layananDetail.vue')
const BlogDetail = () => import('../views/pages/blog/blog-details/BlogDetails.vue')
const BlogGridSidebar = () => import('../views/pages/blog/blog-grid-sidebar/BlogGrid.vue')
const blogGrid = () => import('../views/pages/blog/blog-grid/BlogGrid.vue')
const BlogListSidebar = () => import('../views/pages/blog/blog-list-sidebar/BlogLsidebar.vue')
const BlogList = () => import('../views/pages/blog/blog-list/BList.vue')
const BookMark = () => import('../views/pages/bookmarks/Bookmark')
const Categories = () => import('../views/pages/categories/Categories.vue')
const cekPemberkasan = () => import('@/views/pages/adminpanel/cekPemberkasan.vue')
const Contact = () => import('../views/pages/contact/Contact.vue')
const Dashboard = () => import('../views/pages/dashboard/Dashboard.vue')
const DataGuruMadrasah = () => import('@/views/pages/madrasah/DataGuruMadrasah.vue')
const DataPegawaiMadrasah = () => import('@/views/pages/madrasah/DataPegawaiMadrasah.vue')
const DetailTamu = () => import('@/views/pages/tamu/detailTamu.vue')
const detailPegawai = () => import('@/views/pages/satuanKerja/asnList.vue')
const detailSatker = () => import('@/views/pages/satuanKerja/detailSatker.vue')
const dipaList = () => import('@/views/pages/layananMenu/keuanganMenu/dipaList.vue')
const docAudit = () => import('@/views/pages/layananMenu/keuanganMenu/docAudit.vue')
const docKeuangan = () => import('@/views/pages/layananMenu/keuanganMenu/docKeuangan.vue')
const Error404 = () => import('../views/pages/Error/error404/Error404.vue')
const Error500 = () => import('../views/pages/Error/error500/Error500.vue')
const Faq = () => import('../views/pages/faq/Faq.vue')
const ForgotPass = () => import('../views/pages/forgot-password/Password.vue')
const Gallery = () => import('../views/pages/gallery/Gallery.vue')
const halalMenu = () => import('@/views/pages/layananMenu/seksiMenu/halalMenu.vue')
const HowItWorks = () => import('../views/pages/howitworks/HowItWorks.vue')
const internalSatkerVue = () => import('@/views/pages/InternalKantor/internalSatker.vue')
const JanjiTemu = () => import('../views/pages/profile/JanjiTemu.vue')
const kecMenu = () => import('@/views/pages/layananMenu/seksiMenu/kecMenu.vue')
const kategoriTamu = () => import('@/views/pages/InternalKantor/kategoriTamu.vue')
const keuanganMenu = () => import('@/views/pages/layananMenu/keuanganMenu/keuanganMenu.vue')
const kegiatanHarian = () => import('../views/pages/profile/KegiatanHarian.vue')
const KinerjaBawahan = () => import('../views/pages/profile/KinerjaBawahan.vue')
const laporanPengaduan = () => import('../views/pages/profile/laporanPengaduan.vue')
const laporanHumas = () => import('@/views/pages/adminpanel/laporanHumas2.vue')
const laporHumas = () => import('@/views/pages/profile/laporHumas2.vue')
const laporanKetidakhadiran = () => import('../views/pages/profile/laporanKetidakhadiran.vue')
const laporanKeuangan = () => import('@/views/pages/layananMenu/keuanganMenu/laporanKeuangan.vue')
const laporanKinerja = () => import('../views/pages/profile/LaporanKinerja.vue')
const LaporanBulananMadrasah = () => import('@/views/pages/madrasah/LaporanBulananMadrasah.vue')
const LaporanSemesterMadrasah = () => import('@/views/pages/madrasah/LaporanSemesterMadrasah.vue')
const listKonsultasi = () => import('../views/pages/profile/listKonsultasi.vue')
const listKeuangan = () => import('@/views/pages/layananMenu/keuanganMenu/ListKeuangan.vue')
const listPetugas2Vue = () => import('@/views/pages/layananMenu/listPetugas2')
const listPetugasVue = () => import('@/views/pages/InternalKantor/listPetugas.vue')
const listp3h = () => import('@/views/pages/layananMenu/seksiMenu/listp3h.vue')
const listMapGrid = () => import('../views/pages/list/listingmap-grid/ListingmapContent.vue')
const listListingMap = () => import('../views/pages/list/listingmap-list/ListingmapList.vue')
const listGrid = () => import('../views/pages/list/listing-grid/ListingGrid.vue')
const Listing = () => import('../views/pages/add-listing/Add.vue')
const ListingGridSidebar = () => import('../views/pages/list/listing-grid-sidebar/GridSidebar.vue')
const ListingSidebar = () => import('../views/pages/list/listing-list-sidebar/ListingListSidebar.vue')
const loginPage = () => import('../views/pages/Login/Login.vue')
const madrasahProfil = () => import('@/views/pages/madrasah/ProfilMadrasahForm.vue')
const menuList = () => import('@/views/pages/InternalKantor/menuList.vue')
const Message = () => import('../views/pages/messages/Message.vue')
const MyListing = () => import('../views/pages/my-listing/List.vue')
const nilaiKinerja = () => import('@/views/pages/adminpanel/nilaiKinerja.vue')
const nilaiSKP = () => import('@/views/pages/adminpanel/nilaiSKP.vue')
const pengaduanMenuVue = () => import('@/views/pages/layananMenu/pengaduanMenu.vue')
const peraturanSE = () => import('@/views/pages/layananMenu/peraturanSE.vue')
const persuratanMenuVue = () => import('@/views/pages/layananMenu/persuratanMenu.vue')
const pelayananList = () => import('@/views/pages/layananMenu/pelayananList.vue')
const Profiles = () => import('../views/pages/profile/Profile.vue')
const privacy = () => import('../views/pages/privacy-policy/PrivacyPolicy.vue')
const rekapKinerja = () => import('@/views/pages/adminpanel/RekapKinerja.vue')
const rekapLaporan = () => import('@/views/pages/adminpanel/rekapLaporan.vue')
const rekapnilaiSKP = () => import('@/views/pages/adminpanel/rekapnilaiSKP.vue')
const rekapPemberkasan = () => import('@/views/pages/adminpanel/rekapPemberkasan.vue')
const rekapPresensi = () => import('@/views/pages/layananMenu/keuanganMenu/rekapPresensi.vue')
const rekapPresensiASN = () => import('@/views/pages/profile/rekapPresensi.vue')
const rateUsVue = () => import('@/views/pages/InternalKantor/rateUs.vue')
const reports = () => import('../views/pages/reviews/Review.vue')
const ruangKonsultasi = () => import('@/views/pages/layananMenu/ruangKonsultasi.vue')
const satuDataVue = () => import('@/views/pages/layananMenu/satuData.vue')
const SatudataHome = () => import('../views/pages/satudata/SatuDataHome.vue')
const satkerList = () => import('@/views/pages/satuanKerja/satkerList.vue')
const SignUp = () => import('../views/pages/signup/Signup.vue')
const slipGaji = () => import('@/views/pages/adminpanel/SlipGaji.vue')
const slipGajix = () => import('../views/pages/profile/SlipGajix.vue')
const slipTukin = () => import('@/views/pages/adminpanel/SlipTukin.vue')
const TermsAndConditions = () => import('../views/pages/terms-conditions/TermsConditions.vue')
const uploadLaporan = () => import('@/views/pages/layananMenu/laporanMenu/uploadLaporan.vue')
const uploadPemberkasan = () => import('@/views/pages/layananMenu/laporanMenu/uploadPemberkasan.vue')
const uploadSyaratVue = () => import('@/views/pages/layananMenu/uploadSyarat.vue')
const UserData = () => import('../views/pages/profile/UserData.vue')
const verifCKH = () => import('@/views/pages/adminpanel/LaporanKinerja.vue')
const jenisUsaha = () => import('@/views/pages/layananMenu/seksiMenu/jenisUsaha.vue')
const layananMenu = () => import('../views/pages/layananMenu/ListingGrid.vue')
const ListRequestVue = () => import('@/views/pages/adminpanel/ListRequest.vue')
const DetailRequestVue = () => import('@/views/pages/adminpanel/DetailRequest.vue')
const indexThree = () => import('../views/pages/home/indexTemplate.vue')

const routes = [
    {
        path: '/',
        name: 'index',
        component: indexThree
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
        path: '/madrasah',
        redirect: '/madrasah/profil'
    },
    {
        path: '/madrasah/profil',
        name: 'Profil Madrasah',
        component: madrasahProfil
    },
    {
        path: '/madrasah/pegawai',
        name: 'Pegawai Madrasah',
        component: DataPegawaiMadrasah
    },
    {
        path: '/madrasah/guru',
        name: 'Data Guru Madrasah',
        component: DataGuruMadrasah
    },
    {
        path: '/madrasah/laporan-semester',
        name: 'Laporan Semester Madrasah',
        component: LaporanSemesterMadrasah
    },
    {
        path: '/madrasah/laporan-bulanan',
        name: 'Laporan Bulanan Madrasah',
        component: LaporanBulananMadrasah
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
        component: listMapGrid
    },
    {
        path: '/listingmap-list',
        name: 'listingmap-list',
        component: listListingMap
    },
    {
        path: '/login',
        name: 'Login',
        component: loginPage
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
        path: '/privacy-policy',
        name: 'privacy-policy',
        component: privacy
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
        component: kegiatanHarian,
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
        component: laporanKinerja,
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
        component: reports,
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
        path: '/admin/madrasah',
        name: 'Admin Fitur Madrasah',
        component: AdminMadrasahIndex,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/admin/madrasah/profil',
        name: 'Admin Profil Madrasah',
        component: AdminMadrasahProfil,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/admin/madrasah/pegawai',
        name: 'Admin Pegawai Madrasah',
        component: AdminMadrasahPegawai,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/admin/madrasah/guru',
        name: 'Admin Guru Madrasah',
        component: AdminMadrasahGuru,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/admin/madrasah/laporan-semester',
        name: 'Admin Laporan Semester Madrasah',
        component: AdminMadrasahSemester,
        meta: {
            requiresAdmin: true
          }
    },
    {
        path: '/admin/madrasah/laporan-bulanan',
        name: 'Admin Laporan Bulanan Madrasah',
        component: AdminMadrasahBulanan,
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
        component: verifCKH,
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
    {
        path: '/kinerja/:xid/:id',
        name: 'Rekap Penilaian Kinerja',
        component: nilaiKinerja,
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
    if (to.path.startsWith('/madrasah')) {
        const userData = getStoredUser()
        if (!userData) {
            next({
                path: '/login',
                query: { redirect: to.fullPath }
            })
            return
        }

        if (!canAccessMadrasah(userData)) {
            Swal.fire({
                title: ':: Restricted Area ::',
                text: 'Anda tidak memiliki akses ke menu Madrasah.',
                icon: 'error',
            })
            next({
                path: '/',
            })
            return
        }

        next()
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
       // Check if the user is logged in
       if (localStorage.getItem('user')) {
         next();
       } else {
         next({
           path: '/login',
           query: { redirect: to.fullPath }
         });
       }
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
        if (localStorage.getItem('user')) {
            let userData = JSON.parse(localStorage.getItem("user"));
            const role = String(userData?.role || '').trim().toLowerCase()
            const hakses = Array.isArray(userData?.hakses) ? userData.hakses.map((item) => String(item).trim().toLowerCase()) : []
            const allowedRoles = ['admin', 'petugas', 'kepala', 'kasubbag', 'kasi']

            if(hakses.includes("admin") || allowedRoles.includes(role)){
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
