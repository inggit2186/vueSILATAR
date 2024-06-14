<template>
    <div class="">
        <ul class="dashborad-menus">
            <li :class="{ active: $route.path === '/satuanKerja/getSeksi' }">
                <router-link to="getSeksi">
                    <i class="feather-grid"></i> <span>Kantor</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/satuanKerja/getKUA' }">
                <router-link to="getKUA">
                    <i class="fa-solid fa-mosque"></i> <span>KUA</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/satuanKerja/getMIN' }">
                <router-link to="getMIN">
                    <i class="fas fa-solid fa-school"></i> <span>MIN</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/satuanKerja/getMTsN' }">
                <router-link to="getMTsN">
                    <i class="fas fa-solid fa-hotel"></i> <span>MTsN</span>
                </router-link>
            </li>
            <li :class="{ active: $route.path === '/satuanKerja/getMAN' }">
                <router-link to="getMAN">
                    <i class="fas fa-solid fa-university"></i> <span>MAN</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Lainnya' }">
                <router-link :to="'/Satker/999'">
                    <i class="fas fa-solid fa-chess-rook"></i> <span>Swasta / Lainnya</span>
                </router-link>
            </li>
            <li :class="{ active: $route.name === 'Lainnya' }">
                <router-link :to="'/Satker/998'">
                    <i class="fas fa-solid fa-city"></i> <span>Pemerintah Daerah</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>