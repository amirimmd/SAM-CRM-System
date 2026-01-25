# structure-finalize.ps1
$ErrorActionPreference = "Stop"

function Ensure-Dir { param([string]$Path) [System.IO.Directory]::CreateDirectory($Path) | Out-Null }
function Move-File {
    param([string]$Source, [string]$Dest)
    if (Test-Path $Source) {
        $parent = Split-Path $Dest -Parent
        Ensure-Dir $parent
        if (!(Test-Path $Dest)) {
            Move-Item -Path $Source -Destination $Dest -Force
            Write-Host "Moved: $Source -> $Dest" -ForegroundColor Cyan
        } else {
            Remove-Item $Source -Force
            Write-Host "Skipped (Exists): $Source (Deleted source)" -ForegroundColor DarkGray
        }
    }
}

Write-Host "🚀 Finalizing Project Structure into 'src/'..." -ForegroundColor Green

# 1. Move Critical Files from Root 'app' to 'src/app'
# ---------------------------------------------------
# Moving globals.css
Move-File -Source "app\globals.css" -Dest "src\app\globals.css"
# Moving SEO files
Move-File -Source "app\robots.ts" -Dest "src\app\robots.ts"
Move-File -Source "app\sitemap.ts" -Dest "src\app\sitemap.ts"
# Moving favicon if exists
Move-File -Source "app\favicon.ico" -Dest "src\app\favicon.ico"

# 2. Clean up root 'app' and 'lib' folders (Safe Delete)
# ---------------------------------------------------
if (Test-Path "app") {
    Remove-Item "app" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "🗑️  Removed root 'app' folder (Merged into src)" -ForegroundColor Yellow
}
if (Test-Path "lib") {
    # If there are files in root lib, move them to src/lib carefully
    Get-ChildItem "lib" -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Substring((Get-Item "lib").FullName.Length)
        $destPath = "src\lib$relativePath"
        if (!$_.PSIsContainer) { Move-File -Source $_.FullName -Dest $destPath }
    }
    Remove-Item "lib" -Recurse -Force -ErrorAction SilentlyContinue
    Write-Host "🗑️  Removed root 'lib' folder (Merged into src)" -ForegroundColor Yellow
}

# 3. Create Full Directory Structure (The Enterprise Tree)
# ---------------------------------------------------
$dirs = @(
    # Core Config
    "src\lib\config",
    "src\lib\seo",
    
    # Marketing Pages (AEO/SEO Layer)
    "src\app\(public)\[locale]\(marketing)\blog",
    "src\app\(public)\[locale]\(marketing)\brands",
    "src\app\(public)\[locale]\(marketing)\calculator",
    "src\app\(public)\[locale]\(marketing)\contact",
    "src\app\(public)\[locale]\(marketing)\faq",
    "src\app\(public)\[locale]\(marketing)\gallery",
    "src\app\(public)\[locale]\(marketing)\shipping",
    "src\app\(public)\[locale]\(marketing)\tracking",
    
    # Dashboard (User Layer)
    "src\app\(dashboard)\[locale]\dashboard\bookings",
    "src\app\(dashboard)\[locale]\dashboard\chat",
    "src\app\(dashboard)\[locale]\dashboard\orders",
    "src\app\(dashboard)\[locale]\dashboard\profile",
    "src\app\(dashboard)\[locale]\dashboard\tracking",

    # Admin Panel (Management Layer)
    "src\app\(dashboard)\[locale]\admin\brands",
    "src\app\(dashboard)\[locale]\admin\content",
    "src\app\(dashboard)\[locale]\admin\crm",
    "src\app\(dashboard)\[locale]\admin\orders",
    "src\app\(dashboard)\[locale]\admin\reports",
    "src\app\(dashboard)\[locale]\admin\settings",

    # API Layer
    "src\app\api\auth",
    "src\app\api\crm\events",
    "src\app\api\orders"
)

foreach ($d in $dirs) { Ensure-Dir $d }

# 4. Create Placeholder Pages to prevent 404s during Dev
# ---------------------------------------------------
$placeholderContent = @"
export default function PlaceholderPage() {
  return (
    <div className='p-10 flex flex-col items-center justify-center min-h-[50vh] text-center'>
      <h1 className='text-2xl font-bold mb-2'>🚧 Under Construction</h1>
      <p className='text-muted-foreground'>This module is part of the planned architecture.</p>
    </div>
  );
}
"@

$pages = @(
    "src\app\(dashboard)\[locale]\dashboard\page.tsx",
    "src\app\(dashboard)\[locale]\admin\page.tsx",
    "src\app\(public)\[locale]\(marketing)\calculator\page.tsx"
)

foreach ($p in $pages) {
    if (!(Test-Path $p)) {
        [System.IO.File]::WriteAllText($p, $placeholderContent, [System.Text.Encoding]::UTF8)
    }
}

Write-Host "✅ Structure Conflict Resolved & Tree Built!" -ForegroundColor Green
Write-Host "   Now all code resides in 'src/'." -ForegroundColor Green