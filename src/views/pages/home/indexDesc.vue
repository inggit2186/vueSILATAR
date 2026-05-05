<template>
	<section class="home-story-section">
		<div class="container">
			<div class="home-story-shell">
				<div class="home-story-grid">
					<div class="home-story-visual">
						<div class="home-story-visual-card">
							<img :src="successImg" class="img-fluid" alt="Maklumat pelayanan">
						</div>
						<div class="home-story-visual-chip">
							<span class="home-story-visual-label">Komitmen pelayanan</span>
							<strong>Nilai adat dijaga, layanan dibuat ringkas dan jelas.</strong>
						</div>
					</div>

					<div class="home-story-copy">
						<div class="section-heading-two text-start">
							<p>Tanah Datar, Luhak Nan Tuo</p>
							<h2>Maklumat Pelayanan</h2>
							<img :src="titleImg" class="img-fluid home-section-title-img" alt="title-img">
						</div>

						<div class="home-story-card">
							<div class="home-story-card-head">
								<div class="home-story-icon">
									<i-mingcute-announcement-line />
								</div>
								<div>
									<h5>Kami seluruh aparatur Kantor Kementerian Agama Kabupaten Tanah Datar berkomitmen untuk:</h5>
									<p>Memberikan pelayanan dengan standar yang jelas, tampilan yang ringan, serta pengalaman yang lebih tertata dan mudah dipahami.</p>
								</div>
							</div>

							<div class="home-story-list">
								<div class="home-story-list-item">
									<span class="home-story-list-number">1</span>
									<div>
										<h6>Menyelenggarakan pelayanan sesuai standar yang telah ditetapkan.</h6>
									</div>
								</div>
								<div class="home-story-list-item">
									<span class="home-story-list-number">2</span>
									<div>
										<h6>Memberikan pelayanan secara tertib, transparan, dan bertanggung jawab.</h6>
									</div>
								</div>
								<div class="home-story-list-item">
									<span class="home-story-list-number">3</span>
									<div>
										<h6>Melakukan perbaikan berkelanjutan demi kualitas layanan yang lebih baik.</h6>
									</div>
								</div>
								<div class="home-story-list-item">
									<span class="home-story-list-number">4</span>
									<div>
										<h6>Bersedia menerima sanksi sesuai ketentuan apabila pelayanan tidak sesuai standar.</h6>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<section class="home-testimonial-section">
		<div class="container">
			<div class="home-testimonial-shell">
				<div class="section-heading-two text-center">
					<p>Suara masyarakat</p>
					<h2>Testimoni Pelayanan</h2>
					<img :src="titleImg" class="img-fluid home-section-title-img" alt="title-img">
				</div>

				<div class="home-testimonial-topline">
					<div class="home-testimonial-badge">
						<span>Putaran otomatis</span>
						<strong>{{ total }} ulasan</strong>
					</div>
					<p>Ulasan disajikan ringkas dan tetap bergerak otomatis agar nyaman dibaca tanpa memperpanjang halaman.</p>
				</div>

				<div class="owl-carousel feedback-slider">
					<Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
						<Slide v-for="item in testimonialItems" :key="item.id">
							<div class="home-testimonial-card">
								<div class="home-testimonial-rating">
									<span v-for="star in item.rating" :key="star" class="home-rating-star">
										<i-openmoji-star />
									</span>
								</div>

								<p class="home-testimonial-quote">
									{{ item.keterangan }}
								</p>

								<div class="home-testimonial-user">
									<img :src="defaultAvatar" class="img-fluid" alt="Post Image">
									<div>
										<h6>{{ item.nama }}</h6>
										<span>Pengguna layanan</span>
									</div>
								</div>
							</div>
						</Slide>

						<template #addons>
							<Navigation />
						</template>
					</Carousel>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import testimonialFallback from '../../../assets/json/indexTwoFeedback.json';
import successImg from '../../../assets/img/success-img.png';
import titleImg from '../../../assets/img/title-img.png';
import defaultAvatar from '../../../assets/img/defaultpp.png';

export default {
	components: {
		Carousel,
		Slide,
		Navigation,
	},
	data() {
		return {
			testimonialItems: testimonialFallback.map((item, index) => ({
				id: item.id || index + 1,
				keterangan: item.content,
				nama: item.name,
				rating: 5,
			})),
			total: null,
			successImg,
			titleImg,
			defaultAvatar,
			settings: {
				itemsToShow: 1,
				snapAlign: "center"
			},
			breakpoints: {
				575: {
					itemsToShow: 1,
					snapAlign: "center"
				},
				767: {
					itemsToShow: 2,
					snapAlign: "center"
				},
				991: {
					itemsToShow: 3,
					snapAlign: "center"
				},
				1024: {
					itemsToShow: 3,
					snapAlign: "start"
				}
			},
		}
	},
	created() {
		this.total = this.testimonialItems.length;
		this.getRating();
		window.scrollTo(0, 0);
	},
	methods: {
		async getRating() {
			this.loading = true;
			try {
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL + '/getRating');

				if (response.data.success === true) {
					if (Array.isArray(response.data.data) && response.data.data.length) {
						this.testimonialItems = response.data.data.map((item, index) => ({
							id: item.id || index + 1,
							keterangan: item.keterangan || item.content || '-',
							nama: item.nama || item.name || 'Pengguna layanan',
							rating: Math.max(1, Math.min(5, Number(item.rating) || 5)),
						}));
					}
					this.total = response.data.total || this.testimonialItems.length;

					if (response.data.iklan !== 'NONE' && !localStorage.getItem('token')) {
						const isMobile = window.innerWidth < 768;
						const showConfirmButton = response.data.iklan.layanan == 1;
						this.$swal.fire({
							html: `
								<a href="${response.data.iklan.url}" target="_blank" rel="noopener">
									<img src="${response.data.iklan.img}" width="${isMobile ? '390' : '520'}" height="${isMobile ? '390' : '520'}" alt="Iklan"></img>
								</a>
							`,
							padding: "0",
							width: isMobile ? '90%' : '580px',
							height: isMobile ? 'auto' : '520px',
							imageAlt: "Pengumuman",
							showConfirmButton: showConfirmButton ? true : false,
							confirmButtonText: showConfirmButton ? 'Kunjungi Layanan' : undefined,
							showCloseButton: true,
						}).then((result) => {
							if (result.isConfirmed) {
								this.$router.push('/usaha');
							}
						});
					}
				} else {
					this.total = this.testimonialItems.length;
				}
			} catch (error) {
				this.total = this.testimonialItems.length;
			} finally {
				this.loading = false;
			}
		}
	}
}
</script>
