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

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
}

function getStoredId(storage: Storage, key: string) {
  const existing = storage.getItem(key);
  if (existing) {
    return existing;
  }
  const created = createId();
  storage.setItem(key, created);
  return created;
}

export function CrmTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (navigator.doNotTrack === "1") {
      return;
    }
    let visitorId: string | undefined;
    let sessionId: string | undefined;
    try {
      visitorId = getStoredId(localStorage, "crm_visitor_id");
      sessionId = getStoredId(sessionStorage, "crm_session_id");
    } catch {
      visitorId = undefined;
      sessionId = undefined;
    }
    const payload = {
      type: "page_view",
      visitorId,
      sessionId,
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
