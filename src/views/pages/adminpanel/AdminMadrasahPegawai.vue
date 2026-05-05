<template>
  <AdminMadrasahShell
    title="Admin Data Pegawai Madrasah"
    description="Kelola data pegawai madrasah yang dipilih dari panel admin."
    :show-empty-state="true"
  >
    <DataPegawaiMadrasah />
  </AdminMadrasahShell>
</template>

<script>
import AdminMadrasahShell from './AdminMadrasahShell.vue'
import DataPegawaiMadrasah from '@/views/pages/madrasah/DataPegawaiMadrasah.vue'

export default {
  name: 'AdminMadrasahPegawai',
  components: {
    AdminMadrasahShell,
    DataPegawaiMadrasah
  }
}
</script>
