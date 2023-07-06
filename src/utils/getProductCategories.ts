export const getProductCategories = (categoryTree: string[]) => {
  const categories = categoryTree?.map((item) => item.replace(/-+/g, '-')).join('-').toLowerCase();

	console.log('categories', categories);

  return categories;
};
