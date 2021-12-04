/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideQuarkDesignSystem, QuarkTheme, AliasIcon } from '@quark-elements/quark';

import { QbButton } from '@quark-elements/quark/elements/button';
import { QbStepper } from '@quark-elements/quark/elements/stepper';
import { QbIcon } from '@quark-elements/quark/elements/icon/QbIcon.js';

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
    .registerComponents(
        QbButton('my-button'),
        QbIcon('my-icon'),
        QbStepper('my-stepper')
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