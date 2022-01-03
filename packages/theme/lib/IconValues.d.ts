/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { IconData } from './Types.js';
export declare class IconValues {
    private _content;
    private _default;
    private _variants;
    constructor(values: IconData);
    get variants(): string[];
    get defaultVariant(): string;
    getIcon(variant: string): string;
}
