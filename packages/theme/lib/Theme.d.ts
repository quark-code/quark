/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignToken } from './DesignToken.js';
import { Icon } from './Icon.js';
import { ThemeMode, ThemeDensity, DeviceType } from './Types.js';
export { DesignToken, Icon };
export declare class Theme {
    static tokens?: any;
    static icons?: any;
    private static _globalTokensLoaded;
    private static _globalIconsLoaded;
    private static _globalTokens;
    private static _globalIcons;
    private _styleSheet;
    private _tokensDirty;
    private _name;
    private _mode;
    private _density;
    private _deviceType;
    private _iconVariant;
    private _localTokens;
    private _localIcons;
    private _allTokens;
    constructor(name: string);
    get name(): string;
    get mode(): ThemeMode;
    set mode(value: ThemeMode);
    get density(): ThemeDensity;
    set density(value: ThemeDensity);
    get deviceType(): DeviceType;
    set deviceType(value: DeviceType);
    get iconVariant(): string;
    set iconVariant(value: string);
    get iconVariants(): Array<string>;
    get styleSheet(): string;
    register(): Theme;
    unregister(): Theme;
    use(): Theme;
    makeDefault(): Theme;
    /**
     * Gets all the global (static) tokens.
     */
    static get globalTokens(): Map<string, DesignToken>;
    /**
     * Gets all the local (instance) tokens.
     */
    get localTokens(): Map<string, DesignToken>;
    /**
     * Gets all the local (instance) and global (static) token names.
     */
    get tokenNames(): Array<string>;
    static addToken(name: string, values: any): void;
    static addTokens(tokens: any): void;
    addToken(name: string, values: any): void;
    addTokens(tokens: any): void;
    _loadGlobalTokens(): void;
    /**
     * Gets all the global (static) icons.
     */
    static get globalIcons(): Map<string, Icon>;
    /**
     * Gets all the local (instance) icons.
     */
    get localIcons(): Map<string, Icon>;
    /**
     * Gets all the instance and global (static) icon names.
     */
    get iconNames(): Array<string>;
    static addIcon(name: string, value: any): void;
    static addIcons(icons: any): void;
    addIcon(name: string, value: any): void;
    addIcons(icons: any): void;
    static aliasIcon(name: string, alias: string): void;
    aliasIcon(name: string, alias: string): void;
    renameIcon(name: string, newName: string): void;
    getIcon(name: string): Icon;
    getIconContent(name: string): string;
    _loadGlobalIcons(): void;
    _renameMapIcon(name: string, newName: string, map: Map<string, Icon>): void;
    _createStyleSheet(): string;
}
