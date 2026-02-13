import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, ArrowRight, MapPin, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white font-sans border-t-4 border-dravida-red">
            {/* Newsletter Section */}
            <div className="bg-neutral-800/50 py-10 border-b border-neutral-800">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold font-heading mb-2">செய்திகளை உடனுக்குடன் அறிய</h3>
                            <p className="text-neutral-400">எங்கள் செய்தி மடலில் இணையுங்கள். முக்கியமான செய்திகள் உங்கள் மின்னஞ்சலில்.</p>
                        </div>
                        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                placeholder="மின்னஞ்சல் முகவரி"
                                className="px-5 py-3 rounded-lg bg-neutral-900 border border-neutral-700 text-white w-full sm:w-80 focus:outline-none focus:border-dravida-red transition-colors"
                            />
                            <button className="px-6 py-3 bg-dravida-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                                இணையவும் <ArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <Link href="/" className="inline-block">
                                <img src="/logo.jpeg" alt="Dravida Thalaimurai" className="h-20 w-auto object-contain rounded-lg bg-white p-2" />
                            </Link>
                            <div className="h-1 w-12 bg-dravida-red rounded-full"></div>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            சமூக நீதி, பகுத்தறிவு மற்றும் சுயமரியாதை கொள்கைகளை முன்னெடுக்கும் டிஜிட்டல் தளம். திராவிட இயக்கத்தின் வரலாற்றுப் பெருமைகளையும், நவீன காலத் தேவைகளையும் இணைக்கும் குரல்.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} />
                            <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} />
                            <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} />
                            <SocialLink href="#" icon={<Youtube className="h-5 w-5" />} />
                        </div>
                    </div>

                    {/* Categories Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-dravida-red"></span>
                            செய்திகள்
                        </h4>
                        <ul className="space-y-3 text-neutral-400">
                            <FooterLink href="/politics">அரசியல்</FooterLink>
                            <FooterLink href="/education">கல்வி</FooterLink>
                            <FooterLink href="/women">பெண்கள் நலம்</FooterLink>
                            <FooterLink href="/social-justice">சமூக நீதி</FooterLink>
                            <FooterLink href="/environment">சுற்றுச்சூழல்</FooterLink>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-dravida-red"></span>
                            வளங்கள்
                        </h4>
                        <ul className="space-y-3 text-neutral-400">
                            <FooterLink href="/history">திராவிட வரலாறு</FooterLink>
                            <FooterLink href="/books">நூல்கள் & ஆவணங்கள்</FooterLink>
                            <FooterLink href="/magazine">மாத இதழ்</FooterLink>
                            <FooterLink href="/youth-desk">இளைஞர் அணி</FooterLink>
                            <FooterLink href="/fact-check">உண்மை சரிபார்ப்பு</FooterLink>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-dravida-red"></span>
                            தொடர்புக்கு
                        </h4>
                        <ul className="space-y-4 text-neutral-400">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-dravida-red shrink-0 mt-1" />
                                <span className="text-sm">
                                    எண் 12, அண்ணா சாலை,<br />
                                    தேனாம்பேட்டை, சென்னை - 600018.
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-dravida-red shrink-0" />
                                <a href="mailto:contact@dravida.in" className="text-sm hover:text-white transition-colors">
                                    contact@dravida.in
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-dravida-red shrink-0" />
                                <span className="text-sm">+91 44 2432 XXXX</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-black py-6 border-t border-neutral-800">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
                        <p>© {new Date().getFullYear()} திராவிடத் தலைமுறை. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

// Helper Components for cleaner JSX
function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a
            href={href}
            className="h-10 w-10 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 hover:bg-dravida-red hover:text-white transition-all duration-300"
        >
            {icon}
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="hover:text-dravida-red hover:pl-1 transition-all duration-300 inline-block">
                {children}
            </Link>
        </li>
    );
}

