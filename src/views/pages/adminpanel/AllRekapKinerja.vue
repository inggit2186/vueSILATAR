<template>
    <div class="main-wrapper">
        <div class="page-wrapper all-rekap-kinerja-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="card-header">
                                    <h4>Daftar Rekap Laporan CKH</h4>
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
                                                <td>
													<span style="font-size: small;"> {{ item.nip }} </span>
												</td>
												<td>
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.nama }} </BBadge><br/>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{ item.dept }} </BBadge>
                                                </td>
												<td>
                                                    {{ item.bank }}
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'DIKIRIM'" variant="light">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'DISETUJUI'" variant="primary">DISETUJUI</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 'NONE'" variant="dark">BELUM UPLOAD</BBadge>
                                                    <br/>
                                                    <span v-if="item.status != 'NONE'" style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.petugas }}	</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mingcute-comment-fill /><i> {{ item.alasan }}	</i></span>
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
            title: "Rekap Kinerja ASN",
            text: "Admin",
            text1: "Rekap Kinerja ASN",
            name: "/",
			columns2: [
				{ name: 'NIP', data: 'nip' },
				{ name: 'Nama', data: 'name' },
				{ name: 'Bank', data: 'bank' },
				{ name: 'Status', data: 'status' },
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
            xid: null,
            sid: null
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
            this.sid = this.$route.params.id
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/allRekapKinerja',{
					id: this.sid,
				},{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
          			this.ptsp = response.data.data
				}else{
					this.$toast.fire({
						title: response.data.message,
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
  }
}
</script>

<style scoped>
.all-rekap-kinerja-page {
  background:
    radial-gradient(circle at top left, rgba(201, 157, 79, 0.12), transparent 30%),
    radial-gradient(circle at top right, rgba(143, 29, 44, 0.16), transparent 32%),
    linear-gradient(180deg, #1f1213 0%, #28181a 100%);
  color: #fff2d1;
}

.all-rekap-kinerja-page :deep(.breadcrumb) {
  color: #fff2d1;
}

.all-rekap-kinerja-page :deep(.dash-cards.card) {
  background: linear-gradient(180deg, rgba(41, 25, 26, 0.96), rgba(28, 17, 18, 0.97));
  border: 1px solid rgba(201, 157, 79, 0.16);
  border-radius: 26px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.32);
}

.all-rekap-kinerja-page :deep(.card-header) {
  background: transparent;
  border-bottom: 1px solid rgba(201, 157, 79, 0.14);
  color: #fff2d1;
}

.all-rekap-kinerja-page :deep(.card-header h4) {
  color: #fff4dc;
}

.all-rekap-kinerja-page :deep(.listing-search .form-control) {
  background: rgba(255, 244, 220, 0.05);
  border: 1px solid rgba(201, 157, 79, 0.28);
  color: #fff4dc;
}

.all-rekap-kinerja-page :deep(.listing-search .form-control::placeholder) {
  color: rgba(255, 244, 220, 0.55);
}

.all-rekap-kinerja-page :deep(.table thead th) {
  background: rgba(201, 157, 79, 0.14);
  color: #fff4dc;
  border-color: rgba(201, 157, 79, 0.2);
}

.all-rekap-kinerja-page :deep(.table tbody td) {
  background: rgba(255, 244, 220, 0.03);
  color: #fff4dc;
  border-color: rgba(201, 157, 79, 0.12);
}

.all-rekap-kinerja-page :deep(.table tbody td *) {
  color: inherit !important;
}

.all-rekap-kinerja-page :deep(.badge) {
  color: #fff;
}

.all-rekap-kinerja-page :deep(.pagination .page-link) {
  background: rgba(255, 244, 220, 0.04);
  color: #fff2d1;
  border: 1px solid rgba(201, 157, 79, 0.2);
}

.all-rekap-kinerja-page :deep(.pagination .active .page-link) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
}

@media (max-width: 767px) {
  .all-rekap-kinerja-page :deep(.dash-cards.card) {
    border-radius: 20px;
  }
}
</style>
