/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager } from '@quark-elements/core/providers';
import { MaterialTheme } from './theme/MaterialTheme.js';

const designSystemProvider = new DesignSystemProvider(MaterialTheme);

function provideMaterialDesignSystem() {
    return designSystemProvider;
}

export { provideMaterialDesignSystem, MaterialTheme, themeManager }