/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { QuarkElement } from '@quark-elements/core/elements/QuarkElement.js';
import { html, css } from 'lit';
import { property } from 'lit/decorators.js';
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

    /**
    * The name to say "Hello" to.
    * @type {string}
    */
    @property({ type: String })
    name: string = 'bob';

    /**
    * The number of times the button has been clicked.
    * @type {number}
    */
    @property({ type: Number })
    count: number = 0;

    /**
    * This is a protected property.
    * @type {number}
    */
    @property({ type: Number })
    _protectedProperty: number = 5;

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