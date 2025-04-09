export function updateButton(btn, type, isInLibrary) {
  if (!btn) return;
  btn.classList.remove('hidden');

  if (isInLibrary) {
    btn.textContent = `Added to ${capitalize(type)}`;
    btn.disabled = true;
    btn.style.pointerEvents = 'none';
    btn.style.transform = 'none';
  } else {
    btn.textContent = `Add to ${capitalize(type)}`;
    btn.disabled = false;
    btn.style.pointerEvents = '';
    btn.style.transform = '';
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
