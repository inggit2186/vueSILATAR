<template>
    <div class="login-content">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-5 mx-auto">
						<div class="login-wrap">
							
							<div class="login-header">
								<h3>Selamat Datang</h3>
								<p>Silahkan Masukkan Email / NIP dan Password Anda</p>								
							</div>
							
							<!-- Login Form -->
							<b-form @submit.prevent="login">
								<div class="form-group group-img">
								<div class="group-img">
										<i class="feather-mail"></i>
										<b-form-input id="email" v-model="email" type="text" class="form-control" placeholder="Email / NIP" />
									</div>
								</div>
								<div class="form-group">
									<div class="pass-group group-img">
										<span class="lock-icon"><i class="feather-lock"></i></span>
											<b-form-input
												v-if="showPassword"
												id="password"
												v-model="password"
												type="text"
												class="form-control pass-input"
												placeholder="password"
										/>
										<b-form-input
v-else v-model="password"
											type="password"
											class="form-control pass-input" placeholder="password" />
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
								<div class="row">
									<div class="col-md-6 col-sm-6">
										<label class="custom_check">
											<input type="checkbox" name="rememberme" class="rememberme">
											<span class="checkmark"></span>Ingat Saya?
										</label>
									</div>									
									<div class="col-md-6 col-sm-6">
										<div class="text-md-end">
											<router-link class="forgot-link" to="forgot-password">Lupa Password?</router-link>
										</div>
									</div>									
								</div>
								<b-button variant="primary w-100 login-btn" type="submit" :disabled="loading">
									<span v-if="!loading"><b><i-solar-login-3-outline /> Masuk</b></span>
									<span v-else><i-svg-spinners-bars-scale-middle />  Assalamualaikum...</span>
								</b-button>
								<div class="register-link text-center">
									<p>Belum Punya Akun? <router-link class="forgot-link" to="/signup"><b><i-mdi-register /> REGISTRASI</b></router-link></p>
								</div>
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
							</b-form>
							<!-- /Login Form -->
											
						</div>
					</div>
				</div>
				
			</div>
		</div>
</template>

