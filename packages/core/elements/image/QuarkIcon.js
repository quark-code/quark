/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '../QuarkElement.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

/**
 * @customtype component
 * @summary The base component class for an element that displays a single icon.
 * @displayname Icon
 * @category Core
 */
export class QuarkIcon extends QuarkElement {
    static properties = {
        /**
        * The name of the registered icon.
        * @type {string}
        */
        icon: {
            type: String
        }
    };

    constructor() {
        super();
        this.icon = '';
    }

    render() {
        return unsafeSVG(window.themeManager.getIcon(this.icon));
    }
}