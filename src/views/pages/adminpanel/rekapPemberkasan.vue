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
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Rekap Pemberkasan</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2CKH()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply />
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="rekapRequest()" style="float: right;"><i-ri-file-ppt-2-fill /> <b>DOWNLOAD REKAP</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>Merekap...</b></a>
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Rekap Pemberkasan</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2CKH()" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply />
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="rekapRequest()" style="float: right;"><i-ri-file-ppt-2-fill /> <b>DOWNLOAD REKAP</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>Merekap...</b></a>
									</div>
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
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
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
											<tr v-if="this.ptsp.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td>
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.nama }} </BBadge><br/>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{ item.nip }} </BBadge>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'DRAFT'" variant="warning">DRAFT</BBadge>
                                                    <BBadge v-if="item.status == 'UNCHECK'" variant="light">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'DISETUJUI'" variant="primary">DISETUJUI</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 'NONE'" variant="dark">BELUM UPLOAD</BBadge>
                                                    <br/>
                                                    <span v-if="item.status != 'NONE'" style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.petugas }}	</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mingcute-comment-fill /><i> {{ item.alasan }}	</i></span>
                                                </td>
                                                <td>
                                                    <BButton v-if="!loadingaksi[item.id] && item.status != 'NONE'" pill size="sm" variant="outline-primary" @click.prevent="aksiStatus(item.noreq)"><b><i-mdi-call-to-action /> Cek Detail!</b></BButton>
                                                    <span v-else-if="item.status == 'NONE'"><i-guidance-forbidden /></span>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Loading...</b></BButton>
													<br/>
													<span v-if="xid == '1037'" style="font-size: smaller;font-style: italic;"><i-mdi-files/> {{ item.tipe }}</span>
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
            title: "Rekap Kinerja ASN",
            text: "Admin",
            text1: "Rekap Kinerja ASN",
            name: "/",
			bulan: {month: today.getMonth()-1, year:today.getFullYear()},
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Status', data: 'status' },
				{ name: 'Action', data: 'action' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingrekap: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			ptsp: [],
			ptsp0: [],
            xid: null,
			bulanx: null,
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
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapPemberkasan',{
					xid: date,
                    asn: this.sid,
					id: this.xid,
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

		async get2CKH() {
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.bulanx = date
            this.xid = this.$route.params.xid
            this.sid = this.$route.params.id
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapPemberkasan',{
					xid: date,
                    asn: this.sid,
					id: this.xid,
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
					return item.nama.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
        aksiStatus(id) {
			this.$router.push(`/cekpemberkasan/${this.$route.params.xid}/${id}`)
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
                    xid: this.bulanx,
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
		rekapRequest(){
			let option = null;
			console.log(this.$route.params.xid)

			if(this.$route.params.xid === '777'){
				option = `<table>
							<tr>
								<td>Kategori</td><td> : </td><td><select id="kategori" class="swal2-input" name="kategori">
										<option value="personal"> PRIBADI </option>
										<option value="satker">Seksi / Satker </option>
									</select></td>
							</tr>
							<tr>
								<td>status</td><td> : </td><td><select id="status" class="swal2-input" name="status">
										<option value="all"> SEMUA </option>
										<option value="PENDING"> PENDING </option>
										<option value="AKTIF"> AKTIF </option>
									</select></td>
							</tr>
							<tr>
								<td>Tanggal Mulai</td><td> : </td><td><input type="date" id="tgl_start" name="tgl_start" class="swal2-input"></td>
							</tr>
							<tr>
								<td>Tanggal Selesei</td><td> : </td><td><input type="date" id="tgl_end" name="tgl_end" class="swal2-input"></td>
							</tr>
							</table>`
			}else if(this.$route.params.xid === '1037'){
				option = `<table>
							<tr>
								<td>Kategori</td><td> : </td><td><select id="kategori" class="swal2-input" name="kategori">
										<option value="personal"> PRIBADI </option>
										<option value="satker">Seksi / Satker </option>
									</select></td>
							</tr>
							<tr>
								<td>status</td><td> : </td><td><select id="status" class="swal2-input" name="status">
										<option value="all"> SEMUA </option>
										<option value="DISETUJUI"> DISETUJUI </option>
										<option value="DITOLAK"> DITOLAK </option>
										<option value="UNCHECK"> BELUM DI CHECK </option>
										<option value="DRAFT"> DRAFT </option>
									</select></td>
							</tr>
							<tr>
								<td style="vertical-align: middle;"><span style='font-size: 15px;'>Tahun Pelajaran</span></td><td style="vertical-align: middle;"> : </td><td style="vertical-align: middle;"><select id="tgl_start" name="tgl_start" type="text" class="swal2-input">
										<option value="2022">2022 / 2023</option>
										<option value="2023">2023 / 2024</option>
										<option value="2024" selected>2024 / 2025</option>
										<option value="2025">2025 / 2026</option>
										<option value="2026">2026 / 2027</option>
										<option value="2027">2027 / 2028</option>
									</select></td>
							</tr>
							<tr>
								<td style="vertical-align: middle;"><span style='font-size: 15px;'>Semester/Periode</span></td><td style="vertical-align: middle;"> : </td><td style="vertical-align: middle;"><select id="tgl_end" name="tgl_end" type="date" class="swal2-input">
										<option value="no" disabled selected>--Pilih Salah Satu--</option>
										<option value="1">Semester I</option>
										<option value="2">Semester II</option>
									</select></td>
							</tr>
							</table>`
			}else if(this.$route.params.xid === '1038'){
				option = `<table>
							<tr>
								<td>Kategori</td><td> : </td><td><select id="kategori" class="swal2-input" name="kategori">
										<option value="personal"> PRIBADI </option>
										<option value="satker">Seksi / Satker </option>
									</select></td>
							</tr>
							<tr>
								<td>status</td><td> : </td><td><select id="status" class="swal2-input" name="status">
										<option value="all"> SEMUA </option>
										<option value="DISETUJUI"> DISETUJUI </option>
										<option value="DITOLAK"> DITOLAK </option>
										<option value="UNCHECK"> BELUM DI CHECK </option>
										<option value="DRAFT"> DRAFT </option>
									</select></td>
							</tr>
							<tr>
								<td>Tanggal Mulai</td><td> : </td><td><input type="date" id="tgl_start" name="tgl_start" class="swal2-input"></td>
							</tr>
							<tr>
								<td>Tanggal Selesei</td><td> : </td><td><input type="date" id="tgl_end" name="tgl_end" class="swal2-input"></td>
							</tr>
							</table>`
			}else if(this.$route.params.xid === 'janjitemu'){
				option = `<table>
							<tr>
								<td>Kategori</td><td> : </td><td><select id="kategori" class="swal2-input" name="kategori">
										<option value="personal"> PRIBADI </option>
										<option value="satker">Seksi / Satker </option>
									</select></td>
							</tr>
							<tr>
								<td>status</td><td> : </td><td><select id="status" class="swal2-input" name="status">
										<option value="all"> SEMUA </option>
										<option value="APPOINTMENT"> DIAJUKAN </option>
										<option value="ON SITE"> DI LOKASI </option>
										<option value="PENDING"> PENDING </option>
										<option value="DITERIMA"> DITERIMA </option>
										<option value="DITOLAK"> DITOLAK </option>
										<option value="SUKSES"> SUKSES </option>
										<option value="BATAL"> BATAL </option>
										<option value="EXPIRED"> KADALUARSA </option>
									</select></td>
							</tr>
							<tr>
								<td>Tanggal Mulai</td><td> : </td><td><input type="date" id="tgl_start" name="tgl_start" class="swal2-input"></td>
							</tr>
							<tr>
								<td>Tanggal Selesei</td><td> : </td><td><input type="date" id="tgl_end" name="tgl_end" class="swal2-input"></td>
							</tr>
							</table>`
			}

			if(this.$route.params.xid === '777' || this.$route.params.xid === '1037' || this.$route.params.xid === '1038'){
				this.$swal.fire({
						title: 'Setting?',
						html: option,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, Download!'
						}).then((result) => {
						if (result.isConfirmed) {
							this.downloadRekap(document.getElementById("kategori").value,document.getElementById("status").value,document.getElementById("tgl_start").value,document.getElementById("tgl_end").value)
						}
				})
			}else if(this.$route.params.xid === '888'){
				this.$toast.fire({
						title: 'SEDANG DALAM PENGEMBANGAN !!',
						icon: 'error',
					})
			}else if(this.$route.params.xid === '999'){
				this.$toast.fire({
						title: 'SEDANG DALAM PENGEMBANGAN !!',
						icon: 'error',
					})
			}else{
				this.$swal.fire({
						title: 'Setting?',
						html:`<table>
							<tr>
								<td>Kategori</td><td> : </td><td><select id="kategori" class="swal2-input" name="kategori">
										<option value="satker"> SEKSI / SATKER </option>
										<option value="personal">PRIBADI </option>
									</select></td>
							</tr>
							<tr>
								<td>status</td><td> : </td><td><select id="status" class="swal2-input" name="status">
										<option value="all"> SEMUA </option>
										<option value="UNCHECK"> DIAJUKAN </option>
										<option value="PENDING"> PENDING </option>
										<option value="DITERIMA"> DITERIMA </option>
										<option value="DIPROSES"> DIPROSES </option>
										<option value="SUKSES"> SUKSES </option>
										<option value="DITOLAK"> DITOLAK </option>
										<option value="BATAL"> BATAL </option>
									</select></td>
							</tr>
							<tr>
								<td>Tanggal Mulai</td><td> : </td><td><input type="date" id="tgl_start" name="tgl_start" class="swal2-input"></td>
							</tr>
							<tr>
								<td>Tanggal Selesei</td><td> : </td><td><input type="date" id="tgl_end" name="tgl_end" class="swal2-input"></td>
							</tr>
							</table>
						`,
						icon: 'warning',
						showCancelButton: true,
						confirmButtonColor: '#3085d6',
						cancelButtonColor: '#d33',
						confirmButtonText: 'Yes, Download!'
						}).then((result) => {
						if (result.isConfirmed) {
							this.downloadRekap(document.getElementById("kategori"),document.getElementById("status").value,document.getElementById("tgl_start").value,document.getElementById("tgl_end").value)
						}
				})
			}
		},
		async downloadRekap(kategori,status,start,end) {
			this.loadingrekap = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
					
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/downloadRekapRequest',{
					layanan: this.$route.params.xid,
					kategori: kategori,
					status: status,
					tgl_start: start,
					tgl_end: end,
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})

					let item = response.data.data;

					let frame = null;
					let isPDF = item.toLowerCase().endsWith('.pdf');
					let isWord = item.toLowerCase().endsWith('.doc') || item.toLowerCase().endsWith('.docx');
					
					if(isWord){
						frame = '<iframe src="https://docs.google.com/gview?url='+ item +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
					}else{
						frame = '<iframe src="'+ item +'" width="100%" height="550"></iframe>'
					}

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
				this.loadingrekap = false
			}
		},
  }
}
</script>