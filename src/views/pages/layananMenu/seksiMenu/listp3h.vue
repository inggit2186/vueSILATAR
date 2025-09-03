tak<template>
    <div class="main-wrapper">
		<usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>

            <!-- Categories Section -->
		<div class="categorieslist-section">
            <div class="container text-center">
                <div ref="scroll1st" class="pagination">
                    <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <div class="text-center">
					<h1><i-line-md-reddit-loop/> Daftar Petugas Pedamping Produk Halal (P3H) ?</h1>
				</div>
                <br/>
                <br/>
		        <div class="row" :disabled="loading">
					<div v-if="loading" class="text-center">
						<hr>
						<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
						<br>
						<i-svg-spinners-bars-scale style="font-size: 2em;"/>
						<h3>::: Mohon Tunggu Pegawai nya dulu :::</h3>
						<hr>
					</div>
					<div v-for="item in paginatedLayanan" v-else :key="item.id" class="col-lg-3 col-md-4 centered">
                        <div class="categories-content" @click="addTamu(item)">
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
        }
	},
	created() {
		this.getLayanan()
		this.random = this.randNo()
        this.nav = this.$route.params.nav
        this.$nextTick(() => {
			this.$refs.scroll1st.scrollIntoView();
		});
	},
	methods: {
		async getLayanan() {
			this.loading = true;
			try{
				const sid = this.$route.params.id
                console.log(sid)
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getP3H/'+sid,{headers})
				
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
async addTamu(item) {
    // SweetAlert info popup for item details
    await this.$swal.fire({
        title: 'Detail Petugas',
        html: `
            <div style="text-align: center;">
                <img src="${item.pp}" style="width: 130px; height: 130px; border-radius: 50%; object-fit: cover; margin-bottom: 15px;" alt="Profile Picture">
                <hr/>
                <div style="text-align: center;">
                    <h3 style="color: #4A90E2; margin-bottom: 10px;">${item.name}</h3>
                    <p style="margin: 5px 0;"><strong>${item.asn}</strong></p>
                    <p style="margin: 5px 0;"><strong>:: ${item.jk} ::</strong></p>
                    <p style="margin: 5px 0;"><strong>${item.umur} Tahun</strong></p>
                    <hr/>
                    <p style="margin: 5px 0;"><strong>${item.satker}</strong></p>
                    <p style="margin: 5px 0;">Kontak <strong>: +62 ${item.kontak}</strong></p>
                </div>
            </div>
        `,
        icon: 'info',
        showCancelButton: true,
        cancelButtonText: 'Close',
        confirmButtonText: `<a href="https://wa.me/${item.telp}" style="text-decoration: none; color: white;" target=_blank><i class="fab fa-whatsapp"></i> Kontak di WhatsApp</a>`,
        confirmButtonColor: '#25D366'
    });
    
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