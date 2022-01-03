/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, QuarkPanel } from '@quark-elements/core/elements';

 /**
  * @customtype component
  * @summary An outlined variant Material Design panel.
  * @description - Some random description.
  * @defaulttag qm-outlined-panel
  * @displayname Outlined Panel
  * @designsystem Material
  * @category Panels
  */
export class QmOutlinedPanel extends QuarkPanel {
    static get styles() {
        return [css`
            :host {
                display: block;
                overflow: hidden;
                box-sizing: border-box;
                border-radius: var(--md-sys-border-radius-2);
                border: var(--md-sys-border-width-1) solid var(--md-sys-color-outline);
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

QmOutlinedPanel.register('qm-outlined-panel');