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
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link to='/listreq/777'>
                            <div class="listMenu categories-content">
                                <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/LaporanKinerja.png'" style="width:100%;" alt="car1">
                                <h6>Laporan Kinerja</h6>
                                <span>Verifikasi Laporan Kinerja Pegawai Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </a>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
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
                        <div class="col-lg-3 col-md-3 centered">
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
                        <div class="col-lg-3 col-md-3 centered">
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
                        <hr/>
                        <div v-for="itemx in paginatedLayanan" :key="itemx.id" class="col-lg-3 col-md-4 centered">
							<router-link :to='"/listreq/"+itemx.id'>
							<div class="categories-content">
								<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="$assets+'/img/ikon/'+itemx.imgid+'.png'" style="width:80%;" alt="car1" @error="handleBrokenImage(itemx)">
								<h6>{{ itemx.nama }}</h6>
								<span>{{ itemx.deskripsi }}</span>
								</a>								   
							</div>
							</router-link>
						</div>
                        <!--Pagination--> 
                        <div class="blog-pagination">
                            <nav>
                                <ul class="pagination">
                                    <li class="page-item previtem" :class="{'disabled': currentPage === 1}">
                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fas fa-regular fa-arrow-left"></i> Prev</a>
                                    </li>
                                    <li class="justify-content-center pagination-center"> 
                                        <div class="pagelink">
                                            <ul>
                                                <li v-for="page in displayedPages" :key="page" class="page-item" :class="{'active': currentPage === page}">
                                                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                                </li>
                                                <li class="page-item" :class="{'disabled': currentPage === totalPages}">
                                                    <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">...</a>
                                                </li>
                                            </ul>
                                        </div>													
                                    </li>													
                                    <li class="page-item nextlink" :class="{'disabled': currentPage === totalPages}">
                                        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next <i class="fas fa-regular fa-arrow-right"></i></a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <!--/Pagination-->
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
            itemsPerPage: 12,
        	currentPage: 1,
            submenu: [],
            layanan: []
        };
    },
    created() {
        this.getSubMenu()
    },
    computed: {
        paginatedLayanan() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.layanan.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.layanan.length / this.itemsPerPage);
        },
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
                this.layanan = response.data.data2

                console.log(this.layanan)
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
        changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
        handleBrokenImage(itemx) {
			itemx.imgid = 'o-'+(Math.floor(Math.random() * 16) + 1);
		}
    }
}
</script>