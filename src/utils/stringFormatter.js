export const formatTitleToSlug = (title) => {
    return title.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};

export const formatSlugToDisplay = (slug) => {
    return slug.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};