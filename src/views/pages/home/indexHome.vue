<template>
    <!-- Home Banner -->
		<section class="banner-section banner-three home-hero-section">
			<div class="home-hero-orb home-hero-orb-a"></div>
			<div class="home-hero-orb home-hero-orb-b"></div>
			<div class="container">
				<div class="home-hero-shell">
					<div class="home-gonjong-accent" aria-hidden="true"></div>
					<div class="home-hero-grid">
						<div class="home-hero-copy">
							<div class="home-eyebrow">
								<span class="home-eyebrow-pill">Layanan Aplikasi Digital</span>
								<span class="home-eyebrow-text">Portal layanan digital Kantor Kementerian Agama Kab. Tanah Datar</span>
							</div>
							<h1 class="home-title">
								<span class="home-title-top">SILATAR</span>
								<span class="home-title-bottom">Sistem Informasi Layanan dan Administrasi Kankemenag Kab. Tanah Datar.</span>
							</h1>
							<p class="home-lead">
								Menghadirkan informasi, layanan, dan administrasi internal dalam satu pintu dengan tampilan yang tenang, hangat, dan bernuansa adat.
							</p>
							<div class="home-pill-row">
								<span class="home-pill">Adat basandi syarak</span>
								<span class="home-pill">Layanan satker</span>
								<span class="home-pill">Pembaruan berkala</span>
							</div>
							<div class="home-stat-grid">
								<div class="home-stat-card">
									<strong>Tertata</strong>
									<span>Informasi tersaji lebih fokus dan mudah ditelusuri</span>
								</div>
								<div class="home-stat-card">
									<strong>Visual</strong>
									<span>Galeri foto tetap menjadi wajah utama layanan</span>
								</div>
								<div class="home-stat-card">
									<strong>Responsif</strong>
									<span>Nyaman digunakan di desktop maupun ponsel</span>
								</div>
							</div>
						</div>
						<div class="home-hero-visual">
							<div class="home-visual-frame">
								<div class="ban-image-01 home-visual-clouds">
									<img :src="cloud01" alt="" class="cloud-one">
									<img :src="cloud02" alt="" class="cloud-two">
								</div>
								<div class="ban-image-02">
									<transition name="fade" mode="out-in">
									<img
										:key="currentIndex"
										:src="imgz"
										class="home-slideshow-image"
										:style="{ objectPosition: bannerPositions[currentIndex] || 'center top' }"
										alt="opener"
									>
									</transition>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="home-showcase-section">
			<div class="container">
				<div class="home-showcase-shell">
					<div class="home-showcase-heading">
						<span class="home-showcase-kicker">Warisan visual</span>
						<h2 class="home-showcase-title">Poster layanan bernuansa Rumah Gadang dan budaya kerja Minangkabau</h2>
						<p class="home-showcase-lead">
							Tiga visual ini ditata lebih tegas agar identitas Sumatera Barat terasa jelas, dengan gaya yang lebih dekat pada suasana adat dan penghormatan.
						</p>
					</div>
					<div class="home-showcase-grid">
						<div class="home-showcase-card home-showcase-card-wide">
							<img :src="bannerBottomImg" alt="Banner informasi utama" class="home-showcase-image home-showcase-image-cover">
							<div class="home-showcase-caption">
								<strong>Banner utama</strong>
								<span>Ringkasan layanan dan identitas SILATAR</span>
							</div>
						</div>
						<div class="home-showcase-stack">
							<div class="home-showcase-card">
								<img :src="grafitikasiImg" alt="Flyer no gratifikasi" class="home-showcase-image home-showcase-image-contain">
								<div class="home-showcase-caption">
									<strong>No Gratifikasi</strong>
									<span>Pengingat integritas layanan publik</span>
								</div>
							</div>
							<div class="home-showcase-card">
								<img :src="fiveBkImg" alt="5 budaya kerja Kemenag" class="home-showcase-image home-showcase-image-contain">
								<div class="home-showcase-caption">
									<strong>5 Budaya Kerja</strong>
									<span>Nilai kerja yang menjadi ruh pelayanan</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- /Home Banner -->	
</template>

