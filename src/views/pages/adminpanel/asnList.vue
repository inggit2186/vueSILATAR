<template>
    <div class="main-wrapper">
		<layouts></layouts>
        <div class="page-wrapper asn-list-page theme-report-shell">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
						<MenuPresensi />
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Daftar Pegawai</h4>
									</div>
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
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.name }} </BBadge><br/>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{ item.nomor_induk }} </BBadge>
                                                </td>
                                                <td>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{  item.satker }} </BBadge>
                                                </td>
												<td>
                                                 	{{  item.bank }}
                                                </td>
                                                <td>
													<BButton pill size="sm" variant="outline-primary"  @click.prevent="cekPresensi(item.nomor_induk)"><b><i-game-icons-notebook /> Cek Presensi</b></BButton>
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
		const today = new Date();
        return {
            title: "Rekap Presensi ASN",
            text: "Admin",
            text1: "Rekap Presensi ASN",
            name: "/",
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Satker', data: 'satker' },
				{ name: 'Bank', data: 'bank' },
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
		this.getASN(),
		window.scrollTo(0,0)
	},
  methods: {
		async getASN() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getASNList',{headers})
				
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
					return item.name.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.nomor_induk.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
        aksiStatus(id,file) {
            let frame = null;
            let isPDF = file.toLowerCase().endsWith('.pdf');
            let isWord = file.toLowerCase().endsWith('.doc') || file.toLowerCase().endsWith('.docx');
            
            if(isWord){
                frame = '<iframe src="https://docs.google.com/gview?url='+ file +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
            }else{
                frame = '<iframe src="'+ file +'" width="100%" height="550"></iframe>'
            }

            if (window.innerWidth < 768) {
                this.$swal.fire({
                width: "100%",
				allowOutsideClick: true,
                html: frame,
				input: "textarea",
				inputLabel: "Komentar",
				inputPlaceholder: "Tulis Komentar Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Komentar Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateStatus(id,result.value,'DISETUJUI')
					}
                    else if (result.isDenied) {
						this.updateStatus(id,result.value,'DITOLAK')
					};
				});
            }else{
                this.$swal.fire({
                width: "50%",
                html: frame,
				input: "textarea",
				inputLabel: "Komentar",
				inputPlaceholder: "Tulis Komentar Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Komentar Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateStatus(id,result.value,'DISETUJUI')
					}
                    else if (result.isDenied) {
						this.updateStatus(id,result.value,'DITOLAK')
					};
				});
            }

        },
		async updateStatus(id,komen,st){
			this.loadingaksi[id] = true
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateStatusKinerja',{
					id: id,
					komen: komen,
					status: st,
                    xid: this.xid,
                    sid: this.sid
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
		cekPresensi(id) {
			this.$router.push('/admin/rekappresensiasn/'+id);
		},
  }
}
</script>

<style scoped>
.asn-list-page {
	background:
		radial-gradient(circle at top, rgba(171, 23, 57, 0.14), transparent 44%),
		linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.asn-list-page .dashboard-content {
	padding: 1rem 0 2.5rem;
}

.asn-list-page .profile-content .card,
.asn-list-page .dash-cards {
	background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98));
	border: 1px solid rgba(214, 171, 76, 0.18);
	border-radius: 22px;
	box-shadow: 0 18px 36px rgba(13, 7, 8, 0.22);
	color: #fff4dc;
}

.asn-list-page .card-header {
	background: transparent;
	border-bottom: 1px solid rgba(255, 244, 220, 0.12);
	color: #fff4dc;
}

.asn-list-page .media-section h5,
.asn-list-page .media-section h3,
.asn-list-page .media-section h4,
.asn-list-page .media-section span,
.asn-list-page .media-section label {
	color: #fff4dc;
}

.asn-list-page .categorieslist-section {
	background:
		radial-gradient(circle at top, rgba(171, 23, 57, 0.14), transparent 44%),
		linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.asn-list-page .categorieslist-section :deep(.categories-content a),
.asn-list-page .categorieslist-section :deep(.categories-content a:hover),
.asn-list-page .categorieslist-section :deep(.categories-content a:focus) {
	background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98)) !important;
	background-color: #1f1216 !important;
	border-color: rgba(214, 171, 76, 0.22) !important;
	color: #fff4dc !important;
}

.asn-list-page .categorieslist-section :deep(.categories-content a h6),
.asn-list-page .categorieslist-section :deep(.categories-content a span),
.asn-list-page .categorieslist-section :deep(.categories-content a *) {
	color: inherit !important;
}

