/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ThemeMode } from './Theme.js';

export class ThemeManager {
    constructor() {
        this._themes = new Map();
        this._activeTheme = null;
        this._defaultThemeName = null;
        this._mode = ThemeMode.system; 
    }

    get mode() {
        return this._mode;
    }

    set mode(value) {
        if (ThemeMode.isValid(value) && (this._mode !== value)) {
            this._mode = value;

            if (this._activeTheme) {
                this._activeTheme.mode = this._mode;
                this.use(this._activeTheme.name);
            }
        }
    }

    get themeNames() {
        return Array.from(this._themes.keys());
    }

    get defaultThemeName() {
        return this._defaultThemeName;
    }

    get activeThemeName() {
        return this._activeTheme ? this._activeTheme.name : null;
    }

    register(theme) {
        this._themes.set(theme.name, theme);
    }

    unregister(name) {
        this._themes.delete(name);

        if (this.activeThemeName === name) {
            this.clear();
        }
    }

    unregisterAll() {
        this._themes.clear();
        this._activeTheme = null;
        this.clear();
    }

    has(name) {
        return this._themes.has(name);
    }

    makeDefault(name) {
        this._defaultThemeName = name;
    }

    use(name) {
        const theme = this._themes.get(name ?? (this._defaultThemeName ?? 'default'));

        if (theme && theme.tokens.length > 0) {
            theme.mode = this.mode;
            this._addStylesToDocument(theme.styleSheet);
            this._activeTheme = theme;
        }
    }

    clear() {
        this._removeStylesFromDocument();
        this._activeTheme = null;
    }

    _addStylesToDocument(styles) {
        this._removeStylesFromDocument();

        if (styles) {
            const style = document.createElement('style');
            style.setAttribute('quark-theme', '');
            style.textContent = styles;
            document.documentElement.appendChild(style);
        }
    }

    _removeStylesFromDocument() {
        document.documentElement.querySelectorAll('style[quark-theme]').forEach((s) => document.documentElement.removeChild(s));
    }
}