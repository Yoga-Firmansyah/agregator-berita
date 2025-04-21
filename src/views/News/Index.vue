<script setup>
import Content from "./components/Content.vue";
import Category from "./components/Category.vue";
import { useScrollReveal } from "@/composables/useScrollReveal";
import { useFeedStore } from "@/stores/feed";
import { onMounted, ref } from "vue";

// Ambil props yang dikirim dari route
const props = defineProps({
  type: String,
  source: [String, Array],
  title: String
});

const feedStore = useFeedStore();
const isLoading = ref(true);

useScrollReveal();

onMounted(async () => {
  try {
    await feedStore.getLatestNews();
  } catch (error) {
    console.error('Failed to load news:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Category
  v-if="!isLoading"
  :source="props.source"
  />
  <Content 
    v-if="!isLoading" 
    :type="props.type" 
    :source="props.source"
    :title="props.title"
  />
  <div v-else class="flex justify-center items-center h-screen">
    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
  </div>
</template>
