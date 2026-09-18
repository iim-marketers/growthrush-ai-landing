import type { GlobalAfterChangeHook } from "payload";
import { revalidatePath } from "next/cache";

export const revalidateLanding: GlobalAfterChangeHook = ({ doc, req }) => {
  try {
    revalidatePath("/", "page");
    req.payload.logger.info("Landing page content saved — revalidated /");
  } catch {
    // `revalidatePath` needs Next's request store, which the seed script,
    // migrations and other CLI entry points do not have. Nothing is cached in
    // those contexts either, so there is nothing to invalidate.
    req.payload.logger.info("Landing page content saved — outside a request, skipping revalidation");
  }

  return doc;
};
