<template>
    <div class="main-wrapper">
		<layouts></layouts>
        <div class="page-wrapper nilai-kinerja-page theme-report-shell">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Rekap Nilai Kinerja</h4>
											<VueDatePicker v-model="bulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2CKH()" />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Rekap Nilai Kinerja</h4>
											<VueDatePicker v-model="bulan" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2CKH()" />
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
											<tr v-if="ptsp.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
											</tr>
											<tr v-for="item in paginatedItem" v-else :key="item.id">
                                                <td>
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.name }} </BBadge><br/>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{ item.nomor_induk }} </BBadge>
                                                </td>
                                                <td>
                                                    <div>{{ item.presensi }}</div>
                                                </td>
												<td>
                                                    {{ item.ckh }}
												</td>
                                                <td>
                                                    <div>{{ item.nilaiapel }}</div>
                                                    <p style="font-size: smaller;">{{ item.apel }}</p>
                                                </td>
                                                <td>
                                                    <div>{{ item.nilaiizin }}</div>
                                                    <p style="font-size: smaller;">{{ item.izin }}</p>
                                                </td>
                                                <td>
                                                    {{ item.total_nilai }}
                                                </td>
                                                <td>
                                                    <BButton pill size="sm" variant="outline-primary" @click.prevent="openInputModal(item)"><b><i-mdi-call-to-action /> AKSI</b></BButton>
                                                </td>
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

