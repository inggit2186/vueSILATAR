<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.name === 'Kinerja Harian' }">
                <router-link to="kinerja-harian">
                    <i-mdi-work /> <span>Kinerja Harian</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Laporan Kinerja' }">
                <router-link to="laporankinerja">
                    <i-ic-baseline-work-history /> <span>Laporan Kinerja Bulanan</span>
                </router-link>
            </li>
            <li v-if="user.kat_jabatan == 'kepala'" :class="{ active: $route.name === 'Kinerja Bawahan' }">
                <router-link to="kinerjabawahan">
                    <i-healthicons-security-worker /> <span>Kinerja Bawahan</span>
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