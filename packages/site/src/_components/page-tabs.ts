/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
//import { LitElement } from 'lit';
import { QuarkElement } from '@quark-elements/core/elements';
import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './page-tab.js';

export class PageTabs extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --page-tabs-background: transparent;
                --page-tabs-on-background: #181818;
                --page-tabs-background-hover: #E0E0E0;
                --page-tabs-on-background-hover: #181818;
                --page-tabs-background-selected: #C2E7FF;
                --page-tabs-on-background-selected: #181818;
                --page-tabs-outline: #E4E4E4;
                --page-tabs-font: 500 14px/14px Roboto, 'Noto Sans SC', sans-serif;
                */
                display: block;
                overflow: hidden;
                flex: 1;
                color: var(--page-tabs-on-background, #181818);
                background-color: var(--page-tabs-background, transparent);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                display: flex;
                flex-direction: column;
                flex-wrap: nowrap;
                height: 100%;
                overflow: hidden;
            }

            .tab-container {
                display: flex;
                flex-wrap: nowrap;
                justify-content: center;
                align-items: center;
                gap: 16px;
                padding: 16px;
                border-bottom: 1px solid var(--page-tabs-outline, #E4E4E4);
            }

            .tab-content {
                flex: 1;
                overflow-x: hidden;
                overflow-y: auto;
            }

            .tab {
                display: flex;
                flex-wrap: nowrap;
                justify-content: center;
                align-items: center;
                padding: 8px 24px;
                border-radius: 9999px;
                border: none;
                color: var(--page-tabs-on-background, #181818);
                background-color: var(--page-tabs-background, transparent);
                height: 40px;
                box-sizing: border-box;
                cursor: pointer;
                user-select: none;
                font: var(--page-tabs-font, 400 14px/14px Roboto, 'Noto Sans SC', sans-serif);
            }

            .tab * {
                pointer-events: none;
            }

            .tab:hover {
                color: var(--page-tabs-on-background-hover, #181818);
                background-color: var(--page-tabs-background-hover, #E0E0E0);
            }

            .tab[selected] {
                color: var(--page-tabs-on-background-selected, #181818);
                background-color: var(--page-tabs-background-selected, #C2E7FF);
            }

            .tab:focus-visible {
                outline: 2px solid var(--page-tabs-on-background-selected, #181818);
                outline-offset: 2px;
            }
        `];
    }

    @property({ type: String, attribute: 'persist-key' })
    persistKey: string = 'tabs';

    @property({ type: Number, attribute: 'selected-index' })
    selectedIndex: number = 0;

    private _tabs: Array<any> = [];
    private _boundHandleSlotChangeEvent = this._handleSlotChangeEvent.bind(this); 

    connectedCallback() {
        super.connectedCallback();
        this.renderRoot.addEventListener('slotchange', this._boundHandleSlotChangeEvent);
    }

    firstUpdated() {
        this._getState();
    }

    updated(changedProperties) {
        if (changedProperties.has('selectedIndex')) {
            this._tabSwitch();
            this._setState();
        }
    }

    render() {
        return html`
            <div class="container">
                <div class="tab-container">
                    ${this._tabs.map((tab, index) => this._renderTab(tab, index))}
                </div>
                <div class="tab-content">
                    <slot></slot>
                </div>
            </div>
        `;
    }

    _renderTab(tab, index) {
        //return html`<div class="tab" tabindex="0" ?selected="${index === this.selectedIndex}" .index="${index}" @click="${this._tabClick}">${tab.label}</div>`;
        return html`<button role="button" type="button" aria-disabled="false" class="tab" tabindex="0" ?selected="${index === this.selectedIndex}" .index="${index}" @click="${this._tabClick}">${tab.label}</button>`;
    }

    _handleSlotChangeEvent(e) {
        let slot = this.renderRoot.querySelector('slot');

        const nodes = slot.assignedNodes({ flatten: true }).filter((el) => {
            return (el.nodeType === 1);
        });

        this._tabs = [...nodes];
        this._tabSwitch();
        this.requestUpdate();
    }

    _tabClick(e) {
        this.selectedIndex = e.target.index;
    }

    _tabSwitch() {
        this._tabs.forEach((tab, index) => tab.hidden = this.selectedIndex !== index);
    }

    _getState() {
        if (!this.persistKey || !window.stateManager) return;

        this.selectedIndex = window.stateManager.getValue(this.persistKey) || 0;
    }

    _setState() {
        if (!this.persistKey || !window.stateManager) return;
        window.stateManager.setValue(this.persistKey, this.selectedIndex)
    }
}

PageTabs.register('page-tabs');