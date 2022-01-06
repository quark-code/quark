/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements';
import { html, css } from 'lit';
import { property } from 'lit/decorators.js';

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

    @property({ type: String, attribute: 'component-name' })
    componentName: string = '';

    @property({ type: String })
    superclass: string = '';

    @property({ type: String, attribute: 'superclass-url' })
    superclassUrl: string = '';

    @property({ type: String, attribute: 'superclass-package' })
    superclassPackage: string = '';

    @property({ type: String, attribute: 'superclass-package-url' })
    superclassPackageUrl: string = '';

    @property({ type: String, attribute: 'default-package' })
    defaultPackage: string = '@quark-elements/core/elements';

    @property({ type: String, attribute: 'display-name' })
    displayName: string = '';

    @property({ type: String })
    tag: string = '';

    @property({ type: String })
    summary: string = '';

    @property({ type: String })
    detail: string = '';

    render() {
        return html`
            <div class="container">
                <div class="title">${this.displayName}</div>
                <div class="subtitle">${this.componentName} ${this.tag ? html`&lt;${this.tag}&gt;` : null} ${this._renderExtends(this.superclass, this.superclassUrl, this.superclassPackage, this.superclassPackageUrl)}</div>
                ${this.detail ? html`<div class="subtitle">${this.detail}</div>` : null}
                <div class="summary">${this.summary}</div>
            </div>
        `;
    }


    _renderExtends(superclass: string, superclassUrl: string, superclassPackage: string, superclassPackageUrl: string) {
        return superclass ? html`extends ${this._renderSuperclass(superclass, superclassUrl)} ${this._renderSuperclassPackage(superclassPackage, superclassPackageUrl)}` : null;
    }

    _renderSuperclass(superclass: string, superclassUrl: string) {
        if (superclass) {
            if (superclassUrl) {
                return html`<a href="${superclassUrl}">${superclass}</a>`;
            }

            return html`<span>${superclass}</span>`;
        }

        return null;
    }

    _renderSuperclassPackage(superclassPackage: string, superclassPackageUrl: string) {
        /*
        if (superclassPackage) {
            if (superclassPackageUrl) {
                return html`from <a href="${superclassPackageUrl}">${superclassPackage}</a>`;
            }

            return html`from <span>${superclassPackage}</span>`;
        }
        */

        return null;
    }
}

ComponentHeader.register('component-header');