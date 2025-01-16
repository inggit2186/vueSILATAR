<template>
    <!-- Bookmark Content -->
    <div class="dashboard-content">		
			<div class="container">	
                <div class="">
					<ul class="dashborad-menus">
						<li v-if="user.dept_id == 4" :class="{ active: $route.path === '/verif/'+bln+'/getSeksi' }">
							<router-link v-if="$route.params.xid == 'humas'" :to="routeSeksi('4')">
								<i class="feather-grid"></i> <span>Kantor</span>
							</router-link>
							<router-link v-else to="getSeksi">
								<i class="feather-grid"></i> <span>Kantor</span>
							</router-link>
						</li>
						<li v-if="user.dept_id == 4 || user.dept_id == 8" :class="{ active: $route.path === '/verif/'+bln+'/getKUA' }">
							<router-link to="getKUA">
								<i class="fa-solid fa-mosque"></i> <span>KUA</span>
							</router-link>
						</li>
						<li v-if="user.dept_id == 4 || user.dept_id == 7" :class="{ active: $route.path === '/verif/'+bln+'/getMIN' }">
							<router-link to="getMIN">
								<i class="fas fa-solid fa-school"></i> <span>MIN</span>
							</router-link>
						</li>
						<li v-if="user.dept_id == 4 || user.dept_id == 7" :class="{ active: $route.path === '/verif/'+bln+'/getMTsN' }">
							<router-link to="getMTsN">
								<i class="fas fa-solid fa-hotel"></i> <span>MTsN</span>
							</router-link>
						</li>
						<li v-if="user.dept_id == 4 || user.dept_id == 7" :class="{ active: $route.path === '/verif/'+bln+'/getMAN' }">
							<router-link to="getMAN">
								<i class="fas fa-solid fa-university"></i> <span>MAN</span>
							</router-link>
						</li>
						<li v-if="$route.params.xid != 'humas' && user.dept_id == 4 || user.dept_id == 7 || user.dept_id == 5" :class="{ active: $route.name === 'Lainnya' }">
							<router-link :to="routeSeksi('999')">
								<i class="fas fa-solid fa-chess-rook"></i> <span>Swasta / Lainnya</span>
							</router-link>
						</li>
						<li v-if="$route.params.xid != 'humas' && user.dept_id == 4 || user.dept_id == 7 || user.dept_id == 5" :class="{ active: $route.name === 'Lainnya' }">
							<router-link :to="routeSeksi('998')">
								<i class="fas fa-solid fa-city"></i> <span>Pemerintah Daerah</span>
							</router-link>
						</li>
					</ul>
				</div>		
				<div class="bookmarks-content grid-view featured-slider">
				    <div class="row" :disabled="loading">
						<div v-if="!loading && nav == 'getSeksi'" class="col-lg-3 col-md-4 centered">
							<router-link to="/ASN/197304241998031008">
							<div class="PTSP categories-content">
								<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="$assets+'/img/profiles/kakankemenag-01.jpg'" alt="car1">
								<h5>H. AMRIL, S.Ag, MM</h5>
								<span style="font-size:14px">KEPALA KANTOR<br>Kementerian Agama Kab.Tanah Datar</span>
								</a>								   
							</div>
							</router-link>
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
					    <div v-for="item in paginatedSeksi" v-else id="item" :key="item.id" class="col-lg-4 col-md-4 col-sm-6 centered">
							<div class="card aos aos-init aos-animate" data-aos="fade-up">
				    			<div class="blog-widget">
									<div class="blog-img">
										<router-link :to="routeSeksi(item.id)">
											<img :src="$assets+'/img/seksi/'+item.imgid+'.png'" class="img-fluid" alt="blog-img" @error="handleBrokenImage(item)">
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
												    <img :src="item.ppkepala ?? $assets+'/img/profiles/avatar-01.jpg'" alt="author">
                                                </div>
												<div class="blog-features">
												   <a href="javascript:void(0)"><span> <i class="fa-regular fa-circle-stop"></i> {{ item.kode }}</span></a>
												</div>																	  
												<div class="blog-author text-end"> 
													<span> <i class="feather-user"></i>{{ item.jml }}</span>
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
	</div>		
		<!-- /Bookmark Content -->
</template>

<script>
export default {
	data() {
		const user = JSON.parse(localStorage.getItem('user'))
			return {
				loading: false,
				nav: this.nav,
				user: user,
				itemsPerPage: 9,
        		currentPage: 1,
				imgid: null,
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
        	return id => `/${this.$route.params.xid}/${this.bln}/${id}`;
    	},
	},
	created() {
		this.getSeksi(),
		this.nav = this.$route.params.id
		this.bln = this.$route.params.xid
		window.scrollTo(0,0)
	},
	methods: {
		async getSeksi() {
			this.loading = true;
			try{
				const navid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/'+navid,{headers})
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
		handleBrokenImage(item) {
			item.imgid = Math.floor(Math.random() * (416 - 405 + 1)) + 405;
		},
	}
}
</script>

<style>
.PTSP img{
	width: 100%;
    height: 100%;
    margin-bottom: 5px;
}
</style>