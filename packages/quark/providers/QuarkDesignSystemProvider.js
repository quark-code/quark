/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager } from '@quark-elements/core/providers';
import { QuarkTheme } from './theme/QuarkTheme.js';

const designSystemProvider = new DesignSystemProvider(QuarkTheme);

function provideQuarkDesignSystem() {
    return designSystemProvider;
}

export { provideQuarkDesignSystem, QuarkTheme, themeManager }