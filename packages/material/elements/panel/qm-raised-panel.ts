/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkPanel } from '@quark-elements/core/elements/panel/QuarkPanel.js';
import { css } from '@quark-elements/core/elements/QuarkElement.js';
import { hostElevation1 } from '../../providers/theme/tokens/elevation';

 /**
  * @customtype component
  * @summary A raised variant Material Design panel.
  * @description - Some random description.
  * @defaulttag qm-raised-panel
  * @displayname Raised Panel
  * @designsystem Material
  * @category Panels
  */
export class QmRaisedPanel extends QuarkPanel {
    static get styles() {
        return [hostElevation1, css`
            :host {
                display: block;
                box-sizing: border-box;
                border-radius: var(--md-sys-border-radius-2);
                color: var(--md-sys-color-on-surface);
                background-color: var(--md-sys-color-surface);
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

QmRaisedPanel.register('qm-raised-panel');