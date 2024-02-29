<template>
    <div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <!-- Dashboard Content -->
            <div v-if="detail == 1" class="dashboard-content">
                    <div class="container">
                        <div class="dash-listingcontent dashboard-info">
                            <div class="dash-cards card">
                                <div class="card-header">
                                    <h4>Daftar Request</h4>
                                    <!-- <router-link class="nav-link header-login add-listing" to="/add-listing"><i
                                            class="fa-solid fa-plus"></i> Add Listing</router-link> -->
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
                                    <div v-if="loading" class="text-center">
                                        <hr>
                                        <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                                        <br>
                                        <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                                        <h3>::: Mohon Tunggu Sebentar :::</h3>
                                        <hr>
                                    </div>
                                    <table v-else class="table table-hover centered">
                                        <thead>
                                            <tr>
                                                <th v-for="column in columns" :key="column.name" @click="sortTable(column.data)" style="max-width: 20px;">
                                                    {{ column.name }}
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
											<tr v-if="this.data.length == 0">
												<td colspan="5" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum Ada Data...</b></td>
											</tr>
                                            <tr v-else v-for="item in paginatedItem" :key="item.id">
                                                <td><b>{{ item.data }}</b><br/>
                                                    <span style="font-size: small; font-style: italic;"><i-bx-comment-detail /> Sumber Data : {{ item.sumber_data }}</span>
                                                </td>
                                                <td>
                                                    <hr/>
                                                    <div v-for="jenis in item.jenis">
                                                        <p style="font-weight:  bold;">{{ jenis.klasifikasi }}</p>
                                                        <div v-for="kategori in item.kategori">
                                                            <p v-if="kategori.klasifikasi == jenis.klasifikasi">&nbsp;&nbsp;&#x2022; {{ kategori.kategori }}  <b v-if="kategori.isi != null">({{ kategori.isi }})</b></p>
                                                        </div>
                                                        <hr/>
                                                    </div>
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
            <div v-if="loadingx" class="text-center">
                <hr>
                <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                <br>
                <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                <h3>::: Mohon Tunggu Sebentar :::</h3>
                <hr>
            </div>
            <div v-if="!loadingx && detail == 2" class="dashboard-content">
                <div ref="scroll1st" class="container">
                    <div  ref="scroll1st" class="pagination">
                        <a class="btn btn-primary" href="#" @click="changedetail(1,0)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                    </div>
                    <hr/>
                    <b-form @submit.prevent="addData">
                    <div class="profile-content">
                        <div class="messages-form">
                            <div class="card">
                                <div class="card-header text-center">
                                    <h3>{{ detaildata.data }}</h3>							
                                </div>
                                <div v-for="jenis in detaildata.jenis">
                                    <div class="card-header">
                                        <h4>{{ jenis.klasifikasi }}</h4>							
                                    </div>
                                    <div class="card-body">
                                            <tr v-for="kategori in this.kategori" :key="kategori.id" class="form-group">
                                                <td v-if="kategori.klasifikasi == jenis.klasifikasi"><label class="col-form-label">{{ kategori.kategori }} <span>*</span></label></td>
                                                <td v-if="kategori.klasifikasi == jenis.klasifikasi">&nbsp;&nbsp; : &nbsp;&nbsp;</td>
                                                <td v-if="kategori.klasifikasi == jenis.klasifikasi"><b-form-input id="kategori" v-model="kategori.isi" type="number" class="form-control pass-input" /></td>
                                            </tr>
                                    </div>
                                    <hr/>
                                </div>
                            </div>
                            <div class="centered">
                                <b-button variant="primary" type="submit" :disabled="loading"> 
                                    <span v-if="!loading"> Kirim</span>
                                    <span v-else><i-svg-spinners-bars-scale-middle />  Assalamualaikum Wr.Wb....</span>
                                </b-button>						
                            </div>
                        </div>			
                    </div>
                    </b-form>
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
            title: "Internal Data",
            text: "Home",
            text1: "Internal Data",
            name: "/",
            data0: [],
            data: [],
            nip: null,
            loading: false,
            loadingx: false,
            itemsPerPage: 12,
        	currentPage: 1,
            columns: [
				{ name: 'Nama Data', data: 'data' },
				{ name: 'Klasifikasi', data: 'jenis' },
			],
            detail: 1,
            detaildata: [],
            kategori: [],
            formx: {
                isi: {}
            }
        }
    },
    computed: {
		tableHeader() {
			return this.columns
		},
		sortedData() {
			// eslint-disable-next-line vue/no-side-effects-in-computed-properties
			return this.data.sort((a, b) => {
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
			return this.data.slice(start, end);
		},
		displayedPages() {
			const start = Math.max(this.currentPage - 1, 1);
			const end = Math.min(start + 2, this.totalPages);
			return Array.from({ length: end - start + 1 }, (_, i) => start + i);
		},
		totalPages() {
            return Math.ceil(this.data.length / this.itemsPerPage);
        },
	},
    created() {
        this.opener(),
        this.date = new Date(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    methods: {
        async opener(){
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/satker/ceksatudata',{
                        id: this.$route.params.id,
                    },{headers})
				
				if(response.data.success == true){
					this.data0 = response.data.data
					this.data = response.data.data
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
        async changedetail(nav,id){
            this.detail = nav;
            if(nav != 1){
                this.loadingx = true;
                try{
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        };
                    const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getInternalData/'+id,{headers})
                    this.detaildata = response.data.data
                    this.kategori = response.data.data.kategori
                    
                } catch (error) {
                    this.$toast.fire({
                        title: error,
                        icon: 'error',
                    })
                } finally {
                    this.loadingx = false
                }

                this.$nextTick(() => {
                    this.$refs.scroll1st.scrollIntoView();
                });
            }
        },
        changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		sortTable(column) {
			if (this.currentSort === column) {
				this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
			} else {
				this.currentSort = column;
				this.currentSortDir = 'asc';
			}

			this.data.sort((a, b) => {
				let modifier = 1;
				if (this.currentSortDir === 'desc') modifier = -1;
				if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
				if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
				return 0;
			});
		},
		filterTable() {
			if (this.keyword === '' || this.keyword == null) {
				this.data = this.data0;
			} else {
				this.data = this.data0.filter((item) => {
					return item.data.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
    }
}
</script>

<style>
.col-form-label{
    font-weight: bold;
}
</style>