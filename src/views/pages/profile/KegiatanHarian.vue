<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <kinerjaMenu />
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Laporan Kinerja Harian</h4>
											<VueDatePicker v-model="bulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2Kegiatan()" />
											<a v-if="!loadingrekap && ckh.status != 'DISETUJUI'" class="btn btn-warning" href="#" style="float: right;" @click="rekapKinerja()"><i-ri-file-ppt-2-fill /> <b>REKAP</b></a>
											<a v-else-if="loadingrekap && ckh.status != 'DISETUJUI'" class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>REKAP</b></a>
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Laporan Kinerja Harian</h4>
											<VueDatePicker v-model="bulan" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply @update:model-value="get2Kegiatan()" />
											<a v-if="!loadingrekap && ckh.status != 'DISETUJUI'" class="btn btn-warning" href="#" style="float:right;margin-right: 10px;" @click="rekapKinerja()"><i-ri-file-ppt-2-fill /> <b>REKAP</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>REKAP</b></a>
									</div>
								</div>
								<hr/>
                            <div class="card-body">
								<div class="alert alert-info" role="alert">
									<div v-if="loading">
										<i-svg-spinners-bars-scale-fade />
									</div>
									<div v-else>
										<span style="font-size: 40px;">
											<i-noto-v1-notebook />
										</span>
										<br/>
											<BBadge v-if="ckh != null && ckh.status == 'DIKIRIM'" pill variant="warning" style="font-size: medium;"><i-grommet-icons-in-progress /> Dalam Pengajuan</BBadge>
											<BBadge v-else-if="ckh != null && ckh.status == 'DISETUJUI'" pill variant="success" style="font-size: medium;"><i-codicon-thumbsup-filled /> DISETUJUI</BBadge>
											<BBadge v-else-if="ckh != null && ckh.status == 'DITOLAK'" pill variant="dark" style="font-size: medium;"><i-codicon-thumbsdown-filled /> DITOLAK</BBadge>
											<BBadge v-else pill variant="danger" style="font-size: medium;"><i-carbon-license-draft /> Belum Dikirim</BBadge>
											<br/>
											<div v-if="ckh.petugas != 777" style="padding-top: 5px;"><i-twemoji-man-police-officer style="font-size: large;"/><span style="font-size: small;font-weight: 700; font-style: italic; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"> {{ ckh.verif }}</span></div>
										<hr/>
										<ul v-if="ckh.petugas != 777">
											<li><i-ri-kakao-talk-fill /> <b>Feedback/Komentar Verifikator</b></li>
											<li v-if="ckh != null && ckh.alasan != '<NoKomen>' || ckh.alasan != ''"><i>"{{ ckh.alasan }}"</i></li>
										</ul>
									</div>
								</div>
                                <div class="listing-search">
                                    <div class="filter-content form-group">
										<div class="group-img d-none d-sm-block">
                                            <a v-if="ckh != null && ckh.status != 'DISETUJUI'" class="btn btn-danger" href="#" style="float: right;margin-left:20px;" @click="changedetail(2,'Tambah',0)"><i-subway-add/> <b>TAMBAH</b></a>
                                            <input v-model="keyword" type="text"  class="form-control" placeholder="Search..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
										<div class="group-img d-block d-sm-none">
                                            <input v-model="keyword" type="text"  class="form-control" style="float:left; max-width: 50%;margin-right: 5px;" placeholder="Search..." @input="filterTable">
                                            <a v-if="ckh != null && ckh.status != 'DISETUJUI'" class="btn btn-danger" href="#" style="margin-left:5px;float:right;" @click="changedetail(2,'Tambah',0)"><i-subway-add/> <b>TAMBAH</b></a>
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
											<tr v-if="kinerja.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-for="(item,index) in paginatedItem" v-else :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a></td>
                                                <td style="font-size: small;">
                                                   <div v-for="kerja in item.kegiatan" :key="kerja.id">
													{{ kerja.kegiatan }}  <b>({{ kerja.volume }} {{ kerja.satuan }})</b><br/>
												   </div>
                                                </td>
                                                <td>
													<BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="warning" @click.prevent="changedetail(2,'Edit',((currentPage*12)-12 + index))"><b><i-fa-edit /> EDIT</b></BButton>&nbsp;
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

                    <div v-else-if="detail == 2" ref="scroll1st" class="card-body">
                        <div class="container">
                            <div  class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div>
                            <hr/>
                            <b-form ref="kinerja" @submit.prevent="addKinerja">
                            <div class="profile-content">
                                <div class="messages-form">
                                    <div class="card">
                                        <div class="card-header text-center">
                                            <h2>::: Laporan Kegiatan :::</h2>							
                                        </div>
                                        <div class="card-header">
                                            <h4>{{ status }} Detail Kegiatan Harian</h4>							
                                        </div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="col-form-label">Tanggal <span>*</span></label>								    
                                                <VueDatePicker v-if="status == 'Edit'" v-model="tanggal" format="dd MMMM yyyy" placeholder="Tanggal Kegiatan" auto-apply :enable-time-picker="false" readonly/>								   
                                                <VueDatePicker v-else v-model="tanggal" format="dd MMMM yyyy" placeholder="Tanggal Kegiatan" auto-apply :enable-time-picker="false" required/>								   
                                            </div>
											<div class="form-group d-none d-sm-block">
                                                <label class="col-form-label">Kegiatan <span>*</span></label>&nbsp;&nbsp;<b-button variant="danger" size="sm" @click="clone()"><i-mingcute-plus-fill />Tambah</b-button>
												<div v-for="kegiatan in kegiatan" id="inputArea" :key="kegiatan.id" style="padding-bottom: 12px;">
													<b-form-input id="kegiatan" v-model="kegiatan.kegiatan" type="text" class="form-control pass-input" placeholder="Kegiatan Anda" style="max-width: 50%;float:left;margin-right: 0.5%;"/>
													<b-form-input id="volume" v-model="kegiatan.volume" type="number" class="form-control pass-input" placeholder="Volume" style="max-width: 10%;float:left;margin-right: 0.5%;" />
													<b-form-select id="satuan" v-model="kegiatan.satuan" class="form-control pass-input" placeholder="Satuan" style="max-width: 25%;float:left;margin-right: 0.5%;">
														<b-form-select-option value="" disabled selected>--Pilih Salah Satu--</b-form-select-option>
														<b-form-select-option value="Dokumen">Dokumen</b-form-select-option>
														<b-form-select-option value="Kegiatan">Kegiatan</b-form-select-option>
														<b-form-select-option value="Kali">Kali</b-form-select-option>
														<b-form-select-option value="Laporan">Laporan</b-form-select-option>
														<b-form-select-option value="Modul">Modul</b-form-select-option>
														<b-form-select-option value="Orang">Orang</b-form-select-option>
														<b-form-select-option value="Data">Data</b-form-select-option>
													</b-form-select>
													<b-button :variant="isListening[kegiatan.id] ? 'danger' : 'success'" style="float:left;margin-right: 0.5%;height: 38px;width: 38px;padding: 0;border-radius: 50%;" @click="startSpeechRecognition(kegiatan.id)"><i-fa-microphone v-if="!isListening[kegiatan.id]" /><i-fa-microphone-slash v-else /></b-button>
													<span v-if="isListening[kegiatan.id]" style="font-size: small; color: red; margin-left: 5px;">Recording...</span>
													<br/>
													<br/>
												</div>
											</div>
											<div class="form-group d-block d-sm-none">
                                                <label class="col-form-label">Kegiatan <span>*</span></label>&nbsp;&nbsp;<b-button variant="danger" size="sm" @click="clone()"><i-mingcute-plus-fill />Tambah</b-button>
												<div v-for="kegiatan in kegiatan" id="inputArea" :key="kegiatan.id" style="padding-bottom: 12px;">
                                                	<b-form-input id="kegiatan" v-model="kegiatan.kegiatan" type="text" class="form-control pass-input" placeholder="Kegiatan Anda" style="margin-bottom: 5px;"/>
													<b-form-input id="volume" v-model="kegiatan.volume" type="number" class="form-control pass-input" placeholder="Volume" style="margin-bottom: 5px;" />
													<b-form-select id="satuan" v-model="kegiatan.satuan" class="form-control pass-input" placeholder="Satuan" style="margin-bottom: 5px;">
														<b-form-select-option value="" disabled selected>--Pilih Salah Satu--</b-form-select-option>
														<b-form-select-option value="Dokumen">Dokumen</b-form-select-option>
														<b-form-select-option value="Kegiatan">Kegiatan</b-form-select-option>
														<b-form-select-option value="Kali">Kali</b-form-select-option>
														<b-form-select-option value="Laporan">Laporan</b-form-select-option>
														<b-form-select-option value="Modul">Modul</b-form-select-option>
														<b-form-select-option value="Orang">Orang</b-form-select-option>
														<b-form-select-option value="Data">Data</b-form-select-option>
													</b-form-select>
													<b-button :variant="isListening[kegiatan.id] ? 'danger' : 'success'" style="margin-bottom: 5px;height: 38px;width: 38px;padding: 0;border-radius: 50%;" @click="startSpeechRecognition(kegiatan.id)"><i-fa-microphone v-if="!isListening[kegiatan.id]" /><i-fa-microphone-slash v-else /></b-button>
													<span v-if="isListening[kegiatan.id]" style="font-size: small; color: red; margin-left: 5px;">Recording...</span>
													<br/>
													<br/>
												</div>
											</div>
                                        </div>
                                    </div>
                                    <div class="centered">
                                        <b-button variant="primary" type="submit" :disabled="loading"> 
                                            <span v-if="!loading"> Simpan</span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />  Mengirim Laporan....</span>
                                        </b-button>						
                                    </div>
                                </div>			
                            </div>
                            </b-form>
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
            title: "Laporan Kinerja Harian",
            text: "User",
            text1: "Laporan Kinerja Harian",
            name: "/",
			bulan: null,
			columns2: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Kegiatan', data: 'kegiatan' },
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
			loadingrekap: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			kinerja: [],
			kinerja0: [],
			ckh0:{
				status: 'NONE',
				petugas: 777,
			},
			ckh:{
				status: 'NONE',
				petugas: 777,
			},
			tanggal: [],
            detail: 1,
            status: null,
			rekapstatus: 0,
			isListening: {},
			recognition: null,
			currentIndex: null,
			recordingCount: {},
        }
    },
    computed: {
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
		window.scrollTo(0,0),
		this.initSpeechRecognition()
	},
  methods: {
        changedetail(id,st,xid){
            if(st === 'Edit'){
                this.status = st,
                this.detail = id;
                this.tanggal = this.kinerja[xid].tgl;
                this.kegiatan = this.kinerja[xid].kegiatan;
                this.isListening = {};
                this.recordingCount = {};
            }else{
                this.status = st,
                this.detail = id;
                this.kegiatan = [{
                        id: 'kinerja0',
                        kegiatan: '',
                    }],
                this.tanggal = null,
                this.isListening = {};
                this.recordingCount = {};
            }
            window.scrollTo(0,0)
        },
        clone(){
            this.kegiatan.push({
                id: `kinerja${++this.counter}`,
                kegiatan: '',
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

                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteKinerjaHarian',{
                        tgl: tgl,
                    },{headers})

                if(response.data.success == true){
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
            this.rekapstatus = 0;
            try{
                const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    };
                const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myKinerja',{
                    bulan : this.bulan
                },{headers})
                
                if(response.data.success == true){
                    this.ckh = this.ckh0
                    if(response.data.status != null){
                        this.ckh = response.data.status
                    }
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
        async get2Kegiatan() {
            const today = new Date();
            if(this.bulan.year < today.getFullYear()){
                this.$swal.fire({
                    title: 'Mohon Maaf!',
                    html: '<p style="font-size: 16px">Dikarenakan Untuk Mengurangi Beban Server, Data Kinerja Harian Anda pada Tahun Sebelumnya <b>telah di Backup dan diArsipkan</b><br/><br/> Untuk Melihat Data Kinerja Harian(CKH) Bpk/Ibu Silahkan Lihat dan Download Rekap Kegiatan Bpk/Ibu di Bagian <b>Laporan Kinerja Bulanan</b><br/><br/><b>Terima Kasih</b></p> <hr/><p style="font-size: 13px;font-style: italic;">Untuk Permintaan dan Informasi Lebih Lanjut Silahkan Hubungi Admin SILATAR di Subbagian Tata Usaha Kantor Kementerian Agama Kabupaten Tanah Datar</p>',
                    icon: 'info',
                })
                this.getKegiatan()
            }else{
                this.rekapstatus = 1;
                const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
                this.loading = true;
                try{
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myKinerja',{
                        bulan : date
                    },{headers})
                    
                    if(response.data.success == true){
                        this.ckh = this.ckh0
                        if(response.data.status != null){
                            this.ckh = response.data.status
                        }
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
            }
        },
        async rekapKinerja() {
            let date;
            if(this.rekapstatus == 0){
                date = this.bulan
            }else{
                date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
            }
            this.loadingrekap = true;

            try{
                const headers = {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    };
                const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapBulanan',{
                    bulan : date
                },{headers})
                
                if(response.data.success == true){
                    this.ckh = this.ckh0
                        if(response.data.status != null){
                            this.ckh = response.data.status
                        }
                    this.kinerja0 = response.data.data
                    this.kinerja = response.data.data
                    let item = response.data.file

                    let frame = '<iframe src="'+ item +'" width="100%" height="500"></iframe>'

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
                this.loadingrekap = false
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
        async addKinerja(){
            this.loading = true
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
                    this.ckh = this.ckh0
                        if(response.data.status != null){
                            this.ckh = response.data.status
                        }
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
        initSpeechRecognition() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
                this.recognition.continuous = false;
                this.recognition.interimResults = false;
                this.recognition.lang = 'id-ID';
                this.recognition.onresult = (event) => {
                    const transcript = event.results[0][0].transcript;
                    if (this.currentIndex !== null) {
                        const id = this.kegiatan[this.currentIndex].id;
                        if (this.recordingCount[id] >= 2) {
                            this.kegiatan[this.currentIndex].kegiatan = transcript;
                        } else {
                            this.kegiatan[this.currentIndex].kegiatan += transcript;
                        }
                    }
                };
                this.recognition.onend = () => {
                    if (this.currentIndex !== null) {
                        this.isListening[this.kegiatan[this.currentIndex].id] = false;
                    }
                };
                this.recognition.onerror = (event) => {
                    if (this.currentIndex !== null) {
                        this.isListening[this.kegiatan[this.currentIndex].id] = false;
                    }
                };
            }
        },
        startSpeechRecognition(id) {
            if (!this.recognition) {
                this.$toast.fire({
                    title: 'Speech recognition not supported in this browser',
                    icon: 'error',
                });
                return;
            }
            const kegIndex = this.kegiatan.findIndex(k => k.id === id);
            if (kegIndex === -1) return;
            if (this.isListening[id]) {
                this.recognition.stop();
                this.isListening[id] = false;
            } else {
                this.recordingCount[id] = (this.recordingCount[id] || 0) + 1;
                this.currentIndex = kegIndex;
                this.recognition.start();
                this.isListening[id] = true;
            }
        },
  }
}
</script>