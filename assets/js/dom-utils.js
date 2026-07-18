export function createElement(tagName, className, text) {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }

  if (typeof text === "string") {
    element.textContent = text;
  }

  return element;
}

export function getNestedValue(source, key) {
  if (!source || !key) {
    return null;
  }

  return key.split(".").reduce(function (current, part) {
    return current && Object.prototype.hasOwnProperty.call(current, part)
      ? current[part]
      : null;
  }, source);
}

export function readStoredValue(key) {
  try {
    return window.localStorage ? window.localStorage.getItem(key) : null;
  } catch (error) {
    return null;
  }
}

export function writeStoredValue(key, value) {
  try {
    if (window.localStorage) {
      window.localStorage.setItem(key, value);
    }
  } catch (error) {
    return;
  }
}
