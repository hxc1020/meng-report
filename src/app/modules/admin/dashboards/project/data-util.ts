export function sumArray(data, numberStartIndex = 9): [] {
  return JSON.parse(JSON.stringify(data)).reduce((result, item) => {
    for (let i = numberStartIndex; i < item.length; i++) {
      if (!result[i]) {
        result[i] = 0;
      }
      result[i] += item[i] | 0;
    }
    return result;
  });
}
