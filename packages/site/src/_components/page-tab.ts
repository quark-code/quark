/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements';
import { html, css } from 'lit';
import { property } from 'lit/decorators.js';

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

            :host([indent]) {
                padding: 24px;
            }
        `];
    }

    @property({ type: String })
    label: string = '';

    render() {
        return html`
            <slot></slot>
        `;
    }
}

PageTab.register('page-tab');