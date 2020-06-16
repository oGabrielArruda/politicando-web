import store from '../store';

import maskRouter from './maskRouter';

function pageAllowAnonymous(to) {
  return to.name === 'Initial' || to.name === 'Signup' || to.name === 'Contato' || to.name === 'Adm';
}

export default async (to, from, next) => {
  if ((!pageAllowAnonymous(to)) && !store.getters['auth/authenticated']) {
    next({ name: 'Initial' });
  } else {
    const newMask = maskRouter.filter((r) => to.path === r.path);

    if (newMask.length > 0) {
      next({ path: newMask[0].redirect });
    } else {
      next();
    }
  }
};
