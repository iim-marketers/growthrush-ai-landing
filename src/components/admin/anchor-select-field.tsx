"use client";

import { useMemo } from "react";
import type { TextFieldClientComponent } from "payload";
import { SelectInput, useField, useFormFields } from "@payloadcms/ui";

import {
  SECTIONS,
  type SectionContent,
  anchorChoices,
} from "@/lib/sections";

type FieldState = { rows?: unknown[]; value?: unknown } | undefined;

const setPath = (doc: Record<string, unknown>, path: string, value: unknown) => {
  const keys = path.split(".");
  let cursor = doc;
  for (const key of keys.slice(0, -1)) {
    if (typeof cursor[key] !== "object" || cursor[key] === null) {
      cursor[key] = {};
    }
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[keys.at(-1)!] = value;
};

const rowCount = (state: FieldState): null | number => {
  if (!state) return null;
  if (Array.isArray(state.rows)) return state.rows.length;
  if (Array.isArray(state.value)) return state.value.length;
  if (typeof state.value === "number") return state.value;
  return null;
};

/**
 * Rebuild enough of the document from live form state to run the page's own
 * composition over it, rather than reimplementing the ordering here.
 */
const docFromFormState = (fields: Record<string, FieldState>): SectionContent => {
  const doc: Record<string, unknown> = {};

  for (const section of SECTIONS) {
    const anchor = fields[section.anchorPath]?.value;
    if (typeof anchor === "string") setPath(doc, section.anchorPath, anchor);

    for (const path of section.contentPaths) {
      const count = rowCount(fields[path]);
      // Unknown means absent from state, not empty — assume content.
      setPath(doc, path, new Array<null>(count ?? 1).fill(null));
    }
  }

  return doc as SectionContent;
};

/** Live list of the anchors on the page; updates as target IDs are typed. */
export const AnchorSelectField: TextFieldClientComponent = ({
  field,
  path,
  readOnly,
}) => {
  const { setValue, showError, value } = useField<string>({ path });

  const serialised = useFormFields(([fields]) =>
    JSON.stringify(anchorChoices(docFromFormState(fields as never))),
  );

  const options = useMemo(() => {
    const choices = JSON.parse(serialised) as { label: string; value: string }[];

    // Keep a stale saved value visible so the editor can see what to fix.
    if (value && !choices.some((choice) => choice.value === value)) {
      return [
        ...choices,
        { label: `#${value} — no longer on the page`, value },
      ];
    }
    return choices;
  }, [serialised, value]);

  return (
    <SelectInput
      description={
        typeof field?.admin?.description === "string"
          ? field.admin.description
          : undefined
      }
      label={field?.label}
      name={field?.name ?? path}
      onChange={(option) => {
        const picked = Array.isArray(option) ? option[0] : option;
        setValue(picked?.value ?? "");
      }}
      options={options}
      path={path}
      readOnly={readOnly}
      required={field?.required}
      showError={showError}
      value={value ?? ""}
    />
  );
};
