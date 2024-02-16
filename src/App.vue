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
          this.$toast.fire({
            title: response.data.message,
            icon: 'success',
          })
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

