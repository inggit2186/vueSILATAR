<template>
	<!-- Dashboard Content -->
	<div class="dashboard-content">
		<div class="container">
			<userMenu />
			<div class="dash-listingcontent dashboard-info">
				<div class="dash-cards card">
					<div class="card-header">
						<h4>My Listings</h4>
						<!-- <router-link class="nav-link header-login add-listing" to="/add-listing"><i
								class="fa-solid fa-plus"></i> Add Listing</router-link> -->
					</div>
					<div class="card-body">
						<div class="listing-search">
							<div class="filter-content form-group">
								<div class="group-img">
									<input type="text" class="form-control" placeholder="Search...">
									<i class="feather-search"></i>
								</div>
							</div>
						</div>
						<div class="table-responsive">
				<a-table
                    class="stripped table-hover listing-table datatable"
                    :columns="columns"
                    :data-source="ptsp"
                  >
                    <template #bodyCell="{ column, record }">
                      <template
                        v-if="column.key === 'image'"
                      >
					  <div class="listingtable-img">
							<router-link to="/service-details">
								<img
                  class="img-fluid avatar-img centered"
									:src="$assets+'/img/seksi/'+record.dept_id+'.png'" style="width: 90%;" alt="">
							</router-link>
						</div>
                      </template>
                      <template v-else-if="column.key === 'id'">
						<h6>
							<router-link to="/service-details">{{record.judul}}</router-link>
						</h6>
						<div class="listingtable-rate">
							<a href="javascript:void(0)" class="cat-icon"><i
									class="fa-regular fa-circle-stop"></i>  {{ record.no_surat }} </a>
						</div>
						<p>{{ record.deskripsi }}</p>
                      </template>
                      <template v-else-if="column.key === 'status'">
                        <span class="status-text">{{record.status}}</span>
                      </template>
					  <template v-else-if="column.key === 'tanggal'">
                        <span class="cat-icon">{{record.tanggal}}</span>
                      </template>
                      <template v-else-if="column.key === 'action'">
                        <div class="action">
							<a href="javascript:void(0)" class="action-btn btn-view"><i
									class="feather-eye"></i></a>
							<a href="javascript:void(0)" class="action-btn btn-edit"><i
									class="feather-edit-3"></i></a>
							<a href="javascript:void(0)" class="action-btn btn-trash"><i
									class="feather-trash-2"></i></a>
						</div>
                      </template>
                    </template>
                  </a-table>
				  <a-pagination
					style="margin-top: 16px;"
					:current="current"
					:total="total"
					:pageSize="pageSize"
					@change="handleChange"
					/>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>
<!-- /Dashboard Content -->
</template>
<script>
const columns = [
  {
    title: "Unit Kerja",
    dataIndex: "Unit Kerja",
    key: "UnitKerja",
	sorter: {
      compare: (a, b) => {
        a = a.dept.toLowerCase();
        b = b.dept.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Details",
    dataIndex: "Details",
	key: "id",
    sorter: {
      compare: (a, b) => {
        a = a.judul.toLowerCase();
        b = b.judul.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Status",
    dataIndex: "status",
	key: "status",
    sorter: {
      compare: (a, b) => {
        a = a.status.toLowerCase();
        b = b.status.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Tanggal",
    dataIndex: "Tanggal",
    key: "tanggal",
    sorter: {
      compare: (a, b) => {
        a = a.tanggal.toLowerCase();
        b = b.tanggal.toLowerCase();
        return a > b ? -1 : b > a ? 1 : 0;
      },
    },
  },
  {
    title: "Action",
    key: "action",
    class: "text-end",
    sorter: true,
  },
];

export default {
	data() {
		return {
			
			Newest: ["Newest", "Newest", "Oldest"],
      		ptsp: [],
			columns,
			loading: false,
			current: 1,
      		pageSize: 10,
      		total: 100,
		};
	},
  created() {
		this.getPTSP(),
		window.scrollTo(0,0)
	},
  methods: {
		async getPTSP() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getPTSP',{headers})
				
				if(response.data.success == true){
					console.log(response.data.data)
          this.ptsp = response.data.data
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
		},
		handleChange(current) {
      this.current = current;
    },
  }
}
</script>