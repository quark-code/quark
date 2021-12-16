/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
function convertValue(value) {
    return value ? value
        .replace(/({[^{]*?)\w(?=\})}/igm, (match) => `var(--${match.replace(/[{}]/g, '').replace(/\s*:\s*/, ', ')})`)
        .replace('{', 'var(--')
        .replace('}', ')')
        .replace(/\s*:\s*/, ', ') : null;
}

export class DesignTokenValues {
    constructor(name, values) {
        if (!values) {
            throw `Invalid design token definition for '${name}'.`;
        }

        this._name = name;
        this._values = values;
        this._valueMap = new Map();
    }

    get hasDarkValue() {
        if (this._hasDarkValue === undefined) {
            this._hasDarkValue = this._values['dark'] ? true : false;
        }

        return this._hasDarkValue;
    }

    getValue(mode, device, density, data = null) {
        const key = `${mode}:${device}:${density}`;

        if (this._valueMap.has(key)) {
            return this._valueMap.get(key)
        }

        const val = data || this._values;
        let result = null;

        if (typeof val === 'string') {
            result = convertValue(val);
        } else {
            if (val.compact || val.comfortable || val.sparse) {
                if (val[density]) {
                    result = this.getValue(mode, device, density, val[density]);
                } else if (val.comfortable) {
                    result = this.getValue(mode, device, density, val.comfortable);
                }
                else if (val.compact) {
                    result = this.getValue(mode, device, density, val.compact);
                }
                else if (val.sparse) {
                    result = this.getValue(mode, device, density, val.sparse);
                }
            } else if (val.desktop || val.mobile) {
                if (val[device]) {
                    result = this.getValue(mode, device, density, val[device]);
                } else if (val.desktop) {
                    result = this.getValue(mode, device, density, val.desktop);
                } else if (val.mobile) {
                    result = this.getValue(mode, device, density, val.mobile);
                } 
            } else if (val.system || val.light || val.dark) {
                if (val[mode]) {
                    result = this.getValue(mode, device, density, val[mode]);
                } else if (val.system || val.light) {
                    result = this.getValue(mode, device, density, val.light);
                } else if (val.dark) {
                    result = this.getValue(mode, device, density, val.dark);
                }
            }
        }

        if (result !== null) {
            this._valueMap.set(key, result);
        }

        return result;
    }
}

export class DesignToken {
    constructor(name, values) {
        if (!name) {
            throw 'A design token must have a name.';
        }

        this._name = name.toLowerCase();
        this._cssVariable = `--${this._name}`;
        this._values = new DesignTokenValues(name, values);
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