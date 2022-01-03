/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { Theme } from '../lib/Theme.js';
import { themeManager } from '../lib/ThemeManager.js';
import { ThemeMode, DeviceType, ThemeDensity, TextDirection } from '../lib/Types.js';

class TestTheme extends Theme {
    static get icons() {
        return {
            'icon-1': '1',
            'icon-2': '2',
        }
    }

    static get tokens() {
        return {
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
    }

    constructor(name: string) {
        super(name);
    }
}

describe('theme manager', () => {
    it('creates a singleton theme manager instance', async () => {
        expect(themeManager).to.not.equal(null);
    });

    it('sets the defaults', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');

        expect(themeManager.activeThemeName).to.equal(null);
        expect(themeManager.defaultThemeName).to.equal(null);

        themeManager.register(theme);
        themeManager.use('test');

        expect(themeManager.activeThemeName).to.equal('test');

        expect(themeManager.mode).to.equal(ThemeMode.System);
        expect(theme.mode).to.equal(ThemeMode.System);

        expect(themeManager.density).to.equal(ThemeDensity.Comfortable);
        expect(theme.density).to.equal(ThemeDensity.Comfortable);

        expect(themeManager.iconVariant).to.equal('default');
        expect(theme.iconVariant).to.equal('default');

        expect(themeManager.deviceType).to.equal(DeviceType.Desktop);
        expect(theme.deviceType).to.equal(DeviceType.Desktop);

        expect(themeManager.dir).to.equal(TextDirection.LTR);
        expect(themeManager.activeThemeName).to.equal('test');
    });

    it('sets the direction', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);
        themeManager.use('test');

        themeManager.dir = TextDirection.RTL;
        expect(themeManager.dir).to.equal(TextDirection.RTL);

        themeManager.dir = TextDirection.LTR;
        expect(themeManager.dir).to.equal(TextDirection.LTR);
    });
    
    it('sets the mode', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);
        themeManager.use('test');

        themeManager.mode = ThemeMode.Light;
        expect(themeManager.mode).to.equal(ThemeMode.Light);
        expect(theme.mode).to.equal(ThemeMode.Light);

        themeManager.mode = ThemeMode.Dark;
        expect(themeManager.mode).to.equal(ThemeMode.Dark);
        expect(theme.mode).to.equal(ThemeMode.Dark);

        themeManager.mode = ThemeMode.System;
        expect(themeManager.mode).to.equal(ThemeMode.System);
        expect(theme.mode).to.equal(ThemeMode.System);
    });

    it('sets the density', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);
        themeManager.use('test');

        themeManager.density = ThemeDensity.Compact;
        expect(themeManager.density).to.equal(ThemeDensity.Compact);
        expect(theme.density).to.equal(ThemeDensity.Compact);

        themeManager.density = ThemeDensity.Sparse;
        expect(themeManager.density).to.equal(ThemeDensity.Sparse);
        expect(theme.density).to.equal(ThemeDensity.Sparse);

        themeManager.density = ThemeDensity.Comfortable;
        expect(themeManager.density).to.equal(ThemeDensity.Comfortable);
        expect(theme.density).to.equal(ThemeDensity.Comfortable);
    });

    it('sets the device type', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);
        themeManager.use('test');

        themeManager.deviceType = DeviceType.Mobile;
        expect(themeManager.deviceType).to.equal(DeviceType.Mobile);
        expect(theme.deviceType).to.equal(DeviceType.Mobile);

        themeManager.deviceType = DeviceType.Desktop;
        expect(themeManager.deviceType).to.equal(DeviceType.Desktop);
        expect(theme.deviceType).to.equal(DeviceType.Desktop);
    });

    it('sets the icon variant', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);
        themeManager.use('test');

        themeManager.iconVariant = 'variant';
        expect(themeManager.iconVariant).to.equal('variant');
        expect(theme.iconVariant).to.equal('variant');

        themeManager.iconVariant = 'default';
        expect(themeManager.iconVariant).to.equal('default');
        expect(theme.iconVariant).to.equal('default');
    });

    it('gets the icon variants', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');

        expect(themeManager.iconVariants.length).to.equal(0);

        themeManager.register(theme);
        themeManager.use('test');

        expect(themeManager.iconVariants.length).to.equal(1);
        expect(theme.iconVariants.length).to.equal(1);
        expect(themeManager.iconVariants).to.contain('default');
    });

    it('uses a fixed default theme', async () => {
        themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('default');

        themeManager.register(theme1);
        themeManager.register(theme2);

        expect(themeManager.defaultThemeName).to.equal(null);

        themeManager.use();
        expect(themeManager.activeThemeName).to.equal('default');
    });

    it('sets a default theme', async () => {
        themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');

        themeManager.register(theme1);
        themeManager.register(theme2);

        expect(themeManager.defaultThemeName).to.equal(null);

        themeManager.makeDefault('test2');
        expect(themeManager.defaultThemeName).to.equal('test2');

        themeManager.use();
        expect(themeManager.activeThemeName).to.equal('test2');

        themeManager.use('test1');
        expect(themeManager.activeThemeName).to.equal('test1');
    });

    it('returns a list of registered theme names', async () => {
        themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');

        expect(themeManager.themeNames.length).to.equal(0);

        themeManager.register(theme1);
        themeManager.register(theme2);

        expect(themeManager.themeNames.length).to.equal(2);
        expect(themeManager.themeNames).to.contain('test1');
        expect(themeManager.themeNames).to.contain('test2');

        themeManager.unregisterAll();
        expect(themeManager.themeNames.length).to.equal(0);
    });

    it('can unregister themes', async () => {
        themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');

        expect(themeManager.themeNames.length).to.equal(0);

        themeManager.register(theme1);
        themeManager.register(theme2);
        themeManager.use('test1');

        expect(themeManager.themeNames.length).to.equal(2);
        expect(themeManager.themeNames).to.contain('test1');
        expect(themeManager.themeNames).to.contain('test2');

        themeManager.unregister('test1');
        expect(themeManager.themeNames.length).to.equal(1);
        expect(themeManager.themeNames).to.not.contain('test1');
        expect(themeManager.themeNames).to.contain('test2');

        themeManager.unregister('test2');
        expect(themeManager.themeNames.length).to.equal(0);
        expect(themeManager.themeNames).to.not.contain('test1');
        expect(themeManager.themeNames).to.not.contain('test2');
    });

    it('returns whether or not a theme is registered', async () => {
        themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');
        const theme3 = new TestTheme('test3');

        themeManager.register(theme1);
        themeManager.register(theme2);

        expect(themeManager.has('test1')).to.equal(true);
        expect(themeManager.has('test2')).to.equal(true);
        expect(themeManager.has('test3')).to.equal(false);

        themeManager.register(theme3);
        expect(themeManager.has('test3')).to.equal(true);
    });

    it('returns the icon names for the active theme', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');

        themeManager.register(theme);
        expect(themeManager.iconNames.length).to.equal(0);

        themeManager.use('test');

        expect(themeManager.iconNames.length).to.equal(2);
        expect(themeManager.iconNames).to.contain('icon-1');
        expect(themeManager.iconNames).to.contain('icon-2');
    });

    it('gets icons', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);

        let icon_1 = themeManager.getIcon('icon-1');
        let icon_2 = themeManager.getIcon('icon-2');
        let icon_3 = themeManager.getIcon('icon-3');

        expect(icon_1).to.equal(null);
        expect(icon_2).to.equal(null);
        expect(icon_3).to.equal(null);

        themeManager.use('test');

        icon_1 = themeManager.getIcon('icon-1');
        icon_2 = themeManager.getIcon('icon-2');
        icon_3 = themeManager.getIcon('icon-3');

        expect(icon_1).to.not.equal(null);
        expect(icon_2).to.not.equal(null);
        expect(icon_3).to.equal(null);
    });

    it('gets icon content', async () => {
        themeManager.unregisterAll();
        const theme = new TestTheme('test');
        themeManager.register(theme);
        

        let icon_1 = themeManager.getIconContent('icon-1');
        let icon_2 = themeManager.getIconContent('icon-2');
        let icon_3 = themeManager.getIconContent('icon-3');

        expect(icon_1).to.equal(null);
        expect(icon_2).to.equal(null);
        expect(icon_3).to.equal(null);

        themeManager.use('test');

        icon_1 = themeManager.getIconContent('icon-1');
        icon_2 = themeManager.getIconContent('icon-2');
        icon_3 = themeManager.getIconContent('icon-3');

        expect(icon_1).to.equal('<svg viewBox="0 0 24 24">1</svg>');
        expect(icon_2).to.equal('<svg viewBox="0 0 24 24">2</svg>');
        expect(icon_3).to.equal(null);
    });
});