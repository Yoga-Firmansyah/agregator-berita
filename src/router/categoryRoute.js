import Home from '@/views/Home/Index.vue'
import { categorySource } from '@/config/categorySource';
import { formatTitleToSlug, formatSlugToDisplay } from '@/utils/stringFormatter';

const getRouteConfig = (item = null) => {
    const isValidRoute = item && item.type && item.source;
    const formattedSlug = formatTitleToSlug(item.type) || null;
    const formattedType = formatSlugToDisplay(formattedSlug) || null;
    
    if (!isValidRoute) return null;

    return {
        path: `/category/${item.type}`,
        name: `category-${item.type}`,
        component: Home,
        props: {
            type: item.type,
            source: item.source,
            title: `Berita ${formattedType}`
        },
        meta: {
            breadcrumb: `Kategori ${formattedType}`,
            seo: {
                title: `Berita ${formattedType} Terkini`,
                description: `Kumpulan berita ${formattedType.toLowerCase()} terbaru dari berbagai sumber`,
                keywords: [
                    `berita ${formattedType.toLowerCase()}`,
                    `update ${formattedType.toLowerCase()}`,
                    `informasi ${formattedType.toLowerCase()}`
                ]
            }
        }
    };
};

const categoryRoutes = [
    ...(categorySource || []) // Fallback to empty array if null
        .map(item => getRouteConfig(item))
        .filter(route => route !== null)
];

export default categoryRoutes;
