(function () {
  const DEFAULT_LANGUAGE = "en";
  const SUPPORTED_LANGUAGES = ["en", "el"];
  const STORAGE_KEY = "atelier-language";

  const body = document.body;
  const header = document.querySelector("[data-site-header]");
  const nav = document.querySelector("[data-site-nav]");
  const toggle = document.querySelector("[data-nav-toggle]");
  const menuRoot = document.querySelector("[data-menu-root]");
  const languageButtons = document.querySelectorAll("[data-language-button]");

  let activeLanguage = DEFAULT_LANGUAGE;
  let menuRequestId = 0;

  const translations = {
    en: {
      meta: {
        title: "ATELIER | Premium Burger, Panini & Drinks Restaurant",
        description:
          "ATELIER is a premium casual restaurant concept for composed burgers, pressed panini, desserts, and all-day drinks.",
        ogTitle: "ATELIER | Premium Burger, Panini & Drinks Restaurant",
        ogDescription:
          "A clean, modern restaurant concept shaped around burgers, panini, desserts, and drinks."
      },
      nav: {
        concept: "Concept",
        signatures: "Signatures",
        menu: "Menu",
        gallery: "Gallery",
        contact: "Contact"
      },
      navToggle: {
        open: "Open menu",
        close: "Close menu"
      },
      hero: {
        kicker: "Premium casual food",
        lede:
          "Burgers, panini, desserts, and drinks shaped with the precision of a workshop and the ease of modern all-day dining.",
        primaryCta: "View menu",
        secondaryCta: "Opening details"
      },
      concept: {
        kicker: "Concept",
        title: "A focused restaurant idea, built around quality.",
        bodyOne:
          "ATELIER keeps the format tight: composed burgers, pressed panini, crisp starters, warm desserts, and a drinks list that belongs to the experience rather than sitting beside it.",
        bodyTwo:
          "The visual direction is clean and food-led. Dark stone, warm light, disciplined typography, and generous photography support a premium casual brand without making the site feel like software."
      },
      signatures: {
        kicker: "Signatures",
        title: "Built for appetite and repeat visits.",
        body:
          "A compact selection of ATELIER anchors, shown with enough restraint for a premium restaurant site and enough detail to make the food real."
      },
      signatureCards: {
        burger: {
          kicker: "Burger",
          title: "ATELIER Burger",
          body:
            "Double smashed beef, caramelized onions, truffle graviera, rocket, and fig jam."
        },
        panini: {
          kicker: "Panini",
          title: "Croquant Chicken",
          body:
            "Crispy panko chicken, cheddar, coleslaw, pickles, and ATELIER sauce."
        },
        drinks: {
          kicker: "Drinks",
          title: "Spritz Service",
          body:
            "Aperol, Campari, beers, spirits, and clean soft drinks for all-day service."
        }
      },
      menu: {
        kicker: "Menu",
        title: "Food and drinks with a clear point of view.",
        body:
          "The menu is structured for easy updates while keeping the website lightweight, static, and focused on the food.",
        loading: "Loading menu...",
        unavailable: "Menu is temporarily unavailable.",
        tagsLabel: "Item tags"
      },
      gallery: {
        kicker: "Visual language",
        title: "Food first, atmosphere close behind.",
        body:
          "The photography system favors texture, contrast, and service mood over decorative UI.",
        counterCaption: "Warm counter service",
        paniniCaption: "Pressed panini",
        drinksCaption: "Drinks rhythm"
      },
      contact: {
        kicker: "Contact",
        title: "Opening details are being finalized.",
        body:
          "The public service details will be added here when the location, reservations, and social channels are confirmed.",
        locationLabel: "Location",
        hoursLabel: "Hours",
        reservationsLabel: "Reservations",
        socialLabel: "Social",
        toBeAnnounced: "To be announced",
        comingSoon: "Coming soon"
      },
      footer: {
        note: "Premium burgers, panini, desserts, and drinks."
      }
    },
    el: {
      meta: {
        title: "ATELIER | Premium Burgers, Panini & Ποτά",
        description:
          "Το ATELIER είναι ένα premium casual restaurant concept για burgers, panini, γλυκά και all-day ποτά.",
        ogTitle: "ATELIER | Premium Burgers, Panini & Ποτά",
        ogDescription:
          "Ένα καθαρό, μοντέρνο restaurant concept γύρω από burgers, panini, γλυκά και ποτά."
      },
      nav: {
        concept: "Concept",
        signatures: "Προτάσεις",
        menu: "Μενού",
        gallery: "Gallery",
        contact: "Επικοινωνία"
      },
      navToggle: {
        open: "Άνοιγμα μενού",
        close: "Κλείσιμο μενού"
      },
      hero: {
        kicker: "Premium casual φαγητό",
        lede:
          "Burgers, panini, γλυκά και ποτά με λογική εργαστηρίου και την άνεση του σύγχρονου all-day dining.",
        primaryCta: "Δες το μενού",
        secondaryCta: "Λεπτομέρειες"
      },
      concept: {
        kicker: "Concept",
        title: "Μια focused ιδέα εστίασης, χτισμένη γύρω από την ποιότητα.",
        bodyOne:
          "Το ATELIER κρατά τη φόρμα καθαρή: δομημένα burgers, pressed panini, τραγανά starters, ζεστά γλυκά και μια λίστα ποτών που ανήκει στην εμπειρία.",
        bodyTwo:
          "Η οπτική κατεύθυνση είναι καθαρή και food-led. Dark stone, ζεστό φως, πειθαρχημένη τυπογραφία και γενναιόδωρη φωτογραφία στηρίζουν ένα premium casual brand."
      },
      signatures: {
        kicker: "Προτάσεις",
        title: "Σχεδιασμένο για όρεξη και επιστροφή.",
        body:
          "Μια compact επιλογή από ATELIER anchors, με αρκετή συγκράτηση για premium restaurant site και αρκετή λεπτομέρεια ώστε το φαγητό να είναι πραγματικό."
      },
      signatureCards: {
        burger: {
          kicker: "Burger",
          title: "ATELIER Burger",
          body:
            "Διπλό smash μοσχάρι, καραμελωμένο κρεμμύδι, γραβιέρα τρούφας, ρόκα και μαρμελάδα σύκου."
        },
        panini: {
          kicker: "Panini",
          title: "Croquant Κοτόπουλο",
          body:
            "Τραγανό κοτόπουλο panko, cheddar, coleslaw, πίκλες και σος ATELIER."
        },
        drinks: {
          kicker: "Ποτά",
          title: "Spritz Service",
          body:
            "Aperol, Campari, μπύρες, spirits και καθαρά αναψυκτικά για all-day service."
        }
      },
      menu: {
        kicker: "Μενού",
        title: "Φαγητό και ποτά με καθαρή κατεύθυνση.",
        body:
          "Το μενού είναι δομημένο για εύκολες ενημερώσεις, κρατώντας το website ελαφρύ, static και food-focused.",
        loading: "Φόρτωση μενού...",
        unavailable: "Το μενού δεν είναι προσωρινά διαθέσιμο.",
        tagsLabel: "Ετικέτες πιάτου"
      },
      gallery: {
        kicker: "Οπτική γλώσσα",
        title: "Πρώτα το φαγητό, μετά η ατμόσφαιρα.",
        body:
          "Η φωτογραφία δίνει προτεραιότητα στην υφή, την αντίθεση και τη διάθεση του service αντί για διακοσμητικό UI.",
        counterCaption: "Ζεστό counter service",
        paniniCaption: "Pressed panini",
        drinksCaption: "Ρυθμός ποτών"
      },
      contact: {
        kicker: "Επικοινωνία",
        title: "Οι λεπτομέρειες ανοίγματος οριστικοποιούνται.",
        body:
          "Οι δημόσιες πληροφορίες service θα προστεθούν εδώ όταν επιβεβαιωθούν τοποθεσία, κρατήσεις και social channels.",
        locationLabel: "Τοποθεσία",
        hoursLabel: "Ώρες",
        reservationsLabel: "Κρατήσεις",
        socialLabel: "Social",
        toBeAnnounced: "Θα ανακοινωθεί",
        comingSoon: "Σύντομα"
      },
      footer: {
        note: "Premium burgers, panini, γλυκά και ποτά."
      }
    }
  };

  const menuCache = new Map();

  function getTranslation(language, key) {
    const value = getNestedValue(translations[language], key);

    if (typeof value === "string") {
      return value;
    }

    const fallbackValue = getNestedValue(translations[DEFAULT_LANGUAGE], key);
    return typeof fallbackValue === "string" ? fallbackValue : null;
  }

  function getNestedValue(source, key) {
    if (!source) {
      return null;
    }

    return key.split(".").reduce(function (current, part) {
      return current && Object.prototype.hasOwnProperty.call(current, part)
        ? current[part]
        : null;
    }, source);
  }

  function getStoredLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeLanguage(language) {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      return;
    }
  }

  function normalizeLanguage(language) {
    return SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  }

  function setNavOpen(isOpen) {
    body.classList.toggle("nav-open", isOpen);
    updateNavToggleLabel();
  }

  function updateNavToggleLabel() {
    if (!toggle) {
      return;
    }

    const isOpen = body.classList.contains("nav-open");
    const labelKey = isOpen ? "navToggle.close" : "navToggle.open";
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", getTranslation(activeLanguage, labelKey));
  }

  function updateHeaderState() {
    if (!header) {
      return;
    }

    header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  function applyStaticTranslations(language) {
    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;

    document.querySelectorAll("[data-i18n]").forEach(function (element) {
      const translatedValue = getTranslation(language, element.dataset.i18n);

      if (translatedValue) {
        element.textContent = translatedValue;
      }
    });

    updateMetaTag("description", getTranslation(language, "meta.description"));
    updateMetaProperty("og:title", getTranslation(language, "meta.ogTitle"));
    updateMetaProperty("og:description", getTranslation(language, "meta.ogDescription"));
    document.title = getTranslation(language, "meta.title");

    languageButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.languageButton === language)
      );
    });

    updateNavToggleLabel();
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

  function setMenuStatus(message) {
    if (!menuRoot) {
      return;
    }

    menuRoot.replaceChildren(createElement("p", "menu-status", message));
  }

  async function setLanguage(language, options) {
    const nextLanguage = normalizeLanguage(language);
    const shouldPersist = !options || options.persist !== false;

    activeLanguage = nextLanguage;
    applyStaticTranslations(activeLanguage);
    setMenuStatus(getTranslation(activeLanguage, "menu.loading"));

    if (shouldPersist) {
      storeLanguage(activeLanguage);
    }

    await renderMenuForLanguage(activeLanguage);
  }

  async function renderMenuForLanguage(language) {
    if (!menuRoot) {
      return;
    }

    const requestId = menuRequestId + 1;
    menuRequestId = requestId;

    try {
      const menu = await getMenuContent(language);

      if (requestId !== menuRequestId) {
        return;
      }

      renderMenu(menu);
    } catch (error) {
      if (requestId !== menuRequestId) {
        return;
      }

      setMenuStatus(getTranslation(activeLanguage, "menu.unavailable"));
    }
  }

  async function getMenuContent(language) {
    const requestedLanguage = normalizeLanguage(language);

    try {
      return await fetchMenuContent(requestedLanguage);
    } catch (error) {
      if (requestedLanguage !== DEFAULT_LANGUAGE) {
        return fetchMenuContent(DEFAULT_LANGUAGE);
      }

      throw error;
    }
  }

  async function fetchMenuContent(language) {
    if (menuCache.has(language)) {
      return menuCache.get(language);
    }

    const response = await fetch(`assets/content/menu.${language}.json`, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`Menu request failed: ${response.status}`);
    }

    const menu = await response.json();

    if (!menu || !Array.isArray(menu.categories)) {
      throw new Error("Menu content is missing categories.");
    }

    menuCache.set(language, menu);
    return menu;
  }

  function renderMenu(menu) {
    const fragment = document.createDocumentFragment();

    menu.categories.forEach(function (category) {
      fragment.appendChild(renderCategory(category, menu));
    });

    menuRoot.replaceChildren(fragment);
  }

  function renderCategory(category, menu) {
    const categoryTitleId = `menu-category-${category.id}`;
    const section = createElement("section", "menu-group");
    section.setAttribute("aria-labelledby", categoryTitleId);

    const heading = createElement("div", "menu-group__heading");
    const title = createElement("h3", null, category.title);
    title.id = categoryTitleId;
    heading.appendChild(title);

    if (category.description) {
      heading.appendChild(createElement("p", null, category.description));
    }

    const list = createElement("div", "menu-list");

    category.items.forEach(function (item) {
      list.appendChild(renderMenuItem(item, menu));
    });

    section.append(heading, list);
    return section;
  }

  function renderMenuItem(item, menu) {
    const article = createElement("article", "menu-item");
    const content = document.createElement("div");
    content.appendChild(createElement("h4", null, item.name));

    if (item.description) {
      content.appendChild(createElement("p", null, item.description));
    }

    if (Array.isArray(item.tags) && item.tags.length > 0) {
      content.appendChild(renderTags(item.tags, menu));
    }

    if (item.note) {
      content.appendChild(createElement("p", "menu-item__note", item.note));
    }

    const price = createElement(
      "span",
      "menu-item__price",
      `${menu.labels.pricePrefix} ${item.price}`
    );

    article.append(content, price);
    return article;
  }

  function renderTags(tags, menu) {
    const tagList = createElement("div", "menu-tags");
    tagList.setAttribute("aria-label", getTranslation(activeLanguage, "menu.tagsLabel"));

    tags.forEach(function (tag) {
      const label = menu.labels.tags[tag] || tag;
      tagList.appendChild(createElement("span", "menu-tag", label));
    });

    return tagList;
  }

  function createElement(tagName, className, text) {
    const element = document.createElement(tagName);

    if (className) {
      element.className = className;
    }

    if (typeof text === "string") {
      element.textContent = text;
    }

    return element;
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(!body.classList.contains("nav-open"));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setNavOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setNavOpen(false);
      }
    });
  }

  languageButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.dataset.languageButton);
    });
  });

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  setLanguage(getStoredLanguage(), { persist: false });
})();
