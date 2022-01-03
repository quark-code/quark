/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, themeManager } from '@quark-elements/theme';

import '../_components/page-container.js';
import '../_components/page-navigator.js';
import '../_components/page-state.js';

const Colors = {
    // Window
    'theme-window-color': {
        light: '#FAFAFA',
        dark: '#1E1E1E'
    },
    'theme-on-window-color': {
        light: 'rgba(0, 0, 0, 0.87)',
        dark: 'rgba(255, 255, 255, 0.87)'
    },

    // Surface
    'theme-surface-color': {
        light: '#FFFFFF',
        dark: '#282828'
    },
    'theme-on-surface-color': {
        light: 'rgba(0, 0, 0, 0.87)',
        dark: 'rgba(255, 255, 255, 0.87)'
    },

    // Border
    'theme-border-color': {
        light: 'rgba(0, 0, 0, 0.15)',
        dark: 'rgba(255, 255, 255, 0.2)'
    },

    // Text
    'theme-text-primary-color': {
        light: 'rgba(0, 0, 0, 0.87)',
        dark: 'rgba(255, 255, 255, 0.87)'
    },
    'theme-text-secondary-color': {
        light: 'rgba(0, 0, 0, 0.50)',
        dark: 'rgba(255, 255, 255, 0.50)'
    },
    'theme-text-disabled-color': {
        light: 'rgba(0, 0, 0, 0.2)',
        dark: 'rgba(255, 255, 255, 0.2)'
    },
    
    // Primary
    'theme-primary-light-color': '#90CAF9',
    'theme-on-primary-light-color': 'rgba(0, 0, 0, 0.87)',

    'theme-primary-color': '#1976D2',
    'theme-on-primary-color': 'rgba(255, 255, 255, 0.87)',

    'theme-primary-dark-color': '#0D47A1',
    'theme-on-primary-dark-color': 'rgba(255, 255, 255, 0.87)'
};

const Typography = {
    'theme-typography-headline': 'normal 500 40px/100% Roboto',
    'theme-typography-title': 'normal 500 30px/100% Roboto',
    'theme-typography-subtitle': 'normal 400 20px/100% Roboto',
    'theme-typography-quote': 'italic 400 14px/100% Roboto',
    'theme-typography-body': 'normal 400 14px/100% Roboto',
    'theme-typography-placeholder': 'italic 400 14px/100% Roboto',
    'theme-typography-button': 'normal 500 14px/100% Roboto',
    'theme-typography-note': 'normal 400 11px/100% Roboto',
    'theme-typography-code': "normal 400 14px/100% 'Roboto Mono'"
}

class DocTheme extends Theme {
    static get icons() {
        return {

        }
    }

    static get tokens() {
        return {
            ...Colors,
            ...Typography
        }
    }

    constructor(name) {
        super(name);

    }
}

const defaultThemeBrand = new DocTheme('default');

themeManager.register(defaultThemeBrand);
themeManager.mode = 'dark';
themeManager.use(defaultThemeBrand.name);
