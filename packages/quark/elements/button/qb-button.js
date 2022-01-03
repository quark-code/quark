/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkButtonElement } from '@quark-elements/core/elements';

export class QbButton extends QuarkButtonElement {
    static get styles() {
        return [css`
            :host {
                display: inline-flex;
                align-items: center;
                background-color: var(--test-button-color, cornflowerblue);
                color: var(--test-foreground-color, white);
                border-radius: 9999px;
                padding: 8px 16px;
                box-sizing: border-box;
                height: 40px;
                cursor: pointer;
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
                type: String,
                attribute: 'label'
            }
        }
    }

    constructor() {
        super();

        this.label = '';
    }

    render() {
        return html`
            <div class="container">${this.label}</div>
        `;
    }
}

QbButton.register('qb-button');