import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { disabled } from '@shared/utils/const.utils';

export const localhostGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  if (disabled) {
    router.navigateByUrl('/install');
    return false;
  }

  return true;
};
