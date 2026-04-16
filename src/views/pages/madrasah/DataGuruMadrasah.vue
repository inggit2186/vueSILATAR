<template>
  <DataPegawaiMadrasah
    entity-singular="Guru"
    entity-plural="Guru"
    header-title="Data Guru Madrasah Dilingkungan Kemenag Tanah Datar"
    empty-table-text="Tidak ada data guru"
    storage-key="madrasah_data_guru"
    endpoint-path="/madrasah/guru"
    :show-guru-fields="true"
  />
</template>

<script setup>
import DataPegawaiMadrasah from './DataPegawaiMadrasah.vue'
</script>
