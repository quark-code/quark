/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements/QuarkElement.js';
import { html, css } from 'lit';
import { elevation0, elevation1, elevation2, elevation3, elevation4, elevation5 } from '../../theme/tokens/elevation.js';
import { titleMedium } from '../../theme/tokens/typography.js';

export class ElevationDemo extends QuarkElement {
    static get styles() {
        return [
            elevation0, elevation1, elevation2, elevation3, elevation4, elevation5, titleMedium,
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
                    grid-template-columns: 200px 200px 200px;
                    grid-template-rows: 150px 150px;
                    grid-gap: 48px;
                    padding: 48px;
                }

                .container > div {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background-color: var(--md-sys-color-surface);
                    color: var(--md-sys-color-on-surface);
                    border-radius: var(--md-sys-border-radius-2);
                }
            `
        ];
    }

    render() {
        return html`
            <div class="container typography-title-medium">
                <div class="elevation-0">Elevation 0</div>
                <div class="elevation-1">Elevation 1</div>
                <div class="elevation-2">Elevation 2</div>
                <div class="elevation-3">Elevation 3</div>
                <div class="elevation-4">Elevation 4</div>
                <div class="elevation-5">Elevation 5</div>
            </div>
        `;
    }
}

ElevationDemo.register('elevation-demo');