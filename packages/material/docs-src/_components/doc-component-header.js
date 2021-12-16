/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class DocComponentHeader extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                height: 128px;
                margin: 16px 16px 0 16px;
                border-radius: var(--md-sys-border-radius-4);
                background-color: var(--md-sys-color-primary-container);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {

            }
        `];
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <div class="container">
                
            </div>
        `;
    }
}

window.customElements.define('doc-component-header', DocComponentHeader);