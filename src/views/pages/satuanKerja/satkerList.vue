<template>
    <div class="main-wrapper" style="width: 94%;">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            <route-view :key="$route.fullPath">
            <KantorData />
            </route-view>
            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Satuan Kerja",
            text: "Home",
            text1: "Satuan Kerja",
            name: "/",
        }
    },
}
</script>