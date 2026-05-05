<template>
    <div class="main-wrapper">
        <div class="page-wrapper rekap-skp-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="card-header">
                                    <h4>Daftar Rekap Laporan Penilaian SKP</h4>
                                    <!-- <router-link class="nav-link header-login add-listing" to="/add-listing"><i
                                            class="fa-solid fa-plus"></i> Add Listing</router-link> -->
                                </div>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
                                        <div class="group-img">
                                            <input v-model="keyword" type="text"  class="form-control" placeholder="Cari data..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" style="max-width: 20px;" @click="sortTable(column.data)">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
										<tbody v-if="loading">
                                            <tr>
                                                <td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Memuat data...</b></span></td>
                                            </tr>
                                        </tbody>
										<tbody v-else>
											<tr v-if="ptsp.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
											</tr>
											<tr v-for="item in paginatedItem" v-else :key="item.id">
												<td>
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.name }} </BBadge><br/>
                                                    <BBadge pill variant="danger" style="font-size: small;margin-bottom: 2px;"> {{ item.nomor_induk }} </BBadge><br/>
                                                    <BBadge pill variant="secondary" style="font-size: small;"> {{ item.satker }} </BBadge>
                                                </td>
												<td>
                                                    <BButton :loading="loadingaksi['tw1']" pill size="sm" variant="success" style="margin-bottom: 5px;" @click.prevent="getNilai(item.id,'tw1')"><b><i-subway-mark /> TRIWULAN 1</b></BButton><br/>
                                                    <BButton :loading="loadingaksi['tw2']" pill size="sm" variant="secondary" style="margin-bottom: 5px;" @click.prevent="getNilai(item.id,'tw2')"><b><i-subway-mark /> TRIWULAN 2</b></BButton><br/>
                                                    <BButton :loading="loadingaksi['tw3']" pill size="sm" variant="danger" style="margin-bottom: 5px;" @click.prevent="getNilai(item.id,'tw3')"><b><i-subway-mark /> TRIWULAN 3</b></BButton><br/>
                                                    <BButton :loading="loadingaksi['tw4']" pill size="sm" variant="dark" style="margin-bottom: 5px;" @click.prevent="getNilai(item.id,'tw4')"><b><i-subway-mark /> TRIWULAN 4</b></BButton><br/>
                                                </td>
                                                <td>
                                                    <BButton :loading="loadingaksi['tahunan']" pill size="sm" variant="primary" style="margin-bottom: 5px;" @click.prevent="getNilai(item.id,'tahunan')"><b><i-fluent-mdl2-calendar-year /> TAHUNAN</b></BButton><br/>
                                                </td>
                                            </tr>
										</tbody>
                                    </table>
                                </div>

                                <!--Pagination--> 
                                <div class="blog-pagination">
                                    <nav>
                                        <ul class="pagination">
                                            <li class="page-item previtem" :class="{'disabled': currentPage === 1}">
                                                <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)"><i class="fas fa-regular fa-arrow-left"></i> Prev</a>
                                            </li>
                                            <li class="justify-content-center pagination-center"> 
                                                <div class="pagelink">
                                                    <ul>
                                                        <li v-for="page in displayedPages" :key="page" class="page-item" :class="{'active': currentPage === page}">
                                                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                                        </li>
                                                        <li class="page-item" :class="{'disabled': currentPage === totalPages}">
                                                            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">...</a>
                                                        </li>
                                                    </ul>
                                                </div>													
                                            </li>													
                                            <li class="page-item nextlink" :class="{'disabled': currentPage === totalPages}">
                                                <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next <i class="fas fa-regular fa-arrow-right"></i></a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <!--/Pagination-->

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Dashboard Content -->

            <foot />

            <scroll />
        </div>
    </div>
</template>

<style scoped>
.rekap-skp-page {
  background:
    radial-gradient(circle at top, rgba(171, 23, 57, 0.12), transparent 42%),
    linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.rekap-skp-page .dashboard-content {
  padding: 1rem 0 2.5rem;
}

.rekap-skp-page .dash-cards {
  background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98));
  border: 1px solid rgba(214, 171, 76, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(13, 7, 8, 0.22);
  color: #fff4dc;
}

.rekap-skp-page .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(255, 244, 220, 0.12);
}

.rekap-skp-page h4,
.rekap-skp-page .card-header h4 {
  color: #fff4dc;
}

.rekap-skp-page :deep(.form-control) {
  background: rgba(255, 244, 220, 0.08);
  border: 1px solid rgba(214, 171, 76, 0.24);
  color: #fff4dc;
}

