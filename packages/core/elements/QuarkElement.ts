/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, html, svg, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import { DesignTokenShape } from '@quark-elements/theme/lib/Types.js';
const QuarkElements = new Set<HTMLElement>();

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
    static _tokensRegistered = false;
    static designTokens? : DesignTokenShape;

    static _registerTokens() {
        if (!this._tokensRegistered) {
            const constructor = this.constructor as typeof QuarkElement;
            const { designTokens } = constructor;
            if (designTokens && window.designSystemProvider) {
                window.designSystemProvider.registerTokens(designTokens);
            }

            this._tokensRegistered = true;
        }
    }

    static register(tagName: string) {
        this._registerTokens();
        window.customElements.define(tagName, this);
    }

    /**
    * The text direction.
    * @type {string}
    * @allowedvalues ["ltr", "rtl"]
    */
    @property({ type: String, reflect: true })
    dir: string = 'ltr';

    /**
    * Whether or not the text direction is LTR (default) or RTL.
    * @type {boolean}
    * @readonly true
    * @default true
    */
    @property({ type: Boolean })
    get isLTR() {
        return this.dir === 'ltr';
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