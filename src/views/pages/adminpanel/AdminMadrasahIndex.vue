<template>
  <div class="main-wrapper">
    <layouts></layouts>
    <div class="page-wrapper admin-madrasah-index-page">
      <breadcrumb title="Admin Fitur Madrasah" name="Admin Fitur Madrasah" text="Admin Panel" text1="Madrasah" />

      <div class="dashboard-content">
        <div class="container">
          <AdminMadrasahShell
            title="Admin Fitur Madrasah"
            description="Akses seluruh modul madrasah dari panel admin dengan memilih jenis dan nama madrasah target."
            :show-empty-state="false"
          >
            <div class="overview-card">
              <h4>Ruang Kerja Admin Madrasah</h4>
              <p>Setelah memilih madrasah target, gunakan menu di atas untuk berpindah ke profil, pegawai, guru, laporan semester, dan laporan bulanan tanpa keluar dari area admin.</p>
              <div class="overview-pills">
                <span class="pill">Profil Madrasah</span>
                <span class="pill">Data Pegawai</span>
                <span class="pill">Data Guru</span>
                <span class="pill">Laporan Semester</span>
                <span class="pill">Laporan Bulanan</span>
              </div>
            </div>
          </AdminMadrasahShell>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminMadrasahShell from './AdminMadrasahShell.vue'

export default {
  name: 'AdminMadrasahIndex',
  components: {
    AdminMadrasahShell
  }
}
</script>

<style scoped>
.admin-madrasah-index-page {
  background:
    radial-gradient(circle at top, rgba(170, 24, 58, 0.16), transparent 42%),
    linear-gradient(180deg, #231419 0%, #160d11 100%);
}

.admin-madrasah-index-page .dashboard-content {
  padding: 1.25rem 0 2.5rem;
}

.overview-card {
  background: linear-gradient(180deg, rgba(42, 24, 28, 0.98), rgba(28, 16, 18, 0.98));
  border-radius: 18px;
  border: 1px solid rgba(214, 171, 76, 0.26);
  padding: 1.25rem 1.35rem;
  box-shadow: 0 14px 30px rgba(22, 12, 13, 0.2);
  position: relative;
  overflow: hidden;
}

.overview-card::after {
  content: '';
  position: absolute;
  inset: auto -55px -55px auto;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: rgba(214, 171, 76, 0.08);
}

.overview-card h4 {
  margin: 0 0 0.45rem;
  color: #fff4dc;
}

.overview-card p {
  margin: 0 0 1rem;
  color: rgba(255, 244, 220, 0.78);
  max-width: 920px;
}

.overview-pills {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.pill {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(214, 171, 76, 0.16);
  color: #fff4dc;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid rgba(214, 171, 76, 0.2);
}
</style>