<script>
import cloud01 from '../../../assets/img/bg/cloud-01.png'
import cloud02 from '../../../assets/img/bg/cloud-02.png'
import bannerBottomImg from '../../../assets/img/banner-btm-img.png'
import grafitikasiImg from '../../../assets/img/grafitikasi.png'
import fiveBkImg from '../../../assets/img/5bk.png'
import banner02 from '../../../assets/img/bg/banner-02.png'
import banner03 from '../../../assets/img/bg/banner-03.png'
import banner04 from '../../../assets/img/bg/banner-04.png'
import banner05 from '../../../assets/img/bg/banner-05.png'
import banner06 from '../../../assets/img/bg/banner-06.png'
import banner07 from '../../../assets/img/bg/banner-07.png'
import banner08 from '../../../assets/img/bg/banner-08.png'

export default {
	data() {
		return {

			imgz: null,
			bannerKeys: ['banner-02', 'banner-03', 'banner-04', 'banner-05', 'banner-06', 'banner-07', 'banner-08'],
			bannerPositions: [
				'center 4%',
				'center 4%',
				'center 4%',
				'center 4%',
				'center 4%',
				'center 4%',
				'center 4%',
			],
			cloud01,
			cloud02,
			bannerBottomImg,
			grafitikasiImg,
			fiveBkImg,
			banners: {
				'banner-02': banner02,
				'banner-03': banner03,
				'banner-04': banner04,
				'banner-05': banner05,
				'banner-06': banner06,
				'banner-07': banner07,
				'banner-08': banner08,
			},
			currentIndex: 0,
			intervalId: null,
			kode: null,
		}
	},
	created(){
		this.startSlideshow();
		window.scrollTo(0,0)
	},
	beforeUnmount() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	},
	methods:{
		startSlideshow() {
			this.kode = Math.random().toString(36).slice(2);
			this.updateImage();
			this.intervalId = setInterval(() => {
				this.currentIndex = (this.currentIndex + 1) % this.bannerKeys.length;
				this.updateImage();
			}, 7000);
		},
		updateImage() {
			const imgx = this.banners[this.bannerKeys[this.currentIndex]];
			this.imgz = imgx + '?t=' + this.kode;
		}
	}
}
</script>

<style scoped>
.home-hero-section {
	position: relative;
	overflow: hidden;
	padding: 68px 0 44px;
	background:
		radial-gradient(circle at top left, rgba(215, 167, 58, 0.16), transparent 28%),
		radial-gradient(circle at right 20%, rgba(159, 26, 38, 0.22), transparent 24%),
		linear-gradient(135deg, #090707 0%, #1d1114 48%, #45111a 100%);
}

.home-hero-section::before {
	content: "";
	position: absolute;
	inset: 0;
	background-image:
		linear-gradient(rgba(215, 167, 58, 0.06) 1px, transparent 1px),
		linear-gradient(90deg, rgba(215, 167, 58, 0.06) 1px, transparent 1px),
		repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.018) 0 2px, transparent 2px 14px);
	background-size: 42px 42px;
	mask-image: linear-gradient(to bottom, rgba(0,0,0,0.72), transparent 88%);
	pointer-events: none;
}

.home-hero-orb {
	position: absolute;
	border-radius: 50%;
	filter: blur(8px);
	opacity: 0.7;
	pointer-events: none;
}

.home-hero-orb-a {
	width: 240px;
	height: 240px;
	left: -70px;
	top: 90px;
	background: radial-gradient(circle, rgba(215, 167, 58, 0.28), rgba(215, 167, 58, 0));
}

.home-hero-orb-b {
	width: 300px;
	height: 300px;
	right: -110px;
	bottom: 40px;
	background: radial-gradient(circle, rgba(159, 26, 38, 0.26), rgba(159, 26, 38, 0));
}

.home-hero-shell {
	position: relative;
	z-index: 1;
	padding: 22px;
	border: 1px solid rgba(215, 167, 58, 0.3);
	border-radius: 22px;
	background:
		linear-gradient(180deg, rgba(255, 247, 232, 0.03), rgba(255, 255, 255, 0.01)),
		radial-gradient(circle at top left, rgba(215, 167, 58, 0.12), transparent 28%),
		linear-gradient(180deg, rgba(18, 10, 11, 0.9), rgba(43, 14, 19, 0.92));
	backdrop-filter: blur(12px);
	box-shadow: 0 24px 60px rgba(0, 0, 0, 0.42);
}

