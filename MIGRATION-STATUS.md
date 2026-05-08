# Migration Status

Last updated: 2026-05-05

## Main entry
This repository is still the Vue app, but the migration work now lives side by side with it.

Start here:
- [MIGRATION-HANDOFF.md](./MIGRATION-HANDOFF.md)
- [migration-workspace/progress.md](./migration-workspace/progress.md)
- [migration-workspace/plan.md](./migration-workspace/plan.md)

## Current target
- Move the remaining Vue admin detail pages and special actions into `/v1`.
- Keep the Laravel migration shell as the active target for new pages.
- Do not remove legacy Vue routes until a Laravel replacement is verified.
- Shape the migration UI for mixed audiences: staff, guests, younger users, older users, and users with different technical comfort levels.
- Keep the design fresh, readable, and friendly so it does not feel like a narrow admin dashboard.

## Already migrated to `/v1`
The Laravel workspace already contains:
- admin shell
- profile
- satker and layanan pages
- presensi and kinerja pages
- rekap and approval flows
- requests list/detail
- rekap pemberkasan
- payroll pages
- madrasah pages
- public edge cases
- finance previews, including `laporan-keuangan`, `amprah`, `audit`, and `cashbon`
- employee data pages
- ASN directory pages

## How to continue
1. Open [MIGRATION-HANDOFF.md](./MIGRATION-HANDOFF.md).
2. Check [migration-workspace/progress.md](./migration-workspace/progress.md) for the current module queue.
3. Implement the next route or view in `/v1`, keeping the public-friendly visual direction in mind.
4. Verify with `php -l` and `php artisan route:list --path=migrations`.
