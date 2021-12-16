const { html } = require('@quark-elements/doc');

const config = {
    include: ['navigator'],
    data: 'navigatordata'
}

const render = (data, include) => {
    return html`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles.css">
            <link rel="stylesheet" href="/syntax-highlighter.css">
            <title>${data.title}</title>

            <script type="module">
                import '/elements.bundled.js';
            </script>

            <script>
                window.addEventListener('load', (event) => {
                    document.querySelector('body').removeAttribute('hidden');
                });
            </script>
        </head>
        <body hidden>
            <article class="layout-main">
                <section>
                    ${include.navigator({
                        categories: data.$.categories,
                        path: data.path 
                    })}
                </section>

                <section class="layout-content">
                    ${data.content}
                </section>
            </article>
        </body>
        </html>
    `;
};

module.exports = {
    config: config,
    render: render,
};