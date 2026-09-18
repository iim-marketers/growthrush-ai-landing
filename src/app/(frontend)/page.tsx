import { getLandingContent } from "@/lib/content";
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

export default async function NationalExpansionPage() {
  const {
    announcement,
    applicationsCloseAt,
    showcaseHeading,
    showcaseBrands,
    videoTestimonials,
    faq,
    stickyBar,
  } = await getLandingContent();

  return (
    <>
      <TopBar announcement={announcement} closesAt={applicationsCloseAt} />
      <SiteNav />
      <main>
        <Hero />
        <ProofStats />
        <LogoStrip heading={showcaseHeading} showcaseBrands={showcaseBrands} />
        <Problem />
        <VideoTestimonials videoTestimonials={videoTestimonials} />
        <Engine />
        <Tracks />
        <CaseStudies />
        <Fit />
        <Offer />
        <Bonuses />
        <Team />
        <Guarantee />
        <Faq faq={faq} />
        <FinalCta />
      </main>
      <StickyCta stickyBar={stickyBar} />
      <SiteFooter />
    </>
  );
}
