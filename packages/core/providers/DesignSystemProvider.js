/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, themeManager } from "@quark-elements/theme";

class DesignSystemProvider {
    constructor(themeType) {
        this._themeType = themeType;

        if (window.designSystemProvider) {
            throw 'A design system provider already exists';
        } else {
            window.designSystemProvider = this;
        }
    }

    get themeType() {
        return this._themeType;
    }

    registerIcons(icons) {
        if (this._themeType) {
            this._themeType.addIcons(icons);
        }

        return this;
    }

    registerIcon(name, value) {
        if (this._themeType) {
            this._themeType.addIcon(name, value);
        }

        return this;
    }

    registerThemes() {
        for (let i = 0; i < arguments.length; i++) {
            const arg = arguments[i];

            if (arg instanceof this._themeType) {
                arguments[i].register();
            } else {
                console.warn('Theme is not of the correct type');
            }
        }

        return this;
    }

    registerTokens(tokens) {
        if (this._themeType) {
            this._themeType.addTokens(tokens);
        }
        
        return this;
    }

    useThemeBrand(name) {
        if (name) {
            themeManager.use(name);
        }
        
        return this;
    }

    clearThemeBrand() {
        themeManager.clear();
        return this;
    }

    withThemeMode(mode = 'system') {
        themeManager.mode = mode;
        return this;
    }

    withDensity(density = 'normal') {
        themeManager.density = density;
        return this;
    }

    withDirection(dir = 'ltr') {
        themeManager.dir = dir;
        return this;
    }

    withDevice(device = 'desktop') {
        themeManager.device = device;
        return this;
    }

    withIconVariant(variant = 'default') {
        themeManager.iconVariant = variant;
        return this;
    }
}

export { DesignSystemProvider, Theme, themeManager }