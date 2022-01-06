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
 * @customtype decorator
 * @summary A custom event emitter.
 * @displayname event
 * @category Core
 */
export function event(eventName?: string) {
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