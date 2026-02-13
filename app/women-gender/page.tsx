import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WomenGenderPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />
            <PageHeader
                title="Women & Gender"
                description="Championing women's rights and gender equality in the Dravidian context."
                breadcrumb={[
                    { label: "Women & Gender", href: "/women-gender" },
                ]}
            />
            <section className="container mx-auto px-4 py-12">
                <p className="text-neutral-600">Stories of empowerment and policy analysis.</p>
            </section>
            <Footer />
        </main>
    );
}
