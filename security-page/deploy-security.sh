#!/usr/bin/env bash
set -euo pipefail

release="/var/www/xemory-security-20261118"
backup="/root/xemory-backups/security-20261118T$(date -u +%H%M%SZ)"
base="https://raw.githubusercontent.com/ThePostleEffect/xemory-systems-site/security-page-2026-11-18/security-page"

mkdir -p "$release" "$backup"
curl -fsSL "$base/index.html" -o "$release/index.html"
curl -fsSL "$base/style.css" -o "$release/style.css"
curl -fsSL "$base/page.js" -o "$release/page.js"
curl -fsSL "https://www.xemorysystems.com/kinetic/assets/xemory-emblem.webp" -o "$release/xemory-emblem.webp"
chmod -R a=rX "$release"

config="$(grep -lE 'server_name[^;]*xemorysystems\.com' /etc/nginx/sites-enabled/* | head -n 1)"
if [[ -z "$config" ]]; then
  echo "No Xemory nginx configuration found" >&2
  exit 1
fi

cp -a "$config" "$backup/nginx.conf"
cp -a "$release" "$backup/release"

python3 - "$config" "$release" <<'PY'
from pathlib import Path
import re, sys

path = Path(sys.argv[1])
release = sys.argv[2]
text = path.read_text()
begin = "    # Xemory security page — managed block\n"
end = "    # End Xemory security page\n"
text = re.sub(re.escape(begin) + r".*?" + re.escape(end), "", text, flags=re.S)

blocks = []
for match in re.finditer(r"\bserver\s*\{", text):
    start = match.start()
    depth = 0
    for index in range(match.end() - 1, len(text)):
        if text[index] == "{": depth += 1
        elif text[index] == "}":
            depth -= 1
            if depth == 0:
                blocks.append((start, index))
                break

target = None
for start, end_pos in blocks:
    block = text[start:end_pos + 1]
    if re.search(r"server_name[^;]*xemorysystems\.com", block) and re.search(r"listen\s+(?:\[[^]]+\]:)?443\b|ssl_certificate", block):
        target = (start, end_pos)
        break
if target is None:
    raise SystemExit("No HTTPS Xemory server block found")

snippet = (
    "\n" + begin
    + "    location = /security { return 301 /security/; }\n"
    + f"    location = /security/ {{ alias {release}/index.html; }}\n"
    + f"    location ^~ /security/ {{ alias {release}/; }}\n"
    + end
)
insert_at = target[1]
path.write_text(text[:insert_at] + snippet + text[insert_at:])
PY

if ! nginx -t; then
  cp -a "$backup/nginx.conf" "$config"
  nginx -t
  exit 1
fi

systemctl reload nginx
printf '%s\n' "$release" > "$backup/active-release.txt"
printf 'deployed=%s\nconfig=%s\nrelease=%s\nbackup=%s\n' "$(date -u +%FT%TZ)" "$config" "$release" "$backup" > /root/xemory-security-deployment.txt

