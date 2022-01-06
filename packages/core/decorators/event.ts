/**
 * @ignore
 */
export class EventEmitter<T> {
    constructor(private target: HTMLElement, private eventName: string) {}

    emit(value: T) {
        const e = new CustomEvent<T>(this.eventName, { 
            detail: value,
            bubbles: true,
            composed: true,
            cancelable: true
        });

        this.target.dispatchEvent(e);
        return e;
    }
}

/**
 * Lorem ipsum dolor "sit" amet, `consectetur adipiscing elit`. Aenean nec augue lectus. Cras in tristique ligula, sed pulvinar est. 
 * Nulla facilisi. Duis non tincidunt purus. Pellentesque tristique consectetur quam, non vestibulum nisi molestie vel. Fusce auctor pellentesque lectus, 
 * vel elementum nulla euismod sed. Integer suscipit faucibus magna. Suspendisse quis justo vel mi commodo malesuada et eget massa.
 * 
 * ```javascript
 * const descriptor = {
 *     get(this: HTMLElement) {
 *               return new EventEmitter(this, eventName);
 *     },
 *     enumerable: true,
 *     configurable: true
 * };
 * ```
 * @customtype decorator
 * @summary A custom event emitter.
 * @displayname event
 * @category Core
 * @param eventName {string} The name of the event to emit.
 */
export function event(eventName: string) {
    return (protoOrDescriptor: any, name: string): any => {
        const descriptor = {
            get(this: HTMLElement) {
                return new EventEmitter(this, eventName);
            },
            enumerable: true,
            configurable: true,
        };

        if (name !== undefined) {
            // legacy TS decorator
            return Object.defineProperty(protoOrDescriptor, name, descriptor);
        } 
        
        // TC39 Decorators proposal
        return {
            kind: 'method',
            placement: 'prototype',
            key: protoOrDescriptor.key,
            descriptor,
        };
    };
}