/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
function convertValue(value) {
    value = value.replace(/({[^{]*?)\w(?=\})}/igm, (match) => `var(--${match.replace(/[{}]/g, '').replace(/\s*:\s*/, ', ')})`);
    return value.replace('{', 'var(--').replace('}', ')').replace(/\s*:\s*/, ', ');
    //return value.replace(/\s*{\s*/g, ' var(--').replace(/\s*}\s*/g, ') ').replace(/\s*:\s*/g, ', ').replace(/\s*\/\s*/g, '/').trim();
}

export class DesignToken {
    constructor(name, value) {
        this._name = name.toLowerCase();
        this._cssVariable = `--${this._name}`;
        this._value = convertValue(value);
        this._darkValue = this._value;
        this._hasDarkValue = false;
    }

    get name() {
        return this._name;
    }

    get value() {
        return this._value;
    }

    get cssVariable() {
        return this._cssVariable;
    }

    get darkValue() {
        return this._darkValue;
    }

    get hasDarkValue() {
        return this._hasDarkValue;
    }

    dark(value) {
        this._darkValue =  convertValue(value);
        this._hasDarkValue = true;
        return this;
    }
}