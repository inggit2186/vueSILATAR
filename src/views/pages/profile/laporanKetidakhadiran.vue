<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
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
										<h4>Laporan Pengaduan</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2Error()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Laporan Pengaduan</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2Error()" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply />
									</div>
								</div>
								<hr/>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
										<div class="group-img d-none d-sm-block">
                                            <input type="text" v-model="keyword"  @input="filterTable" class="form-control" placeholder="Search...">
                                            <i class="feather-search"></i>
                                        </div>
										<div class="group-img d-block d-sm-none">
                                            <input type="text" v-model="keyword"  @input="filterTable" class="form-control" style="float:left; max-width: 50%;margin-right: 5px;" placeholder="Search...">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-if="this.$route.params.id == 'admin'" v-for="column in columns" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
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
										<tbody v-else-if="!loading && this.$route.params.id == 'admin'">
											<tr v-if="this.error.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="(item,index) in paginatedItem" :key="item.id" >
                                                <td @click.prevent="cetak(item.id, item.filename)"><b>{{ item.nama }}</b><br/>
													<span style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.nip }}	</i></span>
												</td>
                                                <td @click.prevent="cetak(item.id, item.filename)"><b>{{ item.kategori }}</b></td>
                                                <td @click.prevent="cetak(item.id, item.filename)"><b>{{ item.tanggalmulai }}</b> &nbsp;s/d&nbsp; <b>{{ item.tanggalselesei }}</b></td>
                                                <td @click.prevent="cetak(item.id, item.filename)">{{ item.keterangan }}</td>
                                                <td @click.prevent="cetak(item.id, item.filename)">
                                                    <BBadge v-if="item.status == 'PENDING'" variant="warning">PENDING</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="primary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                </td>
                                                <td v-if="!loadingaksi[item.id] && item.status == 'PENDING'"><BButton pill size="sm" variant="success" @click.prevent="cetak(item.id, item.filename)"><i-ri-question-answer-fill />  <b>VERIFIKASI</b></BButton></td>
                                                <td v-else-if="loadingaksi[itemid]"><i-svg-spinners-blocks-wave /></td>
                                                <td v-else @click.prevent="cetak(item.id, item.filename)"><b>{{ item.alasan }}</b><br/>
                                                    <span v-if="item.verifikator != 'PTSP Bot'" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.verifikator }}	</i></span>
                                                </td>
                                            </tr>
										</tbody>
										<tbody v-else>
											<tr v-if="this.error.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="(item,index) in paginatedItem" :key="item.id" >
                                                <td @click.prevent="cetak(item.id, item.filename)"><b>{{ item.kategori }}</b></td>
                                                <td @click.prevent="cetak(item.id, item.filename)"><b>{{ item.tanggalmulai }}</b> &nbsp;s/d&nbsp; <b>{{ item.tanggalselesei }}</b></td>
                                                <td @click.prevent="cetak(item.id, item.filename)">{{ item.keterangan }}</td>
                                                <td>
                                                    <BBadge v-if="item.status == 'PENDING'" variant="warning">PENDING</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="primary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                </td>
                                                <td v-if="!loadingaksi[item.id] && item.status == 'PENDING'"><BButton pill size="sm" variant="danger" @click.prevent="deleteError(item.id)"><i-bi-trash-fill />  <b>DELETE</b></BButton></td>
                                                <td v-else-if="loadingaksi[itemid]"><i-svg-spinners-blocks-wave /></td>
                                                <td v-else @click.prevent="cetak(item.id, item.filename)">{{ item.alasan }}<br/>
                                                    <span v-if="item.verifikator != 'PTSP Bot'" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.verifikator }}	</i></span>
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
import PresensiMenu from '@/components/presensiMenu.vue';

