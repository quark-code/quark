/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { expect } from '@open-wc/testing';
import { Theme } from '../index.js';

class TestTheme extends Theme {
    constructor(name = null, foreground = null, background = null) {
        super(name ?? 'default');

        this.addToken('test-surface-color', '#FAFAFA').dark('#1E1E1E');
        this.addToken('test-on-surface-color', '#000000').dark('#FFFFFF');
        this.addToken('test-foreground-color', foreground ?? 'white');
        this.addToken('test-background-color', background ?? 'cornflowerblue');
    }
}

describe('theme manager', () => {
    it('creates a singleton theme manager instance', async () => {
        expect(window._themeManager).to.not.equal(null);
    });

    it('sets the default mode to system', async () => {
        window._themeManager.unregisterAll();
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        window._themeManager.register(redThemeBrand);
        window._themeManager.use('red');

        expect(window._themeManager.mode).to.equal('system');
    });

    it('sets the mode to light', async () => {
        window._themeManager.unregisterAll();
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        window._themeManager.register(redThemeBrand);
        window._themeManager.use('red');

        window._themeManager.mode = 'light';
        expect(window._themeManager.mode).to.equal('light');
    });

    it('sets the mode to dark', async () => {
        window._themeManager.unregisterAll();
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        window._themeManager.register(redThemeBrand);
        window._themeManager.use('red');

        window._themeManager.mode = 'dark';
        expect(window._themeManager.mode).to.equal('dark');
    });

    it('can register a theme', async () => {
        window._themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');
        expect(window._themeManager.has('red')).to.equal(false);

        window._themeManager.register(redThemeBrand);
        expect(window._themeManager.has('red')).to.equal(true);
    });

    it('can unregister a theme', async () => {
        window._themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');
        expect(window._themeManager.has('red')).to.equal(false);

        window._themeManager.register(redThemeBrand);
        expect(window._themeManager.has('red')).to.equal(true);
        window._themeManager.use('red');

        window._themeManager.unregister('red');
        expect(window._themeManager.has('red')).to.equal(false);
    });

    it('can be set a theme as active', async () => {
        window._themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');

        window._themeManager.register(redThemeBrand);
        expect(window._themeManager.has('red')).to.equal(true);
        expect(window._themeManager.activeThemeName).to.equal(null);
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(0);

        window._themeManager.use('red');
        expect(window._themeManager.activeThemeName).to.equal('red');

        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(1);
    });

    it('can clear the active theme', async () => {
        window._themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');

        window._themeManager.register(redThemeBrand);
        expect(window._themeManager.has('red')).to.equal(true);
        expect(window._themeManager.activeThemeName).to.equal(null);
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(0);

        window._themeManager.use('red');
        expect(window._themeManager.activeThemeName).to.equal('red');
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(1);

        window._themeManager.clear();
        expect(window._themeManager.activeThemeName).to.equal(null);
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(0);
    });

    it('uses a theme called "default"', async () => {
        window._themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('default', 'white', 'red');

        window._themeManager.register(redThemeBrand);
        expect(window._themeManager.has('default')).to.equal(true);
        expect(window._themeManager.activeThemeName).to.equal(null);

        window._themeManager.use();
        expect(window._themeManager.activeThemeName).to.equal('default');
    });
    
    it('returns the registered theme names', async () => {
        window._themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');
        const greenThemeBrand = new TestTheme('green', 'white', 'green');
        const blueThemeBrand = new TestTheme('blue', 'white', 'blue');

        let names = window._themeManager.themeNames;

        expect(names.length).to.equal(0);

        window._themeManager.register(redThemeBrand);
        window._themeManager.register(greenThemeBrand);
        window._themeManager.register(blueThemeBrand);

        names = window._themeManager.themeNames;

        expect(names.length).to.equal(3);
        expect(names.indexOf('red')).to.not.equal(-1);
        expect(names.indexOf('green')).to.not.equal(-1);
        expect(names.indexOf('blue')).to.not.equal(-1);
        expect(names.indexOf('yellow')).to.equal(-1);
    });
});