<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper rekap-presensi-page theme-report-shell">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
						<userMenu />
                        <MenuPresensi />
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Rekap Presensi</h4>
											<VueDatePicker v-model="bulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2Presensi()" />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Rekap Presensi</h4>
											<VueDatePicker v-model="bulan" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2Presensi()" />
									</div>
								</div>
								<h4 v-if="loading" style="font-size: small;align-self: center;">
									<br/>
                                	<span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Mengecek Data Pegawai...</b></span>
                                </h4>
								<h4 v-else style="font-size: small;align-self: center;">
									<br/>
									{{ userx.name }}  &nbsp;|&nbsp;  {{ $route.params.xid }}  &nbsp;|&nbsp;  {{ userx.satkerx }}
								</h4>
								<hr/>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
										<div class="group-img d-none d-sm-block">
                                            <input v-model="keyword" type="text"  class="form-control" placeholder="Cari data..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
										<div class="group-img d-block d-sm-none">
                                            <input v-model="keyword" type="text"  class="form-control" style="float:left; max-width: 50%;margin-right: 5px;" placeholder="Cari data..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered theme-table">
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
											<tr v-if="presensi.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
											</tr>
											<tr v-for="(item,index) in paginatedItem" v-else :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a></td>
                                                <td><b>{{ item.mAbsen }}</b></td>
                                                <td><b>{{ item.pAbsen }}</b></td>
                                                <td><b>{{ item.status }}</b></td>
                                                <td>{{ item.keterangan }}</td>
                                            </tr>
										</tbody>
                                    </table>
                                </div>

                                <!--Pagination--> 
                                <div class="blog-pagination">
                                    <nav>
                                        <ul class="pagination theme-pagination">
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
.rekap-presensi-page {
  background:
    radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 42%),
    linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
}

.rekap-presensi-page .dashboard-content {
  padding: 1rem 0 2.5rem;
}

.rekap-presensi-page .dash-cards {
  background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
  border: 1px solid rgba(31, 95, 191, 0.12);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(31, 95, 191, 0.08);
  color: #1f2937;
}

.rekap-presensi-page .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(31, 95, 191, 0.1);
  color: #1f2937;
}

.rekap-presensi-page h4,
.rekap-presensi-page .card-header h4 {
  color: #113f82;
}

.rekap-presensi-page :deep(.form-control) {
  background: #ffffff;
  border: 1px solid rgba(31, 95, 191, 0.16);
  color: #1f2937;
}

.rekap-presensi-page :deep(.form-control::placeholder) {
  color: #8aa0c3;
}

.rekap-presensi-page :deep(.table) {
  color: #1f2937;
}

.rekap-presensi-page :deep(.table thead th) {
  background: linear-gradient(135deg, rgba(31, 95, 191, 0.1), rgba(200, 155, 60, 0.12));
  color: #113f82;
  border-color: rgba(31, 95, 191, 0.14);
}

.rekap-presensi-page :deep(.table tbody td) {
  border-color: rgba(31, 95, 191, 0.08);
  color: #2f3b4f !important;
  background: #fffdf7 !important;
}

.rekap-presensi-page :deep(.table tbody td a) {
  color: #1f5fbf !important;
}

.rekap-presensi-page :deep(.table tbody td b),
.rekap-presensi-page :deep(.table tbody td strong) {
  color: #1f2937 !important;
}

.rekap-presensi-page :deep(.table tbody td span),
.rekap-presensi-page :deep(.table tbody td i),
.rekap-presensi-page :deep(.table tbody td small) {
  color: #5b6677 !important;
}

.rekap-presensi-page :deep(.table tbody tr:hover) {
  background: rgba(31, 95, 191, 0.05);
}

.rekap-presensi-page :deep(.page-link) {
  background: #ffffff;
  border-color: rgba(31, 95, 191, 0.14);
  color: #1f5fbf;
}

.rekap-presensi-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #1f5fbf, #c89b3c);
  border-color: transparent;
  color: #ffffff;
}
</style>

<script>
import PresensiMenu from '@/components/presensiMenu.vue';

