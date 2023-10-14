<template>
    <!-- Bookmark Content -->
    <div class="dashboard-content">		
			<div class="container">			
				<div class="bookmarks-content grid-view featured-slider">
				    <div class="row" :disabled="loading">
						<div v-if="loading" class="text-center">
							<hr>
							<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
							<br>
							<b-spinner variant="success" label="Spinning"></b-spinner>
							<h3>::: Nyangkul Data dulu :::</h3>
							<hr>
						</div>
					    <div v-else class="col-lg-4 col-md-4 col-sm-6" id="item" v-for="item in paginatedSeksi" :key="item.id">
							<div class="card aos aos-init aos-animate" data-aos="fade-up">
				    			<div class="blog-widget">
									<div class="blog-img">
										<router-link :to="routeSeksi(item.id)">
											<img :src="$assets+'/img/list/listgrid-1.jpg'" class="img-fluid" alt="blog-img">
                                        </router-link>
					    				<div class="fav-item">
											<span class="Featured-text">{{item.kategori.toUpperCase()}}</span>
												<a href="javascript:void(0)" class="fav-icon">
							    					<i class="feather-heart"></i>
						    					</a>										
										</div>	
									</div>
									<div class="bloglist-content">
										<div class="card-body">
											<div class="blogfeaturelink">
											    <div class="grid-author">
												    <img :src="$assets+'/img/profiles/avatar-01.jpg'" alt="author">
                                                </div>
												<div class="blog-features">
												   <a href="javascript:void(0)"><span> <i class="fa-regular fa-circle-stop"></i> {{ item.kode }}</span></a>
												</div>																	  
												<div class="blog-author text-end"> 
													<span> <i class="feather-eye"></i>4000</span>
												</div>
											</div> 
											<h6><router-link :to="routeSeksi(item.id)">{{ item.nama }}</router-link></h6>																	 
											<div class="blog-location-details">
												<div class="location-info">
												   <i class="feather-map-pin"></i> {{ item.alamat }}
												</div>
												<div class="location-info">
													<i class="fa-solid fa-calendar-days"></i> {{ item.kode }}
												</div>
											</div>
											<div class="amount-details">
												<div class="ratings">
													<span>{{ item.kepala }}</span> ({{ item.rolekepala.toUpperCase() }})
												</div>												
											</div>	
										</div>	
									</div>			 
								</div> 
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
												<li class="page-item" v-for="page in displayedPages" :key="page" :class="{'active': currentPage === page}">
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
		</div>		
		<!-- /Bookmark Content -->
</template>

<script>
export default {
	data() {
			return {
				loading: false,
				navid: this.$route.params.id,
				itemsPerPage: 10,
        		currentPage: 1,
				seksi: []
			}
	},
	computed: {
    	paginatedSeksi() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.seksi.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.seksi.length / this.itemsPerPage);
        },
		routeSeksi() {
        	return id => `/${this.navid}/${id}`;
    	},
	},
	methods: {
		async getSeksi() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getSeksi',{headers})
				this.seksi = response.data.data
		
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
	},
	created() {
		this.getSeksi()
	}
}
</script>