/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme } from '@quark-elements/core/providers';
import { ColorTokens } from './tokens/color.js';
import { TypographyTokens } from './tokens/typography.js';
import { ElevationTokens } from './tokens/elevation.js';
import { BorderTokens } from './tokens/border.js';
import { SpacingTokens } from './tokens/spacing.js';

 /**
  * @customtype theme
  * @summary The Material Design theme definition.
  * @description - Some random description.
  * @displayname Material Theme
  */
export class MaterialTheme extends Theme {
    static get tokens() {
        return {
            ...ColorTokens,
            ...TypographyTokens,
            ...ElevationTokens,
            ...BorderTokens,
            ...SpacingTokens
        }
    }

    static get icons() {
        return {
            
        }
    }

    constructor(name, accent, onAccent) {
        super(name);
    }
}