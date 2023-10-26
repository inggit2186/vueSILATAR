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
                <b-form @submit.prevent="addRequest">
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
							    <h4>Upload File-File Syarat</h4>
                                <hr/>
                                <div v-if="request.status == 'DRAFT'" style="float:right;">
                                    <BButton block size="lg" variant="warning" @click="updateRequest()" :disabled="loadingRequest">
                                        <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Kirim Pengajuan</b></span>
                                        <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; JNE Berangkat....</b></span>
                                    </BButton>
                                </div>
                                <div v-else-if="request.status == 'UNCHECK' || request.status == 'PENDING' || request.status == 'DITERIMA' || request.status == 'DIPROSES'" style="float:right;">
                                    <BButton block size="lg" variant="danger" @click="cancelRequest()" :disabled="loadingRequest">
                                        <span v-if="!loadingRequest"><b><i-fluent-send-48-filled /> &nbsp;&nbsp;Batalkan Request</b></span>
                                        <span v-else><b><i-svg-spinners-6-dots-scale-middle /> &nbsp;&nbsp; Proses Pembatalan....</b></span>
                                    </BButton>
                                </div>
                                <h6>No Request : {{ request.no_req }} </h6>							
                                <h6>Seksi : {{ request.seksi }} </h6>							
                                <h6>Layanan : {{ request.judul }} </h6>							
                                <h6>Status : <BBadge v-if="request.status == 'DRAFT'" variant="light">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'UNCHECK'" variant="info">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'PENDING'" variant="warning">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'DITERIMA'" variant="secondary">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'DIPROSES'" variant="success">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'SUKSES'" variant="primary">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'DITOLAK'" variant="danger">{{ request.status }}</BBadge>
                                            <BBadge v-else-if="request.status == 'BATAL'" variant="dark">{{ request.status }}</BBadge>
                                </h6>							
							</div>
                            <div class="card-body"  v-if="request.status == 'DRAFT' || request.status == 'UNCHECK' || request.status == 'PENDING'">
                                <span style="font-size: small;"><b><i>*) Wajib Diupload</i></b></span>
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
                                                <div class="settings-upload-btn">
                                                    <input id="file" type="file" accept="application/pdf" name="image" class="hide-input image-upload" :disabled="loadingfile[item.id]" @change="onFileChange(item.id, $event)">
                                                    <label v-if="!loadingfile[item.id]" for="file" class="file-upload">
                                                        <span v-if="item.filename == 'NONE'"><i-ph-upload-fill /> Upload File</span>
                                                        <span v-else><i-material-symbols-change-circle-rounded /> Ganti File</span>
                                                    </label>
                                                    <label v-else for="file" class="file-upload"><i-svg-spinners-6-dots-scale-middle /> Kirim File..</label>
                                                </div>
                                            </div>
                                        </div>
									</div>										
								</div>					
							</div>
                            <div v-else class="text-center">
                                <b-img :src="$assets+'/img/ikon/'+request.status+'.png'" v-bind="mainProps" rounded width="350%"></b-img>
                                <hr>
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
            loadingfile: [],
            imageUrl: [],
            syarat: []
        }
    },
    created() {
        this.getRequest(),
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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getRequest/'+sid,{headers})

                if(response.data.success == true){
				    this.request = response.data.data
                    this.syarat = response.data.syarat
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

            reader.onload = (event) => {
                this.fileUrl = event.target.result
                this.fileSize = file.size
                this.fileName = file.name
                this.uploadSyarat(itemId)
            }

            reader.readAsDataURL(file)
		},
        async uploadSyarat(itemId) {
			try{
				this.loadingfile[itemId] = true

                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/uploadSyarat',{
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
            this.$swal.fire({
                width: "50%",
                html:
                    '<iframe src="'+ item +'" type="application/pdf" width="100%" height="600px" />',
                showCloseButton: true,
                focusConfirm: false,
            })
        },
        async updateRequest() {
            try{
				this.loadingRequest = true

                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateRequest',{
                    statusx: 'sending',
					noreq: noreq,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/UnitKerja')  
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

                const noreq = this.$route.params.id
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
                
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateRequest',{
                    statusx: 'batal',
					noreq: noreq,
				}, {headers})

                if(response.data.success == true){
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/UnitKerja')  
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
        }
    }
}
</script>
