/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';
import '../../elements/panel/qm-outlined-panel.js';

export class ThemeDemo extends QuarkElement {
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

                input {
                    margin: 0 4px 3px 0;
                }

                .container {
                    display: grid;
                    grid-template-columns: min-content min-content min-content min-content;
                    grid-template-rows: auto;
                    grid-gap: 8px;
                }

                .section {
                    padding: 16px 24px;
                }

                .title {
                    font: var(--md-sys-typescale-title-medium);
                    text-transform: var(--md-sys-typescale-title-medium-transform);
                    margin-bottom: 8px;
                }

                .section-container {
                    display: flex;
                    flex-wrap: nowrap;
                    font: var(--md-sys-typescale-body-medium);
                    text-transform: var(--md-sys-typescale-body-medium-transform);
                }

                .section-item {
                    display: flex;
                    align-items: center;
                    margin-right: 24px;
                }

                .section-item:last-child {
                    margin-right: 0;
                }
            `
        ];
    }

    static get properties() {
        return {
            brands: {
                type: Array
            },

            selectedBrandIndex: {
                type: Number,
                attribute: 'selected-brand-index'
            },

            modes: {
                type: Array
            },

            selectedModeIndex: {
                type: Number,
                attribute: 'selected-mode-index'
            },

            densities: {
                type: Array
            },

            selectedDensityIndex: {
                type: Number,
                attribute: 'selected-index'
            },

            devices: {
                type: Array
            },

            selectedDeviceIndex: {
                type: Number,
                attribute: 'selected-index'
            }
        }
    }

    constructor() {
        super();

        this.brands = [];
        this.selectedBrandIndex = 0;

        this.modes = ['System', 'Light', 'Dark'];
        this.selectedModeIndex = 0;

        this.densities = ['Compact', 'Comfortable', 'Sparse'];
        this.selectedDensityIndex = 1;

        this.devices = ['Desktop', 'Mobile'];
        this.selectedDeviceIndex = 0;
    }

    connectedCallback() {
        super.connectedCallback();

        window.addEventListener('load', () => {
            this.brands = [...themeManager.themeNames];
        });
    }

    render() {
        return html`
            <div class="container">
                <qm-outlined-panel class="section">
                    <div class="title">Brand</div>
                    <div class="section-container">
                        ${this.brands.map((item, index) => html`
                            <div class="section-item">
                                <input type="radio" id="${item}" name="brand" @change="${this._brandChanged}" ?checked="${this.selectedBrandIndex === index}">
                                <label for="${item}">${item}</label>
                            </div>
                        `)}
                    </div>
                </qm-outlined-panel>
                <qm-outlined-panel class="section">
                    <div class="title">Mode</div>
                    <div class="section-container">
                        ${this.modes.map((item, index) => html`
                            <div class="section-item">
                                <input type="radio" id="${item}" name="mode" @change="${this._modeChanged}" ?checked="${this.selectedModeIndex === index}">
                                <label for="${item}">${item}</label>
                            </div>
                        `)}
                    </div>
                </qm-outlined-panel>
                <qm-outlined-panel class="section">
                    <div class="title">Density</div>
                    <div class="section-container">
                        ${this.densities.map((item, index) => html`
                            <div class="section-item">
                                <input type="radio" id="${item}" name="density" @change="${this._densityChanged}" ?checked="${this.selectedDensityIndex === index}">
                                <label for="${item}">${item}</label>
                            </div>
                        `)}
                    </div>
                </qm-outlined-panel>
                <qm-outlined-panel class="section">
                    <div class="title">Device</div>
                    <div class="section-container">
                        ${this.devices.map((item, index) => html`
                            <div class="section-item">
                                <input type="radio" id="${item}" name="device" @change="${this._densityChanged}" ?checked="${this.selectedDeviceIndex === index}">
                                <label for="${item}">${item}</label>
                            </div>
                        `)}
                    </div>
                </qm-outlined-panel>
            </div>
        `;
    }

    _brandChanged(e) {
        if (e.target.checked) {
            themeManager.use(e.target.id);
        }
    }

    _modeChanged(e) {
        if (e.target.checked) {
            themeManager.mode = e.target.id.toLowerCase();
        }
    }

    _densityChanged(e) {
        if (e.target.checked) {
            themeManager.density = e.target.id.toLowerCase();
        }
    }

    _deviceChanged(e) {
        if (e.target.checked) {
            themeManager.deviceType = e.target.id.toLowerCase();
        }
    }
}

ThemeDemo.register('theme-demo');