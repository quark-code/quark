/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType } from '@quark-elements/core/providers/DesignSystemProvider.js';
import { EnterpriseTheme } from './theme/EnterpriseTheme.js';
declare function provideEnterpriseDesignSystem(): DesignSystemProvider;
export { provideEnterpriseDesignSystem, EnterpriseTheme, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType };
