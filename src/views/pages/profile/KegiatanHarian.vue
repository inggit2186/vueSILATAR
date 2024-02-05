<template>
    <div class="main-wrapper">
        <usernavbar />
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <kinerjaMenu />
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="card-header">
                                    <h4>Laporan Kinerja Harian</h4>
                                    <!-- <router-link class="nav-link header-login add-listing" to="/add-listing"><i
                                            class="fa-solid fa-plus"></i> Add Listing</router-link> -->
                                </div>
                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
                                        <div class="group-img">
                                            <a class="btn btn-danger" href="#" @click="changedetail(2)" style="float: right;margin-left:20px;"><i-subway-add/> <b>TAMBAH</b></a>
                                            <input type="text" v-model="keyword"  @input="filterTable" class="form-control" placeholder="Search...">
                                            <i class="feather-search"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="table-responsive">
                                    <table class="table table-hover centered">
										<thead>
                                            <tr>
                                                <th v-for="column in columns2" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
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
											<tr v-if="this.kinerja.length == 0">
												<td colspan="6" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
											<tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td><a href="#">{{ item.tanggal }} </a></td>
                                                <td>
                                                   <div v-for="kerja in item.kegiatan" :key="kerja.id">
													{{ kerja.kegiatan }}  <b>({{ kerja.volume }} {{ kerja.satuan }})</b><br/>
												   </div>
                                                </td>
                                                <td>
                                                    <BButton v-if="!loadingaksi[item.id]" pill size="sm" variant="danger" @click.prevent="deleteAksi(item.tanggal)"><b><i-ph-trash-fill /> DELETE</b></BButton>
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

                    <div v-else-if="detail == 2" class="card-body">
                        <div ref="scroll1st" class="container">
                            <div  ref="scroll1st" class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div>
                            <hr/>
                            <b-form @submit.prevent="addKinerja">
                            <div class="profile-content">
                                <div class="messages-form">
                                    <div class="card">
                                        <div class="card-header text-center">
                                            <h2>::: Laporan Kegiatan :::</h2>							
                                        </div>
                                        <div class="card-header">
                                            <h4>Detail Kegiatan Harian</h4>							
                                        </div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="col-form-label">Tanggal <span>*</span></label>								    
                                                <VueDatePicker v-model="tanggal" format="dd MMMM yyyy" placeholder="Tanggal Kegiatan" auto-apply :enable-time-picker="false" required />									   
                                            </div>
                                            <div class="form-group">
                                                <label class="col-form-label">Kegiatan <span>*</span></label>&nbsp;&nbsp;<b-button variant="danger" size="sm" @click="clone()"><i-mingcute-plus-fill />Tambah</b-button>
												<div id="inputArea" v-for="kegiatan in kegiatan" :key="kegiatan.id" style="padding-bottom: 12px;">
                                                	<b-form-input id="kegiatan" v-model="kegiatan.kegiatan" type="text" class="form-control pass-input" placeholder="Kegiatan Anda" style="max-width: 70%;float:left;margin-right: 0.5%;"/>
													<b-form-input id="volume" v-model="kegiatan.volume" type="number" class="form-control pass-input" placeholder="Volume" style="max-width: 9%;float:left;" />
													<b-form-select id="satuan" v-model="kegiatan.satuan" class="form-control pass-input" placeholder="Satuan" style="max-width: 20%;float:right;">
														<b-form-select-option value="" disabled selected>--Pilih Salah Satu--</b-form-select-option>
														<b-form-select-option value="Dokumen">Dokumen</b-form-select-option>
														<b-form-select-option value="Kegiatan">Kegiatan</b-form-select-option>
														<b-form-select-option value="Kali">Kali</b-form-select-option>
														<b-form-select-option value="Laporan">Laporan</b-form-select-option>
														<b-form-select-option value="Modul">Modul</b-form-select-option>
														<b-form-select-option value="Orang">Orang</b-form-select-option>
													</b-form-select>
													<br/>				   
													<br/>				   
												</div>
											</div>
                                        </div>
                                    </div>
                                    <div class="centered">
                                        <b-button variant="primary" type="submit" :disabled="loading"> 
                                            <span v-if="!loading"> Simpan</span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />  Mengirim Laporan....</span>
                                        </b-button>						
                                    </div>
                                </div>			
                            </div>
                            </b-form>
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
        return {
            title: "Daftar Appointment",
            text: "User",
            text1: "Daftar Appointment",
            name: "/",
			columns2: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Kegiatan', data: 'kegiatan' },
				{ name: 'Action', data: 'action' },
			],
			kegiatan: [{
				id: 'kinerja0',
				kegiatan: '',
			}],
			counter:0,
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingaksi: [],
			itemsPerPage: 12,
        	currentPage: 1,
			kinerja: [],
			kinerja0: [],
			tanggal: [],
            detail: 1
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			return this.kinerja.sort((a, b) => {
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
			return this.kinerja.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.kinerja.length / this.itemsPerPage);
        },
	},
  created() {
		this.getKegiatan(),
		window.scrollTo(0,0)
	},
  methods: {
        changedetail(id){
            this.detail = id;
            this.$nextTick(() => {
                this.$refs.scroll1st.scrollIntoView();
            });
        },
		clone(){
			this.kegiatan.push({
				id: `kinerja${++this.counter}`,
				kegiatan: '',
			});
		},
		async deleteAksi(id) {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteKinerjaHarian',{
						tanggal: this.tanggal,
					},{headers})

				if(response.data.success == true){
                    console.log(response.data)
          			this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
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
		async getKegiatan() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/myKinerja',{headers})
				
				if(response.data.success == true){
                    console.log(response.data)
          			this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
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

			this.kinerja.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.kinerja = this.kinerja0;
			} else {
				this.kinerja = this.kinerja0.filter((item) => {
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
		async addKinerja(){
			this.loading = true
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addKinerja',{
                    tanggal: this.tanggal,
                    formx: this.kegiatan,
					n: this.counter
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
					this.kinerja0 = response.data.data
          			this.kinerja = response.data.data
					this.changedetail(1)
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
  }
}
</script>