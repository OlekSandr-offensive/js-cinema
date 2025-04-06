const STORAGE_KEY = 'library_data';
const STORAGE_USER = 'user';

function getKey(key) {
  if (key === 'user') {
    return STORAGE_USER;
  } else if (key === 'library') {
    return STORAGE_KEY;
  }
  return null;
}

const defaultStorage = {
  user: { uid: '', email: '' },
  library: { watched: [], queue: [] },
};

export function saveToLocal(data, key) {
  const storageKey = getKey(key);
  if (storageKey) {
    localStorage.setItem(storageKey, JSON.stringify(data[key]));
  } else {
    console.error('Invalid key provided for saving data');
  }
}

export function loadFromLocal(key) {
  const storageKey = getKey(key);
  const data = localStorage.getItem(storageKey);
  try {
    if (!data || data === 'undefined') throw new Error();
    return JSON.parse(data);
  } catch {
    return defaultStorage[key];
  }
}
