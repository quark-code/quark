/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, html, svg, LitElement } from 'lit';
import { adoptStyles } from '@lit/reactive-element/css-tag.js';
import '../utils/ScopedCustomElementRegistry.js';

class QuarkElement extends LitElement {
    static registerElement(name) {
        if (!customElements.get(name)) {
            customElements.define(name, this);
        }
    }

    createRenderRoot() {
        const constructor = this.constructor;
        const { registry, elementDefinitions, shadowRootOptions } = constructor;

        if (elementDefinitions && !registry) {
            constructor.registry = new CustomElementRegistry();
            Object.entries(elementDefinitions).forEach(([tagName, klass]) => constructor.registry.define(tagName, klass));
        }

        const renderRoot = (this.renderOptions.creationScope = this.attachShadow({
            ...shadowRootOptions,
            customElements: constructor.registry,
        }));

        adoptStyles(renderRoot, this.constructor.elementStyles);

        return renderRoot;
    }
}

export { css, html, svg, QuarkElement }