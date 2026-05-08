<template>
  <div :class="isAdminMadrasahView ? 'admin-madrasah-embedded' : 'main-wrapper'">
    <layouts v-if="!isAdminMadrasahView"></layouts>
    <div :class="isAdminMadrasahView ? 'admin-madrasah-embedded-page' : 'page-wrapper'">
      <breadcrumb
        v-if="!isAdminMadrasahView"
        title="Laporan Bulanan Madrasah"
        name="Laporan Bulanan"
        text="Madrasah"
        text1="Input Data"
      />

      <div class="dashboard-content">
        <div class="container">
          <div class="report-shell madrasah-page-shell theme-report-shell">
            <MadrasahHeaderMenu v-if="!isAdminMadrasahView" />
            <div class="hero">
              <div class="hero-heading">
                <h2>Form Input Laporan Bulanan {{ madrasahTypeLabel }}</h2>
                <span class="status-badge" :class="statusBadgeClass">{{ currentStatusLabel }}</span>
              </div>
              <div class="hero-meta">
                <div class="meta-card">
                  <small>Tanggal Submit</small>
                  <strong>{{ formattedSubmittedAt }}</strong>
                </div>
                <div class="meta-card meta-card-wide">
                  <small>Catatan Admin</small>
                  <strong>{{ currentAdminNote }}</strong>
                </div>
              </div>
              <p>Input data rekap siswa per kelas dan data siswa mutasi, mengundurkan diri, atau drop out.</p>
              <div class="hero-actions">
                <b-button variant="outline-light" @click="resetAll">
                  <i class="feather-refresh-ccw"></i> Reset Semua
                </b-button>
                <b-button variant="primary" :disabled="isSavingDraft || isSubmittingReport || isLoadingReport" @click="saveDraft">
                  <i class="feather-save"></i> {{ isSavingDraft ? 'Menyimpan...' : 'Simpan Draft' }}
                </b-button>
                <b-button variant="success" :disabled="isSavingDraft || isSubmittingReport || isLoadingReport" @click="submitReport">
                  <i class="feather-send"></i> {{ isSubmittingReport ? 'Mengirim...' : 'Kirim Laporan' }}
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
                  <b-form-select
                    v-model="formData.reportMonth"
                    :options="monthOptions"
                    @change="handlePeriodChange"
                  />
                </div>
                <div class="input-block">
                  <label>Tahun</label>
                  <input v-model="formData.reportYear" type="number" min="2000" placeholder="2026" @change="handlePeriodChange">
                </div>
                <div class="input-block">
                  <label>Tahun Ajaran</label>
                  <b-form-select v-model="formData.schoolYear" :options="academicYearOptions" />
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
                  <input v-model="formData.namaMadrasah" type="text" placeholder="Nama madrasah" readonly>
                </div>
                <div class="input-block">
                  <label>RB</label>
                  <input v-model.number="formData.rb" type="number" min="0" placeholder="0">
                </div>
                <div class="input-block span-2">
                  <label>Kantor / Instansi</label>
                  <input v-model="formData.officeName" type="text" placeholder="Kantor Kementerian Agama Kab. Tanah Datar" readonly>
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
  canManageAnyMadrasah,
  getMadrasahCategory,
  getMadrasahClassLevelCount,
  getMadrasahClassLevelCountForCategory,
  getMadrasahClassLevelsForCategory,
  getMadrasahLabel,
  getMadrasahLabelForCategory,
  getStoredUser
} from '@/utils/madrasahAccess'

const DRAFT_KEY = 'madrasah_laporan_bulanan_draft'

const sanitizeDraftSegment = (value) =>
  String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'unknown'

const buildDraftKey = (deptId, month, year) =>
  `${DRAFT_KEY}_${sanitizeDraftSegment(deptId)}_${sanitizeDraftSegment(month)}_${sanitizeDraftSegment(year)}`

const getCurrentMadrasahCategory = () => String(getStoredUser()?.dept?.kategori || '').trim().toLowerCase()

const getDefaultAcademicYear = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()
  const startYear = currentMonth >= 7 ? currentYear : currentYear - 1
  return `${startYear}/${startYear + 1}`
}

const buildAcademicYearOptions = (span = 2) => {
  const defaultYear = getDefaultAcademicYear()
  const [startYearText] = defaultYear.split('/')
  const startYear = Number(startYearText)
  const options = []

  for (let year = startYear - span; year <= startYear + span; year += 1) {
    options.push({
      value: `${year}/${year + 1}`,
      text: `${year}/${year + 1}`
    })
  }

  return options
}

const buildMonthOptions = () => ([
  { value: 'Januari', text: 'Januari' },
  { value: 'Februari', text: 'Februari' },
  { value: 'Maret', text: 'Maret' },
  { value: 'April', text: 'April' },
  { value: 'Mei', text: 'Mei' },
  { value: 'Juni', text: 'Juni' },
  { value: 'Juli', text: 'Juli' },
  { value: 'Agustus', text: 'Agustus' },
  { value: 'September', text: 'September' },
  { value: 'Oktober', text: 'Oktober' },
  { value: 'November', text: 'November' },
  { value: 'Desember', text: 'Desember' }
])

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

