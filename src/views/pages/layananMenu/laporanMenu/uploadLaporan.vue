<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div v-if="loading" class="text-center">
								<hr>
								<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
								<br>
								<i-svg-spinners-bars-scale style="font-size: 2em;"/>
								<h3>::: Nyangkul Data dulu :::</h3>
								<hr>
							</div>
							<div v-else ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4 v-if="$route.params.xid == 'bimas'">Dokumen {{ $route.params.zid }} {{ $route.params.id }} Tahun {{ tahun }}</h4>
										<h4 v-else-if="$route.params.xid == 'pais'">Dokumen Pemberkasan {{ $route.params.zid }} {{ $route.params.id }} Tahun {{ tahun }}</h4>
											<VueDatePicker v-model="tahun" @update:model-value="get2Lap()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" year-picker auto-apply />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4 v-if="$route.params.xid == 'bimas'">Dokumen {{ $route.params.zid }} {{ $route.params.id }} Tahun {{ tahun }}</h4>
										<h4 v-else-if="$route.params.xid == 'pais'">Dokumen Pemberkasan {{ $route.params.zid }} {{ $route.params.id }} Tahun {{ tahun }}</h4>
											<VueDatePicker v-model="tahun" @update:model-value="get2Lap()" style="float:left; max-width: 60%;margin-right: 10px;" year-picker auto-apply />
									</div>
								</div>
                                <h4 v-if="kategori == 'KUA'" style="font-size: small;align-self: center;">
									<br/>
									 {{ profil.satker }}
								</h4>
                                <h4 v-else style="font-size: small;align-self: center;">
									<br/>
									{{ profil.nama }}  &nbsp;|&nbsp;  {{ profil.jabatan }}  &nbsp;|&nbsp;  {{ profil.satker }}
								</h4>
								<hr/>
								<div v-if="$route.params.xid == 'bimas'" class="card-body">
									<div class="row centered">
										<div v-for="item in files" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered" style="margin-bottom: 3%;">
											<div class="media-image">
												<h5 class="media-title"><u><b>{{ item.nama }}</b></u></h5>
													<img v-if="item.status == NULL && item.status == 'KOSONG'" :src="$assets+'/img/ikon/filenotfound.png'" style="max-width: 170px;"/>
													<img v-else-if="item.status == 'DIKIRIM'" :src="$assets+'/img/ikon/FileUploaded.png'" style="max-width: 170px;" alt="" @click="openFile(item.filename)" />
													<img v-else :src="$assets+'/img/ikon/'+item.status+'.png'" style="max-width: 170px;" alt="" @click="openFile(item.filename)" />
												<BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
													<p class="my-4">Cek File!</p>
												</BModal>
												<br/>
												<br/>
												<div class="settings-upload-btn">
													<div v-if="item.status == 'DISETUJUI'">
														<BButton block size="lg" variant="success" style="margin-top: 5px;" @click="detailReq(item.id)">
															<span><i-noto-v1-ok-hand /> Disetujui</span>
														</BButton>
													</div>
													<div v-else>
														<input :id='"file"+item.id' type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @change="onFileChange(item.id,$event)">
														<label v-if="!loadingfile[item.id]" :for='"file"+item.id' class="file-upload">
															<span v-if="item.status == 'KOSONG'"><i-ph-upload-fill /> Upload File</span>
															<span v-else ><i-material-symbols-change-circle-rounded /> Ganti File</span>
														</label>
														<label v-else :for='"file"+item.id' class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
													    </div>
												</div>
												<br/>
												<BButton v-if="item.status == 'DIKIRIM' || item.status == 'DITOLAK'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile(item.id)">
													<span><i-fluent-delete-off-24-filled /> Delete File</span>
												</BButton>
                                                    <br/>
                                                    <span v-if="kategori == 'KUA' && item.status != 'KOSONG'" style="font-size: small;font-style: italic;font-weight: 700;"><i-fluent-person-tag-20-filled />Uploader : {{ item.uploader }} </span>
													<br/>
													<span v-if="item.status != 'KOSONG' && item.status != 'DIKIRIM'" style="font-size: small;font-style: italic;font-weight: 700;"><i-mingcute-comment-fill /> {{ item.alasan }} </span>
												<hr/>
											</div>
										</div>
									</div>
								</div>
                                <div v-else class="card-body">
									<div class="row centered">
										<div v-for="item in files" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered" style="margin-bottom: 3%;">
											<div class="media-image">
												<h5 class="media-title"><u><b>{{ item.nama }}</b></u></h5>
													<img v-if="item.status == NULL && item.status == 'KOSONG'" :src="$assets+'/img/ikon/filenotfound.png'" style="max-width: 170px;"/>
													<img v-else-if="item.status == 'UNCHECK' || item.status == 'DIKIRIM'" :src="$assets+'/img/ikon/FileUploaded.png'" style="max-width: 170px;" alt="" @click="cekDetail(item.id)" />
													<img v-else :src="$assets+'/img/ikon/'+item.status+'.png'" style="max-width: 170px;" alt="" @click="cekDetail(item.id)" />
												<BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
													<p class="my-4">Cek Detail!</p>
												</BModal>
												<br/>
												<br/>
												<div class="settings-upload-btn">
													<div v-if="item.status == 'DISETUJUI'">
														<BButton block size="lg" variant="success" style="margin-top: 5px;" @click="detailReq(item.id)">
															<span><i-noto-v1-ok-hand /> Disetujui</span>
														</BButton>
													</div>
													<div v-else>
														<button :id='"file"+item.id' name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @click="detailReq(item.id)"></button>
														<label v-if="!loadingfile[item.id]" for="file" class="file-upload">
															<span v-if="item.status == 'KOSONG' || item.status == 'DRAFT'"><i-ph-upload-fill /> Kirim Pengajuan</span>
															<span v-else ><i-material-symbols-change-circle-rounded /> Ubah Pengajuan</span>
														</label>
														<label v-else :for='"file"+item.id' class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Menuju Lokasi..</label>
													</div>
												</div>
												<br/>
                                                    <br/>
                                                    <span v-if="kategori == 'KUA' && item.status != 'KOSONG'" style="font-size: small;font-style: italic;font-weight: 700;"><i-fluent-person-tag-20-filled />Uploader : {{ item.uploader }} </span>
													<br/>
													<span v-if="item.status != 'KOSONG' && item.status != 'DIKIRIM'" style="font-size: small;font-style: italic;font-weight: 700;"><i-mingcute-comment-fill /> {{ item.alasan }} </span>
												<hr/>
											</div>
										</div>
									</div>
								</div>
                            <div class="card-body">
                                
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
            title: "Laporan Kinerja",
            text: "User",
            text1: "Laporan Kinerja",
            name: "/",
            kategori: this.$route.params.id,
            tahun: null,
            waktu: 'old',
			files: [
				{ id: 1, nama: 'Januari', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 2, nama: 'Februari', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 3, nama: 'Maret', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 4, nama: 'April', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 5, nama: 'Mei', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 6, nama: 'Juni', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 7, nama: 'Juli', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 8, nama: 'Agustus', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 9, nama: 'September', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 10, nama: 'Oktober', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 11, nama: 'November', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
				{ id: 12, nama: 'Desember', filename: null, status: "KOSONG", alasan: "Upload Laporan Anda!!" },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingfile: [],
			itemsPerPage: 12,
        	currentPage: 1,
			kinerja: [],
			profil: [],
			kinerja0: [],
			tanggal: [],
            detail: 1,
            januari: null,
        }
    },
  created() {
		this.getLap();
		window.scrollTo(0,0)
	},
  methods: {
    async getLap() {
            const today = new Date();
			const date = today.getFullYear();
            
			this.tahun = date;
			this.loading = true;
            this.kategori = `${this.$route.params.xid}-${this.$route.params.zid}-${this.$route.params.id}`

            console.log(this.kategori)

                try{
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myPemberkasan',{
                        kategori: this.kategori,
                        tahun: this.tahun
                    },{headers})
                    
                    if(response.data.success == true){
                        this.profil = response.data.profil
                        console.log(response.data.file)
                        response.data.file.forEach((value, index) => {
                            let itemIndex = this.files.findIndex(files => files.id === value.id)
                            this.files[itemIndex] = value;
                        });
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
    async get2Lap() {
            this.waktu = 'new';
            this.loading = true;
            this.kategori = `${this.$route.params.xid}-${this.$route.params.zid}-${this.$route.params.id}`

            console.log(this.kategori)
                try{
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/myPemberkasan',{
                        kategori: this.kategori,
                        tahun: this.tahun
                    },{headers})
                    
                    if(response.data.success == true){
                        response.data.file.forEach((value, index) => {
                            let itemIndex = this.files.findIndex(files => files.id === value.id)
                            this.files[itemIndex] = value;
                        });
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
	changedetail(id){
		this.detail = id;
		this.$nextTick(() => {
			this.$refs.scroll1st.scrollIntoView();
		});
	},
    async detailReq(id){
        try{
                this.loadingfile[id] = true
                this.kategori = `${this.$route.params.xid}-${this.$route.params.zid}-${this.$route.params.id}`

				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                console.log(this.kategori)
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadPemberkasan',{
                    id: id,
                    seksi: this.$route.params.xid,
                    layanan: this.$route.params.zid,
                    kategori: this.kategori,
                    tahun: this.tahun,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/pemberkasan/'+response.data.file)
                }else{
					this.$toast.fire({
                        title: response.data.message,
                        icon: 'danger',
                    })
				}
                
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[id] = false
			}
    },
	onFileChange(itemId, event) {
		    const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                
                
				if(file.size > 5200000){
					this.$toast.fire({
						title: "File Tidak Boleh lebih dari 5 MB / 5000 KB !",
						icon: "warning"
					});
				}else if(file.type != 'application/pdf'){
					this.$toast.fire({
						title: "File harus tipe .PDF !",
						icon: "warning"
					});
				}else{
					this.uploadDoc(itemId)
				}
                
            }

            reader.readAsDataURL(file)
		},
		async uploadDoc(itemId) {
            try{
                this.loadingfile[itemId] = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadLaporan',{
                    id: itemId,
                    kategori: this.kategori,
                    tahun: this.tahun,
                    filex: this.fileUrl,
                    size: this.fileSize
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    const itemIndex = this.files.findIndex(files => files.id === itemId)
        			this.files[itemIndex] = response.data.file;
					console.log(this.files)
                }else{
					this.$toast.fire({
                        title: response.data.message,
                        icon: 'danger',
                    })
				}
                
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[itemId] = false
			}
        },
		openFile(item) {
            
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
					allowEscapeKey: true,
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
        },
		async deleteFile(itemid){
            this.$swal.fire({
                title: "Apakah Anda Yakin?",
                text: "Anda Tidak bisa untuk Membatalkannya!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                showLoaderOnConfirm: true,
                confirmButtonText: "Ya, Hapus File ini!",
                preConfirm: async (deleteFile) => {
                    try {
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteLaporan',{
                            id: itemid,
                            kategori: this.kategori,
                            tahun: this.tahun,
                        }, {headers})

                        if(response.data.success == true){
							const itemIndex = this.files.findIndex(files => files.id === itemid)
        					this.files[itemIndex] = response.data.file;
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => this.$swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$toast.fire({
                    title: "File Telah Dihapus!",
                    icon: "success"
                    });
                }
            });
        },
  }
}
</script>