<template>
  <div v-if="loading" class="opening"></div>
  <div v-else id="app">
    <router-view />
    <CurvedBottomNavigation v-if="!auth" class="d-block d-sm-none" :options="options2" v-model="selected" />
    <CurvedBottomNavigation v-else-if="auth && user.dept.kategori == 'kantor'" class="d-block d-sm-none" :options="options3" v-model="selected" />
    <CurvedBottomNavigation v-else class="d-block d-sm-none" :options="options2" v-model="selected" />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    let auth;
    let user;
    if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'))
            auth = true
        }else{
            auth = false;
        }
    return {
      loading: false,
      user: user,
      auth: auth,
      history: [],
      selected: 1,
      options2: [
        { id: 1, icon: "fas fa-home", title: "HOME", path: "/" },
        {
          id: 2,
          icon: "fas fa-briefcase",
          title: "KINERJA",
          path: "/kinerja-harian"
        },
        { id: 3, icon: "fas fa-rocket", title: "LAYANAN", path: "/UnitKerja"},
        { id: 4, icon: "fas fa-building", title: "SATKER", path: "/satuanKerja/getSeksi"},
        { id: 5, icon: "fas fa-user-circle", title: "PROFIL", path: "/profile"},
      ],
      options3: [
        { id: 1, icon: "fas fa-home", title: "HOME", path: "/" },
        {
          id: 2,
          icon: "fas fa-briefcase",
          title: "KINERJA",
          path: "/kinerja-harian"
        },
        { id: 3, icon: "fas fa-rocket", title: "LAYANAN", path: "/UnitKerja"},
        { id: 4, icon: "fas fa-building", title: "SATKER", path: "/satuanKerja/getSeksi"},
        {
          id: 5,
          icon: "fas fa-user-circle",
          title: "PROFIL",
          childs: [
            { id: 501, icon: "fas fa-user", title: "PROFIL", path: "/profile"},
            { id: 502, icon: "fas fa-user-plus", title: "ADMIN", path: "/admin"},
          ],
        },
      ],
    }
  },
  created() {
    this.cekAuth()
  },
  methods: {
    async cekAuth() {
			this.loading = true;
			try{
				const headers = {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem('token')}`
					};
				const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/cekAuth',{
					source: 'VueJs',
					version: 'Auto Update'
				},{headers})
        if(response.data.success == true){
            if(this.user.sppt == null || this.user.sppt == [] || this.user.sppt.length == 0){
              if (window.innerWidth < 768) {
                this.$swal.fire({
                  width: '400px',
                  height: '350px',
                  title: 'SPT Pajak Tahunan!',
                  html: '<p style="font-size: 17px">Apakah Bpk/Ibu sudah Melaporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ?</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                  icon: "question",
                  imageAlt: "SPT Image",
                  showConfirmButton: true,
                  showDenyButton: true,
                  confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SUDAH DILAPORKAN`,
                  denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;BELUM DILAPORKAN`,
                  showLoaderOnConfirm: true,
                  allowOutsideClick: false,
                  preConfirm: async (addsppt) => {
                    try {
                      const response = this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addSPPT',{
                          userid: this.user.id,
                          tahun:  this.user.sppt_tahun,
                          status: 'sudah'
                      },{headers});
                      return response;
                    } catch (error) {
                      this.$swal.showValidationMessage(`
                        Request failed: ${error}
                      `);
                    }
                  },
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      this.user.sppt= result.value.data.sppt;
                      localStorage.setItem("user",JSON.stringify(this.user));
                      this.$toast.fire({
                        title: 'Terima Kasih telah melaporkan SPT Pajak Tahunan Anda !!!',
                      })
                    }else{
                      if (window.innerWidth < 768) {
                        this.$swal.fire({
                          width: '400px',
                          height: '350px',
                          title: 'Laporkan SPT Tahun 2024!',
                          html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                          icon: "error",
                          closeButton: true,
                        })
                      }else{
                        this.$swal.fire({
                          title: 'Laporkan SPT Tahun 2024!',
                          html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                          imageUrl: import.meta.env.VITE_UPL_API_URL+"appfiles/laporspt1.png",
                          imageWidth: 450,
                          imageHeight: 450,
                          closeButton: true,
                        })
                      }
                    };
                  });
                }else{
                  this.$swal.fire({
                  title: 'SPT Pajak Tahunan!',
                  html: '<p style="font-size: 17px">Apakah Bpk/Ibu sudah Melaporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ?</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                  imageUrl: import.meta.env.VITE_APP_UPL_URL+"appfiles/laporspt1.png",
                  imageWidth: 450,
                  imageHeight: 450,
                  imageAlt: "SPT Image",
                  showConfirmButton: true,
                  showDenyButton: true,
                  confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;SUDAH DILAPORKAN`,
                  denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;BELUM DILAPORKAN`,
                  showLoaderOnConfirm: true,
                  allowOutsideClick: false,
                  preConfirm: async (addsppt) => {
                    try {
                      const response = this.$axios.post(import.meta.env.VITE_APP_API_URL+'/addSPPT',{
                          userid: this.user.id,
                          tahun:  this.user.sppt_tahun,
                          status: 'sudah'
                      },{headers});
                      return response;
                    } catch (error) {
                      this.$swal.showValidationMessage(`
                        Request failed: ${error}
                      `);
                    }
                  },
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      this.user.sppt= result.value.data.sppt;
                      localStorage.setItem("user",JSON.stringify(this.user));
                      this.$toast.fire({
                        title: 'Terima Kasih telah melaporkan SPT Pajak Tahunan Anda !!!',
                      })
                    }else{
                      if (window.innerWidth < 768) {
                        this.$swal.fire({
                          width: '400px',
                          height: '350px',
                          title: 'Laporkan SPT Tahun 2024!',
                          html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                          icon: "error",
                          closeButton: true,
                        })
                      }else{
                        this.$swal.fire({
                          title: 'Laporkan SPT Tahun 2024!',
                          html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                          imageUrl: import.meta.env.VITE_APP_UPL_URL+"appfiles/laporspt1.png",
                          imageWidth: 450,
                          imageHeight: 450,
                          closeButton: true,
                        })
                      }
                    };
                  });
                }
            }else{
              if(this.user.hakses.includes('superadmin') || this.user.hakses.includes('admin')){
                
                let htmlx = "<center><table style='font-size: 14px;'>"
                
                response.data.history.forEach((value, index) => {
                      let fix = JSON.parse(value.deskripsi)
                      htmlx += "<tr><td colspan=2 style='text-align:center'><b style='font-size: 17px'>Versi "+value.versi+"</b></td></tr>"
                      fix.forEach((value1,no)=> {
                        htmlx +="<tr style='text-align:left;font-weight: 400;'><td>"+(no+1)+".</td><td>"+value1+"&nbsp; &#x2713;</td></tr>"
                      });
                      htmlx += "<tr style='font-size: 11px; font-weight: 600; font-style: italic; text-align:center'><td colspan=2>Update : "+value.update+" ("+value.user+")</td></tr>"
                      htmlx += "<tr><td colspan=2>&nbsp</td></tr>"
                });
                htmlx += "</table></center>"

                if(response.data.iklan != 'NONE'){
                  if (window.innerWidth < 768) {
                    this.$swal.fire({
                        html: `
                          <a href="${response.data.iklan.url}" target="_blank">
                            <img src="${response.data.iklan.img}" width="350" height="350" alt="Iklan"></img>
                          </a>
                        `,
                        padding: "0",
                        width: '400px',
                        height: '350px',
                        imageAlt: "Pengumuman",
                        showConfirmButton: false,
                        showCloseButton: true,
                      });
                  }else{
                    this.$swal.fire({
                        html: `
                          <a href="${response.data.iklan.url}" target="_blank">
                            <img src="${response.data.iklan.img}" width="540" height="540" alt="Iklan"></img>
                          </a>
                        `,
                        padding: "0",
                        width: '600px',
                        height: '540px',
                        imageAlt: "Pengumuman",
                        showConfirmButton: false,
                        showCloseButton: true,
                      });
                  }
                }else{
                  this.$swal.fire({
                      title: "Recent Change !!",
                      html: htmlx,
                      icon: 'info',
                      confirmButtonText: `
                        <i class="fa fa-thumbs-up"></i> Mantap!
                      `,
                      timer: 15000,
                      timerProgressBar: true,
                    })
                }

              }else{
                if(this.user.rating.length == 0 || !(this.user.rating)){
                  this.$swal.fire({
                    html: "<span style='font-size: 17px'>Mohon Sedikit Waktu Anda untuk <b>memberikan Rating/Penilaian Pelayanan Kantor Kami (Online / Layanan Langsung di Kantor)</b> !!",
                    imageUrl: "https://silatar.kemenag.go.id/v2/assets/img/ikon/502.png",
                    imageWidth: 450,
                    imageHeight: 450,
                    imageAlt: "Rate Us",
                    showConfirmButton: true,
                    showDenyButton: true,
                    confirmButtonText: `<i class="fa fa-thumbs-up"></i> &nbsp;KASIH PENILAIAN`,
                    denyButtonText: `<i class="fa fa-thumbs-down"></i> &nbsp;NANTI SAJA`,
                    allowOutsideClick: false
                    }).then((result) => {
                      /* Read more about isConfirmed, isDenied below */
                      if (result.isConfirmed) {
                        this.$router.push('/rateUs')
                      } else if (result.isDenied) {
                        if(response.data.iklan != 'NONE'){
                            if (window.innerWidth < 768) {
                              this.$swal.fire({
                                  html: `
                                    <a href="${response.data.iklan.url}" target="_blank">
                                      <img src="${response.data.iklan.img}" width="350" height="350" alt="Iklan"></img>
                                    </a>
                                  `,
                                  padding: "0",
                                  width: '400px',
                                  height: '350px',
                                  imageAlt: "Pengumuman",
                                  showConfirmButton: false,
                                  showCloseButton: true,
                                });
                            }else{
                              this.$swal.fire({
                                  html: `
                                    <a href="${response.data.iklan.url}" target="_blank">
                                      <img src="${response.data.iklan.img}" width="540" height="540" alt="Iklan"></img>
                                    </a>
                                  `,
                                  padding: "0",
                                  width: '600px',
                                  height: '540px',
                                  imageAlt: "Pengumuman",
                                  showConfirmButton: false,
                                  showCloseButton: true,
                                });
                            }
                          }else{
                            this.$swal.fire({
                              imageUrl: "https://silatar.kemenag.go.id/v2/assets/img/ikon/nonrate.png",
                              imageWidth: 450,
                              imageHeight: 450,
                              imageAlt: "Rate Us",
                            });
                          }
                      }
                    });
                }else{
                  if(response.data.iklan != 'NONE'){
                    if (window.innerWidth < 768) {
                              this.$swal.fire({
                                  html: `
                                    <a href="${response.data.iklan.url}" target="_blank">
                                      <img src="${response.data.iklan.img}" width="350" height="350" alt="Iklan"></img>
                                    </a>
                                  `,
                                  padding: "0",
                                  width: '410px',
                                  height: '350px',
                                  imageAlt: "Pengumuman",
                                  showConfirmButton: false,
                                  showCloseButton: true,
                                });
                            }else{
                              this.$swal.fire({
                                  html: `
                                    <a href="${response.data.iklan.url}" target="_blank">
                                      <img src="${response.data.iklan.img}" width="540" height="540" alt="Iklan"></img>
                                    </a>
                                  `,
                                  padding: "0",
                                  width: '600px',
                                  height: '540px',
                                  imageAlt: "Pengumuman",
                                  showConfirmButton: false,
                                  showCloseButton: true,
                                });
                            }
                  }else{
                    this.$toast.fire({
                      title: response.data.message,
                      icon: 'success',
                    })
                  }
                }
              }
            }
        }else{
          this.$toast.fire({
            title: response.data.message,
            icon: 'info',
          })
          localStorage.clear()
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
  .opening { 
  content: "";
  display: block;
  height: 100vh;
  background-color: brown;
  background: url('/waiting.gif') no-repeat center fixed;
  background-size: cover;
}
</style>

