<template>
    <div class="main-wrapper">
        <layouts></layouts>

        <div class="page-wrapper satuan-kerja-page">
            <breadcrumb :title="title" :name="name" :text="text" :text1="text1" />
            <route-view :key="$route.fullPath">
            <ListSatker />
            </route-view>
            <foot /> 

            <scroll />
        </div>
    </div>
</template>

<style scoped>
.satuan-kerja-page {
  background:
    radial-gradient(circle at top, rgba(171, 23, 57, 0.12), transparent 42%),
    linear-gradient(180deg, #1f1216 0%, #120b0f 100%);
}

.satuan-kerja-page :deep(.dashboard-content) {
  padding: 1rem 0 2.5rem;
}

.satuan-kerja-page :deep(.card),
.satuan-kerja-page :deep(.dash-cards),
.satuan-kerja-page :deep(.listMenu.categories-content),
.satuan-kerja-page :deep(.categories-content) {
  background: linear-gradient(180deg, rgba(35, 21, 24, 0.96), rgba(24, 14, 17, 0.96));
  border: 1px solid rgba(214, 171, 76, 0.18);
  color: #fff4dc;
}

.satuan-kerja-page :deep(.card h5),
.satuan-kerja-page :deep(.card h6),
.satuan-kerja-page :deep(.card span),
.satuan-kerja-page :deep(.card p),
.satuan-kerja-page :deep(.card a),
.satuan-kerja-page :deep(.card i) {
  color: #fff4dc;
}

.satuan-kerja-page :deep(.page-link) {
  background: rgba(255, 244, 220, 0.08);
  border-color: rgba(214, 171, 76, 0.2);
  color: #fff4dc;
}

.satuan-kerja-page :deep(.page-item.active .page-link) {
  background: linear-gradient(135deg, #ab1739, #d6ab4c);
  border-color: transparent;
  color: #fff4dc;
}
</style>

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
