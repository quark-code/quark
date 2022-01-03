import { DesignTokenValues } from './DesignTokenValues.js';
export class DesignToken {
    constructor(name, values) {
        if (!name) {
            throw 'A design token must have a name.';
        }
        if (!values) {
            throw 'A design token must have a value.';
        }
        this._name = name.toLowerCase();
        this._cssVariable = `--${this._name}`;
        this._values = new DesignTokenValues(values);
    }
    get name() {
        return this._name;
    }
    get cssVariable() {
        return this._cssVariable;
    }
    get hasDarkValue() {
        return this._values.hasDarkValue;
    }
    getValue(mode, device, density) {
        return this._values.getValue(mode, device, density);
    }
}
//# sourceMappingURL=DesignToken.js.map