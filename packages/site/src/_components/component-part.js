/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

export class ComponentPart extends QuarkElement {
    static get styles() {
        return [css`
            :host {
                /*
                --component-part-background: transparent;
                --component-part-on-background: #181818;
                --component-part-tag-background: #E0E0E0;
                --component-part-tag-on-background: #181818;
                --component-part-tag-border-radius: 8px;
                --component-part-font-mono: 400 14px/20px 'Roboto Mono', monospace;
                --component-part-font-superclass: italic 400 12px/30px Roboto, 'Noto Sans SC', sans-serif;
                --component-part-font-description: 400 14px/30px Roboto, 'Noto Sans SC', sans-serif;
                --component-part-font-tag: 500 11px/16px Roboto, 'Noto Sans SC', sans-serif;
                */
                display: block;
                color: var(--component-part-on-background, #181818);
                background-color: var(--component-part-background, transparent);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }

            a {
                color: var(--component-part-on-background, #181818);
            }

            .title {
                display: flex;
                font: var(--component-part-font-mono, 400 14px/20px 'Roboto Mono', monospace);
            }

            .caption {
                font-weight: 600;
            }

            .superclass {
                font: var(--component-part-font-superclass, italic 400 12px/30px Roboto, 'Noto Sans SC', sans-serif);
            }

            .description {
                font: var(--component-part-font-description, 400 14px/30px Roboto, 'Noto Sans SC', sans-serif);
            }

            .readonly {
                display: inline-block;
                padding: 2px 8px;
                margin-left: 8px;
                border-radius: var(--component-part-tag-border-radius, 8px);
                background-color: var(--component-part-tag-background, #E0E0E0);
                color: var(--component-part-tag-on-background, #181818);
                font: var(--component-part-font-tag, 500 11px/16px Roboto, 'Noto Sans SC', sans-serif);
            }
        `];
    }

    static get properties() {
        return {
            caption: {
                type: String
            },

            detail: {
                type: String
            },

            description: {
                type: String
            },

            readonly: {
                type: Boolean
            },

            superclass: {
                type: String
            },

            superclassUrl: {
                type: String,
                attribute: 'superclass-url'
            },
        }
    }

    constructor() {
        super();

        this.caption = '';
        this.detail = '';
        this.description = '';
        this.readonly = false;
        this.superclass = '';
        this.superclassUrl = '';
    }

    render() {
        return html`
            <div class="container">
                <div class="title">${this._renderTitle(this.caption, this.detail, this.readonly)}</div>
                <div class="superclass">${this._renderSuperclass(this.superclass, this.superclassUrl)}</div>
                <div class="description">${this.description}</div>
            </div>
        `;
    }

    _renderTitle(caption, detail, readonly) {
        caption = detail ? `${caption}` : caption;

        return html`
            <span class="caption">${caption}</span>
            ${detail ? html`<span class="detail">${detail}</span>` : null}
            ${readonly ? html`<span class="readonly">readonly</span>` : null}
        `;
    }

    _renderSuperclass(superclass, superclassUrl) {
        if (superclass) {
            if (superclassUrl) {
                return html`Inherited from <a href="${superclassUrl}">${superclass}</a>`;
            }

            return html`<span>Inherited from ${superclass}</span>`;
        }

        return null;
    }
}

ComponentPart.register('component-part');