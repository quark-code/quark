/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';
import '../button/qb-button.js';

class QbStepper extends QuarkElement {

    static get styles() {
        return [css`
            :host {
                display: block;
                padding: 16px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            qb-button {
                margin-right: 24px;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <qb-button label="back"></qb-button>
                <qb-button label="next"></qb-button>
                <qb-button label="finish"></qb-button>
            </div>
        `;
    }
}

QbStepper.register('qb-stepper');