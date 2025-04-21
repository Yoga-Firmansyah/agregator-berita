import News from '@/views/News/Index.vue'
import { antaraTypes } from '@/config/antaraTypes';
import { formatTitleToSlug, formatSlugToDisplay } from '@/utils/stringFormatter';

const getRouteConfig = (type = null) => {
    const isTypeRoute = Boolean(type);
    const formattedSlug = isTypeRoute ? formatTitleToSlug(type) : null;
    const formattedType = isTypeRoute
        ? formatSlugToDisplay(formattedSlug)
        : null;

    return {
        path: isTypeRoute ? `/berita/antara/${formattedSlug}` : '/berita/antara',
        name: isTypeRoute ? `antara-${type}` : 'antara',
        component: News,
        props: {
            source: 'antara',
            ...(isTypeRoute && {
                type: type,  // Pass original unformatted type
            }),
            title: isTypeRoute
                ? `Antara - Berita ${formattedType}`
                : 'Antara - Berita Terkini'
        },
        meta: {
            category: 'berita',
            breadcrumb: isTypeRoute ? `Antara - Berita ${formattedType}` : 'Antara - Berita Terkini',
            seo: {
                title: isTypeRoute
                    ? `Antara ${formattedType} News - Terkini`
                    : 'Antara Berita Terkini',
                description: isTypeRoute
                    ? `Dapatkan berita ${formattedType.toLowerCase()} terkini dari Antara`
                    : 'Berita terkini dan terupdate dari Antara',
                keywords: isTypeRoute
                    ? [`antara ${formattedType.toLowerCase()}`, `berita ${formattedType.toLowerCase()}`, `update ${formattedType.toLowerCase()}`]
                    : ['anatar berita', 'berita terkini', 'berita hari ini']
            }
        }
    };
};

const antaraRoutes = [
    getRouteConfig(), // Latest news
    ...antaraTypes.map(type => getRouteConfig(type))
];

export default antaraRoutes;
