<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper janji-temu-page theme-report-shell">
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
                                                    <BBadge v-if="item.tipe == 'asn'" pill variant="primary" style="font-size: small;"> {{ item.staff }} </BBadge>
                                                    <BBadge v-else pill variant="secondary" style="font-size: small;"> {{ item.staff }} </BBadge>
                                                </td>
                                                <td>
                                                    {{ item.tujuan }}<br/>
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
													<span v-if="item.onstaff != 'PTSP Bot'" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.onstaff }}	</i></span>
                                                </td>
                                                <td>
                                                    {{ item.komen }}<br/>
                                                </td>
                                                <td v-if="item.status == 'APPOINTMENT' || item.status == 'PENDING' || item.status == 'DITERIMA' || item.status == 'ON SITE'" >
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="outline-primary" @click.prevent="aksiTamu(item.id)"><b><i-mdi-call-to-action /> AKSI</b></BButton>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Memuat data...</b></BButton>
                                                </td>
												<td v-else>
													&nbsp;
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
.janji-temu-page {
  background:
    radial-gradient(circle at top, rgba(171, 23, 57, 0.14), transparent 44%),
    linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.janji-temu-page .dashboard-content {
  padding: 1rem 0 2.5rem;
}

.janji-temu-page .dash-cards {
  background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98));
  border: 1px solid rgba(214, 171, 76, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(13, 7, 8, 0.22);
  color: #fff4dc;
}

.janji-temu-page .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(255, 244, 220, 0.12);
  color: #fff4dc;
}

.janji-temu-page h4,
.janji-temu-page .card-header h4 {
  color: #fff4dc;
}

.janji-temu-page :deep(.form-control) {
  background: rgba(255, 244, 220, 0.08);
  border: 1px solid rgba(214, 171, 76, 0.24);
  color: #fff4dc;
}

.janji-temu-page :deep(.form-control::placeholder) {
  color: rgba(255, 244, 220, 0.56);
}

.janji-temu-page :deep(.table) {
  color: #fff4dc;
}

.janji-temu-page :deep(.table thead th) {
  background: rgba(214, 171, 76, 0.12);
  color: #fff4dc;
  border-color: rgba(214, 171, 76, 0.18);
}

.janji-temu-page :deep(.table tbody td) {
  background: #fffdf7 !important;
  border-color: rgba(59, 36, 24, 0.12);
  color: #3b2418 !important;
}

.janji-temu-page :deep(.table tbody td *) {
  color: inherit !important;
}

.janji-temu-page :deep(.table tbody tr:hover) {
  background: rgba(214, 171, 76, 0.08);
}

.janji-temu-page :deep(.badge) {
  color: #fff4dc;
}

.janji-temu-page :deep(.btn-outline-primary) {
  border-color: rgba(171, 23, 57, 0.28);
  color: #ab1739;
  background: #fff9f1;
}

.janji-temu-page :deep(.btn-outline-primary:hover),
.janji-temu-page :deep(.btn-outline-primary:focus) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border-color: transparent;
  color: #fff4dc;
}

.janji-temu-page :deep(.page-link) {
  background: rgba(255, 244, 220, 0.08);
  border-color: rgba(214, 171, 76, 0.2);
  color: #fff4dc;
}

.janji-temu-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border-color: transparent;
  color: #fff4dc;
}

.janji-temu-page.theme-report-shell {
  background:
    radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 44%),
    linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
}

.janji-temu-page.theme-report-shell .dash-cards {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(246, 249, 255, 0.96)) !important;
  border: 1px solid rgba(31, 95, 191, 0.12) !important;
  box-shadow: 0 18px 40px rgba(31, 95, 191, 0.08) !important;
  color: #0f172a !important;
}

.janji-temu-page.theme-report-shell .card-header,
.janji-temu-page.theme-report-shell .card-header h4,
.janji-temu-page.theme-report-shell .card-body,
.janji-temu-page.theme-report-shell .table,
.janji-temu-page.theme-report-shell .group-img .form-control,
.janji-temu-page.theme-report-shell .group-img i,
.janji-temu-page.theme-report-shell .page-link {
  color: #0f172a !important;
}

.janji-temu-page.theme-report-shell :deep(.form-control) {
  background: #ffffff !important;
  color: #0f172a !important;
  border: 1px solid rgba(31, 95, 191, 0.16) !important;
}

.janji-temu-page.theme-report-shell :deep(.form-control::placeholder) {
  color: #64748b !important;
}

.janji-temu-page.theme-report-shell :deep(.table thead th) {
  background: linear-gradient(135deg, rgba(31, 95, 191, 0.96), rgba(200, 155, 60, 0.96)) !important;
  color: #ffffff !important;
  border-color: rgba(31, 95, 191, 0.14) !important;
}

.janji-temu-page.theme-report-shell :deep(.table tbody td) {
  background: #ffffff !important;
  color: #0f172a !important;
  border-color: rgba(31, 95, 191, 0.08) !important;
}

.janji-temu-page.theme-report-shell :deep(.badge) {
  color: #ffffff !important;
}

.janji-temu-page.theme-report-shell :deep(.page-link) {
  background: rgba(255, 255, 255, 0.96) !important;
  border-color: rgba(31, 95, 191, 0.14) !important;
}

.janji-temu-page.theme-report-shell :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, rgba(31, 95, 191, 0.96), rgba(200, 155, 60, 0.96)) !important;
  color: #ffffff !important;
}
</style>

<script>
import LayananMenu from '../layananMenu/layananMenu.vue';

export default {
    data() {
        return {
            title: "Daftar Appointment",
            text: "User",
            text1: "Daftar Appointment",
            name: "/",
			columns2: [
				{ name: 'Tanggal', data: 'waktu' },
				{ name: 'Tujuan', data: 'name' },
				{ name: 'Deskripsi', data: 'tujuan' },
				{ name: 'Status', data: 'status' },
				{ name: 'Komentar', data: 'komen' },
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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/myAppointment',{headers})
				
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
		aksiTamu(id) {
			this.$swal.fire({
				input: "textarea",
				inputLabel: "Komentar",
				inputPlaceholder: "Tulis Komentar Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Komentar Anda Disini"
				},
				showConfirmButton: false,
				showDenyButton: true,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;BATALKAN`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isDenied) {
						this.updateTamu(id,result.value,'BATAL')
					};
				});
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
