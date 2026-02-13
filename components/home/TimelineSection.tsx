export default function TimelineSection() {
    const milestones = [
        { year: "1925", title: "சுயமரியாதை இயக்கம்", desc: "தந்தை பெரியாரால் தோற்றுவிக்கப்பட்டது." },
        { year: "1949", title: "திராவிட முன்னேற்றக் கழகம்", desc: "பேரறிஞர் அண்ணாவால் துவக்கம்." },
        { year: "1967", title: "சமூக நீதிக்கு அரசியல் வெற்றி", desc: "மாநிலத்தில் ஆட்சி மாற்றம், சமூக நீதி நிலைநாட்டப்பட்டது." },
        { year: "2000+", title: "இளம் தலைமுறை விழிப்புணர்வு", desc: "இணையம் வழி திராவிடக் கொள்கை பரவல்." },
    ];

    return (
        <section className="py-16 bg-neutral-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4">வரலாற்றுத் தடம்</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">நூற்றாண்டு கண்ட சமூகப் புரட்சியின் முக்கிய மைல் கற்கள்.</p>
                </div>

                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-neutral-700 hidden md:block"></div>

                    <div className="space-y-12">
                        {milestones.map((item, index) => (
                            <div key={index} className={`flex flex-col md:flex-row items-center justify-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                {/* Year Bubble */}
                                <div className="hidden md:block w-1/2 text-right pr-8">
                                    {index % 2 === 0 && (
                                        <div className="text-dravida-red font-bold text-5xl opacity-20">{item.year}</div>
                                    )}
                                </div>

                                {/* Center Point */}
                                <div className="relative z-10 w-12 h-12 rounded-full bg-neutral-800 border-4 border-dravida-red flex items-center justify-center shrink-0">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>

                                {/* Content Card */}
                                <div className="w-full md:w-1/2 pl-0 md:pl-8">
                                    <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700 hover:border-dravida-red transition-colors">
                                        <div className="md:hidden text-dravida-red font-bold text-2xl mb-2">{item.year}</div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-neutral-400">{item.desc}</p>
                                    </div>
                                </div>

                                <div className="hidden md:block w-1/2 text-left pl-8">
                                    {index % 2 !== 0 && (
                                        <div className="text-dravida-red font-bold text-5xl opacity-20">{item.year}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
