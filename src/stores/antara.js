import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { antaraTypes } from '@/config/antaraTypes';

export const useAntaraStore = defineStore('antara', () => {
    const antaraFeeds = ref(Object.fromEntries(antaraTypes.map(type => [type, []])));
    const antaraLatestNews = ref([]); // New state for latest news

    async function getAntaraFeeds() {
        try {
            const promises = antaraTypes.map(type =>
                axios.get(`https://api-berita-indonesia.vercel.app/antara/${type}`)
            );

            const responses = await Promise.all(promises);

            responses.forEach((response, index) => {
                antaraFeeds.value[antaraTypes[index]] = response.data.data.posts || [];
            });
        } catch (err) {
            console.error('Error fetching all news:', err);
        }
    }

    async function getLatestNews() {
        try {
            const response = await axios.get('https://api-berita-indonesia.vercel.app/antara/terbaru');
            antaraLatestNews.value = response.data.data.posts || [];
        } catch (err) {
            console.error('Error fetching latest news:', err);
        }
    }

    async function getSpecificFeed(type) {
        try {
            const response = await axios.get(`https://api-berita-indonesia.vercel.app/antara/${type}`);
            antaraFeeds.value[type] = response.data.data.posts || [];
            return antaraFeeds.value[type];
        } catch (err) {
            console.error(`Error fetching ${type} news:`, err);
            return [];
        }
    }

    return {
        antaraFeeds,
        antaraLatestNews,
        getAntaraFeeds,
        getLatestNews,
        getSpecificFeed
    }
})