<template>
    <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container text-center">
		        <div class="row" :disabled="loading">
					<div v-if="loading" class="text-center">
						<hr>
						<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
						<br>
						<i-svg-spinners-bars-scale style="font-size: 2em;"/>
						<h3>::: Nyangkul Data dulu :::</h3>
						<hr>
					</div>
						<div v-else-if="!loading">
							<div class="col-lg-3 col-md-4 centered">
								<router-link :to="tujuLayanan('999')">
								<div class="categories-content">
									<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
									<img :src="$assets+'/img/icons/category-'+randNo()+'.svg'" alt="car1">
									<h6>Layanan Persuratan Lainnya</h6>
									<span class="ads">Surat Masuk</span>
									<span>Untuk Layanan Persuratan diluar Kategori / Lainnya</span>
									</a>								   
								</div>
								</router-link>
							</div>
							<hr/>
						</div>
						<div v-for="item in paginatedLayanan" :key="item.id" class="col-lg-3 col-md-4 centered">
							<router-link :to="tujuLayanan(item.id)">
							<div class="categories-content">
								<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="$assets+'/img/icons/category-'+randNo()+'.svg'" alt="car1">
								<h6>{{ item.nama }}</h6>
								<span class="ads">{{ item.output }}</span>
								<span>{{ item.deskripsi }}</span>
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
		tujuLayanan() {
        	return id => `/LayananDetail/${this.$route.params.id}/${id}`
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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getLayanan/'+sid,{headers})
				
				if(response.data.success == true){
					this.layanan = response.data.data
				}else{
					this.$toast.fire({
						title: response.data.data,
						icon: 'error',
					})
				}
		
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