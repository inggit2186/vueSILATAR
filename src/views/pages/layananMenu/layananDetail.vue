<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
                <!--Details Description  Section-->
		    <section class="details-description">
		    <div class="container">
				  <div class="headerDetail centered">
					<h3 v-if="loading"><i-line-md-downloading-loop /></h3>
					<h3 v-else>{{ layanan.nama }}</h3>
				  </div>
				  <div class="headerMobile centered">
                    <h2 v-if="loading"><i-line-md-downloading-loop /></h2>
					<h2 v-else>{{ layanan.nama }}</h2>
				  </div>
				  <hr/>
				  <div class="descriptionlinks">
					<div class="row">
						  <div class="col-lg-9">
							  <ul>
								  <li><a href="javascript:void(0);"><i class="feather-map"></i> Get Directions</a></li>
								  <li><a href="javascript:void(0);"><i class="feather-share-2"></i> Share</a></li>
								  <li><a href="javascript:void(0);"><i class="fa-regular fa-comment-dots"></i> Write a review</a></li>
								  <li><a href="javascript:void(0);"><i class="feather-flag"></i> Report</a></li>
								  <li><a href="javascript:void(0);"><i class="feather-heart"></i> Save</a></li>
							  </ul>
						  </div>
						  <div class="col-lg-3">
							  <div class="callnow">
								  <router-link :to="addRequest()"> <i class="feather-phone-call"></i>  <b>AJUKAN</b></router-link>
							  </div>
						  </div>
					 </div>
				  </div>
			</div>		
		</section>
		<!--/Details Description  Section-->

        <!--Details Main  Section-->
        <div v-if="loading" class="text-center">
            <hr>
            <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
            <br>
            <i-svg-spinners-bars-scale style="font-size: 2em;"/>
            <h3>::: Nyangkul Detail Layanannya :::</h3>
            <hr>
        </div>
		<div v-else class="details-main-wrapper">	
            <div class="container">
			        <div class="row">
					  <div class="col-lg-9">                             					
							<div class="card ">
								<div class="card-header">
									<span class="bar-icon">
									<span></span>
									<span></span>
									<span></span>
									</span> 
									<h4>Deskripsi</h4>
								</div>
								<div class="card-body">
									<p>{{ layanan.deskripsi }}</p>
                                    <br/>
									<p><b>Biaya Pelayanan : </b>{{ layanan.biaya }}</p>
									<p><b>Waktu Pelayanan : </b>{{ layanan.waktu }}</p>
								</div>
							</div>					
								
						<!--Listing Features Section-->
                        <div class="card ">
							<div class="card-header">
									<i class="feather-list"></i>
									<h4>Syarat-Syarat yang Diperlukan</h4>
							</div>
							<div class="card-body">
							    <div class="lisiting-featues">
							        <div class="row">
                                        <div v-for="item in syarat" id="item" :key="item.id" class="featureslist d-flex align-items-center col-lg-4 col-md-4">
                                            <div class="feature-img">
                                                <img :src="this.$assets+'/img/featured/Feature-'+randNo()+'.svg'" alt="Room amenties" >
                                            </div>
                                            <div class="featues-info">
                                                <h6 style="font-weight: 420;">{{ item.syarat }}<span v-if="item.wajib == 1">*</span><span v-else></span></h6>
                                                <p style="font-size: small;"> {{ item.keterangan }}</p>
                                            </div>
                                        </div>
                                    </div>
								</div>
                                <span style="font-size: small;"><b><i>*) Wajib Diupload</i></b></span>
							</div>	
                        </div>									
						<!--/Listing Features Section-->
					</div>
					<div class="col-lg-3 theiaStickySidebar">
						<div class="stickysidebar">
						<div class="rightsidebar">
							<div class="card">
							    <h4><img :src="this.$assets+'/img/statistic-icon.svg'" alt="location"> Statistic</h4>
							    <ul class="statistics-list">
								    <li><div class="statistic-details"><span class="icons"><i class="fa-regular fa-eye"></i></span>
								       Views </div><span class="text-end"> 453563</span></li>
									<li><div class="statistic-details"><span class="icons"><i class="feather-star"></i></span>
									   Ratings </div><span class="text-end"> 153</span></li>
									<li><div class="statistic-details"><span class="icons"><i class="feather-heart"></i></span>
										 Favuorites </div><span class="text-end"> 123</span></li>
									<li class="mb-0"><div class="statistic-details"><span class="icons"><i class="feather-share-2"></i></span>
									     Shares </div><span class="text-end"> 50</span></li>
								</ul>
							</div>
						    <div class="card">
							    <h4> <i class="feather-user"></i> Author</h4>
							    <div class="sidebarauthor-details align-items-center">
								   <div class="sideauthor-img">
								     <img :src="layanan.author.pp" alt="author">
								   </div>
								   <div class="sideauthor-info">
								       <p class="authorname">{{ layanan.author.name }}</p>
								       <p >{{ layanan.author.satker }}</p>
								   </div>
								</div>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>		
		</div>		
		<!-- /Details Main Section -->

                <foot />

                <scroll />
            </div>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            random: null,
            loading: false,
            layanan: [],
            syarat: []
        }
    },
    computed: {
		addRequest() {
        	return id => `/request/${this.$route.params.cid}/${this.$route.params.xid}/${this.navid}`
    	},
	},
    created() {
        this.navid = this.$route.params.id,
        this.getLayananDetail(),
        this.random = this.randNo(),
        window.scrollTo(0,0)
    },
    methods: {
		async getLayananDetail() {
			this.loading = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getLayananDetail/'+sid,{headers})
				this.layanan = response.data.data
				this.syarat = response.data.syarat

			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
        randNo() {
        	return Math.floor(Math.random() * 8) + 1;
    	}
    }
}
</script>

