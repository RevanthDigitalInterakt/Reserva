  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.formatProductClusterIds = formatProductClusterIds;
  function formatProductClusterIds(input) {
    input = input.toLowerCase();
    var words = ['product', 'cluster', 'ids'];
    var camelCaseString = words.map(function (word, index) {
      return index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1);
    }).join('');
    return camelCaseString;
  }
