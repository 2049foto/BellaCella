# Cai dat config Claude Code cap project cho repo BELLA CELLA.
# Chi tac dong trong repo nay. KHONG ghi vao ~/.claude.
# Chay: mo PowerShell tai thu muc repo, go:  .\claude-setup\install.ps1

$repo = Split-Path -Parent $PSScriptRoot
$skillDir = Join-Path $repo ".claude\skills\bella-acceptance"

New-Item -ItemType Directory -Force -Path $skillDir | Out-Null

Copy-Item (Join-Path $PSScriptRoot "settings.json") `
          (Join-Path $repo ".claude\settings.json") -Force

Copy-Item (Join-Path $PSScriptRoot "bella-acceptance.SKILL.md") `
          (Join-Path $skillDir "SKILL.md") -Force

Write-Host ""
Write-Host "Da tao:" -ForegroundColor Green
Write-Host "  .claude\settings.json"
Write-Host "  .claude\skills\bella-acceptance\SKILL.md"
Write-Host ""
Write-Host "Buoc tiep theo (TAT phien Claude Code kia truoc khi cai plugin):" -ForegroundColor Yellow
Write-Host "  1. cd vao repo nay roi mo Claude Code"
Write-Host "  2. /plugin marketplace update"
Write-Host "  3. /plugin install example-skills@anthropic-skills"
Write-Host "  4. /skills   -- kiem tra skill nao da load"
Write-Host ""
