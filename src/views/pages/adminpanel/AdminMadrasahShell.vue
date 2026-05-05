<template>
  <div class="admin-madrasah-shell">
    <div class="admin-hero">
      <div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <div class="admin-hero-form">
        <label for="admin-madrasah-category">Jenis Madrasah</label>
        <div class="admin-hero-controls admin-hero-controls-stacked">
          <select
            id="admin-madrasah-category"
            v-model="selectedEndpoint"
            class="admin-hero-select"
            :disabled="loadingMadrasahList"
          >
            <option
              v-for="endpoint in endpointOptions"
              :key="endpoint.value"
              :value="endpoint.value"
            >
              {{ endpoint.label }}
            </option>
          </select>
          <div class="admin-hero-controls">
            <select
              id="admin-madrasah-dept-id"
              v-model="currentDeptId"
              class="admin-hero-select"
              :disabled="loadingMadrasahList || !filteredMadrasahOptions.length"
            >
              <option value="">
                {{ loadingMadrasahList ? 'Memuat daftar madrasah...' : 'Pilih madrasah' }}
              </option>
              <option
                v-for="item in filteredMadrasahOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </option>
            </select>
            <b-button variant="light" :disabled="!hasDeptId" @click="applyDeptId">Refresh</b-button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="hasDeptId" class="export-period-panel">
      <div class="export-period-heading">
        <div>
          <small>Periode Export</small>
          <strong>Tentukan periode data sebelum export gabungan</strong>
        </div>
      </div>
      <div class="export-period-grid">
        <div class="export-field">
          <label for="export-semester">Semester</label>
          <select id="export-semester" v-model="exportSemester" class="admin-hero-select admin-hero-select-dark">
            <option v-for="item in semesterOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="export-field">
          <label for="export-academic-year">Tahun Ajaran</label>
          <select id="export-academic-year" v-model="exportAcademicYear" class="admin-hero-select admin-hero-select-dark">
            <option v-for="item in academicYearOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="export-field">
          <label for="export-month">Bulan Laporan</label>
          <select id="export-month" v-model="exportMonth" class="admin-hero-select admin-hero-select-dark">
            <option v-for="item in monthSelectOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
        <div class="export-field">
          <label for="export-year">Tahun Laporan</label>
          <select id="export-year" v-model="exportYear" class="admin-hero-select admin-hero-select-dark">
            <option v-for="item in reportYearOptions" :key="item.value" :value="item.value">
              {{ item.label }}
            </option>
          </select>
        </div>
      </div>
      <div class="export-period-actions">
        <b-button
          class="export-action-button"
          :disabled="!hasDeptId || exportLoading"
          @click="handleCombinedExport"
        >
          <i class="feather-download export-action-icon"></i>
          <span>{{ exportLoading ? 'Menyiapkan Export...' : 'Export Gabungan' }}</span>
        </b-button>
      </div>
    </div>

    <div v-if="loadingMadrasahList || switchingMadrasah" class="loading-state">
      <div class="loading-state-inner">
        <b-spinner small variant="primary" />
        <span>{{ switchingMadrasah ? 'Memuat data madrasah yang dipilih...' : 'Memuat daftar madrasah dari server...' }}</span>
      </div>
    </div>

    <div class="feature-nav-panel">
      <div class="feature-nav-heading">
        <div>
          <small>Modul Admin Madrasah</small>
          <strong>Navigasi cepat antar fitur</strong>
        </div>
        <span v-if="selectedMadrasahLabel" class="selected-madrasah-badge">
          {{ selectedMadrasahLabel }}
        </span>
      </div>
      <div class="feature-nav">
        <router-link
          v-for="item in featureLinks"
          :key="item.to"
          :to="withDeptId(item.to)"
          class="feature-link"
          :class="{ active: isActive(item.to) }"
        >
          <strong>{{ item.label }}</strong>
          <small>{{ item.description }}</small>
        </router-link>
      </div>
    </div>

    <div v-if="showEmptyState && !hasDeptId" class="empty-state">
      <h4>Pilih madrasah terlebih dahulu</h4>
      <p>Pilih jenis dan nama madrasah agar fitur admin madrasah diarahkan ke data yang tepat.</p>
    </div>

    <div v-else class="admin-content-shell" :class="{ 'is-loading': switchingMadrasah }">
      <slot />
    </div>
  </div>
</template>

<script>
import madrasahService from '@/services/madrasahService'

const ADMIN_MADRASAH_LAST_DEPT_KEY = 'admin_madrasah_last_dept_id'
const ADMIN_MADRASAH_LAST_ENDPOINT_KEY = 'admin_madrasah_last_endpoint'
const MADRASAH_ENDPOINTS = [
  { value: 'getMIN', label: 'MIN' },
  { value: 'getMTsN', label: 'MTsN' },
  { value: 'getMAN', label: 'MAN' }
]

const MONTH_OPTIONS = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
]

const getCurrentAcademicContext = () => {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()
  const isGanjil = currentMonth >= 6
  const startYear = isGanjil ? currentYear : currentYear - 1

  return {
    semester: isGanjil ? 'ganjil' : 'genap',
    semesterLabel: isGanjil ? 'Ganjil' : 'Genap',
    tahunAjaran: `${startYear}/${startYear + 1}`,
    reportMonth: MONTH_OPTIONS[currentMonth],
    reportYear: currentYear
  }
}

const buildAcademicYearOptions = (centerYear, span = 2) => {
  const options = []

  for (let year = centerYear - span; year <= centerYear + span; year += 1) {
    options.push({
      value: `${year}/${year + 1}`,
      label: `${year}/${year + 1}`
    })
  }

  return options
}

const buildReportYearOptions = (centerYear, span = 2) => {
  const options = []

  for (let year = centerYear - span; year <= centerYear + span; year += 1) {
    options.push({
      value: year,
      label: String(year)
    })
  }

  return options
}

const escapeHtml = (value) => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;')

const slugify = (value) => String(value || '')
  .trim()
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '_')
  .replace(/^_+|_+$/g, '') || 'madrasah'

const asNumber = (value) => Number(value) || 0

const formatDateTime = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const displayValue = (value) => {
  const normalized = String(value ?? '').trim()
  return normalized || '-'
}

const formatExcelText = (value) => {
  const normalized = displayValue(value)
  if (normalized === '-') return normalized
  return `'${normalized}`
}

