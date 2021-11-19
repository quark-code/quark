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
            <div>test-element</div>
        `;
    }
}

customElements.define('test-element', TestElement);