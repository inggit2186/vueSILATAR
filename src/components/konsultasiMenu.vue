<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.path === '/listreq/777' }">
                <router-link to="/listreq/777">
                    <i-game-icons-discussion /> <span>Konsultasi</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/listreq/janjitemu' }">
                <router-link to="/listreq/janjitemu">
                    <i-icon-park-solid-appointment /> <span>Janji Temu / Appointment </span>
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
            };
        }else{
            return {
                loading: false,
                user: {},
                auth: false
            };
        }
	},
}
</script>