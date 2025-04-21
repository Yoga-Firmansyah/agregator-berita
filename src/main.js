import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { formatTitleToSlug, formatSlugToDisplay } from '@/utils/stringFormatter';


import App from './App.vue'
import router from './router'

if (import.meta.env.PROD) {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
}

const app = createApp(App)

// Add global mixin for number formatting
app.mixin({
    methods: {
        formatPrice(price) {
            return new Intl.NumberFormat('id-ID').format(price)
        },
        formatArticleDate(dateString) {
            const articleDate = new Date(dateString)
            const now = new Date()
            const diffSeconds = Math.floor((now - articleDate) / 1000)

            if (diffSeconds < 60) {
                return `${diffSeconds} detik yang lalu`
            }

            const diffMinutes = Math.floor(diffSeconds / 60)
            if (diffMinutes < 60) {
                return `${diffMinutes} menit yang lalu`
            }

            const diffHours = Math.floor(diffMinutes / 60)
            if (diffHours < 24) {
                return `${diffHours} jam yang lalu`
            }

            const diffDays = Math.floor(diffHours / 24)
            if (diffDays <= 3) {
                return `${diffDays} hari yang lalu`
            }

            return articleDate.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })
        },
        processTitle(title) {
            const slug = formatTitleToSlug(title);
            return formatSlugToDisplay(slug);
        }
    }
})

app.use(createPinia())
app.use(router)
app.use(Toast)

app.mount('#app')
