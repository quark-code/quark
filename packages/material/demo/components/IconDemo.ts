/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements/QuarkElement.js';
import '../../elements/panel/qm-outlined-panel.js';
import '../../elements/image/qm-icon.js';

export class IconDemo extends QuarkElement {
    static get styles() {
        return [
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

                qm-outlined-panel {
                    display: inline-flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 24px;
                }
            `
        ];
    }

    render() {
        const icons = window.themeManager.iconNames;

        return html`
            <qm-outlined-panel class="container">
                ${icons.map(icon => html`<qm-icon icon="${icon}" title="${icon}"></qm-icon>`)}
            </qm-outlined-panel>
        `;
    }
}

IconDemo.register('icon-demo');