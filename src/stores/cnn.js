import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { cnnTypes } from '@/config/cnnTypes';

export const useCnnStore = defineStore('cnn', () => {
    const cnnFeeds = ref(Object.fromEntries(cnnTypes.map(type => [type, []])));
    const cnnLatestNews = ref([]); // New state for latest news
    async function getCnnFeeds() {
        try {
            const promises = cnnTypes.map(type =>
                axios.get(`https://api-berita-indonesia.vercel.app/cnn/${type}`)
            );

            const responses = await Promise.all(promises);

            responses.forEach((response, index) => {
                cnnFeeds.value[cnnTypes[index]] = response.data.data.posts || [];
            });            
        } catch (err) {
            console.error('Error fetching all news:', err);
        }
    }

    async function getLatestNews() {
        try {
            const response = await axios.get('https://api-berita-indonesia.vercel.app/cnn/terbaru');
            cnnLatestNews.value = response.data.data.posts || [];
        } catch (err) {
            console.error('Error fetching latest news:', err);
        }
    }

    async function getSpecificFeed(type) {
        try {
            const response = await axios.get(`https://api-berita-indonesia.vercel.app/cnn/${type}`);
            cnnFeeds.value[type] = response.data.data.posts || [];
            return cnnFeeds.value[type];
        } catch (err) {
            console.error(`Error fetching ${type} news:`, err);
            return [];
        }
    }

    return { 
        cnnFeeds, 
        cnnLatestNews, 
        getCnnFeeds, 
        getLatestNews,
        getSpecificFeed
    }
})