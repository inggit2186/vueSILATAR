/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import { router } from './router';
import App from "./App.vue";
import {BootstrapVue3, BToastPlugin} from 'bootstrap-vue-3';
import VueApexCharts from "vue3-apexcharts";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import VueEasyLightbox from "vue-easy-lightbox";
import Antd from 'ant-design-vue';
import AOS from 'aos'
import VueCarousel from 'vue-carousel';
import axios from 'axios';
import Swal from 'sweetalert2';
import StarRating from 'vue-star-rating'
import pdfjsLib from 'pdfjs-dist'
import VueDatePicker from '@vuepic/vue-datepicker';
import VueCryptojs from 'vue-cryptojs';
import VueSignaturePad from 'vue-signature-pad';
import bottomNavigationVue from "bottom-navigation-vue";

// Header Components
import Navbar from './components/navbar.vue'
import UserNavbar from './components/UserpageNavbar.vue'
import NavbarTwo from './components/navbarTwo.vue'
import NavbarTwoHeader from './components/navbarTwoHeader.vue'
import NavbarThree from './components/navbarThree.vue'
import NavbarFour from './components/navbarFour.vue'
import NavbarFive from './components/navbarFive.vue'
import NavMenu from './components/navmenu.vue'
import userMenu from './components/userMenu.vue'
import kinerjaMenu from './components/kinerjaMenu.vue'

// Page Components
import Header from './views/layouts/header.vue'
import IndexExplore from './views/pages/index/IndexExplore.vue'
import IndexCategory from './views/pages/index/IndexCategory.vue'
import Indexfeatured from './views/pages/index/IndexFeatured.vue'
import IndexPopular from './views/pages/index/IndexPopular.vue'
import IndexAds from './views/pages/index/IndexAds.vue'
import IndexCta from './views/pages/index/IndexCTA.vue'
import IndexClient from './views/pages/index/IndexClient.vue'
import IndexPartners from './views/pages/index/IndexPartners.vue'
import IndexPricing from './views/pages/index/IndexPricing.vue'
import IndexBlog from './views/pages/index/IndexBlog.vue'
import Foot from './views/pages/Footer.vue'
import Scroll from './views/pages/Scroll.vue'
import AboutContent from './views/pages/about/AboutContent.vue'
import AboutPopular from './views/pages/about/AboutPopular.vue'
import AboutPartners from './views/pages/about/AboutPartners.vue'
import AddListing from './views/pages/add-listing/AddListing.vue'
import BlogContent from './views/pages/blog/blog-details/BlogContent.vue'
import BlogGridSidebar from './views/pages/blog/blog-grid-sidebar/BlogGridSidebar.vue'
import BlogGridList from './views/pages/blog/blog-grid/BlogGridList.vue'
import BlogListSidebar from './views/pages/blog/blog-list-sidebar/BlogListSidebar.vue'
import BlogList from './views/pages/blog/blog-list/BlogList.vue'
import BookContent from './views/pages/bookmarks/BookmarkContent.vue'
import CategoriesList from './views/pages/categories/CategoriesList.vue'
import ContactInfo from './views/pages/contact/ContactInformation.vue'
import FaqContent from './views/pages/faq/FaqContent.vue'
import ForgotPassword from './views/pages/forgot-password/ForgotPassword.vue'
import Gallerypage from './views/pages/gallery/GalleryPage.vue'
import HowWorks from './views/pages/howitworks/Works.vue'
import HowItPricing from './views/pages/howitworks/Pricing.vue'
import ListGridSidebar from './views/pages/list/listing-grid-sidebar/ListingGridSidebar.vue'
import Listgrid from './views/pages/layananMenu/DashboardContent.vue'
import ListContent from './views/pages/list/listing-list-sidebar/ListContent.vue'
import ListMapContent from './views/pages/list/listingmap-grid/ListingmapContent.vue'
import ListinglistContent from './views/pages/list/listingmap-list/ListingListContent.vue'
import LoginForm from './views/pages/Login/LoginForm.vue'
import PricingPlan from './views/pages/pricing/PricingPlan.vue'
import PrivacyPolicy from './views/pages/privacy-policy/PrivacyTerms.vue'

