<template>
  <div class="main-wrapper">
    <layouts></layouts>
    <div class="page-wrapper">
      <breadcrumb :title="`Data ${entityPlural} Madrasah`" :name="entityPlural" text="Madrasah" text1="Semester Genap" />

      <div class="dashboard-content">
        <div class="container">
          <div class="report-shell madrasah-page-shell">
            <MadrasahHeaderMenu />
            <div class="hero madrasah-hero">
              <div>
                <h2>{{ headerTitle }}</h2>
                <p>Daftar {{ entityPlural.toLowerCase() }} yang diambil dari API madrasah dan disajikan dengan tampilan yang lebih ringan.</p>
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
                  <span>Data Aktif</span>
                  <strong>{{ pegawaiData.length }}</strong>
                </div>
                <b-button variant="primary" @click="openAddModal">
                  <i class="feather-plus-circle"></i> Tambah {{ entitySingular }}
                </b-button>
              </div>
            </div>

            <div class="card-section data-card">
              <div class="card-body">
                  <b-table 
                    :items="paginatedPegawaiData" 
                    :fields="fields"
                    striped 
                    hover 
                    responsive 
                    show-empty
                    :empty-text="emptyTableText"
                    :busy="isLoading"
                    class="pegawai-table"
                    @row-clicked="toggleRowDetails"
                  >
                    <template #table-busy>
                      <div class="table-busy-state">
                        <b-spinner small variant="primary" class="me-2" />
                        <span>Sedang mengambil data dari API...</span>
                      </div>
                    </template>
                    <template #cell(nama)="row">
                      <div class="pegawai-name-cell">
                        <div class="pegawai-avatar">
                          <img v-if="row.item.pp" :src="row.item.pp" :alt="row.item.nama" />
                          <i v-else class="feather-user"></i>
                        </div>
                        <div class="pegawai-name-meta">
                          <strong>{{ displayValue(row.item.nama) }}</strong>
                          <small>{{ displayKategoriJabatan(row.item.kat_jabatan) }}</small>
                        </div>
                      </div>
                    </template>
                    <template #cell(asn)="row">
                      <b-badge :variant="getStatusVariant(row.item.asn)">
                        {{ displayValue(String(row.item.asn ?? '').toUpperCase()) }}
                      </b-badge>
                    </template>
                    <template #cell(jabatan)="row">
                      {{ displayValue(row.item.jabatan) }}
                    </template>
                    <template #cell(satker)="row">
                      {{ displayValue(row.item.satker) }}
                    </template>
                    <template #cell(actions)="row">
                      <b-button size="sm" variant="info" class="me-1" @click.stop="editPegawai(row.item)">
                        <i class="feather-edit-2"></i>
                      </b-button>
                    </template>
                    <template #row-details="row">
                      <div class="pegawai-row-details">
                        <div class="details-title">
                          <i class="feather-info"></i>
                          <span>Detail {{ row.item.nama || entitySingular }}</span>
                        </div>
                        <div class="details-grid">
                          <div class="details-item details-item-full"><strong>Nama:</strong> {{ displayValue(row.item.nama) }}</div>
                          <div class="details-item"><strong>NIP / No Induk:</strong> {{ displayValue(row.item.nip) }}</div>
                          <div class="details-item"><strong>ASN:</strong> {{ displayValue(String(row.item.asn ?? '').toUpperCase()) }}</div>
                          <div class="details-item"><strong>Jenis Kelamin:</strong> {{ displayJenisKelamin(row.item.jk || row.item.jenis_kelamin) }}</div>
                          <div class="details-item"><strong>Jabatan:</strong> {{ displayValue(row.item.jabatan) }}</div>
                          <div class="details-item"><strong>Satker:</strong> {{ displayValue(row.item.satker) }}</div>
                          <div class="details-item"><strong>Email:</strong> {{ displayValue(row.item.email) }}</div>
                          <div class="details-item"><strong>Status:</strong> {{ displayValue(row.item.status) }}</div>
                          <div class="details-item details-item-full"><strong>Sumber Data:</strong> {{ displayKategoriJabatan(row.item.kat_jabatan) }}</div>
                          <div class="details-item details-item-full"><strong>Foto:</strong> <a v-if="row.item.pp" :href="row.item.pp" target="_blank" rel="noopener">Lihat foto</a><span v-else>-</span></div>
                          <template v-if="showExtraProfileFields(row.item)">
                            <div class="details-item"><strong>NPWP:</strong> {{ displayValue(row.item.npwp) }}</div>
                            <div class="details-item"><strong>TMT CPNS:</strong> {{ formatTanggalIndonesia(row.item.tmt_cpns) }}</div>
                            <div class="details-item"><strong>TMT PNS:</strong> {{ formatTanggalIndonesia(row.item.tmt_pns) }}</div>
                            <div class="details-item"><strong>TMT Tempat Tugas:</strong> {{ formatTanggalIndonesia(row.item.tmt_tugas) }}</div>
                            <div class="details-item"><strong>Tempat Lahir:</strong> {{ displayValue(row.item.tempat_lahir) }}</div>
                            <div class="details-item"><strong>Tanggal Lahir:</strong> {{ formatTanggalIndonesia(row.item.tgl_lahir) }}</div>
                            <div class="details-item"><strong>Masa Kerja:</strong> {{ displayMasaKerja(row.item) }}</div>
                            <div class="details-item"><strong>KGB:</strong> {{ formatTanggalIndonesia(row.item.kgb) }}</div>
                            <div class="details-item details-item-full"><strong>Pendidikan Terakhir:</strong> {{ displayPendidikanTerakhir(row.item) }}</div>
                            <div class="details-item details-item-full"><strong>Universitas:</strong> {{ displayUniversitas(row.item) }}</div>
                            <div class="details-item details-item-full"><strong>Tahun Lulus:</strong> {{ displayTahunLulus(row.item) }}</div>
                            <div class="details-item"><strong>No. HP:</strong> {{ displayValue(row.item.hp) }}</div>
                            <div class="details-item details-item-full"><strong>Alamat KTP:</strong> {{ displayValue(row.item.alamat_ktp) }}</div>
                            <div class="details-item details-item-full"><strong>Alamat Tinggal:</strong> {{ displayValue(row.item.alamat_tinggal) }}</div>
                            <div class="details-item details-item-full"><strong>Keterangan:</strong> {{ displayValue(row.item.keterangan) }}</div>
                          </template>
                          <template v-if="props.showGuruFields">
                            <div class="details-item details-item-full"><strong>Bidang Studi Yang Diajar:</strong> {{ displayValue(row.item.bidang_studi_diajar) }}</div>
                            <div class="details-item"><strong>Peg.ID:</strong> {{ displayValue(row.item.peg_id) }}</div>
                            <div class="details-item"><strong>NUPTK:</strong> {{ displayValue(row.item.nuptk) }}</div>
                            <div class="details-item"><strong>NPK:</strong> {{ displayValue(row.item.npk) }}</div>
                            <div class="details-item"><strong>NRG:</strong> {{ displayValue(row.item.nrg) }}</div>
                            <div class="details-item"><strong>Sertifikasi:</strong> {{ displayValue(row.item.sertifikasi) }}</div>
                            <div class="details-item details-item-full"><strong>Bidang Studi Sertifikasi:</strong> {{ displayValue(row.item.bidang_studi_sertifikasi) }}</div>
                            <div class="details-item details-item-full"><strong>Nama Gadis Ibu Kandung:</strong> {{ displayValue(row.item.nama_gadis_ibu_kandung) }}</div>
                          </template>
                        </div>
                      </div>
                    </template>
                  </b-table>
                  <div v-if="!isLoading && totalPages > 1" class="table-pagination-wrapper">
                    <div class="table-pagination-info">
                      Menampilkan {{ paginationStart }}-{{ paginationEnd }} dari {{ pegawaiData.length }} data
                    </div>
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="pegawaiData.length"
                      :per-page="itemsPerPage"
                      align="center"
                      class="mb-0"
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Custom Modal --> 
      <div v-if="showModal" class="custom-modal-backdrop" @click.self="closeModal">
        <div class="custom-modal">
          <div class="custom-modal-header">
            <h5>{{ editMode ? `Edit ${entitySingular}` : `Tambah ${entitySingular}` }}</h5>
            <button class="btn-close" @click="closeModal">
              <i class="feather-x"></i>
            </button>
          </div>
          <div class="custom-modal-body">
            <form @submit.prevent="savePegawai">
              <div class="form-section">
                <button
                  type="button"
                  class="section-title section-toggle"
                  @click="toggleSection('identitas')"
                  :aria-expanded="sections.identitas"
                >
                  <span class="section-title-left">
                    <i class="feather-user"></i>
                    <span>Identitas {{ entitySingular }}</span>
                  </span>
                  <i class="feather-chevron-down section-chevron" :class="{ open: sections.identitas }"></i>
                </button>
                <div class="section-body" :class="{ collapsed: !sections.identitas }">
                  <div class="row g-4">
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="nama">Nama Lengkap *</label>
                      <i class="feather-user input-icon"></i>
                      <b-form-input 
                        id="nama"
                        v-model="currentPegawai.nama" 
                        class="form-control floating-input" 
                        placeholder="Masukkan nama lengkap" 
                        required 
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="status">Status *</label>
                      <i class="feather-check-square input-icon"></i>
                      <b-form-select 
                        id="status" 
                        v-model="currentPegawai.status" 
                        :options="statusOptions"
                        class="form-control floating-input" 
                        required 
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="nip">NIP</label>
                      <i class="feather-hash input-icon"></i>
                      <b-form-input id="nip" v-model="currentPegawai.nip" class="form-control floating-input" placeholder="NIP" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="nik">NIK</label>
                      <i class="feather-id input-icon"></i>
                      <b-form-input id="nik" v-model="currentPegawai.nik" class="form-control floating-input" placeholder="NIK" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="npwp">NPWP</label>
                      <i class="feather-file-text input-icon"></i>
                      <b-form-input id="npwp" v-model="currentPegawai.npwp" class="form-control floating-input" placeholder="NPWP" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="tempat_lahir">Tempat Lahir</label>
                      <i class="feather-map-pin input-icon"></i>
                      <b-form-input id="tempat_lahir" v-model="currentPegawai.tempat_lahir" class="form-control floating-input" placeholder="Tempat Lahir" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="tgl_lahir">Tanggal Lahir</label>
                      <i class="feather-calendar input-icon"></i>
                      <b-form-input id="tgl_lahir" v-model="currentPegawai.tgl_lahir" class="form-control floating-input" type="date" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating radio-group-floating">
                      <label>Jenis Kelamin</label>
                      <i class="feather-user input-icon"></i>
                      <b-form-radio-group id="jenis_kelamin" v-model="currentPegawai.jenis_kelamin" :options="jenisKelaminOptions" name="jenis_kelamin" />
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div v-if="props.showGuruFields" class="form-section">
                <button
                  type="button"
                  class="section-title section-toggle"
                  @click="toggleSection('guru')"
                  :aria-expanded="sections.guru"
                >
                  <span class="section-title-left">
                    <i class="feather-book-open"></i>
                    <span>Data Guru dan SIMPATIKA</span>
                  </span>
                  <i class="feather-chevron-down section-chevron" :class="{ open: sections.guru }"></i>
                </button>
                <div class="section-body" :class="{ collapsed: !sections.guru }">
                  <div class="row g-4">
                    <div class="col-md-6">
                      <div class="input-floating">
                        <label for="bidang_studi_diajar">Bidang Studi Yang Diajar</label>
                        <i class="feather-book input-icon"></i>
                        <b-form-input id="bidang_studi_diajar" v-model="currentPegawai.bidang_studi_diajar" class="form-control floating-input" placeholder="Bidang studi yang diajar" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-floating">
                        <label for="bidang_studi_sertifikasi">Bidang Studi Sertifikasi</label>
                        <i class="feather-award input-icon"></i>
                        <b-form-input id="bidang_studi_sertifikasi" v-model="currentPegawai.bidang_studi_sertifikasi" class="form-control floating-input" placeholder="Bidang studi sertifikasi" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-floating">
                        <label for="peg_id">Peg.ID</label>
                        <i class="feather-hash input-icon"></i>
                        <b-form-input id="peg_id" v-model="currentPegawai.peg_id" class="form-control floating-input" placeholder="Peg.ID" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-floating">
                        <label for="nuptk">NUPTK</label>
                        <i class="feather-credit-card input-icon"></i>
                        <b-form-input id="nuptk" v-model="currentPegawai.nuptk" class="form-control floating-input" placeholder="NUPTK" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-floating">
                        <label for="npk">NPK</label>
                        <i class="feather-credit-card input-icon"></i>
                        <b-form-input id="npk" v-model="currentPegawai.npk" class="form-control floating-input" placeholder="NPK" />
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="input-floating">
                        <label for="nrg">NRG</label>
                        <i class="feather-credit-card input-icon"></i>
                        <b-form-input id="nrg" v-model="currentPegawai.nrg" class="form-control floating-input" placeholder="NRG" />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-floating">
                        <label for="sertifikasi">Sertifikasi</label>
                        <i class="feather-check-circle input-icon"></i>
                        <b-form-select
                          id="sertifikasi"
                          v-model="currentPegawai.sertifikasi"
                          :options="sertifikasiOptions"
                          class="form-control floating-input"
                        />
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="input-floating">
                        <label for="nama_gadis_ibu_kandung">Nama Gadis Ibu Kandung</label>
                        <i class="feather-user-check input-icon"></i>
                        <b-form-input id="nama_gadis_ibu_kandung" v-model="currentPegawai.nama_gadis_ibu_kandung" class="form-control floating-input" placeholder="Nama gadis ibu kandung" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-section">
                <button
                  type="button"
                  class="section-title section-toggle"
                  @click="toggleSection('kepegawaian')"
                  :aria-expanded="sections.kepegawaian"
                >
                  <span class="section-title-left">
                    <i class="feather-briefcase"></i>
                    <span>Data Kepegawaian</span>
                  </span>
                  <i class="feather-chevron-down section-chevron" :class="{ open: sections.kepegawaian }"></i>
                </button>
                <div class="section-body" :class="{ collapsed: !sections.kepegawaian }">
                  <div class="row g-4">
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="gol">Golongan</label>
                      <i class="feather-award input-icon"></i>
                      <b-form-input id="gol" v-model="currentPegawai.gol" class="form-control floating-input" placeholder="Golongan (contoh: III/b)" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="jabatan">Jabatan</label>
                      <i class="feather-briefcase input-icon"></i>
                      <b-form-input id="jabatan" v-model="currentPegawai.jabatan" class="form-control floating-input" placeholder="Jabatan" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-floating">
                      <label for="tmt_cpns">TMT CPNS</label>
                      <i class="feather-calendar input-icon"></i>
                      <b-form-input id="tmt_cpns" v-model="currentPegawai.tmt_cpns" class="form-control floating-input" type="date" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-floating">
                      <label for="tmt_pns">TMT PNS</label>
                      <i class="feather-calendar input-icon"></i>
                      <b-form-input id="tmt_pns" v-model="currentPegawai.tmt_pns" class="form-control floating-input" type="date" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="input-floating">
                      <label for="tmt_tugas">TMT Tempat Tugas</label>
                      <i class="feather-calendar input-icon"></i>
                      <b-form-input id="tmt_tugas" v-model="currentPegawai.tmt_tugas" class="form-control floating-input" type="date" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label>Masa Kerja Golongan</label>
                      <i class="feather-clock input-icon"></i>
                      <div class="row g-2">
                        <div class="col-6">
                          <b-form-input
                            id="masa_kerja_tahun"
                            v-model="currentPegawai.masa_kerja_tahun"
                            class="form-control floating-input"
                            type="number"
                            min="0"
                            placeholder="Tahun"
                          />
                        </div>
                        <div class="col-6">
                          <b-form-input
                            id="masa_kerja_bulan"
                            v-model="currentPegawai.masa_kerja_bulan"
                            class="form-control floating-input"
                            type="number"
                            min="0"
                            max="11"
                            placeholder="Bulan"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="kgb">KGB</label>
                      <i class="feather-trending-up input-icon"></i>
                      <b-form-input id="kgb" v-model="currentPegawai.kgb" class="form-control floating-input" placeholder="KGB" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="ijazah_jurusan">Jurusan</label>
                      <i class="feather-book input-icon"></i>
                      <b-form-input
                        id="ijazah_jurusan"
                        v-model="currentPegawai.ijazah_jurusan"
                        class="form-control floating-input"
                        placeholder="Jurusan"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="ijazah_fakultas">Fakultas</label>
                      <i class="feather-book-open input-icon"></i>
                      <b-form-input
                        id="ijazah_fakultas"
                        v-model="currentPegawai.ijazah_fakultas"
                        class="form-control floating-input"
                        placeholder="Fakultas"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="ijazah_universitas">Universitas</label>
                      <i class="feather-home input-icon"></i>
                      <b-form-input
                        id="ijazah_universitas"
                        v-model="currentPegawai.ijazah_universitas"
                        class="form-control floating-input"
                        placeholder="Universitas"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="ijazah_pendidikan">Pendidikan</label>
                      <i class="feather-award input-icon"></i>
                      <b-form-select
                        id="ijazah_pendidikan"
                        v-model="currentPegawai.ijazah_pendidikan"
                        :options="pendidikanOptions"
                        class="form-control floating-input"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="ijazah_tahun_lulus">Tahun Lulus</label>
                      <i class="feather-calendar input-icon"></i>
                      <b-form-input
                        id="ijazah_tahun_lulus"
                        v-model="currentPegawai.ijazah_tahun_lulus"
                        class="form-control floating-input"
                        type="number"
                        min="1900"
                        max="2100"
                        placeholder="Contoh: 2020"
                      />
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div class="form-section">
                <button
                  type="button"
                  class="section-title section-toggle"
                  @click="toggleSection('kontak')"
                  :aria-expanded="sections.kontak"
                >
                  <span class="section-title-left">
                    <i class="feather-mail"></i>
                    <span>Kontak dan Alamat</span>
                  </span>
                  <i class="feather-chevron-down section-chevron" :class="{ open: sections.kontak }"></i>
                </button>
                <div class="section-body" :class="{ collapsed: !sections.kontak }">
                  <div class="row g-4">
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="email">Email</label>
                      <i class="feather-mail input-icon"></i>
                      <b-form-input id="email" v-model="currentPegawai.email" class="form-control floating-input" type="email" placeholder="Email" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="hp">No. HP</label>
                      <i class="feather-phone input-icon"></i>
                      <b-form-input id="hp" v-model="currentPegawai.hp" class="form-control floating-input" type="tel" placeholder="No. HP" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="alamat_ktp">Alamat Sesuai KTP</label>
                      <i class="feather-map-pin input-icon"></i>
                      <b-form-textarea id="alamat_ktp" v-model="currentPegawai.alamat_ktp" class="form-control floating-input" rows="2" placeholder="Alamat KTP" style="resize: vertical;" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="input-floating">
                      <label for="alamat_tinggal">Alamat Tempat Tinggal</label>
                      <i class="feather-home input-icon"></i>
                      <b-form-textarea id="alamat_tinggal" v-model="currentPegawai.alamat_tinggal" class="form-control floating-input" rows="2" placeholder="Alamat Tinggal Sekarang" style="resize: vertical;" />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="input-floating">
                      <label for="keterangan">Keterangan</label>
                      <i class="feather-info input-icon"></i>
                      <b-form-textarea id="keterangan" v-model="currentPegawai.keterangan" class="form-control floating-input" rows="3" placeholder="Keterangan tambahan" style="resize: vertical;" />
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div class="custom-modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">
                  Batal
                </button>
                <button type="submit" class="btn btn-primary">
                  <i class="feather-save"></i> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <foot />
      <scroll />
    </div>
  </div>
