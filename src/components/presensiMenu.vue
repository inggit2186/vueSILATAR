<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.name === 'Rekap Presensi ASN' || $route.name === 'List ASN Admin' }">
                <router-link v-if="sid == 'admin'" to="/admin/asnlist">
                    <i-heroicons-finger-print-16-solid /> <span>Rekap Presensi</span>
                </router-link>
                <router-link v-else to="rekappresensiasn">
                    <i-heroicons-finger-print-16-solid /> <span>Rekap Presensi</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Laporan Ketidakhadiran' }">
                <router-link to="laporanketidakhadiran">
                    <i-mdi-plane-car /> <span>Laporan Ketidakhadiran</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Laporan Pengaduan' }">
                <router-link to="laporanpengaduan">
                    <i-fluent-notebook-error-20-filled /> <span>Laporan Pengaduan</span>
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