import ServiceGallery from './views/pages/service-details/ServiceGallery.vue'
import ServiceDescription from './views/pages/service-details/ServiceDescription.vue'
import ServiceContent from './views/pages/service-details/ServiceContent.vue'
import SignupLogin from './views/pages/signup/SignupLogin.vue'
import TermsContent from './views/pages/terms-conditions/TermsContent'
import IndexWedding from './views/pages/indextwo/indexwedding.vue'
import IndexCelebrate from './views/pages/indextwo/indexCelebrate.vue'
import IndexVendor from './views/pages/indextwo/indexVendor.vue'
import IndexPackage from './views/pages/indextwo/indexPackage.vue'
import IndexPortfolio from './views/pages/indextwo/indexPortfolio.vue'
import IndexTimeline from './views/pages/indextwo/indexTimeline.vue'
import WeddingIndexBlog from './views/pages/indextwo/indexBlog.vue'
import IndexAppointment from './views/pages/indextwo/indexAppointment.vue'
import WeddingFooter from './views/pages/indextwo/footer/footer.vue'

import IndexHome from './views/pages/home/indexHome.vue'
import IndexThreeDestination from './views/pages/home/indexDestination.vue'
import IndexOffer from './views/pages/home/indexOffer.vue'
import IndexPromo from './views/pages/home/indexPromo.vue'
import IndexTestimonial from './views/pages/home/indexTestimonial.vue'
import IndexPrice from './views/pages/home/indexPrice.vue'
import IndexSubscribe from './views/pages/home/indexSubscribe.vue'
import IndexActivity from './views/pages/home/indexActivity'
import IndexDesc from './views/pages/home/IndexDesc.vue'
import NavThreeFooter from './views/pages/home/footer.vue'

import IndexNow from './views/pages/indexfour/indexNow.vue'
import IndexCowork from './views/pages/indexfour/indexCowork.vue'
import IndexSpace from './views/pages/indexfour/indexSpace.vue'
import IndexFourClient from './views/pages/indexfour/indexFourClient.vue'
import IndexFourPricing from './views/pages/indexfour/indexFourPricing.vue'
import IndexFourBlog from './views/pages/indexfour/indexFourBlog.vue'
import IndexFourFooter from './views/pages/indexfour/footer.vue'
import RecommendSlide from './views/pages/home/recommendSlide.vue'
import NextTripSlide from './views/pages/home/nextTripSlide.vue'

import IndexDiscover from './views/pages/indexfive/indexDiscover.vue'
import IndexBusiness from './views/pages/indexfive/indexBusiness.vue'
import IndexFiveSpace from './views/pages/indexfive/indexSpace.vue'
import IndexFiveClient from './views/pages/indexfive/indexClient.vue'
import IndexFiveFooter from './views/pages/indexfive/footer.vue'
import ServiceReview from './views/pages/service-details/serviceReview.vue'

//profil
import MessageContent from './views/pages/messages/MessageContent.vue'
import MyListing from './views/pages/my-listing/MyListing.vue'
import Dashboard from './views/pages/dashboard/DashboardContent.vue'
import ProfileDashboard from './views/pages/profile/ProfileDashboard.vue'
import ReviewDashboard from './views/pages/reviews/ReviewDashboard.vue'
import JanjiTemu from './views/pages/profile/JanjiTemu.vue'
import UserData from './views/pages/profile/UserData.vue'
import KegiatanHarian from './views/pages/profile/KegiatanHarian.vue'
import LaporanKinerja from './views/pages/profile/LaporanKinerja.vue'
import KinerjaBawahan from './views/pages/profile/KinerjaBawahan.vue'
import slipGajix from './views/pages/profile/SlipGajix.vue'

