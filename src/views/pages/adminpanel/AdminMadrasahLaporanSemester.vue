<template>
  <AdminMadrasahShell
    title="Admin Laporan Semester Madrasah"
    description="Pantau dan kelola laporan semester madrasah yang dipilih dari panel admin."
    :show-empty-state="true"
  >
    <LaporanSemesterMadrasah />
  </AdminMadrasahShell>
</template>

<script>
import AdminMadrasahShell from './AdminMadrasahShell.vue'
import LaporanSemesterMadrasah from '@/views/pages/madrasah/LaporanSemesterMadrasah.vue'

export default {
  name: 'AdminMadrasahLaporanSemester',
  components: {
    AdminMadrasahShell,
    LaporanSemesterMadrasah
  }
}
</script>
