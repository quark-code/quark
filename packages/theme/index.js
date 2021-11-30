/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, ThemeMode } from './lib/Theme.js';
import { ThemeManager } from './lib/ThemeManager.js';

window._themeManager = window._themeManager || new ThemeManager();
const themeManager = window._themeManager;

export { Theme, ThemeMode, themeManager }