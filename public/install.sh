#!/bin/sh
# Bastion quick installer — pulls the prebuilt deployment files (compose +
# env example) for running Bastion from published images. If you want to
# modify the application itself (theme, logos, functionality), clone the
# full repository instead — see the README's "Build from Source" section.
set -eu

# TODO: confirm this is the correct org/repo — inferred from the
# ghcr.io/sk-py/bastion-web image path, not independently verified.
REPO_RAW_BASE="https://raw.githubusercontent.com/sk-py/bastion/main"
INSTALL_DIR="bastion"

echo "Bastion installer"
echo "=================="
echo

# --- Preflight checks: fail clearly now, not with a confusing error later ---
if ! command -v docker >/dev/null 2>&1; then
  echo "Error: Docker is not installed." >&2
  echo "Install it first: https://docs.docker.com/get-docker/" >&2
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Error: Docker Compose (v2 plugin) is not available." >&2
  echo "See: https://docs.docker.com/compose/install/" >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "Error: curl is required but was not found." >&2
  exit 1
fi

# --- Set up the install directory ---
if [ -d "$INSTALL_DIR" ]; then
  echo "Directory './$INSTALL_DIR' already exists — updating deployment files in place."
else
  mkdir "$INSTALL_DIR"
  echo "Created ./$INSTALL_DIR"
fi

cd "$INSTALL_DIR"

# --- Fetch the latest deployment files ---
echo "Fetching docker-compose.yaml..."
curl -fsSL -o docker-compose.yaml "$REPO_RAW_BASE/docker-compose.yaml"

echo "Fetching .env.example..."
curl -fsSL -o .env.example "$REPO_RAW_BASE/.env.example"

# --- Prepare .env, never overwriting an existing one ---
if [ -f .env ]; then
  echo ".env already exists — leaving your existing configuration untouched."
else
  cp .env.example .env
  echo "Created .env from the example file."

  if command -v openssl >/dev/null 2>&1; then
    # ENCRYPTION_KEY must be exactly 32 raw bytes, hex-encoded (64 hex
    # characters) — this matches encryption.ts's validation exactly.
    GENERATED_ENC_KEY=$(openssl rand -hex 32)
    sed "s/^ENCRYPTION_KEY=.*/ENCRYPTION_KEY=$GENERATED_ENC_KEY/" .env > .env.tmp && mv .env.tmp .env
    echo "Generated a random ENCRYPTION_KEY."

    # Replace the example Postgres password everywhere it appears
    # (POSTGRES_PASSWORD and inside DATABASE_URL) with a random one, so a
    # real deployment never runs on the documented example credential.
    GENERATED_PG_PASSWORD=$(openssl rand -hex 16)
    sed "s/bastion_password/$GENERATED_PG_PASSWORD/g" .env > .env.tmp && mv .env.tmp .env
    echo "Generated a random database password."
  else
    echo "Warning: openssl not found — you must manually set ENCRYPTION_KEY" >&2
    echo "and change the default database password in .env before starting." >&2
  fi
fi

echo
echo "Setup files are ready in ./$INSTALL_DIR"
echo
echo "Next steps:"
echo "  1. cd $INSTALL_DIR"
echo "  2. Review .env and fill in anything still blank (nano .env)"
echo "  3. docker compose up -d"
echo
echo "Bastion will then be reachable at http://127.0.0.1:\${WEB_PORT:-18401} on this machine."
echo "(It is not exposed to your network by default — see the README's"
echo "'Deployment & Network Access' section for how to reach it remotely.)"
