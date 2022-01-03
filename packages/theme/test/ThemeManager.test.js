/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { Theme } from '../index.js';

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

    constructor(name) {
        super(name);
    }
}

describe('theme manager', () => {
    it('creates a singleton theme manager instance', async () => {
        expect(window.themeManager).to.not.equal(null);
    });

    it('sets the defaults', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');

        expect(window.themeManager.activeThemeName).to.equal(null);
        expect(window.themeManager.defaultThemeName).to.equal(null);

        window.themeManager.register(theme);
        window.themeManager.use('test');

        expect(window.themeManager.activeThemeName).to.equal('test');

        expect(window.themeManager.mode).to.equal('system');
        expect(theme.mode).to.equal('system');

        expect(window.themeManager.density).to.equal('comfortable');
        expect(theme.density).to.equal('comfortable');

        expect(window.themeManager.iconVariant).to.equal('default');
        expect(theme.iconVariant).to.equal('default');

        expect(window.themeManager.deviceType).to.equal('desktop');
        expect(theme.deviceType).to.equal('desktop');

        expect(window.themeManager.dir).to.equal('ltr');
        expect(window.themeManager.activeThemeName).to.equal('test');
    });

    it('sets the direction', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);
        window.themeManager.use('test');

        window.themeManager.dir = 'rtl';
        expect(window.themeManager.dir).to.equal('rtl');

        window.themeManager.dir = 'ltr';
        expect(window.themeManager.dir).to.equal('ltr');
    });
    
    it('sets the mode', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);
        window.themeManager.use('test');

        window.themeManager.mode = 'light';
        expect(window.themeManager.mode).to.equal('light');
        expect(theme.mode).to.equal('light');

        window.themeManager.mode = 'dark';
        expect(window.themeManager.mode).to.equal('dark');
        expect(theme.mode).to.equal('dark');

        window.themeManager.mode = 'system';
        expect(window.themeManager.mode).to.equal('system');
        expect(theme.mode).to.equal('system');
    });

    it('sets the density', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);
        window.themeManager.use('test');

        window.themeManager.density = 'compact';
        expect(window.themeManager.density).to.equal('compact');
        expect(theme.density).to.equal('compact');

        window.themeManager.density = 'sparse';
        expect(window.themeManager.density).to.equal('sparse');
        expect(theme.density).to.equal('sparse');

        window.themeManager.density = 'comfortable';
        expect(window.themeManager.density).to.equal('comfortable');
        expect(theme.density).to.equal('comfortable');
    });

    it('sets the device type', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);
        window.themeManager.use('test');

        window.themeManager.deviceType = 'mobile';
        expect(window.themeManager.deviceType).to.equal('mobile');
        expect(theme.deviceType).to.equal('mobile');

        window.themeManager.deviceType = 'desktop';
        expect(window.themeManager.deviceType).to.equal('desktop');
        expect(theme.deviceType).to.equal('desktop');
    });

    it('sets the icon variant', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);
        window.themeManager.use('test');

        window.themeManager.iconVariant = 'variant';
        expect(window.themeManager.iconVariant).to.equal('variant');
        expect(theme.iconVariant).to.equal('variant');

        window.themeManager.iconVariant = 'default';
        expect(window.themeManager.iconVariant).to.equal('default');
        expect(theme.iconVariant).to.equal('default');
    });

    it('gets the icon variants', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');

        expect(window.themeManager.iconVariants.length).to.equal(0);

        window.themeManager.register(theme);
        window.themeManager.use('test');

        expect(window.themeManager.iconVariants.length).to.equal(1);
        expect(theme.iconVariants.length).to.equal(1);
        expect(window.themeManager.iconVariants).to.contain('default');
    });

    it('uses a fixed default theme', async () => {
        window.themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('default');

        window.themeManager.register(theme1);
        window.themeManager.register(theme2);

        expect(window.themeManager.defaultThemeName).to.equal(null);

        window.themeManager.use();
        expect(window.themeManager.activeThemeName).to.equal('default');
    });

    it('sets a default theme', async () => {
        window.themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');

        window.themeManager.register(theme1);
        window.themeManager.register(theme2);

        expect(window.themeManager.defaultThemeName).to.equal(null);

        window.themeManager.makeDefault('test2');
        expect(window.themeManager.defaultThemeName).to.equal('test2');

        window.themeManager.use();
        expect(window.themeManager.activeThemeName).to.equal('test2');

        window.themeManager.use('test1');
        expect(window.themeManager.activeThemeName).to.equal('test1');
    });

    it('returns a list of registered theme names', async () => {
        window.themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');

        expect(window.themeManager.themeNames.length).to.equal(0);

        window.themeManager.register(theme1);
        window.themeManager.register(theme2);

        expect(window.themeManager.themeNames.length).to.equal(2);
        expect(window.themeManager.themeNames).to.contain('test1');
        expect(window.themeManager.themeNames).to.contain('test2');

        window.themeManager.unregisterAll();
        expect(window.themeManager.themeNames.length).to.equal(0);
    });

    it('can unregister themes', async () => {
        window.themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');

        expect(window.themeManager.themeNames.length).to.equal(0);

        window.themeManager.register(theme1);
        window.themeManager.register(theme2);
        window.themeManager.use('test1');

        expect(window.themeManager.themeNames.length).to.equal(2);
        expect(window.themeManager.themeNames).to.contain('test1');
        expect(window.themeManager.themeNames).to.contain('test2');

        window.themeManager.unregister('test1');
        expect(window.themeManager.themeNames.length).to.equal(1);
        expect(window.themeManager.themeNames).to.not.contain('test1');
        expect(window.themeManager.themeNames).to.contain('test2');

        window.themeManager.unregister('test2');
        expect(window.themeManager.themeNames.length).to.equal(0);
        expect(window.themeManager.themeNames).to.not.contain('test1');
        expect(window.themeManager.themeNames).to.not.contain('test2');
    });

    it('returns whether or not a theme is registered', async () => {
        window.themeManager.unregisterAll();
        const theme1 = new TestTheme('test1');
        const theme2 = new TestTheme('test2');
        const theme3 = new TestTheme('test3');

        window.themeManager.register(theme1);
        window.themeManager.register(theme2);

        expect(window.themeManager.has('test1')).to.equal(true);
        expect(window.themeManager.has('test2')).to.equal(true);
        expect(window.themeManager.has('test3')).to.equal(false);

        window.themeManager.register(theme3);
        expect(window.themeManager.has('test3')).to.equal(true);
    });

    it('returns the icon names for the active theme', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');

        window.themeManager.register(theme);
        expect(window.themeManager.iconNames.length).to.equal(0);

        window.themeManager.use('test');

        expect(window.themeManager.iconNames.length).to.equal(2);
        expect(window.themeManager.iconNames).to.contain('icon-1');
        expect(window.themeManager.iconNames).to.contain('icon-2');
    });

    it('gets icons', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);

        let icon_1 = window.themeManager.getIcon('icon-1');
        let icon_2 = window.themeManager.getIcon('icon-2');
        let icon_3 = window.themeManager.getIcon('icon-3');

        expect(icon_1).to.equal(null);
        expect(icon_2).to.equal(null);
        expect(icon_3).to.equal(null);

        window.themeManager.use('test');

        icon_1 = window.themeManager.getIcon('icon-1');
        icon_2 = window.themeManager.getIcon('icon-2');
        icon_3 = window.themeManager.getIcon('icon-3');

        expect(icon_1).to.not.equal(null);
        expect(icon_2).to.not.equal(null);
        expect(icon_3).to.equal(null);
    });

    it('gets icon content', async () => {
        window.themeManager.unregisterAll();
        const theme = new TestTheme('test');
        window.themeManager.register(theme);
        

        let icon_1 = window.themeManager.getIconContent('icon-1');
        let icon_2 = window.themeManager.getIconContent('icon-2');
        let icon_3 = window.themeManager.getIconContent('icon-3');

        expect(icon_1).to.equal(null);
        expect(icon_2).to.equal(null);
        expect(icon_3).to.equal(null);

        window.themeManager.use('test');

        icon_1 = window.themeManager.getIconContent('icon-1');
        icon_2 = window.themeManager.getIconContent('icon-2');
        icon_3 = window.themeManager.getIconContent('icon-3');

        expect(icon_1).to.equal('<svg viewBox="0 0 24 24">1</svg>');
        expect(icon_2).to.equal('<svg viewBox="0 0 24 24">2</svg>');
        expect(icon_3).to.equal(null);
    });
});