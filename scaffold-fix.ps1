# scaffold-fix.ps1
# Fix Next.js 16 proxy + locale routes, FORCE UTF-8 (no BOM), and ensure directories reliably
# Works on Windows PowerShell 5.x+

$ErrorActionPreference = "Stop"

function Ensure-DirNet {
  param([Parameter(Mandatory=$true)][string]$Path)

  if ([string]::IsNullOrWhiteSpace($Path)) { return }

  # CreateDirectory is safe and idempotent
  [System.IO.Directory]::CreateDirectory($Path) | Out-Null
}

function Write-Utf8NoBom {
  param(
    [Parameter(Mandatory=$true)][string]$Path,
    [Parameter(Mandatory=$true)][string]$Content
  )

  $parent = Split-Path -Path $Path -Parent
  Ensure-DirNet -Path $parent

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($Path, $Content, $utf8NoBom)
}

Write-Host "Fixing scaffold (proxy + locale routes) and rewriting files as UTF-8..." -ForegroundColor Cyan

if (!(Test-Path -LiteralPath ".\package.json")) {
  Write-Host "ERROR: package.json not found. Run inside project root (where package.json is)." -ForegroundColor Red
  exit 1
}

# Remove deprecated middleware.ts if exists
if (Test-Path -LiteralPath "src\middleware.ts") {
  Remove-Item -LiteralPath "src\middleware.ts" -Force
  Write-Host "Removed src/middleware.ts" -ForegroundColor Yellow
}

# Ensure needed directories exist (important)
Ensure-DirNet -Path "src"
Ensure-DirNet -Path "src\lib\i18n"
Ensure-DirNet -Path "src\app"
Ensure-DirNet -Path "src\app\(public)\[locale]"
Ensure-DirNet -Path "src\app\(public)\[locale]\(marketing)"

# i18n config (UTF-8)
Write-Utf8NoBom -Path "src\lib\i18n\config.ts" -Content @"
export const SUPPORTED_LOCALES = ['fa','en'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];
export const DEFAULT_LOCALE: Locale = 'fa';
"@

# proxy.ts (UTF-8) - Next.js 16+
Write-Utf8NoBom -Path "src\proxy.ts" -Content @"
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from './lib/i18n/config';

function hasLocale(pathname: string) {
  return SUPPORTED_LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon')
  ) {
    return NextResponse.next();
  }

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

# Locale root page (/fa, /en)
Write-Utf8NoBom -Path "src\app\(public)\[locale]\page.tsx" -Content @"
export default function LocaleRootPage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Locale Root</h1>
      <p>This page serves /fa and /en</p>
    </main>
  );
}
"@

# Locale layout
Write-Utf8NoBom -Path "src\app\(public)\[locale]\layout.tsx" -Content @"
import type { ReactNode } from 'react';

export default function PublicLocaleLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
"@

# Marketing home
Write-Utf8NoBom -Path "src\app\(public)\[locale]\(marketing)\page.tsx" -Content @"
export default function MarketingHomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Marketing Home</h1>
      <p>SEO / AEO landing page</p>
    </main>
  );
}
"@

# Clear Next.js cache
if (Test-Path -LiteralPath ".next") {
  Remove-Item -Recurse -Force -LiteralPath ".next"
  Write-Host "Removed .next cache folder" -ForegroundColor Yellow
}

Write-Host "✅ DONE. Now restart dev server: npm run dev" -ForegroundColor Green
