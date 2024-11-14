<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.path === '/rekaplaporan/Penyuluh/pns' }">
                <router-link to="/rekaplaporan/Penyuluh/pns">
                    <i-streamline-office-worker-solid /> <span>PNS</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/rekaplaporan/Penyuluh/pppk' }">
                <router-link to="/rekaplaporan/Penyuluh/pppk">
                    <i-fluent-person-star-16-filled /> <span>PPPK</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/rekaplaporan/Penyuluh/honorer' }">
                <router-link to="/rekaplaporan/Penyuluh/honorer">
                    <i-clarity-contract-solid /> <span>Honorer</span>
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