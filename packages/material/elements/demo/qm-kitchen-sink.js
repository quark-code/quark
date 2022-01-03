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
 * @designsystem Material
 * @fires count-changed - Indicates when the count changes
 * @slot - Default
 * 
 * @csspart button - The button
 * 
 * @cssproperty [--background-color-red=<color> | #FF0000] - The red background color.
 * @cssproperty [--background-color-blue=<color> | (no default)] - The blue background color. 
 */
export class QmKitchenSink extends QuarkElement {
    static get properties() {
        return {
            /**
             * The name to say "Hello" to.
             * @type {string}
             */
            name: {
                type: String,
                attribute: 'name'
            },

            /**
             * The number of times the button has been clicked.
             * @type {number}
             */
            count: { type: Number },

            /**
             * This is a protected property.
             * @type {number}
             */
            _protectedProperty: {
                type: Number,
            }
        };
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

    constructor() {
        super();

        this.name = 'Bob';
        this.count = 0;
        this._protectedProperty = 5;
    }

    render() {
        return html`
            <div>qm-kitchen-sink</div>
        `;
    }

    /**
    * Formats a greeting
    * @param name {string} The name to say "Hello" to.
    * @returns {string} A greeting directed at `name`.
    */
    sayHello(name) {
        return `Hello, ${name}`;
    }

    /**
    * Formats a greeting
    * @param foo {string} The text to write to the console.
    * @returns {null}
    */
     _protectedMethod(foo) {
        console.log(foo);
    }
}

QmKitchenSink.register('qm-kitchen-sink');