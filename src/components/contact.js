export function renderContact(content) {
  const section = document.createElement('section');
  section.id = 'contact';
  section.className = 'contact-section page-section';

  const inner = document.createElement('div');
  inner.className = 'contact-section__inner section-inner';

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

  const details = document.createElement('div');
  details.className = 'contact-section__details';

  content.details.forEach((detail) => {
    const item = document.createElement('div');
    item.className = 'contact-detail';

    const label = document.createElement('p');
    label.className = 'contact-detail__label';
    label.textContent = detail.label;

    const value = document.createElement('p');
    value.textContent = detail.value;

    item.append(label, value);
    details.append(item);
  });

  inner.append(header, details);
  section.append(inner);

  return section;
}
