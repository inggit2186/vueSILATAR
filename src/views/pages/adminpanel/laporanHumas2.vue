<template>
    <div class="main-wrapper">
        <Usernavbar />
        <div class="page-wrapper humas2-page">
            <Breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            	<!-- Dashboard Content -->
                <div class="dashboard-content">
                    <div class="container">
                        <div v-if="detail == 1" class="dash-listingcontent dashboard-info">
                            <div ref="scroll1st" class="dash-cards card">
                                <div class="d-none d-sm-block">
									<div class="card-header">
										<h4>Laporan Kehumasan</h4>
											<VueDatePicker v-model="bulan" style="max-width: 250px; margin-left: 50%;margin-right: 10px;" year-picker auto-apply placeholder="Pilih Tahun" @update:model-value="get2Kegiatan()" />
									</div>
								</div>
								<div class="d-block d-sm-none">
									<div>
										<h4>Laporan Kehumasan</h4>
											<VueDatePicker v-model="bulan" style="float:left; max-width: 60%;margin-right: 10px;" year-picker auto-apply placeholder="Pilih Tahun" @update:model-value="get2Kegiatan()" />
									</div>
								</div>
								<hr/>

                            <div class="card-body">
                                <div class="listing-search">
                                    <div class="filter-content form-group">
                                        <div class="group-img d-none d-sm-block">
                                            <input v-model="keyword" type="text"  class="form-control" placeholder="Cari data..." @input="filterTable">
                                            <i class="feather-search"></i>
                                        </div>
										<div class="group-img d-block d-sm-none">
                                            <input v-model="keyword" type="text"  class="form-control" style="float:left; max-width: 50%;margin-right: 5px;" placeholder="Cari data..." @input="filterTable">
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
                                        <tbody>
                                            <tr v-if="loading">
                                                <td colspan="4"><span style="font-size: 20px;"><i-svg-spinners-blocks-wave /><b> &nbsp;Memuat data...</b></span></td>
                                            </tr>
                                            <tr v-else-if="kinerja.length == 0">
                                                <td colspan="4" style="font-size: 20px;"><b><i-icon-park-twotone-pouting-face /> &nbsp;Belum ada data.</b></td>
                                            </tr>
                                            <template v-else>
                                                <tr v-for="(item,index) in paginatedItem" :key="item.tgl">
                                                    <td>{{ item.tanggal }}</td>
                                                    <td>
                                                        <div v-for="kerja in item.kegiatan" :key="kerja.id">
                                                            <b>{{ kerja.penulis }}</b>
															<p style="font-size: smaller;">{{ kerja.dept }}</p>
                                                        </div>
                                                    </td>
                                                    <td style="font-size: medium; padding: 10px;">
                                                        <div class="d-flex flex-wrap justify-content-center">
														<div v-for="platform in item.platformData.filter(p => (p.data.first.content && p.data.first.content.trim()) || (p.data.last.content && p.data.last.content.trim()))" :key="platform.platform" class="platform-logo mr-4 mb-3" style="cursor: pointer;" @click="selectPlatform(platform)">
                                                            <i :class="platformIcons[platform.platform.toLowerCase()]" class="fa-2x"></i>&nbsp;&nbsp;&nbsp;
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button v-if="!loadingaksi[item.id]" class="btn btn-primary btn-sm rounded-pill" style="font-size: 12px; padding: 2px 8px;" @click.prevent="nilaiHumas(item.id)"><i-fa-check /> VERIFICATION</button>
                                                        <button v-else class="btn btn-outline-primary btn-sm rounded-pill"><i-svg-spinners-bars-scale/> Memuat data...</button>
                                                        <div v-if="item.status === 'DISETUJUI'"><i class="fas fa-check-circle text-success"></i> <i style="font-size: small;">Sudah Diverifikasi</i></div>
                                                        <div v-else-if="item.status === 'DITOLAK'"><i class="fas fa-xmark-circle text-failed"></i> <i style="font-size: small;">Ditolak</i></div>
                                                        <div v-else><i class="fas fa-clock text-warning"></i> <i style="font-size: small;">Belum Diverifikasi</i></div>
                                                        <div v-if="item.status === 'DISETUJUI' || item.status === 'DITOLAK'"><i class="fas fa-user" style="font-size: 10px;"></i> <i style="font-size: 10px;">{{ item.verifikator }}</i></div>
                                                    </td>
													<td>
														<div><i class="fas fa-user"></i> &nbsp;<i>{{ item.userkomen }}</i><br/></div>
														<div v-if="item.status === 'DISETUJUI' || item.status === 'DITOLAK'"><i class="fas fa-user-secret"></i> &nbsp;<i>{{ item.komen }}</i></div>
													</td>
                                                </tr>
                                            </template>
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

                    <div v-else-if="detail == 2" ref="scroll1st" class="card-body">
                        <div class="container">
                            <div  class="pagination">
                                <a class="btn btn-primary" href="#" @click="changedetail(1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                            </div>
                            <hr/>
                            <form ref="kinerja" @submit.prevent="addLaporanHumas">
                            <div class="profile-content">
                                <div class="messages-form">
                                    <div class="card">
                                        <div class="card-header text-center">
                                            <h2>::: Laporan Kehumasan :::</h2>							
                                        </div>
                                        <div class="card-header">
                                            <h4>{{ status }} Detail Kegiatan Humas</h4>							
                                        </div>
                                        <div class="card-body">
                                            <div class="form-group">
                                                <label class="col-form-label">Bulan Pelaporan<span>*</span></label>								    
                                                <VueDatePicker v-if="status == 'Edit'" v-model="tanggal" format="MMMM yyyy" placeholder="Bulan Terbit" month-picker auto-apply readonly/>
                                                <VueDatePicker v-else v-model="tanggal" format="MMMM yyyy" placeholder="Bulan Terbit" month-picker auto-apply required/>
                                            </div>
											<div class="form-group d-none d-sm-block">
                                                <label class="col-form-label">Data Posting per Platform <span>*</span></label>
												<div v-for="platform in platforms" :key="platform" class="platform-card" style="margin-bottom: 20px; border: 1px solid rgba(246, 215, 138, 0.18); border-radius: 16px; padding: 15px; background: linear-gradient(180deg, rgba(47, 20, 21, 0.94) 0%, rgba(36, 18, 19, 0.94) 100%); box-shadow: 0 18px 40px rgba(13, 8, 10, 0.22);">
													<h5 class="text-center" style="margin-bottom: 15px; color: #f6d78a;"><i :class="platformIcons[platform.toLowerCase()]"></i> {{ platform }}</h5>
													<div class="row">
														<div class="col-md-6">
															<div class="posting-section" style="padding: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(246, 215, 138, 0.14); border-radius: 14px; box-shadow: 0 8px 22px rgba(0,0,0,0.12);">
																<h6 style="color:#f6d78a;">Postingan Pertama</h6>
																<div style="display: flex; align-items: center; margin-bottom: 10px;">
																	<i-mdi-calendar style="margin-right: 5px;" />
																	<VueDatePicker v-model="platformData[platform.toLowerCase()].first.date" format="dd MMMM yyyy" placeholder="Tanggal Terbit" auto-apply :enable-time-picker="false" :disabled="!tanggal" :min-date="minDate" :max-date="maxDate" />
																</div>
																<div class="input-group mb-3">
																	<span class="input-group-text"><i-mdi-comment-text /></span>
																	<input v-model="platformData[platform.toLowerCase()].first.content" type="text" class="form-control pass-input" placeholder="Judul Pemberitaan" :disabled="!tanggal" />
																</div>
																<div class="input-group mb-3">
																	<span class="input-group-text"><i-mdi-link /></span>
																	<input v-model="platformData[platform.toLowerCase()].first.link" type="text" class="form-control pass-input" placeholder="Link Pemberitaan" :disabled="!tanggal" />
																</div>
															</div>
														</div>
														<div class="col-md-6">
															<div class="posting-section" style="padding: 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(246, 215, 138, 0.14); border-radius: 14px; box-shadow: 0 8px 22px rgba(0,0,0,0.12);">
																<h6 style="color:#f8ecd1;">Postingan Terakhir</h6>
																<div style="display: flex; align-items: center; margin-bottom: 10px;">
																	<i-mdi-calendar style="margin-right: 5px;" />
																	<VueDatePicker v-model="platformData[platform.toLowerCase()].last.date" format="dd MMMM yyyy" placeholder="Tanggal Terbit" auto-apply :enable-time-picker="false" :disabled="!tanggal" :min-date="minDate" :max-date="maxDate" />
																</div>
																<div class="input-group mb-3">
																	<span class="input-group-text"><i-mdi-comment-text /></span>
																	<input v-model="platformData[platform.toLowerCase()].last.content" type="text" class="form-control pass-input" placeholder="Judul Pemberitaan" :disabled="!tanggal" />
																</div>
																<div class="input-group mb-3">
																	<span class="input-group-text"><i-mdi-link /></span>
																	<input v-model="platformData[platform.toLowerCase()].last.link" type="text" class="form-control pass-input" placeholder="Link Pemberitaan" :disabled="!tanggal" />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="form-group d-block d-sm-none">
                                                <label class="col-form-label">Data Posting per Platform <span>*</span></label>
												<div v-for="platform in platforms" :key="platform" style="padding-bottom: 12px;">
													<h5 style="color:#f6d78a;"><i :class="platformIcons[platform.toLowerCase()]"></i> {{ platform }}</h5>
													<label>Postingan Pertama</label>
													<div style="display: flex; align-items: center; margin-bottom: 5px;">
														<i-mdi-calendar style="margin-right: 5px;" />
														<VueDatePicker v-model="platformData[platform.toLowerCase()].first.date" format="dd MMMM yyyy" placeholder="Tanggal Terbit" auto-apply :enable-time-picker="false" :disabled="!tanggal" :min-date="minDate" :max-date="maxDate" />
													</div>
													<input v-model="platformData[platform.toLowerCase()].first.content" type="text" class="form-control pass-input" placeholder="Judul Pemberitaan" style="margin-bottom: 5px;" :disabled="!tanggal" />
													<input v-model="platformData[platform.toLowerCase()].first.link" type="text" class="form-control pass-input" placeholder="Link Pemberitaan" style="margin-bottom: 5px;" :disabled="!tanggal" />
													<label>Postingan Terakhir</label>
													<div style="display: flex; align-items: center; margin-bottom: 5px;">
														<i-mdi-calendar style="margin-right: 5px;" />
														<VueDatePicker v-model="platformData[platform.toLowerCase()].last.date" format="dd MMMM yyyy" placeholder="Tanggal Terbit" auto-apply :enable-time-picker="false" :disabled="!tanggal" :min-date="minDate" :max-date="maxDate" />
													</div>
													<input v-model="platformData[platform.toLowerCase()].last.content" type="text" class="form-control pass-input" placeholder="Judul Pemberitaan" style="margin-bottom: 5px;" :disabled="!tanggal" />
													<input v-model="platformData[platform.toLowerCase()].last.link" type="text" class="form-control pass-input" placeholder="Link Pemberitaan" style="margin-bottom: 5px;" :disabled="!tanggal" />
													<hr/>
												</div>
											</div>
                                        </div>
                                    </div>
                                    <div class="centered">
                                        <button class="btn btn-primary" type="submit" :disabled="loading">
                                            <span v-if="!loading"> Simpan</span>
                                            <span v-else><i-svg-spinners-bars-scale-middle />  Mengirim Laporan....</span>
                                        </button>
                                    </div>
                                </div>			
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Dashboard Content -->

            <Foot />

            <Scroll />

            <!-- Custom Modal -->
            <div v-if="showModal" class="modal fade show d-flex align-items-center justify-content-center" style="display: block; background-color: rgba(0,0,0,0.5);" @click.self="showModal = false">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content shadow-lg border-0 rounded-3" style="background: linear-gradient(180deg, #261315 0%, #1d1012 100%); color: #f8ecd1; border: 1px solid rgba(246, 215, 138, 0.18);">
                        <div class="modal-header rounded-top-3" style="background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%); color: #fff;">
                            <h5 class="modal-title fw-bold"><i :class="platformIcons[selectedPlatformObj.platform.toLowerCase()]" class="me-2"></i>Data Posting per Platform</h5>
                            <button type="button" class="btn-close btn-close-white" @click="showModal = false"></button>
                        </div>
                        <div v-if="selectedPlatformObj" class="modal-body p-4" style="background: rgba(255,255,255,0.02);">
                            <div class="text-center mb-4">
                                <i :class="platformIcons[selectedPlatformObj.platform.toLowerCase()]" class="fa-3x mb-3" style="color:#f6d78a;"></i>
                                <h4 class="fw-bold">{{ capitalize(selectedPlatformObj.platform) }}</h4>
                            </div>
                            <div class="row g-4">
                                <div class="col-md-6">
                                    <div class="card h-100 border-primary shadow-sm" style="background: rgba(255,255,255,0.03); border-color: rgba(246, 215, 138, 0.18) !important;">
                                        <div class="card-header text-center fw-bold" style="background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%); color: #fff;">
                                            <i class="fas fa-play-circle me-2"></i>Postingan Pertama
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-2 small"><i class="fas fa-calendar-alt me-2" style="color:#f7d77f;"></i><strong>Tanggal:</strong> {{ selectedPlatformObj.data.first.date ? new Date(selectedPlatformObj.data.first.date).toLocaleDateString('id-ID') : '-' }}</p>
                                            <p class="mb-2 small"><i class="fas fa-heading me-2" style="color:#f7d77f;"></i><strong>Judul:</strong> {{ selectedPlatformObj.data.first.content || '-' }}</p>
                                            <p class="mb-0 small"><i class="fas fa-link me-2" style="color:#f7d77f;"></i><strong>Link:</strong> <a v-if="selectedPlatformObj.data.first.link" :href="selectedPlatformObj.data.first.link" target="_blank" class="text-decoration-none" style="color:#fff4dc;">Klik Disini</a><span v-else style="color:rgba(255,244,220,0.8);">-</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card h-100 border-success shadow-sm" style="background: rgba(255,255,255,0.03); border-color: rgba(246, 215, 138, 0.18) !important;">
                                        <div class="card-header text-center fw-bold" style="background: linear-gradient(135deg, #2f5f48 0%, #6a1f2b 100%); color: #fff;">
                                            <i class="fas fa-stop-circle me-2"></i>Postingan Terakhir
                                        </div>
                                        <div class="card-body">
                                            <p class="mb-2 small"><i class="fas fa-calendar-alt me-2" style="color:#f7d77f;"></i><strong>Tanggal:</strong> {{ selectedPlatformObj.data.last.date ? new Date(selectedPlatformObj.data.last.date).toLocaleDateString('id-ID') : '-' }}</p>
                                            <p class="mb-2 small"><i class="fas fa-heading me-2" style="color:#f7d77f;"></i><strong>Judul:</strong> {{ selectedPlatformObj.data.last.content || '-' }}</p>
                                            <p class="mb-0 small"><i class="fas fa-link me-2" style="color:#f7d77f;"></i><strong>Link:</strong> <a v-if="selectedPlatformObj.data.last.link" :href="selectedPlatformObj.data.last.link" target="_blank" class="text-decoration-none" style="color:#fff4dc;">Klik Disini</a><span v-else style="color:rgba(255,244,220,0.8);">-</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer justify-content-center border-0 rounded-bottom-3" style="background: rgba(255,255,255,0.03);">
                            <button type="button" class="btn px-4 py-2 fw-bold" style="background:#f6d78a;color:#241213;border:0;" @click="showModal = false"><i class="fas fa-times me-2"></i>Tutup</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Laporan Kinerja Harian",
            text: "User",
            text1: "Laporan Kinerja Harian",
            name: "/",
			bulan: new Date().getFullYear(),
			columns2: [
				{ name: 'Tanggal', data: 'tanggal' },
				{ name: 'Pengirim', data: 'penulis' },
				{ name: 'Detail', data: 'detail' },
				{ name: 'Action', data: 'action' },
				{ name: 'Komentar', data: 'komen' },
			],
			platforms: ['Facebook', 'Instagram', 'TikTok', 'Website', 'Youtube'],
			platformIcons: {
				facebook: 'fab fa-facebook',
				instagram: 'fab fa-instagram',
				tiktok: 'fab fa-tiktok',
				website: 'fas fa-globe',
				youtube: 'fab fa-youtube'
			},
			platformData: {
				facebook: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
				instagram: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
				tiktok: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
				website: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
				youtube: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
			},
			keyword: '',
			currentSort: '',
      		currentSortDir: 'asc',
			loading: false,
			loadingrekap: false,
			loadingaksi: {},
			itemsPerPage: 12,
        	currentPage: 1,
			kinerja: [],
			kinerja0: [],
			tanggal: null,
            detail: 1,
            status: null,
			showModal: false,
			selectedPlatformObj: null,
			humasstatus: null,
			datex: null,
        }
    },
    computed: {
		apiUrl() {
			return import.meta.env.VITE_APP_UPL_URL;
		},
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
		changedetail(id,st,xid){
            if(st === 'Edit'){
				this.status = st,
				this.detail = id;
				this.tanggal = { year: new Date(this.kinerja[xid].tgl).getFullYear(), month: new Date(this.kinerja[xid].tgl).getMonth() };
				this.platformData = {
					facebook: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					instagram: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					tiktok: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					website: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					youtube: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
				};
				for (let p of this.kinerja[xid].platformData) {
					const lowerKey = p.platform.toLowerCase();
					this.platformData[lowerKey] = p.data;
				}
			}else{
				this.status = st,
				this.detail = id;
				this.platformData = {
					facebook: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					instagram: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					tiktok: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					website: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
					youtube: { first: { date: null, content: '', link: '' }, last: { date: null, content: '', link: '' } },
				},
				this.tanggal = null
			}
            window.scrollTo(0,0)
        },
		delAksi(tgl){
			this.$swal.fire({
					title: 'Apakah anda yakin?',
					text: "Data akan dihapus secara permanen!",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
                    showLoaderOnConfirm: true,
					confirmButtonText: 'Yes, Lanjut Hapus!'
					}).then((result) => {
					if (result.isConfirmed) {
						this.deleteAksi(tgl)
					}
			})
		},
		async deleteAksi(tgl) {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

					console.log(tgl)
					const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/deleteHumas',{
						tgl: tgl,
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
			const today = new Date();
			this.bulan = today.getFullYear();
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

					console.log(this.bulan + '-01-01')
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/adminHumasNew',{
					satker : this.$route.params.id,
					bulan : this.bulan + '-01-01'
				},{headers})

				if(response.data.success == true){
					this.kinerja0 = response.data.data.map(month => {
						let rekap = Array.isArray(month.rekap_status) ? month.rekap_status[0] : month.rekap_status;
						return {
							id: month.id,
							tanggal: month.bulan,
							tgl: month.bulan,
							kegiatan: [{penulis: month.laporan[0].penulis},{dept: month.laporan[0].dept}],
							platformData: month.laporan.map(p => ({platform: p.platform, data: p.data})),
							status: rekap ? rekap.status : null,
							verifikator: rekap ? rekap.verifikator : null,
							userkomen: rekap ? rekap.userkomen : '-',
							komen: rekap ? rekap.komen : '-'
						};
					})
          			this.kinerja = this.kinerja0
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
		async get2Kegiatan() {
			const date = this.bulan + '-01-01'
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};

				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/adminHumasNew',{
					satker : this.$route.params.id,
					bulan : date
				},{headers})
				if(response.data.success == true){
          			this.kinerja0 = response.data.data.map(month => {
						let rekap = Array.isArray(month.rekap_status) ? month.rekap_status[0] : month.rekap_status;
						return {
							id: month.id,
							tanggal: month.bulan,
							tgl: month.bulan,
							kegiatan: [{penulis: month.laporan[0].penulis},{dept: month.laporan[0].dept}],
							platformData: month.laporan.map(p => ({platform: p.platform, data: p.data})),
							status: rekap ? rekap.status : null,
							verifikator: rekap ? rekap.verifikator : null,
							userkomen: rekap ? rekap.userkomen : '-',
							komen: rekap ? rekap.komen : '-'
						};
					})
          			this.kinerja = this.kinerja0
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
		async nilaiHumas(item) {
				this.$swal.fire({
					width: "50%",
					input: "textarea",
					inputLabel: "Feedback Penilaian",
					inputPlaceholder: "Tulis Feedback/Komentar Anda Disini...",
					inputAttributes: {
						"aria-label": "Tulis Feedback/Komentar Anda Disini..."
					},
					showConfirmButton: true,
					showDenyButton: true,
					confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SETUJUI`,
					denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;TOLAK`,
					returnInputValueOnDeny: true
					}).then((result) => {
						console.log(result)
						/* Read more about isConfirmed, isDenied below */
						if(result.isConfirmed) {
							this.updateHumas(item,result.value,'DISETUJUI')
						}
						else if(result.isDenied) {
							this.updateHumas(item,result.value,'DITOLAK')
						};
					});
		},
		async updateHumas(itemid,alasan,status) {
            try{
				this.loadingRequest = true
                const headers = {
								'Content-Type': 'application/json',
								'Authorization': `Bearer ${localStorage.getItem('token')}`
							};
				const date = this.bulan + '-01-01'
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/AupdateHumasNew',{
                    itemid: itemid,
					satker : this.$route.params.id,
					bulan: date,
					status: status,
					keterangan: alasan
				}, {headers})
                
                if(response.data.success == true){
          			this.kinerja0 = response.data.data.map(month => {
						let rekap = Array.isArray(month.rekap_status) ? month.rekap_status[0] : month.rekap_status;
						return {
							id: month.id,
							tanggal: month.bulan,
							tgl: month.bulan,
							kegiatan: [{penulis: month.laporan[0].penulis},{dept: month.laporan[0].dept}],
							platformData: month.laporan.map(p => ({platform: p.platform, data: p.data})),
							status: rekap ? rekap.status : null,
							verifikator: rekap ? rekap.verifikator : null,
							userkomen: rekap ? rekap.userkomen : '-',
							komen: rekap ? rekap.komen : '-'
						};
					})
          			this.kinerja = this.kinerja0
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
				this.loadingRequest = false
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
					return item.tanggal.toLowerCase().includes(this.keyword.toLowerCase());
				});
			}
		},
		changePage(pageNumber) {
			this.currentPage = pageNumber;
		},
		selectPlatform(platformObj) {
			this.selectedPlatformObj = platformObj;
			this.showModal = true;
		},
		capitalize(platform) {
			if (!platform) return '';
			return platform.charAt(0).toUpperCase() + platform.slice(1).toLowerCase();
		},
  }
}
</script>

