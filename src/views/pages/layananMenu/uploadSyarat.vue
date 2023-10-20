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
				    <div class="card media-section">
						    <div class="card-header">
							    <h4>Upload File-File Syarat</h4>
                                <hr/>
                                <h6>No Request : {{ request.no_req }} </h6>							
                                <h6>Layanan : {{ request.judul }} </h6>							
                                <h6>Status : {{ request.status }} </h6>							
							</div>
                            <div class="card-body">
							    <div class="row">
									<div class="row">
                                        <div v-for="item in syarat" id="item" :key="item.id" class="col-lg-4 col-md-4 featured-img1 centered">
                                            <div class="media-image">
                                                <h6 class="media-title">{{ item.nama }}</h6>
                                                <img :src="imageUrl[item.id]" alt="">
                                                <br/>
                                                <br/>
                                                <BButton @click="openModal(item.id)">Launch centered modal</BButton>

                                                <BModal id="modal-center" v-model="modal1" centered title="BootstrapVue" :item="modalItem">
                                                    <p class="my-4">Vertically centered modal!</p>
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
            loading: false,
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
				this.request = response.data.data
                this.syarat = response.data.syarat

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
                
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingfile[itemId] = false
			}
		},
        openModal(item) {
            this.modalItem = item;
            this.modal1 = ref(false)
        },
    }
}
</script>