//satudata
import SatudataHome from './views/pages/satudata/SatuDataHome.vue'

//Pelayanan
import pelayananList from './views/pages/layananMenu/pelayananList.vue'
import layananMenu from './views/pages/layananMenu/layananMenu.vue'
import satkerList from './views/pages/satuanKerja/satkerList.vue'
import asnList from './views/pages/satuanKerja/asnList.vue'
import KantorData from './views/pages/satuanKerja/kantorData.vue'
import satkerMenu from './components/satkerMenu.vue'
import detailSatker from './views/pages/satuanKerja/detailSatker.vue'
import detailList from './views/pages/satuanKerja/detailList.vue'
import menuList from './views/pages/InternalKantor/menuList.vue'
import kategoriTamu from './views/pages/InternalKantor/kategoriTamu.vue'
import internalSatker from './views/pages/InternalKantor/internalSatker.vue'
import addBukuTamu from './views/pages/InternalKantor/addBukuTamu.vue'
import listPetugas from './views/pages/InternalKantor/listPetugas.vue'
import listPetugas2 from './views/pages/layananMenu/listPetugas2.vue'
import rateUs from './views/pages/InternalKantor/rateUs.vue'
import layananDetail from './views/pages/layananMenu/layananDetail.vue'
import addRequest from './views/pages/layananMenu/addRequest.vue'
import uploadSyarat from './views/pages/layananMenu/uploadSyarat.vue'
import addAppointment from './views/pages/layananMenu/addAppointment.vue'
import satuData from './views/pages/layananMenu/satuData.vue'
import pengaduanMenu from './views/pages/layananMenu/pengaduanMenu.vue'
import persuratanMenu from './views/pages/layananMenu/persuratanMenu.vue'
import peraturanSE from './views/pages/layananMenu/peraturanSE.vue'

//keuangan
import keuanganMenu from './views/pages/layananMenu/keuanganMenu/keuanganMenu.vue';
import presensiMenu from './views/pages/layananMenu/keuanganMenu/presensiMenu.vue';
import amprahDoc from './views/pages/layananMenu/keuanganMenu/amprahDoc.vue';
import amprahGaji from './views/pages/layananMenu/keuanganMenu/amprahGaji.vue';
import dipaList from './views/pages/layananMenu/keuanganMenu/dipaList.vue';
import listKeuangan from './views/pages/layananMenu/keuanganMenu/listKeuangan.vue';
import docKeuangan from './views/pages/layananMenu/keuanganMenu/docKeuangan.vue'
import laporanKeuangan from './views/pages/layananMenu/keuanganMenu/laporanKeuangan.vue'
import docAudit from './views/pages/layananMenu/keuanganMenu/docAudit.vue'
import rekapPresensi from './views/pages/layananMenu/keuanganMenu/rekapPresensi.vue';

//cPanel
import adminMenu from './views/pages/adminpanel/adminMenu.vue'
import listRequest from './views/pages/adminpanel/listRequest.vue'
import detailRequest from './views/pages/adminpanel/detailRequest.vue'
import detailTamu from './views/pages/tamu/detailTamu.vue'
import verifCKH from './views/pages/adminpanel/LaporanKinerja.vue'
import adminSatker from './views/pages/adminpanel/SatuanKerja.vue'
import listSatker from './views/pages/adminpanel/ListSatker.vue'
import rekapKinerja from './views/pages/adminpanel/RekapKinerja.vue'
import allRekapKinerja from './views/pages/adminpanel/allRekapKinerja.vue'
import slipGaji from './views/pages/adminpanel/SlipGaji.vue'

// Breadcrumbs 
import BreadCrumb from './components/breadcrumb/Component.vue'
import AboutBreadcrumb from './components/breadcrumb/AboutBreadcrumb.vue'

