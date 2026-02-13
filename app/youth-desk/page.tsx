import PageHeader from "@/components/shared/PageHeader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function YouthDeskPage() {
    return (
        <main className="min-h-screen bg-neutral-50">
            <Navbar />
            <PageHeader
                title="Youth Desk"
                description="Engaging the next generation in social awareness and political activism."
                breadcrumb={[
                    { label: "Youth Desk", href: "/youth-desk" },
                ]}
            />
            <section className="container mx-auto px-4 py-12">
                <p className="text-neutral-600">Opportunities, events, and resources for the youth.</p>
            </section>
            <Footer />
        </main>
    );
}
