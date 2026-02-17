import 'server-only';

const dictionaries = {
    en: () => import('@/dictionaries/en.json').then((module) => module.default),
    tn: () => import('@/dictionaries/tn.json').then((module) => module.default),
};

export const getDictionary = async (locale: string) => {
    // Basic fallback to 'tn' if invalid locale
    if (!dictionaries[locale as keyof typeof dictionaries]) {
        return dictionaries.tn();
    }
    return dictionaries[locale as keyof typeof dictionaries]();
};
