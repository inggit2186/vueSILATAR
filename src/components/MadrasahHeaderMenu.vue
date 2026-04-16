<template>
  <div v-if="isAllowed" class="madrasah-menu-shell">
    <div class="madrasah-menu-hero">
      <div>
        <span class="madrasah-menu-kicker">Portal Madrasah</span>
        <h3>{{ madrasahTypeLabel }} - {{ activeItem.label }}</h3>
        <p>{{ activeItem.description }}</p>
      </div>
      <div class="madrasah-menu-badge">
        <i class="feather-grid"></i>
        <span>{{ madrasahClassLevelCount }} Level</span>
      </div>
    </div>

    <div class="madrasah-menu-tabs">
      <router-link
        v-for="item in menuItems"
        :key="item.to"
        :to="item.to"
        class="madrasah-menu-tab"
        :class="{ active: isActive(item) }"
      >
        <i :class="item.icon"></i>
        <span>{{ item.shortLabel }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {
  canAccessMadrasah,
  getMadrasahClassLevelCount,
  getMadrasahLabel
} from '@/utils/madrasahAccess'

const MENU_ITEMS = [
  {
    to: '/madrasah/profil',
    label: 'Profil Madrasah',
    shortLabel: 'Profil',
    icon: 'feather-home',
    description: 'Lengkapi identitas, status lembaga, dan informasi dasar madrasah.'
  },
  {
    to: '/madrasah/pegawai',
    label: 'Data Pegawai Madrasah',
    shortLabel: 'Pegawai',
    icon: 'feather-users',
    description: 'Kelola data pegawai madrasah dalam satu tampilan yang lebih terstruktur.'
  },
  {
    to: '/madrasah/guru',
    label: 'Data Guru Madrasah',
    shortLabel: 'Guru',
    icon: 'feather-book-open',
    description: 'Pantau dan perbarui data guru madrasah dengan lebih cepat.'
  },
  {
    to: '/madrasah/laporan-semester',
    label: 'Laporan Semester Madrasah',
    shortLabel: 'Laporan Semester',
    icon: 'feather-file-text',
    description: 'Input dan review laporan semester madrasah dalam format yang rapi.'
  },
  {
    to: '/madrasah/laporan-bulanan',
    label: 'Laporan Bulanan Madrasah',
    shortLabel: 'Laporan Bulanan',
    icon: 'feather-calendar',
    description: 'Kelola rekap siswa dan laporan bulanan madrasah dari satu area kerja.'
  }
]

export default {
  name: 'MadrasahHeaderMenu',
  data() {
    return {
      menuItems: MENU_ITEMS
    }
  },
  computed: {
    isAllowed() {
      return canAccessMadrasah()
    },
    madrasahTypeLabel() {
      return getMadrasahLabel()
    },
    madrasahClassLevelCount() {
      return getMadrasahClassLevelCount()
    },
    activeItem() {
      return this.menuItems.find((item) => this.isActive(item)) || this.menuItems[0]
    }
  },
  methods: {
    isActive(item) {
      return this.$route.path === item.to
    }
  }
}
</script>

<style scoped>
.madrasah-menu-shell {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 1rem;
}

.madrasah-menu-hero {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.15rem;
  border-radius: 18px;
  background: linear-gradient(135deg, #173b78 0%, #2e5ea8 55%, #5a88cb 100%);
  color: #fff;
  box-shadow: 0 14px 34px rgba(24, 48, 92, 0.2);
}

.madrasah-menu-kicker {
  display: inline-block;
  margin-bottom: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.84;
}

.madrasah-menu-hero h3 {
  margin: 0;
  font-size: 1.15rem;
}

.madrasah-menu-hero p {
  margin: 0.3rem 0 0;
  max-width: 620px;
  font-size: 0.86rem;
  opacity: 0.92;
}

.madrasah-menu-badge {
  min-width: 120px;
  padding: 0.8rem 0.95rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-weight: 700;
  backdrop-filter: blur(8px);
}

.madrasah-menu-badge i {
  font-size: 1.1rem;
}

.madrasah-menu-tabs {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 0.75rem;
}

.madrasah-menu-tab {
  border: 1px solid #d8e2f1;
  border-radius: 16px;
  padding: 0.85rem 0.9rem;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  color: #32507c;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  font-size: 0.82rem;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(25, 39, 68, 0.05);
  transition: all 0.18s ease;
  text-align: center;
}

.madrasah-menu-tab:hover {
  border-color: #b7cae6;
  color: #1f3c88;
  transform: translateY(-1px);
}

.madrasah-menu-tab.active {
  background: linear-gradient(135deg, #eaf2ff 0%, #f7fbff 100%);
  border-color: #90afdd;
  color: #173b78;
  box-shadow: 0 12px 28px rgba(27, 59, 120, 0.12);
}

@media (max-width: 992px) {
  .madrasah-menu-hero,
  .madrasah-menu-tabs {
    grid-template-columns: 1fr;
  }

  .madrasah-menu-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .madrasah-menu-badge {
    min-width: 0;
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