</template>

<script setup>
import MadrasahHeaderMenu from '@/components/MadrasahHeaderMenu.vue'
import { computed, ref, nextTick, onMounted, watch } from 'vue'
import Swal from 'sweetalert2'
import madrasahService from '@/services/madrasahService'
import { getMadrasahClassLevelCount, getMadrasahLabel, getStoredUser } from '@/utils/madrasahAccess'

const props = defineProps({
  entitySingular: {
    type: String,
    default: 'Pegawai'
  },
  entityPlural: {
    type: String,
    default: 'Pegawai'
  },
  headerTitle: {
    type: String,
    default: 'Data Pegawai Madrasah Dilingkungan Kemenag Tanah Datar'
  },
  emptyTableText: {
    type: String,
    default: 'Tidak ada data pegawai'
  },
  storageKey: {
    type: String,
    default: 'madrasah_data_pegawai'
  },
  endpointPath: {
    type: String,
    default: '/madrasah/pegawai'
  },
  showGuruFields: {
    type: Boolean,
    default: false
  }
})

const showModal = ref(false)
const editMode = ref(false)
const currentPegawai = ref({})
const currentPage = ref(1)
const itemsPerPage = ref(10)
const sections = ref({
  identitas: true,
  kepegawaian: true,
  kontak: true,
  guru: true
})
const isLoading = ref(false)
const isApiPegawaiData = ref(false)
const jabatanFilter = props.showGuruFields ? 'guru' : 'adm'

