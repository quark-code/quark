/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import '../_components/page-container.js';
import '../_components/page-navigator.js';
import '../_components/component-header.js';
import '../_components/page-tabs.js';
import '../_components/collapsible-panel.js';
import '../_components/collapsible-protected-panel.js';
import '../_components/component-part.js';
import '../_components/page-state.js';
import { provideMaterialDesignSystem, MaterialTheme, ThemeMode, ThemeDensity, TextDirection } from '@quark-elements/material/providers/MaterialDesignSystemProvider.js';

const defaultThemeBrand = new MaterialTheme('default');

provideMaterialDesignSystem()
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode(ThemeMode.System)
    .withDensity(ThemeDensity.Comfortable)
    .withDirection(TextDirection.LTR)
    .useThemeBrand(
        defaultThemeBrand.name
    );