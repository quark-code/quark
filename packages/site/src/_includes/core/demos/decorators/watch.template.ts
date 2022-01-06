(function () {
    const { html } = require('@quark-elements/doc');

    const render = (data) => {
        return html`
        <div>Watch Decorator Demo</div>
    `;
    };

    module.exports = {
        render: render,
    };
})();
