import { getRefs } from '../utils';

export function passwordToggle() {
  const { passwordInput, togglePassword } = getRefs();
  if (!passwordInput || !togglePassword) return;

  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;

  togglePassword.textContent = type === 'password' ? '👁️' : '🙈';
}
