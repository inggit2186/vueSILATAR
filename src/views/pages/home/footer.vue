<template>
    <!-- Footer Banner -->
		<footer class="section-blk footer-blk footer-three">
			<div class="container">
				<div class="row">
					<div class="col-sm-12">
						<div class="top-foo-widget">
							<div class="help-info">
								<p>Customer Care   (0752) 71033</p>
								<p>Need live support? tanahdtr@kemenag.go.id</p>
							</div>
							<div class="social-info">
								<ul class="d-flex">
									<li>
										<a href="https://www.facebook.com/kemenagtanahdatar.kemenagtd.5" target="_blank"><i class="fab fa-facebook-f"></i> </a>
									</li>
									<li>
										<a href="https://twitter.com/KemenagTD" target="_blank"><i class="fab fa-twitter"></i> </a>
									</li>
									<li>
										<a href="https://www.instagram.com/kemenagtd/" target="_blank"><i class="fab fa-instagram"></i></a>
									</li>
									<li>
										<a href="https://id.linkedin.com/in/ridho-saputra-a325a825a" target="_blank"><i class="fab fa-linkedin-in"></i></a>
									</li>
								</ul>
							</div>
						</div>
						<div class="middle-foo-widget">
							<div class="row sm-row-gap-23">
								<div class="col-md-7">
									<div class="links-blk">
										<div class="row sm-row-gap-23">
											<div class="col-auto col-md-3">
												<div class="col-style">
													<h5>About us</h5>
													<ul>
														<li>
															<a href="https://tanahdatar.kemenag.go.id" target="_blank">Website Resmi</a>
														</li>
														<li>
															<router-link to="/satuanKerja/getSeksi">Satuan Kerja</router-link>
														</li>
														<li>
															<router-link to="/UnitKerja">Layanan Kita</router-link>
														</li>
														<li>
															<router-link to="/contact">Kontak Kami</router-link>
														</li>								
													</ul>
												</div>
											</div>
											<div class="col-auto col-md-3">
												<div class="col-style">
													<h5>Quick links</h5>
													<ul>
														<li>
															<a href="https://kemenag.go.id/" target="_blank">Kementerian Agama RI</a>
														</li>
														<li>
															<a href="https://www.bkn.go.id/" target="_blank">Badan Kepegawaian Negara</a>
														</li>
														<li>
															<a href="https://sumbar.kemenag.go.id/" target="_blank">Kanwil Kemenag Sumbar</a>
														</li>
														<li>
															<a href="https://haji.kemenag.go.id/petugas" target="_blank">Petugas Haji</a>
														</li>
														<li>
															<a href="https://www.tanahdatar.go.id/" target="_blank">Pemda Tanah Datar</a>
														</li>									
													</ul>
												</div>
											</div>
											<div class="col-auto col-md-3">
												<div class="col-style">
													<h5>Services</h5>
													<ul>
														<li><router-link to="/Pelayanan/4">Subbagian Tata Usaha</router-link></li>
														<li><router-link to="/Pelayanan/8">Seksi BIMAS</router-link></li>
														<li><router-link to="/Pelayanan/5">Seksi PAIS</router-link></li>
														<li><router-link to="/Pelayanan/6">Seksi PD PONTREN</router-link></li>
														<li><router-link to="/Pelayanan/7">Seksi PENMAD</router-link></li>
														<li><router-link to="/Pelayanan/9">Seksi PHU</router-link></li>
													</ul>
												</div>
											</div>
											<div class="col-auto col-md-3">
												<div class="col-style">
													<h5>Kankemenag</h5>
													<ul>
														<li>
															<a href="https://tanahdatar.kemenag.go.id" target="_blank">Tanah Datar</a>
														</li>
														<li>
															<a href="https://padang.kemenag.go.id" target="_blank">Padang</a>
														</li>
														<li>
															<a href="https://agam.kemenag.go.id" target="_blank">Agam</a>
														</li>
														<li>
															<a href="https://pariamankota.kemenag.go.id" target="_blank">Kota Pariaman</a>
														</li>
														<li>
															<a href="https://pasaman.kemenag.go.id" target="_blank">Pasaman</a>
														</li>	
													</ul>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-5">
									<div class="drop-blk">
										<h5>Gallery</h5>
										<ul class="gallery-blk d-flex align-items-center">
											<li v-for="(src, index) in imgs" :key="index" @click="() => showImg(index)">
												<img :src="import(`../../../assets/img/gallery/${src.src}`)" alt="">
											</li>
											<vue-easy-lightbox
												:visible="visible"
												:imgs="img"
												:index="index"
												@hide="handleHide"
											></vue-easy-lightbox>
										</ul>	
									</div>
								</div>
							</div>
						</div>
						<div class="btm-foo-widget">
							<div class="copy-info">
								<p class="mb-0">Copyright  © {{ new Date().getFullYear() }} Ridho Saputra@Kankemenag Tanah Datar. All rights are reserved</p>          
							</div>
						</div>
					</div>			
				</div>
			</div>
		</footer>
</template>

<script>
    export default {
        data(){
            return{
                India: ["India", "UK", "Japan"],
                Currency: ["Euro", "USD"],
				visible: false,
				index: 0, // default: 0
				imgs: [
						{
						src: "galleryimg-1.jpg",
						},
						{
						src: "galleryimg-2.jpg",
						},
						{
						src: "galleryimg-9.jpg"
						},
						{
						src: "galleryimg-10.jpg"
						}
					],
					img: [
						{
						src: "https://picsum.photos/785/501",
						},
						{
						src: "https://picsum.photos/785/502",
						},
						{
						src: "https://picsum.photos/785/503",
						},
						{
						src: "https://picsum.photos/785/504",
						}
					],
            };
        },
		methods: {
			showImg(index) {
			this.index = index;
			this.visible = true;
			},
			handleHide() {
			this.visible = false;
		},
    },
}
</script>