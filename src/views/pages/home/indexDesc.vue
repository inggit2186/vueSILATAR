<template>
		<!-- Success Section -->
		<section class="success-section">
		    <div class="container">
			    <div class="row align-items-center">
			        <div class="col-md-5 aos" data-aos="fade-up">
						<div class="success-img">
							<img src="../../../assets/img/success-img.png" class="img-fluid" alt="img">
						</div>	
					</div>	
					<div class="col-md-7 aos" data-aos="fade-up">
						<div class="success-wrap">
							<div class="section-heading-two text-center">
								<p>Aparatus Sipil Negara Kankemenag Kab.Tanah Datar</p>
								<h2>MAKLUMAT PELAYANAN</h2>
								<img src="../../../assets/img/title-img.png" class="img-fluid" alt="title-img">
							</div>		
							<div class="success-sec">
								<div class="row justify-content-center">
									<div data-aos="fade-up">
										<div class="success-item">
											<div class="centered"><span style="font-size: 55px;"><i-mingcute-announcement-line /></span>
											<h6>Kami Seluruh Aparatur Kantor Kementerian Agama Kabupaten Tanah Datar</h6>
											<h6>Dengan Ini Menyatakan</h6></div>
                                            <hr/>
											<p>1. Sanggup Menyelenggarakan Pelayanan Sesuai dengan Standar Pelayanan yang ditetapkan</p>
											<p>2. Akan Memberikan Pelayanan Sesuai dengan Kewajiban</p>
											<p>3. Akan Melakukan Perbaikan secara Terus Menerus</p>
											<p>4. Bersedia Menerima Sanksi Sesuai Ketentuan yang Berlaku, Apabila Pelayanan yang Kami Berikan Tidak Sesuai Standar.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<br/>
					<hr/>
					<div style="display: flex; flex-direction: row; gap: 10px;" data-aos="fade-up">
						<div style="flex: 1;">
							<img src="../../../assets/img/grafitikasi.png" style="width: 102%; height: auto;" />
						</div>
						<div style="flex: 1;">
							<img src="../../../assets/img/5bk.png" style="width: 105%; height: auto;" />
						</div>
					</div>
				</div>			   
			</div>		
		</section>
		<section class="feedback-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="section-heading-two text-center">
                        <p>Silahkan Dilihat-lihat</p>
                        <h2>Testimonials Kami</h2>
                        <img src="../../../assets/img/title-img.png" class="img-fluid" alt="title-img">
                    </div>
                    <div class="owl-carousel feedback-slider">
                        <Carousel :wrap-around="true" :settings="settings" :breakpoints="breakpoints">
					        <Slide v-for="item in IndexTwoFeedback" :key="item.id">
                                <div class="testimonial-item" >
                                    <div class="testimonial-content">
										<p v-if="item.rating == 1"><i-openmoji-star /></p>
										<p v-else-if="item.rating == 2"><i-openmoji-star /><i-openmoji-star /></p>
										<p v-else-if="item.rating == 3"><i-openmoji-star /><i-openmoji-star /><i-openmoji-star /></p>
										<p v-else-if="item.rating == 4"><i-openmoji-star /><i-openmoji-star /><i-openmoji-star /><i-openmoji-star /></p>
										<p v-else-if="item.rating == 5"><i-openmoji-star /><i-openmoji-star /><i-openmoji-star /><i-openmoji-star /><i-openmoji-star /></p>
										<hr/>
                                        <p>{{ item.keterangan }}</p>
                                        <span class="testi-icon"><i class="fa-solid fa-quote-left"></i></span>
                                    </div>
                                    <div class="testimonial-user-info">
                                        <img class="img-fluid" src="../../../assets/img/defaultpp.png" alt="Post Image">
                                        <div class="testimonial-user">
                                            <h6>{{ item.nama }}</h6>
                                        </div>
                                    </div>
                                </div>
                            </Slide>
                                <template #addons>
                                    <Navigation />
                                </template>
				        </Carousel>	
						<br/>
						<div class="centered">
							<span style="font-size: 25px;>" ><b>Overall Rating : {{ total }}</b></span>
						</div>
                    </div>
                </div>
            </div>
        </div>
    </section>	
		<!-- /Celebrating Section -->
</template>

<script>
import { Carousel, Pagination, Navigation, Slide } from "vue3-carousel";
import IndexTwoFeedback from '../../../assets/json/indexTwoFeedback.json';

export default {
	components: {
			Carousel,
			Slide,
			Pagination,
			Navigation,
		},
    data() {
        return {
            IndexTwoFeedback: [],
			total: null,
            settings: {
				itemsToShow: 1,
				snapAlign: "center"
			},
			breakpoints: {
                575: {
					itemsToShow: 2,
					snapAlign: "center"
				},
				// 700px and up
				767: {
					itemsToShow: 2,
					snapAlign: "center"
				},
                // 991 and up
                991: {
                    itemsToShow: 3,
					snapAlign: "center"
                },
				// 1024 and up
				1024: {
					itemsToShow: 3,
					snapAlign: "start"
				}
			},
        }
    },
	created() {
		this.getRating(),
		window.scrollTo(0,0)
	},
	methods: {
		async getRating() {
			this.loading = true;
			try{
				const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getRating')
				
				if(response.data.success == true){
					//console.log(response.data.data)
					this.IndexTwoFeedback = response.data.data
					this.total = response.data.total
				}else{
					this.$toast.fire({
						title: response.data.data,
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

<style>
.carousel__item {
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 24px;
}
.grid-blog{
    margin-right: 24px;
}
</style>