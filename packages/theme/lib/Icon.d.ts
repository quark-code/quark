/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { IconData } from './Types.js';
export declare class Icon {
    private _name;
    private _content;
    constructor(name: string, values: IconData);
    get name(): string;
    get variants(): string[];
    get defaultVariant(): string;
    getContent(variant: string): string;
}
