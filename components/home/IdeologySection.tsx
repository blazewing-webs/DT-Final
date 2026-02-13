import { Shield, Users, Globe, BookOpen } from "lucide-react";

export default function IdeologySection() {
    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Why Dravidian Thought? */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="h-1 w-12 bg-dravida-red rounded-full"></span>
                            <span className="text-dravida-red font-bold uppercase tracking-wider text-sm">தத்துவம்</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 font-heading leading-tight">
                            ஏன் திராவிட சிந்தனை?
                        </h2>
                        <div className="prose prose-lg text-neutral-600">
                            <p className="border-l-4 border-dravida-red pl-4 italic bg-neutral-50 py-4 pr-4 rounded-r-lg">
                                திராவிட சிந்தனை என்பது அதிகாரத்திற்கு அடிமை அல்ல. மதத்திற்கு அடிமை அல்ல. மனித மரியாதைக்கான போராட்டம்.
                            </p>
                            <p className="mt-4">
                                இன்றைய சமூகத்தில் நிலவும் சாதி, பெண் அடிமைத்தனம், மூடநம்பிக்கை போன்றவற்றை கேள்வி கேட்க வைக்கும் சிந்தனைதான் திராவிட சிந்தனை.
                            </p>
                        </div>
                    </div>

                    {/* Social Issues Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <IssueCard
                            icon={<Globe className="w-6 h-6" />}
                            title="கல்வியில் சமத்துவம்"
                            desc="அனைவருக்கும் தரமான கல்வி உரிமை."
                        />
                        <IssueCard
                            icon={<Users className="w-6 h-6" />}
                            title="வேலைவாய்ப்பில் சமூக நீதி"
                            desc="இட ஒதுக்கீடு மற்றும் சம வாய்ப்பு."
                        />
                        <IssueCard
                            icon={<Shield className="w-6 h-6" />}
                            title="பெண்கள் பாதுகாப்பு"
                            desc="சுயமரியாதை மற்றும் சம உரிமை."
                        />
                        <IssueCard
                            icon={<BookOpen className="w-6 h-6" />}
                            title="மொழி உரிமைகள்"
                            desc="தாய்மொழி காப்போம், அறிவு வளர்ப்போம்."
                        />
                    </div>
                </div>

                {/* Impact / Achievements Banner */}
                <div className="mt-20 bg-neutral-50 rounded-2xl p-8 md:p-12 border border-neutral-100">
                    <h3 className="text-2xl font-bold text-center mb-10">எங்கள் தாக்கம்</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                            <div className="text-4xl font-bold text-dravida-red mb-2">100+</div>
                            <div className="font-semibold text-neutral-800">சமூகம் சார்ந்த கட்டுரைகள்</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-dravida-red mb-2">50k+</div>
                            <div className="font-semibold text-neutral-800">இளைஞர் வாசகர்கள்</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold text-dravida-red mb-2">24/7</div>
                            <div className="font-semibold text-neutral-800">உண்மைச் செய்திகள்</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function IssueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
    return (
        <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-100 hover:shadow-md transition-shadow hover:border-dravida-red/30 group">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-dravida-red shadow-sm mb-4 group-hover:bg-dravida-red group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-neutral-900">{title}</h3>
            <p className="text-sm text-neutral-500">{desc}</p>
        </div>
    );
}
