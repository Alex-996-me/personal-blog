const baseUrl = import.meta.env.BASE_URL;

export function withBasePath(path: string) {
  if (!path) {
    return baseUrl;
  }

  if (
    /^(?:[a-z]+:)?\/\//i.test(path) ||
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }

  const normalizedBase = baseUrl === "/" ? "" : baseUrl.replace(/\/$/, "");

  if (!normalizedBase) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  if (path === "/") {
    return `${normalizedBase}/`;
  }

  if (path === normalizedBase || path.startsWith(`${normalizedBase}/`)) {
    return path;
  }

  return path.startsWith("/") ? `${normalizedBase}${path}` : `${normalizedBase}/${path}`;
}
