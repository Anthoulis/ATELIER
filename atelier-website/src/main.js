import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/utilities.css';

import {
  getInitialLocale,
  isSupportedLocale,
  loadLocaleContent,
  persistLocale,
  setDocumentLocale,
} from './i18n.js';
import { getFeaturedMenuItems, normalizeMenuCategories } from './menu.js';
import { renderConcept } from './components/concept.js';
import { renderContact } from './components/contact.js';
import { renderFeaturedItems } from './components/featured-items.js';
import { renderFooter } from './components/footer.js';
import { renderGallery } from './components/gallery.js';
import { renderHeader } from './components/header.js';
import { renderHero } from './components/hero.js';
import { renderMenuSection } from './components/menu-section.js';

const SUPPORTED_LOCALES = ['en', 'el'];
const DEFAULT_LOCALE = 'en';

const appRoot = document.querySelector('#app');

async function renderPage(locale) {
  const selectedLocale = isSupportedLocale(locale, SUPPORTED_LOCALES)
    ? locale
    : DEFAULT_LOCALE;

  try {
    const content = await loadLocaleContent(selectedLocale);
    const menuCategories = normalizeMenuCategories(content.menu?.categories ?? []);
    const featuredItems = getFeaturedMenuItems(menuCategories);

    persistLocale(selectedLocale);
    setDocumentLocale(selectedLocale, content.meta);

    const shell = document.createElement('div');
    shell.className = 'site-shell';

    shell.append(
      renderHeader({
        brand: content.brand,
        currentLocale: selectedLocale,
        localeLabels: content.locales,
        locales: SUPPORTED_LOCALES,
        navigation: content.navigation,
        onLocaleChange: renderPage,
      }),
    );

    const main = document.createElement('main');
    main.id = 'main-content';
    main.className = 'page-main';
    main.tabIndex = -1;

    main.append(
      renderHero(content.hero),
      renderConcept(content.concept),
      renderFeaturedItems({
        content: content.featured,
        items: featuredItems,
      }),
      renderMenuSection({
        categories: menuCategories,
        content: content.menu,
      }),
      renderGallery(content.gallery),
      renderContact(content.contact),
    );

    shell.append(main, renderFooter(content.footer));
    appRoot.replaceChildren(shell);
  } catch (error) {
    renderLoadError(error);
  }
}

function renderLoadError(error) {
  console.error(error);

  const section = document.createElement('section');
  section.className = 'page-section load-error-section';
  section.setAttribute('aria-live', 'polite');

  const inner = document.createElement('div');
  inner.className = 'section-inner';

  const title = document.createElement('h1');
  title.textContent = 'ATELIER';

  const message = document.createElement('p');
  message.textContent =
    'The site content could not be loaded. Please check the content files and try again.';

  inner.append(title, message);
  section.append(inner);
  appRoot.replaceChildren(section);
}

const initialLocale = getInitialLocale(SUPPORTED_LOCALES, DEFAULT_LOCALE);
renderPage(initialLocale);
