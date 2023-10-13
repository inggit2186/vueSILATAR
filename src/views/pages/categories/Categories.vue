<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" :text2="text2"/>

            <categorieslist />

            <foot />

            <scroll />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: "Layanan",
            text: "Home",
            text1: "Unit Kerja",
            text2: "Layanan",
            name: "/",
        }
    },
}
</script>