const notifySuccess = (message) => {
  Swal.fire({
    title: 'Berhasil',
    text: message,
    icon: 'success',
    timer: 1800,
    showConfirmButton: false
  })
}

const notifyError = (message) => {
  Swal.fire({
    title: 'Gagal',
    text: message,
    icon: 'error'
  })
}

const normalizeApiRows = (rows) => {
  if (!Array.isArray(rows)) return []
  return rows.map((item, index) => ({
    ...item,
    id: item?.id ?? item?.user_id ?? item?.nomor_induk ?? index + 1,
    no_urut: item?.no_urut ?? index + 1,
    nama: item?.nama ?? item?.name ?? '',
    nip: item?.nip ?? item?.nomor_induk ?? '',
    status: item?.status ?? '',
    asn: String(item?.asn ?? '').trim().toUpperCase(),
    jabatan: item?.jabatan ?? item?.pekerjaan ?? '',
    satker: item?.satker ?? '',
    email: item?.email ?? '',
    hp: item?.hp ?? item?.phone ?? '',
    jk: item?.jk ?? item?.jenis_kelamin ?? '',
    kat_jabatan: item?.kat_jabatan ?? '',
    pp: item?.pp ?? ''
  }))
}

const filterRowsByJabatan = (rows) => {
  const normalizedRows = normalizeApiRows(rows)
  return normalizedRows
    .filter((item) => {
      const katJabatan = String(item?.kat_jabatan ?? '').trim().toLowerCase()
      return katJabatan === jabatanFilter
    })
    .map((item, index) => ({
      ...item,
      no_urut: index + 1
    }))
}

