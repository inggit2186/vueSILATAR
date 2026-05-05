<template>
  <AdminMadrasahShell
    title="Admin Laporan Bulanan Madrasah"
    description="Pantau dan kelola laporan bulanan madrasah yang dipilih dari panel admin."
    :show-empty-state="true"
  >
    <LaporanBulananMadrasah />
  </AdminMadrasahShell>
</template>

<script>
import AdminMadrasahShell from './AdminMadrasahShell.vue'
import LaporanBulananMadrasah from '@/views/pages/madrasah/LaporanBulananMadrasah.vue'

export default {
  name: 'AdminMadrasahLaporanBulanan',
  components: {
    AdminMadrasahShell,
    LaporanBulananMadrasah
  }
}
</script>
