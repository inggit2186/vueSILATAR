<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper nilai-skp-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
    <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container text-center">
		        <div class="row" :disabled="loading">
					<div v-if="loading" class="text-center">
						<hr>
						<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
						<br>
						<i-svg-spinners-bars-scale style="font-size: 2em;"/>
						<h3>::: Memuat data :::</h3>
						<hr>
					</div>
					<div v-for="item in paginatedLayanan" v-else :key="item.id" class="col-lg-3 col-md-4 centered">
							<router-link :to="routeASN(item.id)">
							<div class="categories-content">
								<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="item.pp" style="width:50%;border-radius: 50%;" alt="car1">
								<h6>{{ item.name }}</h6>
								<span class="ads">{{ item.nomor_induk }}</span>
								<span>{{ item.pekerjaan }}</span>
								<BBadge variant="primary"><p style="color: #000;">{{ item.satker }} </p></BBadge>
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
        <foot />

<scroll />
</div>
</div>
</template>

<style scoped>
.nilai-skp-page {
  background:
    radial-gradient(circle at top, rgba(171, 23, 57, 0.12), transparent 42%),
    linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.nilai-skp-page .dashboard-content {
  padding: 1rem 0 2.5rem;
}

.nilai-skp-page .dash-cards {
  background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98));
  border: 1px solid rgba(214, 171, 76, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(13, 7, 8, 0.22);
  color: #fff4dc;
}

.nilai-skp-page .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(255, 244, 220, 0.12);
}

.nilai-skp-page h4,
.nilai-skp-page .card-header h4 {
  color: #fff4dc;
}

.nilai-skp-page :deep(.form-control) {
  background: rgba(255, 244, 220, 0.08);
  border: 1px solid rgba(214, 171, 76, 0.24);
  color: #fff4dc;
}

.nilai-skp-page :deep(.form-control::placeholder) {
  color: rgba(255, 244, 220, 0.56);
}

.nilai-skp-page :deep(.table) {
  color: #fff4dc;
}

.nilai-skp-page :deep(.table thead th) {
  background: rgba(214, 171, 76, 0.12);
  color: #fff4dc;
  border-color: rgba(214, 171, 76, 0.18);
}

.nilai-skp-page :deep(.table tbody td) {
  border-color: rgba(255, 244, 220, 0.08);
  color: #4a3323;
  background: #fffdf7;
}

.nilai-skp-page :deep(.table tbody td a) {
  color: #a61d3a;
}

.nilai-skp-page :deep(.table tbody td b),
.nilai-skp-page :deep(.table tbody td strong) {
  color: #3a271b;
}

.nilai-skp-page :deep(.table tbody td span),
.nilai-skp-page :deep(.table tbody td i),
.nilai-skp-page :deep(.table tbody td small) {
  color: #6a4b35;
}

.nilai-skp-page :deep(.table tbody tr:hover) {
  background: rgba(214, 171, 76, 0.08);
}

.nilai-skp-page :deep(.badge) {
  color: #fff4dc;
}

.nilai-skp-page :deep(.btn-success),
.nilai-skp-page :deep(.btn-secondary),
.nilai-skp-page :deep(.btn-danger),
.nilai-skp-page :deep(.btn-primary),
.nilai-skp-page :deep(.btn-dark) {
  color: #fff4dc;
}

.nilai-skp-page :deep(.page-link) {
  background: rgba(255, 244, 220, 0.08);
  border-color: rgba(214, 171, 76, 0.2);
  color: #fff4dc;
}

.nilai-skp-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border-color: transparent;
  color: #fff4dc;
}
</style>

<script>
export default {
	data() {
			return {
                title: "Layanan",
                text: "Home",
                text1: "Satuan Kerja",
                text2: "Nama Pejabat",
                name: "/",
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
		routeASN() {
        	return id => `/addnilaiSKP/${id}`;
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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getPejabat',{headers})
				
                this.layanan = response.data.data
		
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
