/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
//export { Theme, ThemeMode, DesignToken, Icon } from './lib/Theme.js';
declare global {
    interface Window { themeManager: ThemeManager; }
}

declare global {
    interface Navigator { userAgentData: any; }
}

export * from './lib/Theme.js';
import { ThemeManager } from './lib/ThemeManager.js';

export const themeManager = window.themeManager = window.themeManager || new ThemeManager();