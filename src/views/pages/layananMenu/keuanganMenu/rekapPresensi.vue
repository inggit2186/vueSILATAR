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
										<h4>Rekap Presensi PUSAKA</h4>
											<VueDatePicker v-model="bulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2PUSAKA()" />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Rekap Dokumen PUSAKA</h4>
											<VueDatePicker v-model="bulan" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2PUSAKA()" />
									</div>
								</div>
								<hr/>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
										<div class="group-img d-none d-sm-block" style="float: left;">
											<input v-model="keyword" type="text" class="form-control" placeholder="Search..." @input="filterTable" >
											<i class="feather-search"></i>
										</div>
										<div class="settings-upload-btn d-block d-sm-none">
											<input id="filex" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.pdf" name="image" class="hide-input image-upload" @change="onFile">
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

                                <div v-if="user.hakses.includes('keuangan') || user.hakses.includes('subbagtu')" class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns" :key="column.name" style="max-width: 20px;" @click="sortTable(column.data)">
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
											<tr v-if="presensi.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-for="(item,index) in paginatedItem" v-else :key="item.id">
                                                <td style="font-size: 14px; font-weight: 650;">{{ item.satker }}</td>
                                                <td style="font-size: 14px;"><BButton v-if="item.presensi != 'NONE'" pill size="sm" variant="danger" style="margin-bottom: 5px;" @click.prevent="cetak(item.presensi,item.filepresensi)"><b><i-ic-baseline-print /> Download</b></BButton><span v-else><i>Belum Diupload</i></span></td>
                                                <td style="font-size: 14px;"><BButton v-if="item.uangmakan != 'NONE'" pill size="sm" variant="secondary" style="margin-bottom: 5px;" @click.prevent="cetak(item.uangmakan,item.fileuangmakan)"><b><i-ic-baseline-print /> Download</b></BButton><span v-else><i>Belum Diupload</i></span></td>
                                                <td style="font-size: 14px;"><BButton v-if="item.tukin != 'NONE'" pill size="sm" variant="success" style="margin-bottom: 5px;" @click.prevent="cetak(item.tukin,item.filetukin)"><b><i-ic-baseline-print /> Download</b></BButton><span v-else><i>Belum Diupload</i></span></td>
                                            </tr>
										</tbody>
                                    </table>
                                
                                </div>

                                <div v-else class="table-responsive">
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
											<tr v-if="presensi == null">
                                                <td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
                                            </tr>
											<tr v-else>
                                                <td style="font-size: 14px; font-weight: 600;">Presensi<br/>
                                                    <span style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ presensi.updated }}</i></span>
												</td>
                                                <td style="font-size: 14px; font-weight: 400;">Hari Kerja : <b v-if="rekapum != null">{{  rekapum.harikerja  }}</b><b v-else>XX</b> Hari</td>
                                                <td style="font-size: 14px; font-weight: 400;"> - </td>
                                                <td style="font-size: 14px; font-weight: 400;"> - </td>
                                                <td>
                                                    <BButton v-if="presensi.filep != 'NONE'" pill size="sm" variant="dark" style="margin-bottom: 5px;" @click.prevent="cetak(presensi.filep, presensi.downloadp)"><b><i-ic-baseline-print /> Cetak Rekap Presensi</b></BButton>
													<span v-else><i>Belum Diupload</i></span>
                                                </td>
                                            </tr>
											<tr v-if="rekapum != null">
                                                <td style="font-size: 14px; font-weight: 600;">Uang Makan</td>
                                                <td style="font-size: 14px; font-weight: 400;">Hadir : <b>{{ rekapum.hadir }}</b> Hari</td>
                                                <td style="font-size: 14px; font-weight: 600;"> Rp.{{ rekapum.potongan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},-<br/>
													<span style="font-size: smaller;"><i><i-tabler-receipt-tax /> Pajak {{ rekapum.pajak_um }}% </i></span>
												</td>
                                                <td style="font-size: 14px; font-weight: 600;">
													<span style="font-size: smaller;"><i><i-mdi-money /> (Rp.{{ rekapum.uangmakan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }} - Rp.{{ rekapum.potongan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }}) </i></span><br/>
													Rp.{{ rekapum.nett_um.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},-</td>
                                                <td>
                                                    <BButton v-if="presensi.fileum != 'NONE'" pill size="sm" variant="dark" style="margin-bottom: 5px;" @click.prevent="cetak(presensi.fileum, presensi.downloadum)"><b><i-ic-baseline-print /> Cetak Rekap UM</b></BButton>
													<span v-else><i>Belum Diupload</i></span>
												</td>
                                            </tr>
                                            <tr v-if="rekaptukin.length == 0">
                                                <td style="font-size: 14px; font-weight: 600;">Tunjangan Kinerja</td>
                                                <td style="font-size: 14px; font-weight: 600;">Rp.{{ tukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},-<br/>
                                                    <span style="font-size: smaller;"><i><i-material-symbols-grade />Grade {{ user.grade }}</i></span>
                                                </td>
                                                <td style="font-size: 14px; font-weight: 600;">-</td>
                                                <td style="font-size: 14px; font-weight: 600;">Rp.{{ tukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},-</td>
												<td>
                                                    <BButton v-if="presensi.filetukin != 'NONE'" pill size="sm" variant="dark" style="margin-bottom: 5px;" @click.prevent="cetak(presensi.filetukin, presensi.downloadtukin)"><b><i-ic-baseline-print /> Cetak Rekap Tukin</b></BButton>
													<span v-else><i>Belum Diupload</i></span>
												</td>
												
                                            </tr>
											<tr v-for="(rekaptukin,index) in rekaptukin" v-else :key="rekaptukin.id">
                                                <td v-if="index == 0" :rowspan=count style="font-size: 14px; font-weight: 600;">Tunjangan Kinerja</td>
                                                <td style="font-size: 14px; font-weight: 400;">{{ rekaptukin.ketidakhadiran }} <b>({{ rekaptukin.jml_absen }} Hari)</b></td>
                                                <td style="font-size: 14px; font-weight: 600;"> Rp.{{ rekaptukin.potongan.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},-</td>
                                                <td v-if="index == 0" :rowspan=count style="font-size: 14px; font-weight: 600;">
													<span style="font-size: smaller;"><i><i-mdi-money /> (Rp.{{ tukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }} - Rp.{{ sumtukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }}) </i></span><br/>
													Rp.{{ netttukin.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") ?? '-' }},-</td>
                                                <td v-if="index == 0" :rowspan=count>
                                                    <BButton v-if="presensi.filetukin != 'NONE'" pill size="sm" variant="dark" style="margin-bottom: 5px;" @click.prevent="cetak(presensi.filetukin, presensi.downloadtukin)"><b><i-ic-baseline-print /> Cetak Rekap Tukin</b></BButton>
													<span v-else><i>Belum Diupload</i></span>
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
            xid: this.$route.params.xid,
            navid: this.$route.params.id,
            user: JSON.parse(localStorage.getItem("user")),
            title: "Rekap PUSAKA",
            titleamprah: null,
            text: "Setjen",
            text1: "PUSAKA",
            name: "/",
			bulan: {month: today.getMonth()-1, year:today.getFullYear()},
            waktu: 'old',
            columns: [
				{ name: 'Unit Kerja', data: 'satker' },   
				{ name: 'Presensi', data: 'presensi' },   
				{ name: 'Uang Makan', data: 'uangmakan' },
				{ name: 'Tunjangan Kinerja', data: 'tukin' },
			],
			columns2: [
				{ name: 'Jenis', data: 'jenis' },   
				{ name: 'Kategori', data: 'Kategori' },   
				{ name: 'Potongan', data: 'potongan' },
				{ name: 'Jumlah', data: 'jumlah' },
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
			presensi: [],
			presensi0: [],
			rekapum: [],
			rekaptukin: [],
			tukin: null,
			sumtukin: null,
			netttukin: null,
			count: null,
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
			return this.presensi.sort((a, b) => {
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
			return this.presensi.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.presensi.length / this.itemsPerPage);
        },
	},
  created() {
		this.getPUSAKA(),
		window.scrollTo(0,0)
	},
  methods: {

		async getPUSAKA() {
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.loading = true;
			try{
                
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getPUSAKA',{
					bulan : date,
				},{headers})
				
				if(response.data.success == true){
                    this.presensi0 = response.data.data
                    this.presensi = response.data.data
                    this.rekapum = response.data.rekapum
                    this.rekaptukin = response.data.rekaptukin
					this.tukin = response.data.tukin
					this.sumtukin = response.data.sumtukin
					this.netttukin = response.data.tukin - response.data.sumtukin
					this.count = response.data.count
                    this.titleamprah = response.data.title
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
        async get2PUSAKA() {
			this.waktu = 'new';
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.loading = true;
            
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/getPUSAKA',{
					bulan : date,
				},{headers})
				
				if(response.data.success == true){

					this.presensi0 = response.data.data
					this.presensi = response.data.data
                    this.rekapum = response.data.rekapum
                    this.rekaptukin = response.data.rekaptukin
					this.tukin = response.data.tukin
					this.sumtukin = response.data.sumtukin
					this.netttukin = response.data.tukin - response.data.sumtukin
					this.count = response.data.count
                    this.titleamprah = response.data.title

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

        cetak(item,file){
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
                        window.open(file,'_blank');
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

			this.presensi.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.presensi = this.presensi0;
			} else {
				this.presensi = this.presensi0.filter((item) => {
					return item.satker.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
  }
}
</script>