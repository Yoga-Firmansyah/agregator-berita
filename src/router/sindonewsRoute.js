import News from '@/views/News/Index.vue'
import { sindonewsTypes } from '@/config/sindonewsTypes';
import { formatTitleToSlug, formatSlugToDisplay } from '@/utils/stringFormatter';

const getRouteConfig = (type = null) => {
    const isTypeRoute = Boolean(type);
    const formattedSlug = isTypeRoute ? formatTitleToSlug(type) : null;
    const formattedType = isTypeRoute
        ? formatSlugToDisplay(formattedSlug)
        : null;

    return {
        path: isTypeRoute ? `/berita/sindonews/${formattedSlug}` : '/berita/sindonews',
        name: isTypeRoute ? `sindonews-${type}` : 'sindonews',
        component: News,
        props: {
            source: 'sindonews',
            ...(isTypeRoute && {
                type: type,  // Pass original unformatted type
            }),
            title: isTypeRoute
                ? `Sindonews - Berita ${formattedType}`
                : 'Sindonews - Berita Terkini'
        },
        meta: {
            category: 'berita',
            breadcrumb: isTypeRoute ? `Sindonews - Berita ${formattedType}` : 'Sindonews - Berita Terkini',
            seo: {
                title: isTypeRoute
                    ? `Sindonews ${formattedType} - Berita Terkini`
                    : 'Sindonews Berita Terkini Hari Ini',
                description: isTypeRoute
                    ? `Dapatkan berita ${formattedType.toLowerCase()} terbaru dari Sindonews`
                    : 'Berita terkini dan terupdate dari Sindonews',
                keywords: isTypeRoute
                    ? [`sindonews ${formattedType.toLowerCase()}`, `berita ${formattedType.toLowerCase()}`, `update ${formattedType.toLowerCase()}`]
                    : ['sindonews', 'berita terkini', 'berita hari ini']
            }
        }
    };
};

const sindonewsRoutes = [
    getRouteConfig(), // Latest news
    ...sindonewsTypes.map(type => getRouteConfig(type))
];

export default sindonewsRoutes;
