import { getNestedValue, readStoredValue, writeStoredValue } from "./dom-utils.js?v=20260718-2";

export const DEFAULT_LANGUAGE = "en";
export const SUPPORTED_LANGUAGES = ["en", "el"];
export const LANGUAGE_STORAGE_KEY = "atelier-language";

const siteContentCache = new Map();

export function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
}

export function getStoredLanguage() {
  return normalizeLanguage(readStoredValue(LANGUAGE_STORAGE_KEY));
}

export function storeLanguage(language) {
  writeStoredValue(LANGUAGE_STORAGE_KEY, normalizeLanguage(language));
}

export async function loadSiteContent(language) {
  const requestedLanguage = normalizeLanguage(language);

  /*
   * English loads first so every locale has both file-level fallback here and
   * per-key fallback through getTranslation().
   */
  const fallbackContent = await fetchSiteContent(DEFAULT_LANGUAGE);

  if (requestedLanguage === DEFAULT_LANGUAGE) {
    return {
      content: fallbackContent,
      fallbackContent,
      language: DEFAULT_LANGUAGE,
      requestedLanguage
    };
  }

  try {
    return {
      content: await fetchSiteContent(requestedLanguage),
      fallbackContent,
      language: requestedLanguage,
      requestedLanguage
    };
  } catch (error) {
    return {
      content: fallbackContent,
      fallbackContent,
      language: DEFAULT_LANGUAGE,
      requestedLanguage
    };
  }
}

export function getTranslation(siteContent, key) {
  const value = getNestedValue(siteContent.content, key);

  if (typeof value === "string") {
    return value;
  }

  const fallbackValue = getNestedValue(siteContent.fallbackContent, key);
  return typeof fallbackValue === "string" ? fallbackValue : null;
}

export function applyStaticTranslations(siteContent, languageButtons) {
  document.documentElement.lang = siteContent.language;
  document.documentElement.dataset.language = siteContent.language;
  const metaNamespace = document.documentElement.dataset.metaNamespace || "meta";

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const translatedValue = getTranslation(siteContent, element.dataset.i18n);

    if (translatedValue) {
      element.textContent = translatedValue;
    }
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
    const translatedValue = getTranslation(siteContent, element.dataset.i18nAriaLabel);

    if (translatedValue) {
      element.setAttribute("aria-label", translatedValue);
    }
  });

  updateMetaTag("description", getTranslation(siteContent, `${metaNamespace}.description`));
  updateMetaProperty("og:title", getTranslation(siteContent, `${metaNamespace}.ogTitle`));
  updateMetaProperty("og:description", getTranslation(siteContent, `${metaNamespace}.ogDescription`));

  const title = getTranslation(siteContent, `${metaNamespace}.title`);

  if (title) {
    document.title = title;
  }

  languageButtons.forEach(function (button) {
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.languageButton === siteContent.language)
    );
  });
}

async function fetchSiteContent(language) {
  if (siteContentCache.has(language)) {
    return siteContentCache.get(language);
  }

  const response = await fetch(`assets/content/site.${language}.json`);

  if (!response.ok) {
    throw new Error(`Site content request failed: ${response.status}`);
  }

  const siteContent = await response.json();

  if (!siteContent || typeof siteContent !== "object") {
    throw new Error("Site content is invalid.");
  }

  siteContentCache.set(language, siteContent);
  return siteContent;
}

function updateMetaTag(name, content) {
  const element = document.querySelector(`meta[name="${name}"]`);

  if (element && content) {
    element.setAttribute("content", content);
  }
}

function updateMetaProperty(property, content) {
  const element = document.querySelector(`meta[property="${property}"]`);

  if (element && content) {
    element.setAttribute("content", content);
  }
}
