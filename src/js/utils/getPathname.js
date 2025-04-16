export function getPathname() {
  const { pathname } = location;

  if (pathname.includes('watched')) {
    return 'watched';
  }

  if (pathname.includes('queue')) {
    return 'queue';
  }

  return 'home';
}
