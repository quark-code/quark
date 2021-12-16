/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignToken } from './DesignToken.js';
import { Icon } from './Icon.js';

export { DesignToken, Icon }

export class ThemeDensity {
    static get compact() {
        return 'compact';
    }

    static get comfortable() {
        return 'comfortable';
    }

    static get sparse() {
        return 'sparse';
    }

    static isValid(value) {
        return ['compact', 'comfortable', 'sparse'].indexOf(value) > -1;
    }
}

export class ThemeMode {
    static get system() {
        return 'system';
    }

    static get light() {
        return 'light';
    }

    static get dark() {
        return 'dark';
    }

    static isValid(value) {
        return ['system', 'light', 'dark'].indexOf(value) > -1;
    }
}

export class DeviceType {
    static get mobile() {
        return 'mobile';
    }

    static get desktop() {
        return 'desktop';
    }

    static isValid(value) {
        return ['mobile', 'desktop'].indexOf(value) > -1;
    }
}

export class Theme {
    constructor(name) {
        this._tokensDirty = true;
        this._name = name;
        this._mode = ThemeMode.system;
        this._density = ThemeDensity.comfortable;
        this._deviceType = DeviceType.desktop;
        this._localTokens = new Map();
        this._localIcons = new Map();
        this._loadGlobalTokens();
        this._loadGlobalIcons();
    }

    get name() {
        return this._name;
    }

    get mode() {
        return this._mode;
    }

    set mode(value) {
        if ((this._mode !== value) && ThemeMode.isValid(value)) {
            this._mode = value;
            this._tokensDirty = true;
        }
    }

    get density() {
        return this._density;
    }

    set density(value) {
        if ((this._density !== value) && ThemeDensity.isValid(value)) {
            this._density = value;
            this._tokensDirty = true;
        }
    }

    get deviceType() {
        return this._deviceType;
    }

    set deviceType(value) {
        if ((this._deviceType !== value) && DeviceType.isValid(value)) {
            this._deviceType = value;
            this._tokensDirty = true;
            this._changeIconDeviceType();
        }
    }

    get styleSheet() {
        if (this._tokensDirty) {
            this._styleSheet = this._createStyleSheet();
        }

        return this._styleSheet;
    }

    register() {
        window.themeManager.register(this);
        return this;
    }

    unregister() {
        window.themeManager.unregister(this.name);
        return this;
    }

    use() {
        window.themeManager.use(this.name);
        return this;
    }

    makeDefault() {
        window.themeManager.makeDefault(this.name);
        return this;
    }

    // TOKENS
    /**
     * Gets all the global (static) tokens.
     */
    static get globalTokens() {
        if (!this._globalTokens) {
            this._globalTokens = new Map();
        }

        return this._globalTokens;
    }

    /**
     * Gets all the local (instance) tokens.
     */
    get localTokens() {
        return this._localTokens;
    }

    /**
     * Gets all the local (instance) and global (static) token names.
     */
    get tokenNames() {
        return [...new Set([...this.localTokens.keys(), ...Theme.globalTokens.keys()])].sort();
    }

    static addToken(name, values) {
        if (!Theme.globalTokens.has(name)) {
            Theme.globalTokens.set(name, new DesignToken(name, values));
            this._tokensDirty = true;
        } else {
            console.warn(`Global design token '${name}' already exists.`);
        }
    }

    addToken(name, values) {
        this.localTokens.set(name, new DesignToken(name, values));
        this._styleSheet = null;
        this._tokensDirty = true;
    }

    _loadGlobalTokens() {
        if (!Theme._globalTokensLoaded) {
            if (this.constructor.tokens) {
                const tokenNames = Object.getOwnPropertyNames(this.constructor.tokens);

                for (let i = 0; i < tokenNames.length; i++) {
                    const tokenName = tokenNames[i];
                    const tokenContent = this.constructor.tokens[tokenName];

                    if (tokenContent) {
                        Theme.addToken(tokenName, tokenContent);
                    } else {
                        console.warn(`Global design token '${tokenName}' is invalid.`);
                    }
                }
            }

            Theme._globalTokensLoaded = true;
        }
    }

    // ICONS
    /**
     * Gets all the global (static) icons.
     */
    static get globalIcons() {
        if (!this._globalIcons) {
            this._globalIcons = new Map();
        }

        return this._globalIcons;
    }

