<script setup>
import { categorySource } from '@/config/categorySource';
import { ref, onMounted, onBeforeUnmount, watch, capitalize } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const showMenu = ref(false);
const isScrolled = ref(false);

// Watch for menu state changes
// Modified watcher
watch(showMenu, (newVal) => {
  if (newVal) {
    document.body.classList.add('pointer-events-none');
    document.querySelector('.floating-menu').classList.add('pointer-events-auto');
  } else {
    document.body.classList.remove('pointer-events-none');
  }
});

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100;
  if (showMenu.value) {
    closeMenu();
  }
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const closeMenu = () => {
  showMenu.value = false;
};

const handleClickOutside = (event) => {
  const menuButton = document.querySelector('.floating-menu button');
  const menuContent = document.querySelector('.floating-menu .absolute');
  
  // Fix: Check for null before calling .contains
  if (
    (!menuButton || !menuButton.contains(event.target)) &&
    (!menuContent || !menuContent.contains(event.target))
  ) {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('click', handleClickOutside);
  document.body.classList.remove('pointer-events-none');
});
</script>

<template>
  <div class="container mx-auto px-4 py-2 md:py-4">
    <div class="flex justify-center">
      <div class="inline-flex overflow-x-auto scrollbar-hide space-x-4 px-4">
        <router-link 
          v-for="category in categorySource" 
          :key="category.type"
          :to="`/category/${category.type}`"
          :class="[
            'flex-shrink-0 px-4 py-2 bg-gray-100 hover:bg-orange-100 rounded-full text-sm font-medium transition-colors',
            route.path === `/category/${category.type}` ? 'bg-orange-600 text-white' : ''
          ]"
        >
          {{ processTitle(category.type) }}
        </router-link>
      </div>
    </div>
    <!-- Gradient fade effect removed -->
  </div>

  <!-- Floating Menu -->
  <Transition name="fade">
    <div 
      v-if="isScrolled"
      class="floating-menu fixed bottom-6 right-6 z-50"
    >
      <button 
        @click="toggleMenu"
        class="p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <Transition name="fade">
        <div 
          v-if="showMenu"
          class="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-lg py-2"
          style="max-height: 300px; overflow-y: auto;"
        >
          <router-link
            v-for="category in categorySource"
            :key="category.type"
            :to="`/category/${category.type}`"
            @click="closeMenu"
            :class="[
              'block px-4 py-2 text-sm hover:bg-gray-100',
              route.path === `/category/${category.type}` ? 'bg-orange-600 text-white' : ''
            ]"
          >
            {{ category.type }}
          </router-link>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Add these new styles */
.overflow-hidden {
  overflow: hidden;
}

/* Remove overflow-hidden */
.pointer-events-none {
  pointer-events: none;
}

.pointer-events-auto {
  pointer-events: auto;
}
</style>