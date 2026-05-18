export function renderHeader({
  brand,
  currentLocale,
  localeLabels,
  locales,
  navigation,
  onLocaleChange,
}) {
  const header = document.createElement('header');
  header.className = 'site-header';

  const inner = document.createElement('div');
  inner.className = 'site-header__inner';

  const logo = document.createElement('a');
  logo.className = 'site-header__brand';
  logo.href = '#home';
  logo.setAttribute('aria-label', brand.name);

  const logoName = document.createElement('span');
  logoName.className = 'site-header__brand-name';
  logoName.textContent = brand.name;

  const tagline = document.createElement('span');
  tagline.className = 'site-header__tagline';
  tagline.textContent = brand.tagline;

  logo.append(logoName, tagline);

  const nav = document.createElement('nav');
  nav.className = 'site-header__nav';
  nav.setAttribute('aria-label', 'Primary navigation');

  navigation.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.textContent = item.label;
    nav.append(link);
  });

  const languageGroup = document.createElement('div');
  languageGroup.className = 'site-header__languages';
  languageGroup.setAttribute('aria-label', 'Language');

  locales.forEach((locale) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'site-header__language-button';
    button.textContent = localeLabels[locale] ?? locale.toUpperCase();
    button.setAttribute('aria-pressed', String(locale === currentLocale));
    button.addEventListener('click', () => {
      if (locale !== currentLocale) {
        onLocaleChange(locale);
      }
    });

    languageGroup.append(button);
  });

  inner.append(logo, nav, languageGroup);
  header.append(inner);

  return header;
}
