/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { html, QuarkElement } from '../QuarkElement.js';

export class QuarkPanel extends QuarkElement {
    render() {
        return html`<slot></slot>`;
    }
}