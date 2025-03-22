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
										<h4>Dokumen Audit Tahun {{ titleamprah }}</h4>
											<VueDatePicker v-model="tahun" @update:model-value="get2DocKeu()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" year-picker auto-apply />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Dokumen Audit Tahun {{ titleamprah }}</h4>
											<VueDatePicker v-model="tahun" @update:model-value="get2DocKeu()" style="float:left; max-width: 60%;margin-right: 10px;" year-picker auto-apply />
									</div>
								</div>
								<hr/>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
										<div class="settings-upload-btn d-none d-sm-block" style="float: right;margin-left:20px;">
											<input id="filex" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .pdf" name="image" class="hide-input image-upload" @change="onFile">
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
											<input id="filex" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.pdf" name="image" class="hide-input image-upload" @change="onFile">
											<label for="filex" class="file-upload" :disable="loadingfile">
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
											<tr v-if="this.dockeu.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="(item,index) in paginatedItem" :key="item.id">
                                                <td style="font-size: 14px; font-weight: 650;">{{ item.kategori }}</td>
                                                <td style="font-size: 14px;">{{ item.keterangan }}</td>
                                                <td style="font-size: 14px;"><span style="font-weight: 650;">{{ item.uploader }}</span><br/>
                                                    <span style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span>
                                                </td>
                                                <td>
                                                    <BButton pill size="sm" variant="dark" @click.prevent="cetak(item.filename)" style="margin-bottom: 5px;"><b><i-ic-baseline-print /> PRINT</b></BButton>
                                                    <br/><br/><BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="danger" @click.prevent="delAksi(item.id)"><b><i-ph-trash-fill /> DELETE</b></BButton>
                                                    <BButton v-else pill size="sm" variant="danger"><b><i-svg-spinners-bars-scale-middle />&nbsp;Loading......</b></BButton>
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
            navid: this.$route.params.id,
            title: "Dokumen Audit",
            titleamprah: null,
            text: "Setjen",
            text1: "Dokumen Audit",
            name: "/",
			tahun: null,
            waktu: 'old',
			columns2: [
				{ name: 'Kategori', data: 'kategori' },
				{ name: 'Keterangan', data: 'keterangan' },   
				{ name: 'Uploader', data: 'uploader' },   
				{ name: 'Action', data: 'action' },
			],
			counter:0,
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingfile: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			dok: null,
			dockeu: [],
			dockeu0: [],
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
			return this.dockeu.sort((a, b) => {
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
			return this.dockeu.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.dockeu.length / this.itemsPerPage);
        },
	},
  created() {
		this.getDocKeu(),
		window.scrollTo(0,0)
	},
  methods: {
		delAksi(id){
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
			this.loadingaksi[id] = true;
			let tanggalx
            
                tanggalx = this.tahun

			try{
                
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteDocAudit',{
                    dipa: this.navid,
					tipe:'audit',
					tahun: tanggalx,
					id : id,
				},{headers})
				
				if(response.data.success == true){
                    this.dockeu0 = response.data.data
          			this.dockeu = response.data.data
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

		async getDocKeu() {
			const today = new Date();
			const date = today.getFullYear()-1;
            
			this.tahun = date;
			this.loading = true;
			try{
                
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getDocAudit',{
                    dipa: this.navid,
					tipe:'audit',
					tahun : this.tahun,
				},{headers})
				
				if(response.data.success == true){
                    this.dockeu0 = response.data.data
          			this.dockeu = response.data.data
                    this.titleamprah = response.data.title
					this.dok = response.data.dok
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
        async get2DocKeu() {
			this.waktu = 'new';
			this.loading = true;
            
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getDocAudit',{
					dipa: this.navid,
					tipe:'audit',
					tahun : this.tahun,
				},{headers})
				
				if(response.data.success == true){
                    this.dockeu0 = response.data.data
          			this.dockeu = response.data.data
                      this.titleamprah = response.data.title
					  this.dok = response.data.dok
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

		onFile(event) {
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
   						file.type != 'text/csv' &&
						file.type != 'application/pdf'){
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

            let htmlx = null;
                htmlx = `<span style='font-size: 15px'>Kategori</span><br/>
                            <select style='font-size: 15px' id="kategori" class="swal2-input">
                                <option  value="" disabled selected>--Pilih Kategori--</option>`;
						this.dok.forEach(value =>{
							htmlx += `<option value=${value.id}>${value.dokumen}</option>`
						})
				htmlx += `</select><hr/>
                    <table><tr><td style="vertical-align: middle;"><span style='font-size: 15px;'>Keterangan</span></td><td style="vertical-align: middle;"> : </td><td style="vertical-align: middle;"><textarea id="keterangan" class="swal2-textarea" rows=3></textarea></td></tr></table>`
            

            this.$swal.fire({
                title: `Upload "${this.fileName}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                showLoaderOnConfirm: true,
                html: htmlx,
                confirmButtonText: 'Upload File!'
            }).then((result) => {
            if (result.isConfirmed) {
                this.uploadDocKeu('DocAudit',document.getElementById("kategori").value,document.getElementById("keterangan").value)      
            }
            })
		},

        async uploadDocKeu(status,kategori,keterangan){
            try{
                this.loadingfile = true
                let tanggalx = null

                tanggalx = this.tahun
                
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadDocAudit',{
                    dipa: this.navid,
					tipe:'audit',
					status: status,
                    kategori: kategori,
                    keterangan: keterangan,
                    tahun: tanggalx,
                    filex: this.fileUrl
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					this.dockeu0 = response.data.data
          			this.dockeu = response.data.data	
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
				this.loadingfile = false
			}
        },

        cetak(item){
            let frame = null;
            let isPDF = item.toLowerCase().endsWith('.pdf');
            let isWord = item.toLowerCase().endsWith('.doc') || item.toLowerCase().endsWith('.docx');
            let isExcel = item.toLowerCase().endsWith('.xlsx');
            
            if(isWord){
                frame = '<iframe src="https://docs.google.com/gview?url='+ item +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
            }else if(isExcel){
                frame = '<iframe src="https://docs.google.com/gview?url='+ item +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
            }else{
                frame = '<iframe src="'+ item +'" width="100%" height="550"></iframe>'
            }

            if (window.innerWidth < 768) {
                this.$swal.fire({
                    width: "100%",
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
        },

		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.dockeu.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.dockeu = this.dockeu0;
			} else {
				this.dockeu = this.dockeu0.filter((item) => {
					return item.kategori.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.uploader.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.keterangan.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
  }
}
</script>