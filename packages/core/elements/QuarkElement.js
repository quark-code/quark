/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css, html, svg, LitElement } from 'lit';

class QuarkElement extends LitElement {
    static registerElement(name) {
        if (!customElements.get(name)) {
            customElements.define(name, this);
        }
    }
}

export { css, html, svg, QuarkElement }