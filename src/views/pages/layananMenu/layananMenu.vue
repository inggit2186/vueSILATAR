<template>
    <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container ">
		        <div v-if="navid==4" class="row">
					<div class="col-lg-4 col-md-4 centered">
                        <router-link :to="routeLayanan()">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/506.png'" style="width:100%;" alt="car1">
                            <span>Untuk Pelayanan Umum Kantor Kementerian Agama Kab.Tanah Datar</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 centered">
                        <router-link to='/keuangan'>
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/keu001.png'" style="width:100%;" alt="car1">
                            <span>Layanan pada Bagian Keuangan</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 centered">
                        <router-link :to="routeLayanan()">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/up001.png'" style="width:100%;" alt="car1">
                            <span>Layanan pada Bagian Kepegawaian</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
                </div>
                <div v-else class="row">
					<div class="col-lg-4 col-md-4 centered">
                        <router-link :to="routeLayanan()">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/506.png'" style="width:100%;" alt="car1">
                            <span>Untuk Pelayanan Umum Kantor Kementerian Agama Kab.Tanah Datar</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
                </div>
                        <hr/>
                <div class="row">
                    <div class="col-lg-4 col-md-4 centered">
                        <router-link :to="routeSatuData()">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/507.png'" style="width:100%;" alt="car1">
                            <span>Halaman Kumpulan Data Kantor Kementerian Agama Kab.Tanah Datar</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 centered">
                        <router-link :to="routeAppoint()">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/508.png'" style="width:100%;" alt="car1">
                            <span>Rencanakan Pertemuan Anda dengan Pejabat/Staff Kantor</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
				</div>
			</div>
		</div>
		<!-- /Categories Section -->	
</template>
<script>
export default {
    computed: {
		routeLayanan() {
			return id => `/Layanan/${this.navid}`
    	},
        routeSatuData() {
            return id => `/satkerdata/${this.navid}`
        },
        routeAppoint() {
            return id => `/Appointment/${this.navid}`
        }
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