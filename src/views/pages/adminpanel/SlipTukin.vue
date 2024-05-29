<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
						<gajiMenu />
						<div v-if="xid != 'nonguru'" class="">
							<ul class="dashborad-menus">
								<li :class="{ active: $route.path === '/sliptukin/'+xid+'/mad' }">
									<router-link :to='"/sliptukin/"+xid+"/mad"'>
										<i-ic-baseline-work-history /> <span>Guru Madrasah</span>
									</router-link>
								</li>
								<li :class="{ active: $route.path === '/sliptukin/'+xid+'/pai' }">
									<router-link :to='"/sliptukin/"+xid+"/pai"'>
										<i-ic-baseline-work-history /> <span>Guru PAI </span>
									</router-link>
								</li>
							</ul>
						</div>
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Laporan Tukin "{{ tgl }}"</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2SlipTukin()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply />
											<!--
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="rekapKinerja()" style="float: right;"><i-ri-file-ppt-2-fill /> <b>REKAP</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>REKAP</b></a>
											-->
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Laporan Tukin "{{ tgl }}"</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2SlipTukin()" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply />
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
											<label for="file" class="file-upload" :disable="loadingfile">
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
                                                <th v-if="xid == 'nonguru'" v-for="column in columns3" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
												<th v-else v-for="column in columns2" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="loading">
                                            <tr>
                                                <td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Mencari Data...</b></span></td>
                                            </tr>
                                        </tbody>
										<tbody v-else-if="!loading && xid == 'nonguru'">
											<tr v-if="this.sliptukin.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="(item,index) in paginatedItem" :key="item.id">
                                                <td>{{ item.nip }}<br/>
                                                    <small><i>{{ item.kode_gapok }}</i></small></td>
                                                <td>{{ item.nama }}<br/>
                                                    <small>{{ item.satker }}</small>
													<br/>
                                                    <small><i>({{ item.kdgol }} / {{ item.gol }})</i></small>
                                                </td>
                                                <td>Rp. {{ item.tukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- <br/>
                                                    <small><i>Grade {{ item.grade }}</i></small>
                                                </td>
                                                <td>Rp. {{ item.potongan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </td>
                                                <td>Rp. {{ item.total.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </td>
                                                <td>
													<BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="dark" @click.prevent="cetakSlipTukin(item.id)" style="margin-bottom: 5px;"><b><i-ic-baseline-print /> CETAK</b></BButton><br/>
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="danger" @click.prevent="delAksi(item.tanggal)"><b><i-ph-trash-fill /> DELETE</b></BButton>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Loading...</b></BButton>
                                                </td>
                                            </tr>
										</tbody>
										<tbody v-else>
											<tr v-if="this.sliptukin.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="(item,index) in paginatedItem" :key="item.id">
                                                <td><b>{{ item.nip }}</b><br/>
                                                    <small><i>{{ item.kode_gapok }}</i></small></td>
                                                <td><b>{{ item.nama }}</b><br/>
                                                    <small>{{ item.satker }}</small>
													<br/>
                                                    <small><i>({{ item.kdgol }} / {{ item.gol }})</i></small>
                                                </td>
                                                <td><b>Rp. {{ item.tpg.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </b><br/>
                                                    <small><i>( JTM : {{ item.jtm }} )</i></small></td>
                                                <td><b>Rp. {{ item.selisihtukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </b><br/>
                                                    <small><i>Grade {{ item.grade }}</i></small><br/>
                                                    <small v-if="xid == 'serdik' && item.jtm >= 24"><i>(Rp. {{ item.tukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }} - Rp. {{ item.tpg.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }} )</i></small>
                                                    <small v-else-if="xid == 'nonserdik' || item.jtm < 24"><i>({{ item.jtm }}/24 x 50% dari Rp. {{ item.tukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }})</i></small>
												</td>
												<td>Rp. {{ item.potongan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </td>
                                                <td><b>Rp. {{ item.nett.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},- </b><br/>
													<small><i>Pajak {{ item.pajak }}%</i></small><br/>
													<small><i>(Rp. {{ item.total.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }} - Rp. {{ item.jmlpajak.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }})</i></small>
												</td>
                                                <td>
													
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="danger" @click.prevent="delAksi(item.tanggal)"><b><i-ph-trash-fill /> DELETE</b></BButton>
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
				{ name: 'TPG', data: 'tpg' },
				{ name: 'Tukin/Selisih', data: 'tukin' },
				{ name: 'Potongan', data: 'potongan' },
				{ name: 'Total', data: 'total' },
				{ name: 'Action', data: 'action' },
			],
			columns3: [
				{ name: 'NIP', data: 'nip' },
				{ name: 'Nama', data: 'nama' },
				{ name: 'Tukin', data: 'tukin' },
				{ name: 'Potongan', data: 'potongan' },
				{ name: 'Total', data: 'total' },
				{ name: 'Action', data: 'action' },
			],
			kegiatan: [{
				id: 'kinerja0',
				kegiatan: '',
			}],
			xid:this.$route.params.xid,
			id:this.$route.params.id,
			counter:0,
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingfile: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			sliptukin: [],
			sliptukin0: [],
			tanggal: [],
            detail: 1,
			tgl: null,
            status: null,
			rekapstatus: 0,
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.sliptukin.sort((a, b) => {
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
			return this.sliptukin.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.sliptukin.length / this.itemsPerPage);
        },
	},
  watch: {
    '$route' (to, from) {
		if(to.fullPath != from.fullPath){
			this.xid = to.params.xid
			this.id = to.params.id
			this.getSlipTukin()
		}
    }
  },
  created() {
		this.getSlipTukin(),
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
		async getSlipTukin() {
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-01';
			this.bulan = date;
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getSlipTukin',{
					xid : this.xid,
					id : this.id,
					bulan : this.bulan,
				},{headers})
				
				if(response.data.success == true){
                    this.sliptukin0 = response.data.data
          			this.sliptukin = response.data.data
					this.tgl = response.data.bulan
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
        async get2SlipTukin() {
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getSlipTukin',{
					xid : this.xid,
					id : this.id,
					bulan : date
				},{headers})
				
				if(response.data.success == true){
                    this.sliptukin0 = response.data.data
          			this.sliptukin = response.data.data
					this.tgl = response.data.bulan
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
		async cetakSlipTukin(itemid) {
			console.log(itemid)
			this.loadingaksi[itemid] = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/cetakSlipTukin',{
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
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (event) => {
			this.fileUrl = event.target.result
			this.fileName = file.name
			this.uploadFile();
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
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadSlipTukin',{
					filex: this.fileUrl,
					bulan: date
				},{headers})
				
				if(response.data.success == true){
                    this.sliptukin0 = response.data.data
          			this.sliptukin = response.data.data
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

			this.sliptukin.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.sliptukin = this.sliptukin0;
			} else {
				this.sliptukin = this.sliptukin0.filter((item) => {
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