<script>
	export default {
		data() {
		return {
			title: "Profile",
			title1: "User Profile",
				showPassword: false,
			email: null,
			password: null,
				title01: "Profile",
			title2: "User Profile",
				showPassword2: false,
			password2: null,
			loading: false,
			};
	},
	computed: {
		buttonLabel() {
			return this.showPassword ? "Hide" : "Show";
		},
	},
	created() {
		window.scrollTo(0,0)
    },
	methods: {
		toggleShow() {
			this.showPassword = !this.showPassword;
		},
		async login() {
    try {
		this.loading = true;

        const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/login', {
		  source: 'VueJs',
          email: this.email,
          password: this.password,
		  deviceID: 'silatarV2vueJs2024'
        });
		
			if(response.data.success === true) {
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${response.data.data.token}`
					};
				if(response.data.data.sppt == null || response.data.data.sppt == [] || response.data.data.sppt.length == 0){
					if (window.innerWidth < 768) {
					this.$swal.fire({
					width: '400px',
                    height: '350px',
					title: 'SPT Pajak Tahunan!',
					html: '<p style="font-size: 17px">Apakah Bpk/Ibu sudah Melaporkan <b>SPT Tahun '+response.data.data.sppt_tahun+'</b> Bpk/Ibu ?</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
					icon: 'question',
					showConfirmButton: true,
					showDenyButton: true,
					confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SUDAH DILAPORKAN`,
					denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;BELUM DILAPORKAN`,
					showLoaderOnConfirm: true,
					allowOutsideClick: false,
					preConfirm: async (addsppt) => {
					try {
						const xresponse = this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addSPPT',{
							userid: response.data.data.id,
							tahun: response.data.data.sppt_tahun,
							status: 'sudah'
						},{headers});
						return xresponse;
					} catch (error) {
						this.$swal.showValidationMessage(`
						Request failed: ${error}
						`);
					}
					},
					}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						response.data.data.sppt= result.value.data.sppt;
						this.$toast.fire({
							title: response.data.message,
							icon: 'success',
						})

						localStorage.setItem('user',JSON.stringify(response.data.data))
						localStorage.setItem('token',response.data.data.token)

						this.$toast.fire({
							title: response.data.message,
							icon: 'success',
						})
						
						let searchParams = new URLSearchParams(window.location.search);

						if (searchParams.has("redirect")) {
							this.$router.push({ path: `${searchParams.get("redirect")}` });
						} else this.$router.push({ path: "/dashboard" });
					}else{
						if (window.innerWidth < 768) {
							this.$swal.fire({
							width: '400px',
                          	height: '350px',
							title: 'Laporkan SPT Pajak Tahunan!',
							html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+response.data.data.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
							icon: "error",
							closeButton: true,
							})
						}else{
							this.$swal.fire({
							title: 'Laporkan SPT Pajak Tahunan!',
							html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+response.data.data.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
							imageUrl: import.meta.env.VITE_APP_UPL_URL+"appfiles/laporspt2.png",
							imageWidth: 450,
							imageHeight: 450,
							imageAlt: "SPT Image",
							closeButton: true,
							})
						}
						localStorage.setItem('user',JSON.stringify(response.data.data))
						localStorage.setItem('token',response.data.data.token)
						
						let searchParams = new URLSearchParams(window.location.search);

						if (searchParams.has("redirect")) {
							this.$router.push({ path: `${searchParams.get("redirect")}` });
						} else this.$router.push({ path: "/dashboard" });
					};
					});
				}else{
					this.$swal.fire({
					title: 'SPT Pajak Tahunan!',
					html: '<p style="font-size: 17px">Apakah Bpk/Ibu sudah Melaporkan <b>SPT Tahun '+response.data.data.sppt_tahun+'</b> Bpk/Ibu ?</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
					imageUrl: import.meta.env.VITE_APP_UPL_URL+"appfiles/laporspt1.png",
					imageWidth: 450,
					imageHeight: 450,
					imageAlt: "SPT Image",
					showConfirmButton: true,
					showDenyButton: true,
					confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SUDAH DILAPORKAN`,
					denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;BELUM DILAPORKAN`,
					showLoaderOnConfirm: true,
					allowOutsideClick: false,
					preConfirm: async (addsppt) => {
					try {
						const xresponse = this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addSPPT',{
							userid: response.data.data.id,
							tahun: response.data.data.sppt_tahun,
							status: 'sudah'
						},{headers});
						return xresponse;
					} catch (error) {
						this.$swal.showValidationMessage(`
						Request failed: ${error}
						`);
					}
					},
					}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						response.data.data.sppt= result.value.data.sppt;
						this.$toast.fire({
							title: response.data.message,
							icon: 'success',
						})

						localStorage.setItem('user',JSON.stringify(response.data.data))
						localStorage.setItem('token',response.data.data.token)

						this.$toast.fire({
							title: response.data.message,
							icon: 'success',
						})
						
						let searchParams = new URLSearchParams(window.location.search);

						if (searchParams.has("redirect")) {
							this.$router.push({ path: `${searchParams.get("redirect")}` });
						} else this.$router.push({ path: "/dashboard" });
					}else{
						if (window.innerWidth < 768) {
							this.$swal.fire({
							width: '400px',
                          	height: '350px',
							title: 'Laporkan SPT Pajak Tahunan!',
							html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+response.data.data.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
							icon: "error",
							imageAlt: "SPT Image",
							closeButton: true,
							})
						}else{
							this.$swal.fire({
							title: 'Laporkan SPT Pajak Tahunan!',
							html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+response.data.data.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
							imageUrl: import.meta.env.VITE_APP_UPL_URL+"appfiles/laporspt2.png",
							imageWidth: 450,
							imageHeight: 450,
							imageAlt: "SPT Image",
							closeButton: true,
							})
						}
						localStorage.setItem('user',JSON.stringify(response.data.data))
						localStorage.setItem('token',response.data.data.token)
						
						let searchParams = new URLSearchParams(window.location.search);

						if (searchParams.has("redirect")) {
							this.$router.push({ path: `${searchParams.get("redirect")}` });
						} else this.$router.push({ path: "/dashboard" });
					};
					});
				}
				}else{
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})

					localStorage.setItem('user',JSON.stringify(response.data.data))
					localStorage.setItem('token',response.data.data.token)
					
					let searchParams = new URLSearchParams(window.location.search);

					if (searchParams.has("redirect")) {
						this.$router.push({ path: `${searchParams.get("redirect")}` });
					} else this.$router.push({ path: "/dashboard" });
				};
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
	},
};
</script>