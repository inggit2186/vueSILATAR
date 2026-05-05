CREATE TABLE `ktd_laporan_semester_madrasah` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept_id` BIGINT(20) NOT NULL,
  `semester` ENUM('ganjil','genap') NOT NULL,
  `tahun_ajaran` VARCHAR(9) NOT NULL COMMENT 'Format: YYYY/YYYY',
  `status` ENUM('draft','submitted','revisi','approved') NOT NULL DEFAULT 'draft',
  `keadaan_gedung_json` LONGTEXT NULL,
  `sarana_pendidikan_json` LONGTEXT NULL,
  `bantuan_pemerintah_json` LONGTEXT NULL,
  `bantuan_non_pemerintah_json` LONGTEXT NULL,
  `data_guru_pegawai_json` LONGTEXT NULL,
  `tingkat_pendidikan_json` LONGTEXT NULL,
  `sertifikasi_json` LONGTEXT NULL,
  `banyak_hari_sekolah` INT(11) NOT NULL DEFAULT 0,
  `absensi_siswa_json` LONGTEXT NULL,
  `luas_tanah_json` LONGTEXT NULL,
  `sertifikat_tanah_json` LONGTEXT NULL,
  `catatan_admin` TEXT NULL,
  `submitted_at` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_laporan_semester_dept_periode` (`dept_id`,`semester`,`tahun_ajaran`),
  KEY `idx_laporan_semester_status` (`status`),
  KEY `idx_laporan_semester_tahun_ajaran` (`tahun_ajaran`),
  CONSTRAINT `fk_laporan_semester_department`
    FOREIGN KEY (`dept_id`) REFERENCES `ktd_department` (`id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*
Contoh relasi dengan Profil Madrasah:
SELECT
  ls.id,
  ls.tahun_ajaran,
  ls.semester,
  ls.status,
  d.nama,
  d.nsm,
  d.npsm,
  d.kecamatan
FROM ktd_laporan_semester_madrasah ls
INNER JOIN ktd_department d ON d.id = ls.dept_id
WHERE ls.dept_id = 20220927125;

Contoh insert draft:
INSERT INTO `ktd_laporan_semester_madrasah` (
  `dept_id`,
  `semester`,
  `tahun_ajaran`,
  `status`,
  `keadaan_gedung_json`,
  `sarana_pendidikan_json`,
  `bantuan_pemerintah_json`,
  `bantuan_non_pemerintah_json`,
  `data_guru_pegawai_json`,
  `tingkat_pendidikan_json`,
  `sertifikasi_json`,
  `banyak_hari_sekolah`,
  `absensi_siswa_json`,
  `luas_tanah_json`,
  `sertifikat_tanah_json`
) VALUES (
  20220927125,
  'genap',
  '2025/2026',
  'draft',
  '[{"label":"Ruang Kelas","baik":6,"ringan":0,"sedang":0,"berat":0}]',
  '[{"label":"Bangku Uk. 1 Siswa","baik":50,"ringan":2,"sedang":0,"berat":0}]',
  '[{"label":"BOS","diterima":10000000,"terserap":7500000}]',
  '[{"label":"Sumbangan","diterima":2000000,"terserap":1500000}]',
  '[{"label":"Kepala Madrasah","l":1,"p":0}]',
  '[{"label":"Strata I (S1)","l":5,"p":7}]',
  '[{"label":"PNS Kemenag","l":3,"p":4}]',
  24,
  '[{"label":"Sakit","l":5,"p":8}]',
  '{"total":5000,"perkaranganLuas":1200,"perkaranganTerbangun":900,"kebun":300,"lapanganOlahraga":400,"masjidMusholla":150,"wc":40,"perpustakaan":120}',
  '{"statusKepemilikan":"Milik Sendiri","nomor":"123/ABC/2025","tanggal":"2025-01-15","luas":4500}'
);

Contoh update draft per semester + tahun ajaran:
UPDATE `ktd_laporan_semester_madrasah`
SET
  `status` = 'submitted',
  `submitted_at` = NOW(),
  `banyak_hari_sekolah` = 26
WHERE `dept_id` = 20220927125
  AND `semester` = 'genap'
  AND `tahun_ajaran` = '2025/2026';
*/
