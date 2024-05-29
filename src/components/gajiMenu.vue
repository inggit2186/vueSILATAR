<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.name === 'Slip Gaji' }">
                <router-link to="/slipgaji">
                    <i-tdesign-money /> <span>Slip Gaji</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/sliptukin/serdik/mad' || $route.path === '/sliptukin/serdik/pai' }">
                <router-link to="/sliptukin/serdik/mad">
                    <i-ic-baseline-work-history /> <span>Tukin Guru Sertifikasi </span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/sliptukin/nonserdik/mad' || $route.path === '/sliptukin/nonserdik/pai'}">
                <router-link to="/sliptukin/nonserdik/mad">
                    <i-ic-baseline-work-history /> <span>Tukin Guru Non-Sertifikasi </span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/sliptukin/nonguru/all' }">
                <router-link to="/sliptukin/nonguru/all">
                    <i-ic-baseline-work-history /> <span>Tukin Non-Guru </span>
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