// plugins
// import './assets/js/map.js'
import 'aos/dist/aos.css'
import './assets/js/backToTop.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
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

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$toast = Toast;
app.config.globalProperties.$assets = assetSrc;
app.component('Layouts',Header)
app.component('Navbar',Navbar)
app.component('Usernavbar',UserNavbar)
app.component('Navbartwo',NavbarTwo)
app.component('NavbartwoHeader',NavbarTwoHeader)
app.component('Navbarthree',NavbarThree)
app.component('Navbarfour',NavbarFour)
app.component('Navbarfive',NavbarFive)
app.component('Navmenu',NavMenu)
app.component('UserMenu',userMenu)
app.component('KinerjaMenu',kinerjaMenu)

app.component('Indexcategory',IndexCategory)
app.component('Indexexplore',IndexExplore)
app.component('Indexfeatured',Indexfeatured)
app.component('Indexpopular',IndexPopular)
app.component('Indexads',IndexAds)
app.component('Indexcta',IndexCta)
app.component('Indexclient',IndexClient)
app.component('Indexpartners',IndexPartners)
app.component('Indexpricing',IndexPricing)
app.component('Indexblog',IndexBlog)
app.component('Foot',Foot)
app.component('Scroll',Scroll)
app.component('Aboutcontent',AboutContent)
app.component('Aboutpopular',AboutPopular)
app.component('Aboutpartners',AboutPartners)
app.component('Addlisting',AddListing)
app.component('Blogcontent',BlogContent)
app.component('Bloggridsidebar',BlogGridSidebar)
app.component('Bloggridlist',BlogGridList)
app.component('Bloglistsidebar',BlogListSidebar)
app.component('Bloglist',BlogList)
app.component('Bookmarkcontent',BookContent)
app.component('Categorieslist',CategoriesList)
app.component('Contactinformation',ContactInfo)
app.component('Faqcontent',FaqContent)
app.component('Forgotpassword',ForgotPassword)
app.component('Gallerypage',Gallerypage)
app.component('Howworks',HowWorks)
app.component('Howitpricing',HowItPricing)
app.component('Listgridsidebar',ListGridSidebar)
app.component('Listgrid',Listgrid)
app.component('Listcontent',ListContent)
app.component('Listmapcontent',ListMapContent)
app.component('Litinglistcontent',ListinglistContent)
app.component('Loginform',LoginForm)
app.component('Messagecontent',MessageContent)
app.component('Pricingplan',PricingPlan)
app.component('Privacypolicy',PrivacyPolicy)
app.component('Servicegallery',ServiceGallery)
app.component('Servicedescription',ServiceDescription)
app.component('Servicecontent',ServiceContent)
app.component('Signuplogin',SignupLogin)
app.component('Termscontent',TermsContent)
app.component('Indexwedding',IndexWedding)
app.component('Indexcelebrate',IndexCelebrate)
app.component('Indexvendor',IndexVendor)
app.component('Indexpackage',IndexPackage)
app.component('Indexportfolio',IndexPortfolio)
app.component('Indextimeline',IndexTimeline)
app.component('Weddingindexblog',WeddingIndexBlog)
app.component('Indexappointment',IndexAppointment)
app.component('Weddingfooter',WeddingFooter)

app.component('Indexhome',IndexHome)
app.component('IndexDesc',IndexDesc)
app.component('Indexthreedestination',IndexThreeDestination)
app.component('Indexoffer',IndexOffer)
app.component('Indexpromo',IndexPromo)
app.component('Indextestimonial',IndexTestimonial)
app.component('Indexprice',IndexPrice)
app.component('Indexsubscribe',IndexSubscribe)
app.component('Indexactivity',IndexActivity)
app.component('Navbarthreefooter',NavThreeFooter)