const displayKategoriJabatan = (value) => {
  if (isApiPegawaiData.value) return 'SILATAR'
  return displayValue(value)
}

const madrasahTypeLabel = computed(() => getMadrasahLabel())
const madrasahClassLevelCount = computed(() => getMadrasahClassLevelCount())

const totalPages = computed(() => {
  return Math.max(Math.ceil(pegawaiData.value.length / itemsPerPage.value), 1)
})

const paginatedPegawaiData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return pegawaiData.value.slice(start, end)
})

const paginationStart = computed(() => {
  if (!pegawaiData.value.length) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, pegawaiData.value.length)
})

const getDeptId = () => {
  const user = getStoredUser()
  return user?.dept_id ?? user?.dept?.id ?? user?.dept?.dept_id ?? null
}

const loadFromLocalStorage = () => {
  try {
    isApiPegawaiData.value = false
    const savedData = localStorage.getItem(props.storageKey)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      if (Array.isArray(parsedData)) {
        pegawaiData.value = filterRowsByJabatan(parsedData)
      }
    }
  } catch (error) {
    console.error(`Gagal membaca data ${props.entitySingular}:`, error)
  }
}

const loadPegawaiData = async () => {
  isLoading.value = true
  try {
    const deptId = getDeptId()
    if (deptId) {
      const rows = await madrasahService.getPegawaiByDeptId(deptId)
      const filteredRows = filterRowsByJabatan(rows)
      pegawaiData.value = filteredRows
      isApiPegawaiData.value = true
      currentPage.value = 1
      return
    }
    loadFromLocalStorage()
    currentPage.value = 1
  } catch (error) {
    console.error(`Gagal mengambil data pegawai/guru dari API:`, error)
    loadFromLocalStorage()
    currentPage.value = 1
  } finally {
    isLoading.value = false
  }
}

