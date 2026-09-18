import type { AdminViewServerProps } from "payload";

import { redirect } from "next/navigation";
import { formatAdminURL } from "payload/shared";

export function ForgotPasswordDisabled({ payload }: AdminViewServerProps) {
  const {
    admin: {
      routes: { login: loginRoute },
    },
    routes: { admin: adminRoute },
  } = payload.config;

  redirect(formatAdminURL({ adminRoute, path: loginRoute }));
}
