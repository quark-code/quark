import { QuarkCustomTagsPlugin } from '../QuarkCustomTagsPlugin.mjs';
//const packageData = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
//const { name, description, version, author, homepage, license } = packageData;

export default {
    globs: ['packages/core/**/*.js', 'packages/material/**/*.js'],
    exclude: ['packages/core/(node_modules|demo|test|manifests)/**/*.js', 'packages/material/(node_modules|demo|demo-build|docs|docs-src|test|manifests)/**/*.js'],
    outdir: './manifests/material',
    litelement: true,
    dev: false,

    plugins: [
        // Parse custom jsDoc tags
        QuarkCustomTagsPlugin
    ]
};