/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ThemeMode, DeviceType, ThemeDensity, DesignTokenData } from './Types.js';
export declare class DesignToken {
    private _name;
    private _cssVariable;
    private _values;
    constructor(name: string, values: DesignTokenData);
    get name(): string;
    get cssVariable(): string;
    get hasDarkValue(): boolean;
    getValue(mode: ThemeMode, device: DeviceType, density: ThemeDensity): any;
}
