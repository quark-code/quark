/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkIcon } from '@quark-elements/core/elements/image/QuarkIcon.js';
import { css } from '@quark-elements/core/elements/QuarkElement.js';
 /**
  * @customtype component
  * @summary An element that displays a single icon.
  * @defaulttag qm-icon
  * @displayname Icon
  * @designsystem Material
  * @category Image
  */
export class QmIcon extends QuarkIcon {
    static get designTokens() {
        return {
            'md-comp-icon-width': '24px',
            'md-comp-icon-height': '24px',
            'md-comp-icon-fill-color': 'currentcolor',
            'md-comp-icon-stroke-color': 'none'
        }
    }

    static get styles() {
        return [css`
            :host {
                display: block;
                width: var(--md-comp-icon-width, 24px);
                height: var(--md-comp-icon-height, 24px);
                fill: var(--md-comp-icon-fill-color, currentcolor);
                stroke: var(--md-comp-icon-stroke-color, none);
            }

            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }
}

QmIcon.register('qm-icon');