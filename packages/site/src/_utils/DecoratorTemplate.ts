function DecoratorTemplate(baseName: string, packages?: Array<string>) {
    const { html, escape } = require('@quark-elements/doc');

    let includes: Array<string> = [`${baseName}_demos_decorators_`, `${baseName}_samples_decorators_`];

    if (packages && packages.length> 0) {
        packages.forEach(package => {
            includes = [...includes, ...[`${package}_demos_decorators_`, `${package}_samples_decorators_`]]
        });
    }

    const config = {
        layout: baseName,
        title: 'Decorators',
        data: `${baseName}componentdata`,
        include: includes
    }
      
    const render = (data, include) => {
        const decorators = data.decorators;

        return decorators.map(decorator => {
            const demoName = `${decorator.packageName}_demos_decorators_${decorator.name}`;
            const sampleName = `${decorator.packageName}_samples_decorators_${decorator.name}`;

            return {
                title: decorator.name,
                name: decorator.name,
                content: html`
                    <component-header display-name="${decorator.displayName}" detail="@${decorator.name} from ${decorator.packageName}" summary="${decorator.summary}"></component-header>

                    ${include[sampleName] ? html`
                        <collapsible-panel label="Overview" persist-key="${decorator.name}_decorator_overview">
                            <section>${include[sampleName]()}</section>
                        </collapsible-panel>
                    `: null}

                    ${include[demoName] ? html`
                        <collapsible-panel label="Demo" persist-key="${decorator.name}_decorator_demo">
                            <section>${include[demoName]()}</section>
                        </collapsible-panel>
                    `: null}

                    <collapsible-panel label="API" persist-key="${decorator.name}_decorator_api">
                        <div>TODO</div>
                    </collapsible-panel>
                `
            }
        });
    }

    return {
        config,
        render
    }
}

module.exports = {
    DecoratorTemplate
}