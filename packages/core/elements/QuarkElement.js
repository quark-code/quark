/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, html, svg, LitElement } from 'lit';

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

/**
 * @customtype component
 * @summary The base component class for all Quark components.
 * @displayname Element
 * @category Core
 */
class QuarkElement extends LitElement {
    static _registerTokens() {
        if (!this._tokensRegistered) {
            if (this.designTokens && window.designSystemProvider) {
                window.designSystemProvider.registerTokens(this.designTokens);
            }

            this._tokensRegistered = true;
        }
    }

    static register(tagName) {
        this._registerTokens();
        window.customElements.define(tagName, this);
    }

    static get properties() {
        return {
            /**
             * The text direction.
             * @type {string}
             * @allowedvalues ["ltr", "rtl"]
             */
            dir: {
                type: String,
                reflect: true
            },

            /**
             * Whether or not the text direction is LTR (default) or RTL.
             * @type {boolean}
             * @readonly true
             * @default true
            */
            isLTR: {
                type: Boolean
            }
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

        this.dir = document.documentElement.dir === 'rtl' ? 'rtl' : 'ltr';
        QuarkElements.add(this);
    }

    disconnectedCallback() {
        QuarkElements.delete(this);
        super.disconnectedCallback();
    }
}

export { css, html, svg, QuarkElement }