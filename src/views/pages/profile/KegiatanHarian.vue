<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper kinerja-page">
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
                                            <input v-model="keyword" type="text"  class="form-control" placeholder="Cari data..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
										<div class="group-img d-block d-sm-none">
                                            <input v-model="keyword" type="text"  class="form-control" style="float:left; max-width: 50%;margin-right: 5px;" placeholder="Cari data..." @input="filterTable">
                                            <a v-if="ckh != null && ckh.status != 'DISETUJUI'" class="btn btn-danger" href="#" style="margin-left:5px;float:right;" @click="changedetail(2,'Tambah',0)"><i-subway-add/> <b>TAMBAH</b></a>
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" @click="sortTable(column.data)">
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
											<tr v-if="kinerja.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
											</tr>
											<tr v-for="(item,index) in paginatedItem" v-else :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a></td>
                                                <td style="font-size: small;">
                                                   <div v-for="kerja in item.kegiatan" :key="kerja.id" style="word-wrap: break-word;">
													{{ kerja.kegiatan }}  <b>({{ kerja.volume }} {{ kerja.satuan }})</b><br/>
												   </div>
                                                </td>
                                                <td>
													<BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="warning" @click.prevent="changedetail(2,'Edit',((currentPage*12)-12 + index))"><b><i-fa-edit /> EDIT</b></BButton>&nbsp;
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="danger" @click.prevent="delAksi(item.tgl)"><b><i-ph-trash-fill /> DELETE</b></BButton>
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

        <!-- Input Data Atasan Modal -->
        <div v-if="showAtasanModal" class="atasan-modal" @click.stop>
          <div class="modal-content">
            <h3>Input Data Atasan</h3>
            <p>Masukkan Data Atasan Anda untuk Laporan Kinerja.</p>
            <div style="text-align: left; margin-bottom: 20px;">
              <label for="atasanName" style="display: block; margin-bottom: 5px; font-weight: bold; color: #fff2d1;">Nama Atasan</label>
              <input id="atasanName" v-model="atasanName" class="modal-input" placeholder="Masukkan Nama Atasan" required />
            </div>
            <div style="text-align: left;">
              <label for="atasanNip" style="display: block; margin-bottom: 5px; font-weight: bold; color: #fff2d1;">NIP Atasan</label>
              <input id="atasanNip" v-model="atasanNip" class="modal-input" placeholder="Masukkan NIP Atasan" required />
            </div>
            <div class="modal-buttons">
              <button class="modal-save-btn" @click="saveAtasanData">Rekap CKH</button>
              <button class="modal-cancel-btn" @click="cancelAtasanModal">Batal</button>
            </div>
          </div>
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
			atasanName: '',
			atasanNip: '',
			showAtasanModal: false,
			rekapDate: null,
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
                this.atasanName = '';
                this.atasanNip = '';
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
            if(this.bulan.year > today.getFullYear()){
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
            const user = JSON.parse(localStorage.getItem('user'))
            if(user.dept_id == 998 || user.dept_id == 999){
                this.rekapDate = date
                this.showAtasanModal = true
                return
            }
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
                    n: this.counter,
                    atasanName: this.atasanName,
                    atasanNip: this.atasanNip
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
        saveAtasanData() {
            if (!this.atasanName || !this.atasanNip) {
                this.$toast.fire({
                    title: 'Nama Atasan dan NIP Atasan harus diisi',
                    icon: 'error'
                });
                return;
            }
            this.showAtasanModal = false;
            this.proceedRekap();
        },
        cancelAtasanModal() {
            this.showAtasanModal = false;
            this.loadingrekap = false;
        },
        async proceedRekap() {
            try {
                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                };
                const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL + '/rekapBulanan', {
                    bulan: this.rekapDate,
                    atasanName: this.atasanName,
                    atasanNip: this.atasanNip
                }, { headers });

                if (response.data.success == true) {
                    this.ckh = this.ckh0
                    if (response.data.status != null) {
                        this.ckh = response.data.status
                    }
                    this.kinerja0 = response.data.data
                    this.kinerja = response.data.data
                    let item = response.data.file

                    let frame = '<iframe src="' + item + '" width="100%" height="500"></iframe>'

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
                                window.open(item, '_blank');
                            }
                        });
                    } else {
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
                                window.open(item, '_blank');
                            }
                        });
                    }
                } else {
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
  }
}
</script>

<style scoped>
.table th:nth-child(1), .table td:nth-child(1) { width: auto; }
.table th:nth-child(2), .table td:nth-child(2) { width: auto; }
.table th:nth-child(3), .table td:nth-child(3) { width: auto; }

.kinerja-page {
  color: #f8ecd1;
}

.kinerja-page .dashboard-content {
  background:
    radial-gradient(circle at top left, rgba(246, 215, 138, 0.08), transparent 28%),
    radial-gradient(circle at bottom right, rgba(106, 31, 43, 0.2), transparent 26%),
    linear-gradient(180deg, #1a0e10 0%, #261416 100%);
  padding-bottom: 42px;
}

.kinerja-page .dash-cards.card,
.kinerja-page .messages-form .card,
.kinerja-page .card {
  background: linear-gradient(180deg, rgba(34, 17, 19, 0.98) 0%, rgba(23, 12, 13, 0.98) 100%);
  border: 1px solid rgba(246, 215, 138, 0.16);
  color: #f8ecd1;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
}

.kinerja-page .card-header {
  background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%);
  color: #fff4dc;
  border-bottom: 1px solid rgba(246, 215, 138, 0.12);
}

