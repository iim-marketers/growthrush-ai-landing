import type { PageEntry } from "@/lib/sections";
import { getLandingContent, type LandingContent } from "@/lib/content";
import { TopBar } from "@/components/landing/top-bar";
import { SiteNav } from "@/components/landing/site-nav";
import { Hero } from "@/components/landing/hero";
import { ProofStats } from "@/components/landing/proof-stats";
import { LogoStrip } from "@/components/landing/logo-strip";
import { Problem } from "@/components/landing/problem";
import { VideoTestimonials } from "@/components/landing/video-testimonials";
import { Engine } from "@/components/landing/engine";
import { Tracks } from "@/components/landing/tracks";
import { CaseStudies } from "@/components/landing/case-studies";
import { Fit } from "@/components/landing/fit";
import { Offer } from "@/components/landing/offer";
import { Bonuses } from "@/components/landing/bonuses";
import { Team } from "@/components/landing/team";
import { Guarantee } from "@/components/landing/guarantee";
import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { StickyCta } from "@/components/landing/sticky-cta";
import { SiteFooter } from "@/components/landing/site-footer";

function BuiltInSection({
  content,
  entry,
}: {
  content: LandingContent;
  entry: PageEntry;
}) {
  const { anchor } = entry;

  switch (entry.id) {
    case "hero":
      return <Hero anchor={anchor} />;
    case "proof":
      return <ProofStats anchor={anchor} />;
    case "clients":
      return <LogoStrip anchor={anchor} />;
    case "problem":
      return <Problem anchor={anchor} />;
    case "testimonials":
      return (
        <VideoTestimonials
          anchor={anchor}
          videoTestimonials={content.videoTestimonials}
        />
      );
    case "engine":
      return <Engine anchor={anchor} />;
    case "tracks":
      return <Tracks anchor={anchor} />;
    case "case-studies":
      return <CaseStudies anchor={anchor} />;
    case "fit":
      return <Fit anchor={anchor} />;
    case "offer":
      return <Offer anchor={anchor} />;
    case "bonuses":
      return <Bonuses anchor={anchor} />;
    case "team":
      return <Team anchor={anchor} />;
    case "guarantee":
      return <Guarantee anchor={anchor} />;
    case "faq":
      return <Faq anchor={anchor} faq={content.faq} />;
    case "apply":
      return <FinalCta anchor={anchor} />;
  }
}

export default async function NationalExpansionPage() {
  const content = await getLandingContent();
  const { announcement, applicationsCloseAt, composition, stickyBar } = content;

  return (
    <>
      <TopBar announcement={announcement} closesAt={applicationsCloseAt} />
      <SiteNav />
      <main>
        {composition.map((entry) => (
          <BuiltInSection key={entry.id} content={content} entry={entry} />
        ))}
      </main>
      <StickyCta ctaTarget={content.anchors.offer} stickyBar={stickyBar} />
      <SiteFooter />
    </>
  );
}
