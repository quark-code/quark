/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements/QuarkElement.js';
import { titleLarge } from '../../providers/theme/tokens/typography.js';

export class ColorDemo extends QuarkElement {
      static get styles() {
        return [titleLarge,
            css`
                :host {
                    display: block;
                }
        
                :host([hidden]) {
                    display: none !important;
                }
        
                :host([disabled]) {
                    pointer-events: none;
                }

                .container {
                    display: grid;
                    grid-template-columns: 250px 250px 250px 250px;
                    grid-template-rows: 100px 100px 100px;
                    grid-gap: 16px;
                    padding: 48px;
                }

                .container > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: var(--md-sys-border-radius-2);
                    box-shadow: var(--md-sys-elevation-level-1);
                }

                .primary {
                    background-color: var(--md-sys-color-primary);
                    color: var(--md-sys-color-on-primary);
                }

                .primary-container {
                    background-color: var(--md-sys-color-primary-container);
                    color: var(--md-sys-color-on-primary-container);
                }

                .secondary {
                    background-color: var(--md-sys-color-secondary);
                    color: var(--md-sys-color-on-secondary);
                }

                .secondary-container {
                    background-color: var(--md-sys-color-secondary-container);
                    color: var(--md-sys-color-on-secondary-container);
                }

                .tertiary {
                    background-color: var(--md-sys-color-tertiary);
                    color: var(--md-sys-color-on-tertiary);
                }

                .tertiary-container {
                    background-color: var(--md-sys-color-tertiary-container);
                    color: var(--md-sys-color-on-tertiary-container);
                }

                .error {
                    background-color: var(--md-sys-color-error);
                    color: var(--md-sys-color-on-error);
                }

                .error-container {
                    background-color: var(--md-sys-color-error-container);
                    color: var(--md-sys-color-on-error-container);
                }

                .background {
                    background-color: var(--md-sys-color-background);
                    color: var(--md-sys-color-on-background);
                }

                .surface {
                    background-color: var(--md-sys-color-surface);
                    color: var(--md-sys-color-on-surface);
                }

                .surface-variant {
                    background-color: var(--md-sys-color-surface-variant);
                    color: var(--md-sys-color-on-surface-variant);
                }

                .outline {
                    background-color: var(--md-sys-color-outline);
                    color: var(--md-sys-color-on-surface);
                }
            `
        ];
    }

    render() {
        return html`
            <div class="container typography-title-large">
                <div class="primary">Primary</div>
                <div class="primary-container">Primary Container</div>

                <div class="secondary">Secondary</div>
                <div class="secondary-container">Secondary Container</div>

                <div class="tertiary">Tertiary</div>
                <div class="tertiary-container">Tertiary Container</div>

                <div class="error">Error</div>
                <div class="error-container">Error Container</div>

                <div class="background">Background</div>
                <div class="surface">Surface</div>
                <div class="surface-variant">Surface Variant</div>
                <div class="outline">Outline</div>
            </div>
        `;
    }
}

ColorDemo.register('color-demo');