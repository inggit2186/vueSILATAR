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
                                <router-link :to="routeDok('dipa')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu017.png'" style="width:100%;" alt="car1">
                                    <span>Daftar Isian Pelaksanaan Anggaran (DIPA)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('pok')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu018.png'" style="width:100%;" alt="car1">
                                    <span>Petunjuk Operasional Kegiatan (POK)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('tor')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu019.png'" style="width:100%;" alt="car1">
                                    <span>Term of Reference (TOR) / Kerangka Acuan Kerja (KAK)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('rab')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu027.png'" style="width:100%;" alt="car1">
                                    <span>Rencana Anggaran Biaya (RAB)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('spmls')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu020.png'" style="width:100%;" alt="car1">
                                    <span>Surat Perintah Membayar (SPM LS)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('spmup')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu021.png'" style="width:100%;" alt="car1">
                                    <span>Surat Perintah Membayar (SPM UP)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('sppls')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu022.png'" style="width:100%;" alt="car1">
                                    <span>Surat Perintah Pembayaran (SPP LS)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('sppup')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu023.png'" style="width:100%;" alt="car1">
                                    <span>Surat Perintah Pembayaran (SPP UP)</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('lainnya')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu024.png'" style="width:100%;" alt="car1">
                                    <span>Lain-Lainnya</span>
                                    </a>								   
                                </div>
                                </router-link>
                            </div>
                            <div class="col-lg-3 col-md-3 centered">
                                <router-link :to="routeDok('laporanKeuangan')">
                                <div class="listMenu categories-content">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                    <img :src="$assets+'/img/ikon/keu025.png'" style="width:100%;" alt="car1">
                                    <span>Laporan Keuangan</span>
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
            title: "DIPA Keuangan",
            text: "Home",
            text1: "Keuangan",
            text2: "DIPA",
            name: "/",
        };
    },
    computed: {
        routeDok(id) {
			return id => `/dipa/${this.navid}/${id}`
    	},
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