.home-hero-shell::before {
	content: "";
	position: absolute;
	inset: 10px 10px auto 10px;
	height: 42px;
	border-radius: 16px 16px 0 0;
	background:
		repeating-linear-gradient(135deg, rgba(246, 212, 122, 0.08) 0 8px, transparent 8px 22px),
		repeating-linear-gradient(45deg, rgba(169, 29, 42, 0.12) 0 6px, transparent 6px 18px);
	opacity: 0.45;
	pointer-events: none;
}

.home-gonjong-accent {
	position: absolute;
	left: 32px;
	right: 32px;
	top: -1px;
	height: 26px;
	background:
		linear-gradient(90deg, #f6d47a 0%, #d0a03c 46%, #a91d2a 100%);
	clip-path: polygon(0 100%, 4% 36%, 8% 100%, 12% 16%, 16% 100%, 20% 28%, 24% 100%, 28% 12%, 32% 100%, 36% 22%, 40% 100%, 44% 16%, 48% 100%, 52% 28%, 56% 100%, 60% 12%, 64% 100%, 68% 22%, 72% 100%, 76% 16%, 80% 100%, 84% 28%, 88% 100%, 92% 16%, 96% 100%, 100% 36%, 100% 100%);
	opacity: 1;
	pointer-events: none;
}

.home-hero-grid {
	display: grid;
	grid-template-columns: 0.92fr 1.18fr;
	gap: 18px;
	align-items: center;
	padding-top: 10px;
}

.home-hero-copy {
	color: #f6f8ff;
	padding: 12px 12px 12px 14px;
}

.home-eyebrow {
	display: inline-flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
	padding: 9px 14px;
	border: 1px solid rgba(215, 167, 58, 0.34);
	border-radius: 999px;
	background: linear-gradient(180deg, rgba(255, 247, 232, 0.05), rgba(255, 255, 255, 0.02));
	margin-bottom: 18px;
}

.home-eyebrow-pill {
	font-size: 12px;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: #190d10;
	background: linear-gradient(135deg, #f9d36f 0%, #cf9d37 100%);
	padding: 7px 12px;
	border-radius: 999px;
}

.home-eyebrow-text {
	font-size: 14px;
	opacity: 0.9;
}

.home-title {
	margin: 0;
	display: grid;
	gap: 6px;
}

.home-title-top {
	font-size: clamp(3.05rem, 6.2vw, 5.35rem);
	line-height: 0.95;
	font-weight: 900;
	letter-spacing: 0.01em;
	text-transform: uppercase;
	color: #f6d47a;
	text-shadow: 0 10px 28px rgba(0, 0, 0, 0.28);
}

.home-title-bottom {
	max-width: 24ch;
	font-size: clamp(1.18rem, 2.1vw, 1.62rem);
	line-height: 1.2;
	font-weight: 700;
	color: rgba(255, 242, 222, 0.92);
	padding-bottom: 2px;
}

.home-title-bottom::after {
	content: "";
	display: block;
	width: 148px;
	height: 3px;
	margin-top: 12px;
	border-radius: 999px;
	background: linear-gradient(90deg, #f6d47a 0%, rgba(246, 212, 122, 0.08) 100%);
}

.home-lead {
	max-width: 48ch;
	margin: 14px 0 0;
	font-size: 1.03rem;
	line-height: 1.7;
	color: rgba(248, 241, 226, 0.84);
}

.home-pill-row {
	display: flex;
	flex-wrap: wrap;
	gap: 11px;
	margin-top: 18px;
}

.home-pill {
	display: inline-flex;
	align-items: center;
	padding: 10px 14px;
	border-radius: 999px;
	border: 1px solid rgba(215, 167, 58, 0.22);
	background: rgba(255, 248, 235, 0.04);
	color: #fff3d0;
	font-size: 0.95rem;
	font-weight: 600;
}

.home-stat-grid {
	display: grid;
	grid-template-columns: repeat(3, minmax(0, 1fr));
	gap: 13px;
	margin-top: 18px;
}

.home-stat-card {
	padding: 17px 15px;
	border-radius: 20px;
	background:
		linear-gradient(180deg, rgba(255, 247, 232, 0.06), rgba(255, 247, 232, 0.02)),
		linear-gradient(180deg, rgba(24, 11, 13, 0.84), rgba(18, 10, 13, 0.92));
	border: 1px solid rgba(215, 167, 58, 0.18);
	min-height: 112px;
}

.home-stat-card strong {
	display: block;
	font-size: 1.08rem;
	margin-bottom: 8px;
}

.home-stat-card span {
	display: block;
	font-size: 0.95rem;
	line-height: 1.58;
	color: rgba(248, 241, 226, 0.74);
}

.home-hero-visual {
	position: relative;
	min-height: 610px;
	display: flex;
	align-items: center;
	justify-content: center;
}

.home-visual-frame {
	position: relative;
	width: min(100%, 860px);
	min-height: 560px;
	padding: 7px;
	border-radius: 24px;
	background:
		linear-gradient(160deg, rgba(255, 247, 232, 0.05), rgba(255, 247, 232, 0.015)),
		radial-gradient(circle at top, rgba(215, 167, 58, 0.12), transparent 42%),
		linear-gradient(180deg, rgba(18, 10, 12, 0.78), rgba(63, 17, 24, 0.92));
	border: 1px solid rgba(215, 167, 58, 0.26);
	box-shadow: 0 28px 72px rgba(0, 0, 0, 0.46);
	overflow: hidden;
}

.home-visual-frame::after {
	content: "";
	position: absolute;
	inset: 0;
	background:
		linear-gradient(180deg, transparent 55%, rgba(15, 10, 11, 0.5)),
		repeating-linear-gradient(135deg, rgba(215, 167, 58, 0.05) 0 2px, transparent 2px 18px);
	pointer-events: none;
}

.home-visual-clouds {
	position: absolute;
	z-index: 2;
}

.home-visual-clouds {
	inset: 0;
	pointer-events: none;
}

.home-visual-clouds .cloud-one {
	position: absolute;
	left: 3%;
	top: 4%;
	width: 68px;
	opacity: 0.42;
}

.home-visual-clouds .cloud-two {
	position: absolute;
	right: 6%;
	top: 7%;
	width: 66px;
	opacity: 0.4;
}

.ban-image-02 {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	height: clamp(500px, 45vw, 600px);
	padding: 2px 8px 6px;
}

.home-slideshow-image {
	width: auto;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
	display: block;
	margin: 0 auto;
	object-fit: contain;
	object-position: center 3%;
	transform-origin: center top;
	transform: translateY(-14px) scale(0.87);
	filter: drop-shadow(0 24px 44px rgba(0, 0, 0, 0.34));
}

.fade-enter-active {
	transition: opacity 2.5s ease;
}
.fade-leave-active {
	transition: opacity 1.5s ease;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}

.home-showcase-section {
	position: relative;
	padding: 22px 0 18px;
	background:
		radial-gradient(circle at top left, rgba(215, 167, 58, 0.08), transparent 24%),
		radial-gradient(circle at right bottom, rgba(159, 26, 38, 0.1), transparent 26%),
		linear-gradient(135deg, #140b0d 0%, #291116 54%, #471119 100%);
}

.home-showcase-shell {
	padding: 24px;
	border-radius: 28px;
	background:
		linear-gradient(180deg, rgba(255, 247, 232, 0.04), rgba(255, 247, 232, 0.015)),
		linear-gradient(180deg, rgba(17, 9, 10, 0.92), rgba(34, 13, 17, 0.96));
	border: 1px solid rgba(215, 167, 58, 0.24);
	box-shadow: 0 20px 50px rgba(0, 0, 0, 0.36);
	backdrop-filter: blur(10px);
}

.home-showcase-heading {
	max-width: 720px;
	margin-bottom: 20px;
}

.home-showcase-heading::before {
	content: "";
	display: block;
	width: 138px;
	height: 4px;
	margin-bottom: 14px;
	border-radius: 999px;
	background: linear-gradient(90deg, #f7cf68 0%, #9f1a26 100%);
}

.home-showcase-kicker {
	display: inline-flex;
	align-items: center;
	padding: 8px 12px;
	border-radius: 999px;
	background: linear-gradient(135deg, #f6d47a, #c58f2d);
	color: #1a0d10;
	font-size: 12px;
	font-weight: 800;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	margin-bottom: 14px;
}

.home-showcase-title {
	margin: 0;
	font-size: clamp(1.55rem, 2.8vw, 2.2rem);
	line-height: 1.12;
	font-weight: 900;
	color: #fff3d0;
}

.home-showcase-lead {
	margin: 12px 0 0;
	max-width: 62ch;
	font-size: 1rem;
	line-height: 1.7;
	color: rgba(248, 241, 226, 0.82);
}

.home-showcase-grid {
	display: grid;
	grid-template-columns: 1.4fr 0.9fr;
	gap: 18px;
	align-items: stretch;
}

.home-showcase-stack {
	display: grid;
	gap: 18px;
}

.home-showcase-card {
	position: relative;
	overflow: hidden;
	min-height: 260px;
	border-radius: 24px;
	background:
		linear-gradient(180deg, rgba(255, 247, 232, 0.05), rgba(255, 247, 232, 0.02)),
		radial-gradient(circle at top, rgba(215, 167, 58, 0.1), transparent 54%),
		linear-gradient(180deg, rgba(21, 11, 12, 0.94), rgba(41, 14, 18, 0.98));
	border: 1px solid rgba(215, 167, 58, 0.18);
	box-shadow: 0 14px 32px rgba(0, 0, 0, 0.2);
}

.home-showcase-card-wide {
	min-height: 538px;
}

.home-showcase-image {
	width: 100%;
	height: calc(100% - 84px);
	display: block;
	padding: 22px 22px 12px;
}

.home-showcase-image-cover {
	object-fit: cover;
	object-position: center center;
}

.home-showcase-image-contain {
	object-fit: contain;
	object-position: center center;
}

.home-showcase-caption {
	display: grid;
	gap: 4px;
	padding: 0 22px 20px;
}

.home-showcase-caption strong {
	font-size: 1.02rem;
	font-weight: 800;
	color: #fff3d0;
}

.home-showcase-caption span {
	font-size: 0.92rem;
	line-height: 1.5;
	color: rgba(248, 241, 226, 0.74);
}

@media (max-width: 768px) {
	.home-hero-section {
		padding: 42px 0 28px;
	}

	.home-hero-shell {
		padding: 16px;
		border-radius: 22px;
	}

	.home-hero-grid {
		grid-template-columns: 1fr;
		gap: 16px;
	}

	.home-hero-copy {
		padding: 8px 2px 0;
	}

	.home-title-bottom {
		max-width: none;
	}

	.home-stat-grid {
		grid-template-columns: 1fr;
	}

	.home-hero-visual {
		min-height: auto;
	}

	.home-visual-frame {
		width: 100%;
		min-height: 378px;
		padding: 10px;
		border-radius: 22px;
	}

	.home-visual-clouds .cloud-one {
		width: 72px;
	}

	.home-visual-clouds .cloud-two {
		width: 64px;
	}

	.ban-image-02 {
		height: 330px;
		padding: 4px 8px 8px;
	}

	.home-slideshow-image {
		width: auto;
		height: 100%;
		max-height: none;
		max-width: 100%;
		margin: 0 auto;
		object-fit: contain;
		object-position: center 3%;
		transform-origin: center top;
		transform: translateY(-8px) scale(0.92);
	}

	.home-showcase-section {
		padding: 18px 0 0;
	}

	.home-showcase-shell {
		padding: 18px;
		border-radius: 22px;
	}

	.home-showcase-grid {
		grid-template-columns: 1fr;
	}

	.home-showcase-card {
		min-height: 220px;
		border-radius: 20px;
	}

	.home-showcase-card-wide {
		min-height: 320px;
	}

	.home-showcase-image {
		height: calc(100% - 76px);
		padding: 16px 16px 8px;
	}

	.home-showcase-caption {
		padding: 0 16px 16px;
	}
}
</style>
