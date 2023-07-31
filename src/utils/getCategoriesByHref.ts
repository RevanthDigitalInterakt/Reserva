export const getCategoriesByHref = (categoryTree: string) => {
  const categories = categoryTree.startsWith('/') ? categoryTree.substring(1).replace(/\//g, '-') : categoryTree.replace(/\//g, '-');

  return categories;
};
