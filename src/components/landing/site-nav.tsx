import { Logo } from "@/components/logo";
import { ScrollLink } from "@/components/scroll-link";
import { ScrollToTop } from "@/components/scroll-top";
import { getLandingContent } from "@/lib/content";
import { CtaButton } from "./primitives";

export async function SiteNav() {
  const { brand, navLinks } = await getLandingContent();

  return (
    <nav className="sticky top-0 z-60 border-b border-hairline bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-17.5 max-w-296 items-center justify-between gap-4 px-5 sm:px-7">
        <div className="flex min-w-0 items-center gap-2.5">
          <ScrollToTop className="shrink-0 rounded-sm transition-opacity hover:opacity-80">
            <Logo size="sm" eager />
          </ScrollToTop>
          <span className="hidden truncate mt-2 text-xs font-medium text-faint sm:inline">
            {brand.tagline}
          </span>
        </div>

        <div className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.targetId}
              targetId={link.targetId}
              className="group relative text-[15px] font-medium text-subtle transition-colors hover:text-ink"
            >
              {link.label}
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-200 group-hover:scale-x-100"
              />
            </ScrollLink>
          ))}
        </div>

        <CtaButton className="hidden sm:inline-flex">
          Get Expansion Blueprint
        </CtaButton>
        <CtaButton className="sm:hidden">Blueprint</CtaButton>
      </div>
    </nav>
  );
}
