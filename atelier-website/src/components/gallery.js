export function renderGallery(content) {
  const section = document.createElement('section');
  section.id = 'gallery';
  section.className = 'gallery-section page-section';

  const inner = document.createElement('div');
  inner.className = 'section-inner';

  const header = document.createElement('div');
  header.className = 'site-section-heading';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'site-section-eyebrow';
  eyebrow.textContent = content.eyebrow;

  const title = document.createElement('h2');
  title.textContent = content.title;

  const body = document.createElement('p');
  body.textContent = content.body;

  header.append(eyebrow, title, body);

  const grid = document.createElement('div');
  grid.className = 'gallery-section__grid';

  content.items.forEach((item) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';

    const media = document.createElement('div');
    media.className = 'gallery-item__media';
    media.setAttribute('aria-hidden', 'true');

    const caption = document.createElement('figcaption');
    caption.textContent = item.label;

    figure.append(media, caption);
    grid.append(figure);
  });

  inner.append(header, grid);
  section.append(inner);

  return section;
}