const EXCEL_WIDE_TABLE_STYLE = 'width:100%; border-collapse:collapse; border:2px solid #2a2a2a; font-family:Calibri, Arial, sans-serif;'
const EXCEL_WIDE_TH_STYLE = 'border:1px solid #2a2a2a; background:#f1ff38; color:#111; font-family:Cambria, "Times New Roman", serif; font-weight:700; font-size:10px; white-space:nowrap; padding:6px 7px; text-align:center; vertical-align:middle;'
const EXCEL_WIDE_TD_STYLE = 'border:1px solid #4a3325; background:#2a191a; color:#fff2d1; font-family:Calibri, Arial, sans-serif; font-size:10px; white-space:nowrap; padding:6px 7px; text-align:center; vertical-align:top;'
const EXCEL_WIDE_TD_LEFT_STYLE = `${EXCEL_WIDE_TD_STYLE} text-align:left;`

const displayJenisKelamin = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase()
  if (normalized === 'L') return 'Laki-laki'
  if (normalized === 'P') return 'Perempuan'
  return displayValue(value)
}

const parseMasaKerja = (value) => {
  if (!value) return { tahun: '', bulan: '' }

  const parts = String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  return {
    tahun: parts[0] || '',
    bulan: parts[1] || ''
  }
}

const displayMasaKerja = (item) => {
  const parsed = parseMasaKerja(item?.masa_kerja)
  const tahun = String(item?.masa_kerja_tahun ?? parsed.tahun ?? '').trim()
  const bulan = String(item?.masa_kerja_bulan ?? parsed.bulan ?? '').trim()

  if (!tahun && !bulan) return '-'
  if (tahun && bulan) return `${tahun} tahun ${bulan} bulan`
  if (tahun) return `${tahun} tahun`
  return `${bulan} bulan`
}

const parseIjazah = (value) => {
  if (!value) {
    return {
      fakultas: '',
      jurusan: '',
      universitas: '',
      pendidikan: '',
      tahun_lulus: ''
    }
  }

  const parts = String(value).split(',').map((item) => item.trim())
  return {
    fakultas: parts[0] || '',
    jurusan: parts[1] || '',
    universitas: parts[2] || '',
    pendidikan: parts[3] || '',
    tahun_lulus: parts[4] || ''
  }
}

const getPendidikanSummary = (item) => {
  const parsed = parseIjazah(item?.ijazah)
  const pendidikan = String(item?.ijazah_pendidikan ?? parsed.pendidikan ?? '').trim()
  const jurusan = String(item?.ijazah_jurusan ?? parsed.jurusan ?? '').trim()
  const universitas = String(item?.ijazah_universitas ?? parsed.universitas ?? '').trim()
  const tahunLulus = String(item?.ijazah_tahun_lulus ?? parsed.tahun_lulus ?? '').trim()

  return {
    pendidikan: displayValue([pendidikan, jurusan].filter(Boolean).join(' ').trim()),
    universitas: displayValue(universitas),
    tahunLulus: displayValue(tahunLulus)
  }
}

const normalizePegawaiRows = (rows, targetJabatan) => {
  if (!Array.isArray(rows)) return []

  return rows
    .map((item, index) => ({
      id: item?.id ?? item?.user_id ?? item?.nomor_induk ?? index + 1,
      nama: item?.nama ?? item?.name ?? '-',
      nip: item?.nip ?? item?.nomor_induk ?? '-',
      nik: item?.nik ?? '-',
      npwp: item?.npwp ?? '-',
      status: item?.status ?? '-',
      asn: String(item?.asn ?? '').trim().toUpperCase() || '-',
      jk: item?.jk ?? item?.jenis_kelamin ?? '-',
      jabatan: item?.jabatan ?? item?.pekerjaan ?? '-',
      gol: item?.gol ?? '-',
      satker: item?.satker ?? '-',
      email: item?.email ?? '-',
      hp: item?.hp ?? item?.phone ?? '-',
      tempat_lahir: item?.tempat_lahir ?? '-',
      tgl_lahir: item?.tgl_lahir ?? '-',
      tmt_cpns: item?.tmt_cpns ?? '-',
      tmt_pns: item?.tmt_pns ?? '-',
      tmt_tugas: item?.tmt_tugas ?? '-',
      masa_kerja: item?.masa_kerja ?? '-',
      masa_kerja_tahun: item?.masa_kerja_tahun ?? '',
      masa_kerja_bulan: item?.masa_kerja_bulan ?? '',
      kgb: item?.kgb ?? '-',
      ijazah: item?.ijazah ?? '-',
      ijazah_pendidikan: item?.ijazah_pendidikan ?? '-',
      ijazah_jurusan: item?.ijazah_jurusan ?? '-',
      ijazah_universitas: item?.ijazah_universitas ?? '-',
      ijazah_tahun_lulus: item?.ijazah_tahun_lulus ?? '-',
      alamat_ktp: item?.alamat_ktp ?? '-',
      alamat_tinggal: item?.alamat_tinggal ?? '-',
      keterangan: item?.keterangan ?? '-',
      pp: item?.pp ?? '-',
      peg_id: item?.peg_id ?? '-',
      nuptk: item?.nuptk ?? '-',
      npk: item?.npk ?? '-',
      nrg: item?.nrg ?? '-',
      bidang_studi_diajar: item?.bidang_studi_diajar ?? '-',
      sertifikasi: item?.sertifikasi ?? '-',
      bidang_studi_sertifikasi: item?.bidang_studi_sertifikasi ?? '-',
      nama_gadis_ibu_kandung: item?.nama_gadis_ibu_kandung ?? '-',
      kat_jabatan: String(item?.kat_jabatan ?? '').trim().toLowerCase(),
      sumber_data: String(item?.kat_jabatan ?? '').trim() || '-'
    }))
    .filter((item) => item.kat_jabatan === targetJabatan)
}

const renderSimpleKeyValueRows = (rows = []) => rows.map((row) => `
  <tr>
    <th>${escapeHtml(row.label)}</th>
    <td>${escapeHtml(row.value)}</td>
  </tr>
`).join('')

const renderEmptyRow = (colspan, message) => `
  <tr>
    <td colspan="${colspan}" class="empty-cell">${escapeHtml(message)}</td>
  </tr>
`

