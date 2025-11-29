import { Singleton } from './singleton.js';

export function isEquals(): boolean {
  const s1 = Singleton.getInstance();
  const s2 = Singleton.getInstance();

  if (s1 === s2) {
    return true;
  }
  return false;
}
