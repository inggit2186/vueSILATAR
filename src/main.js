/* eslint-disable vue/multi-word-component-names */
import { createApp, defineAsyncComponent } from 'vue';
import { router } from './router';
import App from "./App.vue";
import BootstrapVueNext from 'bootstrap-vue-next';
import VueApexCharts from "vue3-apexcharts";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import VueEasyLightbox from "vue-easy-lightbox";
import Antd from 'ant-design-vue';
import VueCarousel from 'vue-carousel';
import axios from 'axios';
import Swal from 'sweetalert2';
import VueDatePicker from '@vuepic/vue-datepicker';
import VueCryptojs from 'vue-cryptojs';
import VueSignaturePad from 'vue-signature-pad';
import bottomNavigationVue from "bottom-navigation-vue";


// Header Components
import Header from './views/layouts/header.vue'
import UserNavbar from './components/UserpageNavbar.vue'
import NavbarTwo from './components/navbarTwo.vue'
import NavbarTwoHeader from './components/navbarTwoHeader.vue'
import NavbarThree from './components/navbarThree.vue'
import NavbarFour from './components/navbarFour.vue'
import NavbarFive from './components/navbarFive.vue'
import NavMenu from './components/navmenu.vue'
import userMenu from './components/userMenu.vue'
import menuPresensi from './components/presensiMenu.vue';
import kinerjaMenu from './components/kinerjaMenu.vue'
import gajiMenu from './components/gajiMenu.vue'
import userlayananMenu from './components/userlayananMenu.vue'
import konsultasiMenu from './components/konsultasiMenu.vue'
import asnMenu from './components/asnMenu.vue';

// Page Components are registered lazily to keep the initial bundle smaller.
const pageModules = import.meta.glob([
  './views/pages/**/*.vue',
  './views/pages/**/*.js',
]);

const loadPageComponent = (path) => {
  const loader = pageModules[`./${path}`];
  if (!loader) {
    throw new Error(`Missing page component: ${path}`);
  }
  return defineAsyncComponent(loader);
};

