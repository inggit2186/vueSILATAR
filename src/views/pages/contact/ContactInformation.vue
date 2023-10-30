<template>
    <!--contact Information-->	
    <div class="contactus-info">
			<div class="container">
				<div class="row">
					<div class="col-lg-6 contactus-img col-md-12">
						<div class="contactleft-info">
							<img :src="$assets+'/img/contactleftimg.jpg'" class="img-fluid" alt="">
							<div class="contactinfo-content">
								<div class="contact-hours">
									 <h6>Hours</h6>
									 <ul>
										 <li>Senin - Kamis : 7.30 - 16.00 WIB</li>
										 <li>Jum'at: 7.30 - 16.30 WIB</li>								 
										 <li>Sabtu dan Minggu Tutup</li>								 
									 </ul>
								</div>
								<div class="contact-hours">
									 <h6>Kontak Kami</h6>
									 <ul>
										 <li>Jl. Lintas Sumatera No.90, Baringin, Kec. Lima Kaum, <br/>Kabupaten Tanah Datar, Sumatera Barat</li>
										 <li>Tel : (0752) 71033</li>								 
										 <li> Email : tanahdtr@kemenag.go.id</li>								 
									 </ul>
								</div>						
							</div>
						</div>
					</div>
					<div class="col-lg-6 contactright-map col-md-12">
						 <div class="google-maps">
							<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d305.22407504570896!2d100.60530980424039!3d-0.4724321219763147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd52d24fea3619f%3A0x7881a37841f724a3!2sKantor%20Kementerian%20Agama%20Kab.Tanah%20Datar!5e0!3m2!1sen!2sid!4v1698636008377!5m2!1sen!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
						 </div>
					</div>				
				</div>		
			</div>		
		</div>		
		<!--/contact Information-->	
		
		<!--contact Form-->	
        <section class="contactusform-section">
		       <div class="container">	
                    <div class="contact-info">
					   <h2>Kontak <span>Kami</span></h2> 
					   <p>Kita akan Tindak Lanjuti Secepat Mungkin :D</p>
				   </div>		       
                   <div class="row align-items-center">
				        <div class="col-lg-5 col-md-5">
						    <div class="contactform-img">
							     <img :src="$assets+'/img/contactform-img.svg'" class="img-fluid"  alt="">
							</div>
						</div>
						<div class="col-lg-7 col-md-7">
						    
							<div class="contactus-form">
							    <b-form v-if="kategori == 'guest'" ref="formx" class="" @submit.prevent="addPengaduan">
									<b-form-input type="text" id="kategori" name="kategori" v-model="kategori" hidden />
									<div class="form-group">
									   <b-form-input type="text" id="nama" v-model="nama" class="form-control" placeholder="Name*" required />
									</div>
									<div class="form-group me-0">
									   <b-form-input type="email" id="email" v-model="email" class="form-control" placeholder="Email*" required />
									</div>
									<div class="form-group me-0">
									   <b-form-input type="text" id = "telp" v-model="telp" class="form-control" placeholder="Nomor Kontak*" required />
									</div>
									<div class="form-group">
										<b-form-input type="text" id="judul" v-model="judul" class="form-control" placeholder="Subject/Judul" />
									</div>
									<div class="form-group">
       									<textarea rows="4" id="deskripsi" v-model="deskripsi" class="form-control" placeholder="Tulis Keterangan / Pesan*" required></textarea>
									</div>
									<div class="submit-section">
										<b-button variant="primary submit-btn" type="submit" :disabled="loading">
											<span v-if="!loading"> Submit</span> 
											<span v-else><i-svg-spinners-bars-scale-middle /> Berangkattt....</span> 
										</b-button>
									</div>
								</b-form>
								<b-form v-else class="" @submit.prevent="addPengaduan">
										<b-form-input type="text" id="kategori" value="user" hidden /> 
									<div class="form-group">
									   <b-form-input type="text" id="name" v-model="user.name" class="form-control" placeholder="Name*" readonly />
									</div>
									<div class="form-group">
									   <b-form-input type="email" id="email" v-model="user.email" class="form-control" placeholder="Name*" readonly />
									</div>
									<div ref="formx" class="form-group">
										<b-form-input type="text" id="judul" v-model="judul" class="form-control" placeholder="Subject/Judul" />
									</div>
									<div ref="formx" class="form-group">
       									<textarea rows="4" class="form-control" id="deskripsi" v-model="deskripsi" placeholder="Tulis Keterangan / Pesan*" required></textarea>
									</div>
									<div class="submit-section">
										<b-button variant="primary submit-btn" type="submit" :disabled="loading">
											<span v-if="!loading"> Submit</span> 
											<span v-else><i-svg-spinners-bars-scale-middle /> Berangkattt....</span> 
										</b-button>
									</div>
								</b-form>

								
							</div>
						</div>
				   </div>				   
			   </div>		
		</section>		
		<!--/contact Form-->	
</template>

<script>
export default {
	data() {
		const user = JSON.parse(localStorage.getItem('user'))
		let kategori = null

		if(!user || user.id == null){
			kategori = "guest"
		}else{
			kategori = "user"
		}
		return {
			user: user,
			loading: false,
			kategori: kategori,
			nama: null,
			email: null,
			telp: null,
			judul: null,
			deskripsi: null
		}
	},
	methods: {
		async addPengaduan(){
			this.loading = true
			if(this.kategori == 'guest'){
				console.log('guest')
				try {
					const headers = {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${localStorage.getItem('token')}`
								};
					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/guestPengaduan',{
						kategori: 'GUEST',
						nama: this.nama,
						email: this.email,
						telp: this.telp,
						judul: this.judul,
						deskripsi: this.deskripsi,
					}, {headers})

					if(response.data.success == true){
						this.$swal.fire({
							title: '<strong><u>Sukses</u></strong>',
							icon: 'success',
							html:
								'Pengaduan / Permintaan Support Anda telah dikirim <br/><br/>' +
								'Nomor Tiket : <b>'+response.data.kode+'<br/>' +
								'<span style="font-size:12px">Mohon Dicatat nomor tiket Anda</span>',
							showCloseButton: true,
							showCancelButton: false,
							confirmButtonText:
								'<i class="fa fa-thumbs-up"></i> Mantap!',
						})
					this.judul = null
					this.deskripsi = null
					}
				} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
				} finally {
					this.loading = false
				}
			}else{
				console.log(this.kategori)

				try {
					const headers = {
									'Content-Type': 'application/json',
									'Authorization': `Bearer ${localStorage.getItem('token')}`
								};
					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/savePengaduan',{
						kategori: 'SUPPORT',
						judul: this.judul,
						deskripsi: this.deskripsi,
					}, {headers})

					if(response.data.success == true){
						this.$swal.fire({
							title: '<strong><u>Sukses</u></strong>',
							icon: 'success',
							html:
								'Pengaduan / Permintaan Support Anda telah dikirim <br/><br/>' +
								'Nomor Tiket : <b>'+response.data.kode+'<br/>' +
								'<span style="font-size:12px">Mohon Dicatat nomor tiket Anda</span>',
							showCloseButton: true,
							showCancelButton: false,
							confirmButtonText:
								'<i class="fa fa-thumbs-up"></i> Mantap!',
						})
					this.judul = null
					this.deskripsi = null
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
}
</script>