/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { themeManager } from "../../index";
import { html, css, LitElement } from 'lit';

export class DemoIconVariantSwitcher extends LitElement {
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
            variants: {
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
        this.variants = [];
        this.selectedIndex = 0;
    }

    render() {
        return html`
            <div class="title">Icon Variant</div>
            <div class="container">
                ${this.variants.map((variant, index) => html`
                    <div class="item">
                        <input type="radio" id="${variant}" name="variant" @change="${this._variantChanged}" ?checked="${this.selectedIndex === index}">
                        <label for="${variant}">${variant}</label>
                    </div>
                `)}
            </div>
        `;
    }

    load() {
        this.variants = [...themeManager.iconVariants];
    }

    _variantChanged(e) {
        if (e.target.checked) {
            themeManager.iconVariant = e.target.id;
        }
    }
}

window.customElements.define('demo-icon-variant-switcher', DemoIconVariantSwitcher);