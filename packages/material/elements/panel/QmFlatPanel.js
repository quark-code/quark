/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, QuarkPanel } from '@quark-elements/core/elements';

 /**
  * @customtype component
  * @summary A flat variant Material Design panel.
  * @description - Some random description.
  * @defaulttag qm-flat-panel
  * @displayname Flat Panel
  * @category Panels
  * 
  * @slot - Default
  */
export class QmFlatPanel extends QuarkPanel {
    static get defaultTag() {
        return 'qm-flat-panel';
    }

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