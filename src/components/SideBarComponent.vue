<template>
  <aside class="sidebar">
    <!--<button
      @click="$emit('navigate', 'AboutComponent')"
      class="sidebar-button"
    >
      Info</button
    >-->
    <button @click="navigateToCalendar" class="sidebar-button">
      Harmonogram
    </button>
    <button
      @click="$emit('navigate', 'SettingsComponent')"
      class="sidebar-button"
    >
      Ustawienia
    </button>
  </aside>
</template>

<script>
export default {
  name: "SideBarComponent",
  data() {
    return {
      isEditingMode: JSON.parse(localStorage.getItem("isEditingMode")) || false, // Load initial value from localStorage
    };
  },
  methods: {
    navigateToCalendar() {
      this.isEditingMode = JSON.parse(localStorage.getItem("isEditingMode"));
      const target = this.isEditingMode
        ? "CalendarComponent"
        : "CalendarStaticComponent";
      this.$emit("navigate", target);
    },
  },
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px;
  background: var(--glass-bg-color);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-color);
  box-shadow: var(--glass-box-shadow);
  border-radius: 4px;
  z-index: 10;
}

/* Sidebar buttons with glass effects */
.sidebar-button {
  background: var(--glass-bg-color);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-color);
  color: var(--color-text-dark);
  width: 49%;
  height: 32px;
  border-radius: 8px;
  font-size: 14px;
  padding: 0;
  margin: 0 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.sidebar-button:hover {
  background-color: rgba(155, 126, 189, 0.6);
  color: var(--color-text-dark);
  border-color: rgba(155, 126, 189, 0.6);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transform: scale(1.01);
}

.sidebar-button:active {
  background-color: rgba(86, 43, 122, 0.7);
  color: #111;
  border-color: rgba(86, 43, 122, 0.7);
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.3);
  transform: scale(0.95);
}
</style>
