<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper admin-menu-page theme-report-shell">
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
                        <div v-for="item in submenu" v-else :key="item.id" class="col-lg-4 col-md-4 centered">
                            <router-link class="admin-menu-link" :to="adminLayanan(item.id)">
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/'+item.id+'.png'" style="width:100%;" alt="car1" @error="handleBrokenImage(item)">
                                <h6>{{ item.nama }}</h6>
                                <span>{{ item.deskripsi }}</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <hr/>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/admin/laporanketidakhadiran'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/presensi.png'" style="width:100%;" alt="car1">
                                <h6>Laporan Presensi</h6>
                                <span>Laporan Presensi Pegawai Jajaran Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" :to='tujuLayanan()'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/LaporanKinerja.png'" style="width:100%;" alt="car1">
                                <h6>Laporan Kinerja</h6>
                                <span>Verifikasi Laporan Kinerja Pegawai Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/verif/humas/getKUA'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/humas.png'" style="width:100%;" alt="car1">
                                <h6>Laporan Kehumasan</h6>
                                <span>Verifikasi Laporan Kehumasan Jajaran Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/slipgaji'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/516.png'" style="width:100%;" alt="car1">
                                <h6>Slip Gaji</h6>
                                <span>Rekap Slip Gaji Pegawai Jajaran Kantor Kementerian Agama Kabupaten Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/verif/kinerja/getKUA'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/518.png'" style="width:100%;" alt="car1">
                                <h6>Penilaian Kinerja</h6>
                                <span>Rekap Penilain Kinerja Jajaran Kantor Kementerian Agama Kabupaten Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/penilaianskp'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/517.png'" style="width:100%;" alt="car1">
                                <h6>Penilaian SKP</h6>
                                <span>Rekap Penilain SKP Jajaran Kantor Kementerian Agama Kabupaten Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/listreq/777'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/777.png'" style="width:100%;" alt="car1">
                                <h6>Konsultasi & Appointment</h6>
                                <span>Layanan Konsultasi / Appointment Pegawai Kantor Kementerian Agama Kab.Tanah Datar</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/listreq/888'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/888.png'" style="width:100%;" alt="car1">
                                <h6>Pengaduan</h6>
                                <span>Layanan Pengaduan yang masuk dari StakeHolder / Pengguna</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/listreq/999'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/999.png'" style="width:100%;" alt="car1">
                                <h6>Lainnya</h6>
                                <span>Menu Untuk Aplikasi Layanan Lainnya</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <div class="col-lg-3 col-md-3 centered">
                            <router-link class="admin-menu-link" to='/admin/madrasah'>
                            <div class="listMenu categories-content">
                                <div class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                <img :src="$assets+'/img/ikon/518.png'" style="width:100%;" alt="admin-madrasah">
                                <h6>Fitur Madrasah</h6>
                                <span>Kelola profil, pegawai, guru, laporan semester, dan laporan bulanan madrasah dari panel admin</span>
                                </div>								   
                            </div>
                            </router-link>
                        </div>
                        <hr/>
                        <div v-for="itemx in paginatedLayanan" :key="itemx.id" class="col-lg-3 col-md-4 centered">
							<router-link class="admin-menu-link" :to='"/listreq/"+itemx.id'>
							<div class="categories-content">
								<div class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="$assets+'/img/ikon/'+itemx.imgid+'.png'" style="width:80%;" alt="car1" @error="handleBrokenImage(itemx)">
								<h6>{{ itemx.nama }}</h6>
								<span>{{ itemx.deskripsi }}</span>
								</div>								   
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

<style scoped>
.admin-menu-page {
  background:
    radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 42%),
    radial-gradient(circle at bottom right, rgba(200, 155, 60, 0.08), transparent 28%),
    linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
}

.admin-menu-page .categorieslist-section {
  padding: 1rem 0 2.75rem;
  background:
    radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 42%),
    radial-gradient(circle at bottom right, rgba(200, 155, 60, 0.08), transparent 28%),
    linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%) !important;
}

