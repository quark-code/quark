/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements';
import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
import './search-field.js';
//import { animate } from '@lit-labs/motion';

export class PageNavigator extends QuarkElement {
    static get styles() {
        return [
            css`
                :host {
                    /*
                    --page-navigator-outline: #E4E4E4;
                    --page-navigator-background: white; 
                    --page-navigator-on-background: #181818;
                    --page-navigator-background-hover: #E4E4E4;
                    --page-navigator-on-background-hover: #181818;
                    --page-navigator-background-selected: #C2E7FF;
                    --page-navigator-on-background-selected: #181818;
                    --page-navigator-root-on-background: #181818;
                    --page-navigator-item-border-radius: 9999px;
                    --page-navigator-item-height: 36px;
                    --page-navigator-item-font: 400 14px/14px Roboto, 'Noto Sans SC', sans-serif;
                    --page-navigator-root-item-font: 500 14px/14px Roboto, 'Noto Sans SC', sans-serif;
                    */

                    display: flex;
                    flex-direction: column;
                    fill: var(--page-navigator-on-background, #181818);
                    color: var(--page-navigator-on-background, #181818);
                    background-color: var(--page-navigator-background, white);
                    user-select: none;
                    overflow: hidden;
                }
        
                :host([hidden]) {
                    display: none !important;
                }
        
                :host([disabled]) {
                    pointer-events: none;
                }

                search-field {
                    margin: 16px 16px 0 16px;
                }

                ul {
                    list-style-type: none; 
                    padding: 0; 
                    margin: 0;
                }

                svg {
                    margin-left: 16px;
                    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: rotate(0deg);
                }

                a {
                    color: var(--page-navigator-on-background, #181818);
                    text-decoration: none;
                }

                .container {
                    flex: 1;
                    overflow-x: hidden;
                    overflow-y: auto;
                    margin-top: 16px;
                    padding: 0 11px;
                }

                .item-container {
                    margin-left: 24px;
                    overflow: hidden;
                }

                .item-container[collapsed] {
                    display: none;
                }

                .item {
                    margin: 0 4px;
                }

                .item-label {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: var(--page-navigator-item-height, 36px);
                    padding: 16px;
                    margin: 6px 0;
                    box-sizing: border-box;
                    border-radius: var(--page-navigator-item-border-radius, 9999px);
                    cursor: pointer;
                    font: var(--page-navigator-item-font, 400 14px/14px Roboto, 'Noto Sans SC', sans-serif);
                }

                .item-label[root] {
                    color: var(--page-navigator-root-on-background, #181818);
                    fill: var(--page-navigator-root-on-background, #181818);
                    font: var(--page-navigator-root-item-font, 500 14px/14px Roboto, 'Noto Sans SC', sans-serif);
                }

                button.item-label {
                    border: none;
                    background-color: transparent;
                    width: 100%;
                }

                .item-label * {
                    pointer-events: none;
                }

                .item-label-link {
                    display: flex;
                }

                .item-label-link[selected] {
                    color: var(--page-navigator-on-background-selected, #181818);
                    background-color: var(--page-navigator-background-selected, #C2E7FF);
                    cursor: default;
                }

                .item-label:focus-visible {
                    outline: 2px solid var(--page-navigator-on-background-selected, #181818);
                    outline-offset: 2px;
                }

                .item-label:not([selected]):hover {
                    color: var(--page-navigator-on-background-hover, #181818);
                    background-color: var(--page-navigator-background-hover, #E4E4E4);
                    fill: var(--page-navigator-on-background-hover, #181818);
                }

                .item-label[root]:not([selected]):hover {
                    color: var(--page-navigator-root-on-background, #181818);
                    fill: var(--page-navigator-root-on-background, #181818);
                    background-color: var(--page-navigator-background-hover, #E4E4E4);
                }

                .item-label[collapsed] svg {
                    transform: rotate(-90deg);
                }
            `
        ];
    }

    private _collapsedItems: Array<any> = [];
    private _selectedItem: any = null;

    @property({ type: String, attribute: 'persist-key' })
    persistKey: string = 'navigator';

    @property({ type: String })
    _filter: string = '';

    @property({ type: Array })
    items: Array<any> = [];

    firstUpdated() {
        this._selectByUrl(window.location.pathname);
        this._getState();
    }

    updated(changedProperties) {
        if (changedProperties.has('_filter')) {
            this._collapseEmptyGroups();
        }

        if (changedProperties.has('items')) {
            this._updateToggledItems();
        }
    }

    render() {
        return html`
            <search-field .value="${this._filter}" @change="${this._handleFilter}"></search-field>
            <ul class="container">
                ${this.items.map((item, index) => this._renderItem(item, `${index}`))}
            </ul>
        `;
    }

