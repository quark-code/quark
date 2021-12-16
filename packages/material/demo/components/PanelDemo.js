/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';
import { QmFilledPanel, QmFlatPanel, QmOutlinedPanel, QmRaisedPanel } from '../../elements/panel';
import { bodyLarge } from '../../styling';

export class PanelDemo extends QuarkElement {
    static get defaultTag() {
        return 'panel-demo';
    }

    static elementDefinitions = {
        'demo-filled-panel': QmFilledPanel,
        'demo-flat-panel': QmFlatPanel,
        'demo-outlined-panel': QmOutlinedPanel,
        'demo-raised-panel': QmRaisedPanel
    };

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
                <demo-flat-panel>Flat Panel</demo-flat-panel>
                <demo-outlined-panel>Outlined Panel</demo-outlined-panel>
                <demo-filled-panel>Filled panel</demo-filled-panel>
                <demo-raised-panel>Raised Panel</demo-raised-panel>
            </div>
        `;
    }
}