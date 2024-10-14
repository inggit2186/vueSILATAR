<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.name === 'My Listing' }">
                <router-link to="my-listing">
                    <i-tdesign-service /> <span>Pelayanan</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'My Konsultasi' }">
                <router-link to="my-konsultasi">
                    <i-game-icons-discussion /> <span>Konsultasi</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'User Appointment' }">
                <router-link to="user-appointment">
                    <i-icon-park-solid-appointment /> <span>Appointment</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
	data() {
        if (localStorage.getItem('user')) {
            const user = JSON.parse(localStorage.getItem('user'))
            const pp = import.meta.env.VITE_APP_ST_URL+'/'+user.noid+'/'+user.pp
            
            return {
                loading: false,
                user: user,
                pp: pp || '../assets/img/profile-img.jpg',
                auth: true,
                sid: this.$route.params.id
            };
        }else{
            return {
                loading: false,
                user: {},
                auth: false,
                sid: this.$route.params.id
            };
        }
	},
}
</script>