/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideMaterialDesignSystem, MaterialTheme } from '../providers/';
import './components';

const defaultThemeBrand = new MaterialTheme('default');

provideMaterialDesignSystem()
    //.registerIcons(Icons)
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode('system') // (system), light, dark
    .withDensity('comfortable') // compact, (comfortable), sparse
    .withDirection('ltr') // (ltr), rtl
    .useThemeBrand(
        defaultThemeBrand.name
    );