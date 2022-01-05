/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '../QuarkElement.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { property } from 'lit/decorators.js';
/**
 * @customtype component
 * @summary The base component class for an element that displays a single icon.
 * @displayname Icon
 * @category Core
 */
export class QuarkIcon extends QuarkElement {
    /**
    * The name of the registered icon.
    * @type {string}
    * @attribute: icon
    */
    @property({ type: String })
    icon: string = '';

    render() {
        return unsafeSVG(window.themeManager.getIconContent(this.icon));
    }
}