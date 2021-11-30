/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { provideBasicDesignSystem, BasicTheme } from '@quark-elements/basic';
import { QbButton } from '@quark-elements/basic/elements/button';
import { QbStepper } from '@quark-elements/basic/elements/stepper';

const redThemeBrand = new BasicTheme('red', 'white', 'red');
const blueThemeBrand = new BasicTheme('blue', 'yellow', 'blue');
const defaultThemeBrand = new BasicTheme('default', 'white', 'cornflowerblue');

provideBasicDesignSystem()
    .registerComponents(
        QbButton('my-button'),
        QbStepper('my-stepper')
    )
    .registerThemeBrands(
        redThemeBrand,
        blueThemeBrand,
        defaultThemeBrand
    )
    .withThemeMode('system')
    .useThemeBrand(
        blueThemeBrand.name
    );