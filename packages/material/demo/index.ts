/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideMaterialDesignSystem, MaterialTheme, ThemeMode, ThemeDensity, TextDirection } from '../providers/MaterialDesignSystemProvider.js';
import './components';

const defaultThemeBrand = new MaterialTheme('default');

provideMaterialDesignSystem()
    //.registerIcons(Icons)
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode(ThemeMode.System) // (system), light, dark
    .withDensity(ThemeDensity.Comfortable) // compact, (comfortable), sparse
    .withDirection(TextDirection.LTR) // (ltr), rtl
    .useThemeBrand(
        defaultThemeBrand.name
    );