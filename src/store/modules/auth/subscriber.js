import store from '../../index';

import api from '../../../config/api';

store.subscribe((mutation) => {
  switch (mutation.type) {
    case 'auth/SET_TOKEN': {
      if (mutation.payload) {
        api.defaults.headers.Authorization = `Bearer ${mutation.payload}`;
        localStorage.setItem('token', mutation.payload);
      } else {
        api.defaults.headers.Authorization = null;
        localStorage.removeItem('token');
      }
      break;
    }
    default: {
      break;
    }
  }
});
