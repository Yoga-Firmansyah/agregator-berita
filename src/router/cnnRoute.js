import News from '@/views/News/Index.vue'
import { cnnTypes } from '@/config/cnnTypes';
import { formatTitleToSlug, formatSlugToDisplay } from '@/utils/stringFormatter';

const getRouteConfig = (type = null) => {
    const isTypeRoute = Boolean(type);
    const formattedSlug = isTypeRoute ? formatTitleToSlug(type) : null;
    const formattedType = isTypeRoute 
        ? formatSlugToDisplay(formattedSlug) 
        : null;

    return {
        path: isTypeRoute ? `/berita/cnn/${formattedSlug}` : '/berita/cnn',
        name: isTypeRoute ? `cnn-${type}` : 'cnn',
        component: News,
        props: {
            source: 'cnn',
            ...(isTypeRoute && {
                type: type,  // Pass original unformatted type
            }),
            title: isTypeRoute 
                ? `CNN - Berita ${formattedType}`
                : 'CNN - Berita Terkini'
        },
        meta: {
            category: 'berita',
            breadcrumb: isTypeRoute ? `CNN - Berita ${formattedType}` : 'CNN - Berita Terkini',
            seo: {
                title: isTypeRoute 
                    ? `CNN ${formattedType} - Berita Terkini` 
                    : 'CNN Berita Terkini Hari Ini',
                description: isTypeRoute
                    ? `Dapatkan berita ${formattedType.toLowerCase()} terbaru dari CNN Indonesia`
                    : 'Berita terkini dan terupdate dari CNN Indonesia',
                keywords: isTypeRoute
                    ? [`cnn ${formattedType.toLowerCase()}`, `berita ${formattedType.toLowerCase()}`, `update ${formattedType.toLowerCase()}`]
                    : ['cnn indonesia', 'berita terkini', 'berita hari ini']
            }
        }
    };
};

const cnnRoutes = [
    getRouteConfig(), // Latest news
    ...cnnTypes.map(type => getRouteConfig(type))
];

export default cnnRoutes;
