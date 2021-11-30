/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkScopedElement } from '@quark-elements/core/elements';
import { QbButtonElement } from '../button';

class QbStepperElement extends QuarkScopedElement {
    static elementDefinitions = {
        'stepper-button': QbButtonElement,
    };

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

            stepper-button {
                margin-right: 24px;
            }
        `];
    }

    render() {
        return html`
            <div class="container">
                <stepper-button label="back"></stepper-button>
                <stepper-button label="next"></stepper-button>
                <stepper-button label="finish"></stepper-button>
            </div>
        `;
    }
}

function QbStepper(name = 'qb-stepper') {
    QbStepperElement.registerElement(name);
}

export { QbStepper, QbStepperElement }