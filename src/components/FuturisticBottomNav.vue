<template>
  <div>
    <div v-if="showSubmenu" class="submenu">
      <div
        v-for="sub in submenuOptions"
        :key="sub.id"
        class="submenu-item"
        @click="handleSubClick(sub)"
      >
        <i :class="sub.icon" class="submenu-icon"></i>
        <span>{{ sub.title }}</span>
      </div>
    </div>
    <div v-if="isOpen" class="futuristic-bottom-nav">
      <div
        v-for="option in options"
        :key="option.id"
        class="nav-item"
        :class="{ active: modelValue === option.id }"
        @click="handleClick(option)"
      >
        <i :class="option.icon" class="nav-icon"></i>
        <span class="nav-title">{{ option.title }}</span>
      </div>
    </div>
    <div class="menu-icon" @click="toggleMenu">
      <i :class="isOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </div>
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px 20px 0 0;
  padding: 10px 0;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1000;
}

.menu-icon {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  transition: all 0.3s ease;
}

.menu-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(-50%) scale(1.1);
}

.menu-icon i {
  font-size: 20px;
  color: #333;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 10px;
  min-width: 60px;
}

.nav-item:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.nav-item.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  transform: scale(1.05);
}

.nav-icon {
  font-size: 20px;
  margin-bottom: 2px;
}

.nav-title {
  font-size: 10px;
  font-weight: 500;
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
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);
  z-index: 1002;
  display: flex;
  flex-direction: column;
}

.submenu-item {
  display: flex;
  align-items: center;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;
}

.submenu-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.submenu-icon {
  margin-right: 10px;
  font-size: 16px;
}
</style>
