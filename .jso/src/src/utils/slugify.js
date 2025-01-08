  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.slugify = undefined;
  var slugify = exports.slugify = function slugify() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var str = val.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    var from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
    var to = 'aaaaaeeeeiiiioooouuuunc------';
    for (var i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str.replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
    return str;
  };
