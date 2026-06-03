import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { ContainerScrollSection } from "@/components/home/ContainerScrollSection";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { AboutPreview } from "@/components/home/AboutPreview";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";
import { ContactStrip } from "@/components/home/ContactStrip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Djay Photography — Premier Events Photography, Johannesburg" },
      { name: "description", content: "Grace and precision in every frame. Premier wedding, graduation, portrait, prom, corporate and real estate photography by Djeha." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="-mt-[72px]">
      <Hero />
      <Categories />
      <ContainerScrollSection />
      <FeaturedWork />
      <AboutPreview />
      <Testimonials />
      <CTASection />
      <ContactStrip />
    </div>
  );
}
