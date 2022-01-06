/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkIcon } from '@quark-elements/core/elements/image/QuarkIcon.js';
import { css } from 'lit';
 /**
  * Lorem ipsum dolor "sit" amet, `consectetur adipiscing elit`. Aenean nec augue lectus. Cras in tristique ligula, sed pulvinar est. 
  * Nulla facilisi. Duis non tincidunt purus. Pellentesque tristique consectetur quam, non vestibulum nisi molestie vel. Fusce auctor pellentesque lectus, 
  * vel elementum nulla euismod sed. Integer suscipit faucibus magna. Suspendisse quis justo vel mi commodo malesuada et eget massa.
  * 
  * ```javascript
  * const descriptor = {
  *     get(this: HTMLElement) {
  *               return new EventEmitter(this, eventName);
  *     },
  *     enumerable: true,
  *     configurable: true
  * };
  * ```
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