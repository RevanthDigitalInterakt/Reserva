export const CategoriesParserString = (categories: object) => {
  const categoriesKeys = Object.keys(categories);

  const names = (categories = categoriesKeys.map((categoriesKey: string) => {
    const categoryName = categories[categoriesKey];
    return categoryName;
  }));
  return names.join();
};
