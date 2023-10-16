<template>
    <div class="main-wrapper">
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            <div class="dashboard-content">		
			<div class="container">
                <div  class="pagination">
                    <a class="page-link" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
				<div class="bookmarks-content grid-view featured-slider">
				    <div class="row" :disabled="loading">
						<div v-if="!loading" class="col-lg-3 col-md-4 centered">
                            <router-link :to="addTamu('197304241998031008')">
							<div class="PTSP categories-content">
								<a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
								<img :src="$assets+'/img/profiles/kakankemenag-01.jpg'" alt="car1">
								<h5>H. AMRIL, S.Ag, MM</h5>
								<span style="font-size:14px">KEPALA KANTOR<br>Kementerian Agama Kab.Tanah Datar</span>
								</a>								   
							</div>
                            </router-link>
						</div>
						<hr/>
						<div v-if="loading" class="text-center">
							<hr>
							<b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
							<br>
							<i-svg-spinners-bars-scale style="font-size: 2em;"/>
							<h3>:::Mohon Tunggu Sebentar :::</h3>
							<hr>
						</div>
					    <div v-for="item in seksi" v-else id="item" :key="item.id" class="col-lg-4 col-md-4 col-sm-6 centered">
							<div class="card aos aos-init aos-animate" data-aos="fade-up">
				    			<div class="blog-widget">
									<div class="blog-img">
										<router-link :to="listPetugas(item.id)">
											<img :src="$assets+'/img/list/listgrid-1.jpg'" class="img-fluid" alt="blog-img">
                                        </router-link>
					    				<div class="fav-item">
											<span class="Featured-text">{{item.kategori.toUpperCase()}}</span>
												<a href="javascript:void(0)" class="fav-icon">
							    					<i class="feather-heart"></i>
						    					</a>										
										</div>	
									</div>
									<div class="bloglist-content">
										<div class="card-body">
											<div class="blogfeaturelink">
											    <div class="grid-author">
												    <img :src="item.ppkepala ?? $assets+'/img/profiles/avatar-01.jpg'" alt="author">
                                                </div>
												<div class="blog-features">
												   <a href="javascript:void(0)"><span> <i class="fa-regular fa-circle-stop"></i> {{ item.kode }}</span></a>
												</div>																	  
												<div class="blog-author text-end"> 
													<span> <i class="feather-user"></i>{{ item.jml }}</span>
												</div>
											</div> 
											<h6><router-link :to="listPetugas(item.id)">{{ item.nama }}</router-link></h6>																	 
											<div class="blog-location-details">
												<div class="location-info">
												   <i class="feather-map-pin"></i> {{ item.alamat }}
												</div>
												<div class="location-info">
													<i class="fa-solid fa-calendar-days"></i> {{ item.kode }}
												</div>
											</div>
											<div class="amount-details">
												<div class="ratings">
													<span>{{ item.kepala }}</span> ({{ item.rolekepala.toUpperCase() }})
												</div>												
											</div>	
										</div>	
									</div>			 
								</div> 
							</div>
						</div>
                            </div>						
                        </div>
                    </div>		
            </div>
            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Kantor Kementerian Agama Kab.Tanah Datar",
            text: "Home",
            text1: "Buku Tamu",
            name: "/",
            loading: false,
            seksi: []
        }
    },
    computed: {
        addTamu() {
        	return id => `/bukutamu/${this.nav}/asn/${id}`;
    	},
        listPetugas() {
            return id => `/bukutamu/${this.nav}/${id}`;
        },
    },
    created() {
		this.getSeksi(),
		this.nav = this.$route.params.id
	},
    methods: {
		async getSeksi() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getSeksi',{headers})
				this.seksi = response.data.data
		
			} catch (error) {
				this.$toast.fire({
					title: error,
					icon: 'error',
				})
			} finally {
				this.loading = false
			}
		},
	}
}
</script>