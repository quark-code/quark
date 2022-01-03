/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

class PageStateManager {
    constructor() {
        this._key = '';
        this._state = {};
    }

    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
        this._readState();
    }

    setValue(key, value) {
        if (this.key) {
            this._state[key] = value;
            this._writeState();
        }
    }

    getValue(key) {
        if ((this.key) && (this._state[key] !== undefined)) {
            return this._state[key];
        }

        return null;
    }

    deleteValue(key) {
        if (this.key) {
            delete this._state[key];
            this._writeState();
        }
    }

    _readState() {
        if (this.key) {
            const data = window.sessionStorage.getItem(this.key);

            if (data) {
                this._state = JSON.parse(data);
            }
        }
    }

    _writeState() {
        if (this.key) {
            window.sessionStorage.setItem(this.key, JSON.stringify(this._state));
        }
    }
}

window.stateManager = new PageStateManager();

export class PageState extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                display: none !important;
            }
        `];
    }

    static get properties() {
        return {
            key: {
                type: String
            }
        }
    }

    connectedCallback() {
        super.connectedCallback();
        window.stateManager.key = this.key;
    }
}

PageState.register('page-state');