const renderPegawaiWideTable = (title, rows = [], isGuru = false) => {
  if (!rows.length) {
    return `
      <div class="subsection">
        <h4>${escapeHtml(title)}</h4>
        <table class="report-table wide-report-table" border="1" cellspacing="0" cellpadding="0" style="${EXCEL_WIDE_TABLE_STYLE}">
          <tbody>${renderEmptyRow(isGuru ? 28 : 23, 'Tidak ada data.')}</tbody>
        </table>
      </div>
    `
  }

    return `
    <div class="subsection">
      <h4>${escapeHtml(title)}</h4>
      <table class="report-table wide-report-table" border="1" cellspacing="0" cellpadding="0" style="${EXCEL_WIDE_TABLE_STYLE}">
        <thead>
          <tr>
            <th style="${EXCEL_WIDE_TH_STYLE}">No</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Nama</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Status</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">ASN</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">NIP</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">NIK</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">NPWP</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Gol</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">TMT CPNS</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">TMT PNS</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">TMT Tugas</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Tempat Lahir</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Tgl Lahir</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">JK</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Masa Kerja</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">KGB</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Pendidikan</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Universitas</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Tahun Lulus</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Jabatan</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">E-Mail</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">No. HP / WA</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Alamat KTP</th>
            <th style="${EXCEL_WIDE_TH_STYLE}">Alamat Tinggal</th>
            ${isGuru ? `<th style="${EXCEL_WIDE_TH_STYLE}">Peg.ID</th><th style="${EXCEL_WIDE_TH_STYLE}">NUPTK</th><th style="${EXCEL_WIDE_TH_STYLE}">NPK</th><th style="${EXCEL_WIDE_TH_STYLE}">NRG</th><th style="${EXCEL_WIDE_TH_STYLE}">Sertifikasi</th><th style="${EXCEL_WIDE_TH_STYLE}">Bidang Studi Diajar</th><th style="${EXCEL_WIDE_TH_STYLE}">Bidang Studi Sertifikasi</th><th style="${EXCEL_WIDE_TH_STYLE}">Nama Gadis Ibu Kandung</th>` : ''}
            <th style="${EXCEL_WIDE_TH_STYLE}">Ket</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((row, index) => {
            const pendidikan = getPendidikanSummary(row)
            return `
              <tr>
                <td style="${EXCEL_WIDE_TD_STYLE}">${index + 1}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.nama))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayValue(row.status))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayValue(row.asn))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.nip))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.nik))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.npwp))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayValue(row.gol))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatDate(row.tmt_cpns))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatDate(row.tmt_pns))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatDate(row.tmt_tugas))}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.tempat_lahir))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatDate(row.tgl_lahir))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayJenisKelamin(row.jk))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayMasaKerja(row))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatDate(row.kgb))}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(pendidikan.pendidikan)}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(pendidikan.universitas)}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(pendidikan.tahunLulus)}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.jabatan))}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.email))}</td>
                <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayValue(row.hp))}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.alamat_ktp))}</td>
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.alamat_tinggal))}</td>
                ${isGuru ? `
                  <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.peg_id))}</td>
                  <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.nuptk))}</td>
                  <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.npk))}</td>
                  <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(formatExcelText(row.nrg))}</td>
                  <td style="${EXCEL_WIDE_TD_STYLE}">${escapeHtml(displayValue(row.sertifikasi))}</td>
                  <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.bidang_studi_diajar))}</td>
                  <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.bidang_studi_sertifikasi))}</td>
                  <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.nama_gadis_ibu_kandung))}</td>
                ` : ''}
                <td style="${EXCEL_WIDE_TD_LEFT_STYLE}">${escapeHtml(displayValue(row.keterangan))}</td>
              </tr>
            `
          }).join('')}
        </tbody>
      </table>
    </div>
  `
}

