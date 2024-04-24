<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <!-- Categories Section -->
                <div class="categorieslist-section">
                    <div class="container ">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/gajiinduk">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu005.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Gaji Induk</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/gajisusulan">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu006.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Gaji Susulan</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/kekurangangaji">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu012.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Kekurangan Gaji</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/gajiterusan">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu007.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Gaji Terusan</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/uangmakan">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu008.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Uang Makan</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/tukin">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu009.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Tunjangan Kinerja</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/tpg">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu010.png'" style="width:100%;" alt="car1">
                                    <span>Amprah TPG</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah/selisihtukin">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu011.png'" style="width:100%;" alt="car1">
                                    <span>Amprah Selisih Tukin</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            <!-- /Categories Section -->
            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: JSON.parse(localStorage.getItem('user')),
            title: "Rekap Amprah",
            text: "Home",
            text1: "Keuangan",
            text2: "Amprah",
            name: "/",
        };
    },
    created() {
        this.navid = this.$route.params.id
        window.scrollTo(0,0)
    }
}
</script>

<style>
.listMenu img{
    width: 70%;
    height: 70%;
    margin-bottom: 5px;
}
.listMenu h6{
    font-size: 130%;
    font-weight: 600;
    margin-bottom: 5px;
}
</style>