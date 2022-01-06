(function () {
    const { html } = require('@quark-elements/doc');

    const render = (data) => {
        return html`
        <div>Quark Element Demo</div>
    `;
    };

    module.exports = {
        render: render,
    };
})();
