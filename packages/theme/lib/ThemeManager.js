/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { ThemeMode, ThemeDensity, DeviceType, TextDirection } from './Types.js';
export class ThemeManager {
    constructor(mode = ThemeMode.System) {
        this._themes = new Map();
        this._activeTheme = null;
        this._defaultThemeName = null;
        this._density = ThemeDensity.Comfortable;
        this._iconVariant = 'default';
        this._dir = TextDirection.LTR;
        this._dirty = true;
        this._mode = mode;
        this._iconVariant = 'default';
        this._deviceType = this._isMobile ? DeviceType.Mobile : DeviceType.Desktop;
    }
    get dir() {
        return this._dir;
    }
    set dir(value) {
        if (value !== this._dir) {
            this._dir = value;
            document.documentElement.dir = this._dir;
        }
    }
    get deviceType() {
        return this._deviceType;
    }
    set deviceType(value) {
        if (this._deviceType !== value) {
            this._deviceType = value;
            if (this._activeTheme) {
                this.use(this._activeTheme.name);
            }
        }
    }
    get iconVariant() {
        return this._iconVariant;
    }
    set iconVariant(value) {
        if (this._iconVariant !== value) {
            this._iconVariant = value;
            if (this._activeTheme) {
                this.use(this._activeTheme.name);
            }
        }
    }
    get iconVariants() {
        return this._activeTheme ? this._activeTheme.iconVariants : [];
    }
    get mode() {
        return this._mode;
    }
    set mode(value) {
        if (this._mode !== value) {
            this._mode = value;
            if (this._activeTheme) {
                this.use(this._activeTheme.name);
            }
        }
    }
    get density() {
        return this._density;
    }
    set density(value) {
        if (this._density !== value) {
            this._density = value;
            if (this._activeTheme) {
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
        theme.deviceType = this.deviceType;
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
        var _a;
        const theme = this._themes.get(name !== null && name !== void 0 ? name : ((_a = this._defaultThemeName) !== null && _a !== void 0 ? _a : 'default'));
        if (theme) {
            theme.mode = this.mode;
            theme.density = this.density;
            theme.deviceType = this.deviceType;
            theme.iconVariant = this.iconVariant;
            this._addStylesToDocument(theme.styleSheet);
            this._activeTheme = theme;
            const event = new CustomEvent('theme-changed', {
                bubbles: true,
                composed: true
            });
            window.dispatchEvent(event);
        }
    }
    clear() {
        this._removeStylesFromDocument();
        this._activeTheme = null;
    }
    // ICONS
    getIcon(name) {
        return this._activeTheme ? this._activeTheme.getIcon(name) : null;
    }
    getIconContent(name) {
        return this._activeTheme ? this._activeTheme.getIconContent(name) : null;
    }
    get iconNames() {
        return this._activeTheme ? this._activeTheme.iconNames : [];
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
        const styles = document.documentElement.querySelectorAll('style[quark-theme]');
        for (let i = 0; i < styles.length; i++) {
            document.documentElement.removeChild(styles[i]);
        }
    }
    get _isMobile() {
        if (navigator.userAgentData) {
            return navigator.userAgentData.mobile;
        }
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}
//# sourceMappingURL=ThemeManager.js.map