/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/

/*
export type DeviceType = 'mobile' | 'desktop';
export type ThemeDensity = 'compact' | 'comfortable' | 'sparse';
export type ThemeMode = 'system' | 'light' | 'dark';
*/

export enum DeviceType {
    Mobile = 'mobile',
    Desktop = 'desktop'
}

export enum ThemeDensity {
    Compact = 'compact',
    Comfortable = 'comfortable',
    Sparse = 'sparse'
}

export enum ThemeMode {
    System = 'system',
    Light = 'light',
    Dark = 'dark'
}

export enum TextDirection {
    LTR = 'ltr',
    RTL = 'rtl'
}

export type IconShape = {
    [key: string]: string | {
        icon: string;
        size?: number;
    } | {
        default?: string;
        variants: {
            [key: string]: string | {
                icon: string;
                size?: number;
            }
        };
    };
}

export type DesignTokenShape = {
    [key: string]: string | {
        [property in keyof { light?: string; dark?: string }]: string | {
            [property in keyof { mobile?: string; desktop?: string }]: string | {
                [property in keyof { compact?: string; comfortable?: string; sparse?: string }]: string;
            };
        };
    } | {
        [property in keyof { mobile?: string; desktop?: string }]: string | {
            [property in keyof { compact?: string; comfortable?: string; sparse?: string }]: string;
        };
    } | {
        [property in keyof { compact?: string; comfortable?: string; sparse?: string }]: string;
    }
}

/*
export class DeviceType {
    private static _allowedValues: Array<string> = ['mobile', 'desktop'];

    static get mobile(): string {
        return 'mobile';
    }

    static get desktop(): string {
        return 'desktop';
    }

    static isValid(value: string): boolean {
        return this._allowedValues.includes(value);
    }
}

export class ThemeDensity {
    private static _allowedValues: Array<string> = ['compact', 'comfortable', 'sparse'];

    static get compact(): string {
        return 'compact';
    }

    static get comfortable(): string {
        return 'comfortable';
    }

    static get sparse(): string {
        return 'sparse';
    }

    static isValid(value: string): boolean {
        return this._allowedValues.includes(value);
    }
}

export class ThemeMode {
    private static _allowedValues: Array<string> = ['system', 'light', 'dark'];

    static get system(): string {
        return 'system';
    }

    static get light(): string {
        return 'light';
    }

    static get dark(): string {
        return 'dark';
    }

    static isValid(value: string): boolean {
        return this._allowedValues.includes(value);
    }
}
*/