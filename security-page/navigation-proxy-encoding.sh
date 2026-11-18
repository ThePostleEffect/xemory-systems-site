#!/bin/bash
set -euo pipefail
config=$(grep -l 'Xemory security page.*managed block' /etc/nginx/sites-enabled/* | head -n 1)
backup=$(mktemp -d /root/xemory-backups/security-nav-encoding-XXXXXX)
cp -pL "$config" "$backup/nginx.conf"
python3 - "$config" <<'PY'
from pathlib import Path
import re, sys
p = Path(sys.argv[1])
s = p.read_text()
def amend(m):
    block = m.group()
    if 'proxy_pass ' not in block or 'proxy_set_header Host ' not in block or 'proxy_set_header Accept-Encoding' in block:
        return block
    return re.sub(r'(?m)^(\s*)proxy_set_header Host ([^;]+);', r'\1proxy_set_header Host \2;\n\1proxy_set_header Accept-Encoding "";', block, count=1)
updated = re.sub(r'(?m)^([ \t]*)location\b[^\n{]*\{[\s\S]*?^\1\}', amend, s)
if updated == s:
    raise SystemExit('No eligible proxy location')
p.write_text(updated)
PY
if ! nginx -t || ! systemctl reload nginx; then
  cp "$backup/nginx.conf" "$config"
  nginx -t && systemctl reload nginx
  exit 1
fi
