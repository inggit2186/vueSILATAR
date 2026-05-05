<template>
  <div :class="isAdminMadrasahView ? 'admin-madrasah-embedded' : 'main-wrapper'">
    <layouts v-if="!isAdminMadrasahView"></layouts>
    <div :class="isAdminMadrasahView ? 'admin-madrasah-embedded-page' : 'page-wrapper'">
      <breadcrumb
        v-if="!isAdminMadrasahView"
        title="Laporan Semester Madrasah"
        name="Laporan Semester"
        text="Madrasah"
        text1="Input Data"
      />

      <div class="dashboard-content">
        <div class="container">
          <div class="report-shell madrasah-page-shell">
            <MadrasahHeaderMenu v-if="!isAdminMadrasahView" />
            <div class="hero">
              <div class="hero-heading">
                <h2>Form Input Laporan Semester {{ currentSemesterLabel }}</h2>
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
              <p>Input cepat untuk sarana, bantuan, data guru/pegawai, dan statistik madrasah.</p>
              <div class="hero-actions">
                <div class="semester-filter">
                  <label for="semester-select">Semester</label>
                  <b-form-select
                    id="semester-select"
                    v-model="selectedSemester"
                    :options="semesterOptions"
                  />
                </div>
                <div class="semester-filter">
                  <label for="tahun-ajaran-input">Tahun Ajaran</label>
                  <b-form-select
                    id="tahun-ajaran-input"
                    v-model="tahunAjaran"
                    :options="academicYearOptions"
                  />
                </div>
                <b-button variant="primary" :disabled="isSavingDraft || isSubmittingReport" @click="saveDraft">
                  <i class="feather-save"></i> Simpan Draft
                </b-button>
                <b-button variant="success" :disabled="isSavingDraft || isSubmittingReport" @click="submitReport">
                  <i class="feather-send"></i> Kirim Laporan
                </b-button>
              </div>
            </div>

            <div class="grid-2">
              <div class="card-section">
                <div class="section-header">
                  <h4>A. Keadaan Gedung / Sarana Prasarana</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('keadaanGedung', 'A. Keadaan Gedung / Sarana Prasarana')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                    <b-button size="sm" variant="outline-primary" @click="addRow('keadaanGedung', 'condition')">
                      <i class="feather-plus"></i> Tambah
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Keadaan Gedung</th>
                        <th>Baik</th>
                        <th>Rusak Ringan</th>
                        <th>Rusak Sedang</th>
                        <th>Rusak Berat</th>
                        <th>Jml</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.keadaanGedung" :key="`kg-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Nama keadaan gedung"
                            >
                            <span v-else>{{ row.label }}</span>
                            <button type="button" class="delete-row-btn" @click="removeRow('keadaanGedung', idx)">X</button>
                          </div>
                        </td>
                        <td><input v-model.number="row.baik" type="number" min="0"></td>
                        <td><input v-model.number="row.ringan" type="number" min="0"></td>
                        <td><input v-model.number="row.sedang" type="number" min="0"></td>
                        <td><input v-model.number="row.berat" type="number" min="0"></td>
                        <td class="sum-cell">{{ sumCondition(row) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-section">
                <div class="section-header">
                  <h4>Keadaan Sarana Pendidikan</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('saranaPendidikan', 'Keadaan Sarana Pendidikan')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                    <b-button size="sm" variant="outline-primary" @click="addRow('saranaPendidikan', 'condition')">
                      <i class="feather-plus"></i> Tambah
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Sarana</th>
                        <th>Baik</th>
                        <th>Rusak Ringan</th>
                        <th>Rusak Sedang</th>
                        <th>Rusak Berat</th>
                        <th>Jml</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.saranaPendidikan" :key="`sp-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Nama sarana"
                            >
                            <span v-else>{{ row.label }}</span>
                            <button type="button" class="delete-row-btn" @click="removeRow('saranaPendidikan', idx)">X</button>
                          </div>
                        </td>
                        <td><input v-model.number="row.baik" type="number" min="0"></td>
                        <td><input v-model.number="row.ringan" type="number" min="0"></td>
                        <td><input v-model.number="row.sedang" type="number" min="0"></td>
                        <td><input v-model.number="row.berat" type="number" min="0"></td>
                        <td class="sum-cell">{{ sumCondition(row) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="grid-2">
              <div class="card-section">
                <div class="section-header">
                  <h4>Jenis Bantuan dari Pemerintah</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('bantuanPemerintah', 'Jenis Bantuan dari Pemerintah')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                    <b-button size="sm" variant="outline-primary" @click="addRow('bantuanPemerintah', 'aid')">
                      <i class="feather-plus"></i> Tambah
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Jenis Bantuan</th>
                        <th>Jumlah Diterima</th>
                        <th>Jumlah Terserap</th>
                        <th>Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.bantuanPemerintah" :key="`bp-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Jenis bantuan"
                            >
                            <span v-else>{{ row.label }}</span>
                            <button type="button" class="delete-row-btn" @click="removeRow('bantuanPemerintah', idx)">X</button>
                          </div>
                        </td>
                        <td><input v-model.number="row.diterima" type="number" min="0"></td>
                        <td><input v-model.number="row.terserap" type="number" min="0"></td>
                        <td class="sum-cell">{{ saldo(row) }}</td>
                      </tr>
                      <tr class="totals-row">
                        <td>Jumlah</td>
                        <td>{{ totalBantuan(formData.bantuanPemerintah, 'diterima') }}</td>
                        <td>{{ totalBantuan(formData.bantuanPemerintah, 'terserap') }}</td>
                        <td>{{ totalSaldo(formData.bantuanPemerintah) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-section">
                <div class="section-header">
                  <h4>Jenis Bantuan Non Pemerintah</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('bantuanNonPemerintah', 'Jenis Bantuan Non Pemerintah')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                    <b-button size="sm" variant="outline-primary" @click="addRow('bantuanNonPemerintah', 'aid')">
                      <i class="feather-plus"></i> Tambah
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Jenis Bantuan</th>
                        <th>Jumlah Diterima</th>
                        <th>Jumlah Terserap</th>
                        <th>Saldo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.bantuanNonPemerintah" :key="`bnp-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Jenis bantuan"
                            >
                            <span v-else>{{ row.label }}</span>
                            <button type="button" class="delete-row-btn" @click="removeRow('bantuanNonPemerintah', idx)">X</button>
                          </div>
                        </td>
                        <td><input v-model.number="row.diterima" type="number" min="0"></td>
                        <td><input v-model.number="row.terserap" type="number" min="0"></td>
                        <td class="sum-cell">{{ saldo(row) }}</td>
                      </tr>
                      <tr class="totals-row">
                        <td>Jumlah</td>
                        <td>{{ totalBantuan(formData.bantuanNonPemerintah, 'diterima') }}</td>
                        <td>{{ totalBantuan(formData.bantuanNonPemerintah, 'terserap') }}</td>
                        <td>{{ totalSaldo(formData.bantuanNonPemerintah) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="grid-2">
              <div class="card-section">
                <div class="section-header">
                  <h4>Data Guru / Pegawai</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('dataGuruPegawai', 'Data Guru / Pegawai')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Uraian</th>
                        <th>L</th>
                        <th>P</th>
                        <th>Jml</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.dataGuruPegawai" :key="`dgp-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Uraian"
                            >
                            <span v-else>{{ row.label }}</span>
                          </div>
                        </td>
                        <td><input v-model.number="row.l" type="number" min="0"></td>
                        <td><input v-model.number="row.p" type="number" min="0"></td>
                        <td class="sum-cell">{{ sumGender(row) }}</td>
                      </tr>
                      <tr class="totals-row">
                        <td>Jumlah</td>
                        <td>{{ totalGender(formData.dataGuruPegawai, 'l') }}</td>
                        <td>{{ totalGender(formData.dataGuruPegawai, 'p') }}</td>
                        <td>{{ totalGenderAll(formData.dataGuruPegawai) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-section">
                <div class="section-header">
                  <h4>Tingkat Pendidikan</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('tingkatPendidikan', 'Tingkat Pendidikan')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Tingkat</th>
                        <th>L</th>
                        <th>P</th>
                        <th>Jml</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.tingkatPendidikan" :key="`tp-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Tingkat pendidikan"
                            >
                            <span v-else>{{ row.label }}</span>
                          </div>
                        </td>
                        <td><input v-model.number="row.l" type="number" min="0"></td>
                        <td><input v-model.number="row.p" type="number" min="0"></td>
                        <td class="sum-cell">{{ sumGender(row) }}</td>
                      </tr>
                      <tr class="totals-row">
                        <td>Jumlah</td>
                        <td>{{ totalGender(formData.tingkatPendidikan, 'l') }}</td>
                        <td>{{ totalGender(formData.tingkatPendidikan, 'p') }}</td>
                        <td>{{ totalGenderAll(formData.tingkatPendidikan) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="grid-2">
              <div class="card-section">
                <div class="section-header">
                  <h4>Sertifikasi</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('sertifikasi', 'Sertifikasi')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Kategori</th>
                        <th>L</th>
                        <th>P</th>
                        <th>Jml</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(row, idx) in formData.sertifikasi" :key="`srt-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Kategori sertifikasi"
                            >
                            <span v-else>{{ row.label }}</span>
                          </div>
                        </td>
                        <td><input v-model.number="row.l" type="number" min="0"></td>
                        <td><input v-model.number="row.p" type="number" min="0"></td>
                        <td class="sum-cell">{{ sumGender(row) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div class="card-section">
                <div class="section-header">
                  <h4>Kehadiran & Absensi</h4>
                  <div class="section-actions">
                    <b-button size="sm" variant="outline-secondary" @click="resetSection('absensi', 'Kehadiran & Absensi')">
                      <i class="feather-refresh-ccw"></i> Reset
                    </b-button>
                  </div>
                </div>
                <div class="table-wrap">
                  <table class="report-table">
                    <thead>
                      <tr>
                        <th>Keterangan</th>
                        <th>L</th>
                        <th>P</th>
                        <th>Jml/Hari</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Banyak Hari Sekolah</td>
                        <td colspan="2"></td>
                        <td><input v-model.number="formData.banyakHariSekolah" type="number" min="0"></td>
                      </tr>
                      <tr v-for="(row, idx) in formData.absensiSiswa" :key="`abs-${idx}`">
                        <td>
                          <div class="label-cell">
                            <input
                              v-if="row.isCustom"
                              v-model="row.label"
                              type="text"
                              placeholder="Keterangan absensi"
                            >
                            <span v-else>{{ row.label }}</span>
                          </div>
                        </td>
                        <td><input v-model.number="row.l" type="number" min="0"></td>
                        <td><input v-model.number="row.p" type="number" min="0"></td>
                        <td class="sum-cell">{{ sumGender(row) }}</td>
                      </tr>
                      <tr class="totals-row">
                        <td>Jumlah</td>
                        <td>{{ totalGender(formData.absensiSiswa, 'l') }}</td>
                        <td>{{ totalGender(formData.absensiSiswa, 'p') }}</td>
                        <td>{{ totalGenderAll(formData.absensiSiswa) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="card-section">
              <div class="section-header">
                <h4>Tanah & Sertifikat Tanah</h4>
                <div class="section-actions">
                  <b-button size="sm" variant="outline-secondary" @click="resetSection('tanahSertifikat', 'Tanah & Sertifikat Tanah')">
                    <i class="feather-refresh-ccw"></i> Reset
                  </b-button>
                </div>
              </div>
              <div class="land-grid">
                <div class="input-block" v-for="(label, key) in luasTanahFields" :key="key">
                  <label>{{ label }}</label>
                  <input v-model.number="formData.luasTanah[key]" type="number" min="0" placeholder="0">
                </div>
              </div>
              <div class="certificate-grid">
                <div class="input-block">
                  <label>Status Kepemilikan Tanah</label>
                  <input v-model="formData.sertifikatTanah.statusKepemilikan" type="text" placeholder="Contoh: Milik Sendiri">
                </div>
                <div class="input-block">
                  <label>Nomor Sertifikat</label>
                  <input v-model="formData.sertifikatTanah.nomor" type="text" placeholder="Nomor sertifikat">
                </div>
                <div class="input-block">
                  <label>Tanggal Penerbitan Sertifikat</label>
                  <input v-model="formData.sertifikatTanah.tanggal" type="date">
                </div>
                <div class="input-block">
                  <label>Luas Tanah Sertifikat (m2)</label>
                  <input v-model.number="formData.sertifikatTanah.luas" type="number" min="0" placeholder="0">
                </div>
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
import { canManageAnyMadrasah, getStoredUser } from '@/utils/madrasahAccess'

const DRAFT_KEY_PREFIX = 'madrasah_laporan_semester_draft'

const createConditionRow = (label = '', isCustom = false) => ({
  label,
  baik: 0,
  ringan: 0,
  sedang: 0,
  berat: 0,
  isCustom
})

const createConditionRows = (labels) => labels.map((label) => ({
  ...createConditionRow(label)
}))

const createAidRow = (label = '', isCustom = false) => ({
  label,
  diterima: 0,
  terserap: 0,
  isCustom
})

const createAidRows = (labels) => labels.map((label) => ({
  ...createAidRow(label)
}))

const createGenderRow = (label = '', isCustom = false) => ({
  label,
  l: 0,
  p: 0,
  isCustom
})

const createGenderRows = (labels) => labels.map((label) => ({
  ...createGenderRow(label)
}))

const createDefaultFormData = () => ({
  keadaanGedung: createConditionRows([
    'Ruang Kelas',
    'Ruang Kamad',
    'Ruang Guru',
    'Ruang TU',
    'Ruang Lab. IPA',
    'Ruang Lab. Komputer',
    'Ruang Perpustakaan',
    'Ruang Keterampilan',
    'Ruang Seni',
    'Ruang UKS',
    'Aula',
    'Musholla / Ibadah',
    'WC',
    'Kamar Mandi',
    'Kantin'
  ]),
  saranaPendidikan: createConditionRows([
    'Bangku Uk. 1 Siswa',
    'Bangku Uk. 2 Siswa',
    'Kursi Siswa',
    'Lemari',
    'Rak Buku',
    'Papan Tulis',
    'Komputer Kantor',
    'Komputer Siswa',
    'Alat Peraga',
    'PKn',
    'Bahasa Indonesia',
    'Matematika',
    'IPA',
    'IPS',
    'Atlas',
    'Globe'
  ]),
  bantuanPemerintah: createAidRows(['BOS', 'BSM', 'Block Grant']),
  bantuanNonPemerintah: createAidRows(['Sumbangan']),
  dataGuruPegawai: createGenderRows([
    'Kepala Madrasah',
    'Wakil Kepala Madrasah',
    'Guru Mapel Umum',
    'Guru Penjaskes',
    'Guru Agama',
    'Guru BK',
    'Guru B. Inggris',
    'Ka TU',
    'Staf TU',
    'Bendahara',
    'Personel Lainnya'
  ]),
  tingkatPendidikan: createGenderRows([
    '< SLTA',
    'Diploma I (D1)',
    'Diploma II (D2)',
    'Diploma III (D3)',
    'Strata I (S1)',
    'Strata II (S2)',
    'Strata III (S3)'
  ]),
  sertifikasi: createGenderRows([
    'PNS Kemenag',
    'PNS Diknas',
    'GTT / GTY',
    'PPPK',
    'PPPK Paruh Waktu',
    'Belum Sertifikasi'
  ]),
  banyakHariSekolah: 0,
  absensiSiswa: createGenderRows(['Sakit', 'Ijin', 'Alpa / Tanpa Keterangan']),
  luasTanah: {
    total: 0,
    perkaranganLuas: 0,
    perkaranganTerbangun: 0,
    kebun: 0,
    lapanganOlahraga: 0,
    masjidMusholla: 0,
    wc: 0,
    perpustakaan: 0
  },
  sertifikatTanah: {
    statusKepemilikan: '',
    nomor: '',
    tanggal: '',
    luas: 0
  }
})

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

export default {
  name: 'LaporanSemesterMadrasah',
  components: {
    MadrasahHeaderMenu
  },
  data() {
    return {
      activeMadrasahId: null,
      selectedSemester: 'genap',
      tahunAjaran: getDefaultAcademicYear(),
      semesterOptions: [
        { value: 'ganjil', text: 'Semester Ganjil' },
        { value: 'genap', text: 'Semester Genap' }
      ],
      academicYearOptions: buildAcademicYearOptions(),
      formData: createDefaultFormData(),
      currentReportStatus: 'draft',
      currentSubmittedAt: null,
      currentAdminNoteRaw: '',
      isLoadingReport: false,
      isSavingDraft: false,
      isSubmittingReport: false,
      luasTanahFields: {
        total: 'Luas Tanah Seluruhnya (m2)',
        perkaranganLuas: 'Luas Perkarangan (m2)',
        perkaranganTerbangun: 'Luas Perkarangan Terbangun (m2)',
        kebun: 'Luas Kebun (m2)',
        lapanganOlahraga: 'Luas Lapangan Olahraga (m2)',
        masjidMusholla: 'Luas Masjid / Musholla (m2)',
        wc: 'Luas WC (m2)',
        perpustakaan: 'Luas Perpustakaan (m2)'
      }
    }
  },
  computed: {
    isAdminMadrasahView() {
      return String(this.$route?.path || '').startsWith('/admin/madrasah')
    },
    currentSemesterLabel() {
      return this.selectedSemester === 'ganjil' ? 'Ganjil' : 'Genap'
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
  watch: {
    async '$route.query.dept_id'() {
      const nextDeptId = this.getDeptId()
      if ((this.activeMadrasahId || null) === (nextDeptId || null)) {
        return
      }

      this.activeMadrasahId = nextDeptId
      await this.loadDraftBySemester(this.selectedSemester)
    },
    async selectedSemester(newValue, oldValue) {
      if (oldValue) {
        this.persistDraft(oldValue, this.tahunAjaran)
      }
      await this.loadDraftBySemester(newValue)
    },
    async tahunAjaran(newValue, oldValue) {
      if (oldValue && oldValue !== newValue) {
        this.persistDraft(this.selectedSemester, oldValue)
      }
      await this.loadDraftBySemester(this.selectedSemester, newValue)
    }
  },
  async mounted() {
    this.activeMadrasahId = this.getDeptId()
    await this.loadDraftBySemester(this.selectedSemester)
  },
  methods: {
    cloneValue(value) {
      return JSON.parse(JSON.stringify(value))
    },
    getDeptId() {
      if (canManageAnyMadrasah() && this.$route?.query?.dept_id) {
        return String(this.$route.query.dept_id).trim()
      }

      const user = getStoredUser()
      return user?.dept_id ?? user?.dept?.id ?? user?.dept?.dept_id ?? null
    },
    getStorageKey(semester = this.selectedSemester, tahunAjaran = this.tahunAjaran) {
      const madrasahKey = this.activeMadrasahId ?? 'default'
      return `${this.getDraftKey(semester, tahunAjaran)}_${madrasahKey}`
    },
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    normalizeAcademicYear(value = '') {
      return String(value).trim().replace(/[^\d/.-]/g, '') || 'tanpa_tahun'
    },
    getDraftKey(semester = this.selectedSemester, tahunAjaran = this.tahunAjaran) {
      return `${DRAFT_KEY_PREFIX}_${semester}_${this.normalizeAcademicYear(tahunAjaran)}`
    },
    normalizeReportData(data = {}) {
      this.currentReportStatus = data?.status || 'draft'
      this.currentSubmittedAt = data?.submitted_at || null
      this.currentAdminNoteRaw = data?.catatan_admin || ''
      const defaultData = createDefaultFormData()

      return {
        ...defaultData,
        keadaanGedung: Array.isArray(data?.keadaanGedung) ? data.keadaanGedung : defaultData.keadaanGedung,
        saranaPendidikan: Array.isArray(data?.saranaPendidikan) ? data.saranaPendidikan : defaultData.saranaPendidikan,
        bantuanPemerintah: Array.isArray(data?.bantuanPemerintah) ? data.bantuanPemerintah : defaultData.bantuanPemerintah,
        bantuanNonPemerintah: Array.isArray(data?.bantuanNonPemerintah) ? data.bantuanNonPemerintah : defaultData.bantuanNonPemerintah,
        dataGuruPegawai: Array.isArray(data?.dataGuruPegawai) ? data.dataGuruPegawai : defaultData.dataGuruPegawai,
        tingkatPendidikan: Array.isArray(data?.tingkatPendidikan) ? data.tingkatPendidikan : defaultData.tingkatPendidikan,
        sertifikasi: Array.isArray(data?.sertifikasi) ? data.sertifikasi : defaultData.sertifikasi,
        banyakHariSekolah: Number(data?.banyakHariSekolah) || 0,
        absensiSiswa: Array.isArray(data?.absensiSiswa) ? data.absensiSiswa : defaultData.absensiSiswa,
        luasTanah: data?.luasTanah && typeof data.luasTanah === 'object' ? data.luasTanah : defaultData.luasTanah,
        sertifikatTanah: data?.sertifikatTanah && typeof data.sertifikatTanah === 'object' ? data.sertifikatTanah : defaultData.sertifikatTanah
      }
    },
    applyPrefillReportData(data = {}) {
      const normalized = this.normalizeReportData({
        ...data,
        status: 'draft',
        submitted_at: null,
        catatan_admin: ''
      })

      this.currentReportStatus = 'draft'
      this.currentSubmittedAt = null
      this.currentAdminNoteRaw = ''

      return normalized
    },
    persistDraft(semester = this.selectedSemester, tahunAjaran = this.tahunAjaran) {
      localStorage.setItem(this.getStorageKey(semester, tahunAjaran), JSON.stringify(this.formData))
    },
    loadDraftFromStorage(semester = this.selectedSemester, tahunAjaran = this.tahunAjaran) {
      const draft = localStorage.getItem(this.getStorageKey(semester, tahunAjaran))

      if (!draft) {
        this.currentReportStatus = 'draft'
        this.currentSubmittedAt = null
        this.currentAdminNoteRaw = ''
        this.formData = createDefaultFormData()
        return
      }

      try {
        this.formData = this.normalizeReportData(JSON.parse(draft))
      } catch (error) {
        this.currentReportStatus = 'draft'
        this.currentSubmittedAt = null
        this.currentAdminNoteRaw = ''
        this.formData = createDefaultFormData()
        console.error('Gagal membaca draft laporan madrasah', error)
      }
    },
    async fetchReportByPeriod(semester = this.selectedSemester, tahunAjaran = this.tahunAjaran) {
      if (!this.activeMadrasahId) {
        this.loadDraftFromStorage(semester, tahunAjaran)
        return
      }

      this.isLoadingReport = true

      try {
        const response = await this.$axios.get(
          `${import.meta.env.VITE_APP_API_URL}/getMadrasahLaporanSemester/${this.activeMadrasahId}`,
          {
            headers: this.getAuthHeaders(),
            params: {
              semester,
              tahun_ajaran: tahunAjaran
            }
          }
        )

        const data = response?.data?.data
        const prefillData = response?.data?.prefill_data
        const shouldPrefill = !data && response?.data?.meta?.is_prefilled_from_latest && prefillData

        if (data) {
          this.formData = this.normalizeReportData(data)
          this.persistDraft(semester, tahunAjaran)
          return
        }

        if (shouldPrefill) {
          this.formData = this.applyPrefillReportData(prefillData)
          this.persistDraft(semester, tahunAjaran)
          this.$toast.fire({
            title: `Form ${this.currentSemesterLabel} ${tahunAjaran} diisi dari laporan terbaru`,
            icon: 'info'
          })
          return
        }
      } catch (error) {
        console.error('Gagal memuat laporan semester dari API', error)
      } finally {
        this.isLoadingReport = false
      }

      this.loadDraftFromStorage(semester, tahunAjaran)
    },
    async loadDraftBySemester(semester = this.selectedSemester, tahunAjaran = this.tahunAjaran) {
      await this.fetchReportByPeriod(semester, tahunAjaran)
    },
    buildSubmitPayload(status = 'draft') {
      return {
        dept_id: this.activeMadrasahId,
        semester: this.selectedSemester,
        tahun_ajaran: this.tahunAjaran,
        status,
        ...this.cloneValue(this.formData)
      }
    },
    asNumber(value) {
      return Number(value) || 0
    },
    sumCondition(row) {
      return this.asNumber(row.baik) + this.asNumber(row.ringan) + this.asNumber(row.sedang) + this.asNumber(row.berat)
    },
    sumGender(row) {
      return this.asNumber(row.l) + this.asNumber(row.p)
    },
    saldo(row) {
      const result = this.asNumber(row.diterima) - this.asNumber(row.terserap)
      return result < 0 ? 0 : result
    },
    totalBantuan(rows, key) {
      return rows.reduce((sum, row) => sum + this.asNumber(row[key]), 0)
    },
    totalSaldo(rows) {
      return rows.reduce((sum, row) => sum + this.saldo(row), 0)
    },
    totalGender(rows, key) {
      return rows.reduce((sum, row) => sum + this.asNumber(row[key]), 0)
    },
    totalGenderAll(rows) {
      return rows.reduce((sum, row) => sum + this.sumGender(row), 0)
    },
    addRow(section, type) {
      const rowFactory = {
        condition: () => createConditionRow('', true),
        aid: () => createAidRow('', true),
        gender: () => createGenderRow('', true)
      }

      const createRow = rowFactory[type]
      if (!createRow || !Array.isArray(this.formData[section])) return

      this.formData[section].push(createRow())
    },
    removeRow(section, index) {
      if (!Array.isArray(this.formData[section])) return
      this.formData[section].splice(index, 1)
    },
    resetSection(section, label) {
      const defaultData = createDefaultFormData()

      if (section === 'tanahSertifikat') {
        this.formData.luasTanah = this.cloneValue(defaultData.luasTanah)
        this.formData.sertifikatTanah = this.cloneValue(defaultData.sertifikatTanah)
      } else if (section === 'absensi') {
        this.formData.banyakHariSekolah = defaultData.banyakHariSekolah
        this.formData.absensiSiswa = this.cloneValue(defaultData.absensiSiswa)
      } else if (defaultData[section] !== undefined) {
        this.formData[section] = this.cloneValue(defaultData[section])
      } else {
        return
      }

      this.$toast.fire({
        title: `${label} berhasil direset`,
        icon: 'info'
      })
    },
    async saveDraft() {
      this.persistDraft(this.selectedSemester, this.tahunAjaran)

      if (!this.activeMadrasahId) {
        this.$toast.fire({
          title: `Draft ${this.currentSemesterLabel} ${this.tahunAjaran} disimpan lokal`,
          icon: 'success'
        })
        return
      }

      this.isSavingDraft = true

      try {
        const response = await this.$axios.post(
          `${import.meta.env.VITE_APP_API_URL}/saveMadrasahLaporanSemester`,
          this.buildSubmitPayload('draft'),
          { headers: this.getAuthHeaders() }
        )

        const savedData = response?.data?.data
        if (savedData) {
          this.formData = this.normalizeReportData(savedData)
          this.persistDraft(this.selectedSemester, this.tahunAjaran)
        }

        this.$toast.fire({
          title: `Draft ${this.currentSemesterLabel} ${this.tahunAjaran} berhasil disimpan`,
          icon: 'success'
        })
      } catch (error) {
        console.error('Gagal menyimpan laporan semester ke API', error)
        this.currentReportStatus = 'draft'
        this.$toast.fire({
          title: `Draft ${this.currentSemesterLabel} ${this.tahunAjaran} disimpan lokal`,
          icon: 'warning'
        })
      } finally {
        this.isSavingDraft = false
      }
    },
    async submitReport() {
      if (!this.activeMadrasahId) {
        this.$toast.fire({
          title: 'ID madrasah tidak ditemukan, laporan belum bisa dikirim',
          icon: 'warning'
        })
        return
      }

      const confirmation = await this.$swal.fire({
        title: 'Kirim laporan semester?',
        text: `Laporan ${this.currentSemesterLabel} ${this.tahunAjaran} akan dikirim sebagai final.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Ya, kirim',
        cancelButtonText: 'Batal',
        reverseButtons: true
      })

      if (!confirmation.isConfirmed) {
        return
      }

      this.persistDraft(this.selectedSemester, this.tahunAjaran)
      this.isSubmittingReport = true

      try {
        const response = await this.$axios.post(
          `${import.meta.env.VITE_APP_API_URL}/saveMadrasahLaporanSemester`,
          this.buildSubmitPayload('submitted'),
          { headers: this.getAuthHeaders() }
        )

        const savedData = response?.data?.data
        if (savedData) {
          this.formData = this.normalizeReportData(savedData)
          this.persistDraft(this.selectedSemester, this.tahunAjaran)
        }

        this.$toast.fire({
          title: `Laporan ${this.currentSemesterLabel} ${this.tahunAjaran} berhasil dikirim`,
          icon: 'success'
        })
      } catch (error) {
        console.error('Gagal mengirim laporan semester ke API', error)
        this.$toast.fire({
          title: `Laporan ${this.currentSemesterLabel} ${this.tahunAjaran} gagal dikirim`,
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

.semester-filter {
  min-width: 220px;
}

.semester-filter label {
  display: block;
  font-size: 0.78rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.semester-filter :deep(.form-select) {
  min-height: 38px;
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

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

@media (max-width: 767px) {
  .hero-meta {
    grid-template-columns: 1fr;
  }
}

.card-section {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border-radius: 12px;
  border: 1px solid rgba(201, 157, 79, 0.22);
  box-shadow: 0 8px 20px rgba(22, 12, 13, 0.18);
  padding: 0.9rem;
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
  color: #fff4dc;
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

.report-shell :deep(.grid-2) {
  gap: 1rem;
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

.section-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.table-wrap {
  overflow-x: auto;
}

.report-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 560px;
}

.report-table th,
.report-table td {
  border: 1px solid #d2d9e6;
  padding: 0.45rem;
  vertical-align: middle;
  font-size: 0.83rem;
}

.report-table thead th {
  background: #d8f7fb;
  color: #1b365d;
  text-align: center;
}

.report-table td:first-child {
  min-width: 170px;
}

.report-table input {
  width: 100%;
  border: 1px solid #cad5e6;
  border-radius: 6px;
  padding: 0.3rem 0.4rem;
  font-size: 0.82rem;
}

.sum-cell {
  text-align: center;
  background: #ecfdf3;
  font-weight: 700;
  color: #1d6f42;
}

.label-cell {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.label-cell span {
  flex: 1;
}

.delete-row-btn {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border: 1px solid #f6cfd3;
  border-radius: 999px;
  background: linear-gradient(180deg, #fffafb 0%, #ffeef0 100%);
  color: #b4233a;
  font-size: 0.5rem;
  font-weight: 700;
  line-height: 1;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(180, 35, 58, 0.08);
  transition: all 0.18s ease;
}

.delete-row-btn:hover {
  background: linear-gradient(180deg, #fff1f3 0%, #ffdfe4 100%);
  border-color: #e39aa4;
  color: #8f1d30;
  transform: scale(1.05);
  box-shadow: 0 2px 5px rgba(180, 35, 58, 0.12);
}

.delete-row-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(228, 107, 122, 0.18);
}

.totals-row td {
  background: #f1f9ff;
  font-weight: 700;
}

.land-grid,
.certificate-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.certificate-grid {
  margin-top: 1rem;
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

.input-block input {
  border: 1px solid #cad5e6;
  border-radius: 8px;
  padding: 0.48rem 0.55rem;
  font-size: 0.85rem;
}

.report-shell :deep(.hero),
.report-shell :deep(.card-section),
.report-shell :deep(.section-block),
.report-shell :deep(.profile-card) {
  background: linear-gradient(180deg, #2a191a 0%, #201214 100%) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
  color: #fff2d1 !important;
}

.report-shell :deep(.card-section h4),
.report-shell :deep(.card-section h5),
.report-shell :deep(.card-section p),
.report-shell :deep(.card-section span),
.report-shell :deep(.card-section small),
.report-shell :deep(.hero-heading h2),
.report-shell :deep(.hero-meta small),
.report-shell :deep(.hero-meta strong),
.report-shell :deep(.section-header h4),
.report-shell :deep(.section-subtitle),
.report-shell :deep(.semester-filter label),
.report-shell :deep(.semester-filter select),
.report-shell :deep(.table-wrap th),
.report-shell :deep(.table-wrap td),
.report-shell :deep(label),
.report-shell :deep(.col-form-label) {
  color: #fff2d1 !important;
}

.report-shell :deep(.section-header h4),
.report-shell :deep(.section-actions button),
.report-shell :deep(.meta-card small),
.report-shell :deep(.meta-card strong),
.report-shell :deep(.report-table th),
.report-shell :deep(.report-table td),
.report-shell :deep(.semester-filter label),
.report-shell :deep(.semester-filter select) {
  color: #fff2d1 !important;
}

.report-shell :deep(.status-draft) {
  background: rgba(201, 157, 79, 0.18);
  color: #fff4dc;
}

.report-shell :deep(.status-submitted) {
  background: rgba(106, 31, 43, 0.22);
  color: #fff4dc;
}

.report-shell :deep(.status-revisi) {
  background: rgba(214, 163, 47, 0.18);
  color: #fff4dc;
}

.report-shell :deep(.status-approved) {
  background: rgba(47, 95, 72, 0.22);
  color: #fff4dc;
}

.report-shell :deep(.report-table thead th),
.report-shell :deep(table thead th) {
  background: linear-gradient(135deg, #8f1d2c 0%, #c58a2a 100%) !important;
  color: #fff !important;
}

.report-shell :deep(.report-table tbody td),
.report-shell :deep(table tbody td) {
  background: rgba(255, 244, 216, 0.04) !important;
  color: #fff2d1 !important;
  border-color: rgba(201, 157, 79, 0.12) !important;
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
.report-shell :deep(.meta-card),
.report-shell :deep(.card-section) {
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

@media (max-width: 992px) {
  .grid-2,
  .land-grid,
  .certificate-grid {
    grid-template-columns: 1fr;
  }
}
</style>