.kinerja-page .card-body,
.kinerja-page .messages-form,
.kinerja-page .profile-content {
  color: #f8ecd1;
}

.kinerja-page .alert-info {
  background: linear-gradient(180deg, rgba(246, 215, 138, 0.16) 0%, rgba(106, 31, 43, 0.18) 100%) !important;
  color: #fff4dc !important;
  border: 1px solid rgba(246, 215, 138, 0.18) !important;
}

.kinerja-page .alert-info hr {
  border-color: rgba(246, 215, 138, 0.14);
}

.kinerja-page .alert-info ul,
.kinerja-page .alert-info li,
.kinerja-page .alert-info span {
  color: #fff4dc;
}

.kinerja-page .listing-search .form-control,
.kinerja-page .messages-form .form-control,
.kinerja-page .messages-form .form-select,
.kinerja-page .messages-form textarea,
.kinerja-page .modal-input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(246, 215, 138, 0.2);
  color: #fff4dc;
}

.kinerja-page .listing-search .form-control::placeholder,
.kinerja-page .messages-form .form-control::placeholder,
.kinerja-page .messages-form textarea::placeholder,
.kinerja-page .modal-input::placeholder {
  color: rgba(248, 236, 209, 0.58);
}

.kinerja-page .table {
  background: transparent;
  color: #fff4dc;
}

.kinerja-page .table thead th {
  background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%);
  color: #fff4dc;
  border-color: rgba(246, 215, 138, 0.14);
}

.kinerja-page .table tbody td {
  color: #fff4dc;
  background: rgba(255, 244, 216, 0.03);
  border-color: rgba(201, 157, 79, 0.12);
}

.kinerja-page .table tbody tr:hover td {
  background: rgba(255, 244, 216, 0.08);
}

.kinerja-page .table tbody td a {
  color: #f6d78a;
}

.kinerja-page .pagination .page-link {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(246, 215, 138, 0.18);
  color: #fff4dc;
}

.kinerja-page .pagination .page-item.active .page-link {
  background: #f6d78a;
  color: #241213;
  border-color: #f6d78a;
}

.kinerja-page .btn-primary {
  background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%);
  border: 0;
  color: #fff4dc;
}

.kinerja-page .btn-warning {
  background: #f6d78a;
  border: 0;
  color: #241213;
}

.kinerja-page .btn-danger {
  background: #b03b4a;
  border: 0;
  color: #fff4dc;
}

.kinerja-page .atasan-modal .modal-content {
  background: linear-gradient(180deg, #241213 0%, #160b0c 100%);
  border: 1px solid rgba(246, 215, 138, 0.18);
}

.kinerja-page .atasan-modal .modal-content h3,
.kinerja-page .atasan-modal .modal-content p,
.kinerja-page .atasan-modal .modal-content label {
  color: #fff4dc !important;
}

.kinerja-page .modal-save-btn {
  background: #f6d78a;
  color: #241213;
}

.kinerja-page .modal-cancel-btn {
  background: #6a1f2b;
  color: #fff4dc;
}

.atasan-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.98) 0%, rgba(35, 21, 22, 0.98) 100%);
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 18px 40px rgba(22, 12, 13, 0.22);
  text-align: center;
  color: #fff4dc;
}

.modal-content h3 {
  margin-bottom: 10px;
  color: #fff4dc;
}

.modal-content p {
  margin-bottom: 20px;
  color: rgba(255, 244, 220, 0.72);
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(201, 157, 79, 0.18);
  border-radius: 4px;
  background-color: rgba(255, 244, 220, 0.04);
  color: #fff4dc;
}

.modal-input:focus {
  outline: none;
  border-color: #c58a2a;
}

.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal-save-btn {
  background: linear-gradient(135deg, #2f5f48 0%, #6a1f2b 100%);
  color: #fff4dc;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-save-btn:hover {
  filter: brightness(1.05);
}

.modal-cancel-btn {
  background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%);
  color: #fff4dc;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-cancel-btn:hover {
  filter: brightness(1.05);
}

.kinerja-page .card,
.kinerja-page .card-header,
.kinerja-page .card-body,
.kinerja-page .dash-cards {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.98) 0%, rgba(35, 21, 22, 0.98) 100%) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
  color: #fff4dc !important;
}

.kinerja-page .card-header h4,
.kinerja-page .card-body,
.kinerja-page .card-body label,
.kinerja-page .card-body span,
.kinerja-page .card-body p,
.kinerja-page .card-body small,
.kinerja-page .card-body h5,
.kinerja-page .card-body h6,
.kinerja-page .table,
.kinerja-page .table td,
.kinerja-page .table th {
  color: #fff4dc !important;
}

.kinerja-page .table thead th {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%) !important;
  color: #fff !important;
}

.kinerja-page .table tbody td {
  background: rgba(255, 244, 220, 0.04) !important;
  color: #fff4dc !important;
}
</style>
