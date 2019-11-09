export function isDeepEmpty(o: any, skipFields: Array<String> = []): boolean {
  if (o === null || o === undefined || o === '' || typeof o === 'undefined') {
    return true;
  } else if (typeof o === 'object') {
    if (o instanceof Array) {
      return o.filter(arr => !isDeepEmpty(arr)).length === 0;
    } else {
      let flag;
      for (let key in o) {
        if (o.hasOwnProperty(key)) {
          let temp = key.toLowerCase();
          if (
            temp !== 'unlocked' && temp !== 'required' && temp !== 'isopen' &&
            temp !== 'checkedflag' && temp !== 'isprepopulated' && !temp.includes('masked') &&
            temp !== 'donotprefill' && temp !== 'isnameprepopulated' && temp !== 'isdobprepopulated' &&
            temp !== 'isgenderprepopulated'
          ) {
            if (skipFields.length > 0 && skipFields.includes(temp)) {
              continue;
            }
            flag = isDeepEmpty(o[key]);
            if (!flag) {
              return false;
            }
          }
        }
      }
      return true;
    }
  }
  return false;
}
