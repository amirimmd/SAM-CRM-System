# fix-design.ps1
$ErrorActionPreference = "Stop"

Write-Host "🔧 Starting Design Fix..." -ForegroundColor Cyan

# 1. DELETE THE CONFLICTING FILE
# ---------------------------------------------------
$conflictFile = "src\app\(public)\[locale]\page.tsx"
if (Test-Path $conflictFile) {
    Remove-Item -Path $conflictFile -Force
    Write-Host "✅ Deleted conflicting file: $conflictFile" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Conflict file not found (Good)." -ForegroundColor Gray
}

# 2. SETUP ROOT REDIRECT (localhost:3000 -> localhost:3000/fa)
# ---------------------------------------------------
$rootPagePath = "src\app\page.tsx"
$rootPageContent = @"
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/fa');
}
"@
[System.IO.File]::WriteAllText($rootPagePath, $rootPageContent, [System.Text.Encoding]::UTF8)
Write-Host "✅ Updated Root Redirect (src/app/page.tsx)" -ForegroundColor Green

# 3. ENSURE GLOBALS.CSS IS CORRECT (Tailwind 4 Setup)
# ---------------------------------------------------
$cssPath = "src\app\globals.css"
$cssContent = @"
@import 'tailwindcss';

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

@layer base {
  :root {
    --background: hsl(0 0% 100%);
    --foreground: hsl(20 14.3% 4.1%);
    --card: hsl(0 0% 100%);
    --card-foreground: hsl(20 14.3% 4.1%);
    --popover: hsl(0 0% 100%);
    --popover-foreground: hsl(20 14.3% 4.1%);
    --primary: hsl(45 93% 47%);
    --primary-foreground: hsl(26 83.3% 14.1%);
    --secondary: hsl(60 4.8% 95.9%);
    --secondary-foreground: hsl(24 9.8% 10%);
    --muted: hsl(60 4.8% 95.9%);
    --muted-foreground: hsl(25 5.3% 44.7%);
    --accent: hsl(60 4.8% 95.9%);
    --accent-foreground: hsl(24 9.8% 10%);
    --destructive: hsl(0 84.2% 60.2%);
    --destructive-foreground: hsl(60 9.1% 97.8%);
    --border: hsl(20 5.9% 90%);
    --input: hsl(20 5.9% 90%);
    --ring: hsl(45 93% 47%);
    --radius: 0.75rem;
  }
 
  .dark {
    --background: hsl(240 5% 3%);
    --foreground: hsl(45 20% 90%);
    --card: hsl(240 4% 8%);
    --card-foreground: hsl(45 20% 90%);
    --popover: hsl(240 5% 5%);
    --popover-foreground: hsl(45 20% 90%);
    --primary: hsl(46 100% 50%); 
    --primary-foreground: hsl(0 0% 0%);
    --secondary: hsl(240 4% 12%);
    --secondary-foreground: hsl(0 0% 98%);
    --muted: hsl(240 4% 12%);
    --muted-foreground: hsl(240 5% 60%);
    --accent: hsl(45 100% 50%);
    --accent-foreground: hsl(0 0% 0%);
    --destructive: hsl(0 62.8% 30.6%);
    --destructive-foreground: hsl(0 0% 98%);
    --border: hsl(240 4% 16%);
    --input: hsl(240 4% 16%);
    --ring: hsl(45 100% 50%);
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}
"@
[System.IO.File]::WriteAllText($cssPath, $cssContent, [System.Text.Encoding]::UTF8)
Write-Host "✅ Restored globals.css (Tailwind Config)" -ForegroundColor Green

Write-Host "🚀 Fixes Applied! Please restart your dev server:" -ForegroundColor Yellow
Write-Host "   1. Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host "   2. Remove-Item -Recurse -Force .next (Optional but recommended)" -ForegroundColor Yellow
Write-Host "   3. npm run dev" -ForegroundColor Yellow