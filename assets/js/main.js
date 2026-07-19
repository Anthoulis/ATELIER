import {
  applyStaticTranslations,
  getStoredLanguage,
  getTranslation,
  loadSiteContent,
  normalizeLanguage,
  storeLanguage
} from "./i18n.js?v=20260719-1";
import { renderMenuForLanguage } from "./menu-renderer.js?v=20260719-1";

const body = document.body;
const header = document.querySelector("[data-site-header]");
const nav = document.querySelector("[data-site-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const languageButtons = document.querySelectorAll("[data-language-button]");
const menuTargets = {
  menuRoot: document.querySelector("[data-menu-root]"),
  statusElement: document.querySelector("[data-menu-status]")
};

let activeLanguage = getStoredLanguage();
let activeSiteContent = null;
let languageRequestId = 0;

initialize();

async function initialize() {
  initializeMobileNavigation();
  initializeHeaderScrollState();
  initializeLanguageButtons();
  const requestId = languageRequestId + 1;

  try {
    await setLanguage(activeLanguage, { persist: false });
  } catch (error) {
    handleLanguageFailure(requestId, error);
  }
}

function initializeMobileNavigation() {
  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", function () {
    const shouldOpen = !body.classList.contains("nav-open");
    setNavOpen(shouldOpen);

    if (shouldOpen) {
      window.requestAnimationFrame(function () {
        nav.querySelector("a")?.focus();
      });
    }
  });

  nav.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      setNavOpen(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      setNavOpen(false);
      window.requestAnimationFrame(function () {
        toggle.focus();
      });
    }
  });

  window.matchMedia("(min-width: 720px)").addEventListener("change", function (event) {
    if (event.matches) {
      setNavOpen(false);
    }
  });
}

function initializeHeaderScrollState() {
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function initializeLanguageButtons() {
  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const requestId = languageRequestId + 1;

      setLanguage(button.dataset.languageButton).catch(function (error) {
        handleLanguageFailure(requestId, error);
      });
    });
  });
}

async function setLanguage(language, options) {
  const requestId = ++languageRequestId;
  const requestedLanguage = normalizeLanguage(language);
  const shouldPersist = !options || options.persist !== false;
  const siteContent = await loadSiteContent(requestedLanguage);

  // Ignore an older response when the user has already selected another language.
  if (requestId !== languageRequestId) {
    return;
  }

  activeLanguage = siteContent.language;
  activeSiteContent = siteContent;

  applyStaticTranslations(activeSiteContent, languageButtons);
  updateNavToggleLabel();

  if (shouldPersist) {
    storeLanguage(activeLanguage);
  }

  await renderMenuForLanguage(activeLanguage, activeSiteContent, menuTargets);
}

function setNavOpen(isOpen) {
  body.classList.toggle("nav-open", isOpen);
  toggle?.setAttribute("aria-expanded", String(isOpen));
  updateNavToggleLabel();
}

function updateNavToggleLabel() {
  if (!toggle || !activeSiteContent) {
    return;
  }

  const isOpen = body.classList.contains("nav-open");
  const labelKey = isOpen ? "navToggle.close" : "navToggle.open";
  const label = getTranslation(activeSiteContent, labelKey);

  toggle.setAttribute("aria-expanded", String(isOpen));

  if (label) {
    toggle.setAttribute("aria-label", label);
  }
}

function updateHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

function showMenuUnavailable() {
  if (menuTargets.statusElement) {
    const translatedMessage = activeSiteContent
      ? getTranslation(activeSiteContent, "menu.unavailable")
      : null;

    menuTargets.statusElement.textContent =
      translatedMessage || "Menu is temporarily unavailable.";
    menuTargets.statusElement.hidden = false;
  }
}

function handleLanguageFailure(requestId, error) {
  // A failed, superseded request must not overwrite newer language state.
  if (requestId === languageRequestId) {
    console.error("Language update failed.", error);
    showMenuUnavailable();
  }
}
