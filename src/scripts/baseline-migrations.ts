import config from "@payload-config";
import { getPayload } from "payload";

import { migrations } from "@/migrations";

const payload = await getPayload({ config });
const { db } = payload;

const applied = await payload.find({
  collection: "payload-migrations",
  limit: 0,
  sort: "name",
});
const alreadyRecorded = new Set(applied.docs.map((doc) => doc.name));
const devMarker = applied.docs.filter((doc) => doc.batch === -1);
const pending = migrations.filter((migration) => !alreadyRecorded.has(migration.name));

if (!devMarker.length && !pending.length) {
  payload.logger.info("Nothing to do: this database is already tracked by migrations.");
  process.exit(0);
}

const { rows } = (await db.execute({
  drizzle: db.drizzle,
  raw: "SELECT to_regclass('public.landing') IS NOT NULL AS present",
})) as { rows: { present: boolean }[] };

if (!rows[0]?.present) {
  payload.logger.error(
    "This database has no schema yet, so there is nothing to baseline. " +
      "Run `pnpm migrate` instead — it will build the schema from scratch.",
  );
  process.exit(1);
}

for (const migration of pending) {
  await payload.create({
    collection: "payload-migrations",
    data: { name: migration.name, batch: 1 },
  });
  payload.logger.info(`Recorded as already applied: ${migration.name}`);
}

if (devMarker.length) {
  for (const doc of devMarker) {
    await payload.delete({ collection: "payload-migrations", id: doc.id });
  }
  payload.logger.info("Removed the development schema-push marker.");
}

payload.logger.info("Done. `pnpm migrate` now runs unattended.");
process.exit(0);
