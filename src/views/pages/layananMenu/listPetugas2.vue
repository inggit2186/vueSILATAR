<template>
    <div class="main-wrapper">

        <div class="page-wrapper">
            <layouts></layouts>
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>

            <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container text-center">
                <div ref="scroll1st" class="pagination">
                    <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <div class="text-center">
					<h1><i-line-md-reddit-loop/> Kemanakah Tujuan Anda?</h1>
				</div>
		        <div class="row" :disabled="loading">
                    <div v-if="!loading" class="col-lg-3 col-md-4 centered">
                        <div class="categories-content" @click.prevent="addTamu('satker',satker.id)">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="$assets+'/img/ikon/505.png'" style="width:50%;border-radius: 50%;" alt="car1">
                            <h6>Langsung ke Bagian Seksi</h6>
                            <h7><i-ic-baseline-badge /> {{ satker.nama ?? satker.instansi }}</h7>
                            <span style="font-size:14px">Jika Anda ingin bertamu/konsultasi ke bagian Seksi / tanpa ke salah satu spesifik orang</span>
                            </a>								   
                        </div>
                    </div>
                    <hr/>
                    <div v-if="!loading && kepala != '<NoData>'" class="col-lg-3 col-md-4 centered">
                        <div class="categories-content" @click.prevent="addTamu('asn',item.nomor_induk)">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="satker.kepalapp" style="width:50%;border-radius: 50%;" alt="car1">
                            <h6>{{ kepala.name }}</h6>
                            <h7><i-healthicons-city-worker/>KEPALA</h7>
                            <span style="font-size:14px">{{ kepala.pekerjaan }}</span>
                            </a>								   
                        </div>
                    </div>
                    <div v-if="!loading && kaur != '<NoData>'" class="col-lg-3 col-md-4 centered">
                        <div class="categories-content" @click.prevent="addTamu('asn',item.nomor_induk)">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="satker.kaurpp" style="width:50%;border-radius: 50%;" alt="car1">
                            <h6>{{ kaur.name }}</h6>
                            <h7><i-healthicons-city-worker-outline/>KAUR</h7>
                            <span style="font-size:14px">{{ kaur.pekerjaan }}</span>
                            </a>								   
                        </div>
                    </div>
					<div v-if="loading" class="text-center">
						<hr>
						<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
						<br>
						<i-svg-spinners-bars-scale style="font-size: 2em;"/>
						<h3>::: Mohon Tunggu Pegawai nya dulu :::</h3>
						<hr>
					</div>
					<div v-for="item in paginatedLayanan" v-else :key="item.id" class="col-lg-3 col-md-4 centered">
                        <div class="categories-content" @click.prevent="addTamu('asn',item.nomor_induk)">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="item.pp" style="width:50%;border-radius: 50%;" alt="car1">
                            <h6>{{ item.name }}</h6>
                            <span class="ads">{{ item.nomor_induk }}</span>
                            <span>{{ item.pekerjaan }}</span>
                            </a>								   
                        </div>
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
            title: "Daftar Pegawai",
            text: "Home",
            text1: "Satuan Kerja",
            text2: "Daftar Pegawai",
            name: "/",
            loading: false,
            random: null,
            itemsPerPage: 11,
            currentPage: 1,
            layanan: []
        }
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
        addTamuSatker() {
            return id => `/${this.$route.params.xid}/satker/${id}`;
        },
	},
	created() {
		this.getLayanan()
		this.random = this.randNo()
        this.nav = this.$route.params.id
        this.$nextTick(() => {
			this.$refs.scroll1st.scrollIntoView();
		});
	},
	methods: {
		addTamu(cat,itemid) {
			if(this.$route.params.xid == 'Konsultasi'){
        		this.$swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda merequest Konsultasi dengan Staff!!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Ya, Lanjutkan!",
                allowOutsideClick: true,
				preConfirm: async (konsultasi) => {
                    try {
                        const dept = this.$route.params.id
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addKonsul',{
                            tipe: cat,
                            dept: dept,
                            id: itemid,
                        }, {headers})

                        if(response.data.success == true){
                            return response.data.noreq
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$toast.fire({
                            title: 'Silahkan Chat Kami Disini !!!',
                            icon: "success"
                        });
                        this.$router.push(`/${this.$route.params.xid}/${cat}/${result.value}`)
                    }else{
                        return null;
                    }
            });
			}else{
				this.$router.push(`/${this.$route.params.xid}/${cat}/${itemid}`)
			}
    	},
		async getLayanan() {
			this.loading = true;
			try{
				const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getPegawai/'+sid,{headers})
				const response2 = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getSatkerDetail/'+sid,{headers})
				
                this.layanan = response.data.data
                this.satker = response2.data.data
                this.kepala = response2.data.kepala
                this.kaur = response2.data.kaur
		
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
		randNo() {
        	return Math.floor(Math.random() * 28) + 1;
    	}
	}
}
</script>   