const renderSemesterArrayTable = (title, rows = [], columns = []) => {
  if (!Array.isArray(rows) || !rows.length) {
    return `
      <div class="subsection">
        <h4>${escapeHtml(title)}</h4>
        <table class="report-table"><tbody>${renderEmptyRow(columns.length || 1, 'Belum ada data.')}</tbody></table>
      </div>
    `
  }

  return `
    <div class="subsection">
      <h4>${escapeHtml(title)}</h4>
      <table class="report-table">
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `
            <tr>
              ${columns.map((column) => `<td class="${column.align === 'left' ? 'text-left' : ''}">${escapeHtml(row?.[column.key] ?? '-')}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

const renderBulananStudentSummary = (studentCounts = {}) => {
  const rows = Object.keys(studentCounts || {})
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((code) => ({
      code,
      l: asNumber(studentCounts?.[code]?.l),
      p: asNumber(studentCounts?.[code]?.p)
    }))

  if (!rows.length) {
    return `<table class="report-table"><tbody>${renderEmptyRow(4, 'Belum ada rekap siswa.')}</tbody></table>`
  }

  const totalL = rows.reduce((sum, row) => sum + row.l, 0)
  const totalP = rows.reduce((sum, row) => sum + row.p, 0)

  return `
    <table class="report-table">
      <thead>
        <tr>
          <th>Kelas</th>
          <th>L</th>
          <th>P</th>
          <th>Jumlah</th>
        </tr>
      </thead>
      <tbody>
        ${rows.map((row) => `
          <tr>
            <td>${escapeHtml(row.code)}</td>
            <td>${row.l}</td>
            <td>${row.p}</td>
            <td>${row.l + row.p}</td>
          </tr>
        `).join('')}
        <tr class="total-row">
          <td>Total</td>
          <td>${totalL}</td>
          <td>${totalP}</td>
          <td>${totalL + totalP}</td>
        </tr>
      </tbody>
    </table>
  `
}

const renderBulananMutationTable = (rows = []) => {
  if (!Array.isArray(rows) || !rows.length) {
    return `<table class="report-table"><tbody>${renderEmptyRow(10, 'Belum ada data mutasi / mengundurkan diri / DO.')}</tbody></table>`
  }

  return `
    <table class="report-table">
      <thead>
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
        ${rows.map((row, index) => `
          <tr>
            <td>${index + 1}</td>
            <td class="text-left">${escapeHtml(row?.namaSiswa || '-')}</td>
            <td>${escapeHtml(row?.nisn || '-')}</td>
            <td>${escapeHtml(row?.nik || '-')}</td>
            <td>${escapeHtml(row?.jenisKelamin || '-')}</td>
            <td class="text-left">${escapeHtml(row?.tempatLahir || '-')}</td>
            <td>${escapeHtml(formatDate(row?.tanggalLahir))}</td>
            <td class="text-left">${escapeHtml(row?.namaIbuKandung || '-')}</td>
            <td>${escapeHtml(row?.kelas || '-')}</td>
            <td class="text-left">${escapeHtml(row?.keterangan || '-')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `
}

export default {
  name: 'AdminMadrasahShell',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: 'Kelola fitur-fitur madrasah dari panel admin.'
    },
    showEmptyState: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const currentContext = getCurrentAcademicContext()
    const reportYearNumber = Number(currentContext.reportYear)
    return {
      currentDeptId: '',
      selectedEndpoint: MADRASAH_ENDPOINTS[0].value,
      loadingMadrasahList: false,
      switchingMadrasah: false,
      exportLoading: false,
      exportSemester: currentContext.semester,
      exportAcademicYear: currentContext.tahunAjaran,
      exportMonth: currentContext.reportMonth,
      exportYear: reportYearNumber,
      academicYearOptions: buildAcademicYearOptions(reportYearNumber),
      reportYearOptions: buildReportYearOptions(reportYearNumber),
      madrasahOptions: [],
      suppressEndpointReset: false
    }
  },
  computed: {
    hasDeptId() {
      return Boolean(String(this.currentDeptId || '').trim())
    },
    endpointOptions() {
      return MADRASAH_ENDPOINTS
    },
    semesterOptions() {
      return [
        { value: 'ganjil', label: 'Ganjil' },
        { value: 'genap', label: 'Genap' }
      ]
    },
    monthSelectOptions() {
      return MONTH_OPTIONS.map((month) => ({
        value: month,
        label: month
      }))
    },
    filteredMadrasahOptions() {
      return this.madrasahOptions.filter(item => item.endpoint === this.selectedEndpoint)
    },
    selectedMadrasahLabel() {
      const deptId = String(this.currentDeptId || '').trim()

      if (!deptId) {
        return ''
      }

      return this.madrasahOptions.find(item => item.value === deptId)?.label || ''
    },
    featureLinks() {
      return [
        {
          to: '/admin/madrasah',
          label: 'Ringkasan',
          description: 'Akses cepat seluruh fitur madrasah'
        },
        {
          to: '/admin/madrasah/profil',
          label: 'Profil',
          description: 'Profil dan identitas madrasah'
        },
        {
          to: '/admin/madrasah/pegawai',
          label: 'Pegawai',
          description: 'Data pegawai madrasah'
        },
        {
          to: '/admin/madrasah/guru',
          label: 'Guru',
          description: 'Data guru madrasah'
        },
        {
          to: '/admin/madrasah/laporan-semester',
          label: 'Laporan Semester',
          description: 'Draft dan submit laporan semester'
        },
        {
          to: '/admin/madrasah/laporan-bulanan',
          label: 'Laporan Bulanan',
          description: 'Draft dan submit laporan bulanan'
        }
      ]
    }
  },
  async mounted() {
    const deptIdFromRoute = String(this.$route?.query?.dept_id || '').trim()
    const deptIdFromStorage = String(localStorage.getItem(ADMIN_MADRASAH_LAST_DEPT_KEY) || '').trim()
    const endpointFromRoute = String(this.$route?.query?.endpoint || '').trim()
    const endpointFromStorage = String(localStorage.getItem(ADMIN_MADRASAH_LAST_ENDPOINT_KEY) || '').trim()
    this.selectedEndpoint = MADRASAH_ENDPOINTS.some(item => item.value === endpointFromStorage)
      ? endpointFromStorage
      : MADRASAH_ENDPOINTS[0].value
    if (MADRASAH_ENDPOINTS.some(item => item.value === endpointFromRoute)) {
      this.selectedEndpoint = endpointFromRoute
    }
    this.currentDeptId = deptIdFromRoute || deptIdFromStorage
    await this.loadMadrasahOptions()
    this.syncEndpointWithDeptId()
  },
  watch: {
    '$route.query.dept_id': {
      immediate: false,
      handler(value) {
        this.currentDeptId = String(value || '').trim()
        this.syncEndpointWithDeptId()
        this.$nextTick(() => {
          this.switchingMadrasah = false
        })
      }
    },
    selectedEndpoint() {
      localStorage.setItem(ADMIN_MADRASAH_LAST_ENDPOINT_KEY, this.selectedEndpoint)

      if (this.suppressEndpointReset || this.loadingMadrasahList) {
        return
      }

      const hasCurrentSelection = this.filteredMadrasahOptions.some(
        item => String(item.value) === String(this.currentDeptId || '').trim()
      )

      if (!hasCurrentSelection) {
        this.currentDeptId = ''
      }
    },
    currentDeptId(value, oldValue) {
      if (this.loadingMadrasahList || this.suppressEndpointReset) {
        return
      }

      const nextValue = String(value || '').trim()
      const previousValue = String(oldValue || '').trim()

      if (!nextValue || nextValue === previousValue) {
        return
      }

      this.applyDeptId()
    },
    exportYear(value) {
      const numericYear = Number(value) || getCurrentAcademicContext().reportYear
      this.reportYearOptions = buildReportYearOptions(numericYear)
      if (!this.reportYearOptions.some((item) => item.value === numericYear)) {
        this.exportYear = numericYear
      }
    },
    exportAcademicYear(value) {
      const [startYearText] = String(value || '').split('/')
      const startYear = Number(startYearText)

      if (!startYear) {
        return
      }

      this.academicYearOptions = buildAcademicYearOptions(startYear)
    }
  },
  methods: {
    buildAuthHeaders() {
      return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    },
    normalizeMadrasahItem(item, endpoint) {
      const id = item?.id ?? item?.dept_id ?? item?.department_id ?? ''
      const nama = String(item?.nama || item?.nama_madrasah || item?.title || '').trim()
      const kode = String(item?.kode || item?.nsm || item?.npsm || '').trim()
      const alamat = String(item?.alamat || item?.jalan || item?.address || '').trim()
      const labelParts = [nama]

      if (kode) {
        labelParts.push(`(${kode})`)
      }

      if (alamat) {
        labelParts.push(`- ${alamat}`)
      }

      return {
        value: String(id).trim(),
        label: labelParts.filter(Boolean).join(' '),
        endpoint
      }
    },
    async loadMadrasahOptions() {
      this.loadingMadrasahList = true

      try {
        const headers = this.buildAuthHeaders()
        const responses = await Promise.all(
          MADRASAH_ENDPOINTS.map(item =>
            this.$axios.get(`${import.meta.env.VITE_APP_API_URL}/${item.value}`, { headers })
          )
        )

        this.madrasahOptions = responses.flatMap((response, index) => {
          const endpoint = MADRASAH_ENDPOINTS[index].value
          const rows = Array.isArray(response?.data?.data) ? response.data.data : []

          return rows
            .map(item => this.normalizeMadrasahItem(item, endpoint))
            .filter(item => item.value && item.label)
        })
      } catch (error) {
        console.error('Gagal memuat daftar madrasah admin', error)
        this.madrasahOptions = []
        this.$toast?.fire?.({
          title: 'Daftar madrasah gagal dimuat dari API',
          icon: 'error'
        })
      } finally {
        this.loadingMadrasahList = false
      }
    },
    syncEndpointWithDeptId() {
      const deptId = String(this.currentDeptId || '').trim()

      if (!deptId) {
        return
      }

      const matchedOption = this.madrasahOptions.find(item => item.value === deptId)

      if (matchedOption?.endpoint) {
        this.suppressEndpointReset = true
        this.selectedEndpoint = matchedOption.endpoint
        this.$nextTick(() => {
          this.suppressEndpointReset = false
        })
      }
    },
    withDeptId(path) {
      const deptId = String(this.currentDeptId || '').trim()
      return deptId
        ? { path, query: { dept_id: deptId, endpoint: this.selectedEndpoint } }
        : { path }
    },
    isActive(path) {
      return this.$route.path === path
    },
    applyDeptId() {
      const deptId = String(this.currentDeptId || '').trim()
      const currentRouteDeptId = String(this.$route?.query?.dept_id || '').trim()
      const currentRouteEndpoint = String(this.$route?.query?.endpoint || '').trim()

      if (!deptId) {
        this.$toast?.fire?.({
          title: 'Pilih madrasah terlebih dahulu',
          icon: 'warning'
        })
        return
      }

      localStorage.setItem(ADMIN_MADRASAH_LAST_DEPT_KEY, deptId)
      localStorage.setItem(ADMIN_MADRASAH_LAST_ENDPOINT_KEY, this.selectedEndpoint)

      if (currentRouteDeptId === deptId && currentRouteEndpoint === this.selectedEndpoint) {
        this.switchingMadrasah = false
        return
      }

      this.switchingMadrasah = true
      this.$router.replace({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          dept_id: deptId,
          endpoint: this.selectedEndpoint
        }
      })
    },
    async fetchCombinedExportData() {
      const deptId = String(this.currentDeptId || '').trim()
      const semesterValue = String(this.exportSemester || 'genap').toLowerCase()
      const context = {
        semester: semesterValue,
        semesterLabel: semesterValue === 'ganjil' ? 'Ganjil' : 'Genap',
        tahunAjaran: this.exportAcademicYear,
        reportMonth: this.exportMonth,
        reportYear: Number(this.exportYear) || getCurrentAcademicContext().reportYear
      }
      const headers = this.buildAuthHeaders()

      const [profileResponse, pegawaiRows, semesterResponse, bulananResponse] = await Promise.all([
        this.$axios.get(`${import.meta.env.VITE_APP_API_URL}/getMadrasahProfil/${deptId}`, { headers }),
        madrasahService.getPegawaiByDeptId(deptId),
        this.$axios.get(`${import.meta.env.VITE_APP_API_URL}/getMadrasahLaporanSemester/${deptId}`, {
          headers,
          params: {
            semester: context.semester,
            tahun_ajaran: context.tahunAjaran
          }
        }),
        this.$axios.get(`${import.meta.env.VITE_APP_API_URL}/getMadrasahLaporanBulanan/${deptId}`, {
          headers,
          params: {
            bulan_laporan: context.reportMonth,
            tahun_laporan: context.reportYear,
            tahun_ajaran: context.tahunAjaran,
            semester: context.semesterLabel
          }
        })
      ])

      return {
        deptId,
        context,
        profile: profileResponse?.data?.data || {},
        pegawai: normalizePegawaiRows(pegawaiRows, 'adm'),
        guru: normalizePegawaiRows(pegawaiRows, 'guru'),
        semester: semesterResponse?.data?.data || semesterResponse?.data?.prefill_data || null,
        semesterMeta: semesterResponse?.data?.meta || {},
        bulanan: bulananResponse?.data?.data || bulananResponse?.data?.prefill_data || null,
        bulananMeta: bulananResponse?.data?.meta || {},
        selectedMadrasahLabel: this.selectedMadrasahLabel
      }
    },
    buildCombinedExportHtml(bundle) {
      const profile = bundle?.profile || {}
      const semester = bundle?.semester || {}
      const bulanan = bundle?.bulanan || {}
      const fileDate = formatDateTime(new Date())

      const profilRows = [
        { label: 'Nama Madrasah', value: profile.nama || '-' },
        { label: 'NSM', value: profile.nsm || '-' },
        { label: 'NPSM', value: profile.npsm || '-' },
        { label: 'Status Lembaga', value: profile.status_lembaga || '-' },
        { label: 'Kategori', value: profile.kategori || '-' },
        { label: 'Alamat', value: [profile.jalan, profile.jorong, profile.nagari, profile.kecamatan].filter(Boolean).join(', ') || '-' },
        { label: 'Koordinat', value: profile.koordinat || '-' },
        { label: 'Telepon', value: profile.telepon || '-' },
        { label: 'Email', value: profile.email || '-' },
        { label: 'Website', value: profile.website || '-' },
        { label: 'Waktu Belajar', value: profile.waktu_belajar || '-' },
        { label: 'Visi', value: profile.visi || '-' },
        { label: 'SK Pendirian', value: profile.sk_pendirian || '-' },
        { label: 'Tanggal SK', value: formatDate(profile.tanggal_sk) },
        { label: 'Akreditasi', value: profile.akreditasi || '-' },
        { label: 'Tanggal Akreditasi', value: formatDate(profile.tanggal_akreditasi) }
      ]

      return `
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${escapeHtml(`Export Madrasah ${profile.nama || bundle.selectedMadrasahLabel || bundle.deptId}`)}</title>
            <style>
              @page { size: A4 landscape; margin: 10mm; }
              body { font-family: Calibri, Arial, sans-serif; color: #fff2d1; margin: 0; padding: 20px; background: #231516; }
              .wrapper { display: flex; flex-direction: column; gap: 18px; }
              .sheet { background: linear-gradient(180deg, #2a191a 0%, #241516 100%); border: 1px solid rgba(201, 157, 79, 0.22); border-radius: 18px; padding: 18px 20px; box-shadow: 0 12px 30px rgba(22, 12, 13, 0.22); page-break-after: always; }
              .sheet:last-child { page-break-after: auto; }
              .hero { padding: 18px 20px; border-radius: 16px; background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%); color: #fff; }
              .hero h1, .hero h2, .hero p { margin: 0; }
              .hero h1 { font-size: 24px; margin-bottom: 6px; }
              .hero h2 { font-size: 15px; font-weight: 600; margin-bottom: 6px; opacity: 0.95; }
              .hero p { font-size: 12px; opacity: 0.88; }
              .meta-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-top: 14px; }
              .meta-card { background: rgba(255,244,216,0.08); border: 1px solid rgba(201,157,79,0.2); border-radius: 12px; padding: 10px 12px; }
              .meta-card span { display: block; font-size: 10px; text-transform: uppercase; opacity: 0.8; margin-bottom: 4px; }
              .meta-card strong { font-size: 13px; }
              .section-title { font-size: 18px; margin: 0 0 10px; color: #fff2d1; }
              .section-subtitle { font-size: 12px; color: rgba(255,240,197,0.78); margin: 0 0 12px; }
              .two-col { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
              .subsection { margin-bottom: 14px; }
              .subsection h4 { margin: 0 0 8px; color: #fff2d1; font-size: 14px; }
              .report-table { width: 100%; border-collapse: collapse; font-family: Calibri, Arial, sans-serif; }
              .report-table th, .report-table td { border: 1px solid rgba(201,157,79,0.2); padding: 6px 7px; font-size: 11px; vertical-align: top; text-align: center; color: #fff2d1; }
              .report-table th { background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%); font-weight: 700; color: #fff; }
              .report-table tbody tr:nth-child(even) td { background: rgba(255,244,216,0.04); }
              .text-left { text-align: left !important; }
              .empty-cell { text-align: center; color: rgba(255,240,197,0.72); padding: 14px; }
              .chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; }
              .chip { display: inline-flex; align-items: center; padding: 6px 10px; border-radius: 999px; background: rgba(255,244,216,0.06); color: #fff2d1; font-size: 11px; font-weight: 700; border: 1px solid rgba(201,157,79,0.2); }
              .footer-note { margin-top: 12px; font-size: 11px; color: rgba(255,240,197,0.72); text-align: right; }
              .total-row td { font-weight: 700; background: rgba(201,157,79,0.12) !important; }
              .wide-report-table { border: 2px solid rgba(201,157,79,0.24); table-layout: auto; }
              .wide-report-table th,
              .wide-report-table td { border: 1px solid rgba(201,157,79,0.2); font-size: 10px; white-space: nowrap; }
              .wide-report-table th { background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%); color: #fff; font-family: Cambria, 'Times New Roman', serif; font-weight: 700; }
              .wide-report-table td { background: rgba(255,244,216,0.04); color: #fff2d1; font-family: Calibri, Arial, sans-serif; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <section class="sheet">
                <div class="hero">
                  <h1>${escapeHtml(profile.nama || bundle.selectedMadrasahLabel || 'Madrasah')}</h1>
                  <h2>Export Gabungan Data Madrasah</h2>
                  <p>Berisi profil madrasah, data pegawai, data guru, laporan semester, dan laporan bulanan untuk madrasah yang sedang dipilih.</p>
                  <div class="meta-grid">
                    <div class="meta-card"><span>ID Madrasah</span><strong>${escapeHtml(bundle.deptId)}</strong></div>
                    <div class="meta-card"><span>Jenis</span><strong>${escapeHtml(this.endpointOptions.find((item) => item.value === this.selectedEndpoint)?.label || '-')}</strong></div>
                    <div class="meta-card"><span>Periode Semester</span><strong>${escapeHtml(`${bundle.context.semesterLabel} ${bundle.context.tahunAjaran}`)}</strong></div>
                    <div class="meta-card"><span>Periode Bulanan</span><strong>${escapeHtml(`${bundle.context.reportMonth} ${bundle.context.reportYear}`)}</strong></div>
                  </div>
                </div>
                <div class="footer-note">Diekspor pada ${escapeHtml(fileDate)}</div>
              </section>

              <section class="sheet">
                <h3 class="section-title">Profil Madrasah</h3>
                <p class="section-subtitle">Identitas dan informasi kelembagaan madrasah.</p>
                <table class="report-table">
                  <tbody>${renderSimpleKeyValueRows(profilRows)}</tbody>
                </table>
              </section>

              <section class="sheet">
                <h3 class="section-title">Data Pegawai dan Guru</h3>
                <p class="section-subtitle">Data ditampilkan memanjang ke samping agar lebih cocok untuk format Excel rekap pegawai dan guru.</p>
                ${renderPegawaiWideTable('Pegawai', bundle.pegawai)}
                ${renderPegawaiWideTable('Guru', bundle.guru, true)}
              </section>

              <section class="sheet">
                <h3 class="section-title">Laporan Semester</h3>
                <div class="chip-row">
                  <span class="chip">Status: ${escapeHtml(semester?.status || 'Belum ada')}</span>
                  <span class="chip">Semester: ${escapeHtml((semester?.semester || bundle.context.semester).toString())}</span>
                  <span class="chip">Tahun Ajaran: ${escapeHtml(semester?.tahun_ajaran || bundle.context.tahunAjaran)}</span>
                  <span class="chip">Submit: ${escapeHtml(formatDateTime(semester?.submitted_at))}</span>
                </div>
                ${renderSemesterArrayTable('Keadaan Gedung', semester?.keadaanGedung, [
                  { key: 'label', label: 'Item', align: 'left' },
                  { key: 'baik', label: 'Baik' },
                  { key: 'ringan', label: 'Rusak Ringan' },
                  { key: 'sedang', label: 'Rusak Sedang' },
                  { key: 'berat', label: 'Rusak Berat' },
                  { key: 'jumlah', label: 'Jumlah' }
                ])}
                ${renderSemesterArrayTable('Sarana Pendidikan', semester?.saranaPendidikan, [
                  { key: 'label', label: 'Item', align: 'left' },
                  { key: 'baik', label: 'Baik' },
                  { key: 'ringan', label: 'Rusak Ringan' },
                  { key: 'sedang', label: 'Rusak Sedang' },
                  { key: 'berat', label: 'Rusak Berat' },
                  { key: 'jumlah', label: 'Jumlah' }
                ])}
                ${renderSemesterArrayTable('Bantuan Pemerintah', semester?.bantuanPemerintah, [
                  { key: 'label', label: 'Bantuan', align: 'left' },
                  { key: 'diterima', label: 'Diterima' },
                  { key: 'terserap', label: 'Terserap' },
                  { key: 'saldo', label: 'Saldo' }
                ])}
                ${renderSemesterArrayTable('Bantuan Non Pemerintah', semester?.bantuanNonPemerintah, [
                  { key: 'label', label: 'Bantuan', align: 'left' },
                  { key: 'diterima', label: 'Diterima' },
                  { key: 'terserap', label: 'Terserap' },
                  { key: 'saldo', label: 'Saldo' }
                ])}
                ${renderSemesterArrayTable('Data Guru dan Pegawai', semester?.dataGuruPegawai, [
                  { key: 'label', label: 'Kategori', align: 'left' },
                  { key: 'l', label: 'L' },
                  { key: 'p', label: 'P' },
                  { key: 'jumlah', label: 'Jumlah' }
                ])}
                ${renderSemesterArrayTable('Tingkat Pendidikan', semester?.tingkatPendidikan, [
                  { key: 'label', label: 'Jenjang', align: 'left' },
                  { key: 'l', label: 'L' },
                  { key: 'p', label: 'P' },
                  { key: 'jumlah', label: 'Jumlah' }
                ])}
                ${renderSemesterArrayTable('Sertifikasi', semester?.sertifikasi, [
                  { key: 'label', label: 'Kategori', align: 'left' },
                  { key: 'l', label: 'L' },
                  { key: 'p', label: 'P' },
                  { key: 'jumlah', label: 'Jumlah' }
                ])}
                ${renderSemesterArrayTable('Absensi Siswa', semester?.absensiSiswa, [
                  { key: 'label', label: 'Kategori', align: 'left' },
                  { key: 'l', label: 'L' },
                  { key: 'p', label: 'P' },
                  { key: 'jumlah', label: 'Jumlah' }
                ])}
              </section>

              <section class="sheet">
                <h3 class="section-title">Laporan Bulanan</h3>
                <div class="chip-row">
                  <span class="chip">Status: ${escapeHtml(bulanan?.status || 'Belum ada')}</span>
                  <span class="chip">Periode: ${escapeHtml(`${bulanan?.bulan_laporan || bundle.context.reportMonth} ${bulanan?.tahun_laporan || bundle.context.reportYear}`)}</span>
                  <span class="chip">Tahun Ajaran: ${escapeHtml(bulanan?.tahun_ajaran || bundle.context.tahunAjaran)}</span>
                  <span class="chip">Semester: ${escapeHtml(bulanan?.semester || bundle.context.semesterLabel)}</span>
                </div>
                <div class="two-col">
                  <div>
                    <h4 class="section-subtitle">Informasi Umum</h4>
                    <table class="report-table">
                      <tbody>
                        ${renderSimpleKeyValueRows([
                          { label: 'Nama Madrasah', value: bulanan?.namaMadrasah || profile.nama || '-' },
                          { label: 'Instansi', value: bulanan?.officeName || '-' },
                          { label: 'RB', value: bulanan?.rb ?? '-' },
                          { label: 'Tanggal Submit', value: formatDateTime(bulanan?.submitted_at) },
                          { label: 'Catatan Admin', value: bulanan?.catatan_admin || '-' }
                        ])}
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <h4 class="section-subtitle">Rekap Siswa per Kelas</h4>
                    ${renderBulananStudentSummary(bulanan?.studentCounts || {})}
                  </div>
                </div>
                <div class="subsection">
                  <h4>Data Siswa Mutasi / Mengundurkan Diri / DO</h4>
                  ${renderBulananMutationTable(bulanan?.mutationRows || [])}
                </div>
              </section>
            </div>
          </body>
        </html>
      `
    },
    downloadExportFile(content, fileName, mimeType) {
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
    async handleCombinedExport() {
      if (!this.hasDeptId) {
        this.$toast?.fire?.({
          title: 'Pilih madrasah terlebih dahulu',
          icon: 'warning'
        })
        return
      }

      let exportFormat = 'excel'
      if (this.$swal?.fire) {
        const result = await this.$swal.fire({
          title: 'Pilih format export',
          text: 'Semua data madrasah akan digabungkan ke dalam satu file.',
          icon: 'question',
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: 'Excel',
          denyButtonText: 'PDF',
          cancelButtonText: 'Batal'
        })

        if (result.isDismissed) {
          return
        }

        exportFormat = result.isDenied ? 'pdf' : 'excel'
      }

      this.exportLoading = true

      try {
        const bundle = await this.fetchCombinedExportData()
        const documentHtml = this.buildCombinedExportHtml(bundle)
        const fileBaseName = `madrasah_export_lengkap_${slugify(bundle.profile?.nama || bundle.selectedMadrasahLabel || bundle.deptId)}`

        if (exportFormat === 'pdf') {
          const printWindow = window.open('', '_blank', 'width=1400,height=920')
          if (!printWindow) {
            this.$toast?.fire?.({
              title: 'Popup diblokir browser. Izinkan popup untuk export PDF.',
              icon: 'warning'
            })
            return
          }

          printWindow.document.open()
          printWindow.document.write(documentHtml)
          printWindow.document.close()
          printWindow.focus()
          window.setTimeout(() => {
            printWindow.print()
          }, 350)
        } else {
          this.downloadExportFile(
            documentHtml,
            `${fileBaseName}.xls`,
            'application/vnd.ms-excel;charset=utf-8;'
          )
        }

        this.$toast?.fire?.({
          title: `Export ${exportFormat.toUpperCase()} berhasil dibuat`,
          icon: 'success'
        })
      } catch (error) {
        console.error('Gagal membuat export gabungan madrasah', error)
        this.$toast?.fire?.({
          title: 'Export gabungan gagal dibuat',
          icon: 'error'
        })
      } finally {
        this.exportLoading = false
      }
    }
  }
}
</script>

<style scoped>
.admin-madrasah-shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-hero {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1.2rem 1.4rem;
  border-radius: 16px;
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
  box-shadow: 0 16px 34px rgba(143, 29, 44, 0.2);
}

.admin-hero h2 {
  margin: 0 0 0.35rem;
}

.admin-hero p {
  margin: 0;
  max-width: 640px;
  opacity: 0.9;
}

.admin-hero-form {
  min-width: 320px;
}

.admin-hero-form label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.8rem;
  font-weight: 700;
}

.admin-hero-controls {
  display: flex;
  gap: 0.6rem;
}

.admin-hero-controls-stacked {
  flex-direction: column;
}

.admin-hero-select {
  flex: 1;
  min-height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(255, 244, 216, 0.18);
  background: rgba(255, 244, 216, 0.08);
  color: #fff2d1;
  padding: 0.55rem 0.75rem;
}

.admin-hero-select option {
  color: #fff2d1;
  background: #2a191a;
}

.feature-nav-panel {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: linear-gradient(180deg, #2a191a 0%, #3a2224 100%);
  border: 1px solid rgba(201, 157, 79, 0.26);
  box-shadow: 0 14px 28px rgba(22, 12, 13, 0.28);
}

.feature-nav-heading {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: center;
  flex-wrap: wrap;
}

.feature-nav-heading small {
  display: block;
  margin-bottom: 0.15rem;
  color: #c9a26d;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.feature-nav-heading strong {
  color: #fff4d8;
  font-size: 1rem;
}

.selected-madrasah-badge {
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 244, 216, 0.08);
  border: 1px solid rgba(201, 157, 79, 0.25);
  color: #fff0c5;
  font-size: 0.78rem;
  font-weight: 700;
  box-shadow: 0 8px 18px rgba(22, 12, 13, 0.18);
}

.feature-nav {
  display: flex;
  gap: 0.7rem;
  overflow-x: auto;
  padding-bottom: 0.15rem;
  scrollbar-width: thin;
}

.feature-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.16rem;
  min-width: 180px;
  padding: 0.78rem 0.95rem;
  border-radius: 14px;
  background: rgba(255, 244, 216, 0.06);
  border: 1px solid rgba(201, 157, 79, 0.2);
  color: #fff2d1;
  text-decoration: none;
  transition: all 0.2s ease;
}

