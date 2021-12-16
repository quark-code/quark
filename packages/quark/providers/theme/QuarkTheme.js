
import { Theme } from '@quark-elements/core/providers';
import { Colors } from './color-tokens.js';
import { Typography } from './typography-tokens.js';

export class QuarkTheme extends Theme {
    static get tokens() {
        return {
            ...Colors,
            ...Typography
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