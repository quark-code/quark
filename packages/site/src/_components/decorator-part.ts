/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements';
import { html, css } from 'lit';
import { property } from 'lit/decorators.js';

export class DecoratorPart extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --decorator-part-background: transparent;
                --decorator-part-on-background: #181818;
                --decorator-part-font-mono: 400 14px/20px 'Roboto Mono', monospace;
                */
                display: block;
                color: var(--decorator-part-on-background, #181818);
                background-color: var(--decorator-part-background, transparent);
                padding-bottom: 16px;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .signature {
                display: flex;
                font: var(--decorator-part-font-mono, 400 14px/20px 'Roboto Mono', monospace);
            }

            .name {
                font-weight: 600;
            }
        `];
    }

    @property({ type: String })
    name: string = '';

    @property({ type: String })
    params: string = '';

    @property({ type: String, attribute: 'return-value' })
    returnValue: string = '';

    render() {
        return html`
            <div class="signature"><span class="name">@${this.name}</span><span class="params">(${this.params}): ${this.returnValue}</span></div>
        `;
    }
}

DecoratorPart.register('decorator-part');