<template>
    <!-- Home Banner -->
		<section class="banner-section banner-three">
			<div class="container">
				<div class="row">
					<div class="banner-info-blk">
						<div class="row">
							<div class="col-md-12 col-lg-5">
								<div class="banner-content-blk centered">
									<h1><b>SILATAR</b></h1><br/>
									<img src="../../../assets/img/mhome.png" class="centered d-block d-sm-none" style="width: 70%"/><br/>
									<h3>Kantor Kementerian Agama<br>Kab.Tanah Datar {{ kode }}</h3>
									<hr>
									<h5>Sistem Informasi Layanan dan <br>Administrasi Tanah Datar</h5>
								</div>
							</div>
						</div>
					</div>
					<div class="banner-images">
						<div class="ban-image">
							<img src="../../../assets/img/bg/balloon-img.png" width="60%" alt="">
						</div>
						<div class="ban-image-01">
							<img src="../../../assets/img/bg/cloud-01.png" alt="" class="cloud-one">
							<img src="../../../assets/img/bg/cloud-02.png" alt="" class="cloud-two">
						</div>
						<div class="ban-image-02">
							<img :src="imgz" style="float: right;width: 66%;" alt="opener">
						</div>
						<div class="ban-image-03">
							<img src="../../../assets/img/bg/run.png" alt="">
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="banner-btm-img-blk">
							<img src="../../../assets/img/banner-btm-img.png" style="width: 28%;" alt="">
						</div>
						<!--
						<div class="banner-btm">
							<div class="search-tab-col">
								<b-form action="listing-grid-sidebar" method="post">
									<div class="row align-items-center search-form">
										<div class="col-12 col-lg-10 datepicker-col search-group">
											<ul class="gap-3 d-flex">
												<li>
													<div class="d-flex">
														<div class="flex-shrink-0">
															<div class="icon-blk rounded-circle">
																<span class="material-symbols-outlined">location_on</span>
															</div>
														</div>
														<div class="flex-grow-1 ms-3">
															<span class="label">Location</span>
															<b-form-input type="text" name="name" class="border-0 text-truncate px-0 form-control" placeholder="Where are you go?" />
														</div>
													</div>
												</li>
												<li>
													<div class="d-flex">
														<div class="flex-shrink-0">
															<div class="icon-blk rounded-circle">
																<span class="material-symbols-outlined">calendar_today</span>
															</div>
														</div>
														<div class="flex-grow-1 ms-3">
															<span class="label">Check in</span>
															<b-form-input type="text" name="checkin" class="border-0 text-truncate px-0 form-control datetimepicker" placeholder="Jan 05, 2023" />
														</div>
													</div>
												</li>
												<li>
													<div class="d-flex">
														<div class="flex-shrink-0">
															<div class="icon-blk rounded-circle">
																<span class="material-symbols-outlined">calendar_today</span>
															</div>
														</div>
														<div class="flex-grow-1 ms-3">
															<span class="label">Check out</span>
															<b-form-input type="text" name="checkout" class="border-0 text-truncate px-0 form-control datetimepicker" placeholder="Jan 06, 2023" />
														</div>
													</div>
												</li>
												<li>
													<div class="d-flex">
														<div class="flex-shrink-0">
															<div class="icon-blk rounded-circle">
																<span class="material-symbols-outlined">group</span>
															</div>
														</div>
														<div class="flex-grow-1 ms-3">
															<span class="label">Guest</span>
															<b-form-input type="text" name="mobile" class="border-0 text-truncate px-0 form-control" placeholder="2 adults - 1 children" />
														</div>
													</div>
												</li>
											</ul>
										</div>
										<div class="col-12 col-lg-2 search-group">
											<ul class="p-0">
												<li>
													<b-button variant="btn theme-btn">Search <i class="feather-search ms-1"></i></b-button>
												</li>
											</ul>
										</div>
									</div>
								</b-form>	
							</div>
						</div>
						-->
					</div>
				</div>
			</div>
		</section>
		<!-- /Home Banner -->	
</template>

<script>
export default {
	data() {
        return {
			
			imgz: null,
		}
	},
	created(){
		this.Imgopener();
		window.scrollTo(0,0)
	},
	methods:{
		Imgopener() {
			const dt = new Date()
			const index = dt.getDay()
			let imgx = null
			let kode =  Math.random().toString(36).slice(2);

			if(index == 4){
				imgx = 'banner-03';
			}else if(index == 5){
				imgx = 'banner-04';
			}else if(index == 3){
				imgx = 'banner-05';
			}else if(index == 2){
				imgx = 'banner-06';
			}else{
				imgx = 'banner-02';
			}
			this.imgz = this.$assets+'/img/bg/'+imgx+'.png?t='+kode
		}
	}
}
</script>