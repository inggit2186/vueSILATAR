<template>
    <div class="main-wrapper">
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <div class="dashboard-content">		
			<div class="container">
                <div  class="pagination">
                    <a class="page-link" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <b-form @submit.prevent="addDetailTamu">
				<div class="profile-content">
				    <div class="messages-form">
					    <div class="card">
                            <div class="card-header text-center">
							    <h2>::: Buku Tamu :::</h2>							
							</div>
						    <div class="card-header">
							    <h4>Basic Detail</h4>							
							</div>
                            <div class="card-body">
							    <div class="form-group" v-if="this.cat == 'pegawai'">
								    <label class="col-form-label">Nomor Induk Pegawai (NIP) <span>*</span></label>								    
									<b-form-input id="nip" v-model="nip" type="number" class="form-control pass-input" placeholder="NIP" required />									   
								</div>
                                <div v-else>
                                    <div class="form-group">
                                        <label class="col-form-label">Nama Lengkap <span>*</span></label>								    
                                        <b-form-input id="nama" v-model="nama" type="text" class="form-control pass-input" placeholder="Nama Lengkap" required />									   
                                    </div>
                                    <div class="form-group">
                                        <label class="col-form-label">Asal (Instansi/Domisili) <span>*</span></label>								    
                                        <b-form-input id="asal" v-model="asal" type="text" class="form-control pass-input" placeholder="Asal Instansi/Domisili" required />									   
                                    </div>
                                </div>
								<div class="form-group">
								    <label class="col-form-label">Maksud Tujuan <span>*</span></label>
								   	<b-form-textarea id="tujuan" v-model="tujuan" rows="6" class="form-control listingdescription" placeholder="Maksud Tujuan anda"></b-form-textarea>												
								</div>
                            </div>
                        </div>
                        <div class="centered">
                            <b-button variant="primary" type="submit" :disabled="loading"> 
                                <span v-if="!loading"> Kirim</span>
                                <span v-else><i class="fa fa-spinner fa-spin"></i>  Assalamualaikum Wr.Wb....</span>
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
            title: "Kantor Kementerian Agama Kab.Tanah Datar",
            text: "Home",
            text1: "Detail Tamu",
            nip: null,
            tujuan: null,
            name: "/",
            loading: false
        }
    },
    created() {
        this.cat = this.$route.params.cat
    },
    methods: {
        async addDetailTamu() {
            try {
                this.loading = true;
                const cat = this.$route.params.cat
                const tipe = this.$route.params.tipe
                const id = this.$route.params.id

                const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
                
                let response = null;

                if(cat === 'pegawai'){
                    response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addTamu', {
                        kategori: cat,
                        tipe: tipe,
                        nip: this.nip,
                        idtujuan: id,
                        tujuan: this.tujuan,
                        status: "on site"
                    },{headers});
                }else{
                    response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addTamu', {
                        kategori: cat,
                        tipe: tipe,
                        nama: this.nama,
                        asal: this.asal,
                        idtujuan: id,
                        tujuan: this.tujuan,
                        status: "on site"
                    },{headers});
                }
                
                    if(response.data.success === true) {
                        console.log(response.data.data)

                        this.$swal.fire({
                            title: response.data.message,
                            icon: 'success',
                        })
                        this.$router.push('/internal');
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
                    this.loading = false;
                }
            },
    }
}
</script>
