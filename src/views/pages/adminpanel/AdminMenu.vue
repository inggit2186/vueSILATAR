<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <div class="categorieslist-section">
                <div class="container ">
                    <div class="row">
                        <div v-if="loading" class="text-center">
							<hr>
							<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
							<br>
							<i-svg-spinners-bars-scale style="font-size: 2em;"/>
							<h3>:::Mohon Tunggu Sebentar :::</h3>
							<hr>
						</div>
                        <div v-else v-for="item in submenu" :key="item.id" class="col-lg-4 col-md-4 centered">
                            <router-link :to='"/listreq/"+item.id'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/'+item.id+'.png'" style="width:100%;" alt="car1" @error="handleBrokenImage(item)">
                                <h6>{{ item.nama }}</h6>
                                <span>{{ item.deskripsi }}</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <hr/>
                        <div class="col-lg-4 col-md-4 centered">
                            <router-link to='/listreq/777'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/777.png'" style="width:100%;" alt="car1">
                                <h6>Konsultasi</h6>
                                <span>Layanan Konsultasi / Appointment Pegawai Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <router-link to='/listreq/888'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/888.png'" style="width:100%;" alt="car1">
                                <h6>Pengaduan</h6>
                                <span>Layanan Pengaduan yang masuk dari StakeHolder / Pengguna</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-4 col-md-4 centered">
                            <router-link to='/listreq/999'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/999.png'" style="width:100%;" alt="car1">
                                <h6>Lainnya</h6>
                                <span>Menu Untuk Aplikasi Layanan Lainnya</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            title: "Menu Pilihan",
            text: "Home",
            text1: "Buku Tamu",
            name: "/",
            loading: false,
            submenu: []
        };
    },
    created() {
        this.getSubMenu()
    },
    methods: {
        async getSubMenu() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getSubmenu',{headers})
				this.submenu = response.data.data
                console.log(this.submenu)
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
        handleBrokenImage(item) {
			item.layanan_id = 'o-1';
		},
    }
}
</script>