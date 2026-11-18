#!/usr/bin/env bash
set -euo pipefail

release="/var/www/xemory-security-20261118"
backup="/root/xemory-backups/security-route-fix-20261118T$(date -u +%H%M%SZ)"
config="$(grep -lE 'server_name[^;]*xemorysystems\.com' /etc/nginx/sites-enabled/* | head -n 1)"
mkdir -p "$backup"
cp -a "$config" "$backup/nginx.conf"

python3 - "$config" "$release" <<'PY'
from pathlib import Path
import re, sys

path = Path(sys.argv[1])
release = sys.argv[2]
text = path.read_text()
text = text.replace(
    f"    location = /security/ {{ alias {release}/index.html; }}",
    f"    location = /security/ {{ root {release}; rewrite ^ /index.html break; }}",
)
path.write_text(text)
PY

if ! nginx -t; then
  cp -a "$backup/nginx.conf" "$config"
  nginx -t
  exit 1
fi
systemctl reload nginx

