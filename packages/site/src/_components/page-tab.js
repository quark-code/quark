/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class PageTab extends QuarkElement {
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

    static get properties() {
        return {
            label: {
                type: String
            }
        }
    }

    constructor() {
        super();

        this.label = '';
    }

    render() {
        return html`
            <slot></slot>
        `;
    }
}

PageTab.register('page-tab');