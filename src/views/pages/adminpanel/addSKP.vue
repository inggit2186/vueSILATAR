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
                    <h3>::: Nyangkul Detail Layanannya :::</h3>
                    <hr>
                </div>
				<div v-else class="profile-content">
				    <div class="messages-form">
					    <div class="card">
						    <div class="card-header">
							    <h4>Detail Pejabat</h4>							
							</div>
                            <div class="card-body">
							    <div class="form-group">
								    <label class="col-form-label">Nomor Induk Pegawai (NIP) <span>*</span></label>								    
									<b-form-input id="user.nomor_induk" v-model="user.nomor_induk" type="number" class="form-control pass-input" placeholder="NIP" readonly />									   
								</div>
                                <div class="form-group">
                                    <label class="col-form-label">Nama Lengkap <span>*</span></label>								    
                                    <b-form-input id="user.name" v-model="user.name" type="text" class="form-control pass-input" placeholder="Nama Lengkap" readonly />									   
                                </div>
                                <br/>
                                <div class="form-group">
								    <label class="col-form-label">SKP Tahun 2025 <span>*</span></label>								    
                                        <b-form-select id="triwulan" v-model="triwulan" :disabled="loadingisi">
                                            <option value="tw1" selected>Triwulan 1</option>
                                            <option value="tw2">Triwulan 2</option>
                                            <option value="tw3">Triwulan 3</option>
                                            <option value="tw4">Triwulan 4</option>
                                            <option value="tahunan">Tahunan</option>
                                        </b-form-select>
								</div>
                                <hr/>
                                <div class="card-header text-center">
                                    <h3>:: Form Penilaian ::</h3>							
                                </div>
								<div class="form-group">
								    <label class="col-form-label">Berorientasi Pelayanan <span>*</span></label>
<b-form-textarea id="pelayanan" v-model="pelayanan" rows="6" class="form-control listingdescription" placeholder="Penilaian Berorientasi Pelayanan" :disabled="loadingisi"></b-form-textarea>												
								</div>
                                <hr/>
								<div class="form-group">
								    <label class="col-form-label">Akuntabel <span>*</span></label>
<b-form-textarea id="akuntabel" v-model="akuntabel" rows="6" class="form-control listingdescription" placeholder="Blanko Penilaian Akuntabel" :disabled="loadingisi"></b-form-textarea>												
								</div>
                                <hr/>
								<div class="form-group">
								    <label class="col-form-label">Kompeten <span>*</span></label>
<b-form-textarea id="kompeten" v-model="kompeten" rows="6" class="form-control listingdescription" placeholder="Blanko Penilaian Kompeten" :disabled="loadingisi"></b-form-textarea>												
								</div>
                                <hr/>
								<div class="form-group">
								    <label class="col-form-label">Loyal <span>*</span></label>
<b-form-textarea id="loyal" v-model="loyal" rows="6" class="form-control listingdescription" placeholder="Blanko Penilaian Loyal" :disabled="loadingisi"></b-form-textarea>												
								</div>
                                <hr/>
								<div class="form-group">
								    <label class="col-form-label">Adaptif <span>*</span></label>
<b-form-textarea id="adaptif" v-model="adaptif" rows="6" class="form-control listingdescription" placeholder="Blanko Penilaian Adaptif" :disabled="loadingisi"></b-form-textarea>												
								</div>
                                <hr/>
								<div class="form-group">
								    <label class="col-form-label">Kolaboratif <span>*</span></label>
<b-form-textarea id="kolaboratif" v-model="kolaboratif" rows="6" class="form-control listingdescription" placeholder="Blanko Penilaian Kolaboratif" :disabled="loadingisi"></b-form-textarea>												
								</div>
                                <hr/>
                                <label class="col-form-label">FEEDBACK <span>*</span></label>	
<b-form-select id="feedback" v-model="feedback" :disabled="loadingisi">
        <option value="buruk" selected>Kurang Memuaskan</option>
        <option value="sedang">Cukup Memuaskan</option>
        <option value="baik">Sangat  Memuaskan</option>
    </b-form-select>	
                            </div>
                        </div>
                        <div class="centered">
                            <b-button variant="primary" type="submit" :disabled="loading"> 
                                <span v-if="!loading"> Kirim</span>
                                <span v-else><i-svg-spinners-6-dots-scale-middle />  Meluncurrrr....</span>
                            </b-button>						
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
            title: "Blanko Penilaian",
            text: "Home",
            text1: "Blanko",
            name: "/",
            loading: false,
            loadingisi: false,
            triwulan: null,
            pelayanan: null,
            akuntabel: null,
            kompeten: null,
            harmonis: null,
            loyal: null,
            adaptif: null,
            kolaboratif: null,
            feedback: null,
            user: [],
        }
    },
    created() {
        this.getLayananDetail(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    watch: {
        triwulan(newVal, oldVal) {
            this.ambilDataSKP();
        }
    },
    methods: {
        async getLayananDetail() {
			this.loading = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/user/'+sid,{},{headers})
				this.user = response.data.user

			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
        async ambilDataSKP() {
			this.loadingisi = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/ambildataskp/',{
                    userid : sid,
                    tahun : '2025',
                    tw : this.triwulan
                },{headers})
				this.skp = response.data.data
                console.log(this.skp)
                this.pelayanan = this.skp.pelayanan || ''
                this.akuntabel = this.skp.akuntabel || ''
                this.kompeten = this.skp.kompeten || ''
                this.harmonis = this.skp.harmonis || ''
                this.loyal = this.skp.loyal || ''
                this.adaptif = this.skp.adaptif || ''
                this.kolaboratif = this.skp.kolaboratif || ''
                this.feedback = this.skp.feedback || ''

			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingisi = false
			}
		},
        async addRequest() {
            this.loading = true;
            try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

                const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addnilaiskp/',{
                    userid : sid,
                    tahun : '2025',
                    tw : this.triwulan,
                    pelayanan : this.pelayanan,
                    akuntabel : this.akuntabel,
                    kompeten : this.kompeten,
                    harmonis : this.harmonis,
                    loyal : this.loyal,
                    adaptif : this.adaptif,
                    kolaboratif : this.kolaboratif,
                    feedback : this.feedback,
                },{headers})

                this.$toast.fire({
					title: response.data.message,
					icon: 'success',
				})
                this.$router.push('/nilaiSKP');

			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
            }
    }
}
</script>
