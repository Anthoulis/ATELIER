#!/usr/bin/env python3
"""Validate ATELIER static content files without external dependencies."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
MENU_FILES = {
    "en": ROOT / "assets" / "content" / "menu.en.json",
    "el": ROOT / "assets" / "content" / "menu.el.json",
}
SITE_FILES = {
    "en": ROOT / "assets" / "content" / "site.en.json",
    "el": ROOT / "assets" / "content" / "site.el.json",
}
ALLOWED_CATEGORY_KEYS = {"id", "title", "description", "items"}
ALLOWED_ITEM_KEYS = {"id", "name", "description", "price"}
ID_PATTERN = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []

    menus = load_json_files(MENU_FILES, errors)
    sites = load_json_files(SITE_FILES, errors)

    if len(menus) == len(MENU_FILES):
        validate_menus(menus, errors)

    if len(sites) == len(SITE_FILES):
        validate_sites(sites, errors, warnings)

    for warning in warnings:
        print(f"WARNING: {warning}")

    if errors:
        for error in errors:
            print(f"ERROR: {error}")
        return 1

    print("OK: menu content is valid and bilingual IDs are aligned.")
    print("OK: site translation files are valid.")
    return 0


def load_json_files(paths: dict[str, Path], errors: list[str]) -> dict[str, Any]:
    loaded: dict[str, Any] = {}

    for language, path in paths.items():
        try:
            with path.open("r", encoding="utf-8") as file:
                loaded[language] = json.load(file)
        except FileNotFoundError:
            errors.append(f"{path.relative_to(ROOT)} is missing.")
        except json.JSONDecodeError as exc:
            errors.append(f"{path.relative_to(ROOT)} is invalid JSON: {exc}")

    return loaded


def validate_menus(menus: dict[str, Any], errors: list[str]) -> None:
    category_orders: dict[str, list[str]] = {}
    item_orders: dict[str, dict[str, list[str]]] = {}

    for language, menu in menus.items():
        path_label = f"menu.{language}.json"

        if not isinstance(menu, dict):
            errors.append(f"{path_label} root must be an object.")
            continue

        categories = menu.get("categories")
        if not isinstance(categories, list):
            errors.append(f"{path_label} must contain a categories array.")
            continue

        category_ids: list[str] = []
        seen_category_ids: set[str] = set()
        seen_item_ids: set[str] = set()
        item_orders[language] = {}

        for category in categories:
            if not isinstance(category, dict):
                errors.append(f"{path_label} contains a non-object category.")
                continue

            category_id = category.get("id")
            if not validate_id(category_id):
                errors.append(f"{path_label} has invalid category id: {category_id!r}.")
                continue

            if category_id in seen_category_ids:
                errors.append(f"{path_label} has duplicate category id: {category_id}.")
            seen_category_ids.add(category_id)
            category_ids.append(category_id)

            unsupported_keys = sorted(set(category).difference(ALLOWED_CATEGORY_KEYS))
            for key in unsupported_keys:
                errors.append(f"{path_label} category {category_id} has unsupported field: {key}.")

            if not isinstance(category.get("title"), str) or not category["title"].strip():
                errors.append(f"{path_label} category {category_id} needs a non-empty title.")

            if "description" in category and not isinstance(category["description"], str):
                errors.append(f"{path_label} category {category_id} description must be a string.")

            items = category.get("items")
            if not isinstance(items, list):
                errors.append(f"{path_label} category {category_id} must contain an items array.")
                continue

            item_ids: list[str] = []

            for item in items:
                if not isinstance(item, dict):
                    errors.append(f"{path_label} category {category_id} contains a non-object item.")
                    continue

                item_id = item.get("id")
                if not validate_id(item_id):
                    errors.append(f"{path_label} has invalid item id: {item_id!r}.")
                    continue

                if item_id in seen_item_ids:
                    errors.append(f"{path_label} has duplicate item id: {item_id}.")
                seen_item_ids.add(item_id)
                item_ids.append(item_id)

                validate_menu_item(path_label, item, errors)

            item_orders[language][category_id] = item_ids

        category_orders[language] = category_ids

    if category_orders.get("en") != category_orders.get("el"):
        errors.append("EN and EL category ID order must match exactly.")
        return

    for category_id in category_orders.get("en", []):
        if item_orders["en"].get(category_id) != item_orders["el"].get(category_id):
            errors.append(f"EN and EL item ID order differs in category {category_id}.")


def validate_menu_item(path_label: str, item: dict[str, Any], errors: list[str]) -> None:
    item_id = item["id"]

    unsupported_keys = sorted(set(item).difference(ALLOWED_ITEM_KEYS))
    for key in unsupported_keys:
        errors.append(f"{path_label} item {item_id} has unsupported field: {key}.")

    for required_key in ("id", "name", "price"):
        if required_key not in item:
            errors.append(f"{path_label} item {item_id} is missing {required_key}.")

    if not isinstance(item.get("name"), str) or not item["name"].strip():
        errors.append(f"{path_label} item {item_id} needs a non-empty name.")

    if "description" in item and not isinstance(item["description"], str):
        errors.append(f"{path_label} item {item_id} description must be a string.")

    price = item.get("price")
    if isinstance(price, bool) or not isinstance(price, (int, float)):
        errors.append(f"{path_label} item {item_id} price must be a number.")
    elif price < 0:
        errors.append(f"{path_label} item {item_id} price must be >= 0.")


def validate_sites(sites: dict[str, Any], errors: list[str], warnings: list[str]) -> None:
    required_roots = {"meta", "nav", "navToggle", "menu", "contact", "legal"}

    for language, site in sites.items():
        path_label = f"site.{language}.json"

        if not isinstance(site, dict):
            errors.append(f"{path_label} root must be an object.")
            continue

        for key in required_roots:
            if not isinstance(site.get(key), dict):
                errors.append(f"{path_label} must contain object root key: {key}.")

    en_keys = flatten_keys(sites.get("en", {}))
    el_keys = flatten_keys(sites.get("el", {}))

    for key in sorted(en_keys - el_keys):
        warnings.append(f"site.el.json is missing translation key: {key}.")

    for key in sorted(el_keys - en_keys):
        warnings.append(f"site.en.json is missing translation key: {key}.")


def flatten_keys(value: Any, prefix: str = "") -> set[str]:
    if not isinstance(value, dict):
        return {prefix.rstrip(".")}

    keys: set[str] = set()
    for key, child in value.items():
        child_prefix = f"{prefix}{key}"
        if isinstance(child, dict):
            keys.update(flatten_keys(child, f"{child_prefix}."))
        else:
            keys.add(child_prefix)
    return keys


def validate_id(value: Any) -> bool:
    return isinstance(value, str) and bool(ID_PATTERN.fullmatch(value))


if __name__ == "__main__":
    sys.exit(main())
