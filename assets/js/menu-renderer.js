import { DEFAULT_LANGUAGE, getTranslation, normalizeLanguage } from "./i18n.js?v=20260719-1";
import { createElement } from "./dom-utils.js?v=20260719-1";

const menuContentCache = new Map();
let menuRenderRequestId = 0;

export async function renderMenuForLanguage(language, siteContent, targets) {
  if (!targets.menuRoot) {
    return;
  }

  const requestId = ++menuRenderRequestId;
  setMenuStatus(targets.statusElement, getTranslation(siteContent, "menu.loading"));

  try {
    const menuContent = await getMenuContent(language);

    // Discard menu results from language requests superseded while the fetch was pending.
    if (requestId !== menuRenderRequestId) {
      return;
    }

    clearMenuStatus(targets.statusElement);
    targets.menuRoot.lang = menuContent.language;
    renderMenu(targets.menuRoot, menuContent.menu, siteContent);
  } catch {
    // A stale failure must not clear a newer successful menu render.
    if (requestId !== menuRenderRequestId) {
      return;
    }

    targets.menuRoot.removeAttribute("lang");
    targets.menuRoot.replaceChildren();
    setMenuStatus(targets.statusElement, getTranslation(siteContent, "menu.unavailable"));
  }
}

async function getMenuContent(language) {
  const requestedLanguage = normalizeLanguage(language);

  try {
    return {
      language: requestedLanguage,
      menu: await fetchMenuContent(requestedLanguage)
    };
  } catch {
    if (requestedLanguage !== DEFAULT_LANGUAGE) {
      return {
        language: DEFAULT_LANGUAGE,
        menu: await fetchMenuContent(DEFAULT_LANGUAGE)
      };
    }

    throw error;
  }
}

async function fetchMenuContent(language) {
  if (menuContentCache.has(language)) {
    return menuContentCache.get(language);
  }

  const response = await fetch(`assets/content/menu.${language}.json?v=20260719-1`);

  if (!response.ok) {
    throw new Error(`Menu request failed: ${response.status}`);
  }

  const menu = await response.json();
  validateMenuShape(menu);
  menuContentCache.set(language, menu);
  return menu;
}

function validateMenuShape(menu) {
  if (!menu || !Array.isArray(menu.categories)) {
    throw new Error("Menu content is missing categories.");
  }
}

function renderMenu(menuRoot, menu, siteContent) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderCategoryNavigation(menu.categories, siteContent));

  menu.categories.forEach(function (category) {
    fragment.appendChild(renderCategory(category));
  });

  menuRoot.replaceChildren(fragment);
}

function renderCategoryNavigation(categories, siteContent) {
  const navigation = createElement("nav", "menu-category-nav");
  navigation.setAttribute(
    "aria-label",
    getTranslation(siteContent, "menu.categoryNavLabel") || "Menu categories"
  );

  categories.forEach(function (category) {
    const link = createElement("a", null, category.title);
    link.href = `#menu-category-${category.id}`;
    navigation.appendChild(link);
  });

  return navigation;
}

function renderCategory(category) {
  const categoryTitleId = `menu-category-${category.id}`;
  const section = createElement("section", "menu-group");
  section.setAttribute("aria-labelledby", categoryTitleId);

  const heading = createElement("div", "menu-group__heading");
  const title = createElement("h2", null, category.title);
  title.id = categoryTitleId;
  heading.appendChild(title);

  if (category.description) {
    heading.appendChild(createElement("p", null, category.description));
  }

  const list = createElement("div", "menu-list");

  category.items.forEach(function (item) {
    list.appendChild(renderMenuItem(item));
  });

  section.append(heading, list);
  return section;
}

function renderMenuItem(item) {
  const article = createElement("article", "menu-item");
  const content = createElement("div", "menu-item__content");
  content.appendChild(createElement("h3", null, item.name));

  if (item.description) {
    content.appendChild(createElement("p", null, item.description));
  }

  const price = createElement("span", "menu-item__price", formatPrice(item.price));

  article.append(content, price);
  return article;
}

function formatPrice(price) {
  return `€${Number(price).toString()}`;
}

function setMenuStatus(statusElement, message) {
  if (statusElement) {
    statusElement.textContent = message || "";
    statusElement.hidden = false;
  }
}

function clearMenuStatus(statusElement) {
  if (statusElement) {
    statusElement.textContent = "";
    statusElement.hidden = true;
  }
}
