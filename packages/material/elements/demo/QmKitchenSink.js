/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, css, QuarkElement } from '@quark-elements/core/elements';

 /**
  * @customtype component
  * @summary A demo component for documentation testing.
  * @description - Don't use this.
  * @defaulttag qm-kitchen-sink
  * @displayname Kitchen Sink
  * 
  * @slot - Default
  */
export class QmKitchenSink extends QuarkElement {
    static get defaultTag() {
        return 'qm-kitchen-sink';
    }

    static get styles() {
        return [css`
            :host {
                display: block;
            }
    
            :host([hidden]) {
                display: none !important;
            }
    
            :host([disabled]) {
                pointer-events: none;
            }
        `];
    }

    render() {
        return html`
            <div>qm-kitchen-sink</div>
        `;
    }
}