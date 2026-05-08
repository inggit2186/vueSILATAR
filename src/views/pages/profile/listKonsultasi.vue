<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper daftar-konsultasi-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <userMenu />
						<userlayananMenu />
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
                                            <input v-model="keyword" type="text"  class="form-control" placeholder="Cari data..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" style="max-width: 20px;" @click="sortTable(column.data)">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
										<tbody v-if="loading">
                                            <tr>
                                                <td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Memuat data...</b></span></td>
                                            </tr>
                                        </tbody>
										<tbody v-else>
											<tr v-if="ptsp.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
											</tr>
											<tr v-for="item in paginatedItem" v-else :key="item.id">
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
                                                    <BBadge v-else pill variant="secondary" style="font-size: small;"> {{ item.staff }} </BBadge>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'APPOINTMENT'" variant="light">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'ON SITE'" variant="info">DI LOKASI</BBadge>
                                                    <BBadge v-else-if="item.status == 'PENDING'" variant="warning">PENDING</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'AKTIF'" variant="primary">AKTIF</BBadge>
                                                    <BBadge v-else-if="item.status == 'SUKSES'" variant="primary">SUKSES</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 'BATAL'" variant="danger">DIBATALKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'EXPIRED'" variant="dark">KADALUARSA</BBadge>
                                                    <br/>
                                                    <span v-if="item.onstaff != 'PTSP Bot'" style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span><br/>
													<span v-if="item.onstaff != 'PTSP Bot' && item.n > 1" style="font-size: smaller;"><i-mdi-person-tie /><i> &nbsp;{{ item.onstaff }}	</i></span><br/>
													<span v-if="item.komen != null  && item.n > 1" style="font-size: smaller;"><i-gridicons-chat /><i> &nbsp;{{ item.komen }}	</i></span>
                                                </td>
                                                <td>
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="outline-primary" @click.prevent="aksiTamu(item.tipe,item.noreq)"><b><i-mdi-call-to-action /> DETAIL</b></BButton>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Memuat data...</b></BButton>
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

<style scoped>
.daftar-konsultasi-page {
  background:
    radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 44%),
    linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
}

.daftar-konsultasi-page .dashboard-content {
  padding: 1rem 0 2.5rem;
}

.daftar-konsultasi-page .dash-cards {
  background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
  border: 1px solid rgba(31, 95, 191, 0.12);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(31, 95, 191, 0.08);
  color: #1f2937;
}

.daftar-konsultasi-page .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(31, 95, 191, 0.1);
  color: #1f2937;
}

.daftar-konsultasi-page h4,
.daftar-konsultasi-page .card-header h4 {
  color: #113f82;
}

.daftar-konsultasi-page :deep(.form-control) {
  background: #ffffff;
  border: 1px solid rgba(31, 95, 191, 0.16);
  color: #1f2937;
}

.daftar-konsultasi-page :deep(.form-control::placeholder) {
  color: #8aa0c3;
}

.daftar-konsultasi-page :deep(.table) {
  color: #1f2937;
}

.daftar-konsultasi-page :deep(.table thead th) {
  background: linear-gradient(135deg, rgba(31, 95, 191, 0.1), rgba(200, 155, 60, 0.12));
  color: #113f82;
  border-color: rgba(31, 95, 191, 0.14);
}

.daftar-konsultasi-page :deep(.table tbody td) {
  background: #fffdf7 !important;
  border-color: rgba(31, 95, 191, 0.08);
  color: #2f3b4f !important;
}

.daftar-konsultasi-page :deep(.table tbody td *) {
  color: inherit !important;
}

.daftar-konsultasi-page :deep(.table tbody tr:hover) {
  background: rgba(31, 95, 191, 0.05);
}

.daftar-konsultasi-page :deep(.badge) {
  color: #113f82;
}

.daftar-konsultasi-page :deep(.btn-outline-primary) {
  border-color: rgba(31, 95, 191, 0.22);
  color: #1f5fbf;
  background: #f8fbff;
}

.daftar-konsultasi-page :deep(.btn-outline-primary:hover),
.daftar-konsultasi-page :deep(.btn-outline-primary:focus) {
  background: linear-gradient(135deg, #1f5fbf, #c89b3c);
  border-color: transparent;
  color: #ffffff;
}

.daftar-konsultasi-page :deep(.page-link) {
  background: #ffffff;
  border-color: rgba(31, 95, 191, 0.14);
  color: #1f5fbf;
}

.daftar-konsultasi-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #1f5fbf, #c89b3c);
  border-color: transparent;
  color: #ffffff;
}
</style>

<script>
import LayananMenu from '../layananMenu/layananMenu.vue';

export default {
    data() {
        return {
            title: "Daftar Konsultasi",
            text: "User",
            text1: "Daftar Konsultasi",
            name: "/",
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
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/myKonsultasi',{headers})
				
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
				this.ptsp = this.ptsp0.filter((item) => {
					return item.tujuan.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.staff.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tanggal.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.jam.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.onstaff.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		aksiTamu(tipe,id) {
			this.$router.push('/Konsultasi/'+tipe+'/'+id);
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
                    sender: 'user',
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
  }
}
</script>
