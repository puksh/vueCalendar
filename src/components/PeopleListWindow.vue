<template>
  <section class="people-list">
    <!-- People List Section -->
    <h3 style="font-weight: bold">Zespół</h3>
    <div>
      <!-- Ratownik List -->
      <h4>Ratowniczki/cy</h4>
      <div class="person-lists">
        <div
          v-for="person in people.filter((p) => p.ratownik)"
          :key="person.id"
          class="person-item ratownik"
          :class="{ draggable: isEditingMode }"
          :draggable="isEditingMode"
          @dragstart="isEditingMode ? startDrag(person) : null"
          @dragend="handleDragEnd"
          @touchstart="isEditingMode ? startTouchDrag(person, $event) : null"
          @touchend="handleTouchEnd"
        >
          {{ person.name }}
        </div>
      </div>

      <!-- Non-Ratownik List -->
      <h4>Pielęgniarki/rze</h4>
      <div class="person-lists">
        <div
          v-for="person in people.filter((p) => !p.ratownik)"
          :key="person.id"
          class="person-item pielegniarka"
          :class="{ draggable: isEditingMode }"
          :draggable="isEditingMode"
          @dragstart="isEditingMode ? startDrag(person) : null"
          @dragend="handleDragEnd"
          @touchstart="isEditingMode ? startTouchDrag(person, $event) : null"
          @touchend="handleTouchEnd"
        >
          {{ person.name }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PeopleListWindow",
  props: {
    people: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isEditingMode: JSON.parse(localStorage.getItem("isEditingMode")) || false,
      draggedPerson: null,
    };
  },
  methods: {
    startDrag(person) {
      localStorage.setItem("draggedPerson", JSON.stringify(person));
    },
    startTouchDrag(person, event) {
      this.draggedPerson = person;
      localStorage.setItem("draggedPerson", JSON.stringify(person));
      event.target.classList.add("dragging");
      document.body.style.overflow = "hidden"; // Disable scrolling
    },
    handleTouchEnd(event) {
      event.target.classList.remove("dragging");
      document.body.style.overflow = ""; // Re-enable scrolling
    },
  },
};
</script>

<style scoped>
.people-list {
  width: max(33%, 651px);
  background: var(--glass-bg-color);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-color);
  box-shadow: var(--glass-box-shadow);
  border-radius: 8px;
  align-self: center;
  margin: 10px 0;
  line-height: 1ch;
}

.person-lists {
  gap: var(--spacing-small);
  display: inline-flex;
  flex-wrap: wrap;
  justify-content: center;
  text-wrap: wrap;
  margin: var(--spacing-small) auto;
}
@media (max-width: 768px) {
  .people-list {
    width: 90%;
  }
}
/* Individual draggable people items */
.person-item {
  padding: 1ch;
  width: auto 30%;
  color: var(--color-text-dark);
  background: var(--glass-bg-color);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border-color);
  border-radius: var(--border-radius);
  font-weight: bold;
  transition: transform 0.2s ease;
  user-select: none;
  line-height: 2ch;
}
.person-item:draggable {
  cursor: grab;
}
.person-item.draggable:hover {
  cursor: grabbing;
  transform: scale(1.1);
  transition: transform 0.2s ease; /* Smooth transition */
}
</style>