app.component('Indexnow',IndexNow)
app.component('Indexcowork',IndexCowork)
app.component('Indexspace',IndexSpace)
app.component('Indexfourclient',IndexFourClient)
app.component('Indexfourpricing',IndexFourPricing)
app.component('Indexfourblog',IndexFourBlog)
app.component('Indexfourfooter',IndexFourFooter)
app.component('Recommendslide',RecommendSlide)

app.component('Nexttripslide',NextTripSlide)

app.component('Indexdiscover',IndexDiscover)
app.component('Indexbusiness',IndexBusiness)
app.component('Indexfivespace',IndexFiveSpace)
app.component('Indexfiveclient',IndexFiveClient)
app.component('Indexfivefooter',IndexFiveFooter)
app.component('Servicereview',ServiceReview)

//profil
app.component('Profiledashboard',ProfileDashboard)
app.component('Reviewdashboard',ReviewDashboard)
app.component('Mylisting',MyListing)
app.component('Dashboardcontent',Dashboard)
app.component('JanjiTemu',JanjiTemu)
app.component('UserData',UserData)
app.component('KegiatanHarian',KegiatanHarian)
app.component('LaporanKinerja',LaporanKinerja)
app.component('KinerjaBawahan',KinerjaBawahan)
app.component('SlipGajix',slipGajix)

//satudata
app.component('SatuDataHome',SatudataHome)

//Pelayanan
app.component('pelayananList',pelayananList)
app.component('layananMenu',layananMenu)
app.component('satkerList', satkerList)
app.component('asnList', asnList)
app.component('KantorData', KantorData)
app.component('satkermenu',satkerMenu)
app.component('DetailSatker',detailSatker)
app.component('DetailList',detailList)
app.component('MenuList',menuList)
app.component('KategoriTamu', kategoriTamu)
app.component('InternalSarker',internalSatker)
app.component('addBukuTamu',addBukuTamu)
app.component('ListPetugas',listPetugas)
app.component('ListPetugas2',listPetugas2)
app.component('RateUs',rateUs)
app.component('star-rating',StarRating)
app.component('LayananDetail',layananDetail)
app.component('AddRequest',addRequest)
app.component('UploadSyarat',uploadSyarat)
app.component('AddAppointment',addAppointment)
app.component('SatuData',satuData)
app.component('PengaduanMenu',pengaduanMenu)
app.component('PersuratanMenu',persuratanMenu)
app.component('PeraturanSE',peraturanSE)

//Keuangan
app.component('keuanganMenu', keuanganMenu)
app.component('presensiMenu', presensiMenu)
app.component('amprahGaji', amprahGaji)
app.component('amprahDoc', amprahDoc)
app.component('dipaList',dipaList)
app.component('docKeuangan',docKeuangan)
app.component('listKeuangan',listKeuangan)
app.component('laporanKeuangan',laporanKeuangan)
app.component('docAudit',docAudit)
app.component('rekapPresensi',rekapPresensi)

//cPanel
app.component('AdminMenu', adminMenu)
app.component('ListRequest', listRequest)
app.component('DetailRequest', detailRequest)
app.component('DetailTamu', detailTamu)
app.component('VerifCKH',verifCKH)
app.component('adminSatker',adminSatker)
app.component('ListSatker',listSatker)
app.component('RekapKinerja',rekapKinerja)
app.component('AllRekapKinerja',allRekapKinerja)
app.component('SlipGaji',slipGaji)

// Breadcrumb
app.component('Breadcrumb',BreadCrumb)
app.component('Aboutbreadcrumb',AboutBreadcrumb)
app.component('VueDatePicker',VueDatePicker)

.use(BootstrapVue3)
.use(BToastPlugin)
.use(Antd)
.use(AOS.init())
app.use(VueEasyLightbox);
app.use(VueSignaturePad);
app.use(bottomNavigationVue);
app.use(pdfjsLib);
app.use(VueCryptojs);
app.use(CoolLightBox);
app.use(VueApexCharts);
app.use(VueCarousel);
app.use(router).mount('#app');