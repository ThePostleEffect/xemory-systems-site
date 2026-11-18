#!/bin/bash
set -euo pipefail
nginx -V 2>&1 | grep -q -- --with-http_sub_module
config=$(grep -l 'Xemory security page.*managed block' /etc/nginx/sites-enabled/* | head -n 1)
test -n "$config"
release=/var/www/xemory-security-20261118
curl -fsSL 'https://raw.githubusercontent.com/ThePostleEffect/xemory-systems-site/a33b3b5f7df233ec944121b6f882d31cb4edcc86/security-page/site-navigation.js' -o "$release/site-navigation.js"
chmod 644 "$release/site-navigation.js"
backup=$(mktemp -d /root/xemory-backups/security-navigation-XXXXXX)
cp -pL "$config" "$backup/nginx.conf"
python3 - "$config" <<'PY'
from pathlib import Path
import sys
p = Path(sys.argv[1])
s = p.read_text()
marker = "    # End Xemory security page\n"
directive = """    sub_filter '</body>' '<script defer src="/security/site-navigation.js"></script></body>';
"""
if directive not in s:
    if s.count(marker) != 1:
        raise SystemExit("Expected one security route marker")
    p.write_text(s.replace(marker, marker + directive))
PY
if ! nginx -t || ! systemctl reload nginx; then
  cp "$backup/nginx.conf" "$config"
  nginx -t && systemctl reload nginx
  exit 1
fi
