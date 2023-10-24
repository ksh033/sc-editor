import { defineConfig } from 'umi';

export default defineConfig({
 // extraBabelPresets:[["es2015", {"modules": false}]],
  routes: [
    { path: '/', component: 'index' },
    { path: '/docs', component: 'docs' },
  ],
  npmClient: 'yarn',
  mfsu: false,
});
