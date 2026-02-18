"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface PDFReaderModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string | null;
    title?: string;
}

export default function PDFReaderModal({ isOpen, onClose, pdfUrl, title = "Magazine Reader" }: PDFReaderModalProps) {
    const [iframeLoading, setIframeLoading] = useState(true);

    // Reset loading state when url changes
    useEffect(() => {
        if (isOpen) {
            setIframeLoading(true);
        }
    }, [isOpen, pdfUrl]);

    const getEmbedUrl = (url: string | null) => {
        if (!url) return "";

        // Handle Google Drive links
        if (url.includes("drive.google.com")) {
            return url.replace(/\/view.*$/, "/preview").replace(/\/open.*$/, "/preview");
        }

        return url;
    };

    const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!pdfUrl) return;

        // Special handling for Google Drive links
        if (pdfUrl.includes("drive.google.com")) {
            // Extract file ID
            const match = pdfUrl.match(/\/d\/(.+?)(\/|$)/);
            if (match && match[1]) {
                const fileId = match[1];
                // Use the direct download link format for Google Drive
                const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

                // We'll let the default behavior happen but with the modified URL
                // However, directly modifying href on click might be late, so let's try opening the download URL
                e.preventDefault();
                window.location.href = downloadUrl;
                return;
            }
        }

        // For other files (like Firebase Storage), try to fetch as blob to force download
        // This is necessary because 'download' attribute only works for same-origin URLs
        try {
            e.preventDefault();
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = title ? `${title.replace(/\s+/g, '_')}.pdf` : 'magazine.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Download failed, falling back to new tab:", error);
            // Fallback: let the original link work (or manually open if preventDefault was called)
            window.open(pdfUrl, '_blank');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && pdfUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 md:p-8 backdrop-blur-md"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b bg-neutral-50 shrink-0">
                            <h3 className="font-bold text-lg text-neutral-800">
                                {title}
                            </h3>
                            <div className="flex items-center gap-4">
                                <a
                                    href={pdfUrl}
                                    onClick={handleDownload}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-dravida-red text-white text-sm font-bold rounded-lg hover:bg-black transition-colors flex items-center gap-2 hidden sm:flex cursor-pointer"
                                >
                                    Download <Download className="w-4 h-4" />
                                </a>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-neutral-200 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-neutral-600" />
                                </button>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="flex-1 bg-neutral-100 relative">
                            {iframeLoading && (
                                <div className="absolute inset-0 flex items-center justify-center z-10 bg-neutral-100">
                                    <Loader2 className="w-10 h-10 animate-spin text-dravida-red" />
                                </div>
                            )}
                            <iframe
                                src={getEmbedUrl(pdfUrl)}
                                className="w-full h-full border-0"
                                allow="autoplay"
                                title="PDF Reader"
                                onLoad={() => setIframeLoading(false)}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
