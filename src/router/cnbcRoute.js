import News from '@/views/News/Index.vue'
import { cnbcTypes } from '@/config/cnbcTypes';
import { formatTitleToSlug, formatSlugToDisplay } from '@/utils/stringFormatter';

const getRouteConfig = (type = null) => {
    const isTypeRoute = Boolean(type);
    const formattedSlug = isTypeRoute ? formatTitleToSlug(type) : null;
    const formattedType = isTypeRoute
        ? formatSlugToDisplay(formattedSlug)
        : null;

    return {
        path: isTypeRoute ? `/berita/cnbc/${formattedSlug}` : '/berita/cnbc',
        name: isTypeRoute ? `cnbc-${type}` : 'cnbc',
        component: News,
        props: {
            source: 'cnbc',
            ...(isTypeRoute && { 
                type: type,  // Pass original unformatted type
            }),
            title: isTypeRoute
                ? `CNBC - Berita ${formattedType}`
                : 'CNBC - Berita Terkini'
        },
        meta: {
            category: 'bisnis',
            breadcrumb: isTypeRoute ? `CNBC - Berita ${formattedType}` : 'CNBC - Berita Terkini',
            seo: {
                title: isTypeRoute
                    ? `CNBC ${formattedType} - Update Pasar Terkini`
                    : 'CNBC Berita Bisnis Terkini',
                description: isTypeRoute
                    ? `Dapatkan berita ${formattedType.toLowerCase()} terbaru dari CNBC Indonesia`
                    : 'Berita bisnis dan update pasar terkini dari CNBC Indonesia',
                keywords: isTypeRoute
                    ? [`cnbc ${formattedType.toLowerCase()}`, `berita ${formattedType.toLowerCase()}`, `update pasar ${formattedType.toLowerCase()}`]
                    : ['cnbc indonesia', 'berita bisnis', 'berita pasar']
            }
        }
    };
};

const cnbcRoutes = [
    getRouteConfig(), // Latest news
    ...cnbcTypes.map(type => getRouteConfig(type))
];

export default cnbcRoutes;
