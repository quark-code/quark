/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideQuarkDesignSystem, QuarkTheme } from '../providers/';

const defaultThemeBrand = new QuarkTheme('default', 'white', 'cornflowerblue');

provideQuarkDesignSystem()
    .registerIcons(
        /*
        EditIcon('my-edit-icon'),
        ErrorIcon('my-error-icon'),
        AliasIcon('chevron-left', 'back-icon')
        */
    )
    .registerComponents(
        /*
        QbButton('my-button'),
        QbIcon('my-icon'),
        QbStepper('my-stepper')
        */
    )
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode('system')
    .useThemeBrand(
        defaultThemeBrand.name
    );