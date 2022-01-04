/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements';
import { css } from 'lit';
import { property } from 'lit/decorators.js';

class PageStateManager {
    private _key: string = '';
    private _state: object = {};

    get key() {
        return this._key;
    }

    set key(value) {
        this._key = value;
        this._readState();
    }

    setValue(key: string, value: any) {
        if (this.key) {
            this._state[key] = value;
            this._writeState();
        }
    }

    getValue(key: string): any {
        if ((this.key) && (this._state[key] !== undefined)) {
            return this._state[key];
        }

        return null;
    }

    deleteValue(key: string) {
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

declare global {
    interface Window { stateManager: PageStateManager; }
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

    @property({ type: String })
    key: string = '';

    connectedCallback() {
        super.connectedCallback();
        window.stateManager.key = this.key;
    }
}

PageState.register('page-state');
