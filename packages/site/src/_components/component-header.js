/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class ComponentHeader extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --component-header-border-radius: 0;
                --component-header-background: #C2E7FF;
                --component-header-on-background: #181818;
                --component-header-title-font: 400 28px/28px Roboto, 'Noto Sans SC', sans-serif;
                --component-header-subtitle-font: 400 16px/16px 'Roboto Mono', monospace;
                --component-header-font: 400 16px/16px Roboto, 'Noto Sans SC', sans-serif;
                */
                display: block;
                padding: 16px 24px 24px 24px;
                border-radius: var(--component-header-border-radius, 0);
                color: var(--component-header-on-background, #181818);
                background-color: var(--component-header-background, #C2E7FF);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            .title {
                font: var(--component-header-title-font, 400 28px/28px Roboto, 'Noto Sans SC', sans-serif);
            }

            .subtitle {
                font: var(--component-header-subtitle-font, 500 16px/16px 'Roboto Mono', monospace);
                margin-top: 8px;
            }

            .summary {
                font: var(--component-header-font, 400 16px/16px Roboto, 'Noto Sans SC', sans-seri);
                margin-top: 24px;
            }

            a:link, a:visited, a:focus-visible, a:hover, a:active {
                color: var(--component-header-on-background, #181818);
            }
        `];
    }

    static get properties() {
        return {
            componentName: {
                type: String,
                attribute: 'component-name'
            },

            superclass: {
                type: String,
                attribute: 'superclass'
            },

            superclassUrl: {
                type: String,
                attribute: 'superclass-url'
            },

            superclassPackage: {
                type: String,
                attribute: 'superclass-package'
            },

            superclassPackageUrl: {
                type: String,
                attribute: 'superclass-package-url'
            },

            defaultPackage: {
                type: String,
                attribute: 'default-package'
            },

            displayName: {
                type: String,
                attribute: 'display-name'
            },

            tag: {
                type: String,
            },

            summary: {
                type: String,
            }
        }
    }

    constructor() {
        super();

        this.componentName = '';
        this.superclass = '';
        this.superclassPackage = '';
        this.superclassUrl = '';
        this.superclassPackageUrl = '';
        this.displayName = '';
        this.tag = '';
        this.summary = '';
        this.defaultPackage = '@quark-elements/core/elements';
    }

    render() {
        return html`
            <div class="container">
                <div class="title">${this.displayName}</div>
                <div class="subtitle">${this.componentName} ${this.tag ? html`&lt;${this.tag}&gt;` : null} extends ${this._renderExtends(this.superclass, this.superclassUrl, this.superclassPackage, this.superclassPackageUrl)}</div>
                <div class="summary">${this.summary}</div>
            </div>
        `;
    }

    _renderExtends(superclass, superclassUrl, superclassPackage, superclassPackageUrl) {
        return html`${this._renderSuperclass(superclass, superclassUrl)} ${this._renderSuperclassPackage(superclassPackage, superclassPackageUrl)}`;
    }

    _renderSuperclass(superclass, superclassUrl) {
        if (superclass) {
            if (superclassUrl) {
                return html`<a href="${superclassUrl}">${superclass}</a>`;
            }

            return html`<span>${superclass}</span>`;
        }

        return null;
    }

    _renderSuperclassPackage(superclassPackage, superclassPackageUrl) {
        if (superclassPackage) {
            if (superclassPackageUrl) {
                return html`from <a href="${superclassPackageUrl}">${superclassPackage}</a>`;
            }

            return html`from <span>${superclassPackage}</span>`;
        }

        return null;
    }
}

ComponentHeader.register('component-header');