export default {
    data() {
        return {
            title: "Rekap Presensi",
            text: "User",
            text1: "Rekap Presensi",
            name: "/",
			bulan: null,
			columns2: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Masuk', data: 'masuk' },
				{ name: 'Pulang', data: 'pulang' },
				{ name: 'Status', data: 'status' },
				{ name: 'Keterangan', data: 'keterangan' },
			],
			kegiatan: [{
				id: 'presensi0',
				kegiatan: '',
			}],
			counter:0,
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingrekap: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			userx: null,
			presensi: [],
			presensi0: [],
			tanggal: [],
            detail: 1,
            status: null,
			rekapstatus: 0,
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.presensi.sort((a, b) => {
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
			return this.presensi.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.presensi.length / this.itemsPerPage);
        },
	},
  created() {
		this.getPresensi(),
		window.scrollTo(0,0)
	},
  methods: {
		async getPresensi() {
			this.loading = true;
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-01';
			this.bulan = date;
			this.rekapstatus = 0;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myPresensi',{
					nav: this.$route.params.id,
					bulan : this.bulan,
					xid : this.$route.params.xid
				},{headers})
				
				if(response.data.success == true){
					this.userx = response.data.userx,
          			this.presensi0 = response.data.data
          			this.presensi = response.data.data
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
		async get2Presensi() {
			this.rekapstatus = 1;
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myPresensi',{
					nav: this.$route.params.id,
					bulan : date,
					xid : this.$route.params.xid
				},{headers})
				
				if(response.data.success == true){
                    this.userx = response.data.userx,
          			this.presensi0 = response.data.data
          			this.presensi = response.data.data
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

			this.presensi.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.presensi = this.presensi0;
			} else {
				this.presensi = this.presensi0.filter((item) => {
					return item.tanggal.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
  }
}
</script>

<style>
.rekap-presensi-page {
    background:
        radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 42%),
        linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
}

.rekap-presensi-page .dashboard-content {
    padding: 1.25rem 0 3rem;
}

.rekap-presensi-page .dash-cards.card {
    background: linear-gradient(180deg, #ffffff 0%, #f7faff 100%);
    border: 1px solid rgba(31, 95, 191, 0.12);
    border-radius: 22px;
    box-shadow: 0 22px 55px rgba(31, 95, 191, 0.08);
    color: #1f2937;
}

.rekap-presensi-page .card-header {
    background: rgba(255, 255, 255, 0.92);
    color: #1f2937;
    border-bottom: 1px solid rgba(31, 95, 191, 0.12);
}

.rekap-presensi-page .card-body {
    background: transparent;
    color: #1f2937;
}

.rekap-presensi-page .card-header h4,
.rekap-presensi-page .card-body h4,
.rekap-presensi-page .card-body h5,
.rekap-presensi-page .card-body h6,
.rekap-presensi-page .card-body p,
.rekap-presensi-page .card-body span,
.rekap-presensi-page .card-body b,
.rekap-presensi-page .card-body label {
    color: #1f2937;
}

.rekap-presensi-page .group-img .form-control {
    background: #ffffff;
    border: 1px solid rgba(31, 95, 191, 0.16);
    color: #1f2937;
}

.rekap-presensi-page .group-img .form-control::placeholder {
    color: #8aa0c3;
}

.rekap-presensi-page .table {
    background: #ffffff;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid rgba(31, 95, 191, 0.12);
}

.rekap-presensi-page .table thead th {
    background: linear-gradient(135deg, rgba(31, 95, 191, 0.1), rgba(200, 155, 60, 0.12));
    color: #113f82;
    border-color: rgba(31, 95, 191, 0.14);
}

.rekap-presensi-page .table tbody td {
    color: #2f3b4f !important;
    background: #fffdf7 !important;
    border-color: rgba(31, 95, 191, 0.08);
}

.rekap-presensi-page .table tbody td * {
    color: inherit !important;
}

.rekap-presensi-page .table tbody td a {
    color: #1f5fbf !important;
}

.rekap-presensi-page .table tbody td b,
.rekap-presensi-page .table tbody td strong {
    color: #1f2937 !important;
}

.rekap-presensi-page .table tbody tr:hover {
    background: rgba(31, 95, 191, 0.05);
}

.rekap-presensi-page .pagination .page-link {
    background: #ffffff;
    color: #1f5fbf;
    border-color: rgba(31, 95, 191, 0.14);
}

.rekap-presensi-page .pagination .page-item.active .page-link {
    background: linear-gradient(135deg, #1f5fbf, #c89b3c);
    color: #ffffff;
}

.rekap-presensi-page .pagination .page-item.disabled .page-link {
    opacity: 0.55;
}

.rekap-presensi-page .card hr {
    border-color: rgba(31, 95, 191, 0.12);
}

@media (max-width: 768px) {
    .rekap-presensi-page .dash-cards.card {
        border-radius: 18px;
    }
}
</style>
