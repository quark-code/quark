/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class DocComponentTabs extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                --component-tab-background: var(--md-sys-color-surface);
                --component-tab-on-background: var(--md-sys-color-on-surface);
                --component-tab-background-hover: var(--md-sys-color-surface-variant);
                --component-tab-on-background-hover: var(--md-sys-color-on-surface-variant);
                --component-tab-background-active: var(--md-sys-color-secondary-container);
                --component-tab-on-background-active: var(--md-sys-color-on-secondary-container);
                --component-tab-background-active-hover: var(--md-sys-color-primary);
                --component-tab-on-background-active-hover: var(--md-sys-color-on-primary);
                --component-tab-border-radius: var(--md-sys-border-radius-5);
                --component-tab-font: var(--md-sys-typescale-body-large);
                --component-tabs-border: 1px solid var(--md-sys-color-outline);

                display: block;
                user-select: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            svg {
                margin-right: 8px;
            }

            .tabs {
                display: flex;
                flex-wrap: nowrap;
                justify-content: center;
                border-bottom: var(--component-tabs-border);
            }

            .tab {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 48px;
                margin: 16px;
                padding: 0 16px;
                box-sizing: border-box;
                cursor: pointer;
                background-color: var(--component-tab-background);
                color: var(--component-tab-on-background);
                fill: var(--component-tab-on-background);
                border-radius: var(--component-tab-border-radius);
                font: var(--component-tab-font);
                line-height: 16px;
            }

            .tab * {
                pointer-events: none;
            }

            .tab:hover {
                background-color: var(--component-tab-background-hover);
                color: var(--component-tab-on-background-hover);
                fill: var(--component-tab-on-background-hover);
            }

            .tab[active] {
                cursor: default;
            }

            .tab[active]:not(:hover) {
                background-color: var(--component-tab-background-active);
                color: var(--component-tab-on-background-active);
                fill: var(--component-tab-on-background-active);
            }

            .tab[active]:hover {
                background-color: var(--component-tab-background-active-hover);
                color: var(--component-tab-on-background-active-hover);
                fill: var(--component-tab-on-background-active-hover);
            }

            .tab:focus {
                outline-offset: 2px;
                outline: 2px solid var(--component-tab-on-background-active);
            }

            .content-item {
                display: none;
                height: 100%;
            }

            .content-item[active] {
                display: block;
            }

            .container {
                display: flex;
                flex-direction: column;
                height: 100%;
            }

            .content {
                flex: 1;
            }
        `];
    }

    static get properties() {
        return {
            tabs: {
                type: Array
            },

            selectedIndex: {
                type: Number
            }
        }
    }

    constructor() {
        super();

        this.tabs = [
            {
                label: 'Overview',
                slot: 'overview',
                icon: html`<svg width="24" height="24" viewBox="0 0 24 24"><g id="info-outline"><path d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"></path></g></svg>`
            },
            {
                label: 'Demos',
                slot: 'demos',
                icon: html`<svg width="24" height="24" viewBox="0 0 24 24"><g id="laptop-chromebook"><path d="M22 18V3H2v15H0v2h24v-2h-2zm-8 0h-4v-1h4v1zm6-3H4V5h16v10z"></path></g></svg>`
            },
            {
                label: 'Documentation',
                slot: 'documentation',
                icon: html`<svg width="24" height="24" viewBox="0 0 24 24"><g id="settings"><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g></svg>`
            }
        ];

        this.selectedIndex = 0;
    }

    render() {
        return html`
            <div class="container">
                <div class="tabs">
                    ${this.tabs.map((tab, index) => html`<div tabindex="0" @click="${this._tabClick}" index="${index}" class="tab" ?active="${index === this.selectedIndex}">${tab.icon} ${tab.label}</div>`)}
                </div>
                <div class="content">
                    ${this.tabs.map((tab, index) => html`
                        <div index="${index}" class="content-item" ?active="${index === this.selectedIndex}">
                            <slot name="${tab.slot}">${tab.label}: Nothing to see here, folks!</slot>
                        </div>
                    `)}
                </div>
            </div>
        `;
    }

    _tabClick(e) {
        const tab = e.target;
        this.selectedIndex = Number(tab.getAttribute('index'));
    }
}

window.customElements.define('doc-component-tabs', DocComponentTabs);