export default {
    data() {
        return {
            title: "Laporan Pengaduan",
            text: "User",
            text1: "Laporan Pengaduan",
            name: "/",
			bulan: null,
			columns: [
				{ name: 'Nama', data: 'nama' },
				{ name: 'Kategori', data: 'kategori' },
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Deskripsi', data: 'keterangan' },
				{ name: 'Status', data: 'status' },
				{ name: 'Opsi', data: 'opsi' },
			],
			columns2: [
				{ name: 'Kategori', data: 'kategori' },
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Deskripsi', data: 'keterangan' },
				{ name: 'Status', data: 'status' },
				{ name: 'Opsi', data: 'opsi' },
			],
			kegiatan: [{
				id: 'error0',
				kegiatan: '',
			}],
			counter:0,
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			error: [],
			error0: [],
			tanggal: [],
            detail: 1,
            status: null,
			rekapstatus: 0,
			xdate: null
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.error.sort((a, b) => {
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
			return this.error.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.error.length / this.itemsPerPage);
        },
	},
  created() {
		this.getError(),
		window.scrollTo(0,0)
	},
  methods: {
		async getError() {
			this.loading = true;
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-01';
			this.bulan = date;
			this.xdate = date;
			this.rekapstatus = 0;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myCuti',{
					nav: this.$route.params.id,
					bulan : this.bulan
				},{headers})
				
				if(response.data.success == true){
                    console.log(response.data)
          			this.error0 = response.data.data
          			this.error = response.data.data
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
		async get2Error() {
			this.rekapstatus = 1;
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.xdate = date
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myCuti',{
					nav: this.$route.params.id,
					bulan : date
				},{headers})
				
				if(response.data.success == true){
                    console.log(response.data)
          			this.error0 = response.data.data
          			this.error = response.data.data
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
        deleteError(id){
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
						this.deleteAksi(id)
					}
			})
		},
        async deleteAksi(id) {
            try{
                this.loadingaksi[id] = true;
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteCuti',{
					source: 'vuejs',
                    id : id
				},{headers})
				
				if(response.data.success == true){
                    console.log(response.data)
          			this.error0 = response.data.data
          			this.error = response.data.data
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
				this.loadingaksi[id] = false;
			}
        },
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.error.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword === null) {
				this.error = this.error0;
			} else {
				this.error = this.error0.filter((item) => {
				return (
					(item.tanggalmulai && item.tanggalmulai.toLowerCase().includes(this.keyword.toLowerCase())) ||
					(item.nip && item.nip.toLowerCase().includes(this.keyword.toLowerCase())) ||
					(item.deskripsi && item.deskripsi.toLowerCase().includes(this.keyword.toLowerCase())) ||
					(item.nama && item.nama.toLowerCase().includes(this.keyword.toLowerCase()))
				);
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},

        cetak(id,item){
            let frame = null;
            let isPDF = item.toLowerCase().endsWith('.pdf');
            let isWord = item.toLowerCase().endsWith('.doc') || item.toLowerCase().endsWith('.docx');
            let isExcel = item.toLowerCase().endsWith('.xlsx');
            
            frame = '<iframe src="'+ item +'" width="100%" height="650"></iframe>'
            
            if(this.$route.params.id == 'admin'){
				if (window.innerWidth < 768) {
					this.$swal.fire({
						width: "100%",
						html: frame,
						input: "textarea",
						inputLabel: "Komentar",
						inputPlaceholder: "Tulis Komentar Anda Disini...",
						inputAttributes: {
							"aria-label": "Tulis Komentar Anda Disini"
						},
						showCloseButton: true,
						focusConfirm: false,
						showDenyButton: true,
						denyButtonText: 'TOLAK',
						confirmButtonText: "SETUJU",
						returnInputValueOnDeny: true
					}).then((result) => {
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
						showCloseButton: true,
						focusConfirm: false,
						showDenyButton: true,
						denyButtonText: 'TOLAK',
						confirmButtonText: "SETUJU",
						returnInputValueOnDeny: true
					}).then((result) => {
						if (result.isConfirmed) {
							this.updateStatus(id,result.value,'DITERIMA')
						}
						else if (result.isDenied) {
							this.updateStatus(id,result.value,'DITOLAK')
						};
					});
				}
			}else{
				if (window.innerWidth < 768) {
					this.$swal.fire({
						width: "100%",
						html: frame,
						showCloseButton: true,
						focusConfirm: false,
						showCancelButton: true,
						denyButtonText: 'Tutup',
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
			}
        },

		async updateStatus(id,komen,st){
			this.loadingaksi[id] = true
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

					console.log(komen)
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateCuti',{
					id: id,
					komen: komen,
					status: st,
					bulan: this.xdate
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					this.error0 = response.data.data
          			this.error = response.data.data	
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