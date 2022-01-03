/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from "../../index";
import { html, css, LitElement } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class DemoIcon extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: inline-block;
                transition: var(--theme-transition);
                width: 24px;
                height: 24px;
            }

            svg {
                fill: var(--theme-text-primary-color);
                width: 100%;
                height: 100%;
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
            icon: {
                type: String
            }
        };
    }

    constructor() {
        super();
        this.icon = null;
    }

    render() {
        const icon = themeManager.getIconContent(this.icon);
        return html`${icon ? unsafeHTML(icon) : null}`;
    }
}

window.customElements.define('demo-icon', DemoIcon);