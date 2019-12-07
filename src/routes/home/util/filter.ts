import { findBestMatch } from 'string-similarity';
export default (
  search: string,
  quickSearch: QuickSearch,
  num = 5,
  reverse = false
): [string, string][] => {
  if (reverse) {
    const newQuickSearch: QuickSearch = {};
    for (const k in quickSearch) {
      newQuickSearch[quickSearch[k]] = k;
    }
    quickSearch = newQuickSearch;
  }
  const ratings = findBestMatch(search, Object.keys(quickSearch)).ratings;
  return ratings
    .sort((a, b) => b.rating - a.rating)
    .slice(0, num)
    .map(r => [r.target, quickSearch[r.target]]);
};
