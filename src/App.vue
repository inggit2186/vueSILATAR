<template>
  <div v-if="loading" class="opening"></div>
  <div v-else id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      loading: false
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

