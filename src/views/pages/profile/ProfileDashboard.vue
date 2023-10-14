<template>
    <!-- Profile Content -->
    <div class="dashboard-content">		
			<div class="container">
				<userMenu />
				<div class="profile-content">
				     <div class="row dashboard-info">
					    <div class="col-lg-9">
						    <div class="card dash-cards">
								<div class="card-header">
									<h4>Profile Details</h4>														
								</div>
								<b-form @submit.prevent="updateProfil">
                                <div class="card-body">
								    <div class="profile-photo">
									    <div class="profile-img">
											<div class="settings-upload-img">
												<img :src="imageUrl" alt="profile">
											</div>										    
											<div class="settings-upload-btn">
												<input type="file" accept="image/*" name="image" v-on:change="filex" id="filex" class="hide-input image-upload" @change="onFileSelected">
												<label for="file" class="file-upload" :disable="loadingpp">
													<span style="color: aliceblue;" v-if="!loadingpp"><i class="fa fa-upload" aria-hidden="true"></i> Upload Foto Baru</span>
													<span style="color: aliceblue;" v-else ><i class="fa fa-spinner fa-spin"></i>&nbsp; JNE Berangkaattt... </span>
												</label>												
											</div>	
											<span>Max file size: 10 MB</span>
										</div>                                        									
                                        <a href="javascript:void(0)" class="profile-img-del"><i class="feather-trash-2"></i></a>										
									</div>
									<div class="profile-form">
										    <div class="form-group">
											    <label class="col-form-label">Nama Lengkap</label>
										        <div class="pass-group group-img">
													<span class="lock-icon"><i class="feather-user"></i></span>
													<b-form-input v-model="user.name" id="name" type="text" class="form-control" placeholder="Nama Lengkap" readonly />													
												</div>
										    </div> 
											<div class="row">
											     <div class="col-lg-6 col-md-6">
												    <div class="form-group">
														<label class="col-form-label">Handphone / Whatsapp</label>
														<div class="pass-group group-img">
															<span class="lock-icon"><i class="feather-phone-call"></i></span>
															<b-form-input type="tel" class="form-control" id="telp" v-model="user.telp" placeholder="Nomor Kontak" />													
														</div>
													</div>
												 </div>
												 <div class="col-lg-6 col-md-6">
												    <div class="form-group">
														<label class="col-form-label">Email Address</label>
														<div class="group-img">
															<i class="feather-mail"></i>
															<b-form-input type="text" class="form-control" id="email" v-model="user.email" placeholder="Alamat Email" />
														</div>
													</div>
												 </div>											
											</div>
											<div class="row">
											     <div class="col-lg-6 col-md-6">
												    <div class="form-group">
														<label class="col-form-label">Pekerjaan/Jabatan</label>
														<div class="pass-group group-img">
															<i class="fas fa-briefcase lock-icon"></i>
															<b-form-input type="text" class="form-control" id="pekerjaan" v-model="user.pekerjaan" placeholder="Pekerjaan / Jabatan" readonly/>													
														</div>
													</div>
												 </div>
												 <div class="col-lg-6 col-md-6">
												    <div class="form-group">
														<label class="col-form-label">Satuan Kerja</label>
														<div class="group-img">
															<i class="fa fa-bank"></i>
															<b-form-input type="text" class="form-control" id="satker" v-model="user.satker" placeholder="Tempat Bekerja" readonly />
														</div>
													</div>
												 </div>											
											</div>
											<div class="form-group">
											    <label class="col-form-label">:: Ceritakan Sedikit Tentang Diri Anda ::</label>
												<div class="pass-group group-img">
													<textarea rows="4" v-model="user.bio" id="user.bio" name="user.bio" class="form-control">{{user.bio}}</textarea>												
												</div>
											</div>
											<div class="row socialmedia-info">
											     <div class="col-lg-6 col-md-6">
												    <div class="form-group">
														<label class="col-form-label">Facebook</label>
														<div class="pass-group group-img">
															<span class="lock-icon"><i class="fab fa-facebook-f"></i></span>
															<b-form-input type="text" id="facebook" v-model="user.facebook" class="form-control" placeholder="https://www.facebook.com/" />												
														</div>
													</div>
												 </div>
												 <div class="col-lg-6 col-md-6">
												    <div class="form-group">
														<label class="col-form-label">Twitter</label>
														<div class="pass-group group-img">
															<span class="lock-icon"><i class="fab fa-twitter"></i></span>
															<b-form-input type="text" id="twitter" v-model="user.twitter" class="form-control" placeholder="https://twitter.com/" />												
														</div>
													</div>
												 </div>											
											</div>
											<div class="row socialmedia-info">
											     <div class="col-lg-6 col-md-6">
												    <div class="form-group formlast-input">
														<label class="col-form-label">LinkedIn</label>
														<div class="pass-group group-img">
															<span class="lock-icon"><i class="fab fa-linkedin" aria-hidden="true"></i></span>
															<b-form-input type="text" id="linkedin" v-model="user.linkedin" class="form-control" placeholder="https://www.linkedin.com/" />												
														</div>
													</div>
												 </div>
												 <div class="col-lg-6 col-md-6">
												    <div class="form-group formlast-input">
														<label class="col-form-label">Instagram</label>
														<div class="pass-group group-img">
															<span class="lock-icon"><i class="fab fa-instagram"></i></span>
															<b-form-input type="text" id="instagram" v-model="user.instagram" class="form-control" placeholder="https://www.instagram.com/" />												
														</div>
													</div>
												 </div>											
											</div>	
								    </div>
									<br>
									<div class="text-center">
									<b-button variant="primary" type="submit" :disabled="loadingpf"> 
										<span v-if="!loadingpf"><i class="fa fa-address-card" aria-hidden="true"></i>&nbsp; Update Profil</span>
										<span v-else><i class="fa fa-spinner fa-spin"></i>&nbsp; Ke Dukcapil Dulu Gan...</span>
									</b-button>
									</div>
								</div>
							</b-form>								
							</div>	
						</div>
                        <div class="col-lg-3">
						    <div class="profile-sidebar">
							    <div class="card">
								    <div class="card-header">
									    <h4>Ganti Password</h4>
									</div>	
                                    <div class="card-body">
                                       <b-form ref="passform" @submit.prevent="updatePassword">
                                            <div class="form-group">
											    <label class="col-form-label">Password Lama</label>
										        <div class="pass-group group-img">
													<span class="lock-icon"><i class="feather-lock"></i></span>
													<b-form-input type="password" id="oldpw" v-model="oldpw" class="form-control pass-input" placeholder="Password" required/>													
												</div>
										    </div>
                                            <div class="form-group">
											    <label class="col-form-label">Password Baru</label>
										        <div class="pass-group group-img">
													<span class="lock-icon"><i class="feather-lock"></i></span>
													<b-form-input
														v-if="showPassword"
														type="text"
														class="form-control pass-input"
														v-model="password"
														placeholder=".............."
														required
													/>
													<b-form-input v-else type="password"
														class="form-control pass-input"
														placeholder=".............." v-model="password" required/>
													<span
														class="toggle-password"
														@click="toggleShow"
														:class="{
														'feather-eye': showPassword,
														'feather-eye-off': !showPassword,
														}"
													></span>
												</div>
										    </div>
                                            <div class="form-group">
											    <label class="col-form-label">Konfirmasi Password Baru</label>
										        <div class="pass-group group-img">
													<span class="lock-icon"><i class="feather-lock"></i></span>
													<b-form-input
														v-if="showPassword2"
														type="text"
														class="form-control pass-input"
														v-model="password2"
														placeholder=".............."
														required
													/>
													<b-form-input v-else type="password"
														class="form-control pass-input"
														placeholder=".............." v-model="password2" required/>
													<span
														class="toggle-password"
														@click="toggleShow1"
														:class="{
														'feather-eye': showPassword2,
														'feather-eye-off': !showPassword2,
														}"
													></span>
												</div>
										    </div>	
                                            <b-button variant="primary" type="submit" :disabled="loadingpw"> 
												<span v-if="!loadingpw"><i class="fa fa-lock" aria-hidden="true"></i> &nbsp; Ganti Password</span>
												<span v-else><i class="fa fa-spinner fa-spin"></i>&nbsp; Ganti Kuncinya dulu...</span>
											</b-button>											
									   </b-form>								
									</div>  									
								</div>							
							</div>
						</div>							
					 </div>				
				</div>
			</div>		
		</div>		
		<!-- /Profile Content -->