    _renderItem(item: any, key: any) {
        const hasItems = item.items && item.items.length > 0;
        const hidden = !hasItems && this._filter && item.label.toLowerCase().indexOf(this._filter.toLowerCase()) === -1;

        return html`
            <li class="item" ?hidden="${hidden}">
                ${this._renderItemLabel(item, key)}

                ${hasItems ? html`
                    <ul ?collapsed="${item.collapsed}" class="item-container">${item.items.map((item, index) => this._renderItem(item, `${key}_${index}`))}</ul>
                ` : null }
            </li>
        `;
    }

    _renderItemLabel(item: any, key: any) {
        return (item.items && item.items.length > 0) ? html`
            <button ?collapsed="${item.collapsed}" role="button" type="button" aria-disabled="false" class="item-label" key="${key}" @click="${this._itemToggle}" root>${item.label} ${this._renderIcon()}</button>
        ` : html`
            <a class="item-label item-label-link" linkkey="${key}" href="${item.url}" @click="${this._itemClick}">${item.label}</a>
        `;
    }

    _renderIcon() {
        return html`<svg width="24" height="24" viewBox="0 0 24 24"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g></svg>`;
    }

    _itemClick(e: any) {
        this._selectItem(e.target)
    }

    _selectItem(el: any) {
        Array.from(this.renderRoot.querySelectorAll('.item-label-link[selected]')).forEach(el => el.removeAttribute('selected'));
        el.setAttribute('selected', '');
        this._selectedItem = el.getAttribute('linkkey');
        this._setState(false, true, false);
    }

    _selectByUrl(url) {
        const el = this.renderRoot.querySelector(`a[href="${url}"]`);

        if (el) {
            this._selectItem(el);
        }
    }

    _itemToggle(e) {
        const el = e.target;
        const child = e.target.nextElementSibling;

        if (el.hasAttribute('collapsed')) {
            el.removeAttribute('collapsed');
            child.removeAttribute('collapsed');
        } else {
            el.setAttribute('collapsed', '');
            child.setAttribute('collapsed', '');
        }

        this._setState();
    }

    _setState(collapsed = true, selected = true, filter = true) {
        if (!this.persistKey || !window.stateManager) return;

        const data = window.stateManager.getValue(this.persistKey) || {};

        if (collapsed) {
            this._collapsedItems = Array.from(this.renderRoot.querySelectorAll('.item-label[collapsed')).map(item => item.getAttribute('key'));
            data.collapsed = this._collapsedItems;
        }

        if (selected) {
            data.selected = this._selectedItem;
        }

        if (filter) {
            data.filter = this._filter;
        }

        window.stateManager.setValue(this.persistKey, data);
    }

    _getState() {
        if (!this.persistKey || !window.stateManager) return;

        const data = window.stateManager.getValue(this.persistKey);

        if (data) {
            this._collapsedItems = data.collapsed || [];
            this._selectedItem = data.selected || null;
            this._filter = data.filter || '';
        }
    }

    _updateToggledItems() {
        this._getState();

        if (this._selectedItem) {
            Array.from(this.renderRoot.querySelectorAll('.item-label-link[selected]')).forEach(el => el.removeAttribute('selected'));
            const el = this.renderRoot.querySelector(`.item-label-link[linkkey="${this._selectedItem}"]`);

            if (el) {
                el.setAttribute('selected', '');
            }
        }

        if ((this._collapsedItems) && (this._collapsedItems.length > 0)) {
            const items = Array.from(this.renderRoot.querySelectorAll('.item-label[key]'));
           
            items.forEach(el => {
                const child = el.nextElementSibling;
                const key = el.getAttribute('key');

                if (this._collapsedItems.indexOf(key) === -1) {
                    el.removeAttribute('collapsed');
                    child.removeAttribute('collapsed');
                } else {
                    el.setAttribute('collapsed', '');
                    child.setAttribute('collapsed', '');
                }
            });
        }
    }

    _handleFilter(e) {
        this._filter = e.target.value;
        this._setState(false, false, true);
    }
    
    _collapseEmptyGroups(el = null) {
        el = el || this.renderRoot;

        const children = [...el.children];

        children.forEach(child => {
            this._collapseEmptyGroups(child);

            if (child.tagName === 'UL') {
                const unfilteredChildrenCount = [...child.children].filter(c => !c.hasAttribute('hidden')).length;

                if (unfilteredChildrenCount === 0) {
                    if (child.parentElement) {
                        child.parentElement.setAttribute('hidden', '');
                    }
                } else {
                    if (child.parentElement) {
                        child.parentElement.removeAttribute('hidden');

                        /*
                        const key = child.previousElementSibling.getAttribute('key');

                        if (this._collapsedItems.indexOf(key) === -1) {
                            child.removeAttribute('collapsed');
                            child.previousElementSibling.removeAttribute('collapsed');
                        }
                        */
                    }
                }
            }
        });
    }
}

PageNavigator.register('page-navigator');