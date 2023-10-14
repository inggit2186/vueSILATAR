<template>
    <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container">
		        <div class="row">
			       <div class="col-lg-3 col-md-4" v-for="item in paginatedLayanan" :key="item.id">
				    	<div class="categories-content">
							<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
		    				   <img :src="$assets+'/img/icons/category-'+randNo()+'.svg'" alt="car1">
							   <h6>{{ item.nama }}</h6>
							   <span class="ads">{{ item.output }}</span>
							   <span>{{ item.deskripsi }}</span>
							</a>								   
					   </div>
				   </div>
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
				this.layanan = response.data.data
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
		randNo() {
        	return Math.floor(Math.random() * 28) + 1;
    	}
	},
	created() {
		this.getLayanan(),
		this.random = this.randNo();
	}
}
</script>