.feature-link strong {
  font-size: 0.88rem;
}

.feature-link small {
  color: rgba(255, 240, 197, 0.75);
  line-height: 1.35;
  font-size: 0.76rem;
}

.feature-link.active {
  border-color: rgba(246, 212, 122, 0.65);
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
  box-shadow: 0 14px 26px rgba(143, 29, 44, 0.22);
}

.feature-link.active small {
  color: rgba(255, 255, 255, 0.9);
}

.feature-link:hover {
  transform: translateY(-1px);
  border-color: rgba(246, 212, 122, 0.45);
}

.empty-state {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border: 1px dashed rgba(201, 157, 79, 0.32);
  border-radius: 16px;
  padding: 2rem 1.4rem;
  text-align: center;
  color: #f0d8ac;
}

.admin-content-shell {
  position: relative;
  transition: opacity 0.2s ease;
}

.admin-content-shell.is-loading {
  opacity: 0.55;
  pointer-events: none;
}

.loading-state {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border: 1px solid rgba(201, 157, 79, 0.22);
  border-radius: 16px;
  padding: 0.9rem 1.1rem;
  box-shadow: 0 10px 22px rgba(22, 12, 13, 0.18);
}

.loading-state-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  color: #fff0c5;
  font-weight: 600;
}

.export-period-panel {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border: 1px solid rgba(201, 157, 79, 0.24);
  box-shadow: 0 10px 24px rgba(22, 12, 13, 0.18);
}

