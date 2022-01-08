/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import '../_utils/DesignSystemLayoutImports.js';
import { provideEnterpriseDesignSystem, EnterpriseTheme, ThemeMode, ThemeDensity, TextDirection } from '@quark-elements/enterprise/EnterpriseDesignSystem.js';

const defaultThemeBrand = new EnterpriseTheme('default');

provideEnterpriseDesignSystem()
    .registerThemes(
        defaultThemeBrand
    )
    .withThemeMode(ThemeMode.System)
    .withDensity(ThemeDensity.Comfortable)
    .withDirection(TextDirection.LTR)
    .useThemeBrand(
        defaultThemeBrand.name
    );