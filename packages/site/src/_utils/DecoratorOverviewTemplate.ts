function DecoratorOverviewTemplate(baseName: string) {
    const { html, read, mdRaw } = require('@quark-elements/doc');

    const config = {
        layout: baseName,
        title: 'Decorators',
        data: `${baseName}componentdata`
    }

    const render = (data) => {
        const md_data = read('packages/site/src/_content/decorators/overview.md');
        const summaries = data.summaries.decorators;

        return html`
            <article class="md-content">
                ${mdRaw(md_data)}
            </article>

            ${summaries && summaries.length > 0? html`
                <div class="md-content">
                    <h2>Additional Decorators</h2>

                    <table class="summary-table">
                        <thead>
                            <tr>
                                <th>Decorator</th>
                                <th>Summary</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${summaries.map(summary => {
                                return html`
                                    <tr>
                                        <td><a href="/${baseName}/decorators/${summary.name}/">@${summary.name}</a></td>
                                        <td>${summary.summary}</td>
                                    </tr>
                                `;
                            })}
                        </tbody>
                    </table>
                </div>
            ` : null}
        `;
    };

    return {
        config,
        render,
    };
}

module.exports = {
    DecoratorOverviewTemplate
}