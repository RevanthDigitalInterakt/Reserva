export const handlePathsParams = (
  path: string,
  keyword: string,
  numPaths: number = 0,
): string => {
  const keywordIndex = path.indexOf(keyword);
  if (keywordIndex === -1) {
    return path;
  }

  const beforeKeyword = path.substring(0, keywordIndex + keyword.length);
  const afterKeywordParts = path
    .substring(keywordIndex + keyword.length)
    .split('/')
    .filter(Boolean);

  while (afterKeywordParts.length < numPaths) {
    afterKeywordParts.push('null');
  }

  const completePaths = afterKeywordParts.slice(0, numPaths);

  return `${beforeKeyword}/${completePaths.join('/')}`;
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
