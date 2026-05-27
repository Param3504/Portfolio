/** Public asset paths for GitHub Pages (respects vite `base`, e.g. /Portfolio/). */
export function assetUrl(path: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
