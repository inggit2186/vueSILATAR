# Migration Handoff

Last updated: 2026-05-05

## Purpose
This is the main entry file for continuing the Laravel migration from the Vue workspace.

For the shortest starting point, open [MIGRATION-STATUS.md](./MIGRATION-STATUS.md) first.

Use this file when you want to:
- resume the migration after a gap
- hand the work to another person or Codex account
- understand what has already been moved
- decide the next safe module to cut over

## Current direction
- Keep Vue production untouched until a Laravel replacement is verified.
- Treat `/v1` as the migration target and source of truth for new pages.
- Continue module by module, with route verification after each move.
- Keep `migration-workspace/` as the planning record, but use this file as the top-level handoff.
- Build the new UI for all audience types, not just admins.
- Prefer a clean, modern, friendly presentation that still scans quickly for staff and guests.

## Already migrated
Core admin and workflow pages are already available in Laravel under `/v1`, including:
- admin shell
- profile
- satker
- layanan and layanan publik
- pengaduan
- presensi and kinerja
- rekap absensi
- kinerja harian
- laporan humas and humas admin
- laporan presensi
- rekap laporan
- laporan pengaduan
- laporan ketidakhadiran
- laporan kinerja
- verif CKH and verif humas
- all rekap CKH
- penilaian kinerja and penilaian SKP
- requests list, detail, and legacy detail route
- rekap pemberkasan and detail/action
- slip gaji and slip tukin
- madrasah hub and subpages
- public edge cases for internal, buku tamu, rate us, and about
- detail tamu
- laporan keuangan
- amprah and audit finance previews
- laporan pemberkasan
- cashbon
- userdata
- list pegawai kantor
- kinerja bawahan
- ASN list and rekap presensi ASN
- unit kerja, satuan kerja, and satker detail
- lappresensi and CKH satker views

## Latest routes in `/v1`
Recent additions include:
- `/migrations/amprah`
- `/migrations/amprah/{id?}`
- `/migrations/audit/{dipa?}`

## Main verification
The Laravel migration controller and route file currently pass syntax checks:
- `/v1/app/Http/Controllers/Migration/MigrationController.php`
- `/v1/routes/web.php`

## What still remains in Vue
The remaining work is now concentrated on the last admin detail pages and special actions.

## Recommended next step
1. Inspect the remaining Vue admin detail pages and their data sources.
2. Add matching Laravel routes and Blade views in `/v1`.
3. Link them from the migration shell and update the progress board.
4. Verify syntax and `route:list` before moving on.
5. When adding new pages, keep the public-facing visual style consistent with the broader site experience.

## Safe resume
If another Codex account continues this work, start with:
1. `MIGRATION-HANDOFF.md`
2. `migration-workspace/progress.md`
3. `migration-workspace/plan.md`
