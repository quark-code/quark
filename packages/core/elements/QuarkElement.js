/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, html, svg, LitElement } from 'lit';
import { adoptStyles } from '@lit/reactive-element/css-tag.js';
import '../utils/ScopedCustomElementRegistry.js';

const QuarkElements = new Set();

const updateDir = () => {
    const dir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';

    QuarkElements.forEach((el) => {
        el.setAttribute('dir', dir);
    });
};

const dirObserver = new MutationObserver(updateDir);

dirObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['dir'],
});

class QuarkElement extends LitElement {
    static as(name) {
        name = name || this.defaultTag;
        
        if (name && !customElements.get(name)) {
            customElements.define(name, this);
        }
    }

    static asDefault() {
        const name = this.defaultTag;
        
        if (name && !customElements.get(name)) {
            customElements.define(name, this);
        }
    }

    static get properties() {
        return {

        }
    }

    get isLTR() {
        return this.dir === 'ltr';
    }

    constructor() {
        super();
        this.dir = 'ltr';
    }

    connectedCallback() {
        super.connectedCallback();

        this.setAttribute('dir', document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr');
        QuarkElements.add(this);
    }

    disconnectedCallback() {
        QuarkElements.delete(this);
        super.disconnectedCallback();
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