/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideMaterialDesignSystem, MaterialTheme } from '../providers/';
import { TypographyDemo, ColorDemo, ElevationDemo, PanelDemo } from './components'

const defaultThemeBrand = new MaterialTheme('default');

provideMaterialDesignSystem()
    .registerIcons(
        /*
        EditIcon('my-edit-icon'),
        ErrorIcon('my-error-icon'),
        AliasIcon('chevron-left', 'back-icon')
        */
    )
    .registerComponents(
        TypographyDemo.asDefault(),
        ColorDemo.asDefault(),
        ElevationDemo.asDefault(),
        PanelDemo.asDefault()
        /*
        QbButton('my-button'),
        QbIcon('my-icon'),
        QbStepper('my-stepper')
        */
    )
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode('system') // (system), light, dark
    .withDensity('comfortable') // compact, (comfortable), sparse
    .withDirection('ltr') // (ltr), rtl
    .useThemeBrand(
        defaultThemeBrand.name
    );