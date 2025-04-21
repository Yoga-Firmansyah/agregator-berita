<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router"; // Add this import

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const menuItems = [
  { id: "#home", path: "/", name: "Home" },
  { id: "#cnn", path: "/berita/cnn", name: "CNN" },
  { id: "#cnbc", path: "/berita/cnbc", name: "CNBC" },
  { id: "#antara", path: "/berita/antara", name: "Antara" },
  { id: "#sindonews", path: "/berita/sindonews", name: "SindoNews" },
];

const route = useRoute(); // Add this line

const isOtherMenuActive = () =>
  menuItems
    .filter(i => i.path !== '/')
    .some(i => route.path.startsWith(i.path));

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <nav
    class="sticky top-0 w-full bg-white/90 backdrop-blur-sm z-50 transition-all duration-300 shadow-md"
    :class="{ 'shadow-md': isScrolled }"
  >
    <div
      class="container mx-auto px-10 transition-all duration-300"
      :class="{ 'py-3': isScrolled, 'py-5': !isScrolled }"
    >
      <div class="flex justify-between items-center">
        <router-link to="/">
          <div
            class="font-bold text-orange-600 transition-all duration-300"
            :class="{ 'text-2xl': isScrolled, 'text-3xl': !isScrolled }"
          >
            Agregator Berita
          </div>
        </router-link>

        <!-- Mobile menu button -->
        <button
          class="md:hidden text-gray-600 hover:text-orange-600 focus:outline-none"
          @click="toggleMobileMenu"
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              v-show="!isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-show="isMobileMenuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Desktop menu -->
        <div class="hidden md:flex space-x-8">
          <router-link :to="item.path" v-for="item in menuItems" :key="item.id">
            <p
              class="hover:text-orange-600 transition-colors font-semibold"
              :class="
                item.path === '/'
                  ? (!isOtherMenuActive() ? 'text-orange-600' : '')
                  : (route.path.startsWith(item.path) ? 'text-orange-600' : '')
              "
            >
              {{ item.name }}
            </p>
          </router-link>
        </div>
      </div>

      <!-- Mobile menu -->
      <div
        class="md:hidden transition-all duration-300 ease-in-out"
        :class="{ hidden: !isMobileMenuOpen }"
      >
        <div class="flex flex-col space-y-4 pt-4 pb-3">
          <router-link :to="item.path" v-for="item in menuItems" :key="item.id">
            <p
              class="hover:text-orange-600 transition-colors"
              :class="
                item.path === '/'
                  ? (!isOtherMenuActive() ? 'text-orange-600' : '')
                  : (route.path.startsWith(item.path) ? 'text-orange-600' : '')
              "
            >
              {{ item.name }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
