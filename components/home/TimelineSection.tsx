"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function TimelineSection() {
    const { isTamil } = useLanguage();

    const badge = isTamil ? "எங்கள் முன்னோடிகள்" : "Our Pioneers";
    const heading1 = isTamil ? "புரட்சித்" : "Revolutionary";
    const heading2 = isTamil ? "தலைவர்கள்" : "Leaders";
    const leaderLabel = isTamil ? "தலைவர்" : "Leader";

    const events = [
        {
            year: "01",
            leader: isTamil ? "ஈ.வி. ராமசாமி (பெரியார்)" : "E. V. Ramasamy (Periyar)",
            title: isTamil ? "ஈ.வி. ராமசாமி (பெரியார்)" : "E. V. Ramasamy (Periyar)",
            desc: isTamil
                ? "👉 “அடிமைத்தனத்தை உடைத்த சிந்தனைப் புரட்சி!”"
                : "👉 “A revolutionary who shattered the chains of oppression through thought!”",
            image: "https://mir-s3-cdn-cf.behance.net/projects/404/f21778207995123.Y3JvcCwyNDgwLDE5MzksMCw3ODU.jpg"
        },
        {
            year: "02",
            leader: isTamil ? "அயோத்திதாசர்" : "Ayothidasar",
            title: isTamil ? "அயோத்திதாசர்" : "Ayothidasar",
            desc: isTamil
                ? "👉 “சமத்துவ விதையை விதைத்த முன்னோடி!”"
                : "👉 “A pioneer who sowed the seeds of equality!”",
            image: "https://thefederal.com/file/2020/05/Untitled-design-2020-05-19T160817.322.jpg"
        },
        {
            year: "03",
            leader: isTamil ? "சிங்காரவேலர்" : "Singaravelar",
            title: isTamil ? "சிங்காரவேலர்" : "Singaravelar",
            desc: isTamil
                ? "👉 “தொழிலாளர்களின் உரிமைக்கான உரத்த குரல்!”"
                : "👉 “A powerful voice for the rights of workers!”",
            image: "https://singaravelar.in/assets/img/singaravelar-1.png"
        },
        {
            year: "04",
            leader: isTamil ? "மூவலூர் ராமாமிர்தம் அம்மையார்" : "Moovalur Ramamirtham Ammaiyar",
            title: isTamil ? "மூவலூர் ராமாமிர்தம் அம்மையார்" : "Moovalur Ramamirtham Ammaiyar",
            desc: isTamil
                ? "👉 “பெண் விடுதலைக்கு போராடிய வீரத் தலைவர்!”"
                : "👉 “A fearless leader who fought for women’s liberation!”",
            image: "https://th.bing.com/th/id/R.d48a6e1f6a569e2f07a80e36781e3d24?rik=JQHbHvM3cZh8BQ&riu=http%3a%2f%2fwww.vallamai.com%2fwp-content%2fuploads%2f2012%2f03%2f200px-Moovalur_ramamirtham.jpg&ehk=KY2A5h0tUjyFpFsicH8yLodKNq%2bfrTyY2%2fpq%2f0Wyouc%3d&risl=&pid=ImgRaw&r=0"
        }
    ];

    // Fallback if the image search was unsuccessful for a specific URL, but Wikipedia ones are generally stable.
    // I will use some more resilient URLs if possible.

    return (
        <section className="py-24 bg-neutral-900 text-white relative" id="history">
            <div className="container mx-auto px-4">
                <div className="text-center mb-20">
                    <span className="text-dravida-red font-bold uppercase tracking-widest text-sm mb-2 block">{badge}</span>
                    <h2 className="text-4xl md:text-5xl font-black">{heading1} <span className="text-white">{heading2}</span></h2>
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
                                    <span className="text-8xl font-black text-white/5 top-0 absolute -z-10">{event.year}</span>
                                    <span className="text-dravida-red font-bold text-xl mb-2">{event.year}</span>
                                    <h3 className="text-2xl font-bold mb-3">{event.title}</h3>
                                    <p className="text-neutral-300 leading-relaxed max-w-md italic text-lg">{event.desc}</p>
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
                                            <p className="text-dravida-red font-bold text-sm uppercase tracking-wider mb-1">{leaderLabel}</p>
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
