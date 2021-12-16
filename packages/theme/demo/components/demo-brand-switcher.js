/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from "../../index";
import { html, css, LitElement } from 'lit';

export class DemoBrandSwitcher extends LitElement {
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
            brands: {
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
        this.brands = [];
        this.selectedIndex = 0;
    }

    render() {
        return html`
            <div class="title">Brand</div>
            <div class="container">
                ${this.brands.map((brand, index) => html`
                    <div class="item">
                        <input type="radio" id="${brand}" name="brand" @change="${this._brandChanged}" ?checked="${this.selectedIndex === index}">
                        <label for="${brand}">${brand}</label>
                    </div>
                `)}
            </div>
        `;
    }

    load() {
        this.brands = [...themeManager.themeNames];
    }

    _brandChanged(e) {
        if (e.target.checked) {
            themeManager.use(e.target.id);
        }
    }
}

window.customElements.define('demo-brand-switcher', DemoBrandSwitcher);