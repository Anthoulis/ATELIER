export function renderHero(content) {
  const section = document.createElement('section');
  section.id = 'home';
  section.className = 'hero-section page-section';

  const inner = document.createElement('div');
  inner.className = 'hero-section__inner section-inner';

  const copy = document.createElement('div');
  copy.className = 'hero-section__copy';

  const eyebrow = document.createElement('p');
  eyebrow.className = 'site-section-eyebrow';
  eyebrow.textContent = content.eyebrow;

  const title = document.createElement('h1');
  title.className = 'hero-section__title';
  title.textContent = content.title;

  const body = document.createElement('p');
  body.className = 'hero-section__body';
  body.textContent = content.body;

  const actions = document.createElement('div');
  actions.className = 'hero-section__actions';

  actions.append(
    createActionLink(content.primaryCta, 'site-button site-button--primary'),
    createActionLink(content.secondaryCta, 'site-button site-button--secondary'),
  );

  copy.append(eyebrow, title, body, actions);

  const media = document.createElement('div');
  media.className = 'hero-section__media';
  media.setAttribute('aria-hidden', 'true');

  inner.append(copy, media);
  section.append(inner);

  return section;
}

function createActionLink(action, className) {
  const link = document.createElement('a');
  link.className = className;
  link.href = action.href;
  link.textContent = action.label;
  return link;
}
