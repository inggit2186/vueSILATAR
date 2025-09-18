<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
						<gajiMenu />
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Laporan Slip Gaji</h4>
											<VueDatePicker v-model="bulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2SlipGaji()" />
											<!--
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="rekapKinerja()" style="float: right;"><i-ri-file-ppt-2-fill /> <b>REKAP</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>REKAP</b></a>
											-->
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Laporan Slip Gaji</h4>
											<VueDatePicker v-model="bulan" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2SlipGaji()" />
											<!--
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="rekapKinerja()" style="float:right;margin-right: 10px;"><i-ri-file-ppt-2-fill /> <b>REKAP</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>REKAP</b></a>
											-->
									</div>
								</div>
								<hr/>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
										<div class="settings-upload-btn d-none d-sm-block" style="float: right;margin-left:20px;">
											<input id="filex" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="image" class="hide-input image-upload" @change="onFile">
											<label for="filex" class="file-upload" :disable="loadingfile">
												<span v-if="!loadingfile" style="color: aliceblue;"><i-subway-add /> <b>Tambah</b></span>
												<span v-else style="color: aliceblue;" ><i-svg-spinners-bars-scale-middle />&nbsp; JNE Berangkaattt... </span>
											</label>
                                        </div>
										<div class="group-img d-none d-sm-block" style="float: left;">
											<input v-model="keyword" type="text" class="form-control" placeholder="Search..." @input="filterTable" >
											<i class="feather-search"></i>
										</div>
										<div class="settings-upload-btn d-block d-sm-none">
											<input id="filex" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" name="image" class="hide-input image-upload" @change="onFile">
											<label for="file" class="file-upload" :disable="loadingfile">
												<span v-if="!loadingfile" style="color: aliceblue;"><i-subway-add /> <b>Tambah</b></span>
												<span v-else style="color: aliceblue;" ><i-svg-spinners-bars-scale-middle />&nbsp; JNE Berangkaattt... </span>
											</label>
                                        </div>
										<br/>
										<div class="group-img d-block d-sm-none">
											<input v-model="keyword" type="text" class="form-control" placeholder="Search..." @input="filterTable" >
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
                                                <td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Mencari Data...</b></span></td>
                                            </tr>
                                        </tbody>
										<tbody v-else>
											<tr v-if="slipgaji.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-for="(item,index) in paginatedItem" v-else :key="item.id">
                                                <td>{{ item.nip }}</td>
                                                <td>{{ item.nama }}<br/>
                                                    <small>{{ item.satker }}</small>
                                                </td>
                                                <td>Rp. {{ item.gaji.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- <br/>
                                                    <small>{{ item.bank }}</small>
                                                </td>
                                                <td>Rp. {{ item.potongan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </td>
                                                <td>Rp. {{ item.total.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </td>
                                                <td>
													<BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="dark" style="margin-bottom: 5px;" @click.prevent="cetakSlipGaji(item.id)"><b><i-ic-baseline-print /> CETAK</b></BButton><br/>
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="danger" @click.prevent="delAksi(item.tgl)"><b><i-ph-trash-fill /> DELETE</b></BButton>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Loading...</b></BButton>
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
            title: "Daftar Slip Gaji",
            text: "User",
            text1: "Daftar Slip Gaji",
            name: "/",
			bulan: null,
			columns2: [
				{ name: 'NIP', data: 'nip' },
				{ name: 'Nama', data: 'nama' },
				{ name: 'Gaji', data: 'gaji' },
				{ name: 'Potongan', data: 'potongan' },
				{ name: 'Total', data: 'total' },
				{ name: 'Action', data: 'action' },
			],
			kegiatan: [{
				id: 'kinerja0',
				kegiatan: '',
			}],
			counter:0,
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingfile: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			slipgaji: [],
			slipgaji0: [],
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
			return this.slipgaji.sort((a, b) => {
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
			return this.slipgaji.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.slipgaji.length / this.itemsPerPage);
        },
	},
  created() {
		this.getSlipGaji(),
		window.scrollTo(0,0)
	},
  methods: {
		delAksi(tgl){
			this.$swal.fire({
					title: 'Apakah anda yakin?',
					text: "Data akan dihapus secara permanen!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
                    showLoaderOnConfirm: true,
					confirmButtonText: 'Yes, Lanjut Hapus!'
					}).then((result) => {
					if (result.isConfirmed) {
						this.deleteAksi(tgl)
					}
			})
		},
		async deleteAksi(tgl) {
			this.loading = true;
			this.$toast.fire({
					title: 'Sedang Dalam Perbaikan',
					icon: 'error',
				})
		},
		async getSlipGaji() {
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-01';
			this.bulan = date;
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getSlipGaji',{
					bulan : this.bulan,
				},{headers})
				
				if(response.data.success == true){
                    this.slipgaji0 = response.data.data
          			this.slipgaji = response.data.data
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
        async get2SlipGaji() {
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getSlipGaji',{
					bulan : date
				},{headers})
				
				if(response.data.success == true){
                    this.slipgaji0 = response.data.data
          			this.slipgaji = response.data.data
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
		async cetakSlipGaji(itemid) {
			console.log(itemid)
			this.loadingaksi[itemid] = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/cetakSlipGaji',{
					id : itemid
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'error',
					})
					let item = response.data.file

					let frame = '<iframe src="'+ item +'" width="100%" height="700"></iframe>'

			if (window.innerWidth < 768) {
                this.$swal.fire({
                    width: "100%",
					allowOutsideClick: true,
                    html: frame,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    confirmButtonText: "Download"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(item,'_blank');
                    }
                });
            }else{
                this.$swal.fire({
                    width: "50%",
                    html: frame,
                    showCloseButton: true,
                    focusConfirm: false,
                    showCancelButton: true,
                    cancelButtonText: 'Tutup',
                    confirmButtonText: "Download"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.open(item,'_blank');
                    }
                });
            }
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
				this.loadingaksi[itemid] = false
			}
		},

		onFile(event) {
			console.log('adadada')
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (event) => {
			this.fileUrl = event.target.result
			this.fileName = file.name
			if(file.size > 2560000){
                this.$toast.fire({
                    title: "File Tidak Boleh lebih dari 2MB !",
                    icon: "warning"
                });
            }else if(file.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
   						file.type != 'application/vnd.ms-excel' &&
   						file.type != 'text/csv'){
                    this.$toast.fire({
                        title: "File harus tipe EXCEL(.csv .xls .xlsx) !",
                        icon: "warning"
                    });
            }else{
				this.uploadFile();
             }
		}

		reader.readAsDataURL(file)
		},
		async uploadFile(){
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-01';
			this.bulan = date;
			console.log(this.fileUrl)
			this.loadingfile = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadSlipGaji',{
					filex: this.fileUrl,
					bulan: date
				},{headers})
				
				if(response.data.success == true){
                    this.slipgaji0 = response.data.data
          			this.slipgaji = response.data.data
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
				this.loadingfile = false
			}
		},
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.slipgaji.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.slipgaji = this.slipgaji0;
			} else {
				this.slipgaji = this.slipgaji0.filter((item) => {
					return item.nip.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.nama.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.satker.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		async addKinerja(){
			this.loading = true
			console.log(this.tanggal)
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addKinerja',{
					status: this.status,
                    tanggal: this.tanggal,
                    formx: this.kegiatan,
					n: this.counter
				},{headers})
				
				if(response.data.success == true){
					
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
					this.tanggal = null
					this.kegiatan = [{
						id: 'kinerja0',
						kegiatan: '',
					}],
					this.changedetail(1)
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