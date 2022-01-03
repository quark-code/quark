/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideQuarkDesignSystem, QuarkTheme, AliasIcon } from '@quark-elements/quark';

import '@quark-elements/quark/elements/button/qb-button.js';
import '@quark-elements/quark/elements/stepper/qb-stepper.js';
import '@quark-elements/quark/elements/icon/qb-icon.js';

import { EditIcon, ErrorIcon } from './customIcons.js';

const redThemeBrand = new QuarkTheme('red', 'white', 'red');
const blueThemeBrand = new QuarkTheme('blue', 'yellow', 'blue');
const defaultThemeBrand = new QuarkTheme('default', 'white', 'cornflowerblue');

provideQuarkDesignSystem()
    .registerIcons(
        EditIcon('my-edit-icon'),
        ErrorIcon('my-error-icon'),
        AliasIcon('chevron-left', 'back-icon')
    )
    .registerThemes(
        redThemeBrand,
        blueThemeBrand,
        defaultThemeBrand
    )
    .withThemeMode('system')
    .useThemeBrand(
        blueThemeBrand.name
    );