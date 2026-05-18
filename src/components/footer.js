export function renderFooter(content) {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  const inner = document.createElement('div');
  inner.className = 'site-footer__inner';

  const brand = document.createElement('p');
  brand.textContent = content.brandLine;

  const note = document.createElement('p');
  note.textContent = content.note;

  inner.append(brand, note);
  footer.append(inner);

  return footer;
}
