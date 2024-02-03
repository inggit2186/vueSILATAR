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
}
</script>