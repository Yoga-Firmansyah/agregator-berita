import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { sindonewsTypes } from '@/config/sindonewsTypes';

export const useSindonewsStore = defineStore('sindonews', () => {
    const sindonewsFeeds = ref(Object.fromEntries(sindonewsTypes.map(type => [type, []])));
    const sindonewsLatestNews = ref([]); // New state for latest news

    async function getSindonewsFeeds() {
        try {
            const promises = sindonewsTypes.map(type =>
                axios.get(`https://api-berita-indonesia.vercel.app/sindonews/${type}`)
            );

            const responses = await Promise.all(promises);

            responses.forEach((response, index) => {
                sindonewsFeeds.value[sindonewsTypes[index]] = response.data.data.posts || [];
            });
        } catch (err) {
            console.error('Error fetching all news:', err);
        }
    }

    async function getLatestNews() {
        try {
            const response = await axios.get('https://api-berita-indonesia.vercel.app/sindonews/terbaru');
            sindonewsLatestNews.value = response.data.data.posts || [];
        } catch (err) {
            console.error('Error fetching latest news:', err);
        }
    }

    async function getSpecificFeed(type) {
        try {
            const response = await axios.get(`https://api-berita-indonesia.vercel.app/sindonews/${type}`);
            sindonewsFeeds.value[type] = response.data.data.posts || [];
            return sindonewsFeeds.value[type];
        } catch (err) {
            console.error(`Error fetching ${type} news:`, err);
            return [];
        }
    }

    return {
        sindonewsFeeds,
        sindonewsLatestNews,
        getSindonewsFeeds,
        getLatestNews,
        getSpecificFeed
    }
})