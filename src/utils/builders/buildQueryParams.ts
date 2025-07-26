/* eslint-disable @typescript-eslint/no-unused-vars */
export function buildQueryParams(params: Record<string, string | number | boolean | undefined | null>) {
  const query = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null) // remove valores vazios
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join("&");

  return query ? `?${query}` : "";
}