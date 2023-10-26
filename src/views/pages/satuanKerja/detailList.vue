<template>
    <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container text-center">
		        <div class="row" :disabled="loading">
                    <div v-if="!loading && kepala != '<NoData>'" class="col-lg-3 col-md-4 centered">
                        <div class="PTSP categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="satker.kepalapp" style="width:75%;border-radius: 50%;" alt="car1">
                            <h5>{{ kepala.name }}</h5>
                            <h7><i-healthicons-city-worker/>KEPALA</h7>
                            <span style="font-size:14px">{{ kepala.pekerjaan }}</span>
                            </a>								   
                        </div>
                    </div>
                    <div v-if="!loading && kaur != '<NoData>'" class="col-lg-3 col-md-4 centered">
                        <div class="PTSP categories-content">
                            <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                            <img :src="satker.kaurpp" style="width:75%;border-radius: 50%;" alt="car1">
                            <h5>{{ kaur.name }}</h5>
                            <h7><i-healthicons-city-worker-outline/>KAUR</h7>
                            <span style="font-size:14px">{{ kaur.pekerjaan }}</span>
                            </a>								   
                        </div>
                    </div>
                    <hr/>
					<div v-if="loading" class="text-center">
						<hr>
						<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
						<br>
						<i-svg-spinners-bars-scale style="font-size: 2em;"/>
						<h3>::: Nyangkul Data dulu :::</h3>
						<hr>
					</div>
					<div v-for="item in paginatedLayanan" v-else :key="item.id" class="col-lg-3 col-md-4 centered">
							<div class="categories-content">
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
</template>

<script>
export default {
	data() {
			return {
				loading: false,
				random: null,
				itemsPerPage: 12,
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
	},
	created() {
		this.getLayanan(),
		this.random = this.randNo();
		window.scrollTo(0,0)
	},
	methods: {
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