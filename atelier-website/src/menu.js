export function normalizeMenuCategories(categories) {
  return categories.map((category, categoryIndex) => {
    const title = category.title ?? `Category ${categoryIndex + 1}`;
    const id = category.id ?? toSlug(title);

    return {
      ...category,
      id,
      items: normalizeMenuItems(category.items ?? [], title),
      title,
    };
  });
}

export function getFeaturedMenuItems(categories, limit = 3) {
  const allItems = categories.flatMap((category) =>
    category.items.map((item) => ({
      ...item,
      categoryId: category.id,
      categoryTitle: category.title,
    })),
  );

  const featuredItems = allItems.filter((item) => item.featured);
  return (featuredItems.length > 0 ? featuredItems : allItems).slice(0, limit);
}

function normalizeMenuItems(items, categoryTitle) {
  return items.map((item, itemIndex) => ({
    description: '',
    featured: false,
    id: item.id ?? toSlug(`${categoryTitle}-${item.name ?? itemIndex + 1}`),
    name: `Item ${itemIndex + 1}`,
    price: '',
    ...item,
  }));
}

function toSlug(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
