<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>
            <router-view :key="$route.fullPath">
            <LayananMenu />
            </router-view>
            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>
import LayananMenu from './layananMenu.vue';

export default {
    components: { LayananMenu },
    data() {
        return {
            title: "Unit Kerja",
            text: "Home",
            text1: "Unit Kerja",
            text2: "Pelayanan",
            name: "/",
        };
    },
}
</script>