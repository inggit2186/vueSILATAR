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
                                    <router-link :to="routePengaduan(888)">
                                    <div class="listMenu categories-content">
                                        <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                        <img :src="$assets+'/img/ikon/510.png'" style="width:100%;" alt="car1">
                                        <span><b>Whistleblowing System (WBS) Kankemenag Kab.Tanah Datar</b></span>
                                        </a>								   
                                    </div>
                                    </router-link>
                                </div>
                                <div class="col-lg-4 col-md-4 centered">
                                    <div class="listMenu categories-content" @click="tujuLapor()">
                                        <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                        <img :src="$assets+'/img/ikon/509.png'" style="width:100%;" alt="car1">
                                        <span><b>Pengaduan lewat Lapor.go.id</b></span>
                                        </a>								   
                                    </div>
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
		routePengaduan() {
			return id => `/LayananDetail/${this.navid}/${id}`
    	},
        tujuLapor() {
            window.open('https://lapor.go.id/','_blank')
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