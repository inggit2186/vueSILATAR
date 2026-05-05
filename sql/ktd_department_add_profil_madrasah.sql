-- Tambahan kolom profil madrasah ke tabel lama `ktd_department`
-- Aman untuk data lama karena tidak mengubah / menghapus kolom yang sudah ada.
-- Jalankan sekali di phpMyAdmin pada database yang berisi tabel `ktd_department`.

ALTER TABLE `ktd_department`
  ADD COLUMN `nsm` VARCHAR(50) NULL AFTER `hari_kerja`,
  ADD COLUMN `npsm` VARCHAR(50) NULL AFTER `nsm`,
  ADD COLUMN `status_lembaga` VARCHAR(20) NULL AFTER `npsm`,
  ADD COLUMN `jalan` VARCHAR(255) NULL AFTER `status_lembaga`,
  ADD COLUMN `jorong` VARCHAR(255) NULL AFTER `jalan`,
  ADD COLUMN `nagari` VARCHAR(255) NULL AFTER `jorong`,
  ADD COLUMN `kecamatan` VARCHAR(255) NULL AFTER `nagari`,
  ADD COLUMN `koordinat` VARCHAR(100) NULL AFTER `kecamatan`,
  ADD COLUMN `telepon` VARCHAR(30) NULL AFTER `koordinat`,
  ADD COLUMN `email` VARCHAR(255) NULL AFTER `telepon`,
  ADD COLUMN `website` VARCHAR(255) NULL AFTER `email`,
  ADD COLUMN `waktu_belajar` VARCHAR(20) NULL AFTER `website`,
  ADD COLUMN `visi` TEXT NULL AFTER `waktu_belajar`,
  ADD COLUMN `sk_pendirian` VARCHAR(255) NULL AFTER `visi`,
  ADD COLUMN `tanggal_sk` DATE NULL AFTER `sk_pendirian`,
  ADD COLUMN `komite_lembaga` VARCHAR(30) NULL AFTER `tanggal_sk`,
  ADD COLUMN `akreditasi` VARCHAR(10) NULL AFTER `komite_lembaga`,
  ADD COLUMN `tanggal_akreditasi` DATE NULL AFTER `akreditasi`,
  ADD COLUMN `status_kkm` VARCHAR(20) NULL AFTER `tanggal_akreditasi`,
  ADD COLUMN `jarak_pusat_provinsi` VARCHAR(50) NULL AFTER `status_kkm`,
  ADD COLUMN `jarak_pusat_kabupaten` VARCHAR(50) NULL AFTER `jarak_pusat_provinsi`,
  ADD COLUMN `jarak_kecamatan` VARCHAR(50) NULL AFTER `jarak_pusat_kabupaten`,
  ADD COLUMN `jarak_kanwil_kemenag` VARCHAR(50) NULL AFTER `jarak_kecamatan`,
  ADD COLUMN `jarak_kemenag_kab` VARCHAR(50) NULL AFTER `jarak_kanwil_kemenag`,
  ADD COLUMN `jarak_kua` VARCHAR(50) NULL AFTER `jarak_kemenag_kab`,
  ADD COLUMN `jarak_ra_terdekat` VARCHAR(50) NULL AFTER `jarak_kua`,
  ADD COLUMN `jarak_mi_terdekat` VARCHAR(50) NULL AFTER `jarak_ra_terdekat`,
  ADD COLUMN `jarak_mts_terdekat` VARCHAR(50) NULL AFTER `jarak_mi_terdekat`,
  ADD COLUMN `jarak_ma_terdekat` VARCHAR(50) NULL AFTER `jarak_mts_terdekat`,
  ADD COLUMN `jarak_pontren_terdekat` VARCHAR(50) NULL AFTER `jarak_ma_terdekat`,
  ADD COLUMN `jarak_tk_terdekat` VARCHAR(50) NULL AFTER `jarak_pontren_terdekat`,
  ADD COLUMN `jarak_sd_terdekat` VARCHAR(50) NULL AFTER `jarak_tk_terdekat`,
  ADD COLUMN `jarak_smp_terdekat` VARCHAR(50) NULL AFTER `jarak_sd_terdekat`,
  ADD COLUMN `jarak_sma_terdekat` VARCHAR(50) NULL AFTER `jarak_smp_terdekat`;

-- Backfill opsional dari data lama agar field baru tidak kosong total.
-- Bisa dihapus kalau ingin isi manual dari form.
UPDATE `ktd_department`
SET
  `koordinat` = CASE
    WHEN `koordinat` IS NULL AND `latitude` IS NOT NULL AND `longitude` IS NOT NULL
      THEN CONCAT(`latitude`, ', ', `longitude`)
    ELSE `koordinat`
  END
WHERE `kategori` IN ('min', 'mtsn', 'man');

-- Contoh ambil data profil madrasah berdasarkan ID:
-- SELECT * FROM `ktd_department` WHERE `id` = 20220927125;

-- Contoh update profil madrasah berdasarkan ID:
-- UPDATE `ktd_department`
-- SET
--   `nama` = 'MIN 1 Tanah Datar',
--   `nsm` = '111113040001',
--   `npsm` = '60712345',
--   `status_lembaga` = 'Negeri',
--   `jalan` = 'Jl. Contoh',
--   `jorong` = 'Jorong A',
--   `nagari` = 'Nagari B',
--   `kecamatan` = 'Kecamatan C',
--   `koordinat` = '-0.4148402, 100.5664474',
--   `telepon` = '08123456789',
--   `email` = 'madrasah@example.com',
--   `website` = 'https://madrasah.sch.id',
--   `waktu_belajar` = 'Pagi',
--   `visi` = 'Visi madrasah',
--   `sk_pendirian` = '421.1/123/2026',
--   `tanggal_sk` = '2026-04-21',
--   `komite_lembaga` = 'Sudah Terbentuk',
--   `akreditasi` = 'A',
--   `tanggal_akreditasi` = '2026-04-21',
--   `status_kkm` = 'Induk',
--   `jarak_pusat_provinsi` = '90 Km',
--   `jarak_pusat_kabupaten` = '17 Km',
--   `jarak_kecamatan` = '2 Km',
--   `jarak_kanwil_kemenag` = '90 Km',
--   `jarak_kemenag_kab` = '5 Km',
--   `jarak_kua` = '1 Km',
--   `jarak_ra_terdekat` = '1 Km',
--   `jarak_mi_terdekat` = '3 Km',
--   `jarak_mts_terdekat` = '4 Km',
--   `jarak_ma_terdekat` = '5 Km',
--   `jarak_pontren_terdekat` = '3 Km',
--   `jarak_tk_terdekat` = '1 Km',
--   `jarak_sd_terdekat` = '3 Km',
--   `jarak_smp_terdekat` = '3 Km',
--   `jarak_sma_terdekat` = '5 Km'
-- WHERE `id` = 20220927125;
