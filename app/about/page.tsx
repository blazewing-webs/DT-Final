"use client";

import { motion } from "framer-motion";
import { BookOpen, Globe, Lightbulb, Mic, Shield, Users, ArrowRight, Target, Flag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import JoinCTA from "@/components/home/JoinCTA";

// SECTION 1: ABOUT US (எங்களை பற்றி)
const AboutSection = () => (
    <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-neutral-50 -skew-x-12 translate-x-32 z-0" />
        <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-dravida-red font-bold text-sm uppercase tracking-wider">
                        <span className="w-2 h-2 rounded-full bg-dravida-red animate-pulse" />
                        எங்களை பற்றி (About Us)
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
                        திராவிடத் <span className="text-dravida-red">தலைமுறை</span>
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                        திராவிடத் தலைமுறை என்பது சமூக நீதி, சமத்துவம், மற்றும் பகுத்தறிவு சிந்தனைகளை முன்னெடுக்கும் ஓர் இளைஞர் இயக்கம்.
                        எங்கள் நோக்கம், தந்தை பெரியார், பேரறிஞர் அண்ணா, முத்தமிழறிஞர் கலைஞர் ஆகியோரின் கொள்கைகளை இன்றைய நவீன உலகிற்கு ஏற்ப கொண்டு செல்வதே ஆகும்.
                    </p>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        சாதி, மத, பாலின வேறுபாடுகளற்ற ஒரு சமத்துவ சமுதாயத்தை உருவாக்குவதே எங்கள் இலக்கு.
                        அறிவியல் பார்வையும், மனிதநேயமும் கொண்ட புதிய தலைமுறையை வார்ப்பதே எங்கள் கனவு.
                    </p>
                </div>
                <div className="flex-1 relative">
                    <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                        {/* Placeholder for About Image */}
                        <div className="absolute inset-0 bg-neutral-900 flex items-center justify-center text-neutral-500">
                            <img
                                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&q=80&w=1000"
                                alt="Community"
                                className="w-full h-full object-cover opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <div className="absolute bottom-8 left-8 text-white">
                                <p className="font-bold text-xl">சமூக நீதி காவலர்கள்</p>
                                <p className="text-sm opacity-80">Social Justice Warriors</p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Element */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-dravida-red/10 rounded-full blur-3xl" />
                </div>
            </div>
        </div>
    </section>
);

// SECTION 2: OUR DREAM (எங்கள் கனவு)
const DreamSection = () => {
    const dreams = [
        { icon: <Target className="w-8 h-8" />, title: "சமத்துவ சமுதாயம்", desc: "சாதி, மத பேதமற்ற சம உரிமை கொண்ட சமூகம்." },
        { icon: <Shield className="w-8 h-8" />, title: "பெண் விடுதலை", desc: "பெண்களுக்கு சம உரிமை, கல்வி மற்றும் பாதுகாப்பு." },
        { icon: <Globe className="w-8 h-8" />, title: "மாநில சுயாட்சி", desc: "மாநில உரிமைகள் மற்றும் அதிகார பரவல்." },
        { icon: <BookOpen className="w-8 h-8" />, title: "அனைவருக்கும் கல்வி", desc: "தரமான, இலவச மற்றும் அறிவியல் பூர்வமான கல்வி." },
    ];

    return (
        <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#e11d48 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-6">எங்கள் <span className="text-dravida-red">கனவு</span></h2>
                    <p className="text-neutral-400 text-lg">
                        எதிர்காலத் தமிழகம் எப்படி இருக்க வேண்டும் என்ற எங்கள் தொலைநோக்கு பார்வை.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {dreams.map((item, index) => (
                        <div key={index} className="group p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-dravida-red hover:border-dravida-red transition-all duration-300 transform hover:-translate-y-2">
                            <div className="w-16 h-16 rounded-xl bg-neutral-700/50 flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors text-white">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-neutral-400 group-hover:text-white/90 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// SECTION 3: OUR MISSION (எங்கள் பணி)
const MissionSection = () => (
    <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
                <div className="flex-1 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                    {/* Mission Cards */}
                    {[
                        { title: "மூடநம்பிக்கை ஒழிப்பு", desc: "மக்களிடம் அறிவியல் மனப்பான்மையை வளர்த்தல்." },
                        { title: "இளைஞர் விழிப்புணர்வு", desc: "அரசியல் மற்றும் சமூக தெளிவு ஏற்படுத்துதல்." },
                        { title: "சமூக அநீதி எதிர்ப்பு", desc: "எங்கு அநீதி நடந்தாலும் தட்டித் கேட்டல்." },
                        { title: "ஜனநாயக பாதுகாப்பு", desc: "ஜனநாயக மாண்புகளை காத்தல் மற்றும் போற்றுதல்." }
                    ].map((mission, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-200 hover:shadow-lg transition-shadow">
                            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-dravida-red font-bold mb-4">
                                {idx + 1}
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-neutral-900">{mission.title}</h3>
                            <p className="text-sm text-neutral-600">{mission.desc}</p>
                        </div>
                    ))}
                </div>
                <div className="flex-1 order-1 lg:order-2 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black text-neutral-900">
                        எங்கள் <span className="text-dravida-red">பணி</span>
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        நாங்கள் வெறும் பார்வையாளர்கள் அல்ல, களப்பணியாளர்கள்.
                        சமூகத்தில் மாற்றத்தை விதைக்க, ஒவ்வொரு நாளும் நாங்கள் உழைக்கிறோம்.
                    </p>
                    <ul className="space-y-4">
                        {["கருத்தரங்குகள் நடத்துதல்", "சமூக வலைதள விழிப்புணர்வு", "பள்ளி, கல்லூரி மாணவர்களுடன் கலந்துரையாடல்"].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-neutral-700 font-medium">
                                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </section>
);

// SECTION 4: HISTORY TIMELINE (திராவிட வரலாறு)
const HistoryTimeline = () => {
    const events = [
        {
            year: "1925",
            leader: "தந்தை பெரியார்",
            title: "சுயமரியாதை இயக்கம்",
            desc: "குடியரசு இதழ் மற்றும் சுயமரியாதை இயக்கத்தின் தோற்றம். சாதி ஒழிப்பு மற்றும் பெண் விடுதலைக்கான போர் முரசு.",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Periyar_E._V._Ramasamy.jpg"
        },
        {
            year: "1949",
            leader: "பேரறிஞர் அண்ணா",
            title: "திராவிட முன்னேற்றக் கழகம்",
            desc: "சமூக நீதிக்கான அரசியல் இயக்கம் உதயம். 'கடமை, கண்ணியம், கட்டுப்பாடு' எனும் தாரக மந்திரம்.",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/43/C.N.Annadurai.jpg"
        },
        {
            year: "1967",
            leader: "திராவிடர் ஆட்சி",
            title: "முதல் வெற்றி",
            desc: "பேரறிஞர் அண்ணா தலைமையில் திமுக ஆட்சியமைத்தது. மதராஸ் மாநிலம் 'தமிழ்நாடு' என பெயர் சூட்டப்பட்டது.",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/C_N_Annadurai_stamp.jpg"
        },
        {
            year: "1969-2018",
            leader: "கலைஞர் கருணாநிதி",
            title: "நவீன தமிழ்நாடு",
            desc: "சம சமூக நீதி, இட ஒதுக்கீடு, தகவல் தொழில்நுட்ப புரட்சி, மற்றும் உள்கட்டமைப்பு மேம்பாடு.",
            image: "https://upload.wikimedia.org/wikipedia/commons/9/91/M._Karunanidhi.jpg"
        },
        {
            year: "2021-Present",
            leader: "மு.க. ஸ்டாலின்",
            title: "திராவிட மாடல்",
            desc: "அனைவருக்குமான வளர்ச்சி. 'எல்லோருக்கும் எல்லாம்' என்ற தத்துவத்தின் அடிப்படையில் நல்லாட்சி.",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/M._K._Stalin.jpg/800px-M._K._Stalin.jpg"
        }
    ];

    return (
        <section className="py-24 bg-neutral-900 text-white relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-dravida-red font-bold uppercase tracking-widest text-sm mb-2 block">Our Legacy</span>
                    <h2 className="text-4xl md:text-5xl font-black">திராவிட <span className="text-white">வரலாறு</span></h2>
                </div>

                <div className="relative max-w-6xl mx-auto">
                    {/* Center Line (Hidden on Mobile) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-dravida-red via-red-900 to-neutral-800 -translate-x-1/2 hidden md:block" />

                    {events.map((event, index) => (
                        <div key={index} className={`relative mb-24 flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Timeline Dot (Center) */}
                            <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dravida-red border-4 border-neutral-900 z-10 shadow-[0_0_20px_rgba(225,29,72,0.6)] hidden md:block" />

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
                                <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                    <span className="text-6xl font-black text-white/5 top-0 absolute -z-10">{event.year}</span>
                                    <span className="text-dravida-red font-bold text-xl mb-2">{event.year}</span>
                                    <h3 className="text-3xl font-bold mb-3">{event.title}</h3>
                                    <p className="text-neutral-400 leading-relaxed max-w-md">{event.desc}</p>
                                </div>
                            </div>

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 px-4 md:px-12">
                                <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-neutral-800 shadow-2xl group hover:border-dravida-red/50 transition-all duration-500 mx-auto max-w-md`}>
                                    <img
                                        src={event.image}
                                        alt={event.leader}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-dravida-red font-bold text-sm uppercase tracking-wider mb-1">Leader</p>
                                            <p className="text-white font-bold text-xl">{event.leader}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// SECTION 5: PRINCIPLES (கொள்கைகள்)
const PrinciplesSection = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
                எங்கள் <span className="text-dravida-red">கொள்கைகள்</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                    { title: "சுயமரியாதை", en: "Self-Respect", color: "bg-red-50 text-red-600 border-red-100" },
                    { title: "பகுத்தறிவு", en: "Rationalism", color: "bg-blue-50 text-blue-600 border-blue-100" },
                    { title: "சமூக நீதி", en: "Social Justice", color: "bg-green-50 text-green-600 border-green-100" },
                    { title: "மொழி உரிமை", en: "Language Rights", color: "bg-orange-50 text-orange-600 border-orange-100" },
                    { title: "சமத்துவம்", en: "Equality", color: "bg-purple-50 text-purple-600 border-purple-100" }
                ].map((item, idx) => (
                    <div key={idx} className={`p-6 md:p-8 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 cursor-default ${item.color}`}>
                        <div className="text-3xl mb-2 font-black opacity-20">{idx + 1}</div>
                        <h3 className="text-lg md:text-xl font-bold mb-1">{item.title}</h3>
                        <p className="text-xs uppercase tracking-wider opacity-80 font-semibold">{item.en}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// SECTION 6: YOUTH VOICE (இளம் தலைமுறை குரல்)
const YouthVoiceSection = () => (
    <section className="py-32 bg-fixed bg-cover bg-center relative" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=2000)' }}>
        <div className="absolute inset-0 bg-black/70" />
        <div className="container mx-auto px-4 relative z-10 text-center">
            <Mic className="w-16 h-16 text-dravida-red mx-auto mb-8 animate-pulse" />
            <h2 className="text-3xl md:text-6xl font-black text-white mb-8 leading-tight">
                "இன்றைய இளைஞர்களே<br />நாளைய <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">தலைவர்கள்</span>"
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mx-auto italic font-serif">
                எதிர்காலம் நம் கையில். வரலாறு படைக்க வாருங்கள்.
            </p>
        </div>
    </section>
);

// SECTION 7: QUOTES (சிந்தனை வார்த்தைகள்)
const QuotesSection = () => (
    <section className="py-24 bg-neutral-50 px-4">
        <div className="container mx-auto">
            <h2 className="text-center text-3xl font-bold mb-16">சிந்தனை <span className="text-dravida-red">வார்த்தைகள்</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <QuoteCard
                    quote="மானமும் அறிவும் மனிதர்க்கு அழகு."
                    author="தந்தை பெரியார்"
                />
                <QuoteCard
                    quote="மாற்றான் தோட்டத்து மல்லிகைக்கும் மணம் உண்டு."
                    author="பேரறிஞர் அண்ணா"
                />
                <QuoteCard
                    quote="உழைப்பு, உழைப்பு, உழைப்பு - அதுதான் என்னை உயர்த்தியது."
                    author="கலைஞர் கருணாநிதி"
                />
            </div>
        </div>
    </section>
);

const QuoteCard = ({ quote, author }: { quote: string, author: string }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-black relative">
        <span className="text-6xl text-neutral-200 font-serif absolute top-4 left-4">“</span>
        <p className="text-lg text-neutral-800 font-medium italic relative z-10 mb-6 mt-4">
            {quote}
        </p>
        <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-neutral-200" />
            <span className="text-sm font-bold text-dravida-red uppercase tracking-wider">{author}</span>
        </div>
    </div>
);


export default function AboutPage() {
    return (
        <main className="min-h-screen font-sans bg-white">
            <Navbar />

            {/* Page Header */}
            <header className="pt-32 pb-12 bg-black text-white text-center">
                <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">எங்களை <span className="text-dravida-red">பற்றி</span></h1>
                <p className="mt-4 text-neutral-400">About Us</p>
            </header>

            <AboutSection />
            <DreamSection />
            <MissionSection />
            <HistoryTimeline />
            <PrinciplesSection />
            <YouthVoiceSection />
            <QuotesSection />

            <JoinCTA />
            <Footer />
        </main>
    );
}