.export-period-heading small {
  display: block;
  margin-bottom: 0.15rem;
  color: #c9a26d;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.export-period-heading strong {
  color: #fff2d1;
  font-size: 1rem;
}

.export-period-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

.export-field label {
  display: block;
  margin-bottom: 0.35rem;
  color: #f0d8ac;
  font-size: 0.8rem;
  font-weight: 700;
}

.export-period-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 0.1rem;
}

.export-action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  min-height: 46px;
  padding: 0.75rem 1.25rem;
  border: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 14px 28px rgba(143, 29, 44, 0.24);
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

.export-action-button:hover:not(:disabled),
.export-action-button:focus:not(:disabled) {
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 18px 32px rgba(143, 29, 44, 0.28);
  filter: brightness(1.02);
}

.export-action-button:disabled {
  opacity: 0.72;
  box-shadow: none;
}

.export-action-icon {
  font-size: 1rem;
}

.admin-hero-select-dark {
  width: 100%;
  color: #fff2d1;
  background: rgba(255, 244, 216, 0.06);
  border-color: rgba(201, 157, 79, 0.22);
}

.admin-hero-select-dark option {
  color: #fff2d1;
  background: #2a191a;
}

.empty-state h4 {
  color: #fff2d1;
  margin-bottom: 0.4rem;
}

.empty-state p {
  color: rgba(255, 240, 197, 0.78);
}

.admin-hero-select:focus,
.admin-hero-select-dark:focus {
  outline: none;
  border-color: rgba(246, 212, 122, 0.45);
  box-shadow: 0 0 0 0.2rem rgba(201, 157, 79, 0.14);
}

@media (max-width: 1200px) {
  .feature-link {
    min-width: 170px;
  }

  .export-period-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .admin-hero-form {
    min-width: 100%;
  }

  .feature-nav-panel {
    padding: 0.9rem;
  }

  .feature-nav-heading {
    align-items: flex-start;
  }

  .admin-hero-controls {
    flex-direction: column;
  }

  .export-period-grid {
    grid-template-columns: 1fr;
  }
}
</style>
