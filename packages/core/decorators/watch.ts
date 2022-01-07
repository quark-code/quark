/**
 * Runs after an observed property changes, e.g. `&at;property` or `&at;state`. This will only run after the first
 * update, so initial attribute => property mappings will not trigger the watch handler.
 * 
 * Note that changing props in a watch handler *will* trigger a rerender. To make pre-update changes to observed
 * properties, use the `update()` method instead.
 * 
 * ### Usage
 * 
 * ```ts
 * import { watch } from '@quark-elements/core/decorators/watch.js';
 * 
 * &at;watch('propName')
 * handlePropChange(propName: string, oldValue: any, newValue: any) {
*    // Whatever
 * }
 * ```
 * 
 * You can watch multiple properties with the same handler by passing an array of property names.
 * 
 * ```ts
 * import { watch } from '@quark-elements/core/decorators/watch.js';
 * 
 * &at;watch(['propName1', 'propName2']) 
 * handlePropChange(propName: string, oldValue: any, newValue: any) {
 *     // Whatever
 * }
 * ```
 * 
 * You can watch all properties with the same handler by not passing a property name parameter.
 * 
 * ```ts
 * import { watch } from '@quark-elements/core/decorators/watch.js';
 * 
 * &at;watch() 
 * handlePropChange(propName: string, oldValue: any, newValue: any) {
 *     // Whatever
 * }
 * ```
 * @customtype decorator
 * @summary A property change observer.
 * @displayname watch
 * @category Core
 * @param [propName] {string | Array<string>} The name of the property to watch, or an array of property names.
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