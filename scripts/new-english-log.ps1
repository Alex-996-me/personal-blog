param(
    [string]$Date = (Get-Date -Format "yyyy-MM-dd")
)

$ErrorActionPreference = "Stop"

$Repo = Split-Path -Parent $PSScriptRoot
$Inbox = Join-Path $Repo ".english-inbox\$Date"
$Recordings = Join-Path $Inbox "recordings"

New-Item -ItemType Directory -Force -Path $Inbox | Out-Null
New-Item -ItemType Directory -Force -Path $Recordings | Out-Null

$Files = @(
    "brief.md",
    "source-title.txt",
    "source-url.txt",
    "transcript.txt",
    "distilled-reading.md",
    "expressions.md",
    "writing-original.md",
    "feedback.md",
    "writing-revised.md"
)

foreach ($Name in $Files) {
    $Path = Join-Path $Inbox $Name

    if (-not (Test-Path $Path)) {
        New-Item -ItemType File -Path $Path | Out-Null
    }
}

Write-Host ""
Write-Host "English workspace ready:"
Write-Host "  $Inbox"
Write-Host ""
Write-Host "INPUT"
Write-Host "  brief.md                  # what mattered, intended angle, constraints"
Write-Host "  source-title.txt"
Write-Host "  source-url.txt"
Write-Host "  transcript.txt"
Write-Host ""
Write-Host "LEARNING"
Write-Host "  distilled-reading.md"
Write-Host "  expressions.md"
Write-Host ""
Write-Host "OUTPUT"
Write-Host "  recordings\final.*"
Write-Host "  writing-original.md"
Write-Host "  feedback.md"
Write-Host "  writing-revised.md"
Write-Host ""
Write-Host "Next: attach this folder in Codex and invoke `$personal-blog-publisher."
Write-Host ""
