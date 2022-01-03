export default {
    concurrency: 10,
    nodeResolve: true,
    watch: false,
    coverage: false,
    rootDir: '../../',
    files: [
        'packages/**/*.test.js',
        '!**/node_modules/**/*', // exclude any node modules
    ]
};