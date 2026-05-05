<template>
	<!-- Dashboard Content -->
	<div class="dashboard-content">
		<div class="container">
			<userMenu />
			<userlayananMenu />
			<div class="dash-listingcontent dashboard-info">
				<div class="dash-cards card">
					<div class="card-header">
						<h4>My Listings</h4>
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
									<th v-for="column in columns" :key="column.name" style="max-width: 20px;" @click="sortTable(column.data)">
										{{ column.name }}
									</th>
								</tr>
							</thead>
							<tbody v-if="loading">
								<tr>
									<td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Memuat data...</b></span></td>
								</tr>
							</tbody>
							<tbody v-if="!loading">
								<tr v-if="ptsp.length == 0">
									<td colspan="5" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
								</tr>
								<tr v-for="item in paginatedItem" v-else :key="item.id">
									<td><a href="#">{{ item.tanggal }} </a></td>
									<td>
										{{ item.dept }}<br/>
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
										<BButton pill size="sm" variant="outline-primary" :to="`/uploadsyarat/${item.no_req}`"><b><i-ph-eye-fill /> DETAIL</b></BButton>
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
</template>
<script>
import { Empty } from 'ant-design-vue';

export default {
	data() {
		return {
			columns: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Unit Kerja', data: 'dept' },
				{ name: 'Judul Request', data: 'judul' },
				{ name: 'Status', data: 'status' },
				{ name: 'Action', data: 'action' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			itemsPerPage: 12,
        	currentPage: 1,
			ptsp: [],
			ptsp0: [],
		};
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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/myRequest',{headers})
				
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
					return item.judul.toLowerCase().includes(this.keyword.toLowerCase()) || 
					item.no_req.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tanggal.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.dept.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
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

<style scoped>
.dashboard-content {
	background:
		radial-gradient(circle at top, rgba(171, 23, 57, 0.12), transparent 44%),
		linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.dashboard-content :deep(.dash-cards) {
	background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98));
	border: 1px solid rgba(214, 171, 76, 0.18);
	border-radius: 22px;
	box-shadow: 0 18px 36px rgba(13, 7, 8, 0.22);
	color: #fff4dc;
}

.dashboard-content :deep(.card-header) {
	background: transparent;
	border-bottom: 1px solid rgba(255, 244, 220, 0.12);
	color: #fff4dc;
}

.dashboard-content :deep(.card-header h4),
.dashboard-content :deep(.dash-cards h4) {
	color: #fff4dc;
}

.dashboard-content :deep(.form-control) {
	background: rgba(255, 244, 220, 0.08);
	border: 1px solid rgba(214, 171, 76, 0.24);
	color: #fff4dc;
}

.dashboard-content :deep(.form-control::placeholder) {
	color: rgba(255, 244, 220, 0.56);
}

.dashboard-content :deep(.table thead th) {
	background: rgba(214, 171, 76, 0.12);
	color: #fff4dc;
	border-color: rgba(214, 171, 76, 0.18);
}

.dashboard-content :deep(.table tbody td) {
	background: #fffdf7 !important;
	border-color: rgba(59, 36, 24, 0.12);
	color: #3b2418 !important;
}

.dashboard-content :deep(.table tbody td *) {
	color: inherit !important;
}

.dashboard-content :deep(.table tbody tr:hover) {
	background: rgba(214, 171, 76, 0.06);
}

.dashboard-content :deep(.btn-outline-primary) {
	border-color: rgba(171, 23, 57, 0.28);
	color: #ab1739;
	background: #fff9f1;
}

.dashboard-content :deep(.btn-outline-primary:hover),
.dashboard-content :deep(.btn-outline-primary:focus) {
	background: linear-gradient(135deg, #ab1739, #d6ab4c);
	border-color: transparent;
	color: #fff4dc;
}

.dashboard-content :deep(.btn-danger) {
	background: linear-gradient(135deg, #ab1739, #d6ab4c);
	border-color: transparent;
	color: #fff4dc;
}

.dashboard-content :deep(.badge) {
	box-shadow: 0 6px 14px rgba(13, 7, 8, 0.12);
}

.dashboard-content :deep(.page-link) {
	background: rgba(255, 244, 220, 0.08);
	border-color: rgba(214, 171, 76, 0.2);
	color: #fff4dc;
}

.dashboard-content :deep(.page-item.active .page-link) {
	background: linear-gradient(135deg, #ab1739, #d6ab4c);
	border-color: transparent;
	color: #fff4dc;
}
</style>
