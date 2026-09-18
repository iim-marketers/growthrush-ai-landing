import { Logo } from "@/components/logo";
import { ScrollLink } from "@/components/scroll-link";
import { getLandingContent } from "@/lib/content";

export async function SiteFooter() {
  const { brand, footer, navLinks } = await getLandingContent();

  return (
    <footer className="relative border-t border-hairline bg-background">
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand/45 to-transparent"
      />
      <div
        aria-hidden
        className="glow glow-brand pointer-events-none -top-30 left-1/2 h-60 w-2xl -translate-x-1/2 opacity-60"
      />

      <div className="relative z-2 mx-auto w-full max-w-296 px-5 sm:px-7">
        <div className="grid gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-sm">
            <Logo size="md" />
            <p className="mt-1.5 text-xs font-medium tracking-wide text-faint">
              {brand.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-subtle">
              {footer.blurb}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="lg:justify-self-end lg:text-right"
          >
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
              {navLinks.map((link) => (
                <li key={link.targetId}>
                  <ScrollLink
                    targetId={link.targetId}
                    className="group relative inline-flex text-[15px] text-subtle transition-colors hover:text-ink"
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-orange transition-transform duration-200 group-hover:scale-x-100"
                    />
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-hairline py-7 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <p className="shrink-0 text-sm text-faint">
            © {new Date().getFullYear()} {footer.company}
          </p>
          <p className="max-w-3xl text-xs leading-relaxed text-faint/80">
            {footer.legal}
          </p>
        </div>
      </div>
    </footer>
  );
}
