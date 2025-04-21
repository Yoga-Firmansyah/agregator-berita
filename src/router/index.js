import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/layouts/MainLayout.vue'
import Home from '@/views/Home/Index.vue'
import NotFound from '@/components/404.vue'
import cnnRoutes from './cnnRoute'
import cnbcRoutes from './cnbcRoute'
import antaraRoutes from './antaraRoute'
import sindonewsRoutes from './sindonewsRoute'
import categoryRoutes from './categoryRoute'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            title: 'Beranda',
            seo: {
              title: 'Berita Terkini',
              description: 'Dapatkan berita terkini dari berbagai sumber dalam satu tempat.',
              keywords: ['berita', 'berita terkini', 'berita utama', 'aggregator', 'kumpulan berita']
            }
          }
        },
        ...cnnRoutes,
        ...cnbcRoutes,
        ...antaraRoutes,
        ...sindonewsRoutes,
        ...categoryRoutes,
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: NotFound,
          meta: {
            title: 'Page Not Found'
          }
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

const updateMetaTags = (to) => {
  try {
    const title = to.meta.seo?.title || to.meta.title
    document.title = `${title} - Agregator Berita`

    const tags = {
      'description': to.meta.seo?.description,
      'keywords': to.meta.seo?.keywords?.join(', ')
      // Removed robots from here
    }

    Object.entries(tags).forEach(([name, content]) => {
      if (!content) return
      
      let tag = document.querySelector(`meta[name="${name}"]`) || 
                document.createElement('meta')
      tag.name = name
      tag.content = content
      document.head.appendChild(tag)
    })

  } catch (error) {
    console.error('Error updating meta tags:', error)
  }
}

router.beforeEach((to, from, next) => {
  updateMetaTags(to)
  next()
})

export default router
