<template>
    <!--Popular Location-->
		<div class="aboutpopular-locations">
		    <div class="container">
				<div class="row">
				    <div v-for="item in AboutPopular" :key="item.id" :class="item.class">
					    <div class="aboutlocation-details usa">
						<div class="aboutloc-img">
						    <img :src="import(`../../../assets/img/locations/${item.img}`)" alt="">
						</div>
						<router-link to="/listing-grid-sidebar">					   				    
	                        <div class="aboutlocations-info">
							    <h3>{{ item.title }}</h3>
								<span>{{ item.content }}</span>
							</div> 
                        </router-link> 						
						</div>				
					</div>
				</div>
		   </div>
		</div>
		<!--/Popular location-->
</template>

<script>
	import AboutPopular from '../../../assets/json/aboutPopular.json'
	export default {
		data() {
			return {
				AboutPopular: AboutPopular
			}
		},
	}
</script>