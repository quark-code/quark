export * from './lib/Theme.js';
export * from './lib/DesignToken.js'
export * from './lib/DesignTokenValues.js';
export * from './lib/Icon.js';
export * from './lib/IconValues.js';
export * from './lib/Types.js'
import { ThemeManager } from './lib/ThemeManager.js';
export const themeManager = window.themeManager = window.themeManager || new ThemeManager();
//# sourceMappingURL=index.js.map