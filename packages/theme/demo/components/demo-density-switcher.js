/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from "../../index";
import { html, css, LitElement } from 'lit';

export class DemoDensitySwitcher extends LitElement {
    static get styles() {
        return [css`
            :host {
                display: block;
                transition: var(--theme-transition);
                margin-right: 32px;
            }

            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-wrap: wrap;
                font: var(--theme-typography-body);
                text-transform: var(--theme-typography-body-transform);
            }

            .title {
                font: var(--theme-typography-subtitle);
                text-transform: var(--theme-typography-subtitle-transform);
                margin-bottom: 16px;
            }

            .item {
                display: flex;
                align-items: center;
                margin-right: 24px;
            }

            input {
                margin: 0 8px 0 0;
            }
        `];
    }

    static get properties() {
        return {
            densities: {
                type: Array
            },

            selectedIndex: {
                type: Number,
                attribute: 'selected-index'
            }
        };
    }

    constructor() {
        super();
        this.densities = ['Compact', 'Comfortable', 'Sparse'];
        this.selectedIndex = 1;
    }

    render() {
        return html`
            <div class="title">Density</div>
            <div class="container">
                ${this.densities.map((density, index) => html`
                    <div class="item">
                        <input type="radio" id="${density}" name="density" @change="${this._densityChanged}" ?checked="${this.selectedIndex === index}">
                        <label for="${density}">${density}</label>
                    </div>
                `)}
            </div>
        `;
    }

    _densityChanged(e) {
        if (e.target.checked) {
            themeManager.density = e.target.id.toLowerCase();
        }
    }
}

window.customElements.define('demo-density-switcher', DemoDensitySwitcher);