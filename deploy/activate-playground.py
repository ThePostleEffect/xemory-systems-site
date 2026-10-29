import pathlib, shutil, subprocess, sys, datetime
cfg=pathlib.Path('/etc/nginx/sites-available/xemorysystems')
old='/var/www/xemory-vault-20261024/site'
release=pathlib.Path('/var/www/xemory-playground-20261028')
stage=pathlib.Path('/tmp/xemory-playground-stage')
text=cfg.read_text()
assert text.count(old)==2 and text.count('# End Xemory kinetic homepage')==1 and '/kinetic-playground/' not in text
assert not release.exists() and (stage/'homepage/index.html').is_file() and (stage/'kinetic-playground/playground/index.html').is_file()
backup=pathlib.Path('/root/xemory-backups/playground-'+datetime.datetime.now().strftime('%Y%m%dT%H%M%S'))
backup.mkdir(parents=True)
shutil.copy2(cfg,backup/'nginx.conf')
release.mkdir()
shutil.copytree(old,release/'site')
shutil.copytree(stage/'homepage',release/'site',dirs_exist_ok=True)
shutil.copytree(stage/'kinetic-playground',release/'playground')
new=text.replace(old,str(release/'site'))
new=new.replace('# End Xemory kinetic homepage',f'''    location = /kinetic-playground {{ return 301 /kinetic-playground/; }}
    location ^~ /kinetic-playground/ {{
        alias {release}/playground/;
        index index.html;
        autoindex off;
        add_header Cache-Control "no-cache" always;
        add_header X-Content-Type-Options "nosniff" always;
    }}
# End Xemory kinetic homepage''')
cfg.write_text(new)
if subprocess.run(['nginx','-t']).returncode:
    shutil.copy2(backup/'nginx.conf',cfg); sys.exit('nginx validation failed; original config restored')
if subprocess.run(['systemctl','reload','nginx']).returncode:
    shutil.copy2(backup/'nginx.conf',cfg); subprocess.run(['systemctl','reload','nginx']); sys.exit('reload failed; original config restored')
print('DEPLOYED',release,'BACKUP',backup)

