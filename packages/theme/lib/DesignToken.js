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
        .replace(/\s*:\s*/, ', ') : '';
}

export class DesignToken {
    constructor(name, light, dark = null) {
        if (!name) {
            throw 'A design token must have a name.';
        }

        if (!light) {
            throw `Design token ${name} must have at least a light value.`;
        }

        this._name = name.toLowerCase();
        this._cssVariable = `--${this._name}`;
        this._light = convertValue(light);
        this._dark = dark ? convertValue(dark) : this._light;
        this._hasDarkValue = dark ? true : false;
    }

    get name() {
        return this._name;
    }

    get cssVariable() {
        return this._cssVariable;
    }

    get light() {
        return this._light;
    }

    get dark() {
        return this._dark;
    }

    get hasDarkValue() {
        return this._hasDarkValue;
    }
}