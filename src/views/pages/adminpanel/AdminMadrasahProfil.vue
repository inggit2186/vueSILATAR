<template>
  <AdminMadrasahShell
    title="Admin Profil Madrasah"
    description="Kelola profil madrasah yang dipilih dari panel admin."
    :show-empty-state="true"
  >
    <ProfilMadrasahForm />
  </AdminMadrasahShell>
</template>

<script>
import AdminMadrasahShell from './AdminMadrasahShell.vue'
import ProfilMadrasahForm from '@/views/pages/madrasah/ProfilMadrasahForm.vue'

export default {
  name: 'AdminMadrasahProfil',
  components: {
    AdminMadrasahShell,
    ProfilMadrasahForm
  }
}
</script>
