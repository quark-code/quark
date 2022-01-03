export class DesignTokenValues {
    constructor(values) {
        this._valueMap = new Map();
        this._hasDarkValue = false;
        this._values = values;
        this._valueMap = new Map();
        this._hasDarkValue = this._values['dark'] ? true : false;
    }
    static _convertValue(value) {
        return value
            .replace(/({[^{]*?)\w(?=\})}/igm, (match) => `var(--${match.replace(/[{}]/g, '').replace(/\s*:\s*/, ', ')})`)
            .replace('{', 'var(--')
            .replace('}', ')')
            .replace(/\s*:\s*/, ', ');
    }
    get hasDarkValue() {
        return this._hasDarkValue;
    }
    getValue(mode, device, density, data = null) {
        const key = `${mode}:${device}:${density}`;
        if (this._valueMap.has(key)) {
            return this._valueMap.get(key);
        }
        const val = data || this._values;
        let result = null;
        if (typeof val === 'string') {
            result = DesignTokenValues._convertValue(val);
        }
        else {
            if (val.compact || val.comfortable || val.sparse) {
                if (val[density]) {
                    result = this.getValue(mode, device, density, val[density]);
                }
                else if (val.comfortable) {
                    result = this.getValue(mode, device, density, val.comfortable);
                }
                else if (val.compact) {
                    result = this.getValue(mode, device, density, val.compact);
                }
                else if (val.sparse) {
                    result = this.getValue(mode, device, density, val.sparse);
                }
            }
            else if (val.desktop || val.mobile) {
                if (val[device]) {
                    result = this.getValue(mode, device, density, val[device]);
                }
                else if (val.desktop) {
                    result = this.getValue(mode, device, density, val.desktop);
                }
                else if (val.mobile) {
                    result = this.getValue(mode, device, density, val.mobile);
                }
            }
            else if (val.system || val.light || val.dark) {
                if (val[mode]) {
                    result = this.getValue(mode, device, density, val[mode]);
                }
                else if (val.system || val.light) {
                    result = this.getValue(mode, device, density, val.light);
                }
                else if (val.dark) {
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
//# sourceMappingURL=DesignTokenValues.js.map