import { IconValues } from './IconValues.js';
export class Icon {
    constructor(name, values) {
        this._name = name;
        this._content = new IconValues(values);
    }
    get name() {
        return this._name;
    }
    get variants() {
        return this._content.variants;
    }
    get defaultVariant() {
        return this._content.defaultVariant;
    }
    getContent(variant) {
        return this._content.getIcon(variant);
    }
}
//# sourceMappingURL=Icon.js.map