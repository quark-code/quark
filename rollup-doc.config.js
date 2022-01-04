import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const plugins = [
    replace({'Reflect.decorate': 'undefined', 'preventAssignment': true}),
    resolve(),
    terser({
        ecma: 2017,
        module: true,
        warnings: true,
        mangle: {
        properties: {
            regex: /^__/,
        },
        },
    }),
    summary(),
];

export default [
    {
        input: 'packages/site/src/index.js',
        output: {
            file: 'packages/site/dest/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins
    },
    {
      input: 'packages/site/src/doc/index.js',
      output: {
          file: 'packages/site/dest/doc/index.bundle.js',
          format: 'esm',
      },
      plugins: plugins
  },
    {
        input: 'packages/site/src/theme/index.js',
        output: {
            file: 'packages/site/dest/theme/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins
    },
    {
        input: 'packages/site/src/core/index.js',
        output: {
            file: 'packages/site/dest/core/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins
    },
    {
        input: 'packages/site/src/material/index.js',
        output: {
            file: 'packages/site/dest/material/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins
    }
];