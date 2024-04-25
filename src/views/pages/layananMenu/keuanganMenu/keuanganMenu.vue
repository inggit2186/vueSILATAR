<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <!-- Categories Section -->
                <div class="categorieslist-section">
                    <div class="container ">
                        <div class="row">
                            <div v-if="user.rtoken == '09e093049ee30'" class="col-lg-3 col-md-3 centered">
                                <router-link to="/suratedaran/Keuangan">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu002.png'" style="width:100%;" alt="car1">
                                    <span>Peraturan / Surat Edaran</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div v-if="user.rtoken == '09e093049ee30'" class="col-lg-3 col-md-3 centered">
                                <router-link to="/slipgaji">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/516.png'" style="width:100%;" alt="car1">
                                    <span>SLIP GAJI</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div v-else-if="user.rtoken == 'koks090421093'" class="col-lg-3 col-md-3 centered">
                                <router-link to="/cashbon">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/516.png'" style="width:100%;" alt="car1">
                                    <span>SLIP GAJI</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/presensi">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/presensi.png'" style="width:100%;" alt="car1">
                                    <span>Rekap Presensi</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div v-if="user.rtoken == '09e093049ee30'" class="col-lg-3 col-md-3 centered">
                                <router-link to="/verifckh">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/LaporanKinerja.png'" style="width:100%;" alt="car1">
                                    <span>Laporan Kinerja</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div v-else-if="user.rtoken == 'koks090421093'" class="col-lg-3 col-md-3 centered">
                                <router-link to="/kinerja-harian">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/LaporanKinerja.png'" style="width:100%;" alt="car1">
                                    <span>Laporan Kinerja</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/presensi">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/presensi.png'" style="width:100%;" alt="car1">
                                    <span>Laporan Kegiatan</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/presensi">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/presensi.png'" style="width:100%;" alt="car1">
                                    <span>Laporan Perjalanan Dinas</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/amprah">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu003.png'" style="width:100%;" alt="car1">
                                    <span>Dokumen Amprah</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/dipa">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu004.png'" style="width:100%;" alt="car1">
                                    <span>Dokumen Keuangan</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link to="/dipa">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu013.png'" style="width:100%;" alt="car1">
                                    <span>Dokumen AUDIT</span>
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
            title: "Layanan Keuangan",
            text: "Home",
            text1: "Layanan",
            text2: "Keuangan",
            name: "/",
        };
    },
    created() {
        this.navid = this.$route.params.id
        window.scrollTo(0,0)
    },
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