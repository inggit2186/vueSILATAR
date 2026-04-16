<template>
  <div class="main-wrapper">
    <layouts></layouts>
    <div class="page-wrapper">
      <breadcrumb
        title="Laporan Bulanan Madrasah"
        name="Laporan Bulanan"
        text="Madrasah"
        text1="Input Data"
      />

      <div class="dashboard-content">
        <div class="container">
          <div class="report-shell">
            <MadrasahHeaderMenu />
            <div class="hero">
              <div>
                <h2>Form Input Laporan Bulanan {{ madrasahTypeLabel }}</h2>
                <p>Input data rekap siswa per kelas dan data siswa mutasi, mengundurkan diri, atau drop out.</p>
              </div>
              <div class="hero-actions">
                <b-button variant="outline-light" @click="resetAll">
                  <i class="feather-refresh-ccw"></i> Reset Semua
                </b-button>
                <b-button variant="primary" @click="saveDraft">
                  <i class="feather-save"></i> Simpan Draft
                </b-button>
              </div>
            </div>

            <div class="card-section">
              <div class="section-header">
                <div class="section-title-block">
                  <h4>Informasi Laporan</h4>
                  <div class="section-compact-preview">
                    <span class="compact-pill">{{ reportPeriodLabel || 'Periode belum diisi' }}</span>
                    <span class="compact-pill">{{ formData.namaMadrasah || 'Nama madrasah belum diisi' }}</span>
                    <span class="compact-pill">RB {{ formData.rb || 0 }}</span>
                  </div>
                </div>
                <button type="button" class="section-toggle-btn" @click="toggleSection('reportInfo')">
                  <span class="toggle-btn-icon">
                    <i class="feather-layout"></i>
                  </span>
                  <span class="toggle-btn-text">
                    <small>{{ sectionStates.reportInfo ? 'Sembunyikan Detail' : 'Tampilkan Detail' }}</small>
                    <strong>{{ sectionStates.reportInfo ? 'Collapse' : 'Expand' }}</strong>
                  </span>
                  <span class="toggle-btn-arrow">
                    <i :class="sectionStates.reportInfo ? 'feather-chevron-up' : 'feather-chevron-down'"></i>
                  </span>
                </button>
              </div>
              <div v-if="sectionStates.reportInfo" class="info-grid">
                <div class="input-block">
                  <label>Bulan</label>
                  <input v-model="formData.reportMonth" type="text" placeholder="Contoh: Januari">
                </div>
                <div class="input-block">
                  <label>Tahun</label>
                  <input v-model="formData.reportYear" type="number" min="2000" placeholder="2026">
                </div>
                <div class="input-block">
                  <label>Tahun Ajaran</label>
                  <input v-model="formData.schoolYear" type="text" placeholder="2025 / 2026">
                </div>
                <div class="input-block">
                  <label>Semester</label>
                  <select v-model="formData.semester">
                    <option value="Genap">Genap</option>
                    <option value="Ganjil">Ganjil</option>
                  </select>
                </div>
                <div class="input-block">
                  <label>Nama Madrasah</label>
                  <input v-model="formData.namaMadrasah" type="text" placeholder="Nama madrasah">
                </div>
                <div class="input-block">
                  <label>RB</label>
                  <input v-model.number="formData.rb" type="number" min="0" placeholder="0">
                </div>
                <div class="input-block span-2">
                  <label>Kantor / Instansi</label>
                  <input v-model="formData.officeName" type="text" placeholder="Kantor Kementerian Agama Kab. Tanah Datar">
                </div>
              </div>
            </div>

            <div class="card-section">
              <div class="section-header section-header-stack">
                <div class="section-title-block">
                  <h4>Keadaan Siswa {{ madrasahTypeLabel }} Semester {{ formData.semester }} Tahun Ajaran {{ formData.schoolYear }}</h4>
                  <p class="section-subtitle">Mode input dibuat lebih ringkas per jenjang agar lebih cepat diisi dan lebih nyaman dibaca.</p>
                  <div class="section-compact-preview">
                    <span class="compact-pill">Total {{ grandTotal }} siswa</span>
                    <span class="compact-pill">{{ grandTotalByKey('l') }} laki-laki</span>
                    <span class="compact-pill">{{ grandTotalByKey('p') }} perempuan</span>
                    <span class="compact-pill">{{ madrasahClassLevelCount }} tingkat kelas</span>
                  </div>
                </div>
                <button type="button" class="section-toggle-btn" @click="toggleSection('studentCondition')">
                  <span class="toggle-btn-icon">
                    <i class="feather-bar-chart-2"></i>
                  </span>
                  <span class="toggle-btn-text">
                    <small>{{ sectionStates.studentCondition ? 'Sembunyikan Detail' : 'Tampilkan Detail' }}</small>
                    <strong>{{ sectionStates.studentCondition ? 'Collapse' : 'Expand' }}</strong>
                  </span>
                  <span class="toggle-btn-arrow">
                    <i :class="sectionStates.studentCondition ? 'feather-chevron-up' : 'feather-chevron-down'"></i>
                  </span>
                </button>
              </div>

              <div v-if="sectionStates.studentCondition" class="report-heading">
                <h3>Laporan Bulanan {{ madrasahTypeLabel }}</h3>
                <p>{{ formData.officeName || 'Kantor Kementerian Agama Kab. Tanah Datar' }}</p>
                <span>Bulan: {{ reportPeriodLabel }}</span>
              </div>

              <div v-if="sectionStates.studentCondition" class="student-overview">
                <div class="summary-card identity-card">
                  <span class="summary-label">Madrasah</span>
                  <strong>{{ formData.namaMadrasah || 'Belum diisi' }}</strong>
                  <small>RB {{ formData.rb || 0 }}</small>
                </div>
                <div class="summary-card">
                  <span class="summary-label">Total Laki-laki</span>
                  <strong>{{ grandTotalByKey('l') }}</strong>
                </div>
                <div class="summary-card">
                  <span class="summary-label">Total Perempuan</span>
                  <strong>{{ grandTotalByKey('p') }}</strong>
                </div>
                <div class="summary-card highlight-card">
                  <span class="summary-label">Total Siswa</span>
                  <strong>{{ grandTotal }}</strong>
                </div>
              </div>

              <div v-if="sectionStates.studentCondition" class="student-level-grid">
                <div v-for="level in classLevels" :key="level.name" class="level-card">
                  <div class="level-card-header">
                    <div>
                      <h5>{{ level.name }}</h5>
                      <p>{{ level.classes.length }} rombel</p>
                    </div>
                    <div class="level-header-actions">
                      <button type="button" class="add-class-btn" @click="addClassRoom(level.name)">
                        <i class="feather-plus"></i> Tambah Rombel
                      </button>
                      <div class="level-badge">
                        Total {{ levelGrandTotal(level) }}
                      </div>
                    </div>
                  </div>

                  <div class="class-list">
                    <div v-for="classItem in level.classes" :key="classItem.code" class="class-card">
                      <div class="class-card-top">
                        <div class="class-card-title">
                          <strong>{{ classItem.code }}</strong>
                          <span>{{ classTotal(classItem.code) }} siswa</span>
                        </div>
                        <button
                          type="button"
                          class="delete-class-btn"
                          @click="removeClassRoom(level.name, classItem.code)"
                        >
                          <i class="feather-trash-2"></i>
                        </button>
                      </div>

                      <div class="gender-input-grid">
                        <label>
                          <span>L</span>
                          <input v-model.number="formData.studentCounts[classItem.code].l" type="number" min="0">
                        </label>
                        <label>
                          <span>P</span>
                          <input v-model.number="formData.studentCounts[classItem.code].p" type="number" min="0">
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="level-total-bar">
                    <div>
                      <span>Laki-laki</span>
                      <strong>{{ levelTotal(level, 'l') }}</strong>
                    </div>
                    <div>
                      <span>Perempuan</span>
                      <strong>{{ levelTotal(level, 'p') }}</strong>
                    </div>
                    <div>
                      <span>Total</span>
                      <strong>{{ levelGrandTotal(level) }}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card-section">
              <div class="section-header">
                <div class="section-title-block">
                  <h4>Data Siswa Mutasi / Mengundurkan Diri / DO</h4>
                  <p class="section-subtitle">Input dibuat dalam bentuk kartu agar lebih rapi, fokus, dan nyaman saat mengisi data siswa satu per satu.</p>
                  <div class="section-compact-preview">
                    <span class="compact-pill">Total {{ formData.mutationRows.length }} data</span>
                    <span class="compact-pill">{{ mutationTypeCount('Mutasi Masuk') }} mutasi masuk</span>
                    <span class="compact-pill">{{ mutationTypeCount('Mutasi Keluar') }} mutasi keluar</span>
                    <span class="compact-pill">{{ mutationTypeCount('Mengundurkan Diri') + mutationTypeCount('DO') }} keluar non-mutasi</span>
                  </div>
                </div>
                <div class="section-actions">
                  <button type="button" class="section-toggle-btn" @click="toggleSection('mutations')">
                    <span class="toggle-btn-icon">
                      <i class="feather-users"></i>
                    </span>
                    <span class="toggle-btn-text">
                      <small>{{ sectionStates.mutations ? 'Sembunyikan Detail' : 'Tampilkan Detail' }}</small>
                      <strong>{{ sectionStates.mutations ? 'Collapse' : 'Expand' }}</strong>
                    </span>
                    <span class="toggle-btn-arrow">
                      <i :class="sectionStates.mutations ? 'feather-chevron-up' : 'feather-chevron-down'"></i>
                    </span>
                  </button>
                </div>
              </div>

              <div v-if="sectionStates.mutations" class="expanded-section-actions">
                <b-button size="sm" variant="outline-secondary" @click="resetMutations">
                  <i class="feather-refresh-ccw"></i> Reset
                </b-button>
                <b-button size="sm" variant="outline-primary" @click="addMutationRow">
                  <i class="feather-plus"></i> Tambah Baris
                </b-button>
              </div>

              <div v-if="sectionStates.mutations && formData.mutationRows.length" class="mutation-summary">
                <div class="mutation-stat">
                  <span>Total Data</span>
                  <strong>{{ formData.mutationRows.length }}</strong>
                </div>
                <div v-for="option in mutationTypeOptions" :key="option.value" class="mutation-stat soft">
                  <span>{{ option.label }}</span>
                  <strong>{{ mutationTypeCount(option.value) }}</strong>
                </div>
              </div>

              <div v-if="sectionStates.mutations && formData.mutationRows.length" class="mutation-card-list">
                <div
                  v-for="(row, index) in formData.mutationRows"
                  :key="`mutation-${index}`"
                  class="mutation-card"
                >
                  <div class="mutation-card-header">
                    <div>
                      <span class="mutation-card-index">Data {{ index + 1 }}</span>
                      <h5>{{ row.namaSiswa || 'Siswa belum diisi' }}</h5>
                    </div>
                    <div class="mutation-card-actions">
                      <span class="mutation-type-badge" :class="{ empty: !row.keterangan }">
                        {{ mutationTypeLabel(row.keterangan) }}
                      </span>
                      <button type="button" class="delete-row-btn delete-row-btn-lg" @click="removeMutationRow(index)">
                        <i class="feather-trash-2"></i>
                      </button>
                    </div>
                  </div>

                  <div class="mutation-form-grid">
                    <div class="input-block span-2">
                      <label>Nama Siswa</label>
                      <input v-model="row.namaSiswa" type="text" placeholder="Nama siswa">
                    </div>
                    <div class="input-block">
                      <label>Jenis Data</label>
                      <select v-model="row.keterangan">
                        <option value="">Pilih jenis data</option>
                        <option v-for="option in mutationTypeOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </div>
                    <div class="input-block">
                      <label>Kelas</label>
                      <select v-model="row.kelas">
                        <option value="">Pilih kelas</option>
                        <option v-for="option in mutationClassOptions" :key="option" :value="option">
                          {{ option }}
                        </option>
                      </select>
                    </div>
                    <div class="input-block">
                      <label>NISN</label>
                      <input v-model="row.nisn" type="text" placeholder="NISN">
                    </div>
                    <div class="input-block">
                      <label>NIK</label>
                      <input v-model="row.nik" type="text" placeholder="NIK">
                    </div>
                    <div class="input-block">
                      <label>Jenis Kelamin</label>
                      <select v-model="row.jenisKelamin">
                        <option value="">Pilih jenis kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                      </select>
                    </div>
                    <div class="input-block">
                      <label>Tempat Lahir</label>
                      <input v-model="row.tempatLahir" type="text" placeholder="Tempat lahir">
                    </div>
                    <div class="input-block">
                      <label>Tanggal Lahir</label>
                      <input v-model="row.tanggalLahir" type="date">
                    </div>
                    <div class="input-block span-2">
                      <label>Nama Ibu Kandung</label>
                      <input v-model="row.namaIbuKandung" type="text" placeholder="Nama ibu kandung">
                    </div>
                  </div>
                </div>
              </div>

              <div v-else-if="sectionStates.mutations" class="mutation-empty-state">
                <div class="empty-state-icon">
                  <i class="feather-users"></i>
                </div>
                <h5>Belum ada data siswa</h5>
                <p>Tambahkan data mutasi, mengundurkan diri, atau DO dengan tombol "Tambah Baris".</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MadrasahHeaderMenu from '@/components/MadrasahHeaderMenu.vue'
