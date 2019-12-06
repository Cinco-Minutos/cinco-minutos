import { decompressFromUTF16, compressToUTF16 } from 'lz-string';
type DataCache = {
  popularity?: Popularity;
  quickSearch?: QuickSearch;
  verbs?: Verbs;
};
const cache: DataCache = {};
async function getData<T extends keyof DataCache>(
  p: T
): Promise<DataCache[T]> {
  if (cache[p]) return cache[p];
  let compressedData: string;
  const LSData = localStorage.getItem(p);
  if (LSData) compressedData = LSData;
  else {
    const freshData = await (await fetch(`./${p}.json.min`)).text();
    localStorage.setItem(p, freshData);
    compressedData = freshData;
  }
  const data = JSON.parse(decompressFromUTF16(compressedData));
  cache[p] = data;
  return data;
}
const increasePopularity = async (verb: string, by: number = 1000): Promise<void> => {
  const popularity = cache.popularity || await getData('popularity');
  popularity[verb] = (popularity[verb] || 0) + by;
  localStorage.setItem('popularity', compressToUTF16(JSON.stringify(popularity)));
}
export default getData;
export { getData, increasePopularity };