const toggleSection = (key) => {
  sections.value[key] = !sections.value[key]
}

const parseMasaKerja = (value) => {
  if (!value) return { tahun: '', bulan: '' }
  const parts = String(value)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  const tahun = parts[0] ?? ''
  const bulan = parts[1] ?? ''
  return { tahun, bulan }
}

const parseIjazah = (value) => {
  if (!value) return { fakultas: '', jurusan: '', universitas: '', pendidikan: '', tahun_lulus: '' }
  const parts = String(value)
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  const fakultas = parts[0] ?? ''
  const jurusan = parts.slice(1).join(', ') ?? ''
  return { fakultas, jurusan, universitas: '', pendidikan: '', tahun_lulus: '' }
}

const composeMasaKerja = ({ tahun, bulan }) => {
  const t = (tahun ?? '').toString().trim()
  const b = (bulan ?? '').toString().trim()
  if (!t && !b) return ''
  if (t && b) return `${t}, ${b}`
  return t || b
}

const composeIjazah = ({ fakultas, jurusan, universitas, pendidikan, tahun_lulus }) => {
  const f = (fakultas ?? '').toString().trim()
  const j = (jurusan ?? '').toString().trim()
  const u = (universitas ?? '').toString().trim()
  const p = (pendidikan ?? '').toString().trim()
  const t = (tahun_lulus ?? '').toString().trim()
  const parts = [f, j, u, p, t].filter(Boolean)
  return parts.join(', ')
}

const displayValue = (value) => {
  const val = (value ?? '').toString().trim()
  return val || '-'
}

const displayJenisKelamin = (value) => {
  if (value === 'L') return 'Laki-laki'
  if (value === 'P') return 'Perempuan'
  if (String(value).toLowerCase() === 'wanita') return 'Perempuan'
  if (String(value).toLowerCase() === 'pria') return 'Laki-laki'
  return '-'
}

const getStatusVariant = (value) => {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (!normalized) return 'secondary'
  if (['pns', 'aktif', 'sudah'].includes(normalized)) return 'success'
  if (['pppk', 'honor', 'kontrak'].includes(normalized)) return 'info'
  return 'secondary'
}

const showExtraProfileFields = (item) => {
  return Boolean(
    item?.npwp ||
    item?.tmt_cpns ||
    item?.tmt_pns ||
    item?.tmt_tugas ||
    item?.tempat_lahir ||
    item?.tgl_lahir ||
    item?.masa_kerja ||
    item?.kgb ||
    item?.ijazah ||
    item?.hp ||
    item?.alamat_ktp ||
    item?.alamat_tinggal ||
    item?.keterangan
  )
}

