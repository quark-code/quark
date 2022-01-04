/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkPanel } from '@quark-elements/core/elements/panel/QuarkPanel.js';
import { css } from '@quark-elements/core/elements/QuarkElement.js';
 /**
  * @customtype component
  * @summary A filled variant Material Design panel.
  * @description - Some random description.
  * @defaulttag qm-filled-panel
  * @displayname Filled Panel
  * @designsystem Material
  * @category Panels
  */
export class QmFilledPanel extends QuarkPanel {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
                box-sizing: border-box;
                border-radius: var(--md-sys-border-radius-2);
                color: var(--md-sys-color-on-surface-variant);
                background-color: var(--md-sys-color-surface-variant);
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    static get properties() {
        return {
          /**
           * The name to say "Hello" to.
           * @type {string}
           */
          name: {type: String},
    
          /**
           * The number of times the button has been clicked.
           * @type {number}
           */
          count: {type: Number},

          /**
           * The different visual styles.
           * @type {string}
           * @allowedvalues ["text", "outlined", "filled", "raised"]
           */
           variant: {type: String},
        };
    }
}

QmFilledPanel.register('qm-filled-panel');