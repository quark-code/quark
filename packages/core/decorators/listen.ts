/**
 * @customtype decorator
 * @summary A custom event listener.
 * @displayname listen
 * @category Core
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