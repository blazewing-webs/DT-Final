import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function SocialJusticePage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />
            <PageHeader
                title="Social Justice"
                description="The core of the Dravidian movement: Equality, Rights, and Representation."
                breadcrumb={[
                    { label: "Social Justice", href: "/social-justice" },
                ]}
            />
            <section className="container mx-auto px-4 py-12">
                <p className="text-neutral-600">Articles and resources on social justice movements and policies.</p>
            </section>
            <Footer />
        </main>
    );
}
