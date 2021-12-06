/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignToken } from './DesignToken.js';
import { Icon } from './Icon.js';

export { DesignToken, Icon }

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

    static isValid(mode) {
        return ['system', 'light', 'dark'].indexOf(mode) > -1;
    }
}

export class Theme {
    constructor(name) {
        this._name = name;
        this._mode = ThemeMode.system;
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
        if (ThemeMode.isValid(value) && (this._mode !== value)) {
            this._mode = value;
            window.themeManager.mode = value;
            this._styleSheet = this._createStyleSheet();
        }
    }

    get styleSheet() {
        if (!this._styleSheet) {
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

    static addToken(name, light, dark = null) {
        if (!Theme.globalTokens.has(name)) {
            Theme.globalTokens.set(name, new DesignToken(name, light, dark));
            Theme._tokensDirty = true;
        } else {
            console.warn(`Global design token '${name}' already exists.`);
        }
    }

    addToken(name, value, dark = null) {
        this.localTokens.set(name, new DesignToken(name, value, dark));
        this._styleSheet = null;
        Theme._tokensDirty = true;
    }

    _loadGlobalTokens() {
        if (!Theme._globalTokensLoaded) {
            if (this.constructor.tokens) {
                const tokenNames = Object.getOwnPropertyNames(this.constructor.tokens);

                tokenNames.forEach(tokenName => {
                    const tokenContent = this.constructor.tokens[tokenName];

                    if (typeof tokenContent === 'string') {
                        Theme.addToken(tokenName, tokenContent);
                    } else if (typeof tokenContent === 'object') {
                        Theme.addToken(tokenName, tokenContent.light, tokenContent.dark);
                    } else {
                        console.warn(`Global design token '${tokenName}' is invalid.`);
                    }
                });
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

    static addIcon(name, value, size = 24) {
        if (name && value) {
            if (!Theme.globalIcons.has(name)) {
                Theme.globalIcons.set(name, new Icon(name, value, size));
            } else {
                console.warn(`Global icon '${name}' already exists.`);
            }
        }
    }

    addIcon(name, value, size = 24) {
        if (name && value) {
            this.localIcons.set(name, new Icon(name, value, size));
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

    _loadGlobalIcons() {
        if (!Theme._globalIconsLoaded) {
            if (this.constructor.icons) {
                const iconNames = Object.getOwnPropertyNames(this.constructor.icons);

                iconNames.forEach(iconName => {
                    const iconContent = this.constructor.icons[iconName];

                    if (typeof iconContent === 'string') {
                        Theme.globalIcons.set(iconName, new Icon(iconName, iconContent));
                    } else if (typeof iconContent === 'object') {
                        Theme.globalIcons.set(iconName, new Icon(iconName, iconContent.icon, iconContent.size ? iconContent.size : 24));
                    } else {
                        console.warn(`Global icon '${iconName}' is invalid.`);
                    }
                });
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
        if (Theme._tokensDirty || !this._allTokens) {
            this._allTokens = [...new Map([...this.constructor.globalTokens, ...this._localTokens]).values()];
        }

        if (Theme._tokensDirty || !this._themeLightCssVariables) {
            this._themeLightCssVariables = this._allTokens.map(token => `${token.cssVariable}: ${token.light}`).join(';\n');
        }

        if (Theme._tokensDirty || !this._themeDarkCssVariables) {
            this._themeDarkCssVariables = this._allTokens.filter(token => token.hasDarkValue).map(token => `${token.cssVariable}: ${token.dark}`).join(';\n');
        }

        if (Theme._tokensDirty || !this._themeAllCssVariables) {
            this._themeAllCssVariables = [
                ...this._allTokens.filter(token => !token.hasDarkValue).map(token => `${token.cssVariable}: ${token.light}`),
                ...this._allTokens.filter(token => token.hasDarkValue).map(token => `${token.cssVariable}: ${token.dark}`)
            ].join(';\n');
        }

        Theme._tokensDirty = false;

        let ss = null;

        switch (this.mode) {
            case ThemeMode.light: {
                ss = `
                    :root {
                        ${this._themeLightCssVariables}
                    }
                `;

                break;
            }

            case ThemeMode.dark: {
                ss = `
                    :root {
                        ${this._themeAllCssVariables}
                    }
                `;

                break;
            }

            default: {
                ss = `
                    :root {
                        ${this._themeLightCssVariables}
                    }

                    @media (prefers-color-scheme: dark) {
                        :root {
                            ${this._themeDarkCssVariables}
                        }
                    }
                `;

                break;
            }
        }

        return ss;
    }
}