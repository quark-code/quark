/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager } from '@quark-elements/core/providers';
import { MaterialTheme } from './theme/MaterialTheme.js';

new DesignSystemProvider(MaterialTheme);

function provideMaterialDesignSystem() {
    return window.designSystemProvider;
}

export { provideMaterialDesignSystem, MaterialTheme, themeManager }