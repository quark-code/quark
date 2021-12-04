/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { DesignSystemProvider, themeManager } from '@quark-elements/core/providers';
import { QuarkTheme } from './QuarkTheme.js';

const designSystemProvider = new DesignSystemProvider(QuarkTheme);

function provideQuarkDesignSystem() {
    return designSystemProvider;
}

function Icon(name, content, size = 24) {
    designSystemProvider.addIcon(name, content, size);
}

function AliasIcon(name, alias) {
    designSystemProvider.aliasIcon(name, alias);
}

export { provideQuarkDesignSystem, Icon, AliasIcon, QuarkTheme, themeManager }