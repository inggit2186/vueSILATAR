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
				const response = await this.$axios.get(import.meta.env.VITE_APP_API_URL+'/cekAuth',{headers})
        if(response.data.success == true){
          if(this.user.sppt == null || this.user.sppt == [] || this.user.sppt.length == 0){
              this.$swal.fire({
                title: 'SPT Pajak Tahunan!',
                html: '<p style="font-size: 17px">Apakah Bpk/Ibu sudah Melaporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ?</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                icon: 'question',
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
                      icon: 'success',
                    })
                  }else{
                    this.$swal.fire({
                      title: 'Laporkan SPPT Tahun 2023!',
                      html: '<p style="font-size: 17px">Segera Laporkan <b>SPT Pajak Tahun '+this.user.sppt_tahun+'</b> Bpk/Ibu ya !!!</p><hr/><p style="font-size: 15px">Pelaporan dilakukan di <i><a href="https://djponline.pajak.go.id/" target=_blank>https://djponline.pajak.go.id/</a></i></p>',
                      icon: 'warning',
                      closeButton: true,
                    })
                  };
                });
            }else{
              if(this.user.role = 'petugas'){
                
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

                this.$swal.fire({
                  title: "Recent Change !!",
                  html: htmlx,
                  icon: 'info',
                  confirmButtonText: `
                    <i class="fa fa-thumbs-up"></i> Mantap!
                  `,
                  timer: 5000,
                  timerProgressBar: true,
                })
              }else{
                this.$toast.fire({
                  title: response.data.message,
                  icon: 'success',
                })
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

