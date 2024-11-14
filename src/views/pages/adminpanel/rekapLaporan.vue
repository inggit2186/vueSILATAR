<template>
    <div class="main-wrapper">
		<layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <asnMenu v-if="this.$route.params.id == 'Penyuluh'" />
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Rekap Laporan {{ this.$route.params.id }}</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2CKH()" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" month-picker auto-apply />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Rekap Laporan {{ this.$route.params.id }}</h4>
											<VueDatePicker v-model="bulan" @update:model-value="get2CKH()" style="float:left; max-width: 60%;margin-right: 10px;" month-picker auto-apply />
									</div>
								</div>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
                                        <div class="group-img">
                                            <input type="text" v-model="keyword"  @input="filterTable" class="form-control" placeholder="Search...">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-if="this.$route.params.id == 'Penyuluh'" v-for="column in columns2" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                                <th v-else-if="this.$route.params.id == 'KUA'" v-for="column in columns3" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
										<tbody v-if="loading">
                                            <tr>
                                                <td colspan="5"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Mencari Data...</b></span></td>
                                            </tr>
                                        </tbody>
										<tbody v-else>
											<tr v-if="this.ptsp.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td>
                                                    <BBadge pill variant="info" style="font-size: medium;margin-bottom: 2px;"> {{ item.nama }} </BBadge><br/>
													<BBadge v-if="this.$route.params.id == 'Penyuluh'" pill variant="secondary" style="font-size: small;"> {{ item.nip }} </BBadge>
                                                </td>
                                                <td v-if="this.$route.params.id == 'KUA'">
                                                    <span v-if="item.uploader == 'NONE'"><i-guidance-forbidden /></span>
                                                    <BBadge v-else pill variant="warning" style="font-size: medium;margin-bottom: 2px;"> {{ item.uploader }} </BBadge><br/>
                                                    <BBadge v-if="item.uploader != 'NONE'" pill variant="secondary" style="font-size: small;"> {{ item.uploader_id }} </BBadge>
                                                </td>
                                                <td>
                                                    <BBadge v-if="item.status == 'DIKIRIM'" variant="light">DIAJUKAN</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITERIMA'" variant="secondary">DITERIMA</BBadge>
                                                    <BBadge v-else-if="item.status == 'DISETUJUI'" variant="primary">DISETUJUI</BBadge>
                                                    <BBadge v-else-if="item.status == 'DITOLAK'" variant="danger">DITOLAK</BBadge>
                                                    <BBadge v-else-if="item.status == 'NONE'" variant="dark">BELUM UPLOAD</BBadge>
                                                    <br/>
                                                    <span v-if="item.status != 'NONE'" style="font-size: smaller;"><i><i-mdi-update /> Last Update : {{ item.update }}</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mdi-person-tie /><i> {{ item.petugas }}	</i></span><br/>
													<span v-if="item.status != 'DIKIRIM' && item.status != 'NONE'" style="font-size: smaller;"><i-mingcute-comment-fill /><i> {{ item.alasan }}	</i></span>
                                                </td>
                                                <td>
                                                    <BButton v-if="!loadingaksi[item.id] && item.status != 'NONE'" pill size="sm" variant="outline-primary" @click.prevent="aksiStatus(item.id,item.filename)"><b><i-mdi-call-to-action /> AKSI</b></BButton>
                                                    <span v-else-if="item.status == 'NONE'"><i-guidance-forbidden /></span>
                                                    <BButton v-else pill size="sm" variant="outline-primary"><b> <i-svg-spinners-bars-scale/> Loading...</b></BButton>
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

<script>
export default {
    data() {
		const today = new Date();
        return {
            title: "Rekap Kinerja ASN",
            text: "Admin",
            text1: "Rekap Kinerja ASN",
            name: "/",
			bulan: {month: today.getMonth()-1, year:today.getFullYear()},
			columns2: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Status', data: 'status' },
				{ name: 'Action', data: 'action' },
			],
            columns3: [
				{ name: 'Nama', data: 'name' },
				{ name: 'Uploader', data: 'uploader' },
				{ name: 'Status', data: 'status' },
				{ name: 'Action', data: 'action' },
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
			bulanx: null,
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
		this.getCKH(),
		window.scrollTo(0,0)
	},
    watch: {
        '$route'(to, from) {
            this.getCKH(); // Call getCKH when the route changes
        }
    },
  methods: {
		async getCKH() {
            this.xid = this.$route.params.xid
            this.sid = this.$route.params.id
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.bulanx = date
			this.loading = true;
            console.log(this.xid)
            console.log(this.sid)
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapLaporan',{
					bulan: date,
					xid: this.xid,
					id: this.sid,
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

		async get2CKH() {
			const date = this.bulan.year+'-'+(this.bulan.month+1)+'-01'
			this.bulanx = date
            this.sid = this.$route.params.id
            this.xid = this.$route.params.xid
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/rekapLaporan',{
					bulan: date,
                    xid: this.xid,
					id: this.sid,
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
					return item.nama.toLowerCase().includes(this.keyword.toLowerCase()) ||
					item.status.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
        aksiStatus(id,file) {
            let frame = null;
            let isPDF = file.toLowerCase().endsWith('.pdf');
            let isWord = file.toLowerCase().endsWith('.doc') || file.toLowerCase().endsWith('.docx');
            
            if(isWord){
                frame = '<iframe src="https://docs.google.com/gview?url='+ file +'&embedded=true" width="100%" height="550" frameborder="1"></iframe>'
            }else{
                frame = '<iframe src="'+ file +'" width="100%" height="550"></iframe>'
            }

            if (window.innerWidth < 768) {
                this.$swal.fire({
                width: "100%",
				allowOutsideClick: true,
                html: frame,
				input: "textarea",
				inputLabel: "Komentar",
				inputPlaceholder: "Tulis Komentar Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Komentar Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateStatus(id,result.value,'DISETUJUI')
					}
                    else if (result.isDenied) {
						this.updateStatus(id,result.value,'DITOLAK')
					};
				});
            }else{
                this.$swal.fire({
                width: "50%",
                html: frame,
				input: "textarea",
				inputLabel: "Komentar",
				inputPlaceholder: "Tulis Komentar Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Komentar Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateStatus(id,result.value,'DISETUJUI')
					}
                    else if (result.isDenied) {
						this.updateStatus(id,result.value,'DITOLAK')
					};
				});
            }

        },
		async updateStatus(id,komen,st){
			this.loadingaksi[id] = true
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateStatusLaporan',{
					id: id,
					komen: komen,
					status: st,
                    bulan: this.bulanx,
                    xid: this.xid,
                    sid: this.sid
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
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
				this.loadingaksi[id] = false
			}
		},
  }
}
</script>