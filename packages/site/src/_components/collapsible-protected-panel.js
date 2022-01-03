/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class CollapsibleProtectedPanel extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --collapsible-protected-panel-background: #E0E0E0;
                --collapsible-protected-panel-on-background: #181818;
                --collapsible-protected-panel-outline: #181818;
                --collapsible-protected-panel-font: 400 12px/16px Roboto, 'Noto Sans SC', sans-serif;
                --collapsible-protected-panel-border-radius: 8px;
                */
                display: block;

            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .label {
                display: inline-flex;
                flex-wrap: nowrap;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                user-select: none;
                color: var(--collapsible-protected-panel-on-background, #181818);
                background-color: var(--collapsible-protected-panel-background, #E0E0E0);
                font: var(--collapsible-protected-panel-font, 400 12px/16px Roboto, 'Noto Sans SC', sans-serif);
                border-radius: var(--collapsible-protected-panel-border-radius, 8px);
                border: none;
                padding: 8px 16px;
                margin-top: 16px;
            }

            .label * {
                pointer-events: none;
            }

            .label:focus-visible {
                outline: 2px solid var(--collapsible-protected-panel-outline, #181818);
                outline-offset: 2px;
            }
        `];
    }

    static get properties() {
        return {
            labelOpen: {
                type: String,
                attribute: 'label-open'
            },

            labelClosed: {
                type: String,
                attribute: 'label-closed'
            },

            collapsed: {
                type: Boolean,
                reflect: true
            },

            persistKey: {
                type: String,
                attribute: 'persist-key'
            }
        }
    }

    constructor() {
        super();

        this.labelOpen = '';
        this.labelClosed = '';
        this.collapsed = false;
        this.persistKey = '';
    }

    firstUpdated() {
        this._getState();
    }

    render() {
        return html`
            <div class="container">
                <div ?hidden="${this.collapsed}"><slot></slot></div>
                <button role="button" type="button" aria-disabled="false" class="label" tabindex="0" @click="${this._toggle}">${this.collapsed ? this.labelClosed : this.labelOpen}</button>
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

CollapsibleProtectedPanel.register('collapsible-protected-panel');