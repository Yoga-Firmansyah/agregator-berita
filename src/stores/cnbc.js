import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { cnbcTypes } from '@/config/cnbcTypes'

export const useCnbcStore = defineStore('cnbc', () => {
    const cnbcFeeds = ref(Object.fromEntries(cnbcTypes.map(type => [type, []])));
    const cnbcLatestNews = ref([]); // New state for latest news

    async function getCnbcFeeds() {
        try {
            const promises = cnbcTypes.map(type =>
                axios.get(`https://api-berita-indonesia.vercel.app/cnbc/${type}`)
            );

            const responses = await Promise.all(promises);

            responses.forEach((response, index) => {
                cnbcFeeds.value[cnbcTypes[index]] = response.data.data.posts || [];
            });

        } catch (err) {
            console.error('Error fetching all news:', err);
        }
    }

    async function getLatestNews() {
        try {
            const response = await axios.get('https://api-berita-indonesia.vercel.app/cnbc/terbaru');
            cnbcLatestNews.value = response.data.data.posts || [];
        } catch (err) {
            console.error('Error fetching latest news:', err);
        }
    }

    async function getSpecificFeed(type) {
        try {
            const response = await axios.get(`https://api-berita-indonesia.vercel.app/cnbc/${type}`);
            cnbcFeeds.value[type] = response.data.data.posts || [];
            return cnbcFeeds.value[type];
        } catch (err) {
            console.error(`Error fetching ${type} news:`, err);
            return [];
        }
    }

    return {
        cnbcFeeds,
        cnbcLatestNews,
        getCnbcFeeds,
        getLatestNews,
        getSpecificFeed
    }
})