  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.splitPathParams = exports.handlePathsParams = undefined;
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var handlePathsParams = exports.handlePathsParams = function handlePathsParams(path, keyword) {
    var numPaths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
    var _path$split = path.split('?'),
      _path$split2 = (0, _slicedToArray2.default)(_path$split, 2),
      basePath = _path$split2[0],
      queryParams = _path$split2[1];
    var keywordIndex = basePath == null ? undefined : basePath.indexOf(keyword);
    if (keywordIndex === -1) {
      return path;
    }
    var beforeKeyword = basePath == null ? undefined : basePath.substring(0, keywordIndex + keyword.length);
    var afterKeyword = basePath == null ? undefined : basePath.substring(keywordIndex + keyword.length);
    var pathParts = afterKeyword == null ? undefined : afterKeyword.split('/').filter(Boolean);
    while (pathParts && pathParts.length < numPaths) {
      pathParts == null ? undefined : pathParts.push('null');
    }
    var completePaths = pathParts == null ? undefined : pathParts.slice(0, numPaths).join('/');
    var querySuffix = queryParams && queryParams.trim() !== '' ? `?${queryParams}` : '';
    return `${beforeKeyword}/${completePaths}${querySuffix}`;
  };
  var splitPathParams = exports.splitPathParams = function splitPathParams(path, keyword) {
    if (!path || !keyword) {
      return '';
    }
    var index = path.indexOf(keyword);
    if (index === -1 || index + keyword.length >= path.length) {
      return '';
    }
    return path.substring(index + keyword.length);
  };
