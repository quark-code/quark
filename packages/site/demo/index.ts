import { Theme, themeManager, ThemeMode, DesignTokenShape } from '@quark-elements/theme';
import '../src/_components/page-container.js';
import '../src/_components/page-navigator.js';
import '../src/_components/component-header.js';
import '../src/_components/page-tabs.js';
import '../src/_components/page-state.js';
import '../src/_components/collapsible-panel.js';
import '../src/_components/collapsible-protected-panel.js';
import '../src/_components/component-part.js';

declare global {
    interface HTMLElement { items: any; }
}

window.addEventListener('load', () => {
    document.getElementById('nav').items = navData;
    document.querySelector('body').removeAttribute('hidden');
});

const navData = [
    {
        label: 'Getting Started',
        items: [
            {
                label: 'Overview',
                url: '#overview'
            },
            {
                label: 'Installation',
                url: '#installation'
            },
            {
                label: 'Other Stuff',
                items: [
                    {
                        label: 'Thing One',
                        url: '#thing-one'
                    },
                    {
                        label: 'Thing Two',
                        url: '#thing-two'
                    },
                    {
                        label: 'Thing Three',
                        items: [
                            {
                                label: 'Apples',
                                url: '#apples'
                            },
                            {
                                label: 'Bananas',
                                url: '#bananas'
                            },
                            {
                                label: 'Oranges',
                                url: '#oranges'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Components',
        items: [
            {
                label: 'Installation',
                url: '#component-installation'
            },
            {
                label: 'Buttons',
                items: [
                    {
                        label: 'Outlined Button',
                        url: '#outlined-button'
                    },
                    {
                        label: 'Filled Button',
                        url: '#filled-button'
                    },
                    {
                        label: 'Flat Button',
                        url: '#flat-button'
                    },
                    {
                        label: 'Text Button',
                        url: '#text-button'
                    }
                ]
            },
            {
                label: 'Steppers',
                items: [
                    {
                        label: 'Horizontal Stepper',
                        url: '#horizontal-stepper'
                    },
                    {
                        label: 'Vertical Stepper',
                        url: '#vertical-stepper'
                    },
                    {
                        label: 'Compact Stepper',
                        url: '#compact-stepper'
                    }
                ]
            },
            {
                label: 'Data Grid',
                url: '#data-grid'
            }
        ]
    }
];

const Colors: DesignTokenShape = {
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

const Typography: DesignTokenShape = {
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

    constructor(name: string) {
        super(name);
    }
}

const defaultThemeBrand = new DocTheme('default');

themeManager.register(defaultThemeBrand);
themeManager.mode = ThemeMode.Dark;
themeManager.use(defaultThemeBrand.name);