const asyncPageComponents = {
  Aboutcontent: 'views/pages/about/AboutContent.vue',
  Aboutpartners: 'views/pages/about/AboutPartners.vue',
  Aboutpopular: 'views/pages/about/AboutPopular.vue',
  AddAppointment: 'views/pages/layananMenu/addAppointment.vue',
  AddBukuTamu: 'views/pages/InternalKantor/addBukuTamu.vue',
  Addlisting: 'views/pages/add-listing/AddListing.vue',
  AddRequest: 'views/pages/layananMenu/addRequest.vue',
  AddSKP: 'views/pages/adminpanel/addSKP.vue',
  AdminAsnList: 'views/pages/adminpanel/asnList.vue',
  AdminMenu: 'views/pages/adminpanel/AdminMenu.vue',
  AdminSatker: 'views/pages/adminpanel/SatuanKerja.vue',
  AllRekapKinerja: 'views/pages/adminpanel/AllRekapKinerja.vue',
  AmprahDoc: 'views/pages/layananMenu/keuanganMenu/amprahDoc.vue',
  AmprahGaji: 'views/pages/layananMenu/keuanganMenu/amprahGaji.vue',
  ApkSilatar: 'views/pages/profile/apkSilatar.vue',
  AsnList: 'views/pages/satuanKerja/asnList.vue',
  Bookmarkcontent: 'views/pages/bookmarks/BookmarkContent.vue',
  Blogcontent: 'views/pages/blog/blog-details/BlogContent.vue',
  Bloggridlist: 'views/pages/blog/blog-grid/BlogGridList.vue',
  Bloggridsidebar: 'views/pages/blog/blog-grid-sidebar/BlogGridSidebar.vue',
  Bloglist: 'views/pages/blog/blog-list/BlogList.vue',
  Bloglistsidebar: 'views/pages/blog/blog-list-sidebar/BlogListSidebar.vue',
  Categorieslist: 'views/pages/categories/CategoriesList.vue',
  CekPemberkasan: 'views/pages/adminpanel/cekPemberkasan.vue',
  Contactinformation: 'views/pages/contact/ContactInformation.vue',
  DataGuruMadrasah: 'views/pages/madrasah/DataGuruMadrasah.vue',
  DataPegawaiMadrasah: 'views/pages/madrasah/DataPegawaiMadrasah.vue',
  Dashboardcontent: 'views/pages/dashboard/DashboardContent.vue',
  DetailRequest: 'views/pages/adminpanel/DetailRequest.vue',
  DetailSatker: 'views/pages/satuanKerja/detailSatker.vue',
  DetailTamu: 'views/pages/tamu/detailTamu.vue',
  DipaList: 'views/pages/layananMenu/keuanganMenu/dipaList.vue',
  DocAudit: 'views/pages/layananMenu/keuanganMenu/docAudit.vue',
  DocKeuangan: 'views/pages/layananMenu/keuanganMenu/docKeuangan.vue',
  Faqcontent: 'views/pages/faq/FaqContent.vue',
  Foot: 'views/pages/Footer.vue',
  Forgotpassword: 'views/pages/forgot-password/ForgotPassword.vue',
  Gallerypage: 'views/pages/gallery/GalleryPage.vue',
  HalalMenu: 'views/pages/layananMenu/seksiMenu/halalMenu.vue',
  Howworks: 'views/pages/howitworks/Works.vue',
  Indexactivity: 'views/pages/home/indexActivity.vue',
  Indexads: 'views/pages/index/IndexAds.vue',
  Indexappointment: 'views/pages/indextwo/indexAppointment.vue',
  Indexbusiness: 'views/pages/indexfive/indexBusiness.vue',
  Indexblog: 'views/pages/index/IndexBlog.vue',
  Indexcategory: 'views/pages/index/IndexCategory.vue',
  Indexcelebrate: 'views/pages/indextwo/indexCelebrate.vue',
  Indexclient: 'views/pages/index/IndexClient.vue',
  Indexcowork: 'views/pages/indexfour/indexCowork.vue',
  Indexcta: 'views/pages/index/IndexCTA.vue',
  IndexDesc: 'views/pages/home/indexDesc.vue',
  Indexdiscover: 'views/pages/indexfive/indexDiscover.vue',
  Indexexplore: 'views/pages/index/IndexExplore.vue',
  Indexfeatured: 'views/pages/index/IndexFeatured.vue',
  Indexfourpricing: 'views/pages/indexfour/indexFourPricing.vue',
  Indexhome: 'views/pages/home/indexHome.vue',
  Indexnow: 'views/pages/indexfour/indexNow.vue',
  Indexoffer: 'views/pages/home/indexOffer.vue',
  Indexpackage: 'views/pages/indextwo/indexPackage.vue',
  Indexpartners: 'views/pages/index/IndexPartners.vue',
  Indexportfolio: 'views/pages/indextwo/indexPortfolio.vue',
  Indexpopular: 'views/pages/index/IndexPopular.vue',
  Indexprice: 'views/pages/home/indexPrice.vue',
  Indexpricing: 'views/pages/index/IndexPricing.vue',
  Indexpromo: 'views/pages/home/indexPromo.vue',
  Indexspace: 'views/pages/indexfour/indexSpace.vue',
  Indexsubscribe: 'views/pages/home/indexSubscribe.vue',
  Indextestimonial: 'views/pages/home/indexTestimonial.vue',
  Indextimeline: 'views/pages/indextwo/indexTimeline.vue',
  Indexthreedestination: 'views/pages/home/indexDestination.vue',
  Indexvendor: 'views/pages/indextwo/indexVendor.vue',
  Indexwedding: 'views/pages/indextwo/indexwedding.vue',
  JanjiTemu: 'views/pages/profile/JanjiTemu.vue',
  JenisUsaha: 'views/pages/layananMenu/seksiMenu/jenisUsaha.vue',
  KecMenu: 'views/pages/layananMenu/seksiMenu/kecMenu.vue',
  KeuanganMenu: 'views/pages/layananMenu/keuanganMenu/keuanganMenu.vue',
  KantorData: 'views/pages/satuanKerja/kantorData.vue',
  KinerjaBawahan: 'views/pages/profile/KinerjaBawahan.vue',
  KategoriTamu: 'views/pages/InternalKantor/kategoriTamu.vue',
  LaporanBulananMadrasah: 'views/pages/madrasah/LaporanBulananMadrasah.vue',
  LaporanKetidakhadiran: 'views/pages/profile/laporanKetidakhadiran.vue',
  LaporanKeuangan: 'views/pages/layananMenu/keuanganMenu/laporanKeuangan.vue',
  LaporanKinerja: 'views/pages/profile/LaporanKinerja.vue',
  LaporanPengaduan: 'views/pages/profile/laporanPengaduan.vue',
  Listcontent: 'views/pages/list/listing-list-sidebar/ListContent.vue',
  Listgridsidebar: 'views/pages/list/listing-grid-sidebar/ListingGridSidebar.vue',
  Listgrid: 'views/pages/layananMenu/DashboardContent.vue',
  ListKeuangan: 'views/pages/layananMenu/keuanganMenu/listKeuangan.vue',
  ListKonsultasi: 'views/pages/profile/listKonsultasi.vue',
  Listmapcontent: 'views/pages/list/listingmap-grid/ListingmapContent.vue',
  ListPetugas: 'views/pages/InternalKantor/listPetugas.vue',
  ListPetugas2: 'views/pages/layananMenu/listPetugas2.vue',
  Listp3h: 'views/pages/layananMenu/seksiMenu/listp3h.vue',
  ListRequest: 'views/pages/adminpanel/ListRequest.vue',
  ListSatker: 'views/pages/adminpanel/ListSatker.vue',
  Listinglistcontent: 'views/pages/list/listingmap-list/ListingListContent.vue',
  Loginform: 'views/pages/Login/LoginForm.vue',
  MenuList: 'views/pages/InternalKantor/menuList.vue',
  Messagecontent: 'views/pages/messages/MessageContent.vue',
  Mylisting: 'views/pages/my-listing/MyListing.vue',
  Navbarthreefooter: 'views/pages/home/footer.vue',
  Nexttripslide: 'views/pages/home/nextTripSlide.vue',
  NilaiKinerja: 'views/pages/adminpanel/nilaiKinerja.vue',
  NilaiSKP: 'views/pages/adminpanel/nilaiSKP.vue',
  PelayananList: 'views/pages/layananMenu/pelayananList.vue',
  PengaduanMenu: 'views/pages/layananMenu/pengaduanMenu.vue',
  PersuratanMenu: 'views/pages/layananMenu/persuratanMenu.vue',
  PeraturanSE: 'views/pages/layananMenu/peraturanSE.vue',
  Profiledashboard: 'views/pages/profile/ProfileDashboard.vue',
  RateUs: 'views/pages/InternalKantor/rateUs.vue',
  RekapKinerja: 'views/pages/adminpanel/RekapKinerja.vue',
  RekapLaporan: 'views/pages/adminpanel/rekapLaporan.vue',
  RekapnilaiSKP: 'views/pages/adminpanel/rekapnilaiSKP.vue',
  RekapPemberkasan: 'views/pages/adminpanel/rekapPemberkasan.vue',
  RekapPresensi: 'views/pages/layananMenu/keuanganMenu/rekapPresensi.vue',
  RekapPresensiASN: 'views/pages/profile/rekapPresensi.vue',
  Reviewdashboard: 'views/pages/reviews/ReviewDashboard.vue',
  Recommendslide: 'views/pages/home/recommendSlide.vue',
  RuangKonsultasi: 'views/pages/layananMenu/ruangKonsultasi.vue',
  SatuData: 'views/pages/layananMenu/satuData.vue',
  SatuDataHome: 'views/pages/satudata/SatuDataHome.vue',
  SatkerList: 'views/pages/satuanKerja/satkerList.vue',
  Signuplogin: 'views/pages/signup/SignupLogin.vue',
  SlipGaji: 'views/pages/adminpanel/SlipGaji.vue',
  SlipGajix: 'views/pages/profile/SlipGajix.vue',
  SlipTukin: 'views/pages/adminpanel/SlipTukin.vue',
  Servicecontent: 'views/pages/service-details/ServiceContent.vue',
  Servicedescription: 'views/pages/service-details/ServiceDescription.vue',
  Servicereview: 'views/pages/service-details/serviceReview.vue',
  Servicegallery: 'views/pages/service-details/ServiceGallery.vue',
  Termscontent: 'views/pages/terms-conditions/TermsContent.vue',
  UploadLaporan: 'views/pages/layananMenu/laporanMenu/uploadLaporan.vue',
  UploadPemberkasan: 'views/pages/layananMenu/laporanMenu/uploadPemberkasan.vue',
  UploadSyarat: 'views/pages/layananMenu/uploadSyarat.vue',
  UserData: 'views/pages/profile/UserData.vue',
  Weddingfooter: 'views/pages/indextwo/footer/footer.vue',
  Weddingindexblog: 'views/pages/indextwo/indexBlog.vue',
  DetailList: 'views/pages/satuanKerja/detailList.vue',
};

