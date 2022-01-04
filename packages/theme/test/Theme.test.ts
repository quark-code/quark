/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { Theme } from '../lib/Theme.js';
import { ThemeMode, ThemeDensity, DeviceType, DesignTokenShape, IconShape } from '../lib/Types.js';
import '../lib/ThemeManager.js';

const icons: IconShape = {
    'icon-1': '1',
    'icon-2': '2',
}

const tokens: DesignTokenShape = {
    'test-token': {
        light: {
            desktop: {
                compact: 'red',
                comfortable: 'green',
                sparse: 'blue'
            },
            mobile: {
                compact: 'yellow',
                comfortable: 'orange',
                sparse: 'pink'
            }
        },
        dark: {
            desktop: {
                compact: 'grey',
                comfortable: 'silver',
                sparse: 'aqua'
            },
            mobile: {
                compact: 'magenta',
                comfortable: 'brown',
                sparse: 'white'
            }
        }
    }
}

class TestTheme extends Theme {
    static get icons() {
        return {
            ...icons
        }
    }

    static get tokens() {
        return {
            ...tokens
        }
    }

    constructor(name: string) {
        super(name);
    }
}

describe('theme', () => {
    it('creates a basic theme', async () => {
        const theme = new TestTheme('default');

        expect(theme.name).to.equal('default');
        expect(theme.mode).to.equal(ThemeMode.System);
        expect(theme.density).to.equal(ThemeDensity.Comfortable);
        expect(theme.deviceType).to.equal(DeviceType.Desktop);
        expect(theme.iconVariant).to.equal('default');
    });

    it('sets the tokens correctly', async () => {
        const theme = new TestTheme('default');

        expect(theme.tokenNames.length).to.equal(1);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(1);
        expect(theme.tokenNames.indexOf('test-token')).to.not.equal(-1);
    });

    it('sets the mode correctly', async () => {
        const theme = new TestTheme('default');

        expect(theme.tokenNames.length).to.equal(1);
        expect(theme.tokenNames.indexOf('test-token')).to.not.equal(-1);

        // system
        theme.mode = ThemeMode.System;
        let ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.contain('--test-token: green');
        expect(ss).to.contain('--test-token: silver');

        // light
        theme.mode = ThemeMode.Light;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.not.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.contain('--test-token: green');
        expect(ss).to.not.contain('--test-token: silver');

        // dark
        theme.mode = ThemeMode.Dark;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.not.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.not.contain('--test-token: green');
        expect(ss).to.contain('--test-token: silver');

        // other
        theme.addToken('other-token', 'pink');
        const token = theme.localTokens.get('other-token');
        expect(token.hasDarkValue).to.equal(false);

        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.not.contain('@media (prefers-color-scheme: dark)');
        expect(ss).to.contain('--other-token: pink');
    });

    it('sets the device correctly', async () => {
        const theme = new TestTheme('default');

        expect(theme.tokenNames.length).to.equal(1);
        expect(theme.tokenNames.indexOf('test-token')).to.not.equal(-1);
        theme.mode = ThemeMode.Light;

        // desktop - light
        theme.deviceType = DeviceType.Desktop;
        let ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: green');

        // mobile - light
        theme.deviceType = DeviceType.Mobile;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: orange');

        theme.mode = ThemeMode.Dark;
        
        // desktop - dark
        theme.deviceType = DeviceType.Desktop;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: silver');

        // mobile - dark
        theme.deviceType = DeviceType.Mobile;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: brown');
    });

    it('sets the density correctly', async () => {
        const theme = new TestTheme('default');

        expect(theme.tokenNames.length).to.equal(1);
        expect(theme.tokenNames.indexOf('test-token')).to.not.equal(-1);

        // DESKTOP
        theme.deviceType = DeviceType.Desktop;
        theme.mode = ThemeMode.Light;

        // sparse - light
        theme.density = ThemeDensity.Sparse;
        let ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: blue');

        // comfortable - light
        theme.density = ThemeDensity.Comfortable;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: green');

        // compact - light
        theme.density = ThemeDensity.Compact;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: red');

        theme.mode = ThemeMode.Dark;
        
        // sparse - dark
        theme.density = ThemeDensity.Sparse;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: aqua');

        // comfortable - dark
        theme.density = ThemeDensity.Comfortable;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: silver');

        // compact - dark
        theme.density = ThemeDensity.Compact;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: grey');

        // MOBILE
        theme.deviceType = DeviceType.Mobile;
        theme.mode = ThemeMode.Light;

        // sparse - light
        theme.density = ThemeDensity.Sparse;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: pink');

        // comfortable - light
        theme.density = ThemeDensity.Comfortable;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: orange');

        // compact - light
        theme.density = ThemeDensity.Compact;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: yellow');

        theme.mode = ThemeMode.Dark;
        
        // sparse - dark
        theme.density = ThemeDensity.Sparse;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: white');

        // comfortable - dark
        theme.density = ThemeDensity.Comfortable;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: brown');

        // compact - darke
        theme.density = ThemeDensity.Compact;
        ss = theme.styleSheet;
        expect(ss).to.contain(':root');
        expect(ss).to.contain('--test-token: magenta');
    });

    // INSTANCE TOKENS
    it('can add a single instance token', async () => {
        const theme = new TestTheme('default');

        expect(theme.tokenNames.length).to.equal(1);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(1);
        expect([...theme.localTokens.keys()].length).to.equal(0);

        theme.addToken('instance-token', 'blue');
        expect(theme.tokenNames.length).to.equal(2);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(1);
        expect([...theme.localTokens.keys()].length).to.equal(1);
    });

    it('can add a multiple instance tokens', async () => {
        const theme = new TestTheme('default');
        const tokens = {
            'instance-token-1': 'blue',
            'instance-token-2': 'green',
            'instance-token-3': 'red'
        }

        expect(theme.tokenNames.length).to.equal(1);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(1);
        expect([...theme.localTokens.keys()].length).to.equal(0);

        theme.addTokens(tokens);
        expect(theme.tokenNames.length).to.equal(4);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(1);
        expect([...theme.localTokens.keys()].length).to.equal(3);

        theme.addTokens(tokens);
        expect([...theme.localTokens.keys()].length).to.equal(3);

        theme.addTokens();
        expect([...theme.localTokens.keys()].length).to.equal(3);
    });

    // GLOBAL TOKENS
    it('can add a single global token', async () => {
        const theme = new TestTheme('default');

        expect(theme.tokenNames.length).to.equal(1);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(1);
        expect([...theme.localTokens.keys()].length).to.equal(0);

        TestTheme.addToken('global-token', 'blue');
        expect(theme.tokenNames.length).to.equal(2);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(2);
        expect([...theme.localTokens.keys()].length).to.equal(0);
    });

    it('can add a multiple global tokens', async () => {
        const theme = new TestTheme('default');
        const tokens = {
            'global-token-1': 'blue',
            'global-token-2': 'green',
            'global-token-3': 'red'
        }

        expect(theme.tokenNames.length).to.equal(2);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(2);
        expect([...theme.localTokens.keys()].length).to.equal(0);

        TestTheme.addTokens(tokens);
        expect(theme.tokenNames.length).to.equal(5);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(5);
        expect([...theme.localTokens.keys()].length).to.equal(0);

        TestTheme.addTokens(tokens);
        expect([...TestTheme.globalTokens.keys()].length).to.equal(5);

        TestTheme.addTokens();
        expect([...TestTheme.globalTokens.keys()].length).to.equal(5);

    });
  
    // THEME MANAGER INTEGRATION
    it('can be registered with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red');

        expect(window.themeManager.has('red')).to.equal(false);
        redThemeBrand.register();
        expect(window.themeManager.has('red')).to.equal(true);
    });

    it('can be unregistered with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red');
        
        redThemeBrand.register();
        expect(window.themeManager.has('red')).to.equal(true);

        redThemeBrand.unregister();
        expect(window.themeManager.has('red')).to.equal(false);
    });

    it('can be set as default with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red');

        redThemeBrand.register();
        expect(window.themeManager.has('red')).to.equal(true);
        expect(window.themeManager.defaultThemeName).to.equal(null);

        redThemeBrand.makeDefault();
        expect(window.themeManager.defaultThemeName).to.equal('red');
    });

    it('can be set as active with the global theme manager', async () => {
        const redThemeBrand = new TestTheme('red');

        redThemeBrand.register();
        expect(window.themeManager.activeThemeName).to.equal(null);

        redThemeBrand.use();
        expect(window.themeManager.activeThemeName).to.equal(redThemeBrand.name);
    });
    
    // ICONS
    it('sets global icons', async () => {
        const theme = new TestTheme('default');

        expect(theme.iconNames.length).to.equal(2);
        expect(theme.iconNames.indexOf('icon-1')).to.not.equal(-1);
        expect(theme.iconNames.indexOf('icon-2')).to.not.equal(-1);
        expect([...theme.localIcons.keys()].length).to.equal(0);
        expect([...TestTheme.globalIcons.keys()].length).to.equal(2);
        expect(theme.iconVariants.length).to.equal(1);
        expect(theme.iconVariants.indexOf('default')).to.not.equal(-1);
    });

    it('gets global icons', async () => {
        const theme = new TestTheme('default');

        const icon_1 = theme.getIcon('icon-1');
        const icon_2 = theme.getIcon('icon-2');
        const icon_3 = theme.getIcon('icon-3');

        expect(icon_1).to.not.equal(null);
        expect(icon_2).to.not.equal(null);
        expect(icon_3).to.equal(null);
    });

    it('gets global icon content', async () => {
        const theme = new TestTheme('default');

        const icon_1 = theme.getIconContent('icon-1');
        const icon_2 = theme.getIconContent('icon-2');
        const icon_3 = theme.getIconContent('icon-3');

        expect(icon_1).to.equal('<svg viewBox="0 0 24 24">1</svg>');
        expect(icon_2).to.equal('<svg viewBox="0 0 24 24">2</svg>');
        expect(icon_3).to.equal(null);
    });

    it('can add a single global icon', async () => {
        const theme = new TestTheme('default');
        TestTheme.addIcon('icon-4', '4');

        const icon_4 = theme.getIcon('icon-4');
        const icon_4_content = theme.getIconContent('icon-4');

        expect(icon_4).to.not.equal(null);
        expect(icon_4_content).to.equal('<svg viewBox="0 0 24 24">4</svg>');
    });

    it('can add a multiple global icons', async () => {
        const theme = new TestTheme('default');
        TestTheme.addIcons({
            'icon-5': '5',
            'icon-6': '6'
        });

        const icon_5 = theme.getIcon('icon-5');
        const icon_5_content = theme.getIconContent('icon-5');
        const icon_6 = theme.getIcon('icon-6');
        const icon_6_content = theme.getIconContent('icon-6');

        expect(icon_5).to.not.equal(null);
        expect(icon_5_content).to.equal('<svg viewBox="0 0 24 24">5</svg>');
        expect(icon_6).to.not.equal(null);
        expect(icon_6_content).to.equal('<svg viewBox="0 0 24 24">6</svg>');
    });

    it('can add a single local icon', async () => {
        const theme = new TestTheme('default');
        theme.addIcon('icon-7', '7');

        const icon_7 = theme.getIcon('icon-7');
        const icon_7_content = theme.getIconContent('icon-7');

        expect(icon_7).to.not.equal(null);
        expect(icon_7_content).to.equal('<svg viewBox="0 0 24 24">7</svg>');
    });

    it('can add a multiple local icons', async () => {
        const theme = new TestTheme('default');
        theme.addIcons({
            'icon-8': '8',
            'icon-9': '9'
        });

        const icon_8 = theme.getIcon('icon-8');
        const icon_8_content = theme.getIconContent('icon-8');
        const icon_9 = theme.getIcon('icon-9');
        const icon_9_content = theme.getIconContent('icon-9');

        expect(icon_8).to.not.equal(null);
        expect(icon_8_content).to.equal('<svg viewBox="0 0 24 24">8</svg>');
        expect(icon_9).to.not.equal(null);
        expect(icon_9_content).to.equal('<svg viewBox="0 0 24 24">9</svg>');
    });

    it('can alias a global icon', async () => {
        const theme = new TestTheme('default');
        TestTheme.aliasIcon('icon-4', 'icon-10');

        const icon_4 = theme.getIcon('icon-4');
        const icon_4_content = theme.getIconContent('icon-4');
        const icon_10 = theme.getIcon('icon-10');
        const icon_10_content = theme.getIconContent('icon-10');

        expect(icon_4).to.not.equal(null);
        expect(icon_4_content).to.equal('<svg viewBox="0 0 24 24">4</svg>');
        expect(icon_10).to.not.equal(null);
        expect(icon_10_content).to.equal('<svg viewBox="0 0 24 24">4</svg>');
    });

    it('can alias a local icon', async () => {
        const theme = new TestTheme('default');
        theme.addIcon('icon-7', '7');
        theme.aliasIcon('icon-7', 'icon-11');

        const icon_7 = theme.getIcon('icon-7');
        const icon_7_content = theme.getIconContent('icon-7');
        const icon_11 = theme.getIcon('icon-11');
        const icon_11_content = theme.getIconContent('icon-11');

        expect(icon_7).to.not.equal(null);
        expect(icon_7_content).to.equal('<svg viewBox="0 0 24 24">7</svg>');
        expect(icon_11).to.not.equal(null);
        expect(icon_11_content).to.equal('<svg viewBox="0 0 24 24">7</svg>');
    });

    it('can rename an icon', async () => {
        const theme = new TestTheme('default');

        let icon_4 = theme.getIcon('icon-4');
        let icon_4_content = theme.getIconContent('icon-4');
        let icon_15 = theme.getIcon('icon-15');
        let icon_15_content = theme.getIconContent('icon-15');
        expect(icon_4).to.not.equal(null);
        expect(icon_4_content).to.equal('<svg viewBox="0 0 24 24">4</svg>');
        expect(icon_15).to.equal(null);
        expect(icon_15_content).to.equal(null);

        theme.renameIcon('icon-4', 'icon-15');

        icon_4 = theme.getIcon('icon-4');
        icon_4_content = theme.getIconContent('icon-4');
        icon_15 = theme.getIcon('icon-15');
        icon_15_content = theme.getIconContent('icon-15');

        expect(icon_4).to.equal(null);
        expect(icon_4_content).to.equal(null);
        expect(icon_15).to.not.equal(null);
        expect(icon_15_content).to.equal('<svg viewBox="0 0 24 24">4</svg>');
    });

    it('supports icon variants', async () => {
        const theme = new TestTheme('default');

        const icons = {
            'variant-icon': {
                default: 'variant_2',
                variants: {
                    variant_1: 'v-1',
                    variant_2: 'v-2',
                    variant_3: 'v-3'
                }
            }
        }

        theme.addIcons(icons);

        expect(theme.iconVariant).to.equal('default');

        let variants = theme.iconVariants;
        expect(variants.length).to.equal(4);
        expect(variants).to.contain('default');
        expect(variants).to.contain('variant_1');
        expect(variants).to.contain('variant_2');
        expect(variants).to.contain('variant_3');

        let icon = theme.getIcon('variant-icon');
        let icon_content = theme.getIconContent('variant-icon');

        expect(icon).to.not.equal(null);
        expect(icon_content).to.equal('<svg viewBox="0 0 24 24">v-2</svg>');

        // v-1
        theme.iconVariant = 'variant_1';

        expect(theme.iconVariant).to.equal('variant_1');

        icon = theme.getIcon('variant-icon');
        icon_content = theme.getIconContent('variant-icon');

        expect(icon).to.not.equal(null);
        expect(icon_content).to.equal('<svg viewBox="0 0 24 24">v-1</svg>');

        // v-2
        theme.iconVariant = 'variant_2';

        expect(theme.iconVariant).to.equal('variant_2');

        icon = theme.getIcon('variant-icon');
        icon_content = theme.getIconContent('variant-icon');

        expect(icon).to.not.equal(null);
        expect(icon_content).to.equal('<svg viewBox="0 0 24 24">v-2</svg>');

        // v-3
        theme.iconVariant = 'variant_3';

        expect(theme.iconVariant).to.equal('variant_3');

        icon = theme.getIcon('variant-icon');
        icon_content = theme.getIconContent('variant-icon');

        expect(icon).to.not.equal(null);
        expect(icon_content).to.equal('<svg viewBox="0 0 24 24">v-3</svg>');

        // v-default
        theme.iconVariant = 'default';

        expect(theme.iconVariant).to.equal('default');

        icon = theme.getIcon('variant-icon');
        icon_content = theme.getIconContent('variant-icon');

        expect(icon).to.not.equal(null);
        expect(icon_content).to.equal('<svg viewBox="0 0 24 24">v-2</svg>');
    });
});