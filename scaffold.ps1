# scaffold.ps1
# Run inside the root of your Next.js project (where package.json exists)

$ErrorActionPreference = "Stop"

Write-Host "✅ Creating enterprise-friendly scaffold..." -ForegroundColor Green

if (!(Test-Path ".\package.json")) {
  Write-Host "❌ package.json not found. Run this script in the root of your Next.js project." -ForegroundColor Red
  exit 1
}

function New-FileIfMissing {
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [string]$Content = ""
  )
  $dir = Split-Path $Path -Parent
  if ($dir -and !(Test-Path $dir)) {
    New-Item -ItemType Directory -Force -Path $dir | Out-Null
  }
  if (!(Test-Path $Path)) {
    New-Item -ItemType File -Force -Path $Path | Out-Null
    if ($Content -ne "") {
      Set-Content -Path $Path -Value $Content -Encoding UTF8
    }
  }
}

# -----------------------------
# Directories
# -----------------------------
$dirs = @(
  "src\app\(public)\[locale]\(marketing)",
  "src\app\(public)\[locale]\(marketing)\shipping",
  "src\app\(public)\[locale]\(marketing)\calculator",
  "src\app\(public)\[locale]\(marketing)\tracking",
  "src\app\(public)\[locale]\(marketing)\brands",
  "src\app\(public)\[locale]\(marketing)\blog",
  "src\app\(public)\[locale]\(marketing)\faq",
  "src\app\(public)\[locale]\(marketing)\gallery",
  "src\app\(public)\[locale]\(marketing)\contact",

  "src\app\(dashboard)\[locale]\dashboard",
  "src\app\(dashboard)\[locale]\dashboard\orders",
  "src\app\(dashboard)\[locale]\dashboard\tracking",
  "src\app\(dashboard)\[locale]\dashboard\bookings",
  "src\app\(dashboard)\[locale]\dashboard\chat",
  "src\app\(dashboard)\[locale]\dashboard\profile",

  "src\app\(dashboard)\[locale]\admin",
  "src\app\(dashboard)\[locale]\admin\crm",
  "src\app\(dashboard)\[locale]\admin\orders",
  "src\app\(dashboard)\[locale]\admin\content",
  "src\app\(dashboard)\[locale]\admin\brands",
  "src\app\(dashboard)\[locale]\admin\reports",
  "src\app\(dashboard)\[locale]\admin\settings",

  "src\app\api\auth\login",
  "src\app\api\auth\logout",
  "src\app\api\auth\refresh",
  "src\app\api\auth\me",

  "src\app\api\crm\events",
  "src\app\api\crm\leads",
  "src\app\api\crm\customers",
  "src\app\api\crm\analytics",

  "src\app\api\orders",
  "src\app\api\orders\[orderId]",
  "src\app\api\orders\[orderId]\events",
  "src\app\api\orders\[orderId]\documents",

  "src\app\api\bookings",
  "src\app\api\bookings\[bookingId]",

  "src\app\api\chat\conversations",
  "src\app\api\chat\[conversationId]\messages",
  "src\app\api\chat\[conversationId]\attachments",

  "src\app\api\content\pages",
  "src\app\api\content\posts",
  "src\app\api\content\uploads",

  "src\app\api\brands",
  "src\app\api\brands\[brandId]",

  "src\app\api\files\signed-url",

  "src\core\domain\auth",
  "src\core\domain\crm",
  "src\core\domain\logistics",
  "src\core\domain\chat",
  "src\core\domain\content",
  "src\core\domain\brands",

  "src\core\application\services",
  "src\core\application\ports",
  "src\core\application\dto",
  "src\core\application\validators",

  "src\core\infrastructure\db\supabase\repositories",
  "src\core\infrastructure\auth",
  "src\core\infrastructure\storage",
  "src\core\infrastructure\geo",
  "src\core\infrastructure\realtime",
  "src\core\infrastructure\analytics",

  "src\ui\components",
  "src\ui\forms",
  "src\ui\charts",
  "src\ui\tables",
  "src\ui\layout",
  "src\ui\icons",

  "src\lib\i18n\dictionaries",
  "src\lib\http",
  "src\lib\security",
  "src\lib\utils",
  "src\types",
  "src\styles",

  "supabase\migrations",
  "supabase\policies",
  "docker",
  "scripts"
)

foreach ($d in $dirs) {
  if (!(Test-Path $d)) {
    New-Item -ItemType Directory -Force -Path $d | Out-Null
  }
}

