const { html } = require('@quark-elements/doc');

const render = (data) => {
    return html`
        <doc-navigator id="docNavigator" path="${data.path}"></doc-navigator>

        <script>
            const docNavigator = document.getElementById('docNavigator');
            docNavigator.data = JSON.parse(${"'" + JSON.stringify(data.categories) + "'"});
        </script>
    `;
};

module.exports = {
   render: render,
};
