import store from '../store';

import maskRouter from './maskRouter';

export default async (to, from, next) => {
  if ((to.name !== 'Initial' && to.name !== 'Signup') && !store.getters['auth/authenticated']) {
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
