"use client";

// Renamed from HistoryTimeline to TimelineSection to match existing import in page.tsx
export default function TimelineSection() {
    const events = [
        {
            year: "1925",
            leader: "தந்தை பெரியார்",
            title: "சுயமரியாதை இயக்கம்",
            desc: "குடியரசு இதழ் மற்றும் சுயமரியாதை இயக்கத்தின் தோற்றம். சாதி ஒழிப்பு மற்றும் பெண் விடுதலைக்கான போர் முரசு.",
            image: "https://mir-s3-cdn-cf.behance.net/projects/404/f21778207995123.Y3JvcCwyNDgwLDE5MzksMCw3ODU.jpg"
        },
        {
            year: "1949",
            leader: "பேரறிஞர் அண்ணா",
            title: "திராவிட முன்னேற்றக் கழகம்",
            desc: "சமூக நீதிக்கான அரசியல் இயக்கம் உதயம். 'கடமை, கண்ணியம், கட்டுப்பாடு' எனும் தாரக மந்திரம்.",
            image: "https://imgk.timesnownews.com/media/Annadurai123.jpeg"
        },
        {
            year: "1967",
            leader: "திராவிடர் ஆட்சி",
            title: "முதல் வெற்றி",
            desc: "பேரறிஞர் அண்ணா தலைமையில் திமுக ஆட்சியமைத்தது. மதராஸ் மாநிலம் 'தமிழ்நாடு' என பெயர் சூட்டப்பட்டது.",
            image: "https://media.assettype.com/thenewsminute/2026-02-10/n3yqy9x4/WhatsApp-Image-2026-02-10-at-19.19.38.jpeg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true"
        },
        {
            year: "1969-2018",
            leader: "கலைஞர் கருணாநிதி",
            title: "நவீன தமிழ்நாடு",
            desc: "சம சமூக நீதி, இட ஒதுக்கீடு, தகவல் தொழில்நுட்ப புரட்சி, மற்றும் உள்கட்டமைப்பு மேம்பாடு.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr7kEb0BpBaHBOgP1mBPNOxfHE3Q7sQA2s6A&s"
        },
        {
            year: "2021-Present",
            leader: "மு.க. ஸ்டாலின்",
            title: "திராவிட மாடல்",
            desc: "அனைவருக்குமான வளர்ச்சி. 'எல்லோருக்கும் எல்லாம்' என்ற தத்துவத்தின் அடிப்படையில் நல்லாட்சி.",
            image: "https://data.indianexpress.com/election2019/about/images/politician/mk-stalin.jpg?w=330"
        }
    ];

    return (
        <section className="py-24 bg-neutral-900 text-white relative" id="history">
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
}
