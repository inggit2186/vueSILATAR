<template>
    <!-- Login Section -->		
		<div class="login-content">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-5 mx-auto">
						<div class="login-wrap password-form">
							
							<div class="login-header">
								<h3>Lupa Password</h3>
								<p>Masukkan alamat E-mail atau NIP Anda yang terdaftar.</p>								
							</div>
							
							<!-- Login Form -->
							<b-form @submit.prevent="forgotPass">
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-mail"></i>
										<b-form-input v-model="email" type="text" class="form-control" placeholder="NIP / Email Address" :disabled="loading"/>
									</div>
								</div>
								<b-button v-if="!loading" variant="primary w-100 login-btn" type="submit"><b><i-icomoon-free-next /> KIRIM</b></b-button>
								<b-button v-else variant="primary w-100 login-btn" type="submit"><b><i-svg-spinners-bars-scale-middle /> &nbsp;Ubek-Ubek Berkas Dulu....</b></b-button>								
							</b-form>
							<router-link to="/" class="back-home"><i class="fas fa-regular fa-arrow-left me-1"></i> Back to Home</router-link>		
							<!-- /Login Form -->
											
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<!-- /Login Section -->
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			email: null
		}
	},
	methods: {
		async forgotPass() {
			try{
					this.loading = true
					
					const headers = {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${localStorage.getItem('token')}`
								};

					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/lupaPass',{
						nip: this.email
					}, {headers})
					
					if(response.data.success == true){
						
						this.$swal.fire({
						title: 'Reset Password Berhasil',
						html: response.data.message,
						icon: 'success',
						})
						this.$router.push('/login')
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
		}
	}
}
</script>