<template>
    <div class="main-wrapper">
        <div class="page-wrapper">
            <layouts></layouts>
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <div class="dashboard-content">		
			<div class="container">
                <div  ref="scroll1st" class="pagination">
                    <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
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
                                <div class="form-group">
                                    <label class="col-form-label">Tanggal & Jam Temu (Appointment) <span>*</span></label>								    
                                    <VueDatePicker v-model="date" model-type="MM/dd/yyyy HH:mm" :min-date="new Date()" placeholder="Pilih Tanggal & Jam" :flow="['calendar', 'time']" />									   
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
                                <span v-else><i-svg-spinners-6-dots-scale-middle />  Assalamualaikum Wr.Wb....</span>
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
import { ref } from 'vue';

export default {
    data() {
        return {
            title: "Registrasi Tamu",
            text: "Home",
            text1: "Detail Tamu",
            nip: null,
            date: null,
            tujuan: null,
            name: "/",
            loading: false
        }
    },
    created() {
        this.cat = this.$route.params.cat
        this.date = new Date()
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });

    },
    methods: {
        async addDetailTamu() {
            try {
                this.loading = true;
                const tipe = this.$route.params.xid
                const id = this.$route.params.id

                const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
                
                let response = null;

                response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addAppointment', {
                    tipe: tipe,
                    date: this.date,
                    idtujuan: id,
                    tujuan: this.tujuan,
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
                        this.$router.push('/UnitKerja');
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
