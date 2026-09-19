import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from "payload";
import { revalidatePath } from "next/cache";

// No `type` argument: `"page"` would build the tag `_N_T_/page`, but the page is
// cached under `_N_T_/(frontend)/page` and the purge silently misses.
const revalidateLandingPage = (log: (message: string) => void) => {
  try {
    revalidatePath("/");
    log("Landing page content saved — revalidated /");
  } catch {
    log("Landing page content saved — outside a request, skipping revalidation");
  }
};

export const revalidateLanding: GlobalAfterChangeHook = ({ doc, req }) => {
  revalidateLandingPage((message) => req.payload.logger.info(message));
  return doc;
};

export const revalidateLandingOnMediaChange: CollectionAfterChangeHook = ({ doc, req }) => {
  revalidateLandingPage((message) => req.payload.logger.info(message));
  return doc;
};

export const revalidateLandingOnMediaDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  revalidateLandingPage((message) => req.payload.logger.info(message));
  return doc;
};