import {
  canAccessMadrasah,
  getMadrasahClassLevelCount,
  getMadrasahClassLevelsForCategory,
  getMadrasahLabel,
  getStoredUser
} from '@/utils/madrasahAccess'

const DRAFT_KEY = 'madrasah_laporan_bulanan_draft'

const getCurrentMadrasahCategory = () => String(getStoredUser()?.dept?.kategori || '').trim().toLowerCase()

const cloneClassLevels = (category = getCurrentMadrasahCategory()) =>
  JSON.parse(JSON.stringify(
    getMadrasahClassLevelsForCategory(category).map((level) => ({
      ...level,
      classes: [{ code: `${level.prefix}.A` }, { code: `${level.prefix}.B` }, { code: `${level.prefix}.C` }]
    }))
  ))

const createStudentCounts = (category = getCurrentMadrasahCategory()) =>
  cloneClassLevels(category).flatMap((level) => level.classes).reduce((result, classItem) => {
    result[classItem.code] = {
      l: 0,
      p: 0
    }
    return result
  }, {})

const createMutationRow = () => ({
  namaSiswa: '',
  nisn: '',
  nik: '',
  jenisKelamin: '',
  tempatLahir: '',
  tanggalLahir: '',
  namaIbuKandung: '',
  kelas: '',
  keterangan: ''
})

