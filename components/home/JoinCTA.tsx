import { ArrowRight } from "lucide-react";

export default function JoinCTA() {
    return (
        <section className="py-20 bg-dravida-red text-white text-center">
            <div className="container mx-auto px-4 md:px-6">
                <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6">சிந்திக்கத் தயாரா?</h2>
                <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
                    மாற்றத்தை உருவாக்க விரும்புகிறீர்களா? இன்றே திராவிட தலைமுறையில் இணைவோம்.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-4 bg-white text-dravida-red font-bold rounded-lg hover:bg-neutral-100 transition-colors text-lg">
                        இப்போதே இணையுங்கள்
                    </button>
                    <button className="px-8 py-4 bg-red-800 text-white font-bold rounded-lg hover:bg-red-900 transition-colors border border-red-700">
                        எங்கள் திட்டங்கள்
                    </button>
                </div>

                {/* Future Plans Teaser */}
                <div className="mt-16 flex flex-wrap justify-center gap-6 text-sm font-medium text-red-200 opacity-80">
                    <span className="flex items-center gap-2">✨ Podcast தொடக்கம்</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 hidden sm:block"></span>
                    <span className="flex items-center gap-2">📢 தமிழ் Blog Expansion</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 hidden sm:block"></span>
                    <span className="flex items-center gap-2">🎓 மாணவர்களுக்கான Workshops</span>
                </div>
            </div>
        </section>
    );
}

export function Disclaimer() {
    return (
        <section className="bg-neutral-900 py-6 border-t border-neutral-800">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="bg-neutral-800/50 rounded-lg p-4 inline-block mx-auto border border-neutral-700/50">
                    <p className="text-neutral-500 text-xs md:text-sm">
                        <span className="text-dravida-red font-bold uppercase mr-2">குறிப்பு:</span>
                        இந்த website கல்வி மற்றும் சமூக விழிப்புணர்வுக்காக மட்டும் உருவாக்கப்பட்டுள்ளது. எந்த அரசியல் கட்சியையும் பிரதிநிதித்துவப்படுத்தாது.
                    </p>
                </div>
            </div>
        </section>
    );
}
