import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { CookieService } from '../service/cookie.service';

export const authGuard: CanMatchFn = () => {
  const cookies = inject(CookieService);
  const authToken = cookies.get('authorization');
  if (!authToken) return false;
  const data = JSON.parse(atob(authToken.split('.')?.[1]) || '{}');
  if (data?.exp) {
    const exp = new Date(data.exp * 1000);
    const now = new Date();
    const expired = exp <= now;
    if (expired) {
      cookies.delete('authorization');
      return false;
    }
    return true;
  }
  return false;
};
