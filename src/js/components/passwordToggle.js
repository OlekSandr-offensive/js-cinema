import { getRefs } from '../utils';

export function passwordToggle() {
  const refs = getRefs();
  if (!refs.passwordInput || !refs.togglePassword) return;

  const type = refs.passwordInput.type === 'password' ? 'text' : 'password';
  refs.passwordInput.type = type;

  refs.togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
}
