/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
export { Theme, ThemeMode } from './lib/Theme.js';
import { ThemeManager } from './lib/ThemeManager.js';

export const themeManager = window.themeManager = window.themeManager || new ThemeManager();