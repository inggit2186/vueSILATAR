<template>
    <div class="main-wrapper">
		<layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="card-header">
                                    <h4>Daftar Request</h4>
                                    <!-- <router-link class="nav-link header-login add-listing" to="/add-listing"><i
                                            class="fa-solid fa-plus"></i> Add Listing</router-link> -->
                                </div>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
                                        <div class="group-img">
                                            <input type="text" v-model="keyword"  @input="filterTable" class="form-control" placeholder="Search...">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <div v-if="loading" class="text-center">
                                        <hr>
                                        <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                                        <br>
                                        <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                                        <h3>::: Mohon Tunggu Sebentar :::</h3>
                                        <hr>
                                    </div>
                                    <table v-else class="table table-hover centered">
										<thead v-if="this.$route.params.id == '777'">
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <thead v-else>
                                            <tr>
                                                <th v-for="column in columns" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
										<tbody v-if="this.$route.params.id == '777'">
											<tr v-if="this.ptsp.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a><br/><b>{{ item.jam }}</b></td>
                                                <td>
                                                    {{ item.nama }}<br/>
                                                    <span style="font-size: smaller;"><i-gg-phone />+62 {{ item.kontak }}	</span>
                                                </td>
                                                <td>
                                                    {{ item.tujuan }}<br/>
                                                </td>
												<td>
                                                    <BBadge v-if="item.tipe == 'asn'" pill variant="primary" style="font-size: small;"> {{ item.staff }} </BBadge>
                                                    <BBadge pill v-else variant="secondary" style="font-size: small;"> {{ item.staff }} </BBadge>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'APPOINTMENT'" variant="light">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'ON SITE'" variant="info">DI LOKASI</BBadge>
                                                    <BBadge v-else-if="item.status == 'PENDING'" variant="warning">PENDING</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'SUKSES'" variant="primary">SUKSES</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 'BATAL'" variant="danger">DIBATALKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'EXPIRED'" variant="dark">KADALUARSA</BBadge>
                                                    <br/>
                                                    <span v-if="item.onstaff != 'PTSP Bot'" style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span><br/>
													<span v-if="item.onstaff != 'PTSP Bot'" style="font-size: smaller;"><i-mdi-person-tie /><i> &nbsp;{{ item.onstaff }}	</i></span><br/>
													<span v-if="item.komen != null" style="font-size: smaller;"><i-gridicons-chat /><i> &nbsp;{{ item.komen }}	</i></span>
                                                </td>
                                                <td>
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="outline-primary" @click.prevent="aksiTamu(item.id)"><b><i-mdi-call-to-action /> AKSI</b></BButton>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Loading...</b></BButton>
                                                </td>
                                            </tr>
										</tbody>
                                        <tbody v-else>
											<tr v-if="this.ptsp.length == 0">
												<td colspan="5" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
                                            <tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a></td>
                                                <td>
                                                    {{ item.user }}<br/>
                                                    <span style="font-size: smaller;"><i-tabler-number />{{ item.no_req }}	</span>
                                                </td>
                                                <td>
                                                    <u>{{ item.judul }}</u><br/>
                                                    <span style="font-size: small;"><i-bx-comment-detail /> {{ item.deskripsi }}</span>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'DRAFT'" variant="light">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'UNCHECK'" variant="info">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'PENDING'" variant="warning">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'DIPROSES'" variant="success">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'SUKSES'" variant="primary">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">{{ item.status }}</BBadge>
                                                    <BBadge v-else-if="item.status == 'BATAL'" variant="dark">{{ item.status }}</BBadge>
                                                    <br/>
                                                    <span style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span>
                                                </td>
                                                <td>
                                                    <BButton v-if="item.status == 'DRAFT'" pill size="sm" variant="danger" @click.prevent="deleteRequest(item.no_req)"><b><i-fontisto-trash /> HAPUS</b></BButton>&nbsp;&nbsp;
                                                    <BButton pill size="sm" variant="outline-primary" :to="`/detailrequest/${item.no_req}`"><b><i-ph-eye-fill /> DETAIL</b></BButton>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
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
            </div>
            <!-- /Dashboard Content -->

            <foot />

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Daftar Request",
            text: "Admin",
            text1: "Daftar Request",
            name: "/",
            columns: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Pengirim', data: 'user' },
				{ name: 'Judul Request', data: 'judul' },
				{ name: 'Status', data: 'status' },
				{ name: 'Action', data: 'action' },
			],
			columns2: [
				{ name: 'Tanggal', data: 'waktu' },
				{ name: 'Tamu', data: 'nama' },
				{ name: 'Deskripsi', data: 'tujuan' },
				{ name: 'Tujuan', data: 'name' },
				{ name: 'Status', data: 'status' },
				{ name: 'Action', data: 'action' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			ptsp: [],
			ptsp0: [],
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.ptsp.sort((a, b) => {
				let modifier = 1;
				if(this.currentSortDir === 'desc') modifier = -1;
				if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
			},
    	paginatedItem() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.ptsp.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.ptsp.length / this.itemsPerPage);
        },
	},
  created() {
		this.getPTSP(),
		window.scrollTo(0,0)
	},
  methods: {
		async getPTSP() {
            const id = this.$route.params.id;
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getListRequest/'+id,{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
          			this.ptsp = response.data.data
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
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.ptsp.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.ptsp = this.ptsp0;
			} else {
				if(this.$route.params.id == 777){
					this.ptsp = this.ptsp0.filter((item) => {
					return item.tujuan.toLowerCase().includes(this.keyword.toLowerCase()) || 
					item.nama.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.staff.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tanggal.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.jam.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.onstaff.toLowerCase().includes(this.keyword.toLowerCase());
				});
				}else{
					this.ptsp = this.ptsp0.filter((item) => {
						return item.judul.toLowerCase().includes(this.keyword.toLowerCase()) || 
						item.no_req.toLowerCase().includes(this.keyword.toLowerCase()) ||
						item.tanggal.toLowerCase().includes(this.keyword.toLowerCase()) ||
						item.status.toLowerCase().includes(this.keyword.toLowerCase()) ||
						item.dept.toLowerCase().includes(this.keyword.toLowerCase()) ||
						item.user.toLowerCase().includes(this.keyword.toLowerCase());
					});
				}
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		aksiTamu(id) {
			this.$router.push('/detailtamu/'+id);
		},
		async updateTamu(id,komen,st){
			this.loadingaksi[id] = true
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateTamu',{
					id: id,
					sender: 'staff',
					komen: komen,
					status: st,
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					this.ptsp0 = response.data.data
          			this.ptsp = response.data.data	
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
				this.loadingaksi[id] = false
			}
		},
		deleteRequest(noreq) {
			this.$swal.fire({
					title: 'Apakah anda yakin?',
					text: "Data akan dihapus secara permanen!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes, Lanjut Hapus!'
					}).then((result) => {
					if (result.isConfirmed) {
						this.prosesDelete(noreq)
					}
			})
		},
		async prosesDelete(noreq) {
			this.loadingdel = true;
			try{
				console.log(noreq)
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/delMyReq',{
					noreq: noreq
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					this.getPTSP()
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
				this.loadingdel = false
			}
		}
  }
}
</script>