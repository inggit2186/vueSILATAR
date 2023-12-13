<template>
    <!-- Login Section -->		
		<div class="login-content">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-5 mx-auto">
						<div class="login-wrap register-form">
							
							
							
							<!-- Login Form -->
							<b-form @submit.prevent="register">
								<div class="dataDiri">
							    <div class="login-header">
									<h3>DATA PROFIL</h3>
									<p>Ayo dimulai dengan <span>DATA DIRI ANDA</span></p>								
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-info"></i>
										<b-form-input v-model="nip" type="text" class="form-control" placeholder="Nomor Identitas (NIK/SIM/PASSPORT)" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-user"></i>
										<b-form-input v-model="nama" type="text" class="form-control" placeholder="Nama Lengkap" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-sliders"></i>
										<b-form-select v-model="jk" :options="ojk" style="padding-left: 10%;" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-flag"></i>
										<b-form-input v-model="tempatlahir" type="text" class="form-control" placeholder="Tempat Lahir" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-calendar"></i>
										<VueDatePicker v-model="date" model-type="MM/dd/yyyy" auto-apply placeholder="Tanggal Lahir" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-phone-call"> +62 </i>
										<b-form-input v-model="telp" style="padding-left: 18%;" @input="formatTelp" type="number" class="form-control" placeholder="Nomor Kontak" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-briefcase"></i>
										<b-form-input v-model="pekerjaan" type="text" class="form-control" placeholder="Pekerjaan" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-server"></i>
										<b-form-input v-model="instansi" type="text" class="form-control" placeholder="Tempat Bekerja" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-map-pin"></i>
										<b-form-textarea v-model="alamat" style="padding-left:10%;height: 120px;" type="text" class="form-control" placeholder="Alamat Lengkap" />
									</div>
								</div>
								</div>
								<hr/>
								<div class="dataAkun">
								<div class="login-header">
									<h3>DATA AKUN</h3>
									<p>Digunakan untuk <span>LOGIN KE APLIKASI</span></p>								
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-mail"></i>
										<b-form-input v-model="email" type="text" class="form-control" placeholder="E-mail" />
									</div>
								</div>
								<div class="form-group">
										        <div class="pass-group group-img">
													<span class="lock-icon"><i class="feather-lock"></i></span>
													<b-form-input
														v-if="showPassword"
														v-model="password"
														type="text"
														class="form-control pass-input"
														placeholder="Password"
														required
													/>
													<b-form-input
													v-else v-model="password"
														type="password"
														class="form-control pass-input" placeholder="Password" required/>
													<span
														class="toggle-password"
														:class="{
														'feather-eye': showPassword,
														'feather-eye-off': !showPassword,
														}"
														@click="toggleShow"
													></span>
												</div>
										    </div>
                                            <div class="form-group">
										        <div class="pass-group group-img">
													<span class="lock-icon"><i class="feather-lock"></i></span>
													<b-form-input
														v-if="showPassword2"
														v-model="password2"
														type="text"
														class="form-control pass-input"
														placeholder="Konfirmasi Password"
														required
													/>
													<b-form-input
													v-else v-model="password2"
														type="password"
														class="form-control pass-input" placeholder="Konfirmasi Password" required/>
													<span
														class="toggle-password"
														:class="{
														'feather-eye': showPassword2,
														'feather-eye-off': !showPassword2,
														}"
														@click="toggleShow1"
													></span>
												</div>
										    </div>
								<b-button variant="primary w-100 login-btn" type="submit" :disabled="loading">
									<span v-if="!loading"><b><i-icomoon-free-next /> DAFTAR</b></span>
									<span v-else><b><i-svg-spinners-bars-scale-middle /> Menyiapkan Berkas....</b></span>
								</b-button><br/>
								</div>
								<div class="register-link text-center">
									<p>Sudah Punya Akun? <router-link class="forgot-link" to="/login"><b><i-streamline-interface-login-dial-pad-finger-password-dial-pad-dot-finger /> LOGIN</b></router-link></p>
								</div>								
							</b-form>
							<!-- /Login Form -->
							
							<!--
								<div class="login-or">
									<span class="or-line"></span>
									<span class="span-or">Sign in with Social Media Accounts</span>
								</div>					
								<div class="social-login">
									<a href="#" class="btn btn-apple w-100"><img src="../../../assets/img/apple.svg" class="me-1" alt="img">Sign in with Apple</a>
								</div>
								<div class="social-login">
									<a href="#" class="btn btn-google w-100"><img src="../../../assets/img/google.svg" class="me-1" alt="img">Sign in with Google</a>
								</div>
								<div class="social-login">
									<a href="#" class="btn btn-facebook w-100 mb-0"><img src="../../../assets/img/facebook.svg" class="me-2" alt="img">Continue with Facebook</a>
								</div>
								-->
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
		 	title: "Profile",
		 	title1: "User Profile",
			showPassword: false,
			loading: false,
		 	password: null,
			title01: "Profile",
		 	title2: "User Profile",
			showPassword: false,
			showPassword2: false,
		 	password2: null,
			nip: null,
			nama: null,
			tempatlahir: null,
			date: null,
			telp: null,
			pekerjaan: null,
			instansi: null,
			alamat: null,
			email: null,
			jk: null,
			ojk: [
				{ value: null, text: 'Pilih Jenis Kelamin', disabled: true },
				{ value: 'Pria', text: 'Laki-Laki' },
				{ value: 'Wanita', text: 'Perempuan' },
			]
		};
	},
	computed: {
		buttonLabel() {
			return this.showPassword ? "Hide" : "Show";
		},
		buttonLabel() {
			return this.showPassword ? "Hide" : "Show";
		},
		buttonLabel1() {
			return this.showPassword2 ? "Hide" : "Show";
		},
	},
	created() {
		this.date = new Date()
	},
	methods: {
		toggleShow() {
		 	this.showPassword = !this.showPassword;
		},
		toggleShow1() {
		 	this.showPassword2 = !this.showPassword2;
		},
		formatTelp() {
			if (this.telp.startsWith('0')) {
				// Remove the 0 at the beginning of the input value
				this.telp = this.telp.substring(1);
				console.log(this.telp)
			}
		},
		async register() {
			if(this.password != this.password2){
				this.$toast.fire({
					title: 'Konfirmasi Password Tidak Sama',
					icon: 'error',
				})
			}else{
				try{
					this.loading = true
					
					const headers = {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${localStorage.getItem('token')}`
								};

					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/register',{
						nip: this.nip,
						nama: this.nama,
						tempatlahir: this.tempatlahir,
						tanggallahir: this.date,
						telp: this.telp,
						pekerjaan: this.pekerjaan,
						instansi: this.instansi,
						alamat: this.alamat,
						email: this.email,
						password: this.password,
						jk: this.jk
					}, {headers})
					
					if(response.data.success == true){
						
						this.$swal.fire({
						title: 'Pendaftaran Berhasil!',
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
	},
	}
</script>