<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <div class="dashboard-content">		
			<div class="container">
                <div  ref="scroll1st" class="pagination">
                    <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <b-form>
                <div v-if="loading" class="text-center">
                    <hr>
                    <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                    <br>
                    <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                    <h3>::: Mencari Berkas Dulu :::</h3>
                    <hr>
                </div>
				<div v-else class="profile-content">
                    
                    <div v-if="datax" class="text-center">
                        <b-img :src="$assets+'/img/ikon/404nodata.png'" v-bind="mainProps" rounded width="350%"></b-img>
                        <hr>
                    </div>
				    <div v-else class="card media-section">
						    <div class="card-header">
                                <div style="font-size:18px;float:right;">
                                        <BBadge v-if="request.status == 'DRAFT'" variant="light">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'UNCHECK'" variant="info">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'PENDING'" variant="warning">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DISETUJUI'" variant="warning">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DITERIMA'" variant="secondary">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DIPROSES'" variant="success">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'SUKSES'" variant="primary">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'DITOLAK'" variant="danger">{{ request.status }}</BBadge>
                                        <BBadge v-else-if="request.status == 'BATAL'" variant="dark">{{ request.status }}</BBadge>
                                </div>
							    <h4>Upload File-File Syarat</h4>
                                <hr/>
                                <div v-if="request.status == 'DRAFT'" style="float:right;">
                                    <BButton block size="lg" variant="warning" @click="newRequest()" :disabled="loadingRequest">
                                        <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Kirim Pengajuan</b></span>
                                        <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                    </BButton>
                                </div>
                                <div v-if="request.status == 'UNCHECK' || request.status == 'DITOLAK'" style="float:right;">
                                    <BButton block size="lg" variant="warning" @click="updateRequest()" :disabled="loadingRequest">
                                        <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Ubah Pengajuan</b></span>
                                        <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                    </BButton>
                                    <br/><br/>
                                    <BButton block size="lg" variant="danger" @click="cancelRequest()" :disabled="loadingRequest">
                                        <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Batalkan Request</b></span>
                                        <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                    </BButton>
                                </div>
                                <div v-else-if="request.status == 'PENDING' || request.status == 'DITERIMA' || request.status == 'DIPROSES'" style="float:right;">
                                    <BButton block size="lg" variant="danger" @click="cancelRequest()" :disabled="loadingRequest">
                                        <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Batalkan Request</b></span>
                                        <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; Proses Pembatalan....</b></span>
                                    </BButton>
                                </div>
                                <table class="detailhead">
                                    <tr>
                                        <td>No Request</td>
                                        <td> : </td>
                                        <td> <BBadge variant="info">{{ request.noreq }}</BBadge></td>
                                    </tr>
                                    <br/>
                                    <tr>
                                        <td>Nama</td>
                                        <td> : </td>
                                        <td>{{ request.nama }}</td>
                                    </tr>
                                    <tr>
                                        <td>NIP</td>
                                        <td> : </td>
                                        <td>{{ request.nip }}</td>
                                    </tr>
                                    <tr>
                                        <td>Unit Kerja</td>
                                        <td> : </td>
                                        <td>{{ request.seksi }}</td>
                                    </tr>
                                    <tr>
                                        <td>Layanan</td>
                                        <td> : </td>
                                        <td>{{ request.judul }}</td>
                                    </tr>
                                    <br/>
                                    <tr v-if="request.komentar != NULL && request.komentar != '<No Komen>'">
                                        <td>Keterangan</td>
                                        <td> : </td>
                                        <td>{{ request.komentar }}</td>
                                    </tr>
                                </table>
                                <br/>
                                <div v-if="request.status == 'DRAFT'"></div>
                                <div v-else>
                                <hr/>
                                </div>				
							</div>
                            <div class="card-body">
                                <span style="font-size: small;"><b><i>*) Wajib Diupload/Diisi</i></b></span>
							    <div class="row">
									<div class="row">
                                        <div v-for="item in syarat" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered">
                                            <div class="media-image" v-b-tooltip="item.keterangan">
                                                <h6 class="media-title">{{ item.nama }}<span v-if="item.wajib == 1">*</span></h6>
                                                    <img v-if="item.fileUrl != 'NONE'" :src="$assets+'/img/ikon/FileUploaded.png'" alt="" @click="openFile(item.fileUrl)" />
                                                    <img v-else :src="$assets+'/img/ikon/filenotfound.png'" />
                                                <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                    <p class="my-4">Cek File!</p>
                                                </BModal>
                                                <hr/>
                                                <div v-if="request.status == 'DRAFT' || request.status == 'UNCHECK' || request.status == 'PENDING' || request.status == 'DITOLAK'" class="settings-upload-btn">
                                                    <input :id='"file"+item.id' type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @change="onFileChange(item.id, $event)">
                                                    <label v-if="!loadingfile[item.id]" :for='"file"+item.id' class="file-upload">
                                                        <span v-if="item.filename == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                        <span v-else><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                    </label>
                                                    <label v-else :for='"file"+item.id' class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                </div>
                                                <br/>
                                                <div v-if="request.status == 'DRAFT' || request.status == 'UNCHECK' || request.status == 'PENDING' || request.status == 'DITOLAK'">
                                                    <BButton v-if="item.filename != null && item.filename != 'NONE'" block size="md" variant="danger" style="margin-top: 5px;" @click="deleteFile(item.id)">
                                                        <span><i-fluent-delete-off-24-filled /> Delete File</span>
                                                    </BButton>
                                                </div>
                                            </div>
                                        </div>
									</div>										
								</div>					
							</div>
                            <div>
                                <div class="profile-content">
                                    <div class="messages-form">
                                        <div class="card">
                                            <div class="card-header text-center">
                                                <h4>Data Input</h4>							
                                            </div>
                                            <div class="card-body">
                                                <div v-for="input in input" :key="input.id" class="form-group">
                                                    <label class="col-form-label">{{ input.nama }} <span v-if="input.wajib == 1" style="color: red; font-size: smaller;">*</span></label>								    
                                                    <b-form-input v-if="input.type == 'input'" v-model="input.filename" type="text" class="form-control pass-input" :placeholder="input.keterangan" />
                                                    <VueDatePicker v-else-if="input.type == 'date'" v-model="input.filename" format="dd MMMM yyyy" :placeholder="input.keterangan" auto-apply :enable-time-picker="false" />								   
                                                    <VueDatePicker v-else-if="input.type == 'datetime'" v-model="input.filename" format="dd MMMM yyyy HH:mm" :placeholder="input.keterangan" :flow="['calender','time']" />								   
                                                    <b-form-select v-else-if="input.type == 'option'" v-model="input.filename" >
                                                        <b-form-select-option v-for="item in JSON.parse(input.value)" :value="item">{{item}}</b-form-select-option>
                                                    </b-form-select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>			
                                </div>
                            </div>
						</div>				
				</div>
                </b-form>
			</div>
		</div>
            <foot />
            <scroll />
        </div>
     </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Upload File Syarat",
            text: "Home",
            text1: "Upload Syarat",
            name: "/",
            datax: false,
            loading: false,
            loadingRequest: false,
            loadingkomen: false,
            loadingfile: [],
            imageUrl: [],
            syarat: [],
            komen: [],
            input: [],
            formx: {
                isi: {}
            },
            inputx: {
                filename: []
            }
        }
    },
    created() {
        this.getRequest(),
        this.date = new Date(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    methods: {
        async getRequest() {
			this.loading = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getPemberkasan/'+sid,{headers})

                if(response.data.success == true){
				    this.request = response.data.data
				    this.syarat = response.data.syarat
				    this.input = response.data.input
                    console.log(this.syarat)
                }else{
                    this.datax = true,
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
        onFileChange(itemId, event) {
		    const file = event.target.files[0];
            const reader = new FileReader();
            console.log(itemId)

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name

                if(file.size > 5242880){
                    this.$toast.fire({
                        title: "File Tidak Boleh lebih dari 5MB !",
                        icon: "warning"
                    });
                }else if(file.type != 'application/pdf'){
                    this.$toast.fire({
                        title: "File harus tipe .PDF !",
                        icon: "warning"
                    });
                }else{
                    this.uploadSyarat(itemId)
                }
                
            }

            reader.readAsDataURL(file)
		},
        async uploadSyarat(itemId) {
			try{
				this.loadingfile[itemId] = true

                const noreq = this.request.noreq
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadFilePemberkasan',{
					noreq: noreq,
                    id: itemId,
                    filex: this.fileUrl,
                    size: this.fileSize
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.syarat = response.data.syarat
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
        async newRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.request.noreq
				var statuskirim = 1;

                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
                this.syarat.forEach((item) => {
                    if(item.wajib == 1 && item.filename == 'NONE'){
                            statuskirim = 2;
                    } // You can access each item in the syarat array here
                });
                
                if(statuskirim == 1){
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePemberkasan',{
                        statusx: 'new',
                        noreq: noreq,
                        formx: this.input,
                        notifx: 'yes',
                        baseurl: window.location.origin,
                    }, {headers})
                    
                    if(response.data.success == true){
                        this.$toast.fire({
                            title: response.data.message,
                            icon: 'success',
                        })
                        this.$router.push('/layanan/'+this.request.deptid) 
                    }else{
                        this.$toast.fire({
                            title: response.data.message,
                            icon: 'error',
                        })
                    }
                }else{
                    this.$swal.fire({
                            title: 'Lengkapi Dulu!',
                            html: 'Mohon isi/upload semua File/Syarat yang wajib<hr/><i style="font-size: 15px"><b>Syarat/File yang wajib bertanda <span style="color: red;">bintang(*)</span> disebelah nama syarat/file</b></i>',
                            icon: 'warning',
                            showCancelButton: false,
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
        async updateRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.request.noreq
				
                
                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePemberkasan',{
                    statusx: 'sending',
					noreq: noreq,
                    formx: this.input,
                    notifx: 'yes',
                    baseurl: window.location.origin,
				}, {headers})
                
                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/layanan/'+this.request.deptid)
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
        async cancelRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.request.noreq
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePemberkasan',{
                    statusx: 'batal',
					noreq: noreq,
                    notifx: 'yes',
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/layanan/'+this.request.deptid)  
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
        async onEnter() {
            this.loadingkomen = true;
            try{
                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
                 console.log(this.input.komen)
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addKomen',{
					noreq: noreq,
                    komen: this.input.komen
				}, {headers})
                
                if(response.data.success == true){
                    this.komen = response.data.komen
                    this.input.komen = ''
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
				this.loadingkomen = false
			}
        },
        async deleteFile(itemid){
            console.log(itemid)
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
                        const noreq = this.request.noreq
                        const headers = {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                                    };
                        
                        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteFilePemberkasan',{
                            noreq: noreq,
                            id: itemid,
                        }, {headers})

                        if(response.data.success == true){
                            this.syarat = response.data.syarat
                        }
                    } catch (error) {
                    this.$swal.showValidationMessage(`
                        Request failed: ${error}
                    `);
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$toast.fire({
                    title: "File Telah Dihapus!",
                    icon: "success"
                    });
                }
            });
        }
    }
}
</script>