<style>
.humas2-page .dash-cards,
.humas2-page .card,
.humas2-page .card-header,
.humas2-page .card-body {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.98) 0%, rgba(35, 21, 22, 0.98) 100%) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
  color: #fff4dc !important;
}

.humas2-page .card-header h4,
.humas2-page .card-body,
.humas2-page .card-body span,
.humas2-page .card-body p,
.humas2-page .card-body small,
.humas2-page .table,
.humas2-page .table td,
.humas2-page .table th,
.humas2-page .form-control,
.humas2-page .form-select {
  color: #fff4dc !important;
}

.humas2-page .table thead th {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%) !important;
  color: #fff !important;
}

.humas2-page .table tbody td {
  background: rgba(255, 244, 220, 0.04) !important;
  color: #fff4dc !important;
  border-color: rgba(201, 157, 79, 0.12) !important;
}

.humas2-page .text-muted {
  color: #fff2d1 !important;
}

.humas2-page .modal-body .small,
.humas2-page .modal-body p,
.humas2-page .modal-body span,
.humas2-page .modal-body strong {
  color: #fff4dc !important;
}

.humas2-page .modal-body .small,
.humas2-page .modal-body strong,
.humas2-page .modal-body p,
.humas2-page .modal-body span {
  color: #fff4dc !important;
}

.humas2-page a:not(.btn) {
  color: #f7d77f;
}

.humas2-page a:not(.btn):hover {
  color: #fff4dc;
}

.alert {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
}

.alert-info {
  background: rgba(201, 157, 79, 0.12);
  border-color: rgba(201, 157, 79, 0.18);
  color: #fff4dc;
}

/* Hide the default file input */
input[type="file"] {
    display: none;
}

/* Style the custom file upload label */
.custom-file-upload {
    display: inline-block;
    padding: 8px 10px;
    cursor: pointer;
    background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
    color: #fff4dc;
    border-radius: 6px;
    font-size: 16px;
	font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	font-weight: 600;
    transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
    background: linear-gradient(135deg, #6a1f2b 0%, #9a5925 100%);
}

.custom-file-upload i {
    margin-right: 5px;
}
</style>