<script>
export default {
    data() {
		const today = new Date();
        return {
            title: "Rekap Kinerja ASN",
            text: "Admin",
            text1: "Rekap Kinerja ASN",
            name: "/",
			bulan: {month: today.getMonth()-1, year:today.getFullYear()},
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Presensi', data: 'presensi' },
				{ name: 'CKH', data: 'ckh' },
				{ name: 'Apel', data: 'apel' },
				{ name: 'Izin', data: 'izin' },
				{ name: 'Total', data: 'total_nilai' },
				{ name: 'Action', data: 'action' },
			],
			keyword: '',
			currentSort: 'total_nilai',
      		currentSortDir: 'desc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			ptsp: [],
			ptsp0: [],
            xid: null,
			bulanx: null,
            sid: null,
            jumlahTidakApel: '',
            jumlahKeluar: '',
            selectedItem: null
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
		this.getCKH(),
		window.scrollTo(0,0)
	},
  methods: {
		async getCKH() {
            this.xid = this.$route.params.xid
            this.sid = this.$route.params.id
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.bulanx = date
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/nilaiKinerja',{
					xid: date,
					id: this.sid,
				},{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
          			this.ptsp = response.data.data
          			this.ptsp.sort((a, b) => b.total_nilai - a.total_nilai);
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

		async get2CKH() {
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.bulanx = date
            this.sid = this.$route.params.id
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/nilaiKinerja',{
					xid: date,
					id: this.sid,
				},{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
          			this.ptsp = response.data.data
          			this.ptsp.sort((a, b) => b.total_nilai - a.total_nilai);
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
				if (column === 'total_nilai') {
					return (parseFloat(a[column]) - parseFloat(b[column])) * modifier;
				} else {
					if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
					if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
					return 0;
				}
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.ptsp = this.ptsp0;
			} else {
				this.ptsp = this.ptsp0.filter((item) => {
					return item.name.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
        openInputModal(item) {
            this.selectedItem = item;
            this.$swal.fire({
                title: '<i class="fas fa-edit"></i> Input Data Kinerja',
                html: `
                    <div class="container-fluid" style="text-align: left; padding: 20px;">
                        <div class="row">
                            <div class="col-12 mb-3">
                                <label for="jumlahTidakApel" class="form-label fw-bold" style="color:#113f82;">
                                    <i class="fas fa-calendar-times"></i> Jumlah Tidak Apel/Upacara:
                                </label>
                                <input id="jumlahTidakApel" type="number" class="form-control form-control-lg" placeholder="Masukkan jumlah tidak ikut Apel/Upacara" min="0" style="border-radius: 10px; border: 2px solid rgba(31,95,191,0.18); background:#ffffff; color:#0f172a;">
                            </div>
                            <div class="col-12 mb-3">
                                <label for="jumlahKeluar" class="form-label fw-bold" style="color:#c89b3c;">
                                    <i class="fas fa-sign-out-alt"></i> Jumlah Keluar saat Jam Kerja:
                                </label>
                                <input id="jumlahKeluar" type="number" class="form-control form-control-lg" placeholder="Masukkan jumlah keluar pada saat Jam Kerja" min="0" style="border-radius: 10px; border: 2px solid rgba(31,95,191,0.18); background:#ffffff; color:#0f172a;">
                            </div>
                        </div>
                        <div class="alert mt-3" style="border-radius: 10px; background:rgba(219,234,254,0.52); color:#0f172a; border:1px solid rgba(31,95,191,0.16);">
                            <i class="fas fa-info-circle"></i> Pastikan data yang dimasukkan akurat untuk perhitungan kinerja.
                        </div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: '<i class="fas fa-save"></i> Submit',
                cancelButtonText: '<i class="fas fa-times"></i> Cancel',
                confirmButtonColor: '#8f1d2c',
                cancelButtonColor: '#6c757d',
                customClass: {
                    popup: 'swal2-popup-custom',
                    confirmButton: 'btn btn-primary btn-lg',
                    cancelButton: 'btn btn-secondary btn-lg'
                },
                preConfirm: () => {
                    const jumlahTidakApel = document.getElementById('jumlahTidakApel').value;
                    const jumlahKeluar = document.getElementById('jumlahKeluar').value;
                    if (!jumlahTidakApel || !jumlahKeluar) {
                        this.$swal.showValidationMessage('<i class="fas fa-exclamation-triangle"></i> Kedua field wajib diisi!');
                        return false;
                    }
                    return { jumlahTidakApel: parseInt(jumlahTidakApel), jumlahKeluar: parseInt(jumlahKeluar) };
                },
                didOpen: () => {
                    document.getElementById('jumlahTidakApel').value = item.apel || 0;
                    document.getElementById('jumlahKeluar').value = item.izin || 0;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    this.submitInputs(item, result.value.jumlahTidakApel, result.value.jumlahKeluar);
                }
            });
        },
        async submitInputs(item, jumlahTidakApel, jumlahKeluar) {
            const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
            try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatenilaiKinerja',{
					userid: item.id,
                    id: this.$route.params.id,
					bulan: date,
					apel: jumlahTidakApel,
					izin: jumlahKeluar,
				},{headers})
				
				if(response.data.success == true){
                 console.log('Submitting for item:', item.id, 'Tidak Apel:', jumlahTidakApel, 'Keluar:', jumlahKeluar);
                 this.ptsp0 = response.data.data
                 this.ptsp = response.data.data
                      this.$toast.fire({
                            title: 'Data submitted successfully',
                            icon: 'success',
                        });
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
  }
}
</script>

<style scoped>
.nilai-kinerja-page {
  background:
    radial-gradient(circle at top left, rgba(31, 95, 191, 0.08), transparent 30%),
    radial-gradient(circle at bottom right, rgba(200, 155, 60, 0.08), transparent 24%),
    linear-gradient(180deg, #fbfdff 0%, #eef4ff 100%);
  color: #0f172a;
}

.nilai-kinerja-page :deep(.dash-cards.card) {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.99), rgba(246, 249, 255, 0.96));
  border: 1px solid rgba(31, 95, 191, 0.12);
  border-radius: 24px;
  box-shadow: 0 22px 48px rgba(31, 95, 191, 0.08);
}

.nilai-kinerja-page :deep(.card-header),
.nilai-kinerja-page :deep(.card-body) {
  color: #0f172a;
}

.nilai-kinerja-page :deep(.card-header h4),
.nilai-kinerja-page :deep(.listing-search .form-control),
.nilai-kinerja-page :deep(.pagination .page-link) {
  color: #0f172a;
}

.nilai-kinerja-page :deep(.listing-search .form-control) {
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(31, 95, 191, 0.16);
}

.nilai-kinerja-page :deep(.table thead th) {
  background: linear-gradient(135deg, rgba(31, 95, 191, 0.96), rgba(200, 155, 60, 0.96));
  color: #ffffff;
}

.nilai-kinerja-page :deep(.table tbody td) {
  background: #ffffff;
  color: #0f172a;
}

.nilai-kinerja-page :deep(.table tbody td *) {
  color: inherit !important;
}

.nilai-kinerja-page :deep(.btn-outline-primary) {
  border-color: rgba(31, 95, 191, 0.24);
  color: #113f82;
}

.nilai-kinerja-page :deep(.btn-outline-primary:hover) {
  background: linear-gradient(135deg, #1f5fbf 0%, #c89b3c 100%);
  color: #fff;
}

@media (max-width: 767px) {
  .nilai-kinerja-page :deep(.dash-cards.card) {
    border-radius: 18px;
  }
}
</style>
