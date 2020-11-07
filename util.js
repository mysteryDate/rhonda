const lerp = function (min, max, c) {
    c = c < 0 ? 0 : c;
    c = c > 1 ? 1 : c;
    return min + (max - min) * c;
}

function lerpDicts(dict, start, end, t) {
  for (key in end) {
    if (end[key] instanceof Array) {
      for (var i = 0; i < end[key].length; i++) {
        if (end[key][i] instanceof DOMPoint) {
          dict[key][i].x = lerp(start[key][i].x, end[key][i].x, t);
          dict[key][i].y = lerp(start[key][i].y, end[key][i].y, t);
        }
        else {
          dict[key][i] = lerp(start[key][i], end[key][i], t);
        }
      }
    } else {
      dict[key] = lerp(start[key], end[key], t);
    }
  }
}

function copyRhonda(src) {
  const result = {};
  Object.assign(result, src);
  result.radii = [];
  for (key in src) {
    if (src[key] instanceof Array) {
      result[key] = Array.from(src[key]);
    }
  }
  if (src["radii"]) {
    for (var i = 0; i < src.radii.length; i++) {
      result.radii[i] = new DOMPoint(src.radii[i].x, src.radii[i].y);
    }
  }
  return result;
}