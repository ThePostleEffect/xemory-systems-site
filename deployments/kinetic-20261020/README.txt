Xemory Systems — approved homepage release, 2026-10-20

Archive: xemory-kinetic-20261020.tar.gz
SHA256: 54519ac5b6914f553ebe09f5b524ab1ba75c67ef579781fd539c8306fd090af9

Contains compiled static homepage, selected rebuildable source, dependency licenses, SHA256SUMS and reviewed deployment helper.

Scope: exact homepage / and assets /kinetic/ only. Existing Next application, routes, forms, private administration and analytics stay on port 3005. Navigation retains Home, The Lab, Create with us, About, Contact, Terms and Privacy.

Deploy from this immutable commit. Verify archive checksum and extracted SHA256SUMS before activation. site/ is the only public root; source/ and deploy/ stay outside it. Activation records a private Nginx backup and rollback script on the existing server and verifies preserved page responses.

This commit stores the approved artifact. Public deployment status is verified separately.
