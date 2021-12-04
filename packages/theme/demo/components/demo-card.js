/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, LitElement } from 'lit';

export class DemoCard extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                color: var(--theme-on-surface-color);
                background-color: var(--theme-surface-color);
                padding: 16px 32px;
                border-radius: 5px;
                border: 1px solid var(--theme-border-color);
                box-sizing: border-box;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {

        };
    }

    constructor() {
        super();

    }

    render() {
        return html`<slot></slot>`;
    }
}

window.customElements.define('demo-card', DemoCard);