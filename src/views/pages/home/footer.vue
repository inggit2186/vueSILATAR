<template>
	<footer class="section-blk footer-blk footer-three home-footer-section">
		<div class="container">
			<div class="home-footer-shell">
				<div class="home-footer-top">
					<div class="home-footer-brand">
						<div class="home-footer-badge">Kankemenag Tanah Datar</div>
						<h3>Layanan yang berwibawa dalam nuansa Rumah Gadang.</h3>
						<p>
							Portal ini dirancang agar identitas Kemenag tetap tegas, namun tampil lebih hangat, tertata, dan selaras dengan budaya Sumatera Barat.
						</p>
					</div>

					<div class="home-footer-contact">
						<a href="tel:(0752)71033" class="home-footer-chip">Customer Care (0752) 71033</a>
						<a href="mailto:tanahdtr@kemenag.go.id" class="home-footer-chip">tanahdtr@kemenag.go.id</a>
					</div>

					<div class="social-info home-footer-social">
						<ul class="d-flex">
							<li>
								<a href="https://www.facebook.com/kemenagtanahdatar.kemenagtd.5" target="_blank" rel="noopener"><i class="fab fa-facebook-f"></i></a>
							</li>
							<li>
								<a href="https://twitter.com/KemenagTD" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a>
							</li>
							<li>
								<a href="https://www.instagram.com/kemenag_tanahdatar/" target="_blank" rel="noopener"><i class="fab fa-instagram"></i></a>
							</li>
							<li>
								<a href="https://id.linkedin.com/in/ridho-saputra-a325a825a" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
							</li>
						</ul>
					</div>
				</div>

				<div class="home-footer-grid">
					<div class="home-footer-card home-footer-links-card">
						<h5>Tentang Kami</h5>
						<ul>
							<li>
								<a href="https://tanahdatar.kemenag.go.id" target="_blank" rel="noopener">Website Resmi</a>
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

					<div class="home-footer-card home-footer-links-card">
						<h5>Tautan Cepat</h5>
						<ul>
							<li>
								<a href="https://kemenag.go.id/" target="_blank" rel="noopener">Kementerian Agama RI</a>
							</li>
							<li>
								<a href="https://www.bkn.go.id/" target="_blank" rel="noopener">Badan Kepegawaian Negara</a>
							</li>
							<li>
								<a href="https://sumbar.kemenag.go.id/" target="_blank" rel="noopener">Kanwil Kemenag Sumbar</a>
							</li>
							<li>
								<a href="https://haji.kemenag.go.id/petugas" target="_blank" rel="noopener">Petugas Haji</a>
							</li>
							<li>
								<a href="https://www.tanahdatar.go.id/" target="_blank" rel="noopener">Pemda Tanah Datar</a>
							</li>
						</ul>
					</div>

					<div class="home-footer-card home-footer-links-card">
						<h5>Layanan</h5>
						<ul>
							<li><router-link to="/Pelayanan/4">Subbagian Tata Usaha</router-link></li>
							<li><router-link to="/Pelayanan/8">Seksi BIMAS</router-link></li>
							<li><router-link to="/Pelayanan/5">Seksi PAIS</router-link></li>
							<li><router-link to="/Pelayanan/6">Seksi PD PONTREN</router-link></li>
							<li><router-link to="/Pelayanan/7">Seksi PENMAD</router-link></li>
							<li><router-link to="/Pelayanan/9">Seksi PHU</router-link></li>
						</ul>
					</div>

					<div class="home-footer-card home-footer-gallery-card">
						<div class="home-footer-gallery-head">
							<h5>Galeri</h5>
							<p>Cuplikan dokumentasi kegiatan dan aktivitas pelayanan.</p>
						</div>
						<ul class="gallery-blk d-flex align-items-center">
							<li v-for="(src, index) in imgs" :key="index" @click="() => showImg(index)">
								<img :src="$asset(`gallery/${src.src}`)" alt="">
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

				<div class="btm-foo-widget home-footer-bottom">
					<div class="copy-info">
						<p class="mb-0">Copyright © {{ new Date().getFullYear() }} Ridho Saputra @ Kankemenag Tanah Datar. All rights reserved.</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	data() {
		return {
			visible: false,
			index: 0,
			imgs: [
				{ src: "galleryimg-1.jpg" },
				{ src: "galleryimg-2.jpg" },
				{ src: "galleryimg-9.jpg" },
				{ src: "galleryimg-10.jpg" }
			],
			img: [
				{ src: "https://picsum.photos/785/501" },
				{ src: "https://picsum.photos/785/502" },
				{ src: "https://picsum.photos/785/503" },
				{ src: "https://picsum.photos/785/504" }
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
