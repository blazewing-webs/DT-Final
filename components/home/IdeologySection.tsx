"use client";

// Renamed from PrinciplesSection to IdeologySection to match existing import and usage
export default function IdeologySection() {
    return (
        <section className="py-24 bg-white" id="ideology">
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
}
