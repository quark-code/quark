/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignToken } from './DesignToken.js';

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
        this._tokens = new Map;
        this._mode = ThemeMode.system;
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
}