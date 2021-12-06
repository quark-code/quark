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

        this.addToken('test-surface-color', '#FAFAFA', '#1E1E1E');
        this.addToken('test-on-surface-color', '#000000', '#FFFFFF');
        this.addToken('test-foreground-color', foreground ?? 'white');
        this.addToken('test-background-color', background ?? 'cornflowerblue');
    }
}

describe('theme manager', () => {
    it('creates a singleton theme manager instance', async () => {
        expect(window.themeManager).to.not.equal(null);
    });

    it('sets the default mode to system', async () => {
        window.themeManager.unregisterAll();
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        window.themeManager.register(redThemeBrand);
        window.themeManager.use('red');

        expect(window.themeManager.mode).to.equal('system');
    });

    it('sets the mode to light', async () => {
        window.themeManager.unregisterAll();
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        window.themeManager.register(redThemeBrand);
        window.themeManager.use('red');

        window.themeManager.mode = 'light';
        expect(window.themeManager.mode).to.equal('light');
    });

    it('sets the mode to dark', async () => {
        window.themeManager.unregisterAll();
        const redThemeBrand = new TestTheme('red', 'white', 'red');
        window.themeManager.register(redThemeBrand);
        window.themeManager.use('red');

        window.themeManager.mode = 'dark';
        expect(window.themeManager.mode).to.equal('dark');
    });

    it('can register a theme', async () => {
        window.themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');
        expect(window.themeManager.has('red')).to.equal(false);

        window.themeManager.register(redThemeBrand);
        expect(window.themeManager.has('red')).to.equal(true);
    });

    it('can unregister a theme', async () => {
        window.themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');
        expect(window.themeManager.has('red')).to.equal(false);

        window.themeManager.register(redThemeBrand);
        expect(window.themeManager.has('red')).to.equal(true);
        window.themeManager.use('red');

        window.themeManager.unregister('red');
        expect(window.themeManager.has('red')).to.equal(false);
    });

    it('can be set a theme as active', async () => {
        window.themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');

        window.themeManager.register(redThemeBrand);
        expect(window.themeManager.has('red')).to.equal(true);
        expect(window.themeManager.activeThemeName).to.equal(null);
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(0);

        window.themeManager.use('red');
        expect(window.themeManager.activeThemeName).to.equal('red');

        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(1);
    });

    it('can clear the active theme', async () => {
        window.themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');

        window.themeManager.register(redThemeBrand);
        expect(window.themeManager.has('red')).to.equal(true);
        expect(window.themeManager.activeThemeName).to.equal(null);
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(0);

        window.themeManager.use('red');
        expect(window.themeManager.activeThemeName).to.equal('red');
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(1);

        window.themeManager.clear();
        expect(window.themeManager.activeThemeName).to.equal(null);
        expect(window.document.querySelectorAll('style[quark-theme]').length).to.equal(0);
    });

    it('uses a theme called "default"', async () => {
        window.themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('default', 'white', 'red');

        window.themeManager.register(redThemeBrand);
        expect(window.themeManager.has('default')).to.equal(true);
        expect(window.themeManager.activeThemeName).to.equal(null);

        window.themeManager.use();
        expect(window.themeManager.activeThemeName).to.equal('default');
    });
    
    it('returns the registered theme names', async () => {
        window.themeManager.unregisterAll();

        const redThemeBrand = new TestTheme('red', 'white', 'red');
        const greenThemeBrand = new TestTheme('green', 'white', 'green');
        const blueThemeBrand = new TestTheme('blue', 'white', 'blue');

        let names = window.themeManager.themeNames;

        expect(names.length).to.equal(0);

        window.themeManager.register(redThemeBrand);
        window.themeManager.register(greenThemeBrand);
        window.themeManager.register(blueThemeBrand);

        names = window.themeManager.themeNames;

        expect(names.length).to.equal(3);
        expect(names.indexOf('red')).to.not.equal(-1);
        expect(names.indexOf('green')).to.not.equal(-1);
        expect(names.indexOf('blue')).to.not.equal(-1);
        expect(names.indexOf('yellow')).to.equal(-1);
    });
});