<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Laporan Kehumasan</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2Kegiatan()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply />
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="nilaiHumas()" style="float: right;"><i-fa-solid-marker /> <b>PENILAIAN</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>MENILAI</b></a>
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Laporan Kehumasan</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2Kegiatan()" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply />
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" @click="nilaiHumas()" style="float:right;margin-right: 10px;"><i-fa-solid-marker /> <b>PENILAIAN</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>MENILAI</b></a>
									</div>
								</div>
								<hr/>
                            <div class="card-body">
								<div class="alert alert-info" role="alert">
									<div v-if="loading">
										<i-svg-spinners-bars-scale-fade />
									</div>
									<div v-else>
										<span style="font-size: 80px;">
											<i-noto-man-teacher-medium-light-skin-tone />
										</span>
										<br/>
											<BBadge v-if="humasstatus != null && humasstatus.status == 'DIKIRIM'" pill variant="warning" style="font-size: medium;"><i-grommet-icons-in-progress /> Dalam Penilaian</BBadge>
											<BBadge v-else-if="humasstatus != null && humasstatus.status == 'DISETUJUI'" pill variant="success" style="font-size: medium;"><i-codicon-thumbsup-filled /> DISETUJUI</BBadge>
											<BBadge v-else-if="humasstatus != null && humasstatus.status == 'DITOLAK'" pill variant="dark" style="font-size: medium;"><i-codicon-thumbsdown-filled /> DITOLAK</BBadge>
											<BBadge v-else pill variant="danger" style="font-size: medium;"><i-carbon-license-draft /> Belum Dikirim</BBadge>
											<br/>
											<div v-if="humasstatus != '<NoData>' && humasstatus != null && humasstatus.verifikator != 999" style="padding-top: 5px;"><i-twemoji-man-police-officer style="font-size: large;"/><span style="font-size: small;font-weight: 700; font-style: italic; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"> {{ humasstatus.verif }}</span></div>
										<hr/>
										<ul v-if="humasstatus != '<NoData>' && humasstatus != null">
											<li><i-mdi-tooltip-user /> <b>Komentar User</b></li>
											<li v-if="humasstatus != null && humasstatus.user_keterangan != '<NoKomen>' || humasstatus.user_keterangan != ''"><i>"{{ humasstatus.user_keterangan }}"</i></li>
										</ul>
										<hr/>
										<ul v-if="humasstatus != '<NoData>' && humasstatus != null && humasstatus.verifikator != 999">
											<li><i-ri-kakao-talk-fill /> <b>Feedback/Komentar Verifikator</b></li>
											<li v-if="humasstatus != null && humasstatus.ver_keterangan != '<NoKomen>' || humasstatus.ver_keterangan != ''"><i>"{{ humasstatus.ver_keterangan }}"</i></li>
										</ul>
									</div>
								</div>
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
											<tr v-if="this.kinerja.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="(item,index) in paginatedItem" :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a></td>
                                                <td><b>{{ item.penulis }} </b></td>
                                                <td style="font-size: small;">
                                                   <div v-for="kerja in item.kegiatan" :key="kerja.id">
													{{ kerja.judul }}  <b>( • <a :href="kerja.link.startsWith('https://') ? kerja.link : 'https://' + kerja.link" target="_blank">{{ kerja.platform }}</a> • <a v-if="kerja.file_path != 'NONE'" :href="apiUrl + kerja.file_path" target="_blank"> &nbsp;<i-bi-camera-fill /> &nbsp;</a>)</b><br/>
												   </div>
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
            title: "Laporan Humas Harian",
            text: "User",
            text1: "Laporan Humas Harian",
            name: "/",
			bulan: null,
			datex: null,
			columns2: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Penulis', data: 'penulis' },
				{ name: 'Judul', data: 'judul' },
			],
			kegiatan: [{
				id: 'kinerja0',
				judul: '',
				link: '',
				platform: '',
				file: null,
				file_path: 'NONE',
				filename: 'Upload Foto'
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
			kinerja: [],
			kinerja0: [],
			humasstatus: null,
			tanggal: [],
            detail: 1,
            status: null,
			rekapstatus: 0,
        }
    },
    computed: {
		apiUrl() {
			return import.meta.env.VITE_APP_UPL_URL;
		},
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.kinerja.sort((a, b) => {
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
			return this.kinerja.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.kinerja.length / this.itemsPerPage);
        },
	},
  created() {
		this.getKegiatan(),
		window.scrollTo(0,0)
	},
  methods: {
        changedetail(id,st,xid){
            if(st === 'Edit'){
				this.status = st,
				this.detail = id;
				this.tanggal = this.kinerja[xid].tgl;
				this.kegiatan = this.kinerja[xid].kegiatan;

				this.kegiatan.forEach(kegiatan => {
					if (kegiatan.file_path && kegiatan.file_path !== 'NONE') {// Extract the file name from the path
						kegiatan.filename = 'Ganti File'; // Set the filename property
					} else {
						kegiatan.filename = 'Upload Foto'; // Default value if no file_path
						kegiatan.file_path = 'NONE'
					}
				});
			}else{
				this.status = st,
				this.detail = id;
				this.kegiatan = [{
						id: 'kinerja0',
						judul: '',
						link: '',
						platform: '',
						file: null,
						file_path: 'NONE',
						filename: 'Upload Foto'
					}],
				this.tanggal = null
			}
            window.scrollTo(0,0)
        },
		clone(){
			this.kegiatan.push({
				id: `kinerja${++this.counter}`,
				judul: '',
				link: '',
				platform: '',
				file: null,
				file_path: 'NONE',
				filename: 'Upload Foto'
			});
		},
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
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

					console.log(tgl)
					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteHumas',{
						tgl: tgl,
					},{headers})

				if(response.data.success == true){
                    console.log(response.data)
          			this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
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
		async getKegiatan() {
			this.loading = true;
			const today = new Date();
			const date = today.getFullYear() + '-' + (today.getMonth()+1) + '-01';
			this.bulan = date;
			this.datex = date;
			this.rekapstatus = 0;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/adminHumas',{
					satker: this.$route.params.id,
                    bulan : this.bulan
				},{headers})
				
				if(response.data.success == true){
          			this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
					this.humasstatus = response.data.rekap
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
		async get2Kegiatan() {
			this.rekapstatus = 1;
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.datex = date;
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/adminHumas',{
					satker: this.$route.params.id,
                    bulan : date
				},{headers})
				
				if(response.data.success == true){
                    console.log(response.data)
          			this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
					this.humasstatus = response.data.rekap
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
		async nilaiHumas() {
			if(this.humasstatus == '<NoData>'){
				this.$toast.fire({
					title: 'Rekap Humas Belum Dikirim oleh Operator',
					icon: 'error',
					})
			}else{
				this.$swal.fire({
					width: "50%",
					input: "textarea",
					inputLabel: "Feedback Penilaian",
					inputPlaceholder: "Tulis Feedback/Komentar Anda Disini...",
					inputAttributes: {
						"aria-label": "Tulis Feedback/Komentar Anda Disini..."
					},
					showConfirmButton: true,
					showDenyButton: true,
					confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
					denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
					returnInputValueOnDeny: true
					}).then((result) => {
						/* Read more about isConfirmed, isDenied below */
						if (result.isConfirmed) {
							this.updateHumas(result.value,'DISETUJUI')
						}
						else if (result.isDenied) {
							if (result.isConfirmed) {
								this.updateHumas(result.value,'DITOLAK')
							}
						};
					});
			}
		},
		async updateHumas(alasan,status) {
            try{
				this.loadingRequest = true
                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/AupdateHumas',{
                    bulan: this.datex,
					status: status,
					satker: this.humasstatus.dept_id,
					keterangan: alasan
				}, {headers})
                
                if(response.data.success == true){
					this.humasstatus = response.data.rekap
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
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
				this.loadingRequest = false
			}
        },
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.kinerja.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.kinerja = this.kinerja0;
			} else {
				this.kinerja = this.kinerja0.filter((item) => {
					return item.tanggal.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		onFileChange(index, event) {
			const file = event.target.files[0];
			if (file) {
				// Store the file in the corresponding kegiatan object
				const shortenedName = file.name.length > 10 ? file.name.substring(0, 10) + '...' : file.name;
				this.kegiatan[index].filename = shortenedName;
				this.kegiatan[index].file = file;
			}
		},
		async addLaporanHumas(){
			this.loading = true
			try{
				const headers = {
						'Content-Type': 'multipart/form-data',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

					const formData = new FormData();
					const tanggal = this.tanggal;
					let formattedTanggal = null;

					if(this.status === 'Edit'){
						formattedTanggal = this.tanggal
					}else{
						formattedTanggal = tanggal.getFullYear() + '-' + (tanggal.getMonth() + 1).toString().padStart(2, '0') + '-' + tanggal.getDate().toString().padStart(2, '0');
					}

						formData.append('status', this.status);
						formData.append('tanggal', formattedTanggal);
						formData.append('n', this.counter);

						// Append each kegiatan data to FormData
						this.kegiatan.forEach((kegiatan, index) => {
							formData.append(`kegiatan[${index}][judul]`, kegiatan.judul);
							formData.append(`kegiatan[${index}][link]`, kegiatan.link);
							formData.append(`kegiatan[${index}][platform]`, kegiatan.platform);
							formData.append(`kegiatan[${index}][file_path]`, kegiatan.file_path);
							if (kegiatan.file) {
								formData.append(`kegiatan[${index}][file]`, kegiatan.file);
							}
					});

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL + '/addLaporanHumas', formData, { headers });
				
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
						judul: '',
						link: '',
						platform: '',
						file: null,
						file_path: 'NONE',
						filename: 'Upload Foto'
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

<style>
/* Hide the default file input */
input[type="file"] {
    display: none;
}

/* Style the custom file upload label */
.custom-file-upload {
    display: inline-block;
    padding: 8px 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 6px;
    font-size: 16px;
	font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-weight: 600;
    transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
    background-color: #0056b3;
}

.custom-file-upload i {
    margin-right: 5px;
}
</style>