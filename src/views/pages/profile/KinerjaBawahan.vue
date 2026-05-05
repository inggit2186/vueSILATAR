<template>
    <div class="main-wrapper">
		<layouts></layouts>
        <div class="page-wrapper kinerja-bawahan-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
						<kinerjaMenu />
						<div v-if="satker && satker.plh" class="text-center mb-2">
							<BButtonGroup class="d-flex justify-content-center">
								<BButton :variant="selectedOption === 'data' ? 'success' : 'outline-success'" size="sm" class="mx-1" @click="setCkh('data')">
									<i class="fas fa-users"></i> {{ satker.nama }}
								</BButton>
								<BButton :variant="selectedOption === 'data2' ? 'success' : 'outline-success'" size="sm" class="mx-1" @click="setCkh('data2')">
									<i class="fas fa-user-tie"></i> {{ satker.deptplh }}
								</BButton>
							</BButtonGroup>
						</div>
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Daftar Rekap Kinerja Bawahan</h4>
											<VueDatePicker v-model="xbulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2CKH()" />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Daftar Rekap Kinerja Bawahan</h4>
											<VueDatePicker v-model="xbulan" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2CKH()" />
									</div>
								</div>
								<hr/>
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
											<tr v-if="ckh.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
											</tr>
											<tr v-for="item in paginatedItem" v-else :key="item.id">
                                                <td>
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.nama }} </BBadge><br/>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{ item.nip }} </BBadge>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'DIKIRIM'" variant="light">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'DISETUJUI'" variant="primary">DISETUJUI</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 'NONE'" variant="dark">BELUM UPLOAD</BBadge>
                                                </td>
												<td>
													<span v-if="item.status != 'NONE'" style="font-size: smaller;"><i><i-iconoir-send-solid /> Dikirim : {{ item.created }}</i></span><br/>
                                                    <span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i><i-mdi-update /> Diverifikasi : {{ item.update }}</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mdi-person-tie /> <i>Verifikator : {{ item.petugas }}	</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mingcute-comment-fill /> <i>Komentar : {{ item.alasan }}	</i></span>
												</td>
                                                <td>
                                                    <BButton v-if="!loadingaksi[item.id] && item.status != 'NONE'" pill size="sm" variant="outline-primary" @click.prevent="aksiStatus(item.id,item.filename)"><b><i-mdi-call-to-action /> AKSI</b></BButton>
                                                    <span v-else-if="item.status == 'NONE'"><i-guidance-forbidden /></span>
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

