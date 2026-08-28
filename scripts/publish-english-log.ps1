param(
    [Parameter(Mandatory = $true)]
    [int]$Minutes,

    [string]$Date = (Get-Date -Format "yyyy-MM-dd")
)

$ErrorActionPreference = "Stop"

$Repo = Split-Path -Parent $PSScriptRoot
$Inbox = Join-Path $Repo ".english-inbox\$Date"
$Recordings = Join-Path $Inbox "recordings"

if (-not (Test-Path $Inbox)) {
    throw "English inbox not found: $Inbox"
}

$RequiredFiles = @(
    "source-title.txt",
    "source-url.txt",
    "distilled-reading.md",
    "expressions.md",
    "writing-original.md",
    "feedback.md",
    "writing-revised.md"
)

foreach ($Name in $RequiredFiles) {
    $Path = Join-Path $Inbox $Name

    if (-not (Test-Path $Path)) {
        throw "Missing required file: $Name"
    }

    if ((Get-Item $Path).Length -eq 0) {
        throw "Required file is empty: $Name"
    }
}

function Read-Text {
    param([string]$Name)

    $Path = Join-Path $Inbox $Name
    return [System.IO.File]::ReadAllText(
        $Path,
        [System.Text.Encoding]::UTF8
    ).Trim()
}

function Remove-TopHeading {
    param([string]$Text)

    return [regex]::Replace(
        $Text,
        '^\s*# [^\r\n]+\r?\n+',
        ''
    ).Trim()
}

$SourceTitle = Read-Text "source-title.txt"
$SourceUrl = Read-Text "source-url.txt"

$Distilled = Remove-TopHeading (Read-Text "distilled-reading.md")
$Expressions = Remove-TopHeading (Read-Text "expressions.md")
$Original = Remove-TopHeading (Read-Text "writing-original.md")
$Feedback = Remove-TopHeading (Read-Text "feedback.md")
$Revised = Remove-TopHeading (Read-Text "writing-revised.md")

$Audio = Get-ChildItem $Recordings -File |
    Where-Object { $_.BaseName -eq "final" } |
    Select-Object -First 1

if (-not $Audio) {
    throw "No final recording found. Expected recordings\final.*"
}

$AudioExt = $Audio.Extension.ToLowerInvariant()

$MimeType = switch ($AudioExt) {
    ".m4a" { "audio/mp4" }
    ".mp3" { "audio/mpeg" }
    ".wav" { "audio/wav" }
    ".ogg" { "audio/ogg" }
    default { "audio/mpeg" }
}

$AudioDir = Join-Path $Repo "public\audio\english\$Date"
New-Item -ItemType Directory -Force -Path $AudioDir | Out-Null

$AudioTarget = Join-Path $AudioDir "speaking$AudioExt"
Copy-Item $Audio.FullName $AudioTarget -Force

$PostsDir = Join-Path $Repo "src\content\posts"
$PostName = "english-$Date-${Minutes}min.md"
$PostPath = Join-Path $PostsDir $PostName

if (Test-Path $PostPath) {
    throw "Post already exists: $PostName"
}

$YoutubeLine = ""

if ($SourceUrl -match 'youtube\.com|youtu\.be') {
    $YoutubeLine = "youtube: `"$SourceUrl`""
}

$FrontmatterLines = @(
    "---",
    "title: `"$Date · $Minutes min`"",
    "date: `"$Date`"",
    "updated: `"$Date`"",
    "category: `"自学`"",
    "tags:",
    "  - `"English`"",
    "  - `"英语学习`"",
    "  - `"Daily Practice`"",
    "description: `"$Date English learning practice · $Minutes minutes.`""
)

if ($YoutubeLine) {
    $FrontmatterLines += $YoutubeLine
}

$FrontmatterLines += @(
    "series: `"English Learning`"",
    "---"
)

$Frontmatter = $FrontmatterLines -join "`n"

$AudioUrl = "/audio/english/$Date/speaking$AudioExt"

$Post = @"
$Frontmatter

## Source

**[$SourceTitle]($SourceUrl)**

## Distilled Reading

$Distilled

## Expressions to Internalize

$Expressions

## Speaking Practice

<audio controls preload="metadata">
  <source src="$AudioUrl" type="$MimeType">
</audio>

## My Writing

$Original

## Feedback & Revision

### Feedback

$Feedback

### Revised Version

$Revised
"@

$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

[System.IO.File]::WriteAllText(
    $PostPath,
    $Post,
    $Utf8NoBom
)

Write-Host ""
Write-Host "PASS: English post generated"
Write-Host ""
Write-Host "Post:"
Write-Host "  $PostPath"
Write-Host ""
Write-Host "Audio:"
Write-Host "  $AudioTarget"
Write-Host ""
Write-Host "Next:"
Write-Host "  npm run build"
Write-Host ""
