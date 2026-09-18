"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import type { LandingContent } from "@/lib/content";
import { Frame, SectionLede, SectionTitle } from "./frame";
import { Kicker } from "./primitives";
import { Reveal, Stagger, StaggerItem } from "./motion-primitives";

type Testimonial = LandingContent["videoTestimonials"]["items"][number];

function VideoCard({ item }: { item: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  const [hinting, setHinting] = useState(false);

  const source = item.youtubeId
    ? ("youtube" as const)
    : item.vimeoId
      ? ("vimeo" as const)
      : item.mp4
        ? ("mp4" as const)
        : null;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-hairline bg-card transition-all hover:-translate-y-1 hover:border-line-strong">
      <div
        className="relative aspect-video overflow-hidden bg-linear-to-br from-white/6 to-card bg-cover bg-center"
        style={
          item.poster
            ? { backgroundImage: `url('${item.poster.src}')` }
            : undefined
        }
      >
        {playing && source === "youtube" ? (
          <iframe
            className="absolute inset-0 h-full w-full border-0 bg-black"
            src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title={`${item.name}, ${item.company}`}
          />
        ) : playing && source === "vimeo" ? (
          <iframe
            className="absolute inset-0 h-full w-full border-0 bg-black"
            src={`https://player.vimeo.com/video/${item.vimeoId}?autoplay=1`}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={`${item.name}, ${item.company}`}
          />
        ) : playing && source === "mp4" ? (
          <video
            className="absolute inset-0 h-full w-full bg-black"
            src={item.mp4}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={() => (source ? setPlaying(true) : setHinting(true))}
            className="group absolute inset-0 grid h-full w-full place-items-center border-0 bg-transparent"
            aria-label={`Play video testimonial from ${item.name}, ${item.company}`}
          >
            <span
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 120% at 50% 40%, rgba(0,0,0,0) 35%, rgba(0,0,0,.45))",
              }}
            />
            <span className="relative z-[2] grid size-15.5 place-items-center rounded-full bg-linear-to-br from-brand to-brand-soft shadow-[0_8px_26px_rgba(91,127,255,0.45)] transition-transform group-hover:scale-109">
              <Play className="size-5.5 fill-background text-background" />
            </span>
            <span className="absolute bottom-3 left-4 z-[2] text-[13px] font-semibold text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
              {item.name} · {item.company}
            </span>
          </button>
        )}

        {hinting && !source ? (
          <p className="absolute inset-x-0 bottom-0 z-[4] bg-background/95 px-3 py-2.5 text-xs leading-snug text-subtle">
            Add your video: set <b>youtubeId</b>, <b>vimeoId</b> or <b>mp4</b>{" "}
            on this entry under <b>Landing Page → Problem &amp; stories</b> in the
            admin.
          </p>
        ) : null}
      </div>

      <div className="p-5.5">
        <blockquote className="text-[15.5px] leading-snug">
          &ldquo;{item.quote}&rdquo;
        </blockquote>
        <div className="mt-3.5 text-[13.5px] text-faint">
          <b className="font-bold text-ink">{item.name}</b>, {item.role},{" "}
          {item.company}
        </div>
        <div className="mt-3.5 flex gap-5.5 border-t border-hairline pt-3.5">
          {item.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-[21px] font-extrabold text-orange">
                {metric.value}
              </div>
              <div className="text-xs text-faint">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function VideoTestimonials({
  anchor,
  videoTestimonials,
}: {
  anchor: string;
  videoTestimonials: LandingContent["videoTestimonials"];
}) {
  return (
    <Frame id={anchor}>
      <Reveal>
        <Kicker>{videoTestimonials.kicker}</Kicker>
        <SectionTitle>{videoTestimonials.title}</SectionTitle>
        <SectionLede>{videoTestimonials.lede}</SectionLede>
      </Reveal>

      <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videoTestimonials.items.map((item, i) => (
          <StaggerItem key={i}>
            <VideoCard item={item} />
          </StaggerItem>
        ))}
      </Stagger>
    </Frame>
  );
}
