/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ThemeMode, DeviceType, ThemeDensity, DesignTokenData } from './Types.js';
export declare class DesignTokenValues {
    private _values;
    private _valueMap;
    private _hasDarkValue;
    static _convertValue(value: string): string;
    constructor(values: DesignTokenData);
    get hasDarkValue(): boolean;
    getValue(mode: ThemeMode, device: DeviceType, density: ThemeDensity, data?: string | object): any;
}