const createClassLevelsFromStudentCounts = (category = getCurrentMadrasahCategory(), studentCounts = {}) => {
  const levels = cloneClassLevels(category)

  Object.keys(studentCounts || {}).forEach((code) => {
    const [prefix] = String(code).split('.')
    const level = levels.find((item) => item.prefix === prefix)

    if (!level) return

    if (!level.classes.some((classItem) => classItem.code === code)) {
      level.classes.push({ code })
      level.classes.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }))
    }
  })

  return levels
}

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
  schoolYear: getDefaultAcademicYear(),
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
      activeMadrasahId: null,
      formData: createDefaultFormData(category),
      classLevels: cloneClassLevels(category),
      madrasahCategory: category,
      academicYearOptions: buildAcademicYearOptions(),
      monthOptions: buildMonthOptions(),
      currentReportStatus: 'draft',
      currentSubmittedAt: null,
      currentAdminNoteRaw: '',
      isLoadingReport: false,
      isSavingDraft: false,
      isSubmittingReport: false,
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
    isAdminMadrasahView() {
      return String(this.$route?.path || '').startsWith('/admin/madrasah')
    },
    madrasahAllowed() {
      return canAccessMadrasah() || canManageAnyMadrasah()
    },
    madrasahTypeLabel() {
      return getMadrasahLabelForCategory(this.madrasahCategory) || getMadrasahLabel()
    },
    madrasahClassLevelCount() {
      return getMadrasahClassLevelCountForCategory(this.madrasahCategory) || getMadrasahClassLevelCount()
    },
    grandTotal() {
      return this.grandTotalByKey('l') + this.grandTotalByKey('p')
    },
    mutationClassOptions() {
      return this.classLevels.flatMap((level) => level.classes.map((classItem) => classItem.code))
    },
    reportPeriodLabel() {
      return `${this.formData.reportMonth || '-'} ${this.formData.reportYear || ''}`.trim()
    },
    currentStatusLabel() {
      const labelMap = {
        draft: 'Draft',
        submitted: 'Sudah Dikirim',
        revisi: 'Perlu Revisi',
        approved: 'Disetujui'
      }

      return labelMap[this.currentReportStatus] || 'Draft'
    },
    statusBadgeClass() {
      return `status-${this.currentReportStatus || 'draft'}`
    },
    formattedSubmittedAt() {
      if (!this.currentSubmittedAt) {
        return 'Belum dikirim'
      }

      const date = new Date(this.currentSubmittedAt)
      if (Number.isNaN(date.getTime())) {
        return this.currentSubmittedAt
      }

      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
    },
    currentAdminNote() {
      return this.currentAdminNoteRaw || 'Belum ada catatan admin'
    }
  },
  async mounted() {
    if (!this.madrasahAllowed) {
      this.$router.push('/')
      return
    }

    this.activeMadrasahId = this.getDeptId()
    await this.applyProfileDefaults()
    await this.loadReportForCurrentPeriod()
  },
  watch: {
    async '$route.query.dept_id'() {
      const nextDeptId = this.getDeptId()
      if ((this.activeMadrasahId || null) === (nextDeptId || null)) {
        return
      }

      this.activeMadrasahId = nextDeptId
      await this.applyProfileDefaults()
      await this.loadReportForCurrentPeriod()
    }
  },
  methods: {
    getDeptId() {
      if (canManageAnyMadrasah() && this.$route?.query?.dept_id) {
        return String(this.$route.query.dept_id).trim()
      }

      const user = getStoredUser()
      return user?.dept_id ?? user?.dept?.id ?? user?.dept?.dept_id ?? null
    },
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    getInstansiName() {
      const user = getStoredUser()
      return user?.dept?.instansi?.nama ||
        user?.dept?.instansi ||
        user?.instansi?.nama ||
        'Kantor Kementerian Agama Kab. Tanah Datar'
    },
    async applyProfileDefaults() {
      const user = getStoredUser()
      const fallbackNama =
        user?.dept?.nama ||
        user?.dept?.nama_madrasah ||
        user?.name_satker ||
        ''

      this.formData.officeName = this.getInstansiName()

      if (this.activeMadrasahId) {
        try {
          const response = await this.$axios.get(
            `${import.meta.env.VITE_APP_API_URL}/getMadrasahProfil/${this.activeMadrasahId}`,
            { headers: this.getAuthHeaders() }
          )

          const profile = response?.data?.data
          if (profile?.nama) {
            this.madrasahCategory = String(profile?.kategori || this.madrasahCategory || getMadrasahCategory()).trim().toLowerCase()
            this.formData.namaMadrasah = profile.nama
            return
          }
        } catch (error) {
          console.error('Gagal memuat profil madrasah untuk laporan bulanan', error)
        }
      }

      if (fallbackNama) {
        this.formData.namaMadrasah = fallbackNama
      }
    },
    getDraftKey() {
      return buildDraftKey(this.activeMadrasahId, this.formData.reportMonth, this.formData.reportYear)
    },
    escapeHtml(value) {
      return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    },
    formatDisplayDate(value) {
      if (!value) {
        return '-'
      }

      const date = new Date(value)
      if (Number.isNaN(date.getTime())) {
        return String(value)
      }

      return new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }).format(date)
    },
    getExportFileBaseName() {
      const madrasahName = sanitizeDraftSegment(this.formData.namaMadrasah || this.activeMadrasahId || 'madrasah')
      const month = sanitizeDraftSegment(this.formData.reportMonth || 'bulan')
      const year = sanitizeDraftSegment(this.formData.reportYear || new Date().getFullYear())
      return `laporan_bulanan_${madrasahName}_${month}_${year}`
    },
    getExportColumnGroups() {
      return this.classLevels.map((level) => ({
        name: level.name,
        classes: level.classes.map((classItem) => ({
          code: classItem.code,
          l: this.asNumber(this.formData.studentCounts?.[classItem.code]?.l),
          p: this.asNumber(this.formData.studentCounts?.[classItem.code]?.p),
          total: this.classTotal(classItem.code)
        })),
        totalL: this.levelTotal(level, 'l'),
        totalP: this.levelTotal(level, 'p'),
        total: this.levelGrandTotal(level)
      }))
    },
    buildExportSummaryHeaderHtml() {
      const groups = this.getExportColumnGroups()
      const levelHeader = groups
        .map((group) => `<th colspan="${(group.classes.length * 3) + 3}">${this.escapeHtml(group.name.toUpperCase())}</th>`)
        .join('')

      const classHeader = groups
        .map((group) => {
          const classCells = group.classes
            .map((classItem) => `<th colspan="3">${this.escapeHtml(classItem.code)}</th>`)
            .join('')

          return `${classCells}<th colspan="3">TOTAL ${this.escapeHtml(group.name.toUpperCase())}</th>`
        })
        .join('')

      const metricHeader = groups
        .map((group) => {
          const classMetrics = group.classes.map(() => '<th>L</th><th>P</th><th>JML</th>').join('')
          return `${classMetrics}<th>L</th><th>P</th><th>JML</th>`
        })
        .join('')

      return `
        <tr>
          <th rowspan="3">NO</th>
          <th rowspan="3">NAMA MADRASAH</th>
          <th rowspan="3">RB</th>
          ${levelHeader}
          <th colspan="3">TOTAL</th>
        </tr>
        <tr>
          ${classHeader}
          <th colspan="3">KESELURUHAN</th>
        </tr>
        <tr>
          ${metricHeader}
          <th>L</th>
          <th>P</th>
          <th>JML</th>
        </tr>
      `
    },
    buildExportSummaryRowHtml() {
      const groups = this.getExportColumnGroups()
      const groupCells = groups
        .map((group) => {
          const classValues = group.classes
            .map((classItem) => `<td>${classItem.l}</td><td>${classItem.p}</td><td>${classItem.total}</td>`)
            .join('')

          return `${classValues}<td>${group.totalL}</td><td>${group.totalP}</td><td>${group.total}</td>`
        })
        .join('')

      return `
        <tr>
          <td>1</td>
          <td class="text-left text-strong">${this.escapeHtml(this.formData.namaMadrasah || '-')}</td>
          <td>${this.asNumber(this.formData.rb)}</td>
          ${groupCells}
          <td>${this.grandTotalByKey('l')}</td>
          <td>${this.grandTotalByKey('p')}</td>
          <td>${this.grandTotal}</td>
        </tr>
      `
    },
    buildExportMutationRowsHtml() {
      if (!Array.isArray(this.formData.mutationRows) || !this.formData.mutationRows.length) {
        return `
          <tr>
            <td colspan="10" class="empty-cell">Belum ada data mutasi / mengundurkan diri / DO pada periode ini.</td>
          </tr>
        `
      }

      return this.formData.mutationRows.map((row, index) => `
        <tr>
          <td>${index + 1}</td>
          <td class="text-left">${this.escapeHtml(row.namaSiswa || '-')}</td>
          <td>${this.escapeHtml(row.nisn || '-')}</td>
          <td>${this.escapeHtml(row.nik || '-')}</td>
          <td>${this.escapeHtml(row.jenisKelamin || '-')}</td>
          <td class="text-left">${this.escapeHtml(row.tempatLahir || '-')}</td>
          <td>${this.escapeHtml(this.formatDisplayDate(row.tanggalLahir))}</td>
          <td class="text-left">${this.escapeHtml(row.namaIbuKandung || '-')}</td>
          <td>${this.escapeHtml(row.kelas || '-')}</td>
          <td class="text-left">${this.escapeHtml(this.mutationTypeLabel(row.keterangan))}</td>
        </tr>
      `).join('')
    },
    buildExportDocumentHtml() {
      const exportDate = new Intl.DateTimeFormat('id-ID', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date())

      return `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${this.escapeHtml(`Laporan Bulanan ${this.formData.namaMadrasah || 'Madrasah'}`)}</title>
            <style>
              @page {
                size: landscape;
                margin: 12mm;
              }

              body {
                font-family: Arial, Helvetica, sans-serif;
                color: #14213d;
                margin: 0;
                padding: 20px;
                background: #ffffff;
              }

              .report-sheet {
                border: 2px solid #1f3c88;
                padding: 20px;
              }

              .report-head {
                text-align: center;
                margin-bottom: 12px;
              }

              .report-head h1,
              .report-head h2,
              .report-head h3,
              .report-head p {
                margin: 0;
              }

              .report-head h1 {
                font-size: 20px;
                letter-spacing: 0.5px;
                margin-bottom: 4px;
              }

              .report-head h2 {
                font-size: 15px;
                margin-bottom: 4px;
              }

              .report-head h3 {
                font-size: 13px;
                font-weight: 700;
              }

              .meta-grid {
                display: grid;
                grid-template-columns: repeat(3, minmax(0, 1fr));
                gap: 10px;
                margin: 14px 0 18px;
              }

              .meta-card {
                border: 1px solid #adc4ff;
                background: #f5f8ff;
                padding: 10px 12px;
                border-radius: 8px;
              }

              .meta-label {
                display: block;
                font-size: 11px;
                color: #4b6382;
                margin-bottom: 4px;
                text-transform: uppercase;
              }

              .meta-value {
                font-size: 13px;
                font-weight: 700;
              }

              .section-title {
                font-size: 14px;
                font-weight: 700;
                margin: 18px 0 8px;
                color: #1f3c88;
              }

              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 18px;
              }

              th,
              td {
                border: 1px solid #7189b3;
                padding: 6px 5px;
                font-size: 11px;
                text-align: center;
                vertical-align: middle;
              }

              th {
                background: #dce8ff;
                font-weight: 700;
              }

              .subhead th {
                background: #edf3ff;
              }

              .text-left {
                text-align: left;
              }

              .text-strong {
                font-weight: 700;
              }

              .empty-cell {
                text-align: center;
                color: #6c7b95;
                padding: 14px;
              }

              .footer-note {
                display: flex;
                justify-content: space-between;
                gap: 16px;
                margin-top: 18px;
                font-size: 11px;
                color: #4b6382;
              }
            </style>
          </head>
          <body>
            <div class="report-sheet">
              <div class="report-head">
                <h1>${this.escapeHtml(`LAPORAN BULANAN ${this.madrasahTypeLabel.toUpperCase()}`)}</h1>
                <h2>${this.escapeHtml(this.formData.officeName || this.getInstansiName())}</h2>
                <h3>${this.escapeHtml(`KEADAAN SISWA SEMESTER ${String(this.formData.semester || '').toUpperCase()} TAHUN AJARAN ${this.formData.schoolYear || '-'}`)}</h3>
                <p>${this.escapeHtml(`Bulan: ${this.reportPeriodLabel || '-'}`)}</p>
              </div>

              <div class="meta-grid">
                <div class="meta-card">
                  <span class="meta-label">Nama Madrasah</span>
                  <span class="meta-value">${this.escapeHtml(this.formData.namaMadrasah || '-')}</span>
                </div>
                <div class="meta-card">
                  <span class="meta-label">RB</span>
                  <span class="meta-value">${this.asNumber(this.formData.rb)}</span>
                </div>
                <div class="meta-card">
                  <span class="meta-label">Status Laporan</span>
                  <span class="meta-value">${this.escapeHtml(this.currentStatusLabel)}</span>
                </div>
              </div>

              <div class="section-title">A. Rekap Keadaan Siswa per Tingkat dan Rombel</div>
              <table>
                <thead>
                  ${this.buildExportSummaryHeaderHtml()}
                </thead>
                <tbody>
                  ${this.buildExportSummaryRowHtml()}
                </tbody>
              </table>

              <div class="section-title">B. Data Siswa Mutasi / Mengundurkan Diri / DO</div>
              <table>
                <thead class="subhead">
                  <tr>
                    <th>No</th>
                    <th>Nama Siswa</th>
                    <th>NISN</th>
                    <th>NIK</th>
                    <th>JK</th>
                    <th>Tempat Lahir</th>
                    <th>Tanggal Lahir</th>
                    <th>Nama Ibu Kandung</th>
                    <th>Kelas</th>
                    <th>Keterangan</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.buildExportMutationRowsHtml()}
                </tbody>
              </table>

              <div class="footer-note">
                <span>Madrasah terpilih: ${this.escapeHtml(this.formData.namaMadrasah || '-')}</span>
                <span>Diekspor pada ${this.escapeHtml(exportDate)}</span>
              </div>
            </div>
          </body>
        </html>
      `
    },
    downloadTextFile(content, fileName, mimeType) {
      const blob = new Blob(['\ufeff', content], { type: mimeType })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    },
    exportExcel() {
      const html = this.buildExportDocumentHtml()
      this.downloadTextFile(
        html,
        `${this.getExportFileBaseName()}.xls`,
        'application/vnd.ms-excel;charset=utf-8;'
      )
      this.$toast.fire({
        title: 'Export Excel berhasil dibuat untuk madrasah terpilih',
        icon: 'success'
      })
    },
    exportPdf() {
      const printWindow = window.open('', '_blank', 'width=1280,height=900')
      if (!printWindow) {
        this.$toast.fire({
          title: 'Popup diblokir browser. Izinkan popup untuk export PDF.',
          icon: 'warning'
        })
        return
      }

      printWindow.document.open()
      printWindow.document.write(this.buildExportDocumentHtml())
      printWindow.document.close()
      printWindow.focus()

      window.setTimeout(() => {
        printWindow.print()
      }, 350)
    },
    getDefaultMergedFormData(overrides = {}) {
      const defaults = createDefaultFormData(this.madrasahCategory)
      const studentCounts = overrides.studentCounts || overrides.student_counts_json || {}

      return {
        ...defaults,
        ...overrides,
        studentCounts: {
          ...defaults.studentCounts,
          ...studentCounts
        },
        mutationRows: Array.isArray(overrides.mutationRows) && overrides.mutationRows.length
          ? overrides.mutationRows
          : Array.isArray(overrides.mutation_rows_json) && overrides.mutation_rows_json.length
            ? overrides.mutation_rows_json
            : defaults.mutationRows
      }
    },
    applyReportMeta(report = {}, { forceDraft = false } = {}) {
      this.currentReportStatus = forceDraft ? 'draft' : (report?.status || 'draft')
      this.currentSubmittedAt = forceDraft ? null : (report?.submitted_at || null)
      this.currentAdminNoteRaw = forceDraft ? '' : (report?.catatan_admin || '')
    },
    applyFormState(nextFormData, nextClassLevels = null) {
      this.formData = this.getDefaultMergedFormData(nextFormData)
      this.classLevels = Array.isArray(nextClassLevels) && nextClassLevels.length
        ? nextClassLevels
        : createClassLevelsFromStudentCounts(this.madrasahCategory, this.formData.studentCounts)
      this.ensureStudentCounts()
    },
    loadDraftForCurrentPeriod() {
      const draft = localStorage.getItem(this.getDraftKey())

      if (!draft) {
        this.applyReportMeta({}, { forceDraft: true })
        return false
      }

      try {
        const parsed = JSON.parse(draft)
        this.applyReportMeta(parsed)
        this.applyFormState(parsed, parsed.classLevels)
        return true
      } catch (error) {
        console.error('Gagal membaca draft laporan bulanan madrasah', error)
        this.applyReportMeta({}, { forceDraft: true })
        return false
      }
    },
    persistDraftLocally() {
      localStorage.setItem(this.getDraftKey(), JSON.stringify({
        ...this.formData,
        status: this.currentReportStatus,
        submitted_at: this.currentSubmittedAt,
        catatan_admin: this.currentAdminNoteRaw,
        classLevels: this.classLevels
      }))
    },
    buildPayload(status = 'draft') {
      return {
        dept_id: this.activeMadrasahId,
        bulan_laporan: String(this.formData.reportMonth || '').trim(),
        tahun_laporan: Number(this.formData.reportYear) || new Date().getFullYear(),
        tahun_ajaran: this.formData.schoolYear,
        semester: this.formData.semester,
        status,
        namaMadrasah: this.formData.namaMadrasah,
        officeName: this.formData.officeName,
        rb: this.asNumber(this.formData.rb),
        studentCounts: this.formData.studentCounts,
        mutationRows: this.formData.mutationRows
      }
    },
    applyApiReport(report) {
      if (!report) return

      this.applyReportMeta(report)
      this.applyFormState({
        reportMonth: report.bulan_laporan || this.formData.reportMonth,
        reportYear: report.tahun_laporan || this.formData.reportYear,
        schoolYear: report.tahun_ajaran || this.formData.schoolYear,
        semester: report.semester || this.formData.semester,
        officeName: report.officeName || this.formData.officeName,
        namaMadrasah: report.namaMadrasah || this.formData.namaMadrasah,
        rb: this.asNumber(report.rb),
        studentCounts: report.studentCounts || {},
        mutationRows: Array.isArray(report.mutationRows) ? report.mutationRows : []
      }, createClassLevelsFromStudentCounts(this.madrasahCategory, report.studentCounts || {}))
    },
    async loadReportForCurrentPeriod() {
      if (!this.activeMadrasahId) {
        return
      }

      this.isLoadingReport = true

      try {
        const response = await this.$axios.get(
          `${import.meta.env.VITE_APP_API_URL}/getMadrasahLaporanBulanan/${this.activeMadrasahId}`,
          {
            headers: this.getAuthHeaders(),
            params: {
              bulan_laporan: String(this.formData.reportMonth || '').trim(),
              tahun_laporan: Number(this.formData.reportYear) || new Date().getFullYear(),
              tahun_ajaran: this.formData.schoolYear,
              semester: this.formData.semester
            }
          }
        )

        const report = response?.data?.data
        const prefillData = response?.data?.prefill_data

        if (report) {
          this.applyApiReport(report)
          this.persistDraftLocally()
        } else if (prefillData) {
          this.applyApiReport({
            ...prefillData,
            status: 'draft',
            submitted_at: null,
            catatan_admin: '',
            bulan_laporan: String(this.formData.reportMonth || '').trim(),
            tahun_laporan: Number(this.formData.reportYear) || new Date().getFullYear(),
            tahun_ajaran: this.formData.schoolYear,
            semester: this.formData.semester
          })
          this.persistDraftLocally()
        } else if (!this.loadDraftForCurrentPeriod()) {
          this.applyFormState({
            reportMonth: this.formData.reportMonth,
            reportYear: this.formData.reportYear,
            schoolYear: this.formData.schoolYear,
            semester: this.formData.semester
          })
        }
      } catch (error) {
        console.error('Gagal memuat laporan bulanan madrasah', error)

        if (!this.loadDraftForCurrentPeriod()) {
          this.applyReportMeta({}, { forceDraft: true })
          this.applyFormState({
            reportMonth: this.formData.reportMonth,
            reportYear: this.formData.reportYear,
            schoolYear: this.formData.schoolYear,
            semester: this.formData.semester
          })
        }
      } finally {
        await this.applyProfileDefaults()
        this.isLoadingReport = false
      }
    },
    async handlePeriodChange() {
      await this.loadReportForCurrentPeriod()
    },
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
      const currentDraftKey = this.getDraftKey()
      this.formData = createDefaultFormData(this.madrasahCategory)
      this.classLevels = cloneClassLevels(this.madrasahCategory)
      this.applyReportMeta({}, { forceDraft: true })
      this.formData.officeName = this.getInstansiName()
      this.applyProfileDefaults()
      localStorage.removeItem(currentDraftKey)
      this.$toast.fire({
        title: 'Form laporan bulanan berhasil direset',
        icon: 'info'
      })
    },
    async saveDraft() {
      this.isSavingDraft = true

      try {
        const response = await this.$axios.post(
          `${import.meta.env.VITE_APP_API_URL}/saveMadrasahLaporanBulanan`,
          this.buildPayload('draft'),
          { headers: this.getAuthHeaders() }
        )

        const report = response?.data?.data
        if (report) {
          this.applyApiReport(report)
        }

        this.persistDraftLocally()
        this.$toast.fire({
          title: 'Draft laporan bulanan berhasil disimpan',
          icon: 'success'
        })
      } catch (error) {
        console.error('Gagal menyimpan draft laporan bulanan madrasah', error)
        this.persistDraftLocally()
        this.$toast.fire({
          title: 'Draft disimpan lokal karena koneksi ke server gagal',
          icon: 'warning'
        })
      } finally {
        this.isSavingDraft = false
      }
    },
    async submitReport() {
      this.isSubmittingReport = true

      try {
        const result = await this.$swal.fire({
          title: 'Kirim laporan bulanan?',
          text: `Laporan ${this.reportPeriodLabel} akan dikirim untuk ditinjau.`,
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Ya, kirim',
          cancelButtonText: 'Batal'
        })

        if (!result.isConfirmed) {
          return
        }

        const response = await this.$axios.post(
          `${import.meta.env.VITE_APP_API_URL}/saveMadrasahLaporanBulanan`,
          this.buildPayload('submitted'),
          { headers: this.getAuthHeaders() }
        )

        const report = response?.data?.data
        if (report) {
          this.applyApiReport(report)
        }

        this.persistDraftLocally()
        this.$toast.fire({
          title: 'Laporan bulanan berhasil dikirim',
          icon: 'success'
        })
      } catch (error) {
        console.error('Gagal mengirim laporan bulanan madrasah', error)
        this.$toast.fire({
          title: 'Laporan bulanan gagal dikirim',
          icon: 'error'
        })
      } finally {
        this.isSubmittingReport = false
      }
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

.admin-madrasah-embedded-page {
  padding: 0;
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

.hero-heading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.hero p {
  margin-bottom: 0.8rem;
  opacity: 0.9;
}

.hero-meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.7rem;
  margin-bottom: 0.9rem;
}

.meta-card {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  padding: 0.65rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.meta-card small {
  font-size: 0.72rem;
  opacity: 0.85;
}

.meta-card strong {
  font-size: 0.88rem;
  line-height: 1.4;
}

.meta-card-wide {
  grid-column: span 1;
}

.hero-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  align-items: end;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 700;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.status-draft {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.status-submitted {
  background: rgba(46, 204, 113, 0.18);
  color: #d8ffe7;
}

.status-revisi {
  background: rgba(241, 196, 15, 0.2);
  color: #fff3bf;
}

.status-approved {
  background: rgba(52, 152, 219, 0.2);
  color: #d6efff;
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

.report-shell :deep(.hero) {
  background: linear-gradient(135deg, #2a191a 0%, #4a2327 55%, #7b2c31 100%);
  border: 1px solid rgba(201, 157, 79, 0.2);
  box-shadow: 0 16px 32px rgba(22, 12, 13, 0.22);
}

.report-shell :deep(.meta-card) {
  background: rgba(255, 244, 216, 0.06);
  border-color: rgba(201, 157, 79, 0.18);
}

.report-shell :deep(.status-badge) {
  border-color: rgba(201, 157, 79, 0.22);
}

.report-shell :deep(.status-draft),
.report-shell :deep(.status-submitted),
.report-shell :deep(.status-revisi),
.report-shell :deep(.status-approved) {
  color: #fff4dc;
}

.report-shell :deep(.card-section) {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border: 1px solid rgba(201, 157, 79, 0.18);
  box-shadow: 0 12px 26px rgba(22, 12, 13, 0.18);
}

.report-shell :deep(.card-section h4) {
  color: #fff2d1;
}

.report-shell :deep(.section-subtitle) {
  color: rgba(255, 240, 197, 0.78);
}

.report-shell :deep(.section-header) {
  border-bottom: 1px solid rgba(201, 157, 79, 0.14);
}

.report-shell :deep(.compact-pill) {
  background: rgba(255, 244, 216, 0.06);
  border-color: rgba(201, 157, 79, 0.18);
  color: #fff2d1;
}

.report-shell :deep(.table-wrap),
.report-shell :deep(.table-responsive) {
  border: 1px solid rgba(201, 157, 79, 0.16);
  border-radius: 14px;
  overflow: hidden;
}

.report-shell :deep(.report-table th),
.report-shell :deep(.report-table td),
.report-shell :deep(table th),
.report-shell :deep(table td) {
  border-color: rgba(201, 157, 79, 0.14);
}

.report-shell :deep(.report-table thead th),
.report-shell :deep(table thead th) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
}

.report-shell :deep(.report-table tbody tr:hover),
.report-shell :deep(table tbody tr:hover) {
  background: rgba(255, 244, 216, 0.04);
}

.report-shell :deep(.report-table input),
.report-shell :deep(.form-control),
.report-shell :deep(.form-select) {
  background: rgba(255, 244, 216, 0.05);
  border-color: rgba(201, 157, 79, 0.18);
  color: #fff2d1;
}

.report-shell :deep(.report-table input::placeholder),
.report-shell :deep(.form-control::placeholder) {
  color: rgba(255, 240, 197, 0.55);
}

.report-shell :deep(.sum-cell) {
  background: rgba(201, 157, 79, 0.12);
  color: #fff2d1;
}

.report-shell :deep(.delete-row-btn) {
  border-color: rgba(201, 157, 79, 0.22);
  background: linear-gradient(180deg, #4b2327 0%, #2a191a 100%);
  color: #fff0c5;
}

.report-shell :deep(.delete-row-btn:hover) {
  border-color: rgba(246, 212, 122, 0.45);
  background: linear-gradient(180deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
}

.report-shell :deep(.mutation-summary .mutation-stat),
.report-shell :deep(.mutation-card),
.report-shell :deep(.mutation-empty-state) {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border-color: rgba(201, 157, 79, 0.18);
}

.report-shell :deep(.mutation-stat strong),
.report-shell :deep(.mutation-card-header h5),
.report-shell :deep(.mutation-empty-state h5) {
  color: #fff2d1;
}

.report-shell :deep(.mutation-stat span),
.report-shell :deep(.mutation-card-index),
.report-shell :deep(.mutation-empty-state p) {
  color: rgba(255, 240, 197, 0.72);
}

.report-shell :deep(.hero),
.report-shell :deep(.card-section),
.report-shell :deep(.profile-card),
.report-shell :deep(.section-block),
.report-shell :deep(.summary-card),
.report-shell :deep(.level-card),
.report-shell :deep(.class-card),
.report-shell :deep(.mutation-card),
.report-shell :deep(.mutation-empty-state),
.report-shell :deep(.table-wrap),
.report-shell :deep(.table-responsive) {
  background: linear-gradient(180deg, #2a191a 0%, #201214 100%) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
  color: #fff2d1 !important;
}

.report-shell :deep(.hero-heading h2),
.report-shell :deep(.hero p),
.report-shell :deep(.section-title-block h4),
.report-shell :deep(.section-subtitle),
.report-shell :deep(.report-heading h3),
.report-shell :deep(.report-heading p),
.report-shell :deep(.report-heading span),
.report-shell :deep(.summary-label),
.report-shell :deep(.summary-card strong),
.report-shell :deep(.level-card-header h5),
.report-shell :deep(.level-card-header p),
.report-shell :deep(.class-card-title strong),
.report-shell :deep(.class-card-title span),
.report-shell :deep(.mutation-card-header h5),
.report-shell :deep(.mutation-empty-state h5),
.report-shell :deep(.mutation-empty-state p),
.report-shell :deep(label),
.report-shell :deep(.col-form-label),
.report-shell :deep(small) {
  color: #fff2d1 !important;
}

.report-shell :deep(.summary-label),
.report-shell :deep(.section-title-block span),
.report-shell :deep(.section-header h4),
.report-shell :deep(.section-header button),
.report-shell :deep(.section-compact-preview),
.report-shell :deep(.compact-pill),
.report-shell :deep(.level-total-bar span),
.report-shell :deep(.level-total-bar strong),
.report-shell :deep(.mutation-card-index),
.report-shell :deep(.mutation-stat span),
.report-shell :deep(.mutation-stat strong),
.report-shell :deep(.mutation-type-badge),
.report-shell :deep(.mutation-empty-state h5),
.report-shell :deep(.mutation-empty-state p),
.report-shell :deep(.input-block label),
.report-shell :deep(.input-block input),
.report-shell :deep(.input-block select),
.report-shell :deep(.gender-input-grid span),
.report-shell :deep(.gender-input-grid input),
.report-shell :deep(.report-table thead th),
.report-shell :deep(.report-table tbody td) {
  color: #fff2d1 !important;
}

.report-shell :deep(.status-draft) {
  background: rgba(201, 157, 79, 0.16) !important;
  color: #fff4dc !important;
}

.report-shell :deep(.status-submitted) {
  background: rgba(106, 31, 43, 0.22) !important;
  color: #fff4dc !important;
}

.report-shell :deep(.status-revisi) {
  background: rgba(214, 163, 47, 0.18) !important;
  color: #fff4dc !important;
}

.report-shell :deep(.status-approved) {
  background: rgba(47, 95, 72, 0.22) !important;
  color: #fff4dc !important;
}

.report-shell :deep(.report-table thead th),
.report-shell :deep(table thead th) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%) !important;
  color: #fff !important;
}

.report-shell :deep(.report-heading) {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
}

.report-shell :deep(.report-heading h3),
.report-shell :deep(.report-heading p),
.report-shell :deep(.report-heading span) {
  color: #fff2d1 !important;
}

.report-shell :deep(.summary-card),
.report-shell :deep(.mutation-stat),
.report-shell :deep(.mutation-type-badge.empty),
.report-shell :deep(.level-total-bar),
.report-shell :deep(.gender-input-grid input),
.report-shell :deep(.input-block input),
.report-shell :deep(.input-block select) {
  background: rgba(255, 244, 216, 0.05) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
  color: #fff2d1 !important;
}

.report-shell :deep(.summary-card.identity-card),
.report-shell :deep(.summary-card.highlight-card),
.report-shell :deep(.mutation-stat.soft) {
  background: linear-gradient(180deg, rgba(255, 244, 216, 0.05), rgba(255, 244, 216, 0.03)) !important;
}

.report-shell :deep(.summary-label),
.report-shell :deep(.mutation-stat span),
.report-shell :deep(.gender-input-grid span),
.report-shell :deep(.input-block label),
.report-shell :deep(.level-total-bar span) {
  color: rgba(255, 240, 197, 0.72) !important;
}

.report-shell :deep(.summary-card strong),
.report-shell :deep(.mutation-stat strong),
.report-shell :deep(.level-total-bar strong),
.report-shell :deep(.mutation-type-badge),
.report-shell :deep(.mutation-card-header h5) {
  color: #fff2d1 !important;
}

.report-shell :deep(.report-table tbody td),
.report-shell :deep(table tbody td) {
  background: rgba(255, 244, 216, 0.04) !important;
  color: #fff2d1 !important;
  border-color: rgba(201, 157, 79, 0.12) !important;
}

.report-shell :deep(.report-table tbody td input),
.report-shell :deep(.report-table tbody td select) {
  background: rgba(255, 244, 216, 0.05) !important;
  color: #fff2d1 !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
}

.report-shell :deep(.sum-cell),
.report-shell :deep(.grand-total) {
  background: rgba(201, 157, 79, 0.12) !important;
  color: #fff2d1 !important;
}

.report-shell :deep(.summary-card),
.report-shell :deep(.level-card),
.report-shell :deep(.class-card),
.report-shell :deep(.mutation-card),
.report-shell :deep(.mutation-empty-state) {
  box-shadow: 0 12px 26px rgba(22, 12, 13, 0.18) !important;
}

.report-shell :deep(.form-control),
.report-shell :deep(.form-select),
.report-shell :deep(textarea.form-control) {
  background: rgba(255, 255, 255, 0.04) !important;
  color: #fff2d1 !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
}

.report-shell :deep(.form-control::placeholder),
.report-shell :deep(textarea.form-control::placeholder) {
  color: rgba(255, 240, 197, 0.58) !important;
}

.report-shell :deep(.empty-state-icon) {
  background: rgba(201, 157, 79, 0.12) !important;
  color: #f6d78a !important;
}

.report-shell :deep(.text-primary),
.report-shell :deep(.text-muted),
.report-shell :deep(.text-success),
.report-shell :deep(.text-danger),
.report-shell :deep(.text-warning),
.report-shell :deep(.text-info) {
  color: #fff2d1 !important;
}

.report-shell :deep(.bg-white),
.report-shell :deep(.bg-light) {
  background: linear-gradient(180deg, rgba(42, 25, 26, 0.98) 0%, rgba(35, 21, 22, 0.98) 100%) !important;
  color: #fff4dc !important;
}

.report-shell :deep(.card-body),
.report-shell :deep(.card-header),
.report-shell :deep(.summary-card),
.report-shell :deep(.mutation-stat),
.report-shell :deep(.mutation-card),
.report-shell :deep(.report-heading) {
  color: #fff4dc !important;
}

.report-shell :deep(.modal-content),
.report-shell :deep(.dropdown-menu),
.report-shell :deep(.list-group-item),
.report-shell :deep(.alert),
.report-shell :deep(.input-group-text) {
  background: rgba(42, 25, 26, 0.98) !important;
  color: #fff2d1 !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
}

.report-shell :deep(.btn-light),
.report-shell :deep(.btn-outline-light) {
  background: rgba(255, 244, 220, 0.05) !important;
  color: #fff4dc !important;
  border-color: rgba(201, 157, 79, 0.22) !important;
}

.report-shell.theme-report-shell :deep(.hero),
.report-shell.theme-report-shell :deep(.card-section),
.report-shell.theme-report-shell :deep(.section-block),
.report-shell.theme-report-shell :deep(.profile-card),
.report-shell.theme-report-shell :deep(.data-card),
.report-shell.theme-report-shell :deep(.table-wrap),
.report-shell.theme-report-shell :deep(.table-responsive),
.report-shell.theme-report-shell :deep(.report-heading),
.report-shell.theme-report-shell :deep(.custom-modal),
.report-shell.theme-report-shell :deep(.custom-modal-header),
.report-shell.theme-report-shell :deep(.custom-modal-body),
.report-shell.theme-report-shell :deep(.custom-modal-footer) {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 255, 0.96)) !important;
  border-color: rgba(31, 95, 191, 0.12) !important;
  color: #0f172a !important;
}

.report-shell.theme-report-shell :deep(.hero-heading h2),
.report-shell.theme-report-shell :deep(.hero p),
.report-shell.theme-report-shell :deep(.section-title-block h4),
.report-shell.theme-report-shell :deep(.section-subtitle),
.report-shell.theme-report-shell :deep(.report-heading h3),
.report-shell.theme-report-shell :deep(.report-heading p),
.report-shell.theme-report-shell :deep(.report-heading span),
.report-shell.theme-report-shell :deep(.summary-label),
.report-shell.theme-report-shell :deep(.summary-card strong),
.report-shell.theme-report-shell :deep(.level-card-header h5),
.report-shell.theme-report-shell :deep(.level-card-header p),
.report-shell.theme-report-shell :deep(.class-card-title strong),
.report-shell.theme-report-shell :deep(.class-card-title span),
.report-shell.theme-report-shell :deep(.mutation-card-header h5),
.report-shell.theme-report-shell :deep(.mutation-empty-state h5),
.report-shell.theme-report-shell :deep(.mutation-empty-state p),
.report-shell.theme-report-shell :deep(label),
.report-shell.theme-report-shell :deep(.col-form-label),
.report-shell.theme-report-shell :deep(small),
.report-shell.theme-report-shell :deep(.meta-card small),
.report-shell.theme-report-shell :deep(.meta-card strong),
.report-shell.theme-report-shell :deep(.section-header h4),
.report-shell.theme-report-shell :deep(.section-header button),
.report-shell.theme-report-shell :deep(.section-compact-preview),
.report-shell.theme-report-shell :deep(.compact-pill),
.report-shell.theme-report-shell :deep(.level-total-bar span),
.report-shell.theme-report-shell :deep(.level-total-bar strong) {
  color: #0f172a !important;
}

.report-shell.theme-report-shell :deep(.report-table thead th),
.report-shell.theme-report-shell :deep(table thead th) {
  background: linear-gradient(135deg, rgba(31, 95, 191, 0.96), rgba(200, 155, 60, 0.96)) !important;
  color: #ffffff !important;
}

.report-shell.theme-report-shell :deep(.report-table tbody td),
.report-shell.theme-report-shell :deep(table tbody td) {
  background: #ffffff !important;
  color: #0f172a !important;
  border-color: rgba(31, 95, 191, 0.08) !important;
}

.report-shell.theme-report-shell :deep(.form-control),
.report-shell.theme-report-shell :deep(.form-select),
.report-shell.theme-report-shell :deep(textarea.form-control) {
  background: #ffffff !important;
  color: #0f172a !important;
  border-color: rgba(31, 95, 191, 0.16) !important;
}

.report-shell.theme-report-shell :deep(.form-control::placeholder),
.report-shell.theme-report-shell :deep(textarea.form-control::placeholder) {
  color: #64748b !important;
}

.report-shell.theme-report-shell :deep(.bg-white),
.report-shell.theme-report-shell :deep(.bg-light),
.report-shell.theme-report-shell :deep(.modal-content),
.report-shell.theme-report-shell :deep(.dropdown-menu),
.report-shell.theme-report-shell :deep(.list-group-item),
.report-shell.theme-report-shell :deep(.alert),
.report-shell.theme-report-shell :deep(.input-group-text) {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 249, 255, 0.96)) !important;
  color: #0f172a !important;
  border-color: rgba(31, 95, 191, 0.12) !important;
}

.report-shell.theme-report-shell :deep(.btn-light),
.report-shell.theme-report-shell :deep(.btn-outline-light) {
  background: rgba(219, 234, 254, 0.68) !important;
  color: #1d4ed8 !important;
  border-color: rgba(31, 95, 191, 0.16) !important;
}

.report-shell.theme-report-shell :deep(.hero p),
.report-shell.theme-report-shell :deep(.status-badge),
.report-shell.theme-report-shell :deep(.meta-card small),
.report-shell.theme-report-shell :deep(.meta-card strong),
.report-shell.theme-report-shell :deep(.section-subtitle),
.report-shell.theme-report-shell :deep(.section-header h4),
.report-shell.theme-report-shell :deep(.section-header button),
.report-shell.theme-report-shell :deep(.compact-pill),
.report-shell.theme-report-shell :deep(.report-heading h3),
.report-shell.theme-report-shell :deep(.report-heading p),
.report-shell.theme-report-shell :deep(.report-heading span),
.report-shell.theme-report-shell :deep(.hero-actions .btn) {
  color: #0f172a !important;
}

.report-shell.theme-report-shell :deep(.status-badge) {
  background: rgba(219, 234, 254, 0.76) !important;
  border-color: rgba(31, 95, 191, 0.18) !important;
}

.report-shell.theme-report-shell :deep(.compact-pill) {
  background: rgba(255, 255, 255, 0.96) !important;
  border-color: rgba(31, 95, 191, 0.14) !important;
}

.report-shell.theme-report-shell :deep(.hero-actions .btn-primary),
.report-shell.theme-report-shell :deep(.hero-actions .btn-success) {
  color: #ffffff !important;
}

.report-shell.theme-report-shell :deep(.hero-actions .btn-outline-primary),
.report-shell.theme-report-shell :deep(.hero-actions .btn-outline-secondary) {
  color: #1d4ed8 !important;
}

@media (max-width: 992px) {
  .hero-meta,
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
