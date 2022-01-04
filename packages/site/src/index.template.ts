(function () {
    const { html } = require('@quark-elements/doc');

    const config = {
        layout: 'default',
        title: 'Home',
        data: 'defaultnavigationdata'
    }

    const render = (data, include) => {
        //console.log(data)
        return html`
        <h1>Quark Elements Documentation</h1>

        <article class="card-container">
            ${data.map(item => html`
                <section class="card">
                    <a href="${item.url}" target="_blank">
                        <h2 class="card-label">${item.label}</h2>
                        <p class="card-description">${item.description}</p>
                    </a>
                </section>
            `)}
        </article>
    `;
    };

    module.exports = {
        config: config,
        render: render,
    };
})();