</template>

<script>
const image = import(`@/assets/img/profile-img.jpg`)
	export default {
		 data() {
		const user = JSON.parse(localStorage.getItem('user'))
		const pp = import.meta.env.VITE_APP_ST_URL+'/'+user.noid+'/'+user.pp

		 return {
			loadingpp: false,
			loadingpf: false,
			loadingpw: false,
			user: user,
		 	title: "Profile",
		 	title1: "User Profile",
			showPassword: false,
		 	password: null,
			title01: "Profile",
		 	title2: "User Profile",
			showPassword2: false,
		 	password2: null,
			 imageUrl: pp || image
		};
	},
	computed: {
		buttonLabel() {
			return this.showPassword ? "Hide" : "Show";
		},
		buttonLabel1() {
			return this.showPassword2 ? "Hide" : "Show";
		},
	},
	methods: {
		toggleShow() {
		 	this.showPassword = !this.showPassword;
		},
		toggleShow1() {
		 	this.showPassword2 = !this.showPassword2;
		},
		onFileSelected(event) {
		const file = event.target.files[0]
		const reader = new FileReader()

		reader.onload = (event) => {
			this.imageUrl = event.target.result
			this.imageName = file.name
			this.uploadPP();
		}

		reader.readAsDataURL(file)
		},
		async uploadPP() {
			try{
				this.loadingpp = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePP',{
					filex: this.imageUrl
				}, {headers})
				let user = JSON.parse(localStorage.getItem('user'));
				user.pp = response.data.statuspp;
				localStorage.setItem('user', JSON.stringify(user));
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpp = false
			}
		},

		async updateProfil() {
			try{
				this.loadingpf = true
				const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/saveProfil',{
					nama: this.user.name,
					telp: this.user.telp,
					email: this.user.email,
					pekerjaan: this.user.pekerjaan,
					bio: this.user.bio,
					facebook: this.user.facebook,
					twitter: this.user.twitter,
					linkedin: this.user.linkedin,
					instagram: this.user.instagram,
				}, {headers})
				
				if(response.data.success == true){
					let user = JSON.parse(localStorage.getItem('user'));
					user.name = this.user.name;
					user.telp= this.user.telp;
					user.email= this.user.email;
					user.pekerjaan= this.user.pekerjaan;
					user.bio= this.user.bio;
					user.facebook= this.user.facebook;
					user.twitter= this.user.twitter;
					user.linkedin= this.user.linkedin;
					user.instagram= this.user.instagram;
					localStorage.setItem('user', JSON.stringify(user));
					
					this.$toast.fire({
					title: response.data.message,
					icon: 'success',
				})
				}
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loadingpf = false
			}
		},
		async updatePassword() {
			if(this.password != this.password2){
				this.$toast.fire({
					title: 'Konfirmasi Password Baru Tidak Sama',
					icon: 'error',
				})
				this.$refs.passform.$el.reset();
			}else{
				try{
					this.loadingpw = true
					
					const headers = {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${localStorage.getItem('token')}`
								};

					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updatePassword',{
						oldpw: this.oldpw,
						password: this.password,
					}, {headers})
					
					if(response.data.success == true){
						
						this.$toast.fire({
						title: response.data.message,
						icon: 'success',
						})
						this.$refs.passform.$el.reset();
					}else{
						this.$toast.fire({
						title: response.data.message,
						icon: 'error',
						})
						this.$refs.passform.$el.reset();
					}
					
				} catch (error) {
					this.$toast.fire({
						title: error,
						icon: 'error',
					})
					this.$refs.passform.$el.reset();
				} finally {
					this.loadingpw = false
				}
			}
		}
	},
};
</script>
	