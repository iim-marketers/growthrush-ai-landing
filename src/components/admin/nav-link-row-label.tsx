"use client";

import { useRowLabel } from "@payloadcms/ui";

type NavLinkRow = {
  label?: null | string;
  targetId?: null | string;
};

export function NavLinkRowLabel() {
  const { data, rowNumber } = useRowLabel<NavLinkRow>();

  const label = data?.label?.trim();
  const anchor = data?.targetId?.trim();
  const position = String((rowNumber ?? 0) + 1).padStart(2, "0");

  if (!label && !anchor) return <span>Navigation link {position}</span>;

  return (
    <span className="gr-nav-row">
      <span className="gr-nav-row__label">{label || `Link ${position}`}</span>
      <span className="gr-nav-row__target">
        {anchor ? `→ #${anchor}` : "→ no section chosen"}
      </span>
    </span>
  );
}
