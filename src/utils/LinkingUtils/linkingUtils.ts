export const handlePathsParams = (
  path: string,
  keyword: string,
  numPaths: number = 3,
): string => {
  const [basePath, queryParams] = path.split('?');

  const keywordIndex = basePath?.indexOf(keyword);
  if (keywordIndex === -1) {
    return path;
  }

  const beforeKeyword = basePath?.substring(0, keywordIndex! + keyword.length);

  const afterKeyword = basePath?.substring(keywordIndex! + keyword.length);
  const pathParts = afterKeyword?.split('/').filter(Boolean);

  while (pathParts && pathParts.length < numPaths) {
    pathParts?.push('null');
  }

  const completePaths = pathParts?.slice(0, numPaths).join('/');

  const querySuffix = queryParams && queryParams.trim() !== '' ? `?${queryParams}` : '';

  return `${beforeKeyword}/${completePaths}${querySuffix}`;
};

export const splitPathParams = (path: string, keyword: string): string => {
  if (!path || !keyword) {
    return '';
  }

  const index = path.indexOf(keyword);

  if (index === -1 || index + keyword.length >= path.length) {
    return '';
  }

  return path.substring(index + keyword.length);
};
