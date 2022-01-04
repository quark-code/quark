import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const plugins = [
    replace({'Reflect.decorate': 'undefined', 'preventAssignment': true}),
    resolve(),
    minifyHTML(),
    terser({
        ecma: 2017,
        module: true,
        //warnings: true,
        mangle: {
        properties: {
            regex: /^__/,
        },
        },
    }),
    summary({}),
];

const warningOverride = function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
}

export default [
    {
        input: 'packages/site/src/index.js',
        output: {
            file: 'packages/site/dest/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins,
        onwarn: warningOverride
    },
    {
      input: 'packages/site/src/doc/index.js',
      output: {
          file: 'packages/site/dest/doc/index.bundle.js',
          format: 'esm',
      },
      plugins: plugins,
      onwarn: warningOverride
  },
    {
        input: 'packages/site/src/theme/index.js',
        output: {
            file: 'packages/site/dest/theme/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins,
        onwarn: warningOverride
    },
    {
        input: 'packages/site/src/core/index.js',
        output: {
            file: 'packages/site/dest/core/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins,
        onwarn: warningOverride
    },
    {
        input: 'packages/site/src/material/index.js',
        output: {
            file: 'packages/site/dest/material/index.bundle.js',
            format: 'esm',
        },
        plugins: plugins,
        onwarn: warningOverride
    }
];