# Bastion quick installer (Windows / PowerShell)
# Pulls the prebuilt deployment files for running Bastion from published
# images. If you want to modify the application itself, clone the full
# repository instead — see the README's "Build from Source" section.

$ErrorActionPreference = "Stop"

# TODO: confirm this is the correct org/repo — inferred from the
# ghcr.io/sk-py/bastion-web image path, not independently verified.
$RepoRawBase = "https://raw.githubusercontent.com/sk-py/bastion/main"
$InstallDir = "bastion"

Write-Host "Bastion installer"
Write-Host "=================="
Write-Host ""

# --- Preflight checks: fail clearly now, not with a confusing error later ---
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Write-Error "Docker is not installed. Install Docker Desktop first: https://docs.docker.com/desktop/install/windows-install/"
    exit 1
}

try {
    docker compose version | Out-Null
} catch {
    Write-Error "Docker Compose (v2) is not available. Update Docker Desktop: https://docs.docker.com/compose/install/"
    exit 1
}

# --- Set up the install directory ---
if (Test-Path $InstallDir) {
    Write-Host "Directory '.\$InstallDir' already exists — updating deployment files in place."
} else {
    New-Item -ItemType Directory -Path $InstallDir | Out-Null
    Write-Host "Created .\$InstallDir"
}

Set-Location $InstallDir

# --- Fetch the latest deployment files ---
Write-Host "Fetching docker-compose.yaml..."
Invoke-WebRequest -Uri "$RepoRawBase/docker-compose.yaml" -OutFile "docker-compose.yaml"

Write-Host "Fetching .env.example..."
Invoke-WebRequest -Uri "$RepoRawBase/.env.example" -OutFile ".env.example"

# --- Prepare .env, never overwriting an existing one ---
if (Test-Path ".env") {
    Write-Host ".env already exists — leaving your existing configuration untouched."
} else {
    Copy-Item ".env.example" ".env"
    Write-Host "Created .env from the example file."

    # ENCRYPTION_KEY must be exactly 32 raw bytes, hex-encoded (64 hex
    # characters) — matches encryption.ts's validation exactly.
    $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()

    $encBytes = New-Object byte[] 32
    $rng.GetBytes($encBytes)
    $encKey = ($encBytes | ForEach-Object { $_.ToString("x2") }) -join ""

    # Replace the example Postgres password everywhere it appears
    # (POSTGRES_PASSWORD and inside DATABASE_URL) with a random one.
    $pgBytes = New-Object byte[] 16
    $rng.GetBytes($pgBytes)
    $pgPassword = ($pgBytes | ForEach-Object { $_.ToString("x2") }) -join ""

    (Get-Content ".env") |
        ForEach-Object { $_ -replace '^ENCRYPTION_KEY=.*', "ENCRYPTION_KEY=$encKey" } |
        ForEach-Object { $_ -replace 'bastion_password', $pgPassword } |
        Set-Content ".env"

    Write-Host "Generated a random ENCRYPTION_KEY and database password."
}

Write-Host ""
Write-Host "Setup files are ready in .\$InstallDir"
Write-Host ""
Write-Host "Next steps:"
Write-Host "  1. cd $InstallDir"
Write-Host "  2. Review .env and fill in anything still blank (notepad .env)"
Write-Host "  3. docker compose up -d"
Write-Host ""
Write-Host "Bastion will then be reachable at http://127.0.0.1:18401 on this machine by default."
Write-Host "(It is not exposed to your network by default — see the README's"
Write-Host "'Deployment & Network Access' section for how to reach it remotely.)"
