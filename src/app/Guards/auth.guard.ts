import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authId = sessionStorage.getItem('id');

  if (authId) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/login']);
    return false;
  }
};

export const authGuard2: CanActivateFn = (route, state) => {
  const authId = sessionStorage.getItem('id');

  if (!authId) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/']);
    return false;
  }
};
