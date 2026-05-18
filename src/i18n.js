const LOCALE_STORAGE_KEY = 'atelier.locale';

export async function loadLocaleContent(locale) {
  const contentUrl = `${import.meta.env.BASE_URL}content/${locale}.json`;
  const response = await fetch(contentUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Unable to load locale "${locale}".`);
  }

  return response.json();
}

export function getInitialLocale(supportedLocales, fallbackLocale) {
  const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);

  if (isSupportedLocale(savedLocale, supportedLocales)) {
    return savedLocale;
  }

  const browserLocale = navigator.language?.split('-')[0];

  if (isSupportedLocale(browserLocale, supportedLocales)) {
    return browserLocale;
  }

  return fallbackLocale;
}

export function isSupportedLocale(locale, supportedLocales) {
  return Boolean(locale && supportedLocales.includes(locale));
}

export function persistLocale(locale) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function setDocumentLocale(locale, meta = {}) {
  document.documentElement.lang = locale;
  document.title = meta.title ?? 'ATELIER';

  const description = document.querySelector('meta[name="description"]');

  if (description && meta.description) {
    description.setAttribute('content', meta.description);
  }
}
