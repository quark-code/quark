import merge from 'deepmerge';
import { createSpaConfig } from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
  outputDir: 'packages/theme/demo-build',
  developmentMode: process.env.ROLLUP_WATCH === 'true',
  injectServiceWorker: false,
  workbox: false
});

export default merge(baseConfig, {
  input: 'packages/theme/demo/index.html'
});
