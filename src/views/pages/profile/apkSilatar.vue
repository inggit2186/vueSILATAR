<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper apk-silatar-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
						<userMenu />
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="card-header">
                                    <h4>Daftar Unduh APK</h4>
											<a v-if="!loadingrekap" class="btn btn-warning" href="#" style="float: right;" @click="downloadAPK()"><i-vaadin-download /> &nbsp;<b>DOWNLOAD APK</b></a>
											<a v-else class="btn btn-danger" href="#" style="float: right;"><i-svg-spinners-clock /> <b>Downloading</b></a>
                                </div>
                                <hr/>
                                <h4 style="font-size: medium;align-self: center;">
									<br/>
                                    <b><i>:: PENTING ::</i></b><br/><br/>
									• Download APK Aplikasi SILATAR untuk Android dengan mengklik tombol <b><i>"Download APK"</i></b>  diatas<br/><br/>
                                    • APK SILATAR akan <b>dikirimkan ke Whatsapp Bpk/Ibu yang terdaftar di Aplikasi SILATAR</b><br/><br/>
                                    • Install APK yang  telah <b>dikirimkan ke Whatsapp Bpk/Ibu hanya dari nomor Whatsapp Khusus SILATAR/Kankemenag Kab.Tanah Datar (+62 895-0900-7078)</b><br/><br/>
                                    • Setiap APK memiliki <b>Kode Unik</b> untuk masing-masing ASN, <b>Jangan pernah menginstall APK yang dikirimkan oleh orang lain</b>.
								</h4>
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
                                                <td><a href="#">{{ item.tanggal }} </a><br/><b>{{ item.jam }}</b></td>
                                                <td>
                                                    <span>{{ item.apk }}</span>
                                                </td>
                                                <td>
                                                    <b>{{ item.versi }}</b><br/>
                                                </td>
                                                <td>
                                                    <b>{{ item.code }}</b><br/>
                                                </td>
                                                <td>
                                                    {{ item.device }} <b>({{ item.status }})</b><br/>
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
.apk-silatar-page {
  background:
    radial-gradient(circle at top, rgba(171, 23, 57, 0.14), transparent 44%),
    linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.apk-silatar-page .dashboard-content {
  padding: 1rem 0 2.5rem;
}

.apk-silatar-page .dash-cards {
  background: linear-gradient(180deg, rgba(35, 21, 24, 0.98), rgba(24, 14, 17, 0.98));
  border: 1px solid rgba(214, 171, 76, 0.18);
  border-radius: 22px;
  box-shadow: 0 18px 36px rgba(13, 7, 8, 0.22);
  color: #fff4dc;
}

.apk-silatar-page .card-header {
  background: transparent;
  border-bottom: 1px solid rgba(255, 244, 220, 0.12);
  color: #fff4dc;
}

.apk-silatar-page h4,
.apk-silatar-page .card-header h4 {
  color: #fff4dc;
}

.apk-silatar-page .card-body > h4 {
  color: #fff4dc;
  line-height: 1.75;
}

.apk-silatar-page :deep(.btn-warning) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border: none;
  color: #fff4dc;
}

.apk-silatar-page :deep(.btn-warning:hover) {
  background: linear-gradient(135deg, #d6ab4c, #ab1739);
}

.apk-silatar-page :deep(.btn-danger) {
  background: linear-gradient(135deg, #8f1c31, #ab1739);
  border: none;
}

.apk-silatar-page :deep(.form-control) {
  background: rgba(255, 244, 220, 0.08);
  border: 1px solid rgba(214, 171, 76, 0.24);
  color: #fff4dc;
}

.apk-silatar-page :deep(.form-control::placeholder) {
  color: rgba(255, 244, 220, 0.56);
}

.apk-silatar-page :deep(.table) {
  color: #fff4dc;
}

.apk-silatar-page :deep(.table thead th) {
  background: rgba(214, 171, 76, 0.12);
  color: #fff4dc;
  border-color: rgba(214, 171, 76, 0.18);
}

.apk-silatar-page :deep(.table tbody td) {
  border-color: rgba(255, 244, 220, 0.08);
  color: #3b2418 !important;
  background: #fffdf7 !important;
}

.apk-silatar-page :deep(.table tbody td *) {
  color: inherit !important;
}

.apk-silatar-page :deep(.table tbody td a) {
  color: #7a162b !important;
}

.apk-silatar-page :deep(.table tbody td b),
.apk-silatar-page :deep(.table tbody td strong) {
  color: #2f1d14 !important;
}

.apk-silatar-page :deep(.table tbody td span),
.apk-silatar-page :deep(.table tbody td i),
.apk-silatar-page :deep(.table tbody td small) {
  color: #5a3d2c !important;
}

.apk-silatar-page :deep(.table tbody tr:hover) {
  background: rgba(214, 171, 76, 0.14);
}

.apk-silatar-page :deep(.page-link) {
  background: rgba(255, 244, 220, 0.08);
  border-color: rgba(214, 171, 76, 0.2);
  color: #fff4dc;
}

.apk-silatar-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border-color: transparent;
  color: #fff4dc;
}
</style>

<script>
export default {
    data() {
        return {
            title: "SILATAR Android",
            text: "User",
            text1: "SILATAR Android",
            name: "/",
			columns2: [
				{ name: 'Tanggal', data: 'waktu' },
				{ name: 'Nama APK', data: 'nama' },
				{ name: 'Versi', data: 'versi' },
				{ name: 'Kode Unik', data: 'kode' },
				{ name: 'Device ID', data: 'device' },
			],
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
            loadingrekap: false,
			itemsPerPage: 12,
        	currentPage: 1,
			ptsp: [],
			ptsp0: [],
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
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/myAPK',{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
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
					return item.tujuan.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.staff.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.tanggal.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.jam.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.onstaff.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		async downloadAPK() {
			this.loadingrekap = true;

			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/downloadAPK',{headers})
				
				if(response.data.success == true){
          			this.ptsp0 = response.data.data
          			this.ptsp = response.data.data

                      this.$swal.fire({
						title: "APK Berhasil Dikirim",
						html: response.data.message,
						icon: 'success',
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
				this.loadingrekap = false
			}
		},
  }
}
</script>
