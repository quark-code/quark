/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType } from '@quark-elements/core/providers/DesignSystemProvider.js';
import { MaterialTheme } from './theme/MaterialTheme.js';

new DesignSystemProvider(MaterialTheme);

function provideMaterialDesignSystem() {
    return window.designSystemProvider;
}

export { provideMaterialDesignSystem, MaterialTheme, themeManager, ThemeMode, ThemeDensity, TextDirection, DeviceType }