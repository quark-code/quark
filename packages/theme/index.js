/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
//export { Theme, ThemeMode, DesignToken, Icon } from './lib/Theme.js';
export * from './lib/Theme.js';
import { ThemeManager } from './lib/ThemeManager.js';

export const themeManager = window.themeManager = window.themeManager || new ThemeManager();