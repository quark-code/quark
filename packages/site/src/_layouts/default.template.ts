(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
    }

    const render = (data, include) => {
        return html`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="./styles.css">
            <title>${data.title}</title>

            <script src="./index.bundle.js">
            </script>

            <script>
                window.addEventListener('load', (event) => {
                    document.querySelector('body').removeAttribute('hidden');
                });
            </script>
        </head>
        <body hidden>
            ${data.content}
        </body>
        </html>
    `;
    };

    module.exports = {
        config: config,
        render: render,
    };
})();