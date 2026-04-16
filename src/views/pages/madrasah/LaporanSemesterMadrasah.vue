<template>
  <div class="main-wrapper">
    <layouts></layouts>
    <div class="page-wrapper">
      <breadcrumb
        title="Laporan Semester Madrasah"
        name="Laporan Semester"
        text="Madrasah"
        text1="Input Data"
      />

      <div class="dashboard-content">
        <div class="container">
          <div class="report-shell">
            <MadrasahHeaderMenu />
            <div class="hero">
              <h2>Form Input Laporan Semester Genap</h2>
              <p>Input cepat untuk sarana, bantuan, data guru/pegawai, dan statistik madrasah.</p>
              <div class="hero-actions">
                <b-button variant="primary" @click="saveDraft">
                  <i class="feather-save"></i> Simpan Draft
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

const DRAFT_KEY = 'madrasah_laporan_semester_draft'

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

export default {
  name: 'LaporanSemesterMadrasah',
  components: {
    MadrasahHeaderMenu
  },
  data() {
    return {
      formData: createDefaultFormData(),
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
  mounted() {
    const draft = localStorage.getItem(DRAFT_KEY)
    if (!draft) return
    try {
      this.formData = JSON.parse(draft)
    } catch (error) {
      console.error('Gagal membaca draft laporan madrasah', error)
    }
  },
  methods: {
    cloneValue(value) {
      return JSON.parse(JSON.stringify(value))
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
    saveDraft() {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(this.formData))
      this.$toast.fire({
        title: 'Draft laporan semester berhasil disimpan',
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
}

.hero h2 {
  margin: 0 0 0.35rem;
  font-size: 1.2rem;
}

.hero p {
  margin-bottom: 0.8rem;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
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

@media (max-width: 992px) {
  .grid-2,
  .land-grid,
  .certificate-grid {
    grid-template-columns: 1fr;
  }
}
</style>
