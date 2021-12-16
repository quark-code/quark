/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/

import { provideMaterialDesignSystem, MaterialTheme } from '../providers/';
import { QmFilledPanel } from '../elements/panel/';
//import { QmKitchenSink } from '../elements/demo/';
import './_components/doc-navigator.js';
import './_components/doc-component-tabs.js';
import './_components/doc-component-header.js';

//console.log(DocNavigator);

const defaultThemeBrand = new MaterialTheme('default');

provideMaterialDesignSystem()
    .registerIcons()
    .registerComponents(
        QmFilledPanel()
    )
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode('system')
    .withDirection('ltr')
    .useThemeBrand(
        defaultThemeBrand.name
    );