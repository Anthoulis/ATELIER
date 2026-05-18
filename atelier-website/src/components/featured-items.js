export function renderFeaturedItems({ content, items }) {
  const section = document.createElement('section');
  section.id = 'featured';
  section.className = 'featured-section page-section';

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
  grid.className = 'featured-section__grid';

  items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'menu-card';

    const category = document.createElement('p');
    category.className = 'menu-card__category';
    category.textContent = item.categoryTitle;

    const name = document.createElement('h3');
    name.textContent = item.name;

    const description = document.createElement('p');
    description.textContent = item.description;

    card.append(category, name, description);
    grid.append(card);
  });

  inner.append(header, grid);
  section.append(inner);

  return section;
}
