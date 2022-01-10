function DesignSystemLayoutTemplate(baseName: string) {
    const { html } = require('@quark-elements/doc');

    const config = {
        data: `${baseName}navigatordata`
    }

    const render = (data) => {
        const level = data.path.split('/').length - 3;
        let rel = `./`;

        for (var i = 0; i < level; i++) {
            rel = `${rel}../`;
        }

        return html`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="${rel}syntax-highlighter.css">
                <link rel="stylesheet" href="${rel}styles.css">
                <title>${data.title}</title>

                <script src="${rel}index.bundle.js">
                </script>

                <script>
                    window.addEventListener('load', (event) => {
                        document.querySelector('body').removeAttribute('hidden');
                    });
                </script>
            </head>
            <body hidden>
                <page-state key="${baseName}"></page-state>
                <page-container>
                    <page-navigator id="nav" slot="navigator"></page-navigator>
                    <div class="page-content" slot="content">
                        ${data.content}
                    </div>
                </page-container>
                
                <script>
                    const nav = document.getElementById('nav');
                    nav.items = JSON.parse(${"'" + JSON.stringify(data.$) + "'"});
                </script>
            </body>
            </html>
        `;
    };

    return {
        config,
        render,
    };
}

module.exports = {
    DesignSystemLayoutTemplate
}