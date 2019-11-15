export function isDeepEmpty(o: any): boolean {
  if (o === null || o === undefined || o === '' || typeof o === 'undefined' || o === ' ') {
    return true;
  } else if (typeof o === 'object') {
    if (o instanceof Array) {
      return o.length === 0;
    } else { // object
      const objectType = getValueType(o);
      if (objectType === 'HTMLElement') {
        return typeof o.click === 'undefined';
      } else if (objectType === 'Map') {
        return o.size === 0;
      } else {
        return Object.keys(o).length === 0;
      }
    }
  } else if (typeof o === 'string') {
    return o === '' || o === ' ';
  }
  return false;
}

export function getValueType(value: any): string {
  if (Array.isArray(value)) {
    return 'array';
  } else if (value instanceof HTMLElement) {
    return 'HTMLElement';
  } else if (value instanceof Map) {
    return 'Map';
  }
  return typeof value;
}