const createDefaultFormData = (category = getCurrentMadrasahCategory()) => ({
  reportMonth: 'Januari',
  reportYear: new Date().getFullYear(),
  schoolYear: '2025 / 2026',
  semester: 'Genap',
  officeName: 'Kantor Kementerian Agama Kab. Tanah Datar',
  namaMadrasah: '',
  rb: 0,
  studentCounts: createStudentCounts(category),
  mutationRows: Array.from({ length: 3 }, () => createMutationRow())
})

export default {
  name: 'LaporanBulananMadrasah',
  components: {
    MadrasahHeaderMenu
  },
  data() {
    const category = getCurrentMadrasahCategory()
    return {
      formData: createDefaultFormData(category),
      classLevels: cloneClassLevels(category),
      madrasahCategory: category,
      sectionStates: {
        reportInfo: false,
        studentCondition: false,
        mutations: false
      },
      mutationTypeOptions: [
        { value: 'Mutasi Masuk', label: 'Mutasi Masuk' },
        { value: 'Mutasi Keluar', label: 'Mutasi Keluar' },
        { value: 'Mengundurkan Diri', label: 'Mengundurkan Diri' },
        { value: 'DO', label: 'Drop Out (DO)' }
      ]
    }
  },
  computed: {
    madrasahAllowed() {
      return canAccessMadrasah()
    },
    madrasahTypeLabel() {
      return getMadrasahLabel()
    },
    madrasahClassLevelCount() {
      return getMadrasahClassLevelCount()
    },
    grandTotal() {
      return this.grandTotalByKey('l') + this.grandTotalByKey('p')
    },
    mutationClassOptions() {
      return this.classLevels.flatMap((level) => level.classes.map((classItem) => classItem.code))
    },
    reportPeriodLabel() {
      return `${this.formData.reportMonth || '-'} ${this.formData.reportYear || ''}`.trim()
    }
  },
  mounted() {
    if (!this.madrasahAllowed) {
      this.$router.push('/')
      return
    }

    const draft = localStorage.getItem(DRAFT_KEY)
    if (!draft) return

    try {
      const parsed = JSON.parse(draft)
      const defaults = createDefaultFormData(this.madrasahCategory)

      this.formData = {
        ...defaults,
        ...parsed,
        studentCounts: {
          ...defaults.studentCounts,
          ...(parsed.studentCounts || {})
        },
        mutationRows: Array.isArray(parsed.mutationRows) && parsed.mutationRows.length
          ? parsed.mutationRows
          : defaults.mutationRows
      }

      this.classLevels = cloneClassLevels(this.madrasahCategory)

      this.ensureStudentCounts()
    } catch (error) {
      console.error('Gagal membaca draft laporan bulanan madrasah', error)
    }
  },
  methods: {
    asNumber(value) {
      return Number(value) || 0
    },
    classTotal(classCode) {
      const row = this.formData.studentCounts[classCode] || {}
      return this.asNumber(row.l) + this.asNumber(row.p)
    },
    levelTotal(level, key) {
      return level.classes.reduce((sum, classItem) => {
        const row = this.formData.studentCounts[classItem.code] || {}
        return sum + this.asNumber(row[key])
      }, 0)
    },
    levelGrandTotal(level) {
      return this.levelTotal(level, 'l') + this.levelTotal(level, 'p')
    },
    grandTotalByKey(key) {
      return this.classLevels.reduce((sum, level) => sum + this.levelTotal(level, key), 0)
    },
    ensureStudentCounts() {
      const activeCodes = this.classLevels.flatMap((level) => level.classes.map((classItem) => classItem.code))
      const nextCounts = {}

      activeCodes.forEach((code) => {
        nextCounts[code] = {
          l: this.asNumber(this.formData.studentCounts?.[code]?.l),
          p: this.asNumber(this.formData.studentCounts?.[code]?.p)
        }
      })

      this.formData.studentCounts = nextCounts
    },
    toggleSection(section) {
      this.sectionStates[section] = !this.sectionStates[section]
    },
    nextSuffix(index) {
      return String.fromCharCode(65 + index)
    },
    addClassRoom(levelName) {
      const level = this.classLevels.find((item) => item.name === levelName)
      if (!level) return

      const nextCode = `${level.prefix}.${this.nextSuffix(level.classes.length)}`
      level.classes.push({ code: nextCode })
      this.formData.studentCounts = {
        ...this.formData.studentCounts,
        [nextCode]: { l: 0, p: 0 }
      }
    },
    removeClassRoom(levelName, classCode) {
      const level = this.classLevels.find((item) => item.name === levelName)
      if (!level || level.classes.length === 1) {
        this.$toast.fire({
          title: 'Minimal harus ada satu rombel di setiap kelas',
          icon: 'warning'
        })
        return
      }

      level.classes = level.classes.filter((classItem) => classItem.code !== classCode)
      this.ensureStudentCounts()
    },
    mutationTypeCount(type) {
      return this.formData.mutationRows.filter((row) => row.keterangan === type).length
    },
    mutationTypeLabel(type) {
      const option = this.mutationTypeOptions.find((item) => item.value === type)
      return option ? option.label : 'Belum dipilih'
    },
    addMutationRow() {
      this.formData.mutationRows.push(createMutationRow())
    },
    removeMutationRow(index) {
      this.formData.mutationRows.splice(index, 1)
    },
    resetMutations() {
      this.formData.mutationRows = createDefaultFormData(this.madrasahCategory).mutationRows
      this.$toast.fire({
        title: 'Data mutasi siswa berhasil direset',
        icon: 'info'
      })
    },
    resetAll() {
      this.formData = createDefaultFormData(this.madrasahCategory)
      this.classLevels = cloneClassLevels(this.madrasahCategory)
      localStorage.removeItem(DRAFT_KEY)
      this.$toast.fire({
        title: 'Form laporan bulanan berhasil direset',
        icon: 'info'
      })
    },
    saveDraft() {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        ...this.formData,
        classLevels: this.classLevels
      }))
      this.$toast.fire({
        title: 'Draft laporan bulanan berhasil disimpan',
        icon: 'success'
      })
    }
  }
}
</script>

