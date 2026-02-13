"use client";

import { motion } from "framer-motion";

const timelineEvents = [
    { year: "1925", title: "Self-Respect Movement", description: "Periyar launches the Self-Respect Movement to fight for equality and rationalism." },
    { year: "1944", title: "Dravidar Kazhagam", description: "Justice Party is renamed as Dravidar Kazhagam (DK)." },
    { year: "1949", title: "DMK Founded", description: "C.N. Annadurai founds the Dravida Munnetra Kazhagam (DMK)." },
    { year: "1967", title: "Historic Victory", description: "The Dravidian movement comes to power in Tamil Nadu, marking a turning point in history." },
    { year: "2000+", title: "Modern Era", description: "The legacy continues with new challenges and a digital revolution." },
];

export default function HistoryTimeline() {
    return (
        <div className="relative border-l-2 border-neutral-200 ml-4 md:ml-0 md:pl-0 md:bg-none">
            {/* Central line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-neutral-200 transform -translate-x-1/2" />

            <div className="space-y-12">
                {timelineEvents.map((event, index) => (
                    <div
                        key={index}
                        className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                            }`}
                    >
                        {/* Empty half for desktop alignment */}
                        <div className="hidden md:block w-5/12" />

                        {/* Dot on the line */}
                        <div className="absolute left-[-5px] md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 bg-dravida-red rounded-full border-2 border-white ring-2 ring-neutral-200" />

                        {/* Content Card */}
                        <div className="w-full md:w-5/12 pl-8 md:pl-0">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow"
                            >
                                <span className="text-dravida-red font-bold text-xl block mb-2">{event.year}</span>
                                <h3 className="text-lg font-bold font-heading mb-2">{event.title}</h3>
                                <p className="text-neutral-600 text-sm">{event.description}</p>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
