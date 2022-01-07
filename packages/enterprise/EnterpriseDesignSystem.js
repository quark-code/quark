/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType } from '@quark-elements/core/providers/DesignSystemProvider.js';
import { EnterpriseTheme } from './theme/EnterpriseTheme.js';
new DesignSystemProvider(EnterpriseTheme);
function provideEnterpriseDesignSystem() {
    return window.designSystemProvider;
}
export { provideEnterpriseDesignSystem, EnterpriseTheme, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType };
//# sourceMappingURL=EnterpriseDesignSystem.js.map