.admin-menu-page .admin-menu-link,
.admin-menu-page .admin-menu-link:visited,
.admin-menu-page .admin-menu-link:hover,
.admin-menu-page .admin-menu-link:focus {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none !important;
  color: #0f172a !important;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 255, 0.96)) !important;
  background-color: #ffffff !important;
  border: 1px solid rgba(31, 95, 191, 0.12) !important;
  border-radius: 22px !important;
  box-shadow: 0 16px 30px rgba(31, 95, 191, 0.08) !important;
  overflow: hidden !important;
}

.admin-menu-page .admin-menu-link .listMenu.categories-content,
.admin-menu-page .admin-menu-link .categories-content {
  display: block;
  min-height: 210px;
  background: transparent !important;
  background-color: transparent !important;
  border: 0 !important;
  border-radius: 22px !important;
  box-shadow: none !important;
  color: #0f172a !important;
  overflow: hidden;
}

.admin-menu-page :deep(.listMenu.categories-content),
.admin-menu-page :deep(.categories-content) {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 255, 0.96)) !important;
  background-color: #ffffff !important;
  border: 1px solid rgba(31, 95, 191, 0.12) !important;
  border-radius: 22px;
  box-shadow: 0 16px 30px rgba(31, 95, 191, 0.08);
  color: #0f172a;
}

.admin-menu-page .admin-menu-link img {
  filter: drop-shadow(0 6px 12px rgba(31, 95, 191, 0.12));
}

.admin-menu-page .admin-menu-link,
.admin-menu-page .admin-menu-link h6,
.admin-menu-page .admin-menu-link span {
  color: #0f172a !important;
}

.admin-menu-page .admin-menu-link * {
  color: inherit !important;
  background-color: transparent !important;
}

.admin-menu-page .admin-menu-link h6 {
  font-weight: 800;
  text-shadow: none;
}

.admin-menu-page .admin-menu-link span {
  color: #475569 !important;
}

.admin-menu-page .admin-menu-link:hover,
.admin-menu-page .admin-menu-link:focus,
.admin-menu-page .admin-menu-link:hover .listMenu.categories-content,
.admin-menu-page .admin-menu-link:focus .listMenu.categories-content {
  transform: translateY(-2px);
  border-color: rgba(31, 95, 191, 0.2);
  box-shadow: 0 22px 34px rgba(31, 95, 191, 0.12);
}

.admin-menu-page .admin-menu-link:hover,
.admin-menu-page .admin-menu-link:focus {
  text-decoration: none;
}

.admin-menu-page :deep(.page-link) {
  background: rgba(255, 255, 255, 0.96);
  border-color: rgba(31, 95, 191, 0.14);
  color: #1f5fbf;
}

.admin-menu-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #1f5fbf, #c89b3c);
  border-color: transparent;
  color: #ffffff;
}
</style>

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
    created() {
        this.getSubMenu()
    },
    methods: {
        tujuLayanan() {
            const user = JSON.parse(localStorage.getItem('user'))
            if(user.dept_id == 4 || user.dept_id == 102){
                return "/verif/ckh/getSeksi";
            }else if(user.dept_id == 8){
                return "/verif/ckh/getKUA";
            }else if(user.dept_id == 7){
                return "/verif/ckh/getMIN";
            }else if(user.dept_id == 5){
                return "/ckh/ckh/999"
            }else{
                this.$toast.fire({
						title: "Anda Tidak Memiliki Akses ke Bagian Ini!!",
						icon: 'error',
					})
            }
        },
        adminLayanan(id) {
            if(id == 1077){
                return "/rekaplaporan/KUA/all";
            }else if(id == 1080){
                return "/rekaplaporan/Penyuluh/pns";
            }else if(id == 1037){
                return "/rekappemberkasan/1037/998/1";
            }else if(id == 1038){
                return "/rekappemberkasan/1038/998/1";
            }else if(id == 1081){
                return "/verif/1081/getMIN";
            }else if(id == 1082){
                return "/rekappemberkasan/1082/998/1";
            }else{
                return `/listreq/${id}`
            }
        },
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
