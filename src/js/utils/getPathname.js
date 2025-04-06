export function getPathname() {
  const { pathname } = window.location;
  return pathname.includes('watched') ? 'watched' : 'queue';
}
