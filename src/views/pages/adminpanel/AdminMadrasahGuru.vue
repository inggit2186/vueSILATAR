<template>
  <AdminMadrasahShell
    title="Admin Data Guru Madrasah"
    description="Kelola data guru madrasah yang dipilih dari panel admin."
    :show-empty-state="true"
  >
    <DataGuruMadrasah />
  </AdminMadrasahShell>
</template>

<script>
import AdminMadrasahShell from './AdminMadrasahShell.vue'
import DataGuruMadrasah from '@/views/pages/madrasah/DataGuruMadrasah.vue'

export default {
  name: 'AdminMadrasahGuru',
  components: {
    AdminMadrasahShell,
    DataGuruMadrasah
  }
}
</script>