// Breadcrumbs 
import BreadCrumb from './components/breadcrumb/Component.vue'
import AboutBreadcrumb from './components/breadcrumb/AboutBreadcrumb.vue'

// plugins
// import './assets/js/map.js'
import 'aos/dist/aos.css'
import './assets/js/backToTop.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'ant-design-vue/dist/antd.css';
import './assets/css/feather.css';
import './assets/css/style.css';
import '@vuepic/vue-datepicker/dist/main.css';
import "bottom-navigation-vue/dist/style.css";

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
const assetSrc = new URL(`${window.location.origin}/v2/assets`, import.meta.url).href;
const assetPath = (relativePath) => new URL(`./assets/img/${relativePath}`, import.meta.url).href;

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$toast = Toast;
app.config.globalProperties.$assets = assetSrc;
app.config.globalProperties.$asset = assetPath;
app.component('Layouts',Header)
app.component('Usernavbar',UserNavbar)
app.component('Navbartwo',NavbarTwo)
app.component('NavbartwoHeader',NavbarTwoHeader)
app.component('Navbarthree',NavbarThree)
app.component('Navbarfour',NavbarFour)
app.component('Navbarfive',NavbarFive)
app.component('Navmenu',NavMenu)
app.component('UserMenu',userMenu)
app.component('MenuPresensi',menuPresensi)
app.component('KinerjaMenu',kinerjaMenu)
app.component('GajiMenu',gajiMenu)
app.component('UserlayananMenu',userlayananMenu)
app.component('KonsultasiMenu',konsultasiMenu)
app.component('AsnMenu',asnMenu)

Object.entries(asyncPageComponents).forEach(([name, path]) => {
  app.component(name, loadPageComponent(path));
});

// Breadcrumb
app.component('Breadcrumb',BreadCrumb)
app.component('VueDatePicker',VueDatePicker)

.use(BootstrapVueNext)
.use(Antd)
app.use(VueEasyLightbox);
app.use(VueSignaturePad);
app.use(bottomNavigationVue);
app.use(VueCryptojs);
app.use(CoolLightBox);
app.use(VueApexCharts);
app.use(VueCarousel);
app.use(router).mount('#app');

// Register Firebase service worker for FCM
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('/firebase-messaging-sw.js')
  .then((registration) => {
      console.log('Service Worker registered successfully:', registration);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}
