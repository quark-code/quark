/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ThemeMode, ThemeDensity, DeviceType, TextDirection } from './Types.js';
import { Theme } from './Theme.js';
import { Icon } from './Icon.js';
export declare class ThemeManager {
    private _themes;
    private _activeTheme;
    private _defaultThemeName;
    private _mode;
    private _density;
    private _iconVariant;
    private _dir;
    private _dirty;
    private _deviceType;
    constructor(mode?: ThemeMode);
    get dir(): TextDirection;
    set dir(value: TextDirection);
    get deviceType(): DeviceType;
    set deviceType(value: DeviceType);
    get iconVariant(): string;
    set iconVariant(value: string);
    get iconVariants(): Array<string>;
    get mode(): ThemeMode;
    set mode(value: ThemeMode);
    get density(): ThemeDensity;
    set density(value: ThemeDensity);
    get themeNames(): Array<string>;
    get defaultThemeName(): string;
    get activeThemeName(): string;
    register(theme: Theme): void;
    unregister(name: string): void;
    unregisterAll(): void;
    has(name: string): boolean;
    makeDefault(name: string): void;
    use(name: string): void;
    clear(): void;
    getIcon(name: string): Icon;
    getIconContent(name: string): string;
    get iconNames(): Array<string>;
    _addStylesToDocument(styles: string): void;
    _removeStylesFromDocument(): void;
    get _isMobile(): any;
}
