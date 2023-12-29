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
                                    <router-link :to="routePersonal(999)">
                                    <div class="listMenu categories-content">
                                        <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                        <img :src="$assets+'/img/ikon/512.png'" style="width:100%;" alt="car1">
                                        <span><b>Kirim Surat-Persuratan atas nama Personal / Pribadi</b></span>
                                        </a>								   
                                    </div>
                                    </router-link>
                                </div>
                                <div class="col-lg-4 col-md-4 centered">
                                    <router-link :to="routeInstansi(999)">
                                    <div class="listMenu categories-content">
                                        <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                        <img :src="$assets+'/img/ikon/511.png'" style="width:100%;" alt="car1">
                                        <span><b>Kirim Surat-Persuratan atas nama Instansi / Satuan Kerja</b></span>
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
            title: "Layanan",
            text: "Home",
            text1: "Unit Kerja",
            text2: "Pengaduan",
            name: "/",
        }
    },
    computed: {
		routePersonal() {
			return id => `/LayananDetail/Personal/${this.navid}/${id}`
    	},
        routeInstansi() {
			return id => `/LayananDetail/Instansi/${this.navid}/${id}`
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