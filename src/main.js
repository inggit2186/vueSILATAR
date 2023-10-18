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
import Dashboard from './views/pages/dashboard/DashboardContent.vue'
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
import MessageContent from './views/pages/messages/MessageContent.vue'
import MyListing from './views/pages/my-listing/MyListing.vue'
import PricingPlan from './views/pages/pricing/PricingPlan.vue'
import PrivacyPolicy from './views/pages/privacy-policy/PrivacyTerms.vue'
import ProfileDashboard from './views/pages/profile/ProfileDashboard.vue'
import ReviewDashboard from './views/pages/reviews/ReviewDashboard.vue'
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

//Pelayanan
import pelayananList from './views/pages/layananMenu/pelayananList.vue'
import layananMenu from './views/pages/layananMenu/layananMenu.vue'
import satkerList from './views/pages/satuanKerja/satkerList.vue'
import KantorData from './views/pages/satuanKerja/kantorData.vue'
import satkerMenu from './components/satkerMenu.vue'
import detailSatker from './views/pages/satuanKerja/detailSatker.vue'
import detailList from './views/pages/satuanKerja/detailList.vue'
import menuList from './views/pages/InternalKantor/menuList.vue'
import kategoriTamu from './views/pages/InternalKantor/kategoriTamu.vue'
import internalSatker from './views/pages/InternalKantor/internalSatker.vue'
import addBukuTamu from './views/pages/InternalKantor/addBukuTamu.vue'
import listPetugas from './views/pages/InternalKantor/listPetugas.vue'
import rateUs from './views/pages/InternalKantor/rateUs.vue'

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

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
const assetSrc = new URL(`@/assets`, import.meta.url).href;

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
app.component('Dashboardcontent',Dashboard)
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
app.component('Mylisting',MyListing)
app.component('Pricingplan',PricingPlan)
app.component('Privacypolicy',PrivacyPolicy)
app.component('Profiledashboard',ProfileDashboard)
app.component('Reviewdashboard',ReviewDashboard)
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

//Pelayanan
app.component('pelayananList',pelayananList)
app.component('layananMenu',layananMenu)
app.component('satkerList', satkerList)
app.component('KantorData', KantorData)
app.component('satkermenu',satkerMenu)
app.component('DetailSatker',detailSatker)
app.component('DetailList',detailList)
app.component('MenuList',menuList)
app.component('KategoriTamu', kategoriTamu)
app.component('InternalSarker',internalSatker)
app.component('addBukuTamu',addBukuTamu)
app.component('ListPetugas',listPetugas)
app.component('RateUs',rateUs)
app.component('star-rating',StarRating)

// Breadcrumb
app.component('Breadcrumb',BreadCrumb)
app.component('Aboutbreadcrumb',AboutBreadcrumb)

.use(BootstrapVue3)
.use(BToastPlugin)
.use(Antd)
.use(AOS.init())
app.use(VueEasyLightbox);
app.use(CoolLightBox);
app.use(VueApexCharts);
app.use(VueCarousel);
app.use(router).mount('#app');