# -----------------------------
# i18n minimal setup
# -----------------------------
New-FileIfMissing -Path "src\lib\i18n\config.ts" -Content @"
export const SUPPORTED_LOCALES = ['fa','en'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'fa';
"@

New-FileIfMissing -Path "src\lib\i18n\dictionaries\fa.json" -Content @"
{
  "site": { "title": "پلتفرم لجستیک" },
  "nav": { "home": "خانه", "dashboard": "داشبورد" }
}
"@

New-FileIfMissing -Path "src\lib\i18n\dictionaries\en.json" -Content @"
{
  "site": { "title": "Logistics Platform" },
  "nav": { "home": "Home", "dashboard": "Dashboard" }
}
"@

New-FileIfMissing -Path "src\lib\i18n\getDictionary.ts" -Content @"
import type { Locale } from './config';

export async function getDictionary(locale: Locale) {
  switch (locale) {
    case 'fa':
      return (await import('./dictionaries/fa.json')).default;
    case 'en':
      return (await import('./dictionaries/en.json')).default;
    default:
      return (await import('./dictionaries/fa.json')).default;
  }
}
"@

# -----------------------------
# Middleware: locale redirect (simple)
# -----------------------------
New-FileIfMissing -Path "src\middleware.ts" -Content @"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './lib/i18n/config';

function hasLocale(pathname: string) {
  return SUPPORTED_LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip next internals & api
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/favicon')) {
    return NextResponse.next();
  }

  // Locale redirect
  if (!hasLocale(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
"@

# -----------------------------
# HTTP helper
# -----------------------------
New-FileIfMissing -Path "src\lib\http\client.ts" -Content @"
export async function postJSON<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(path, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json() as Promise<T>;
}
"@

# -----------------------------
# Ports (interfaces)
# -----------------------------
New-FileIfMissing -Path "src\core\application\ports\storage.port.ts" -Content @"
export interface StoragePort {
  createSignedUploadUrl(opts: { bucket: string; path: string; contentType: string }): Promise<{ url: string; path: string }>;
  createSignedDownloadUrl(opts: { bucket: string; path: string; expiresIn: number }): Promise<{ url: string }>;
}
"@

New-FileIfMissing -Path "src\core\application\ports\geo.port.ts" -Content @"
export interface GeoPort {
  resolve(req: Request): Promise<{ country?: string; city?: string }>;
}
"@

# -----------------------------
# Services placeholders
# -----------------------------
New-FileIfMissing -Path "src\core\application\services\crm.service.ts" -Content @"
import type { GeoPort } from '../ports/geo.port';

export class CrmService {
  constructor(private geo: GeoPort) {}

  async trackEvent(req: Request, payload: any) {
    const geo = await this.geo.resolve(req);
    // TODO: persist event in repository
    return { ok: true, geo, received: payload };
  }
}
"@

# -----------------------------
# Infrastructure placeholders
# -----------------------------
New-FileIfMissing -Path "src\core\infrastructure\geo\vercel-headers.adapter.ts" -Content @"
import type { GeoPort } from '../../application/ports/geo.port';

export class VercelHeadersGeoAdapter implements GeoPort {
  async resolve(req: Request) {
    const country = req.headers.get('x-vercel-ip-country') ?? undefined;
    const city = req.headers.get('x-vercel-ip-city') ?? undefined;
    return { country, city };
  }
}
"@

New-FileIfMissing -Path "src\core\infrastructure\storage\supabase-storage.adapter.ts" -Content @"
import type { StoragePort } from '../../application/ports/storage.port';

export class SupabaseStorageAdapter implements StoragePort {
  async createSignedUploadUrl(opts: { bucket: string; path: string; contentType: string }) {
    // TODO: implement Supabase signed upload
    return { url: 'TODO_SIGNED_UPLOAD_URL', path: opts.path };
  }

  async createSignedDownloadUrl(_opts: { bucket: string; path: string; expiresIn: number }) {
    // TODO: implement Supabase signed download
    return { url: 'TODO_SIGNED_DOWNLOAD_URL' };
  }
}
"@

# -----------------------------
# API route placeholders
# -----------------------------
New-FileIfMissing -Path "src\app\api\crm\events\route.ts" -Content @"
import { NextResponse } from 'next/server';
import { CrmService } from '@/core/application/services/crm.service';
import { VercelHeadersGeoAdapter } from '@/core/infrastructure/geo/vercel-headers.adapter';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const service = new CrmService(new VercelHeadersGeoAdapter());
  const result = await service.trackEvent(req, body);
  return NextResponse.json(result);
}
"@

New-FileIfMissing -Path "README-SCAFFOLD.md" -Content @"
# Scaffold Notes

- UI calls ONLY /api (BFF)
- Vendors (Supabase/Vercel) are isolated in infrastructure adapters
- Later migration to self-hosted is done by swapping adapters

Start points:
- CRM endpoint: src/app/api/crm/events/route.ts
- Locale middleware: src/middleware.ts
"@

Write-Host "✅ Scaffold created successfully." -ForegroundColor Green
Write-Host "Next: run 'npm run dev' and open /fa and /en routes." -ForegroundColor Yellow
