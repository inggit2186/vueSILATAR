<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.name === 'Dashboard' }">
                <router-link to="dashboard">
                    <i class="feather-grid"></i> <span>Dashboard</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Profile' }">
                <router-link to="profile">
                    <i class="fa-solid fa-user"></i> <span>Profile</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'My Listing' }">
                <router-link to="my-listing">
                    <i class="feather-list"></i> <span>My Listing</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Bookmarks' }">
                <router-link to="bookmarks">
                    <i class="fas fa-solid fa-heart"></i> <span>Bookmarks</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Messages' }">
                <router-link to="messages">
                    <i class="fa-solid fa-comment-dots"></i> <span>Messages</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Reviews' }">
                <router-link to="reviews">
                    <i class="fas fa-solid fa-star"></i> <span>Reviews</span>
                </router-link>
            </li>
            <li>
                <b-button variant="primary w-70 logout-btn" :disabled="loading" @click="logout()">
                    <span v-if="!loading"><i class="fas fa-light fa-circle-arrow-left"></i>&nbsp; Logout</span>
                    <span v-else><i-svg-spinners-bars-scale-middle />&nbsp; Good Bye...</span>
                </b-button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
	data() {
        return {
            loading: false
        }
	},
	methods:{
            async logout() {
                try{
                    this.loading = true
                    const headers = {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    };
                    const response = await this.$axios.post(import.meta.env.VITE_APP_API_URL+'/logout', {}, { headers });
                   if(response.data.success == true){
                    localStorage.clear();
                    this.$toast.fire({
                        title: response.data.message,
                        icon: 'success',
                    })
                    this.$router.push('/login');
                   }else{
                    localStorage.clear();
                    this.$router.push('/login');
                   }
                } catch (error) {
                    console.error(error.response.status);
                    if(error.response.status == 401){
                        localStorage.clear();
                        this.$router.push('/login');
                    }
                } finally {
                    this.loading = false;
                }
            },
        },
}
</script>