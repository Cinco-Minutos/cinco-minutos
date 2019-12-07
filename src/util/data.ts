import { decompressFromUTF16, compressToUTF16 } from 'lz-string';
type DataCache = {
  popularity?: Popularity;
  quickSearch?: QuickSearch;
  verbs?: Verbs;
};
type PromiseDataCache = {
  [k in keyof DataCache]: Promise<DataCache[k]>;
};
const defaultResolver = async <T extends keyof DataCache>(
  p: T
): Promise<DataCache[T]> => {
  let compressedData: string;
  const LSData = localStorage.getItem(p);
  if (LSData) compressedData = LSData;
  else {
    const freshData = await (await fetch(`./${p}.json.min`)).text();
    localStorage.setItem(p, freshData);
    compressedData = freshData;
  }
  return JSON.parse(decompressFromUTF16(compressedData));
};
const resolvers: { [k in keyof DataCache]: () => Promise<DataCache[k]> } = {};
const cache: PromiseDataCache = {};
const getData = <T extends keyof DataCache>(p: T): PromiseDataCache[T] => {
  if (cache[p]) return cache[p];
  return (cache[p] = (resolvers[p]
    ? resolvers[p]()
    : defaultResolver(p)) as PromiseDataCache[T]);
};
resolvers.quickSearch = async () => {
  const verbs = await getData('verbs');
  const quickSearch: QuickSearch = {};
  for (const k in verbs) {
    const def = verbs[k].definition;
    if (def !== '') quickSearch[k] = def;
  }
  return quickSearch;
};
const increasePopularity = async (verb: string, by = 1000): Promise<void> => {
  const popularity = cache.popularity || (await getData('popularity'));
  popularity[verb] = (popularity[verb] || 0) + by;
  localStorage.setItem(
    'popularity',
    compressToUTF16(JSON.stringify(popularity))
  );
};
export default getData;
export { getData, increasePopularity };
