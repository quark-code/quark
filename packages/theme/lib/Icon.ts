/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { IconData } from './Types.js';
import { IconValues } from './IconValues.js';

export class Icon {
    private _name: string;
    private _content: IconValues;

    constructor(name: string, values: IconData) {
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

    getContent(variant: string) {
        return this._content.getIcon(variant);
    }
}