.asn-list-page :deep(.table) {
	color: #fff4dc;
}

.asn-list-page :deep(.table thead th) {
	background: rgba(214, 171, 76, 0.12);
	color: #fff4dc;
	border-color: rgba(214, 171, 76, 0.18);
}

.asn-list-page :deep(.table tbody td) {
	border-color: rgba(255, 244, 220, 0.08);
	color: #3b2418 !important;
	background: #fffdf7 !important;
	vertical-align: middle;
}

.asn-list-page :deep(.table tbody td *) {
	color: inherit !important;
}

.asn-list-page :deep(.table tbody td:nth-child(3)) {
	color: #5a3d2c !important;
}

.asn-list-page :deep(.table tbody td:nth-child(4)) {
	color: #3b2418 !important;
}

.asn-list-page :deep(.table tbody td a) {
	color: #7a162b !important;
}

.asn-list-page :deep(.table tbody td b),
.asn-list-page :deep(.table tbody td strong) {
	color: #2f1d14 !important;
}

.asn-list-page :deep(.table tbody td span),
.asn-list-page :deep(.table tbody td i),
.asn-list-page :deep(.table tbody td small) {
	color: #5a3d2c !important;
}

.asn-list-page :deep(.table tbody td .badge) {
	color: #fff !important;
}

.asn-list-page :deep(.table tbody td .btn-outline-primary),
.asn-list-page :deep(.table tbody td .btn-outline-primary:hover),
.asn-list-page :deep(.table tbody td .btn-outline-primary:focus) {
	color: #7a162b !important;
	border-color: rgba(171, 23, 57, 0.35) !important;
	background: #fff9f1 !important;
	box-shadow: 0 10px 22px rgba(171, 23, 57, 0.08);
}

.asn-list-page :deep(.table tbody td .btn-danger),
.asn-list-page :deep(.table tbody td .btn-danger:hover),
.asn-list-page :deep(.table tbody td .btn-danger:focus) {
	color: #fffdf6 !important;
}

.asn-list-page :deep(.table tbody tr:hover) {
	background: rgba(214, 171, 76, 0.06);
}

.asn-list-page :deep(.page-link) {
	background: rgba(255, 244, 220, 0.08);
	border-color: rgba(214, 171, 76, 0.2);
	color: #fff4dc;
}

.asn-list-page :deep(.page-item.active .page-link) {
	background: linear-gradient(135deg, #ab1739, #d6ab4c);
	border-color: transparent;
	color: #fff4dc;
}

.asn-list-page :deep(.file-upload) {
	color: #fff4dc;
}

.asn-list-page :deep(.file-upload span),
.asn-list-page :deep(.file-upload i) {
	color: inherit !important;
}

.asn-list-page.theme-report-shell {
	background:
		radial-gradient(circle at top, rgba(31, 95, 191, 0.12), transparent 44%),
		radial-gradient(circle at bottom right, rgba(200, 155, 60, 0.08), transparent 28%),
		linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
	color: #0f172a;
}

.asn-list-page.theme-report-shell :deep(.dash-cards),
.asn-list-page.theme-report-shell :deep(.card),
.asn-list-page.theme-report-shell :deep(.card-header),
.asn-list-page.theme-report-shell :deep(.card-body) {
	background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 255, 0.96)) !important;
	border-color: rgba(31, 95, 191, 0.12) !important;
	color: #0f172a !important;
}

.asn-list-page.theme-report-shell :deep(.table thead th) {
	background: linear-gradient(135deg, rgba(31, 95, 191, 0.1), rgba(200, 155, 60, 0.12)) !important;
	color: #113f82 !important;
	border-color: rgba(31, 95, 191, 0.14) !important;
}

.asn-list-page.theme-report-shell :deep(.table tbody td) {
	background: #ffffff !important;
	color: #0f172a !important;
	border-color: rgba(31, 95, 191, 0.08) !important;
}

.asn-list-page.theme-report-shell :deep(.page-link) {
	background: #ffffff !important;
	border-color: rgba(31, 95, 191, 0.14) !important;
	color: #1f5fbf !important;
}

.asn-list-page.theme-report-shell :deep(.page-item.active .page-link) {
	background: linear-gradient(135deg, #1f5fbf, #c89b3c) !important;
	color: #ffffff !important;
}

@media (max-width: 768px) {
	.asn-list-page .dashboard-content {
		padding-inline: 0.5rem;
	}
}
</style>
