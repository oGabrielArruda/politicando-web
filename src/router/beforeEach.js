import store from '../store';

export default async (to, from, next) => {
  if ((to.name !== 'Initial' && to.name !== 'Signup') && !store.getters['auth/authenticated']) {
    next({ name: 'Initial' });
  } else {
    next();
  }
};
