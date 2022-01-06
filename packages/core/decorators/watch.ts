/**
 * @customtype decorator
 * @summary A property change observer.
 * @displayname watch
 * @category Core
 * @param propName {string | Array<string>} The name of the property to watch, or an array of property names.
 */
export function watch(propName?: string | Array<string>) {
    return (protoOrDescriptor: any, name: string) => {       
        const { updated } = protoOrDescriptor;

        protoOrDescriptor.updated = function (changedProps: Map<string, any>) {
            if (!propName) {
                if (this.__hasBeenUpdated) {
                    changedProps.forEach((oldValue, prop) => {
                        const newValue = this[prop];
        
                        if (oldValue !== newValue) {
                            this[name].call(this, prop, oldValue, newValue);
                        }
                    });
                }
            } else {
                if (!Array.isArray(propName)) {
                    propName = [propName];
                }
    
                propName.forEach(prop => {
                    if (this.__hasBeenUpdated && changedProps.has(prop)) {
                        const oldValue = changedProps.get(prop);
                        const newValue = this[prop];
        
                        if (oldValue !== newValue) {
                            this[name].call(this, prop, oldValue, newValue);
                        }
                    }
                });
            }

            updated.call(this, changedProps);
            this.__hasBeenUpdated = true;
        };
    };
}