<style scoped>
.report-shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.hero {
  background: linear-gradient(135deg, #1f3c88, #3f72af);
  color: #fff;
  border-radius: 14px;
  padding: 1.2rem 1.4rem;
  box-shadow: 0 12px 28px rgba(22, 44, 92, 0.25);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.hero h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.hero p {
  margin: 0;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.card-section {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #dce3f0;
  box-shadow: 0 8px 20px rgba(25, 39, 68, 0.08);
  padding: 0.9rem;
}

.card-section h4 {
  margin: 0;
  color: #213555;
  font-size: 0.97rem;
  font-weight: 700;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.section-header-stack {
  align-items: flex-start;
}

.section-title-block {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.section-subtitle {
  margin: 0.2rem 0 0;
  color: #6c7a92;
  font-size: 0.82rem;
}

.section-compact-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.compact-pill {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0.35rem 0.7rem;
  border-radius: 999px;
  border: 1px solid #d7e2f2;
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
  color: #50617f;
  font-size: 0.75rem;
  font-weight: 700;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.expanded-section-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 0.9rem;
}

.section-toggle-btn {
  border: 1px solid #d4deef;
  background: linear-gradient(135deg, #f9fbff 0%, #eef4ff 100%);
  color: #23395b;
  border-radius: 16px;
  min-height: 50px;
  padding: 0.5rem 0.7rem;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  flex-shrink: 0;
  box-shadow: 0 8px 18px rgba(39, 64, 112, 0.08);
}

.section-toggle-btn:hover {
  background: linear-gradient(135deg, #f2f7ff 0%, #e5efff 100%);
  border-color: #bacbe5;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(39, 64, 112, 0.12);
}

.toggle-btn-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: linear-gradient(135deg, #1f3c88 0%, #3f72af 100%);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  flex-shrink: 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22);
}

.toggle-btn-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.1;
  text-align: left;
}

.toggle-btn-text small {
  font-size: 0.68rem;
  color: #6b7b95;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.toggle-btn-text strong {
  font-size: 0.82rem;
  color: #23395b;
  font-weight: 800;
}

.toggle-btn-arrow {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(31, 60, 136, 0.08);
  color: #2b4e93;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.1rem;
  flex-shrink: 0;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.span-2 {
  grid-column: span 2;
}

.input-block {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.input-block label {
  font-size: 0.8rem;
  color: #344767;
  font-weight: 600;
}

.input-block input,
.input-block select {
  border: 1px solid #cad5e6;
  border-radius: 8px;
  padding: 0.48rem 0.55rem;
  font-size: 0.85rem;
  background: #fff;
}

.report-heading {
  text-align: center;
  border: 1px dashed #cfd8ea;
  background: linear-gradient(180deg, #fbfdff 0%, #f3f8ff 100%);
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin-bottom: 0.9rem;
}

.report-heading h3 {
  margin: 0;
  font-size: 1rem;
  text-transform: uppercase;
  color: #23395b;
}

.report-heading p,
.report-heading span {
  display: block;
  margin: 0.2rem 0 0;
  color: #52627c;
  font-size: 0.84rem;
}

.table-wrap {
  overflow-x: auto;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
}

.report-table th,
.report-table td {
  border: 1px solid #d2d9e6;
  padding: 0.45rem;
  vertical-align: middle;
  font-size: 0.8rem;
}

.report-table thead th {
  background: #eef84c;
  color: #223354;
  text-align: center;
  font-weight: 700;
}

.report-table tbody td {
  background: #fff;
}

.report-table input,
.report-table select {
  width: 100%;
  border: 1px solid #cad5e6;
  border-radius: 6px;
  padding: 0.3rem 0.4rem;
  font-size: 0.8rem;
  background: #fff;
}

.student-overview {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.summary-card {
  border: 1px solid #dce3f0;
  border-radius: 14px;
  padding: 0.9rem 1rem;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  box-shadow: 0 10px 24px rgba(25, 39, 68, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.identity-card {
  background: linear-gradient(135deg, #eef6ff 0%, #f9fcff 100%);
}

.highlight-card {
  background: linear-gradient(135deg, #e8fff1 0%, #f6fff9 100%);
  border-color: #bfe7cb;
}

.summary-label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #60708b;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.summary-card strong {
  font-size: 1.5rem;
  color: #1f3251;
  line-height: 1.1;
}

.summary-card small {
  color: #71819b;
  font-size: 0.82rem;
}

.student-level-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.level-card {
  border: 1px solid #dce3f0;
  border-radius: 16px;
  background: #fff;
  overflow: hidden;
  box-shadow: 0 12px 26px rgba(25, 39, 68, 0.06);
}

.level-card-header {
  padding: 0.95rem 1rem;
  background: linear-gradient(135deg, #1f3c88 0%, #355aa8 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.level-card-header h5 {
  margin: 0;
  font-size: 1rem;
}

.level-card-header p {
  margin: 0.18rem 0 0;
  font-size: 0.8rem;
  opacity: 0.88;
}

.level-header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.add-class-btn {
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-radius: 999px;
  padding: 0.42rem 0.75rem;
  font-size: 0.76rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.add-class-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.level-badge {
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  font-size: 0.82rem;
  font-weight: 700;
  white-space: nowrap;
}

.class-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.8rem;
  padding: 1rem;
}

.class-card {
  border: 1px solid #e0e7f2;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 0.8rem;
}

.class-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.7rem;
}

.class-card-title {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.class-card-top strong {
  color: #243b63;
  font-size: 0.95rem;
}

.class-card-top span {
  font-size: 0.78rem;
  color: #687892;
  font-weight: 600;
}

.delete-class-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #f3c7cd;
  border-radius: 10px;
  background: linear-gradient(180deg, #fff7f8 0%, #ffecee 100%);
  color: #b4233a;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.delete-class-btn:hover {
  background: linear-gradient(180deg, #fff0f2 0%, #ffe2e7 100%);
  border-color: #e39aa4;
}

.gender-input-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;
}

.gender-input-grid label {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0;
}

.gender-input-grid span {
  font-size: 0.76rem;
  font-weight: 700;
  color: #50617f;
}

.gender-input-grid input {
  width: 100%;
  border: 1px solid #cad5e6;
  border-radius: 10px;
  padding: 0.5rem 0.55rem;
  font-size: 0.84rem;
  background: #fff;
}

.level-total-bar {
  border-top: 1px solid #e7edf7;
  background: #f7fbff;
  padding: 0.85rem 1rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
}

.level-total-bar div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.level-total-bar span {
  font-size: 0.76rem;
  color: #687892;
  font-weight: 600;
}

.level-total-bar strong {
  font-size: 1.05rem;
  color: #1f3251;
}

.sum-cell {
  text-align: center;
  background: #ecfdf3 !important;
  font-weight: 700;
  color: #1d6f42;
}

.grand-total {
  background: #dff7e5 !important;
}

.mutation-summary {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.mutation-stat {
  border: 1px solid #dce3f0;
  border-radius: 14px;
  padding: 0.8rem 0.95rem;
  background: linear-gradient(180deg, #f3f8ff 0%, #ffffff 100%);
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.mutation-stat.soft {
  background: #fff;
}

.mutation-stat span {
  font-size: 0.76rem;
  color: #60708b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mutation-stat strong {
  font-size: 1.3rem;
  line-height: 1.1;
  color: #1f3251;
}

.mutation-card-list {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.mutation-card {
  border: 1px solid #dce3f0;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  box-shadow: 0 12px 24px rgba(25, 39, 68, 0.05);
  overflow: hidden;
}

.mutation-card-header {
  padding: 0.95rem 1rem;
  border-bottom: 1px solid #e7edf7;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.mutation-card-index {
  display: inline-block;
  margin-bottom: 0.18rem;
  font-size: 0.72rem;
  font-weight: 700;
  color: #60708b;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.mutation-card-header h5 {
  margin: 0;
  font-size: 1rem;
  color: #23395b;
}

.mutation-card-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.mutation-type-badge {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0.45rem 0.8rem;
  border-radius: 999px;
  background: #e8fff1;
  color: #1d6f42;
  font-size: 0.76rem;
  font-weight: 700;
  text-align: center;
}

.mutation-type-badge.empty {
  background: #f2f5fb;
  color: #6c7a92;
}

.mutation-form-grid {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.mutation-empty-state {
  border: 1px dashed #cdd8ea;
  border-radius: 18px;
  padding: 2rem 1rem;
  text-align: center;
  background: linear-gradient(180deg, #fbfdff 0%, #f4f8ff 100%);
}

.empty-state-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 0.8rem;
  border-radius: 50%;
  background: #e9f1ff;
  color: #355aa8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
}

.mutation-empty-state h5 {
  margin: 0 0 0.35rem;
  color: #23395b;
}

.mutation-empty-state p {
  margin: 0;
  color: #6c7a92;
  font-size: 0.84rem;
}

.delete-row-btn {
  width: 18px;
  height: 18px;
  border: 1px solid #f6cfd3;
  border-radius: 999px;
  background: linear-gradient(180deg, #fffafb 0%, #ffeef0 100%);
  color: #b4233a;
  font-size: 0.55rem;
  font-weight: 700;
  line-height: 1;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.18s ease;
}

.delete-row-btn:hover {
  background: linear-gradient(180deg, #fff1f3 0%, #ffdfe4 100%);
  border-color: #e39aa4;
  color: #8f1d30;
  transform: scale(1.05);
}

.delete-row-btn-lg {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  font-size: 0.85rem;
}

.empty-state {
  text-align: center;
  color: #6c7a92;
  padding: 1rem;
}

@media (max-width: 992px) {
  .info-grid,
  .student-overview,
  .student-level-grid,
  .class-list,
  .level-total-bar,
  .mutation-summary,
  .mutation-form-grid {
    grid-template-columns: 1fr;
  }

  .span-2 {
    grid-column: span 1;
  }

  .level-card-header,
  .class-card-top,
  .mutation-card-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .section-header,
  .section-actions {
    align-items: flex-start;
  }

  .level-header-actions {
    justify-content: flex-start;
  }

  .mutation-card-actions {
    width: 100%;
    justify-content: space-between;
  }

  .section-toggle-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
