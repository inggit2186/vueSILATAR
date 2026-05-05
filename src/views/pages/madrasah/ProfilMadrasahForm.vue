<template>
    <div :class="isAdminMadrasahView ? 'admin-madrasah-embedded' : 'main-wrapper'">
		<layouts v-if="!isAdminMadrasahView"></layouts>
        <div :class="isAdminMadrasahView ? 'admin-madrasah-embedded-page' : 'page-wrapper'">
            <breadcrumb v-if="!isAdminMadrasahView" :title="title" :name="name" :text="text" :text1="text1" />

  <div class="dashboard-content">
    <div class="container">
      <div class="report-shell madrasah-page-shell">
        <MadrasahHeaderMenu v-if="!isAdminMadrasahView" />
        <div class="hero madrasah-hero">
          <div>
            <h2>Profil Madrasah</h2>
            <p>Lengkapi identitas, alamat, dan informasi kelembagaan madrasah dengan tampilan yang lebih nyaman dibaca.</p>
          </div>
          <div class="hero-actions">
            <div class="hero-chip">
              <span>Kategori</span>
              <strong>{{ madrasahTypeLabel }}</strong>
            </div>
            <div class="hero-chip">
              <span>Level</span>
              <strong>{{ madrasahClassLevelCount }}</strong>
            </div>
            <div class="hero-chip">
              <span>Status</span>
              <strong>{{ formData.status_lembaga || madrasahDefaultStatus }}</strong>
            </div>
          </div>
        </div>

        <div class="madrasah-context" v-if="madrasahAllowed">
          <div class="context-item">
            <span>Kategori Login</span>
            <strong>{{ madrasahTypeLabel }}</strong>
          </div>
          <div class="context-item">
            <span>Jumlah Kelas</span>
            <strong>{{ madrasahClassLevelCount }}</strong>
          </div>
          <div class="context-item">
            <span>Status Lembaga</span>
            <strong>{{ formData.status_lembaga || madrasahDefaultStatus }}</strong>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card-section profile-card">
              <b-form @submit.prevent="submitForm">
                <!-- Section 1: Basic Info -->
                <div class="row mb-5 section-block section-block-info">
                  <div class="col-12">
                    <div class="section-heading section-heading-info">
                      <span class="section-icon-badge"><i class="feather-clipboard"></i></span>
                      <div class="section-heading-copy">
                        <span class="section-kicker">Identitas utama</span>
                        <h5>Informasi Dasar</h5>
                        <p>Identitas inti lembaga dan kode statistik madrasah.</p>
                      </div>
                      <span class="section-number">01</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-home"></i>
                        <b-form-input 
                          v-model="formData.nama" 
                          type="text" 
                          class="form-control" 
                          placeholder="Nama Madrasah" 
                          :disabled="madrasahFormLocked"
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-hash"></i>
                        <b-form-input 
                          v-model="formData.nsm" 
                          type="text" 
                          class="form-control" 
                          placeholder="NSM (Nomor Statistik Madrasah)" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-hash"></i>
                        <b-form-input 
                          v-model="formData.npsm" 
                          type="text" 
                          class="form-control" 
                          placeholder="NPSM (Nomor Pokok Statistik Madrasah)" 
                          required 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-flag"></i>
                        <b-form-select v-model="formData.status_lembaga" class="form-control" style="padding-left: 10%;" :disabled="madrasahFormLocked">
                          <option value="" disabled selected>Pilih Status Lembaga</option>
                          <option value="Negeri">Negeri</option>
                          <option value="Swasta">Swasta</option>
                        </b-form-select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 2: Address -->
                <div class="row mb-5 section-block section-block-address">
                  <div class="col-12">
                    <div class="section-heading section-heading-address">
                      <span class="section-icon-badge"><i class="feather-map-pin"></i></span>
                      <div class="section-heading-copy">
                        <span class="section-kicker">Lokasi & koordinat</span>
                        <h5>Alamat</h5>
                        <p>Rincian lokasi madrasah dan titik koordinat.</p>
                      </div>
                      <span class="section-number">02</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-map-pin"></i>
                        <b-form-input 
                          v-model="formData.jalan" 
                          type="text" 
                          class="form-control" 
                          placeholder="Nama Jalan" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-map"></i>
                        <b-form-input 
                          v-model="formData.jorong" 
                          type="text" 
                          class="form-control" 
                          placeholder="Jorong" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-globe"></i>
                        <b-form-input 
                          v-model="formData.nagari" 
                          type="text" 
                          class="form-control" 
                          placeholder="Nagari" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-layers"></i>
                        <b-form-input 
                          v-model="formData.kecamatan" 
                          type="text" 
                          class="form-control" 
                          placeholder="Kecamatan" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-navigation"></i>
                        <b-form-input 
                          v-model="formData.koordinat" 
                          type="text" 
                          class="form-control" 
                          placeholder="Koordinat (contoh: -0.4148402, 100.5664474)" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 3: Contact -->
                <div class="row mb-5 section-block section-block-contact">
                  <div class="col-12">
                    <div class="section-heading section-heading-contact">
                      <span class="section-icon-badge"><i class="feather-message-circle"></i></span>
                      <div class="section-heading-copy">
                        <span class="section-kicker">Saluran komunikasi</span>
                        <h5>Kontak</h5>
                        <p>Nomor, email, website, dan waktu belajar madrasah.</p>
                      </div>
                      <span class="section-number">03</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-phone-call"></i>
                        <b-form-input 
                          v-model="formData.telepon" 
                          type="tel" 
                          class="form-control" 
                          placeholder="Nomor Telepon" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-mail"></i>
                        <b-form-input 
                          v-model="formData.email" 
                          type="email" 
                          class="form-control" 
                          placeholder="Email" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-globe"></i>
                        <b-form-input 
                          v-model="formData.website" 
                          type="url" 
                          class="form-control" 
                          placeholder="Website" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-clock"></i>
                        <b-form-select v-model="formData.waktu_belajar" class="form-control" style="padding-left: 10%;">
                          <option value="" disabled selected>Pilih Waktu Belajar</option>
                          <option value="Pagi">Pagi</option>
                          <option value="Siang">Siang</option>
                          <option value="Malam">Malam</option>
                        </b-form-select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 4: Documents & Status -->
                <div class="row mb-5 section-block section-block-docs">
                  <div class="col-12">
                    <div class="section-heading section-heading-docs">
                      <span class="section-icon-badge"><i class="feather-folder-plus"></i></span>
                      <div class="section-heading-copy">
                        <span class="section-kicker">Legalitas & akreditasi</span>
                        <h5>Dokumen & Status</h5>
                        <p>Visi, SK pendirian, akreditasi, komite, dan status KKM.</p>
                      </div>
                      <span class="section-number">04</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-eye"></i>
                        <b-form-textarea 
                          v-model="formData.visi" 
                          class="form-control" 
                          rows="3" 
                          placeholder="Visi Madrasah" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-file-text"></i>
                        <b-form-input 
                          v-model="formData.sk_pendirian" 
                          type="text" 
                          class="form-control" 
                          placeholder="Nomor SK Pendirian / SK Penegerian" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-calendar"></i>
                        <b-form-input 
                          v-model="formData.tanggal_sk" 
                          type="date" 
                          class="form-control" 
                          placeholder="Tanggal SK Pendirian / SK Penegerian" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-users"></i>
                        <b-form-select v-model="formData.komite_lembaga" class="form-control" style="padding-left: 10%;">
                          <option value="" disabled selected>Status Komite Lembaga</option>
                          <option value="Sudah Terbentuk">Sudah Terbentuk</option>
                          <option value="Belum Terbentuk">Belum Terbentuk</option>
                        </b-form-select>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-award"></i>
                        <b-form-input 
                          v-model="formData.akreditasi" 
                          type="text" 
                          class="form-control" 
                          placeholder="Akreditasi Madrasah (A/B/C)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-calendar"></i>
                        <b-form-input 
                          v-model="formData.tanggal_akreditasi" 
                          type="date" 
                          class="form-control" 
                          placeholder="Tanggal SK Akreditasi" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-users"></i>
                        <b-form-select v-model="formData.status_kkm" class="form-control" style="padding-left: 10%;">
                          <option value="" disabled selected>Status Kelompok Kerja Madrasah (KKM)</option>
                          <option value="Induk">Induk</option>
                          <option value="Anggota">Anggota</option>
                        </b-form-select>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Section 5: Jarak -->
                <div class="row mb-5 section-block section-block-distance">
                  <div class="col-12">
                    <div class="section-heading section-heading-distance">
                      <span class="section-icon-badge"><i class="feather-navigation"></i></span>
                      <div class="section-heading-copy">
                        <span class="section-kicker">Akses & jarak tempuh</span>
                        <h5>Jarak Madrasah Ke</h5>
                        <p>Jarak ke instansi terdekat dan satuan pendidikan sekitar.</p>
                      </div>
                      <span class="section-number">05</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-map-pin"></i>
                        <b-form-input 
                          v-model="formData.jarak_pusat_provinsi" 
                          type="text" 
                          class="form-control" 
                          placeholder="Pusat Ibu Kota Provinsi (> 90 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-home"></i>
                        <b-form-input 
                          v-model="formData.jarak_pusat_kabupaten" 
                          type="text" 
                          class="form-control" 
                          placeholder="Pusat Ibu Kota Kabupaten (> 17 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-map"></i>
                        <b-form-input 
                          v-model="formData.jarak_kecamatan" 
                          type="text" 
                          class="form-control" 
                          placeholder="Pusat Ibu Kota Kecamatan (> 02 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-globe"></i>
                        <b-form-input 
                          v-model="formData.jarak_kanwil_kemenag" 
                          type="text" 
                          class="form-control" 
                          placeholder="Kantor Kanwil Kemenag Sumbar (> 90 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-home"></i>
                        <b-form-input 
                          v-model="formData.jarak_kemenag_kab" 
                          type="text" 
                          class="form-control" 
                          placeholder="Kantor Kemenag Tanah Datar (> 14 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-map-pin"></i>
                        <b-form-input 
                          v-model="formData.jarak_kua" 
                          type="text" 
                          class="form-control" 
                          placeholder="Kantor KUA Kecamatan (> 03 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-book-open"></i>
                        <b-form-input 
                          v-model="formData.jarak_ra_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="RA Terdekat (> 01 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-book-open"></i>
                        <b-form-input 
                          v-model="formData.jarak_mi_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="MI Terdekat (> 03 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-book-open"></i>
                        <b-form-input 
                          v-model="formData.jarak_mts_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="MTs Terdekat (> 04 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-book-open"></i>
                        <b-form-input 
                          v-model="formData.jarak_ma_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="MA Terdekat" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-book-open"></i>
                        <b-form-input 
                          v-model="formData.jarak_pontren_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="Pontren Terdekat (> 03 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-award"></i>
                        <b-form-input 
                          v-model="formData.jarak_tk_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="TK Terdekat (> 01 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-award"></i>
                        <b-form-input 
                          v-model="formData.jarak_sd_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="SD Terdekat (> 03 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-award"></i>
                        <b-form-input 
                          v-model="formData.jarak_smp_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="SMP Terdekat (> 03 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group group-img">
                      <div class="group-img">
                        <i class="feather-award"></i>
                        <b-form-input 
                          v-model="formData.jarak_sma_terdekat" 
                          type="text" 
                          class="form-control" 
                          placeholder="SMA Terdekat (> 05 Km)" 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Buttons -->
                <div class="row">
                  <div class="col-12 text-center">
                    <b-button type="submit" variant="primary" class="me-3" size="lg">
                      <i class="feather-save"></i> Simpan Data
                    </b-button>
                    <b-button type="button" variant="secondary" size="lg" @click="resetForm">
                      <i class="feather-refresh-cw"></i> Reset Form
                    </b-button>
                  </div>
                </div>
              </b-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

        <foot />

        <scroll />
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
  getMadrasahDefaultStatusForCategory,
  getMadrasahDefaultStatus,
  getMadrasahLabel,
  getMadrasahLabelForCategory,
  getStoredUser
} from '@/utils/madrasahAccess'

const createDefaultFormData = () => ({
  nama: '',
  nsm: '',
  npsm: '',
  status_lembaga: '',
  jalan: '',
  jorong: '',
  nagari: '',
  kecamatan: '',
  koordinat: '',
  telepon: '',
  email: '',
  website: '',
  waktu_belajar: '',
  visi: '',
  sk_pendirian: '',
  tanggal_sk: '',
  komite_lembaga: '',
  akreditasi: '',
  tanggal_akreditasi: '',
  status_kkm: '',
  jarak_pusat_provinsi: '',
  jarak_pusat_kabupaten: '',
  jarak_kecamatan: '',
  jarak_kanwil_kemenag: '',
  jarak_kemenag_kab: '',
  jarak_kua: '',
  jarak_ra_terdekat: '',
  jarak_mi_terdekat: '',
  jarak_mts_terdekat: '',
  jarak_ma_terdekat: '',
  jarak_pontren_terdekat: '',
  jarak_tk_terdekat: '',
  jarak_sd_terdekat: '',
  jarak_smp_terdekat: '',
  jarak_sma_terdekat: ''
})

export default {
  name: 'ProfilMadrasahForm',
  components: {
    MadrasahHeaderMenu
  },
  data() {
    return {
      formData: createDefaultFormData(),
      activeMadrasahId: null,
      activeMadrasahCategory: getMadrasahCategory(),
      isSubmitting: false
    }
  },
  computed: {
    isAdminMadrasahView() {
      return String(this.$route?.path || '').startsWith('/admin/madrasah')
    },
    madrasahAllowed() {
      return canAccessMadrasah() || canManageAnyMadrasah()
    },
    madrasahFormLocked() {
      return this.madrasahAllowed
    },
    madrasahTypeLabel() {
      return getMadrasahLabelForCategory(this.activeMadrasahCategory) || getMadrasahLabel()
    },
    madrasahClassLevelCount() {
      return getMadrasahClassLevelCountForCategory(this.activeMadrasahCategory) || getMadrasahClassLevelCount()
    },
    madrasahDefaultStatus() {
      return getMadrasahDefaultStatusForCategory(this.activeMadrasahCategory) || getMadrasahDefaultStatus()
    }
  },
  watch: {
    '$route.query.dept_id': {
      immediate: false,
      async handler() {
        const nextDeptId = this.getDeptId()
        if ((this.activeMadrasahId || null) === (nextDeptId || null)) {
          return
        }

        this.activeMadrasahId = nextDeptId
        await this.fetchProfileByDeptId()
        this.applyDeptDefaults()
      }
    }
  },
  async mounted() {
    this.activeMadrasahId = this.getDeptId()
    await this.fetchProfileByDeptId()
    this.applyDeptDefaults()
  },
  methods: {
    getDeptId() {
      if (canManageAnyMadrasah() && this.$route?.query?.dept_id) {
        return String(this.$route.query.dept_id).trim()
      }

      const user = getStoredUser()
      return user?.dept_id ?? user?.dept?.id ?? user?.dept?.dept_id ?? null
    },
    getStorageKey() {
      return this.activeMadrasahId
        ? `profil-madrasah-${this.activeMadrasahId}`
        : 'profil-madrasah-default'
    },
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    loadProfileByDeptId() {
      try {
        const raw = localStorage.getItem(this.getStorageKey())
        if (!raw) return

        const parsed = JSON.parse(raw)
        const normalizedData = {
          ...parsed,
          nama: parsed?.nama ?? parsed?.nama_madrasah ?? ''
        }

        this.formData = {
          ...createDefaultFormData(),
          ...normalizedData
        }
      } catch (error) {
        console.error('Gagal memuat profil madrasah dari localStorage', error)
      }
    },
    async fetchProfileByDeptId() {
      if (!this.activeMadrasahId) {
        this.loadProfileByDeptId()
        return
      }

      try {
        const response = await this.$axios.get(
          `${import.meta.env.VITE_APP_API_URL}/getMadrasahProfil/${this.activeMadrasahId}`,
          { headers: this.getAuthHeaders() }
        )

        const data = response?.data?.data

        if (data) {
          this.activeMadrasahCategory = String(data?.kategori || this.activeMadrasahCategory || '').trim().toLowerCase()
          this.formData = {
            ...createDefaultFormData(),
            ...data,
            nama: data?.nama ?? ''
          }
          this.saveProfileByDeptId()
          return
        }
      } catch (error) {
        console.error('Gagal memuat profil madrasah dari API', error)
      }

      this.activeMadrasahCategory = getMadrasahCategory()
      this.loadProfileByDeptId()
    },
    saveProfileByDeptId() {
      try {
        const payload = {
          id: this.activeMadrasahId,
          ...this.formData
        }
        localStorage.setItem(this.getStorageKey(), JSON.stringify(payload))
      } catch (error) {
        console.error('Gagal menyimpan profil madrasah ke localStorage', error)
      }
    },
    applyDeptDefaults() {
      const user = getStoredUser()
      if (!user?.dept) return

      if (!this.formData.status_lembaga) {
        this.formData.status_lembaga = this.madrasahDefaultStatus
      }

      const deptName =
        user.dept.nama ||
        user.dept.nama_madrasah ||
        user.dept.name ||
        user.dept.nm ||
        ''

      if (!this.formData.nama && deptName) {
        this.formData.nama = deptName
      }

      const nsm = user.dept.nsm || user.dept.nsm_madrasah || ''
      const npsm = user.dept.npsm || user.dept.npsm_madrasah || ''
      const koordinat =
        user.dept.koordinat ||
        ((user.dept.latitude || user.dept.longitude)
          ? `${user.dept.latitude || ''}${user.dept.latitude && user.dept.longitude ? ', ' : ''}${user.dept.longitude || ''}`
          : '')

      if (!this.formData.nsm && nsm) {
        this.formData.nsm = nsm
      }

      if (!this.formData.npsm && npsm) {
        this.formData.npsm = npsm
      }

      if (!this.formData.koordinat && koordinat) {
        this.formData.koordinat = koordinat
      }
    },
    async submitForm() {
      // Basic validation
      if (!this.formData.nama || !this.formData.nsm || !this.formData.npsm) {
        this.$toast.fire({
          title: 'Harap lengkapi field wajib (*)',
          icon: 'warning'
        });
        return;
      }

      this.isSubmitting = true

      try {
        const payload = {
          id: this.activeMadrasahId,
          ...this.formData
        }

        const response = await this.$axios.post(
          `${import.meta.env.VITE_APP_API_URL}/saveMadrasahProfil`,
          payload,
          { headers: this.getAuthHeaders() }
        )

        const savedData = response?.data?.data ?? payload
        this.formData = {
          ...createDefaultFormData(),
          ...savedData,
          nama: savedData?.nama ?? payload.nama
        }
        this.saveProfileByDeptId()

        this.$toast.fire({
          title: this.activeMadrasahId
            ? `Data madrasah ID ${this.activeMadrasahId} berhasil disimpan!`
            : 'Data berhasil disimpan!',
          icon: 'success'
        });
      } catch (error) {
        console.error('Gagal menyimpan profil madrasah ke API', error)
        this.saveProfileByDeptId()

        this.$toast.fire({
          title: error?.response?.data?.message || 'Data gagal disimpan ke server',
          icon: 'error'
        });
      } finally {
        this.isSubmitting = false
      }
    },
    resetForm() {
      this.formData = createDefaultFormData()
      localStorage.removeItem(this.getStorageKey())
      this.applyDeptDefaults()
      this.$toast.fire({
        title: 'Form telah direset',
        icon: 'info'
      });
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.report-shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-madrasah-embedded-page {
  padding: 0;
}

.madrasah-page-shell {
  padding-bottom: 1rem;
}

.madrasah-hero {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: flex-end;
  background: linear-gradient(135deg, #1f3c88 0%, #3f72af 100%);
  color: #fff;
  border-radius: 24px;
  padding: 1.5rem 1.75rem;
  box-shadow: 0 18px 40px rgba(31, 60, 136, 0.18);
  position: relative;
  overflow: hidden;
}

.madrasah-hero::after {
  content: '';
  position: absolute;
  inset: auto -40px -40px auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: rgba(255,255,255,0.08);
}

.madrasah-hero h2 {
  margin: 0 0 0.45rem;
  font-size: 1.6rem;
  font-weight: 700;
}

.madrasah-hero p {
  margin: 0;
  max-width: 720px;
  color: rgba(255,255,255,0.88);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: flex-end;
  align-items: center;
}

.hero-chip {
  min-width: 120px;
  padding: 0.7rem 0.95rem;
  border-radius: 16px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(10px);
}

.hero-chip span {
  display: block;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.hero-chip strong {
  display: block;
  font-size: 1.05rem;
  margin-top: 0.15rem;
}

.card-section {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(22, 12, 13, 0.22);
  border: 1px solid rgba(201, 157, 79, 0.22);
  overflow: hidden;
}

.profile-card {
  padding: 1.5rem 1.5rem 1.75rem;
}

.profile-card :deep(.form-control),
.profile-card :deep(.form-select),
.profile-card :deep(.b-form-input),
.profile-card :deep(.b-form-select),
.profile-card :deep(textarea.form-control) {
  min-height: 48px;
  border: 1px solid rgba(201, 157, 79, 0.18);
  border-radius: 14px;
  background: rgba(255, 244, 216, 0.05);
  color: #fff2d1;
  box-shadow: 0 8px 20px rgba(22, 12, 13, 0.08);
}

.profile-card :deep(.form-control:focus),
.profile-card :deep(.form-select:focus),
.profile-card :deep(.b-form-input:focus),
.profile-card :deep(.b-form-select:focus),
.profile-card :deep(textarea.form-control:focus) {
  border-color: rgba(246, 212, 122, 0.55);
  box-shadow: 0 0 0 0.22rem rgba(201, 157, 79, 0.16);
  background: rgba(255, 244, 216, 0.08);
}

.section-block {
  padding: 1.3rem 1.2rem 0.75rem;
  margin-left: 0;
  margin-right: 0;
  border: 1px solid rgba(201, 157, 79, 0.18);
  border-radius: 20px;
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  box-shadow: 0 10px 24px rgba(22, 12, 13, 0.18);
  position: relative;
  overflow: hidden;
}

.section-block::after {
  content: '';
  position: absolute;
  inset: auto -70px -70px auto;
  width: 180px;
  height: 180px;
  border-radius: 50%;
  opacity: 0.12;
  pointer-events: none;
}

.section-block-info::after {
  background: #c99d4f;
}

.section-block-address::after {
  background: #8f1d2c;
}

.section-block-contact::after {
  background: #d4a54a;
}

.section-block-docs::after {
  background: #7a482f;
}

.section-block-distance::after {
  background: #c58a2a;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 0.95rem;
  margin-bottom: 1.15rem;
  position: relative;
  z-index: 1;
}

.section-heading-copy {
  flex: 1;
  min-width: 0;
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem 0.6rem;
  margin-bottom: 0.45rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #476081;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid #e6edf8;
}

.section-heading h5 {
  padding-left: 0;
  margin-bottom: 0.25rem;
  font-size: 1.12rem;
  line-height: 1.2;
  color: #17315f;
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.section-heading h5::before {
  display: none;
}

.section-heading p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
}

.section-number {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  color: #17315f;
  background: linear-gradient(180deg, #ffffff 0%, #edf4ff 100%);
  border: 1px solid #dbe4f4;
  box-shadow: 0 10px 22px rgba(31, 60, 136, 0.08);
}

.section-icon-badge {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex: 0 0 46px;
  box-shadow: 0 14px 28px rgba(31, 60, 136, 0.2);
}

.section-heading-info .section-icon-badge {
  background: linear-gradient(135deg, #1f3c88 0%, #3f72af 100%);
}

.section-heading-address .section-icon-badge {
  background: linear-gradient(135deg, #0f766e 0%, #14b8a6 100%);
}

.section-heading-contact .section-icon-badge {
  background: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%);
}

.section-heading-docs .section-icon-badge {
  background: linear-gradient(135deg, #d97706 0%, #f59e0b 100%);
}

.section-heading-distance .section-icon-badge {
  background: linear-gradient(135deg, #64748b 0%, #94a3b8 100%);
}

.section-heading :deep(i) {
  font-size: 1.15rem;
}

.section-heading-info h5 {
  color: #1f3c88;
}

.section-heading-address h5 {
  color: #0f766e;
}

.section-heading-contact h5 {
  color: #7c3aed;
}

.section-heading-docs h5 {
  color: #c2410c;
}

.section-heading-distance h5 {
  color: #475569;
}

.madrasah-context {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1rem 0 1.25rem;
}

.context-item {
  border: 1px solid #dbe4f4;
  border-radius: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f7fbff 100%);
  padding: 0.85rem 1rem;
  box-shadow: 0 10px 22px rgba(25, 39, 68, 0.05);
}

.context-item span {
  display: block;
  font-size: 0.76rem;
  font-weight: 700;
  color: #6c7a92;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 0.2rem;
}

.context-item strong {
  color: #213555;
  font-size: 0.98rem;
}

.report-shell {
  color: #fff2d1;
}

.card-section {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border: 1px solid rgba(201, 157, 79, 0.22);
  box-shadow: 0 18px 36px rgba(22, 12, 13, 0.22);
}

.profile-card {
  background: transparent;
}

.profile-card :deep(.form-control),
.profile-card :deep(.form-select),
.profile-card :deep(.b-form-input),
.profile-card :deep(.b-form-select),
.profile-card :deep(textarea.form-control) {
  border: 1px solid rgba(201, 157, 79, 0.18);
  background: rgba(255, 244, 216, 0.05);
  color: #fff2d1;
}

.profile-card :deep(.form-control:focus),
.profile-card :deep(.form-select:focus),
.profile-card :deep(.b-form-input:focus),
.profile-card :deep(.b-form-select:focus),
.profile-card :deep(textarea.form-control:focus) {
  border-color: rgba(246, 212, 122, 0.55);
  box-shadow: 0 0 0 0.22rem rgba(201, 157, 79, 0.16);
  background: rgba(255, 244, 216, 0.08);
}

.section-block {
  background: linear-gradient(180deg, #2a191a 0%, #241516 100%);
  border: 1px solid rgba(201, 157, 79, 0.18);
  box-shadow: 0 12px 26px rgba(22, 12, 13, 0.18);
}

.section-heading h5 {
  color: #fff2d1;
}

.section-heading p {
  color: rgba(255, 240, 197, 0.8);
}

.section-kicker {
  color: #f0d8ac;
  background: rgba(255, 244, 216, 0.05);
  border-color: rgba(201, 157, 79, 0.16);
}

.section-number {
  color: #fff2d1;
  background: rgba(255, 244, 216, 0.06);
  border-color: rgba(201, 157, 79, 0.16);
}

.section-icon-badge {
  box-shadow: 0 14px 28px rgba(22, 12, 13, 0.18);
}

.madrasah-context {
  gap: 0.9rem;
}

.context-item {
  background: rgba(255, 244, 216, 0.05);
  border: 1px solid rgba(201, 157, 79, 0.16);
  box-shadow: 0 10px 22px rgba(22, 12, 13, 0.12);
}

.context-item span {
  color: #c9a26d;
}

.context-item strong {
  color: #fff2d1;
}

h5 {
  color: #fff2d1;
}

* {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
}

.card {
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
}

.card-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  position: relative;
  overflow: hidden;
}

.card-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.card-header:hover::before {
  left: 100%;
}

.card-header h2 {
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.form-group {
  margin-bottom: 2rem;
  position: relative;
}

.group-img {
  position: relative;
}

.input-floating {
  position: relative;
  margin-bottom: 1.5rem;
}

.input-floating i {
  position: absolute;
  left: 15px;
  top: 18px;
  color: #94a3b8;
  font-size: 1.3rem;
  z-index: 3;
  transition: all 0.3s ease;
}

.input-floating label {
  position: absolute;
  left: 50px;
  top: 18px;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;
  background: transparent;
}

.floating-input {
  padding: 22px 15px 8px 50px !important;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-weight: 400;
}

.floating-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.2), 0 10px 25px rgba(102, 126, 234, 0.1);
  background: white;
}

.input-floating label {
  position: absolute;
  left: 50px;
  top: 18px;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  pointer-events: none;
  transition: all 0.3s ease;
  z-index: 2;
}

.input-floating .floating-input:focus ~ label,
.input-floating .floating-input:not(:placeholder-shown) ~ label {
  top: -8px;
  font-size: 0.75rem;
  color: #4f46e5;
  background: white;
  padding: 0 8px;
  border-radius: 4px;
}

.input-floating .floating-input:focus ~ i,
.input-floating .floating-input:not(:placeholder-shown) ~ i {
  color: #4f46e5;
  font-size: 1.4rem;
}

.group-img i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  font-size: 1.3rem;
  z-index: 2;
  transition: all 0.3s ease;
}

.form-control {
  padding-left: 50px !important;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-weight: 400;
}

.form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.2), 0 10px 25px rgba(102, 126, 234, 0.1);
  background: white;
  transform: translateY(-2px);
}

.form-control:not(:placeholder-shown) + i,
.form-control:focus + i {
  color: #4f46e5;
  font-size: 1.4rem;
  text-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
}

h5 {
  color: #1e293b;
  font-weight: 600;
  position: relative;
  padding-left: 40px;
  margin-bottom: 1.5rem;
}

h5::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 25px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 50%;
  margin-right: 10px;
}

.report-shell :deep(.card-section),
.report-shell :deep(.profile-card),
.report-shell :deep(.section-block) {
  background: linear-gradient(180deg, #2a191a 0%, #201214 100%) !important;
  border-color: rgba(201, 157, 79, 0.18) !important;
  color: #fff2d1 !important;
}

.report-shell :deep(.section-heading h5),
.report-shell :deep(.section-heading p),
.report-shell :deep(.section-kicker),
.report-shell :deep(.section-number),
.report-shell :deep(.context-item span),
.report-shell :deep(.context-item strong),
.report-shell :deep(.hero-chip span),
.report-shell :deep(.hero-chip strong),
.report-shell :deep(.hero p),
.report-shell :deep(.madrasah-context),
.report-shell :deep(.madrasah-context span),
.report-shell :deep(.madrasah-context strong),
.report-shell :deep(.profile-card label),
.report-shell :deep(.profile-card .col-form-label),
.report-shell :deep(.profile-card small),
.report-shell :deep(.profile-card h5) {
  color: #fff2d1 !important;
}

.report-shell :deep(.section-heading-info h5),
.report-shell :deep(.section-heading-address h5),
.report-shell :deep(.section-heading-contact h5),
.report-shell :deep(.section-heading-docs h5),
.report-shell :deep(.section-heading-distance h5),
.report-shell :deep(.section-heading p),
.report-shell :deep(.section-heading span),
.report-shell :deep(.context-item span),
.report-shell :deep(.context-item strong) {
  color: #fff2d1 !important;
}

.report-shell :deep(.section-heading),
.report-shell :deep(.section-heading h3),
.report-shell :deep(.section-heading p),
.report-shell :deep(.section-heading span),
.report-shell :deep(label),
.report-shell :deep(.col-form-label),
.report-shell :deep(small),
.report-shell :deep(h5) {
  color: #fff2d1 !important;
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
.report-shell :deep(.profile-card),
.report-shell :deep(.section-block) {
  color: #fff4dc !important;
}

@media (max-width: 768px) {
  .madrasah-hero {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions {
    justify-content: flex-start;
  }

  .madrasah-context {
    grid-template-columns: 1fr;
  }

  .section-block {
    padding: 1rem 0.9rem 0.4rem;
  }

  .section-heading {
    gap: 0.75rem;
  }

  .section-icon-badge {
    width: 42px;
    height: 42px;
    flex-basis: 42px;
  }

  .col-md-6 {
    margin-bottom: 1.5rem;
  }
  
  .form-control {
    padding-left: 45px !important;
  }
}
</style>
