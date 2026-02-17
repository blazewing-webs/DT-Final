"use client";

const QuoteCard = ({ quote, author }: { quote: string, author: string }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-black relative hover:-translate-y-1 transition-transform duration-300">
        <span className="text-6xl text-neutral-200 font-serif absolute top-4 left-4">“</span>
        <p className="text-lg text-neutral-800 font-medium italic relative z-10 mb-6 mt-4">
            {quote}
        </p>
        <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-neutral-200" />
            <span className="text-sm font-bold text-dravida-red uppercase tracking-wider">{author}</span>
        </div>
    </div>
);

export default function QuotesGrid() {
    return (
        <section className="py-24 bg-neutral-50 px-4">
            <div className="container mx-auto">
                <h2 className="text-center text-3xl font-bold mb-16">சிந்தனை <span className="text-dravida-red">வார்த்தைகள்</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <QuoteCard
                        quote="மானமும் அறிவும் மனிதர்க்கு அழகு."
                        author="தந்தை பெரியார்"
                    />
                    <QuoteCard
                        quote="மாற்றான் தோட்டத்து மல்லிகைக்கும் மணம் உண்டு."
                        author="பேரறிஞர் அண்ணா"
                    />
                    <QuoteCard
                        quote="உழைப்பு, உழைப்பு, உழைப்பு - அதுதான் என்னை உயர்த்தியது."
                        author="கலைஞர் கருணாநிதி"
                    />
                </div>
            </div>
        </section>
    );
}
