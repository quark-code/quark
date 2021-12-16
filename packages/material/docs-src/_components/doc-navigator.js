/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class DocNavigator extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                --navigator-title-font: var(--md-sys-typescale-label-large);
                --navigator-item-font: var(--md-sys-typescale-body-large);
                --navigator-background: var(--md-sys-color-surface);
                --navigator-on-background: var(--md-sys-color-on-surface);
                --navigator-border: 1px solid var(--md-sys-color-outline);
                --navigator-item-background: var(--md-sys-color-surface);
                --navigator-item-on-background: var(--md-sys-color-on-surface);
                --navigator-item-background-hover: var(--md-sys-color-surface-variant);
                --navigator-item-on-background-hover: var(--md-sys-color-on-surface-variant);
                --navigator-item-background-active: var(--md-sys-color-secondary-container);
                --navigator-item-on-background-active: var(--md-sys-color-on-secondary-container);
                --navigator-item-background-active-hover: var(--md-sys-color-primary);
                --navigator-item-on-background-active-hover: var(--md-sys-color-on-primary);
                --navigator-item-border-radius: var(--md-sys-border-radius-2);
                --content-background: var(--md-sys-color-surface);
                --content-on-background: var(--md-sys-color-on-surface);
                --code-font: var(--md-sys-typescale-code-medium);

                display: block;
                height: 100%;
                min-width: 300px;
                color: var(--navigator-on-background);
                background-color: var(--navigator-background);
                border-right: var(--navigator-border);
                box-sizing: border-box;
                overflow-x: hidden;
                overflow-y: auto;
                user-select: none;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            svg {
                fill: var(--navigator-item-on-background);
                pointer-events: none;
            }

            ul {
                list-style-type: none; 
                padding: 0; 
                margin: 0;
            }

            li.group-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 40px;
                box-sizing: border-box;
                margin: 4px 0;
                padding: 8px 8px 8px 16px;
                font: var(--navigator-item-font);
                border-radius: var(--navigator-item-border-radius);
                cursor: pointer;
            }

            li.group-item:hover {
                color: var(--navigator-item-on-background-hover);
                background-color: var(--navigator-item-background-hover);
            }

            li.page-item {
                display: flex;
                align-items: center;
                height: 40px;
                margin: 4px 0;
                border-radius: var(--navigator-item-border-radius);
            }

            li.page-item[indent] {
                margin-left: 24px;
            }

            a {
                display: block;
                color: var(--navigator-item-on-background);
                font: var(--navigator-item-font);
                cursor: pointer;
                width: 100%;
                padding: 8px 16px;
                text-decoration: none;
            }

            /* ITEM HOVER */
            li.page-item:hover {
                background-color: var(--navigator-item-background-hover);
            }

            li.page-item:hover > a {
                color: var(--navigator-item-on-background-hover);
            }

            /* ITEM ACTIVE */
            li.page-item[active]:not(:hover) {
                background-color: var(--navigator-item-background-active);
            }

            li.page-item[active]:not(:hover) > a {
                color: var(--navigator-item-on-background-active);
                cursor: default;
            }

            /* ITEM ACTIVE:HOVER */
            li.page-item[active]:hover {
                background-color: var(--navigator-item-background-active-hover);
            }

            li.page-item[active]:hover > a {
                color: var(--navigator-item-on-background-active-hover);
                cursor: default;
            }

            .category {
                border-bottom: var(--navigator-border);
                margin-bottom: 16px;
                padding: 0 16px 8px 16px;
            }

            .category:first-of-type {
                margin-top: 16px;
            }

            .category-label {
                color: var(--navigator-item-on-background);
                font: var(--navigator-title-font);
                -webkit-font-smoothing: antialiased;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                margin-bottom: 12px;
            }
        `];
    }

    static get properties() {
        return {
            data: {
                type: Array
            },
            path: {
                type: String
            }
        };
    }

    constructor() {
        super();

        this.data = [];
        this.path = '';
    }

    render() {
        return html`
            <div class="container">
                ${(this.data) ? html`
                    ${this.data.map(category => this._renderCategory(category))}
                ` : null}
            </div>
        `;
    }

    _renderCategory(category) {
        if (category.pages && category.pages.length > 0) {
            return html`
                <section class="category">
                    <div class="category-label">${category.label}</div>
                    <ul class="category-items">
                        ${category.pages.map(page => (page.url ? this._renderPage(page, this.path) : this._renderPageGroup(page, this.path)))}
                    </ul>
                </section>
            `;
        }

        return null;
    }

    _renderPage(page, path, indent = false) {
        const classes = { active: (page.url === path), indent: indent };

        return html`
            <li class="page-item" ?active="${page.url === path}" ?indent="${indent}"><a href="${page.url}">${page.label}</a></li>
        `;
    }

    _renderPageGroup(pageGroup, path) {
        if (pageGroup.pages.length === 0) {
            return null;
        }

        if (pageGroup.pages.length === 1) {
            return this._renderPage(pageGroup.pages[0], path);
        }

        // get from local storage
        const groupLabel = pageGroup.label.trim();
        let isHidden = true;

        const si = window.localStorage.getItem(`group:${groupLabel}`);

        if (si && si === 'open') {
            isHidden = false;
        }

        return html`
            <li group-name="${groupLabel}" class="group-item" @click="${this._toggleGroup}">${groupLabel} ${this._renderPageGroupToggle(isHidden)}</li>
            <ul group-name="${groupLabel}" ?hidden="${isHidden}">
                ${pageGroup.pages.map(page => this._renderPage(page, path, true))}
            </ul>
        `;
        
        return null;
    }

    _renderPageGroupToggle(hidden) {
        if (hidden) {
            return html`<svg width="24" height="24" viewBox="0 0 24 24"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g></svg>`;
        }

        return html`<svg width="24" height="24" viewBox="0 0 24 24"><g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g></svg>`;
    }

    _toggleGroup(e) {
        const groupName = e.target.getAttribute('group-name');

        if (groupName) {
            const list = this.renderRoot.querySelector(`ul[group-name="${groupName}"]`);

            if (list) {
                list.hasAttribute('hidden') ? list.removeAttribute('hidden') : list.setAttribute('hidden', '');
                const isHidden = list.hasAttribute('hidden');
                
                // store in local storage.
                if (isHidden) {
                    window.localStorage.removeItem(`group:${groupName}`);
                } else {
                    window.localStorage.setItem(`group:${groupName}`, 'open');
                }

                this.requestUpdate();
            }
        }
    }
}

window.customElements.define('doc-navigator', DocNavigator);