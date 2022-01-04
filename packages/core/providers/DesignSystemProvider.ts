/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType } from "@quark-elements/theme";

declare global {
    interface Window { designSystemProvider: DesignSystemProvider; }
}

class DesignSystemProvider {
    private _themeType: typeof Theme;

    constructor(themeType: typeof Theme) {
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

    registerIcons(icons: any) {
        if (this._themeType) {
            this._themeType.addIcons(icons);
        }

        return this;
    }

    registerIcon(name: string, value: any) {
        if (this._themeType) {
            this._themeType.addIcon(name, value);
        }

        return this;
    }

    registerThemes(...args: Array<Theme>) {
        for (let i = 0; i < args.length; i++) {
            const arg = args[i];

            if (arg instanceof this._themeType) {
                args[i].register();
            } else {
                console.warn('Theme is not of the correct type');
            }
        }

        return this;
    }

    registerTokens(tokens: any) {
        if (this._themeType) {
            this._themeType.addTokens(tokens);
        }
        
        return this;
    }

    useThemeBrand(name: string) {
        if (name) {
            themeManager.use(name);
        }
        
        return this;
    }

    clearThemeBrand() {
        themeManager.clear();
        return this;
    }

    withThemeMode(mode: ThemeMode = ThemeMode.System) {
        themeManager.mode = mode;
        return this;
    }

    withDensity(density: ThemeDensity = ThemeDensity.Comfortable) {
        themeManager.density = density;
        return this;
    }

    withDirection(dir: TextDirection = TextDirection.LTR) {
        themeManager.dir = dir;
        return this;
    }

    withDevice(deviceType: DeviceType = DeviceType.Desktop) {
        themeManager.deviceType = deviceType;
        return this;
    }

    withIconVariant(variant = 'default') {
        themeManager.iconVariant = variant;
        return this;
    }
}

export { DesignSystemProvider, Theme, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType }