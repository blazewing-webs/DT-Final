import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />
            <PageHeader
                title="Contact Us"
                description="Get in touch with us for inquiries, contributions, or feedback."
                breadcrumb={[
                    { label: "Contact", href: "/contact" },
                ]}
            />
            <section className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold font-heading mb-4">Reach Out</h3>
                            <p className="text-neutral-600">
                                We are here to listen. Whether you have a question about our articles, want to contribute, or just want to say hello.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-neutral-600">
                                <div className="w-10 h-10 bg-dravida-red/10 flex items-center justify-center rounded-full text-dravida-red">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <span>contact@dravidathalaimurai.com</span>
                            </div>
                            <div className="flex items-center gap-4 text-neutral-600">
                                <div className="w-10 h-10 bg-dravida-red/10 flex items-center justify-center rounded-full text-dravida-red">
                                    <Phone className="h-5 w-5" />
                                </div>
                                <span>+91 98765 43210</span>
                            </div>
                            <div className="flex items-center gap-4 text-neutral-600">
                                <div className="w-10 h-10 bg-dravida-red/10 flex items-center justify-center rounded-full text-dravida-red">
                                    <MapPin className="h-5 w-5" />
                                </div>
                                <span>Chennai, Tamil Nadu, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-neutral-200">
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                                <input type="text" id="name" className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-dravida-red focus:outline-none" placeholder="Your Name" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                                <input type="email" id="email" className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-dravida-red focus:outline-none" placeholder="your@email.com" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
                                <textarea id="message" rows={4} className="w-full px-4 py-2 border border-neutral-300 rounded-md focus:ring-2 focus:ring-dravida-red focus:outline-none" placeholder="How can we help?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-dravida-red text-white font-bold py-3 rounded-md hover:bg-red-700 transition">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
