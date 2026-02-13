"use client";

import { motion } from "framer-motion";
import { Clock, ChevronRight, Circle } from "lucide-react";

interface TimelineItem {
    id: string;
    time: string;
    title: string;
    description?: string;
    children?: TimelineItem[]; // Recursion support
}

interface RecursiveTimelineProps {
    title: string;
    items: TimelineItem[];
    className?: string;
}

const TimelineNode = ({ item, depth = 0 }: { item: TimelineItem; depth?: number }) => {
    return (
        <div className="relative pl-4 pb-6 last:pb-0">
            {/* Thread Line */}
            <div
                className="absolute left-0 top-2 bottom-0 w-px bg-neutral-200"
                style={{ display: "block" }} // You might want logic to hide the line for the last item if not recursive
            />

            {/* Indicator Dot */}
            <div className={`absolute left-[-4px] top-2 rounded-full border-2 border-white ring-1 ring-neutral-200 ${depth === 0 ? "w-2.5 h-2.5 bg-dravida-red" : "w-2 h-2 bg-neutral-400"
                }`} />

            {/* Content */}
            <div className="ml-2">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-neutral-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.time}
                    </span>
                    {depth === 0 && (
                        <span className="px-1.5 py-0.5 rounded-full bg-red-50 text-dravida-red text-[10px] font-bold uppercase tracking-wider">
                            Live
                        </span>
                    )}
                </div>

                <h4 className={`font-bold text-neutral-900 mb-1 ${depth === 0 ? "text-sm" : "text-xs"}`}>
                    {item.title}
                </h4>

                {item.description && (
                    <p className="text-xs text-neutral-600 leading-relaxed mb-2">
                        {item.description}
                    </p>
                )}

                {/* Recursive Children */}
                {item.children && item.children.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-neutral-100 border-dashed">
                        {item.children.map(child => (
                            <TimelineNode key={child.id} item={child} depth={depth + 1} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default function RecursiveTimeline({ title, items, className }: RecursiveTimelineProps) {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden ${className}`}>
            {/* Header */}
            <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
                <h3 className="font-bold text-neutral-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-dravida-red animate-pulse" />
                    {title}
                </h3>
                <span className="text-[10px] text-neutral-500 uppercase font-semibold">Real-time</span>
            </div>

            {/* Timeline Body */}
            <div className="p-4">
                <div className="relative">
                    {items.map((item) => (
                        <TimelineNode key={item.id} item={item} />
                    ))}
                </div>
            </div>

            {/* Footer / Load More */}
            <div className="bg-neutral-50 px-4 py-2 border-t border-neutral-200 text-center">
                <button className="text-xs font-semibold text-neutral-500 hover:text-dravida-red transition-colors flex items-center justify-center gap-1 w-full">
                    View Full Archive <ChevronRight className="w-3 h-3" />
                </button>
            </div>
        </div>
    );
}
