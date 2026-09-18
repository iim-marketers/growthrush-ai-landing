"use client";

import { Link, useConfig, useTranslation } from "@payloadcms/ui";
import { LogOut } from "lucide-react";
import { formatAdminURL } from "payload/shared";

export function AdminLogoutButton({ tabIndex = 0 }: { tabIndex?: number }) {
  const { config } = useConfig();
  const { t } = useTranslation();

  const {
    admin: {
      routes: { logout: logoutRoute },
    },
    routes: { admin: adminRoute },
  } = config;

  return (
    <Link
      className="gr-logout"
      href={formatAdminURL({ adminRoute, path: logoutRoute })}
      prefetch={false}
      tabIndex={tabIndex}
    >
      <LogOut aria-hidden size={16} />
      <span>{t("authentication:logOut")}</span>
    </Link>
  );
}
