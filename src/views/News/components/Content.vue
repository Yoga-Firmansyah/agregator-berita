<script setup>
import { ref, computed, watch } from "vue";
import { useCnnStore } from "@/stores/cnn";
import { useCnbcStore } from "@/stores/cnbc";
import { useAntaraStore } from "@/stores/antara";
import { useSindonewsStore } from "@/stores/sindonews";
import { useRoute } from "vue-router";

const props = defineProps({
  type: String,
  source: String,
  title: String,
});

const route = useRoute();
// Store mapping
const storeMap = {
  cnn: useCnnStore(),
  cnbc: useCnbcStore(),
  antara: useAntaraStore(),
  sindonews: useSindonewsStore(),
};
const visibleRows = ref(2);
const feedsData = ref([]);

// Fetch data based on props
const fetchFilteredData = async () => {
  if (props.source && props.type) {
    const store = storeMap[props.source];
    if (store && typeof store.getSpecificFeed === "function") {
      await store.getSpecificFeed(props.type);
      const feedsByType = store[`${props.source}Feeds`]?.[props.type] || [];
      feedsData.value = feedsByType
        .slice()
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
    } else {
      feedsData.value = [];
    }
  } else if (props.source) {
    const store = storeMap[props.source];
    await store.getSpecificFeed("terbaru");
    const feeds = store[`${props.source}Feeds`]["terbaru"] || [];
    feedsData.value = feeds
      .slice()
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  } else {
    feedsData.value = [];
  }
};

// Watch for props changes and route changes
watch(
  [() => props.type, () => props.source, () => route.fullPath],
  fetchFilteredData,
  { immediate: true }
);
const featuredArticle = computed(() => feedsData.value[0]);
const sideArticles = computed(() => feedsData.value.slice(1, 5));
const remainingArticles = computed(() => feedsData.value.slice(5));

const showMore = () => {
  visibleRows.value += 2;
};
</script>

<template>
  <div class="container mx-auto px-4 py-2 md:py-4">
    <!-- Berita Terkini Header -->
    <div class="mb-8">
      <div class="flex items-center gap-4 mb-4">
        <div class="h-10 w-2 bg-orange-600 rounded-full"></div>
        <h2 class="text-2xl md:text-3xl font-bold text-gray-800">
          {{ props.title || "Berita Terkini" }}
        </h2>
      </div>
      <div class="border-b-2 border-orange-600 w-24"></div>
    </div>

    <!-- Featured and Side Articles -->
    <div class="flex flex-col md:flex-row gap-6 mb-8">
      <!-- Featured Article (50% width on desktop) -->
      <div class="w-full md:w-1/2">
        <!-- Featured Article Card -->
        <div
          v-if="featuredArticle"
          class="bg-white rounded-lg shadow-md overflow-hidden h-full group transition-all duration-300 hover:shadow-lg"
        >
          <a :href="featuredArticle.link" target="_blank" class="block h-full">
            <img
              :src="featuredArticle.thumbnail"
              :alt="featuredArticle.title"
              class="w-full h-52 md:h-86 object-fill transition-transform duration-300 group-hover:scale-105"
            />
            <div class="p-6">
              <!-- Featured Article Title -->
              <h2
                class="text-md md:text-2xl font-bold mb-3 transition-colors duration-300 group-hover:text-orange-600 text-justify"
              >
                {{ featuredArticle.title }}
              </h2>
              <p class="text-gray-600 mb-4 text-sm md:text-lg text-justify">
                {{ featuredArticle.description }}
              </p>
              <!-- Featured article -->
              <span class="text-xs text-gray-500">
                {{ formatArticleDate(featuredArticle.pubDate) }}
              </span>
            </div>
          </a>
        </div>
      </div>

      <!-- Side Articles Grid (50% width on desktop) -->
      <div class="w-full md:w-1/2 grid grid-cols-2 gap-4">
        <!-- Side Articles Cards -->
        <div
          v-for="(article, index) in sideArticles"
          :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg"
        >
          <a :href="article.link" target="_blank" class="block h-full">
            <img
              :src="article.thumbnail"
              :alt="article.title"
              class="w-full h-32 md:h-40 object-fill transition-transform duration-300 group-hover:scale-105"
            />
            <div class="p-4">
              <h3
                class="text-xs md:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-orange-600 text-justify"
              >
                {{ article.title }}
              </h3>
              <span class="text-xs text-gray-500">{{
                formatArticleDate(article.pubDate)
              }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <!-- Remaining Articles Grid -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
      <template v-for="(row, rowIndex) in visibleRows" :key="rowIndex">
        <!-- Remaining Articles Cards -->
        <div
          v-for="(article, colIndex) in remainingArticles.slice(
            rowIndex * 4,
            (rowIndex + 1) * 4
          )"
          :key="colIndex"
          class="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-lg"
        >
          <a :href="article.link" target="_blank" class="block h-full">
            <img
              :src="article.thumbnail"
              :alt="article.title"
              class="w-full h-32 md:h-40 object-fill transition-transform duration-300 group-hover:scale-105"
            />
            <div class="p-3">
              <h3
                class="text-xs md:text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-orange-600 text-justify"
              >
                {{ article.title }}
              </h3>
              <span class="text-xs text-gray-500">{{
                formatArticleDate(article.pubDate)
              }}</span>
            </div>
          </a>
        </div>
      </template>
    </div>

    <!-- Load More Button -->
    <div
      class="text-center mt-4 md:mt-6"
      v-if="remainingArticles.length > visibleRows * 4"
    >
      <button
        @click="showMore"
        class="bg-orange-600 text-white px-6 py-2 rounded-md hover:bg-orange-700 transition-colors"
      >
        Lihat Lainnya
      </button>
    </div>
  </div>
</template>
