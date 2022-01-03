export class IconValues {
    constructor(values) {
        this._content = new Map();
        this._default = 'default';
        if (!values) {
            throw 'Invalid icon definition.';
        }
        if (typeof values === 'string') {
            this._content.set('default', `<svg viewBox="0 0 24 24">${values}</svg>`);
        }
        else {
            if (values.icon) {
                const val = values.icon;
                let size = 24;
                if (values.size) {
                    size = values.size;
                }
                this._content.set('default', `<svg viewBox="0 0 ${size} ${size}">${val}</svg>`);
            }
            else if (values.variants) {
                this._default = values.default || this._default;
                const variants = Object.getOwnPropertyNames(values.variants);
                for (let i = 0; i < variants.length; i++) {
                    const variantName = variants[i];
                    const variant = values.variants[variantName];
                    if (typeof variant === 'string') {
                        this._content.set(variantName, `<svg viewBox="0 0 24 24">${variant}</svg>`);
                    }
                    else {
                        if (variant.icon) {
                            const val = variant.icon;
                            let size = 24;
                            if (variant.size) {
                                size = variant.size;
                            }
                            this._content.set(variantName, `<svg viewBox="0 0 ${size} ${size}">${val}</svg>`);
                        }
                    }
                }
            }
        }
        this._variants = [...this._content.keys()];
    }
    get variants() {
        return this._variants;
    }
    get defaultVariant() {
        return this._default;
    }
    getIcon(variant) {
        return this._content.has(variant) ? this._content.get(variant) : this._content.get(this._default) || null;
    }
}
//# sourceMappingURL=IconValues.js.map