/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkPanel } from '@quark-elements/core/elements/panel/QuarkPanel.js';
import { css } from 'lit';
 /**
  * @customtype component
  * @summary A flat variant Material Design panel.
  * @description - Some random description.
  * @defaulttag qm-flat-panel
  * @displayname Flat Panel
  * @designsystem Material
  * @category Panels
  */
export class QmFlatPanel extends QuarkPanel {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
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

QmFlatPanel.register('qm-flat-panel');