.rekap-skp-page :deep(.form-control::placeholder) {
  color: rgba(255, 244, 220, 0.56);
}

.rekap-skp-page :deep(.table) {
  color: #fff4dc;
}

.rekap-skp-page :deep(.table thead th) {
  background: rgba(214, 171, 76, 0.12);
  color: #fff4dc;
  border-color: rgba(214, 171, 76, 0.18);
}

.rekap-skp-page :deep(.table tbody td) {
  border-color: rgba(255, 244, 220, 0.08);
  color: #fff4dc;
}

.rekap-skp-page :deep(.table tbody td *) {
  color: inherit !important;
}

.rekap-skp-page :deep(.table tbody tr:hover) {
  background: rgba(214, 171, 76, 0.08);
}

.rekap-skp-page :deep(.badge) {
  color: #fff4dc;
}

.rekap-skp-page :deep(.page-link) {
  background: rgba(255, 244, 220, 0.08);
  border-color: rgba(214, 171, 76, 0.2);
  color: #fff4dc;
}

.rekap-skp-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border-color: transparent;
  color: #fff4dc;
}
</style>

<script>
export default {
    data() {
        return {
            title: "Rekap Kinerja ASN",
            text: "Admin",
            text1: "Rekap Kinerja ASN",
            name: "/",
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Triwulan', data: 'triwulan' },
				{ name: 'Tahunan', data: 'tahunan' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			ptsp: [],
			ptsp0: [],
            xid: null,
            sid: null
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.ptsp.sort((a, b) => {
				let modifier = 1;
				if(this.currentSortDir === 'desc') modifier = -1;
				if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
			},
    	paginatedItem() {
			const start = (this.currentPage - 1) * this.itemsPerPage;
			const end = start + this.itemsPerPage;
			return this.ptsp.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.ptsp.length / this.itemsPerPage);
        },
	},
  created() {
		this.getPTSP(),
		window.scrollTo(0,0)
	},
  methods: {
		async getPTSP() {
            this.sid = '3231';
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getPejabat',{

				},{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
          			this.ptsp = response.data.data
				}else{
					this.$toast.fire({
						title: response.data.message,
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
        async getNilai(userid,tw){
            this.loadingaksi[tw] = true;
			try{
                console.log(tw)
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/ambildataskp/',{
                        userid : userid,
                        tahun : '2025',
                        tw : tw
                    },{headers})
                    
				if(response.data.success == true){
                    	this.$swal.fire({
						title: 'Penilaian SKP',
							html: response.data.message,
							icon: 'info',
						})
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
				this.loadingaksi[tw] = false
			}
        },
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.ptsp.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.ptsp = this.ptsp0;
			} else {
				this.ptsp = this.ptsp0.filter((item) => {
					return item.nip.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.name.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
  }
}
</script>

<style scoped>
.rekap-skp-page {
  background:
    radial-gradient(circle at top left, rgba(201, 157, 79, 0.1), transparent 28%),
    linear-gradient(180deg, #1f1213 0%, #2a191a 100%);
  color: #fff2d1;
}

.rekap-skp-page :deep(.dash-cards.card) {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.97), rgba(31, 18, 19, 0.98));
  border: 1px solid rgba(201, 157, 79, 0.16);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

.rekap-skp-page :deep(.card-header),
.rekap-skp-page :deep(.card-body) {
  color: #fff2d1;
}

.rekap-skp-page :deep(.card-header h4),
.rekap-skp-page :deep(.listing-search .form-control),
.rekap-skp-page :deep(.pagination .page-link),
.rekap-skp-page :deep(.badge) {
  color: #fff4dc;
}

.rekap-skp-page :deep(.listing-search .form-control) {
  background: rgba(255, 244, 220, 0.04);
  border: 1px solid rgba(201, 157, 79, 0.24);
}

.rekap-skp-page :deep(.table thead th) {
  background: rgba(201, 157, 79, 0.14);
  color: #fff4dc;
}

.rekap-skp-page :deep(.table tbody td) {
  background: rgba(255, 244, 220, 0.03);
  color: #fff2d1;
}

.rekap-skp-page :deep(.btn-outline-primary) {
  border: 1px solid rgba(201, 157, 79, 0.42);
  color: #fff4dc;
}

.rekap-skp-page :deep(.btn-outline-primary:hover) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
}

.rekap-skp-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
}

@media (max-width: 767px) {
  .rekap-skp-page :deep(.dash-cards.card) {
    border-radius: 18px;
  }
}
</style>
