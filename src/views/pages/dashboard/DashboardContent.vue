<template>
	<!-- Dashboard Content -->
	<div class="dashboard-content">
		<div class="container">
			<userMenu />
			<div class="dashboard-details">
				<div class="row">
					<div v-for="item in Dashboard" :key="item.id" class="col-lg-3 col-md-3 ">
						<div class="card dash-cards">
							<div class="card-body">
								<div class="dash-top-content">
									<div class="dashcard-img">
										<img
											:src="$assets+'/img/icons/'+item.image" class="img-fluid"
											alt="">
									</div>
								</div>
								<div class="dash-widget-info">
									<h6>{{ item.title }}</h6>
									<h3 class="counter">{{ item.count }}</h3>
								</div>
							</div>
						</div>
					</div>

				</div>

				<!-- dashboard-info -->
				<div class="row dashboard-info">
					<div class="col-lg-6 d-flex">
						<div class="card dash-cards w-100">
							<div class="card-header">
								<h4>Page Views</h4>
								<div class="card-dropdown">
									<ul>
										<li class="nav-item dropdown has-arrow logged-item">
											<router-link
to="#" class="dropdown-toggle pageviews-link"
												data-bs-toggle="dropdown" aria-expanded="false">
												<span>This week</span>
											</router-link>
											<div class="dropdown-menu dropdown-menu-end">
												<a class="dropdown-item" href="javascript:void();">Next Week</a>
												<a class="dropdown-item" href="javascript:void()">Last Month</a>
												<a class="dropdown-item" href="javascript:void()">Next Month</a>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div class="card-body">
								<apexchart
type="radar" height="350" 
									:options="radarChart.chart"
									:series="radarChart.series">
								</apexchart>
							</div>
						</div>
					</div>
					<div class="col-lg-6 d-flex">
						<div class="card dash-cards w-100">
							<div class="card-header">
								<h4>Visitor Review</h4>
								<div class="card-dropdown">
									<ul>
										<li class="nav-item dropdown has-arrow logged-item">
											<router-link
to="#" class="dropdown-toggle pageviews-link"
												data-bs-toggle="dropdown" aria-expanded="false">
												<span>All Listing</span>
											</router-link>
											<div class="dropdown-menu dropdown-menu-end">
												<a class="dropdown-item" href="javascript:void(0)">Next Week</a>
												<a class="dropdown-item" href="javascript:void(0)">Last Month</a>
												<a class="dropdown-item" href="javascript:void(0)">Next Month</a>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div class="card-body">
								<ul v-for="item in DashboardReview" :key="item.id" class="review-list">
									<li class="review-box">
										<div class="review-profile">
											<div class="review-img">
												<img
:src="$assets+'/img/profiles/'+item.image"
													class="img-fluid" alt="img">
											</div>
										</div>
										<div class="review-details">
											<h6>{{ item.name }}</h6>
											<div class="rating">
												<div class="rating-star">
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
													<i class="fas fa-star filled"></i>
												</div>
												<div><i class="fa-sharp fa-solid fa-calendar-days"></i>{{ item.date }}</div>
												<div>{{ item.test }}</div>
											</div>
											<p>{{ item.content }}</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<!-- /dashboard-info -->
			</div>
		</div>
	</div>
	<!-- /Dashboard Content -->
</template>

<script>
import Dashboard from '../../../assets/json/dashboard.json'
import DashboardReview from '../../../assets/json/dashboardReview.json'
import {
	radarChart
}
from "./data";
export default {
	data() {
		return {
			Dashboard: Dashboard,
			DashboardReview: DashboardReview,
			radarChart: radarChart,
			loading: false
		}
	},
	methods:{
            async logout() {
                try{
                    this.loading = true
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/logout', {}, { headers });
                   if(response.data.success == true){
                    localStorage.clear();
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/login');
                   }else{
                    localStorage.clear();
                    this.$router.push('/login');
                   }
                } catch (error) {
                    console.error(error.response.status);
                    if(error.response.status == 401){
                        localStorage.clear();
                        this.$router.push('/login');
                    }
                } finally {
                    this.loading = false;
                }
            },
        },
}
</script>