/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class CollapsiblePanel extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --collapsible-panel-background: transparent;
                --collapsible-panel-on-background: #181818;
                --collapsible-panel-border: 1px solid #E4E4E4;
                --collapsible-panel-outline: 2px solid #181818;
                --collapsible-panel-font: 500 16px/16px Roboto, 'Noto Sans SC', sans-serif;
                */
                display: block;
                color: var(--collapsible-panel-on-background, #181818);
                background-color: var(--collapsible-panel-background, transparent);
                border-bottom: var(--collapsible-panel-border, 1px solid #E4E4E4);
            }

            /*
            :host(:not(:last-of-type)) {
                border-bottom: var(--collapsible-panel-border, 1px solid #E4E4E4);
            }
            */
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .container {
                padding: 16px;
            }

            .label {
                display: flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                color: var(--collapsible-panel-on-background, #181818);
                background-color: var(--collapsible-panel-background, transparent);
                border: none;
                border-radius: 9999px;
                cursor: pointer;
                user-select: none;
                font: var(--collapsible-panel-font, 500 16px/16px Roboto, 'Noto Sans SC', sans-serif);
            }

            .label:focus-visible {
                outline: var(--collapsible-panel-outline, 2px solid #181818);
                outline-offset: 6px;
            }

            .label * {
                pointer-events: none;
            }

            .content {
                padding-top: 16px; 
            }

            svg {   
                transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                transform: rotate(0deg);
                fill: var(--collapsible-panel-on-background, #181818);
            }

            svg[collapsed] {
                transform: rotate(-90deg);
            }
        `];
    }

    static get properties() {
        return {
            label: {
                type: String
            },

            collapsed: {
                type: Boolean
            },

            persistKey: {
                type: String,
                attribute: 'persist-key'
            }
        }
    }

    constructor() {
        super();

        this.label = '';
        this.collapsed = false;
        this.persistKey = '';
    }

    firstUpdated() {
        this._getState();
    }

    render() {
        return html`
            <div class="container">
                <button class="label" role="button" type="button" aria-disabled="false" tabindex="0" @click="${this._toggle}">${this.label}<svg ?collapsed="${this.collapsed}" width="24" height="24" viewBox="0 0 24 24"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g></svg></button>
                <div class="content" ?hidden="${this.collapsed}"><slot></slot></div>
            </div>
        `;
    }

    _toggle() {
        this.collapsed = !this.collapsed;
        this._setState();
    }

    _getState() {
        if (!this.persistKey || !window.stateManager) return;
        this.collapsed = window.stateManager.getValue(this.persistKey) ? true : false;
    }

    _setState() {
        if (!this.persistKey || !window.stateManager) return;
        window.stateManager.setValue(this.persistKey, this.collapsed)
    }
}

CollapsiblePanel.register('collapsible-panel');