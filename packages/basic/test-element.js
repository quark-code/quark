import { html, css, QuarkElement } from '@quark-code/core/QuarkElement.js';

export class TestElement extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    render() {
        return html`
            <h3>test-element</h3>
        `;
    }
}

customElements.define('test-element', TestElement);