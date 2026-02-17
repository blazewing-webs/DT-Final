import HeritageHero from "@/components/home/HeritageHero";
import { getDictionary } from "@/lib/dictionary";

// This function is required for static export if you use it, 
// for dynamic server rendering it's not strictly generic but good practice.
export async function generateStaticParams() {
    return [{ lang: "en" }, { lang: "tn" }];
}

export default async function Page({ params: { lang } }: { params: { lang: string } }) {
    const dictionary = await getDictionary(lang);

    return (
        <main className="min-h-screen bg-white">
            {/* Language Switcher Demo */}
            <div className="absolute top-4 right-4 z-50 flex gap-4 bg-white/80 backdrop-blur px-4 py-2 rounded-full border border-neutral-200">
                <a href="/demo/en" className={`text-sm font-bold ${lang === 'en' ? 'text-amber-700' : 'text-neutral-500'}`}>English</a>
                <span className="text-neutral-300">|</span>
                <a href="/demo/tn" className={`text-sm font-bold ${lang === 'tn' ? 'text-amber-700' : 'text-neutral-500'}`}>தமிழ்</a>
            </div>

            <HeritageHero dictionary={dictionary} />

            <div className="container mx-auto px-4 py-12 text-center text-neutral-500">
                <p>This is a demo of the URL-based language switching.</p>
                <p>Current Language: <span className="font-bold text-neutral-900 uppercase">{lang}</span></p>
            </div>
        </main>
    );
}
