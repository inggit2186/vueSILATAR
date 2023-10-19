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
                <b-form @submit.prevent="addDetailTamu">
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
                            <div class="card-header text-center">
							    <h3>~ {{ layanan.nama }} ~</h3>							
							</div>
						    <div class="card-header">
							    <h4>Basic Detail</h4>							
							</div>
                            <div class="card-body">
							    <div v-if="user.asn == 'pns' || user.asn == 'pppk'" class="form-group">
								    <label class="col-form-label">Nomor Induk Pegawai (NIP) <span>*</span></label>								    
									<b-form-input id="user.nomor_induk" v-model="user.nomor_induk" type="number" class="form-control pass-input" placeholder="NIP" readonly />									   
								</div>
                                <div v-else class="form-group">
								    <label class="col-form-label">Nomor Induk Kependudukan (NIK) <span>*</span></label>								    
									<b-form-input id="user.nomor_induk" v-model="user.nomor_induk" type="number" class="form-control pass-input" placeholder="NIP" readonly />									   
								</div>
                                <div class="form-group">
                                    <label class="col-form-label">Nama Lengkap <span>*</span></label>								    
                                    <b-form-input id="user.name" v-model="user.name" type="text" class="form-control pass-input" placeholder="Nama Lengkap" readonly />									   
                                </div>
								<div class="form-group">
								    <label class="col-form-label">Keterangan/Deskripsi <span>*</span></label>
								   	<b-form-textarea id="tujuan" v-model="keterangan" rows="6" class="form-control listingdescription" placeholder="Keterangan atau Deskripsi Tambahan"></b-form-textarea>												
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
        const user = JSON.parse(localStorage.getItem('user'))
        return {
            title: "Registrasi Permintaan",
            text: "Home",
            text1: "Tambah Permintaan",
            name: "/",
            loading: false,
            user: user,
            layanan: []
        }
    },
    created() {
        this.getLayananDetail(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getLayananDetail/'+sid,{headers})
				this.layanan = response.data.data
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
        async addDetailTamu() {
            try {
                this.loading = true;

                const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
                
                let response = null;

                    response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addTamu', {
                        kategori: cat,
                    },{headers});
                
                    if(response.data.success === true) {
                        console.log(response.data.data)

                        this.$swal.fire({
                            title: 'Welcome!',
                            text: response.data.message,
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                        })
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
