/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements/QuarkElement.js';
import { html, css } from 'lit';
import '../../elements/panel/qm-filled-panel.js';
import '../../elements/panel/qm-flat-panel.js';
import '../../elements/panel/qm-outlined-panel.js';
import '../../elements/panel/qm-raised-panel.js';
import { bodyLarge } from '../../theme/tokens/typography.js';

export class PanelDemo extends QuarkElement {
    static get styles() {
        return [bodyLarge,
            css`
                :host {
                    display: block;
                }
        
                :host([hidden]) {
                    display: none !important;
                }
        
                :host([disabled]) {
                    pointer-events: none;
                }

                .container {
                    display: flex;
                }

                .container > * {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin: 16px;
                    width: 200px;
                    height: 150px;
                    padding: var(--md-sys-spacing-2);
                }
            `
        ];
    }

    render() {
        return html`
            <div class="container typography-body-large">
                <qm-flat-panel>Flat Panel</qm-flat-panel>
                <qm-outlined-panel>Outlined Panel</qm-outlined-panel>
                <qm-filled-panel>Filled panel</qm-filled-panel>
                <qm-raised-panel>Raised Panel</qm-raised-panel>
            </div>
        `;
    }
}

PanelDemo.register('panel-demo');