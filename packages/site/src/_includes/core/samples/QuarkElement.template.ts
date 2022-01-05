(function () {
    const { html } = require('@quark-elements/doc');

    const render = (data) => {
        return html`
        <div>Quark Element Sample</div>
    `;
    };

    module.exports = {
        render: render,
    };
})();
