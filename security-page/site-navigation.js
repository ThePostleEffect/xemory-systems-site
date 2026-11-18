(() => {
  const selectors = ['header nav', '#core-menu', 'header [role="navigation"]'];
  function addLinks() {
    for (const menu of document.querySelectorAll(selectors.join(','))) {
      if (menu.closest('#inquiry') || menu.querySelector('a[href="/security/"]')) continue;
      const links = [...menu.querySelectorAll('a')];
      const reference = links.find(link => link.textContent.trim() === 'About')
        || links.find(link => link.textContent.trim() === 'Contact')
        || links.at(-1);
      if (!reference) continue;
      const link = document.createElement('a');
      link.href = '/security/';
      link.textContent = 'Security';
      if (reference.parentElement.tagName === 'LI') {
        const item = document.createElement('li');
        item.append(link);
        reference.parentElement.before(item);
      } else {
        reference.before(link);
      }
    }
  }
  if (location.pathname.startsWith('/security/') || location.pathname.startsWith('/kinetic-playground/playground/')) return;
  const observer = new MutationObserver(addLinks);
  observer.observe(document.body, {childList: true, subtree: true});
  addLinks();
})();