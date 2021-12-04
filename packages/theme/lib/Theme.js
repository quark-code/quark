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
        this._tokens = new Map();
        this._icons = new Map();
        this._mode = ThemeMode.system;
        this._loadIcons();
    }

    get name() {
        return this._name;
    }

    get tokens() {
        return [...this._tokens.values()];
    }

    get styleSheet() {
        if (!this._styleSheet) {
            this._styleSheet = this._createStyleSheet();
        }

        return this._styleSheet;
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

    addToken(name, value) {
        let token = null;

        if (!this._tokens.has(name)) {
            token = new DesignToken(name, value);
            this._tokens.set(name, token);
            this._styleSheet = null;
            this._themeCssVariables = null;
        } else {
            console.warn(`Design token '${name}' already exists.`);
        }

        return token;
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

    // ICONS
    /**
     * Gets all the global (static) icons.
     */
    static get icons() {
        if (!this._globalIcons) {
            this._globalIcons = new Map();
        }

        return this._globalIcons;
    }

    /**
     * Gets all the instance icons.
     */
    get icons() {
        return this._icons;
    }

    /**
     * Gets all the global (static) icon names.
     */
    static get iconNames() {
        return [...new Set([...Theme.icons.keys()])].sort();
    }

    /**
     * Gets all the instance and global (static) icon names.
     */
    get iconNames() {
        return [...new Set([...this._icons.keys(), ...Theme.icons.keys()])].sort();
    }
    
    static addIcon(name, content) {
        if (!Theme.icons.has(name)) {
            if (typeof content === 'string') {
                Theme.icons.set(name, new Icon(name, content));
            } else if (typeof content === 'object') {
                Theme.icons.set(name, new Icon(name, content.content, content.size ? content.size : 24));
            } else {
                console.warn(`Design token '${name}' is invalid.`);
            }
        } else {
            console.warn(`Design token '${name}' already exists.`);
        }
    }

    addIcon(name, value, size = 24) {
        if (name && value) {
            this._icons.set(name, new Icon(name, value, size));
        }
    }

    static aliasIcon(name, alias) {
        if (name && alias && name !== alias) {
            const icon = Theme.icons.get(name);

            if (icon) {
                Theme.icons.set(alias, icon);
            }
        }
    }

    aliasIcon(name, alias) {
        if (name && alias && name !== alias) {
            const icon = this.getIcon(name);

            if (icon) {
                this._icons.set(alias, icon);
            }
        }
    }

    renameIcon(name, newName) {
        this._renameMapIcon(name, newName, this._icons);
        this._renameMapIcon(name, newName, Theme.icons);
    }

    getIcon(name) {
        return this._icons.has(name) ? this._icons.get(name) : Theme.icons.get(name);
    }

    _createStyleSheet() {
        if (!this._themeCssVariables) {
            this._themeCssVariables = this.tokens.map(token => `${token.cssVariable}: ${token.value}`).join(';\n');
        }

        if (!this._themeDarkCssVariables) {
            this._themeDarkCssVariables = this.tokens.filter(token => token.hasDarkValue).map(token => `${token.cssVariable}: ${token.darkValue}`).join(';\n');
        }

        if (!this._themeAllDarkCssVariables) {
            this._themeAllDarkCssVariables = [
                ...this.tokens.filter(token => !token.hasDarkValue).map(token => `${token.cssVariable}: ${token.value}`),
                ...this.tokens.filter(token => token.hasDarkValue).map(token => `${token.cssVariable}: ${token.darkValue}`)
            ].join(';\n');
        }

        let ss = null;

        switch (this.mode) {
            case ThemeMode.light: {
                ss = `
                    :root {
                        ${this._themeCssVariables}
                    }
                `;

                break;
            }

            case ThemeMode.dark: {
                ss = `
                    :root {
                        ${this._themeAllDarkCssVariables}
                    }
                `;

                break;
            }

            default: {
                ss = `
                    :root {
                        ${this._themeCssVariables}
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

    _loadIcons() {
        if (!Theme._globalIconsLoaded) {
            if (this.constructor.icons) {
                const icons = Object.getOwnPropertyNames(this.constructor.icons);

                icons.forEach(icon => {
                    Theme.addIcon(icon, this.constructor.icons[icon]);
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
}