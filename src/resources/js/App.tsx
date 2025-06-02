import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Provider } from 'react-redux';
import { store } from './store';

import '../scss/app.scss';

createInertiaApp({
  resolve: name => {
    // @ts-ignore
    return resolvePageComponent(`./pages/${name}/index.tsx`, import.meta.glob('./pages/**/*.tsx'));
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <Provider store={store}>
        <App {...props} />
      </Provider>
    );
  },
});
