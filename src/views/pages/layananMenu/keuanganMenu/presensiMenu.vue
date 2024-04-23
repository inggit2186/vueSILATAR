<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <!-- Categories Section -->
                <div class="categorieslist-section">
                    <div class="container ">
                        <div class="row">
                            <div class="col-lg-4 col-md-4 centered">
                                <router-link to="/cashbon">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/presensi.png'" style="width:100%;" alt="car1">
                                    <span>Presensi</span>
                                    </a>
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-4 col-md-4 centered">
                                <router-link to="/kinerja-harian">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/uangmakan.png'" style="width:100%;" alt="car1">
                                    <span>Uang Makan</span>
                                    </a>
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-4 col-md-4 centered">
                                <router-link to="/presensi">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/tukin.png'" style="width:100%;" alt="car1">
                                    <span>Tunjangan Kinerja</span>
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
            title: "Rekap Presensi",
            text: "Home",
            text1: "Layanan",
            text2: "Presensi",
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