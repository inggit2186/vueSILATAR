<template>
    <!-- Login Section -->		
		<div class="login-content">
			<div class="container">
				<div class="row">
					<div class="col-md-6 col-lg-5 mx-auto">
						<div class="login-wrap register-form">
							
							
							
							<!-- Login Form -->
							<b-form action="/login">
								<div class="dataDiri">
							    <div class="login-header">
									<h3>Buat Akun</h3>
									<p>Ayo dimulai dengan <span>DATA DIRI ANDA</span></p>								
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-info"></i>
										<b-form-input type="text" class="form-control" placeholder="Nomor Identitas (NIK/SIM/PASSPORT)" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-user"></i>
										<b-form-input type="text" class="form-control" placeholder="Nama Lengkap" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-flag"></i>
										<b-form-input type="text" class="form-control" placeholder="Tempat Lahir" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-calendar"></i>
										<b-form-input type="text" class="form-control" placeholder="Tanggal Lahir" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-phone-call"> +62 </i>
										<b-form-input style="padding-left: 18%;" type="number" class="form-control" placeholder="Nomor Kontak" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-briefcase"></i>
										<b-form-input type="text" class="form-control" placeholder="Pekerjaan" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-server"></i>
										<b-form-input type="text" class="form-control" placeholder="Tempat Bekerja" />
									</div>
								</div>
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-map-pin"></i>
										<b-form-textarea style="padding-left:10%;height: 120px;" type="text" class="form-control" placeholder="Alamat Lengkap" />
									</div>
								</div>
								</div>
								<div class="dataAkun">
								<div class="form-group group-img">
								    <div class="group-img">
										<i class="feather-mail"></i>
										<b-form-input type="text" class="form-control" placeholder="E-mail" />
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
										/>
										<b-form-input
											v-else v-model="password"
											type="password"
											class="form-control pass-input" placeholder="Password" />
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
								<b-button variant="primary w-100 login-btn" type="submit"><b><i-icomoon-free-next /> Selanjutnya</b></b-button>
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
		 	password: null,
			title01: "Profile",
		 	title2: "User Profile",
			showPassword2: false,
		 	password2: null,
		};
	},
	computed: {
		buttonLabel() {
			return this.showPassword ? "Hide" : "Show";
		},
	},
	methods: {
		toggleShow() {
		 	this.showPassword = !this.showPassword;
		},
	},
	}
</script>