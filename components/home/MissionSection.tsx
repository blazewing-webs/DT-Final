"use client";

export default function MissionSection() {
    return (
        <section className="py-24 bg-neutral-50" id="mission">
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
}
