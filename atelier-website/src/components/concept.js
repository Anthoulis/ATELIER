export function renderConcept(content) {
  const section = document.createElement('section');
  section.id = 'concept';
  section.className = 'concept-section page-section';

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

  const list = document.createElement('div');
  list.className = 'concept-section__grid';

  content.points.forEach((point) => {
    const card = document.createElement('article');
    card.className = 'concept-card';

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = point.title;

    const cardBody = document.createElement('p');
    cardBody.textContent = point.body;

    card.append(cardTitle, cardBody);
    list.append(card);
  });

  inner.append(header, list);
  section.append(inner);

  return section;
}
