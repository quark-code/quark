let  components = require('../../custom-elements.json');

//components = components.modules.filter(module => !module.path.endsWith('index.js'));

const componentData = {
    components: [],
    designTokens: [],
    cssModules: [],
    themes: []
}

components.modules.forEach(m => {
    m.declarations.forEach(d => {
        const type = d.type?.text;

        if (type) {
            switch (type) {
                case 'component': {
                    componentData.components.push({
                        name: d.name,
                        displayName: d.displayname,
                        category: d.category ?? d.displayname,
                        tagName: d.tagName,
                        summary: d.summary
                    });
                    break;
                }

                case 'designtoken': {
                    componentData.designTokens.push(d);
                    break;
                }

                case 'cssmodule': {
                    componentData.cssModules.push(d);
                    break;
                }

                case 'theme': {
                    componentData.themes.push(d);
                    break;
                }
            }
        }
    });
});

//console.log(componentData);

module.exports = () => {
    return componentData;
};