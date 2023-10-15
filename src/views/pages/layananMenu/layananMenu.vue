<template>
    <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container ">
		        <div class="row">
					<div class="col-lg-4 col-md-4 centered">
                        <router-link :to="routeLayanan()">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/icons/category-3.svg'" alt="car1">
                            <h6>Layanan Umum</h6>
                            <span>Untuk Pelayanan Umum Kantor Kementerian Agama Kab.Tanah Datar</span>
                            </a>								   
                        </div>
                        </router-link>
                    </div>
                    <div class="col-lg-4 col-md-4 centered">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/icons/category-13.svg'" alt="car1">
                            <h6>Satu Data</h6>
                            <span>Halaman Kumpulan Data Kantor Kementerian Agama Kab.Tanah Datar</span>
                            </a>								   
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 centered">
                        <div class="listMenu categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/icons/category-6.svg'" alt="car1">
                            <h6>Appointment</h6>
                            <span>Rencanakan Pertemuan Anda dengan Pejabat/Staff Kantor</span>
                            </a>								   
                        </div>
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
			console.log(this.navid)
        	return id => `/Layanan/${this.navid}`
    	},
	},
    created() {
        this.navid = this.$route.params.id
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