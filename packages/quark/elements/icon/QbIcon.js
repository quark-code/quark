/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from "@quark-elements/theme";
import { html, css, QuarkElement } from '@quark-elements/core/elements';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

export class QbIconElement extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                display: inline-block;
                width: 24px;
                height: 24px;
            }

            svg {
                fill: var(test-foreground-color);
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
        const icon = themeManager.getIcon(this.icon);

        return html`
            ${icon ? unsafeHTML(icon.content) : null}
        `;
    }
}

export function QbIcon(name = 'qb-icon') {
    QbIconElement.as(name);
}
