/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class SearchField extends QuarkElement {
    static get styles() {
        return [
            css`
                :host {
                    /*
                    --search-field-background: white;
                    --search-field-on-background: #181818;
                    --search-field-outline: #E4E4E4;
                    --search-field-border-radius: 9999px;
                    --search-field-font: 400 14px/14px Roboto, 'Noto Sans SC', sans-serif;
                    */
                    display: block;
                    color: var(--search-field-on-background, #181818);
                    background-color: var(--search-field-background, white);
                    outline: 1px solid var(--search-field-outline, #E4E4E4);
                    border-radius: var(--search-field-border-radius, 9999px);
                    padding: 4px 12px;
                    
                }
        
                :host([hidden]) {
                    display: none !important;
                }
        
                :host([disabled]) {
                    pointer-events: none;
                }

                :host([has-focus]) {
                    outline: 2px solid var(--search-field-on-background, #181818);
                }

                svg {
                    fill: var(--search-field-on-background, #181818);
                    pointer-events: none;
                }

                #clearIcon {
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                    border: none;
                    padding: 0;
                    border-radius: 50%;
                    background-color: transparent;
                }

                #clearIcon:focus-visible {
                    outline: 2px solid var(--search-field-on-background, #181818);
                    outline-offset: 1px;
                }

                input {
                    flex: 1;
                    color: var(--search-field-on-background, #181818);
                    background: transparent;
                    border: none;
                    box-shadow: none;
                    height: 100%;
                    width: 100%;
                    outline: none;
                    padding: 0;
                    margin: 0 8px;
                    font: var(--search-field-font, 400 14px/14px Roboto, 'Noto Sans SC', sans-serif);
                }

                .container {
                    height: 32px;
                    display: flex;
                    align-items: center;
                }
            `
        ];
    }

    static get properties() {
        return {
            label: {
                type: String
            },

            value: {
                type: String
            },

            hasFocus: {
                type: Boolean,
                attribute: 'has-focus',
                reflect: true
            }
        }
    }

    constructor() {
        super();

        this.label = 'Filter';
        this.value = '';
        this.tabIndex = 0;
        this.hasFocus = false;
    }

    render() {
        return html`
            <div class="container">
                ${this._renderSearchIcon()}

                <input id="input" type="text" placeholder="${this.label}" aria-label="${this.label}" .value="${this.value ? this.value : ''}" 
                       @change="${this._handleChange}" @input="${this._handleInput}" @focus="${this._handleInputFocusEvent}" @blur="${this._handleInputBlurEvent}">
                
                ${this._renderClearIcon(this.value)}
            </div>
        `;
    }

    _renderSearchIcon() {
        return html`<svg width="24" height="24" viewBox="0 0 24 24"><g><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></g></svg>`;
    }

    _renderClearIcon(value) {
        if (this.value) {
            return html`<button role="button" type="button" aria-disabled="false" id="clearIcon" @click="${this._handleClear}"><svg width="24" height="24" viewBox="0 0 24 24"><g><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"></path></g></svg></button>`;
        }

        return null;
    }

    _handleChange(e) {
        this.value = e.target.value;

        this.dispatchEvent(
            new CustomEvent('change', { bubbles: true, composed: true })
        );
    }

    _handleInput(e) {
        this.value = e.target.value;

        this.dispatchEvent(
            new CustomEvent('input', { bubbles: true, composed: true })
        );
    }

    _handleInputFocusEvent(e) {
        this.hasFocus = true;
        this.renderRoot.getElementById('input').focus();
    }

    _handleInputBlurEvent(e) {
        this.hasFocus = false;
        this.renderRoot.getElementById('input').blur();
    }

    _handleClear() {
        this.value = '';

        this.dispatchEvent(
            new CustomEvent('change', { bubbles: true, composed: true })
        );

        this.dispatchEvent(
            new CustomEvent('input', { bubbles: true, composed: true })
        );
    }
}

SearchField.register('search-field');