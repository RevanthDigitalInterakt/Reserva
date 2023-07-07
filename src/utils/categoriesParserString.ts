export const CategoriesParserString = (categories: object) => {
  if (Array.isArray(categories)) {
    return categories;
  }

  const categoriesKeys = Object.keys(categories);

  const names = (categories = categoriesKeys.map((categoriesKey: string) => {
    const categoryName = categories[categoriesKey];
    return categoryName;
  }));
  return names.join();
};
