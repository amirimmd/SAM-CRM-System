"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getUtm(params: URLSearchParams) {
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };
}

export function CrmTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const payload = {
      type: "page_view",
      path: pathname,
      referrer: document.referrer || undefined,
      utm: getUtm(searchParams),
    };

    fetch("/api/crm/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => undefined);
  }, [pathname, searchParams]);

  return null;
}