const formatTanggalIndonesia = (value) => {
  if (!value) return '-'
  const raw = String(value).trim()
  if (!raw) return '-'
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return raw
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const displayMasaKerja = (item) => {
  const tahun = item?.masa_kerja_tahun ?? parseMasaKerja(item?.masa_kerja).tahun
  const bulan = item?.masa_kerja_bulan ?? parseMasaKerja(item?.masa_kerja).bulan
  if (!tahun && !bulan) return '-'
  if (tahun && bulan) return `${tahun} tahun ${bulan} bulan`
  if (tahun) return `${tahun} tahun`
  return `${bulan} bulan`
}

const displayPendidikanTerakhir = (item) => {
  const parsed = parseIjazah(item?.ijazah)
  const fakultas = item?.ijazah_fakultas ?? parsed.fakultas
  const jurusan = item?.ijazah_jurusan ?? parsed.jurusan
  const pendidikan = item?.ijazah_pendidikan ?? parsed.pendidikan
  const f = (fakultas ?? '').toString().trim()
  const j = (jurusan ?? '').toString().trim()
  const p = (pendidikan ?? '').toString().trim()
  const parts = [p, j].filter(Boolean)
  const head = parts.join(' ')
  if (head && f) return `${head}, Fakultas ${f}`
  if (head) return head
  if (f) return `Fakultas ${f}`
  return '-'
}

const displayUniversitas = (item) => {
  const parsed = parseIjazah(item?.ijazah)
  const universitas = item?.ijazah_universitas ?? parsed.universitas
  const u = (universitas ?? '').toString().trim()
  return u || '-'
}

const displayTahunLulus = (item) => {
  const parsed = parseIjazah(item?.ijazah)
  const tahun = item?.ijazah_tahun_lulus ?? parsed.tahun_lulus
  const t = (tahun ?? '').toString().trim()
  return t || '-'
}

const toggleRowDetails = (item) => {
  item._showDetails = !item._showDetails
}

const pegawaiData = ref([])
const fields = ref([
  { key: 'no_urut', label: 'No' },
  { key: 'nama', label: 'Nama', sortable: true },
  { key: 'nip', label: 'NIP' },
  { key: 'asn', label: 'ASN' },
  { key: 'jabatan', label: 'Jabatan' },
  { key: 'satker', label: 'Satker' },
  'actions'
])
const statusOptions = ref([
  { value: null, text: 'Pilih Status' },
  { value: 'PNS', text: 'PNS' },
  { value: 'PPPK', text: 'PPPK' },
  { value: 'HONOR', text: 'HONOR' }
])
const jenisKelaminOptions = ref([
  { text: 'Laki-laki', value: 'L' },
  { text: 'Perempuan', value: 'P' }
])
const pendidikanOptions = ref([
  { value: null, text: 'Pilih Jenjang Pendidikan' },
  { value: 'SD', text: 'SD Sederajat' },
  { value: 'SMP', text: 'SMP Sederajat' },
  { value: 'SMA', text: 'SMA Sederajat' },
  { value: 'DII', text: 'DII' },
  { value: 'DIII', text: 'DIII' },
  { value: 'DIV', text: 'DIV' },
  { value: 'S-1', text: 'S-1' },
  { value: 'S-2', text: 'S-2' },
  { value: 'S-3', text: 'S-3' },
])
const sertifikasiOptions = ref([
  { value: null, text: 'Pilih Status Sertifikasi' },
  { value: 'Sudah', text: 'Sudah' },
  { value: 'Belum', text: 'Belum' }
])

const resetForm = () => {
  currentPegawai.value = {
    id: null,
    no_urut: '',
    nama: '',
    status: null,
    nip: '',
    nik: '',
    npwp: '',
    gol: '',
    tmt_cpns: '',
    tmt_pns: '',
    tmt_tugas: '',
    tempat_lahir: '',
    tgl_lahir: '',
    jenis_kelamin: null,
    masa_kerja: '',
    masa_kerja_tahun: '',
    masa_kerja_bulan: '',
    kgb: '',
    ijazah: '',
    ijazah_fakultas: '',
    ijazah_jurusan: '',
    ijazah_universitas: '',
    ijazah_pendidikan: null,
    ijazah_tahun_lulus: '',
    jabatan: '',
    email: '',
    hp: '',
    alamat_ktp: '',
    alamat_tinggal: '',
    keterangan: '',
    bidang_studi_diajar: '',
    peg_id: '',
    nuptk: '',
    npk: '',
    nrg: '',
    sertifikasi: null,
    bidang_studi_sertifikasi: '',
    nama_gadis_ibu_kandung: ''
  }
}

const openAddModal = async () => {
  editMode.value = false
  resetForm()
  await nextTick()
  showModal.value = true
  sections.value = { identitas: true, kepegawaian: true, kontak: true, guru: true }
}

const editPegawai = (item) => {
  const mk = parseMasaKerja(item?.masa_kerja)
  const ij = parseIjazah(item?.ijazah)
  currentPegawai.value = {
    ...item,
    masa_kerja_tahun: item?.masa_kerja_tahun ?? mk.tahun,
    masa_kerja_bulan: item?.masa_kerja_bulan ?? mk.bulan,
    ijazah_fakultas: item?.ijazah_fakultas ?? ij.fakultas,
    ijazah_jurusan: item?.ijazah_jurusan ?? ij.jurusan,
    ijazah_universitas: item?.ijazah_universitas ?? ij.universitas,
    ijazah_pendidikan: item?.ijazah_pendidikan ?? ij.pendidikan ?? null,
    ijazah_tahun_lulus: item?.ijazah_tahun_lulus ?? ij.tahun_lulus
  }
  editMode.value = true
  showModal.value = true
  sections.value = { identitas: true, kepegawaian: true, kontak: true, guru: true }
}

const closeModal = () => {
  showModal.value = false
  resetForm()
}

const savePegawai = async () => {
  if (!currentPegawai.value.nama || !currentPegawai.value.status) {
    notifyError(`Lengkapi Nama ${props.entitySingular} dan Status!`)
    return
  }
  const payload = {
    ...currentPegawai.value,
    masa_kerja: composeMasaKerja({
      tahun: currentPegawai.value.masa_kerja_tahun,
      bulan: currentPegawai.value.masa_kerja_bulan
    }),
    ijazah: composeIjazah({
      fakultas: currentPegawai.value.ijazah_fakultas,
      jurusan: currentPegawai.value.ijazah_jurusan,
      universitas: currentPegawai.value.ijazah_universitas,
      pendidikan: currentPegawai.value.ijazah_pendidikan,
      tahun_lulus: currentPegawai.value.ijazah_tahun_lulus
    })
  }
  const previousData = JSON.parse(JSON.stringify(pegawaiData.value))
  const wasEdit = editMode.value
  if (wasEdit) {
    const index = pegawaiData.value.findIndex(p => p.id === payload.id)
    if (index > -1) {
      pegawaiData.value[index] = { ...payload }
    }
  } else {
    const newId = Date.now()
    const newNoUrut = pegawaiData.value.length + 1
    pegawaiData.value.push({ ...payload, id: newId, no_urut: newNoUrut })
  }
  try {
    if (wasEdit) {
      await madrasahService.update(props.endpointPath, payload.id, payload)
    } else {
      await madrasahService.create(props.endpointPath, payload)
    }
    notifySuccess(`Data ${props.entitySingular} berhasil disimpan!`)
    closeModal()
  } catch (error) {
    pegawaiData.value = previousData
    console.error(`Gagal sinkron ke endpoint ${props.endpointPath}:`, error)
    notifyError(`Data ${props.entitySingular} gagal disimpan ke server.`)
  }
}

onMounted(async () => {
  await loadPegawaiData()
  resetForm()
})

watch(
  pegawaiData,
  () => {
    if (currentPage.value > totalPages.value) {
      currentPage.value = totalPages.value
    }
    if (currentPage.value < 1) {
      currentPage.value = 1
    }
  },
  { deep: true }
)

watch(itemsPerPage, () => {
  currentPage.value = 1
})

watch(
  pegawaiData,
  (newValue) => {
    try {
      localStorage.setItem(props.storageKey, JSON.stringify(newValue))
    } catch (error) {
      console.error(`Gagal menyimpan data ${props.entitySingular}:`, error)
    }
  },
  { deep: true }
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Poppins', sans-serif !important;
}

.report-shell {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid #e8eef7;
  overflow: hidden;
}

.data-card {
  padding: 1.25rem;
}

.data-card :deep(.b-table) {
  margin-bottom: 0;
}

.data-card :deep(table) {
  margin-bottom: 0;
}

.data-card :deep(thead th) {
  background: linear-gradient(135deg, #1f3c88 0%, #3f72af 100%);
  color: #fff;
  border-bottom: none;
}

.data-card :deep(tbody tr:hover) {
  background: #f7fbff;
}

.data-card :deep(.table-responsive) {
  border-radius: 18px;
  overflow: hidden;
}

.data-card :deep(.b-table-empty-row) {
  text-align: center;
}

.data-card :deep(.pagination) {
  margin-bottom: 0;
}

.pegawai-table {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.pegawai-table th {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  padding: 1rem 0.75rem;
  border: none;
}

.pegawai-table td {
  padding: 1rem 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.pegawai-table :deep(tbody > tr) {
  cursor: pointer;
}

.pegawai-table :deep(tbody > tr.b-table-details) {
  cursor: default;
}

.pegawai-row-details {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1rem;
}

.details-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.75rem;
}

.details-title i {
  color: #667eea;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 1rem;
}

.details-item {
  color: #475569;
  font-size: 0.9rem;
  line-height: 1.4;
}

  .details-item strong {
  color: #1e293b;
}

.details-item-full {
  grid-column: 1 / -1;
}

.table-busy-state {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  padding: 1rem 0;
  color: #475569;
  font-weight: 500;
}

.table-pagination-wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.table-pagination-info {
  color: #64748b;
  font-size: 0.9rem;
}

.pegawai-name-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.pegawai-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  overflow: hidden;
  flex: 0 0 42px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.95rem;
}

.pegawai-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pegawai-name-meta {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.pegawai-name-meta strong {
  color: #1e293b;
  line-height: 1.2;
}

.pegawai-name-meta small {
  color: #64748b;
  font-size: 0.78rem;
}

/* MODAL ENHANCEMENTS */
.custom-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1060;
  animation: modalFadeIn 0.25s ease-out;
}

.custom-modal {
  background: white;
  border-radius: 20px;
  width: min(95%, 900px);
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px rgba(0,0,0,0.25);
  animation: modalSlideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  max-width: 850px;
}

.custom-modal-header {
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-modal-header h5 {
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
}

.btn-close {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-close:hover {
  background: rgba(255,255,255,0.3);
  transform: scale(1.05);
}

.custom-modal-body {
  padding: 2.5rem;
}

.form-section + .form-section {
  margin-top: 1.5rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-title.section-toggle {
  width: 100%;
  background: transparent;
  border: 0;
  padding: 0 0 0.65rem 0;
  margin: 0 0 1rem 0;
  cursor: pointer;
  justify-content: space-between;
}

.section-title-left {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
}

.section-chevron {
  color: #64748b;
  transition: transform 0.2s ease;
}

.section-chevron.open {
  transform: rotate(180deg);
}

.section-body {
  overflow: hidden;
}

.section-body.collapsed {
  max-height: 0;
  opacity: 0;
  pointer-events: none;
  margin-top: -0.5rem;
}

.section-body:not(.collapsed) {
  max-height: 2000px;
  opacity: 1;
  transition: opacity 0.2s ease;
}

.section-title.section-toggle:focus-visible {
  outline: 3px solid rgba(102, 126, 234, 0.25);
  border-radius: 10px;
}

.section-title i {
  color: #667eea;
  font-size: 1rem;
}

.custom-modal-footer {
  padding: 1.5rem 2.5rem;
  border-top: 1px solid #e2e8f0;
  background: #f8fafc;
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 12px;
  font-weight: 500;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 48px;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f8fafc;
  color: #64748b;
  border: 2px solid #e2e8f0;
}

.btn-secondary:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
}

/* CLEAN INPUT SYSTEM */
.input-floating {
  position: relative;
  margin-bottom: 1rem;
}

.input-floating > label {
  display: block;
  margin-bottom: 0.5rem;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.2;
  pointer-events: none;
}

.input-floating > i,
.input-floating > .input-icon {
  position: absolute;
  left: 14px;
  top: 41px;
  transform: translateY(-50%);
  color: #94a3b8;
  font-size: 16px;
  z-index: 2;
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-floating :deep(.form-control),
.input-floating :deep(.form-select),
.input-floating .floating-input {
  min-height: 46px !important;
  border: 1px solid #dbe2ea !important;
  border-radius: 10px !important;
  background: #fff !important;
  color: #1e293b !important;
  padding-left: 2.35rem !important;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.input-floating :deep(.form-control:focus),
.input-floating :deep(.form-select:focus),
.input-floating .floating-input:focus {
  border-color: #667eea !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15) !important;
}

.input-floating:focus-within > i,
.input-floating:focus-within > .input-icon {
  color: #667eea;
}

.input-floating :deep(textarea.form-control) {
  min-height: 100px !important;
  padding-top: 0.7rem !important;
  resize: vertical !important;
}

/* RADIO GROUP CLEANUP */
.radio-group-floating {
  border: 1px solid #dbe2ea;
  border-radius: 10px;
  padding: 0.65rem 0.9rem 0.5rem 2.35rem;
  min-height: 46px;
}

.radio-group-floating > i,
.radio-group-floating > .input-icon {
  top: 24px;
}

.radio-group-floating > label {
  margin-bottom: 0.45rem;
}

.radio-group-floating :deep(.form-check) {
  margin-right: 1rem;
  margin-bottom: 0;
}

.radio-group-floating :deep(.form-check-label) {
  font-size: 0.9rem;
  color: #334155;
}

.radio-group-floating :deep(.form-check-input) {
  margin-top: 0.15rem;
}

/* ROW & GRID PERFECT ALIGNMENT */
.row.g-4 [class*="col-"] {
  display: flex;
  flex-direction: column;
}

.row.g-4 .input-floating {
  flex: 1;
}

/* ANIMATIONS */
@keyframes modalFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modalSlideIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* RESPONSIVE PERFECTION */
@media (max-width: 768px) {
  .madrasah-hero {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-actions {
    justify-content: flex-start;
  }

  .custom-modal-body {
    padding: 1.5rem;
  }
  
  .custom-modal-header, .custom-modal-footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .input-floating {
    margin-bottom: 0.8rem;
  }
  
  .input-floating > i,
  .input-floating > .input-icon {
    top: 39px;
  }
  
  .input-floating > label {
    font-size: 0.82rem;
  }
  
  .row > * {
    margin-bottom: 0.35rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .table-pagination-wrapper {
    flex-direction: column;
    align-items: stretch;
  }
  
  .custom-modal-footer {
    flex-direction: column-reverse;
    gap: 0.75rem;
  }
  
  .btn {
    width: 100%;
    min-height: 52px;
  }
}

@media (max-width: 480px) {
  .custom-modal {
    margin: 0.5rem;
    border-radius: 16px;
  }
  
  .input-floating :deep(textarea.form-control) {
    min-height: 90px !important;
  }
}

/* Focus visible for accessibility */
@supports selector(:focus-visible) {
  .floating-input:focus-visible {
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2), 0 0 0 1px #667eea !important;
  }
}

/* High contrast mode support -->
@media (prefers-contrast: high) {
  .input-floating :deep(.form-control),
  .input-floating :deep(.form-select) {
    border-width: 2px !important;
  }
  
  .input-floating > i,
  .input-floating > .input-icon {
    opacity: 1 !important;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

.radio-group-floating :deep(.form-check-input:checked) {
  background-image: none !important;
  background-color: #667eea !important;
  border-color: #667eea !important;
}

.radio-group-floating :deep(.form-check-input) {
  width: 18px !important;
  height: 18px !important;
  margin-top: 0 !important;
}
</style>
