<template>
    <<div class="main-wrapper">
        <layouts></layouts>
        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            
            <div class="dashboard-content">		
			<div class="container">
                <div  ref="scroll1st" class="pagination">
                    <a class="btn btn-primary" href="#" @click="$router.go(-1)"><i class="fas fa-regular fa-arrow-left"></i> <b>KEMBALI</b></a>
                </div>
                <hr/>
                <div v-if="loading" class="text-center">
                    <hr>
                    <b-img :src="$assets+'/img/loading.gif'" v-bind="mainProps" rounded alt="loading-gif"></b-img>
                    <br>
                    <i-svg-spinners-bars-scale style="font-size: 2em;"/>
                    <h3>::: Mencari Berkas Dulu :::</h3>
                    <hr>
                </div>
				<div v-else class="profile-content">
                    
                    <div v-if="datax" class="text-center">
                        <b-img :src="$assets+'/img/ikon/404nodata.png'" v-bind="mainProps" rounded width="350%"></b-img>
                        <hr>
                    </div>
				    <div v-else class="card media-section">
						    <div class="card-header centered">
                                <img :src="tamu.avatar" style="max-width: 180px;margin-bottom: 4px;" />
                                <br/><br/>
                                <h5><b>{{ tamu.name }}</b></h5>
                                <h5><BBadge pill variant="primary">{{ tamu.noid }}</BBadge><br/></h5>
                                <h5><BBadge pill variant="secondary">{{ detailtamu.asal }}</BBadge><br/></h5>
                                <hr/>
                                <h4>:: Detail Tujuan ::</h4>
                                <br/>
                                <table style="font-size: medium;font-weight: bolder;align-items: baseline;">
                                    <tr>
                                        <td>Tujuan</td>
                                        <td>&nbsp;&nbsp; : &nbsp;&nbsp;</td>
                                        <td><BBadge pill variant="warning">{{ tujuan.name }}</BBadge></td>
                                    </tr>
                                    <tr>
                                        <td>Keterangan</td>
                                        <td>&nbsp;&nbsp; : &nbsp;&nbsp;</td>
                                        <td style="font-style: italic;">" {{ detailtamu.tujuan }} "</td>
                                    </tr>
                                </table>
                            </div>
                            <div class="card-body centered">
                                <div v-if="detailtamu.status == 'APPOINTMENT' || detailtamu.status == 'PENDING' || detailtamu.status == 'ON SITE'" class="listMenu categories-content" @click="aksi(detailtamu.id)">
                                    <a href="javascript:void(0);" class="text-center aos aos-init aos-animate" data-aos="fade-up">
                                        <img :src="$assets+'/img/ikon/601.png'" style="width:70%;" alt="car1">
                                        <h6>Detail Aksi</h6>
                                    </a>								   
                                </div>
                                <div v-else-if="detailtamu.status == 'DITERIMA'" id="app">
                                    <VueSignaturePad
                                        id="signature"
                                        ref="signaturePad" 
                                        width="300px" 
                                        height="400px"
                                        :options="options"
                                    />
                                    <br/>
                                    <div>
                                        <BButton pill variant="primary" :disabled="loadingttd" @click="save(detailtamu.id)">
                                            <label v-if="!loadingttd">SIMPAN</label>
                                            <label v-else><i-svg-spinners-6-dots-scale-middle /> Menandatangani...</label>
                                        </BButton>&nbsp;&nbsp;&nbsp;
                                        <BButton pill variant="primary" @click="clear">CLEAR</BButton>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="text-center">
                                        <b-img :src="$assets+'/img/ikon/'+detailtamu.status+'.png'" v-bind="mainProps" rounded width="350%"></b-img>
                                    </div>
                                </div>				
							</div>
						</div>				
				</div>
			</div>
		</div>
            <foot />
            <scroll />
        </div>
     </div>>
</template>

<script>
export default {
    data() {
        return {
            title: "Detail Tamu",
            text: "Home",
            text1: "Detail Tamu",
            name: "/",
            tamu: null,
            detailtamu: null,
            tujuan: null,
            datax: false,
            loading: false,
            loadingttd: false,
            ttd: 1,
            options: {
                penColor: "#c0f",
                scaleToDevicePixelRatio: true
            },
        }
    },
    created() {
        this.getDetailTamu(),
        this.date = new Date(),
        this.$nextTick(() => {
            this.$refs.scroll1st.scrollIntoView();
        });
    },
    methods: {
        clear() {
            this.$refs.signaturePad.clearSignature();
        },
        async save(id) {
            if (this.$refs.signaturePad.isEmpty()) {
                this.$toast.fire({
						title: "Kolom Tangan Tanda tidak boleh Kosong!!!",
						icon: 'warning',
					})
            }else{
                this.loadingttd = true
			    try{
                    const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
                    
                    const headers = {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateTamuTTD',{
                        id: id,
                        img: data,
                    },{headers})
                    if(response.data.success == true){
                        this.$toast.fire({
                            title: response.data.message,
                            icon: 'success',
                        })
                        this.detailtamu.status = 'SUKSES';
                    }
                } catch (error) {
                    this.$toast.fire({
                        title: error,
                        icon: 'error',
                    })
                } finally {
                    this.loadingttd = false
                }
            }
        },
        aksi(id) {
            this.$swal.fire({
				input: "textarea",
				inputLabel: "Komentar",
				inputPlaceholder: "Tulis Komentar Anda Disini...",
				inputAttributes: {
					"aria-label": "Tulis Komentar Anda Disini"
				},
				showConfirmButton: true,
				showDenyButton: true,
                confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;LANJUTKAN`,
				denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;BATALKAN`,
				returnInputValueOnDeny: true
				}).then((result) => {
					/* Read more about isConfirmed, isDenied below */
					if (result.isConfirmed) {
						this.updateTamu(id,result.value,'DITERIMA')
					}
                    else if (result.isDenied) {
						this.updateTamu(id,result.value,'DITOLAK')
					};
				});
        },
        async updateTamu(id,komen,st){
			this.loading = true
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/updateTamu',{
					id: id,
					sender: 'staff',
					komen: komen,
					status: st,
				},{headers})
				
				if(response.data.success == true){
					this.$toast.fire({
						title: response.data.message,
						icon: 'success',
					})
                    this.detailtamu.status = st;
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
        async getDetailTamu() {
			this.loading = true;
			try{
                const sid = this.$route.params.id
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/getDetailTamu/'+sid,{headers})

                if(response.data.success == true){
				    this.detailtamu = response.data.detailtamu
				    this.tamu = response.data.tamu
				    this.tujuan = response.data.tujuan
                }else{
                    this.datax = true,
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
<style>
#signature {
    border: double 3px transparent;
    border-radius: 5px;
    background-image: linear-gradient(white, white),
        radial-gradient(circle at top left, #4bc5e8, #9f6274);
    background-origin: border-box;
    background-clip: content-box, border-box;
}</style>