function DecoratorTemplate(baseName: string, packages?: Array<string>) {
    const { html, mdRaw } = require('@quark-elements/doc');

    let includes: Array<string> = [`${baseName}_samples_decorators_`];

    if (packages && packages.length> 0) {
        packages.forEach(package => {
            includes = [...includes, ...[`${package}_samples_decorators_`]]
        });
    }

    function _buildParamString(params) {
        if (params && params.length > 0) {
            return params.map(p => `${p.name}${p.optional ? '?' : ''}${p.type && p.type.text ? `: ${p.type.text}` : ''}`);
        }

        return '';
    }

    function _buildReturnValue(ret) {
        if (ret && ret.type && ret.type.text) {
            return ret.type.text;
        }

        return 'void';
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
            const sampleName = `${decorator.packageName}_samples_decorators_${decorator.name}`;

            return {
                title: decorator.name,
                name: decorator.name,
                content: html`
                    <component-header display-name="${decorator.displayName}" detail="@${decorator.name} from ${decorator.packageName}" summary="${decorator.summary}"></component-header>
                    
                    <div style="padding: 16px; overflow-y: auto;">
                        <decorator-part name="${decorator.name}" params="${_buildParamString(decorator.parameters)}" return-value="${_buildReturnValue(decorator.return)}"></decorator-part>
                    
                        ${include[sampleName] ? html`
                            <section>${include[sampleName]()}</section>
                        `: decorator.description ? html`
                            <section class="md-content">${mdRaw(decorator.description)}</section>
                        ` : null}
                    </div>
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