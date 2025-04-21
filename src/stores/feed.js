import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCnnStore } from './cnn'
import { useCnbcStore } from './cnbc'
import { useAntaraStore } from './antara'
import { useSindonewsStore } from './sindonews'

export const useFeedStore = defineStore('feed', () => {
    const feeds = ref([])

    // Get news from all sources
    const cnnStore = useCnnStore()
    const cnbcStore = useCnbcStore()
    const antaraStore = useAntaraStore()
    const sindonewsStore = useSindonewsStore()

    async function getLatestNews() {
        try {
            // Wait for all news to load first
            const results = await Promise.all([
                cnnStore.getLatestNews(),
                cnbcStore.getLatestNews(), 
                antaraStore.getLatestNews(),
                sindonewsStore.getLatestNews()
            ])

            // Combine all news items after all promises resolve
            const allNews = [
                ...cnnStore.cnnLatestNews,
                ...cnbcStore.cnbcLatestNews,
                ...antaraStore.antaraLatestNews,
               ...sindonewsStore.sindonewsLatestNews
            ]

            // Now sort the fully loaded data
            if (allNews.length > 0) {
                feeds.value = allNews.sort((a, b) => {
                    const dateA = new Date(a.pubDate).getTime()
                    const dateB = new Date(b.pubDate).getTime()
                    return dateB - dateA
                })
            }
            console.log('Latest News:', feeds.value)
        } catch (error) {
            console.error('Error fetching latest news:', error)
        }
    }

    async function getAllFeeds() {
        try {
            // Get all news from each source
            await Promise.all([
                cnnStore.getCnnFeeds(),
                cnbcStore.getCnbcFeeds(),
                antaraStore.getAntaraFeeds(),
                sindonewsStore.getSindonewsFeeds()
            ])
        } catch (error) {
            console.error('Error fetching all news:', error)
            throw error
        }
    }

    return { feeds, getLatestNews, getAllFeeds }
})