<script>
export default {
    data() {
        return {
            title: "Rekap Kinerja ASN",
            text: "Atasan",
            text1: "Rekap Kinerja ASN",
            name: "/",
			user: JSON.parse(localStorage.getItem('user')),
			xbulan: null,
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Status', data: 'status' },
				{ name: 'Keterangan', data: 'keterangan' },
				{ name: 'Action', data: 'action' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			ckh: [],
			satker: null,
			ckh0: [],
            xid: null,
            sid: null,
            ckhData: [],
            ckhData2: [],
            ckh0Data: [],
            ckh0Data2: [],
            selectedOption: 'data'
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.ckh.sort((a, b) => {
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
			return this.ckh.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.ckh.length / this.itemsPerPage);
        },
	},
  created() {
		this.getCKH(),
		window.scrollTo(0,0)
	},
  methods: {
		async getCKH() {

			const today = new Date();
			let date = null;
			let xdate = null;
			
			if(today.getMonth == 0){
				date = today.getFullYear()-1 + '-' + (today.getMonth()+12) + '-01';
				xdate = {month: today.getMonth()+11, year: today.getFullYear()-1};
			}else{
				date = today.getFullYear() + '-' + (today.getMonth()) + '-01';
				xdate = {month: today.getMonth()-1, year: today.getFullYear()};
			}
			this.xbulan = xdate
			this.loading = true;
			try{
				if(this.user.kat_jabatan == 'kepala'){
					const headers = {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						};
					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapKinerja',{
						xid: date,
						uid: this.user.id,
						id: this.user.dept_id,
					},{headers})
					
					if(response.data.success == true){
						this.ckh0Data = response.data.data
						this.ckhData = response.data.data
						this.ckh0Data2 = response.data.data2 || []
						this.ckhData2 = response.data.data2 || []
						this.satker = response.data.satker
						this.setCkh(this.selectedOption)
					}else{
						this.$toast.fire({
							title: response.data.message,
							icon: 'error',
						})
					}
				}else{
					this.$swal.fire({
							title: 'FORBIDDEN!',
							html: 'Anda Tidak Memiliki Hak Akses ke Bagian Ini!',
							icon: 'danger',
						})
						this.$router.push('/laporankinerja')
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
            this.xid = this.$route.params.xid
            this.sid = this.$route.params.id
			this.loading = true;
			let date = null;
			let month = this.xbulan.month;
			month += 1;
			
			
			date = this.xbulan.year + '-' + month + '-01';
			console.log(date)
			try{
				if(this.user.kat_jabatan == 'kepala'){
					const headers = {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem('token')}`
						};
					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapKinerja',{
						xid: date,
						uid: this.user.id,
						id: this.user.dept_id,
					},{headers})
					
					if(response.data.success == true){
						this.ckh0Data = response.data.data
						this.ckhData = response.data.data
						this.ckh0Data2 = response.data.data2 || []
						this.ckhData2 = response.data.data2 || []
						this.satker = response.data.satker
						this.setCkh(this.selectedOption)
					}else{
						this.$toast.fire({
							title: response.data.message,
							icon: 'error',
						})
					}
				}else{
					this.$swal.fire({
							title: 'FORBIDDEN!',
							html: 'Anda Tidak Memiliki Hak Akses ke Bagian Ini!',
							icon: 'danger',
						})
						this.$router.push('/laporankinerja')
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

			this.ckh.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.ckh = this.ckh0;
			} else {
				this.ckh = this.ckh0.filter((item) => {
					return item.nama.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		setCkh(option) {
			this.selectedOption = option;
			if (option === 'data') {
				this.ckh0 = this.ckh0Data;
				this.ckh = this.ckhData;
			} else if (option === 'data2') {
				this.ckh0 = this.ckh0Data2;
				this.ckh = this.ckhData2;
			}
			this.currentPage = 1; // Reset to first page
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
			let month = (this.xbulan.month)+1
			let date = this.xbulan.year + '-' + month + '-01';
			console.log(date)
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateStatusKinerja',{
					id: id,
					komen: komen,
					status: st,
					xid: date,
					uid: this.user.id,
					sid: this.user.dept_id,
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					console.log(response.data.data)
					console.log(response.data.data2)
					console.log(response.data.tes)
					if (this.selectedOption === 'data') {
						this.ckh0Data = response.data.data
						this.ckhData = response.data.data
					} else if (this.selectedOption === 'data2') {
						this.ckh0Data2 = response.data.data2 || []
						this.ckhData2 = response.data.data2 || []
					}
					this.satker = response.data.satker
					this.setCkh(this.selectedOption)
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

<style scoped>
.kinerja-bawahan-page {
  background:
    radial-gradient(circle at top left, rgba(201, 157, 79, 0.1), transparent 28%),
    linear-gradient(180deg, #1f1213 0%, #2a191a 100%);
  color: #fff2d1;
}

.kinerja-bawahan-page :deep(.dash-cards.card) {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.97), rgba(31, 18, 19, 0.98));
  border: 1px solid rgba(201, 157, 79, 0.16);
  border-radius: 24px;
}

.kinerja-bawahan-page :deep(.card-header),
.kinerja-bawahan-page :deep(.card-body) {
  color: #fff2d1;
}

.kinerja-bawahan-page :deep(.card-header h4),
.kinerja-bawahan-page :deep(.listing-search .form-control),
.kinerja-bawahan-page :deep(.pagination .page-link),
.kinerja-bawahan-page :deep(.dashborad-menus li a) {
  color: #fff4dc;
}

.kinerja-bawahan-page :deep(.listing-search .form-control) {
  background: rgba(255, 244, 220, 0.04);
  border: 1px solid rgba(201, 157, 79, 0.24);
}

.kinerja-bawahan-page :deep(.table thead th) {
  background: rgba(201, 157, 79, 0.14);
  color: #fff4dc;
}

.kinerja-bawahan-page :deep(.table tbody td) {
  background: rgba(255, 244, 220, 0.03);
  color: #fff2d1;
}

.kinerja-bawahan-page :deep(.badge) {
  color: #fff;
}

.kinerja-bawahan-page :deep(.btn-outline-primary) {
  border-color: rgba(201, 157, 79, 0.42);
  color: #fff4dc;
}

.kinerja-bawahan-page :deep(.btn-outline-primary:hover) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
}

@media (max-width: 767px) {
  .kinerja-bawahan-page :deep(.dash-cards.card) {
    border-radius: 18px;
  }
}
</style>