    /**
     * Gets all the local (instance) icons.
     */
    get localIcons() {
        return this._localIcons;
    }

    /**
     * Gets all the instance and global (static) icon names.
     */
    get iconNames() {
        return [...new Set([...this.localIcons.keys(), ...Theme.globalIcons.keys()])].sort();
    }

    static addIcon(name, value) {
        if (name && value) {
            if (!Theme.globalIcons.has(name)) {
                Theme.globalIcons.set(name, new Icon(name, value, this.deviceType));
            } else {
                console.warn(`Global icon '${name}' already exists.`);
            }
        }
    }

    addIcon(name, value) {
        if (name && value) {
            this.localIcons.set(name, new Icon(name, value, this.deviceType));
        }
    }

    static aliasIcon(name, alias) {
        if (name && alias && name !== alias) {
            const icon = Theme.globalIcons.get(name);

            if (icon) {
                Theme.globalIcons.set(alias, icon);
            }
        }
    }

    aliasIcon(name, alias) {
        if (name && alias && name !== alias) {
            const icon = this.getIcon(name);

            if (icon) {
                this.localIcons.set(alias, icon);
            }
        }
    }

    renameIcon(name, newName) {
        this._renameMapIcon(name, newName, this.localIcons);
        this._renameMapIcon(name, newName, Theme.globalIcons);
    }

    getIcon(name) {
        return this.localIcons.has(name) ? this.localIcons.get(name) : Theme.globalIcons.get(name);
    }

    _changeIconDeviceType() {
        const icons = [...Theme.globalIcons.values(), ...this.localIcons.values()];

        for (let i = 0; i < icons.length; i++) {
            icons[i].deviceType = this.deviceType;
        }
    }

    _loadGlobalIcons() {
        if (!Theme._globalIconsLoaded) {
            if (this.constructor.icons) {
                const iconNames = Object.getOwnPropertyNames(this.constructor.icons);

                for (let i = 0; i < iconNames.length; i++) {
                    const iconName = iconNames[i];
                    const iconContent = this.constructor.icons[iconName];
                    Theme.globalIcons.set(iconName, new Icon(iconName, iconContent, this.deviceType));
                }
            }

            Theme._globalIconsLoaded = true;
        }
    }

    _renameMapIcon(name, newName, map) {
        if ((map.has(name)) && (!map.has(newName))) {
            const iconData = map.get(name);
            map.delete(name);
            map.set(newName, iconData);
        }
    }

    _createStyleSheet() {
        if (!this._allTokens) {
            this._allTokens = [...new Map([...this.constructor.globalTokens, ...this.localTokens]).values()];
        }

        //console.time('Create Stylesheet');
        this._tokensDirty = false;
        const themeLightCssVariablesArray = [];
        const themeDarkCssVariablesArray = [];
        const themeAllCssVariablesArray = [];
        
        for (let i = 0; i < this._allTokens.length; i++) {
            const token = this._allTokens[i];
            const light = `${token.cssVariable}: ${token.getValue('light', this.deviceType, this.density)}`;

            themeLightCssVariablesArray.push(light);

            if (this.mode !== ThemeMode.light) {
                if (token.hasDarkValue) {
                    const dark = `${token.cssVariable}: ${token.getValue('dark', this.deviceType, this.density)}`;
                    themeDarkCssVariablesArray.push(dark);
                    themeAllCssVariablesArray.push(dark);
                } else {
                    if (this.mode === ThemeMode.dark) {
                        themeAllCssVariablesArray.push(light);
                    }
                }
            }
        }
        
        const themeLightCssVariables = themeLightCssVariablesArray.join(';\n');
        const themeDarkCssVariables = themeDarkCssVariablesArray.join(';\n');
        const themeAllCssVariables = themeAllCssVariablesArray.join(';\n');
        //console.timeEnd('Create Stylesheet');

        switch (this.mode) {
            case ThemeMode.light: return `:root {${themeLightCssVariables}}`;
            case ThemeMode.dark: return `:root {${themeAllCssVariables}}`;
            default: return `:root {${themeLightCssVariables}} @media (prefers-color-scheme: dark) {:root {${themeDarkCssVariables}}}`;
        }
    }
}