<template>
	<!-- Reviews Content -->
	<div class="dashboard-content">
		<div class="container">
			<userMenu />
			<div class="row dashboard-info reviewpage-content">
				<div v-for="item in Review" :key="item.id" class="col-lg-6 d-flex">
					<div class="card dash-cards">
						<div class="card-header">
							<h4>{{item.title}}</h4>
							<div class="card-dropdown">
								<ul>
									<li class="nav-item dropdown has-arrow logged-item">
										<a
href="#" class="dropdown-toggle pageviews-link" data-bs-toggle="dropdown"
											aria-expanded="false">
											<span>All Listing</span>
										</a>
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
							<ul class="review-list">
								<li class="review-box">
									<div class="review-profile">
										<div class="review-img">
											<img :src="import(`../../../assets/img/${item.src}`)" class="img-fluid" alt="img">
										</div>
									</div>
									<div class="review-details">
										<h6>{{item.name}}</h6>
										<div class="rating">
											<div class="rating-star">
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
											</div>
											<div><i class="fa-sharp fa-solid fa-calendar-days"></i>{{ item.month }}</div>
											<div>{{ item.by }}</div>
										</div>
										<p>{{ item.content }}</p>
										<ul class="review-gallery">
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-1.jpg">
											</li>
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-2.jpg">
											</li>
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-3.jpg">
											</li>
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-4.jpg">
											</li>
										</ul>
									</div>
								</li>
								<li class="review-box">
									<div class="review-profile">
										<div class="review-img">
											<img :src="import(`../../../assets/img/${item.src2}`)" class="img-fluid" alt="img">
										</div>
									</div>
									<div class="review-details">
										<h6>{{item.name2}}</h6>
										<div class="rating">
											<div class="rating-star">
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
											</div>
											<div><i class="fa-sharp fa-solid fa-calendar-days"></i>{{ item.month2 }}</div>
											<div>{{item.by2}}</div>
										</div>
										<p>{{ item.content2}}</p>
									</div>
								</li>
								<li class="review-box">
									<div class="review-profile">
										<div class="review-img">
											<img :src="import(`../../../assets/img/${item.src3}`)" class="img-fluid" alt="img">
										</div>
									</div>
									<div class="review-details">
										<h6>{{item.name3}}</h6>
										<div class="rating">
											<div class="rating-star">
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
												<i class="fas fa-star filled"></i>
											</div>
											<div><i class="fa-sharp fa-solid fa-calendar-days"></i>{{item.month3}}</div>
											<div>{{item.by3}}</div>
										</div>
										<p>{{ item.content3 }}</p>
										<ul class="review-gallery">
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-1.jpg">
											</li>
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-2.jpg">
											</li>
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-3.jpg">
											</li>
											<li>
												<img class="img-fluid" alt="Image" src="../../../assets/img/gallery/review-4.jpg">
											</li>
										</ul>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- /Reviews Content -->
</template>

<script>
import Review from '../../../assets/json/review.json'
export default {
	data() {
		return {
			Review: Review
		}
	},
}
</script>