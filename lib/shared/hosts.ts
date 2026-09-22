export const SUPPORTED_HOSTS = [
  "sfl.gl",
  "tutwuri.id",
  "app.khaddavi.net",
  "bahasteknologi.com",
];

export function isKnownHost(hostname: string): boolean {
  return SUPPORTED_HOSTS.some(
    (host) => hostname === host || hostname.endsWith(`.${host}`)
  );
}

export function isSupportedUrl(rawUrl: string): boolean {
  try {
    const url = new URL(rawUrl);
    return (
      (url.protocol === "http:" || url.protocol === "https:") &&
      isKnownHost(url.hostname)
    );
  } catch {
    return false;
  }
}
