CREATE TABLE `ktd_laporan_bulanan_madrasah` (
  `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dept_id` BIGINT(20) NOT NULL,
  `bulan_laporan` VARCHAR(20) NOT NULL,
  `tahun_laporan` INT(4) NOT NULL,
  `tahun_ajaran` VARCHAR(9) NOT NULL COMMENT 'Format: YYYY/YYYY',
  `semester` ENUM('Ganjil','Genap') NOT NULL,
  `status` ENUM('draft','submitted','revisi','approved') NOT NULL DEFAULT 'draft',
  `nama_madrasah_snapshot` VARCHAR(255) NULL,
  `instansi_snapshot` VARCHAR(255) NULL,
  `rb` INT(11) NOT NULL DEFAULT 0,
  `student_counts_json` LONGTEXT NULL,
  `mutation_rows_json` LONGTEXT NULL,
  `catatan_admin` TEXT NULL,
  `submitted_at` DATETIME NULL DEFAULT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_laporan_bulanan_dept_periode` (`dept_id`,`bulan_laporan`,`tahun_laporan`),
  KEY `idx_laporan_bulanan_status` (`status`),
  KEY `idx_laporan_bulanan_tahun_ajaran` (`tahun_ajaran`),
  KEY `idx_laporan_bulanan_semester` (`semester`),
  CONSTRAINT `fk_laporan_bulanan_department`
    FOREIGN KEY (`dept_id`) REFERENCES `ktd_department` (`id`)
    ON UPDATE CASCADE
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*
Relasi dengan Profil Madrasah:
- dept_id terhubung ke ktd_department.id
- nama_madrasah_snapshot dan instansi_snapshot hanya sebagai salinan saat laporan disimpan
- data profil utama tetap mengacu ke tabel ktd_department

Contoh join ke Profil Madrasah:
SELECT
  lb.id,
  lb.bulan_laporan,
  lb.tahun_laporan,
  lb.tahun_ajaran,
  lb.semester,
  lb.status,
  d.nama,
  d.nsm,
  d.npsm,
  d.kecamatan
FROM ktd_laporan_bulanan_madrasah lb
INNER JOIN ktd_department d ON d.id = lb.dept_id
WHERE lb.dept_id = 20220927125
ORDER BY lb.tahun_laporan DESC, lb.id DESC;

Contoh insert draft:
INSERT INTO `ktd_laporan_bulanan_madrasah` (
  `dept_id`,
  `bulan_laporan`,
  `tahun_laporan`,
  `tahun_ajaran`,
  `semester`,
  `status`,
  `nama_madrasah_snapshot`,
  `instansi_snapshot`,
  `rb`,
  `student_counts_json`,
  `mutation_rows_json`
) VALUES (
  20220927125,
  'Januari',
  2026,
  '2025/2026',
  'Genap',
  'draft',
  'MIN 1 Tanah Datar',
  'Kantor Kementerian Agama Kab. Tanah Datar',
  12,
  '{"I.A":{"l":12,"p":10},"I.B":{"l":11,"p":9},"II.A":{"l":13,"p":12}}',
  '[{"namaSiswa":"Ahmad","nisn":"1234567890","nik":"1301xxxxxxxxxxxx","jenisKelamin":"L","tempatLahir":"Batusangkar","tanggalLahir":"2015-01-10","namaIbuKandung":"Nurhayati","kelas":"II.A","keterangan":"Mutasi Masuk"}]'
);

Contoh update submit:
UPDATE `ktd_laporan_bulanan_madrasah`
SET
  `status` = 'submitted',
  `submitted_at` = NOW(),
  `catatan_admin` = NULL
WHERE `dept_id` = 20220927125
  AND `bulan_laporan` = 'Januari'
  AND `tahun_laporan` = 2026;
*/
