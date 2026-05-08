<template>
  <div>
    <div v-if="showSubmenu" class="submenu">
      <button
        v-for="sub in submenuOptions"
        :key="sub.id"
        class="submenu-item"
        type="button"
        @click="handleSubClick(sub)"
      >
        <i :class="sub.icon" class="submenu-icon"></i>
        <span>{{ sub.title }}</span>
      </button>
    </div>
    <div v-if="isOpen" class="futuristic-bottom-nav">
      <button
        v-for="option in options"
        :key="option.id"
        class="nav-item"
        :class="{ active: modelValue === option.id }"
        type="button"
        :aria-current="modelValue === option.id ? 'page' : null"
        @click="handleClick(option)"
      >
        <i :class="option.icon" class="nav-icon"></i>
        <span class="nav-title">{{ option.title }}</span>
      </button>
    </div>
    <button
      class="menu-icon"
      type="button"
      :aria-expanded="isOpen"
      aria-label="Toggle bottom navigation"
      @click="toggleMenu"
    >
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'FuturisticBottomNav',
  props: {
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Number,
      required: true
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isOpen: false,
      showSubmenu: false,
      submenuOptions: []
    }
  },
  methods: {
    handleClick(option) {
      if (option.childs) {
        this.showSubmenu = true;
        this.submenuOptions = option.childs;
      } else {
        this.$emit('update:modelValue', option.id);
        if (option.path) {
          this.$router.push(option.path);
        }
        this.isOpen = false; // close after click
        this.showSubmenu = false;
      }
    },
    handleSubClick(subOption) {
      this.$emit('update:modelValue', subOption.id);
      if (subOption.path) {
        this.$router.push(subOption.path);
      }
      this.isOpen = false;
      this.showSubmenu = false;
    },
    toggleMenu() {
      this.isOpen = !this.isOpen;
      this.showSubmenu = false;
    }
  }
}
</script>

<style scoped>
.futuristic-bottom-nav {
  position: fixed;
  bottom: 80px; /* above the icon */
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 20px 20px 0 0;
  padding: 10px 0;
  box-shadow: 0 -10px 30px rgba(15, 23, 42, 0.08);
  z-index: 1000;
}

.menu-icon {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #ffffff 0%, #eef6ff 100%);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.12);
  z-index: 1001;
  transition: all 0.3s ease;
}

.menu-icon,
.nav-item,
.submenu-item {
  appearance: none;
  border: 0;
}

.menu-icon:hover {
  background: linear-gradient(135deg, #ffffff 0%, #dbeafe 100%);
  transform: translateX(-50%) scale(1.1);
}

.menu-icon i {
  font-size: 20px;
  color: #2563eb;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 8px 10px;
  border-radius: 16px;
  min-width: 60px;
  background: transparent;
  color: #475569;
}

.nav-item:hover {
  transform: translateY(-5px);
  background: rgba(37, 99, 235, 0.08);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}

.nav-item.active {
  background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
  color: white;
  transform: scale(1.05);
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 2px;
  color: inherit;
}

.nav-title {
  font-size: 10px;
  font-weight: 500;
  color: inherit;
}

.nav-item.active .nav-icon,
.nav-item.active .nav-title {
  color: white;
}

.submenu {
  position: fixed;
  bottom: 140px; /* above nav */
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(18px);
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  padding: 10px;
  box-shadow: 0 -10px 30px rgba(15, 23, 42, 0.08);
  z-index: 1002;
  display: flex;
  flex-direction: column;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 12px;
  transition: background 0.3s, transform 0.3s;
  background: transparent;
  color: #334155;
  text-align: left;
}

.submenu-item:hover {
  background: rgba(37, 99, 235, 0.08);
  transform: translateY(-1px);
}

.submenu-icon {
  margin-right: 10px;
  font-size: 16px;
  color: #2563eb;
}
</style>
