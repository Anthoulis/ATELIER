export function renderMenuSection({ categories, content }) {
  const section = document.createElement('section');
  section.id = 'menu';
  section.className = 'menu-section page-section';

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

  const categoryList = document.createElement('div');
  categoryList.className = 'menu-section__categories';

  categories.forEach((category) => {
    const categoryBlock = document.createElement('section');
    categoryBlock.className = 'menu-category';
    categoryBlock.setAttribute('aria-labelledby', `${category.id}-title`);

    const categoryHeader = document.createElement('div');
    categoryHeader.className = 'menu-category__header';

    const categoryTitle = document.createElement('h3');
    categoryTitle.id = `${category.id}-title`;
    categoryTitle.textContent = category.title;

    const categoryDescription = document.createElement('p');
    categoryDescription.textContent = category.description;

    categoryHeader.append(categoryTitle, categoryDescription);

    const itemList = document.createElement('div');
    itemList.className = 'menu-category__items';

    category.items.forEach((item) => {
      itemList.append(renderMenuItem(item));
    });

    categoryBlock.append(categoryHeader, itemList);
    categoryList.append(categoryBlock);
  });

  inner.append(header, categoryList);
  section.append(inner);

  return section;
}

function renderMenuItem(item) {
  const card = document.createElement('article');
  card.className = 'menu-card';

  const header = document.createElement('div');
  header.className = 'menu-card__header';

  const name = document.createElement('h4');
  name.textContent = item.name;

  const price = document.createElement('span');
  price.className = 'menu-card__price';
  price.textContent = item.price;

  const description = document.createElement('p');
  description.textContent = item.description;

  header.append(name, price);
  card.append(header, description);

  return card;
}
