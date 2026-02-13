import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function FactCheckPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />
            <PageHeader
                title="Fact Check"
                description="Debunking myths and verifying claims to fight misinformation."
                breadcrumb={[
                    { label: "Fact Check", href: "/fact-check" },
                ]}
            />
            <section className="container mx-auto px-4 py-12">
                <p className="text-neutral-600">Recent fact checks and verifications.</p>
            </section>
            <Footer />
        </main>
    );
}