<style>
.comments {
  width: 430px;
  margin: 10px;
}

.pp {
	text-align: center;
	width:120px;
	float:left;
	margin-right: 20px;
}

.pp2 {
	text-align: center;
	width:120px;
	float:right;
	margin-left: 20px;
}

.imgkomen {
	border-radius: 50%;
	width:70%;
	height:100%;
}

.pp span {
	font-size: 12px;
	font-weight: bold;
}

.pp2 img {
	border-radius: 50%;
	width:100%;
	height:100%;
}

.pp2 span {
	font-size: 12px;
	font-weight: bold;
}

.comment {
  width: 100%;
  margin-bottom: 20px;
  color: white;
}

.bubble {
  position: relative;
  background: teal;
  padding: 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.bubble:after {
  content: '';
  display: block;
  position: absolute;
  
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 15px solid teal;
  border-left: 15px solid transparent;
  
  left: -30px;
  top: 10px;
}

.bubble2 {
  position: relative;
  background: teal;
  padding: 20px;
  border-radius: 5px;
  margin-left: 20px;
}

.bubble2:after {
  content: '';
  display: block;
  position: absolute;
  
  width: 0;
  height: 0;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 15px solid transparent;
  border-left: 15px solid teal;
  
  right: -30px;
  top: 10px;
}
</style>