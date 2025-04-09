export function getPathname() {
  const { pathname } = window.location;

  if (pathname.includes('watched')) {
    return 'watched';
  }

  if (pathname.includes('queue')) {
    return 'queue';
  }

  return 'home';
}
