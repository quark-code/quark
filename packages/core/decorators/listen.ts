/**
 * Attaches the method as a listener for the given event.
 * 
 * ### Usage
 * 
 * ```ts
 * import { listen } from '@quark-elements/core/decorators/listen.js';
 * 
 * &at;listen('test-event')
 * handleTestEvent(e: any) {
 *     // Whatever
 * }
 * ```
 * @customtype decorator
 * @summary A custom event listener.
 * @displayname listen
 * @category Core
 * @param eventName {string} The name of the event to listen for.
 */
export function listen(eventName: string) {
    return (protoOrDescriptor: any, name: string): any => {       
        const { connectedCallback, disconnectedCallback } = protoOrDescriptor;

        protoOrDescriptor.connectedCallback = function () {
            connectedCallback.call(this);
            addEventListener.call(this, eventName, protoOrDescriptor[name]);
        };

        protoOrDescriptor.disconnectedCallback = function () {
            removeEventListener.call(this, eventName, protoOrDescriptor[name]);
            disconnectedCallback.call(this);
        };
    };
}