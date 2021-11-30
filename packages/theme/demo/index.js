/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, themeManager } from '../index.js';

/**
This is based on the "Wireframe Web Kit (desktop)" for Adobe XD.
 */
class TestTheme extends Theme {
    constructor(name = null, primaryLight = null, primary = null, primaryDark = null) {
        super(name ?? 'default');

        this._addColorTokens(primaryLight, primary, primaryDark)
        this._addTypographyTokens();
    }

    _addColorTokens(primaryLight, primary, primaryDark) {
        // Window
        this.addToken('theme-window-color', '#FAFAFA').dark('#1E1E1E');
        this.addToken('theme-on-window-color', 'rgba(0, 0, 0, 0.87)').dark('rgba(255, 255, 255, 0.87)');

        // Surface
        this.addToken('theme-surface-color', '#FFFFFF').dark('#282828');
        this.addToken('theme-on-surface-color', 'rgba(0, 0, 0, 0.87)').dark('rgba(255, 255, 255, 0.87)');

        // Border
        this.addToken('theme-border-color', 'rgba(0, 0, 0, 0.15)').dark('rgba(255, 255, 255, 0.2)');

        // Text
        this.addToken('theme-text-primary-color', 'rgba(0, 0, 0, 0.87)').dark('rgba(255, 255, 255, 0.87)');
        this.addToken('theme-text-secondary-color', 'rgba(0, 0, 0, 0.50)').dark('rgba(255, 255, 255, 0.50)');
        this.addToken('theme-text-disabled-color', 'rgba(0, 0, 0, 0.2)').dark('rgba(255, 255, 255, 0.2)');

        // Primary 
        this.addToken('theme-primary-light-color', primaryLight ?? '#90CAF9'); // 200
        this.addToken('theme-on-primary-light-color', 'rgba(0, 0, 0, 0.87)');

        this.addToken('theme-primary-color', primary ?? '#1976D2'); // 700
        this.addToken('theme-on-primary-color', 'rgba(255, 255, 255, 0.87)');

        this.addToken('theme-primary-dark-color', primaryDark ?? '#0D47A1'); // 900
        this.addToken('theme-on-primary-dark-color', 'rgba(255, 255, 255, 0.87)');
    }

    _addTypographyTokens() {
        // Font Face
        this.addToken('theme-typography-font-serif', 'Georgia');
        this.addToken('theme-typography-font-sans-serif', 'Arial');

        this.addToken('theme-typography-headline-font', '{theme-typography-font-serif}');
        this.addToken('theme-typography-title-font', '{theme-typography-font-sans-serif}');
        this.addToken('theme-typography-subtitle-font', '{theme-typography-font-sans-serif}');
        this.addToken('theme-typography-quote-font', '{theme-typography-font-serif}');
        this.addToken('theme-typography-body-font', '{theme-typography-font-sans-serif}');
        this.addToken('theme-typography-placeholder-font', '{theme-typography-font-sans-serif}');
        this.addToken('theme-typography-button-font', '{theme-typography-font-sans-serif}');
        this.addToken('theme-typography-note-font', '{theme-typography-font-sans-serif}');

        // Size
        this.addToken('theme-typography-size-xl', '40px');
        this.addToken('theme-typography-size-l', '30px');
        this.addToken('theme-typography-size-m', '20px');
        this.addToken('theme-typography-size-s', '14px');
        this.addToken('theme-typography-size-xs', '11px');

        this.addToken('theme-typography-headline-size', '{theme-typography-size-xl}');
        this.addToken('theme-typography-title-size', '{theme-typography-size-l}');
        this.addToken('theme-typography-subtitle-size', '{theme-typography-size-m}');
        this.addToken('theme-typography-quote-size', '{theme-typography-size-s}');
        this.addToken('theme-typography-body-size', '{theme-typography-size-s}');
        this.addToken('theme-typography-placeholder-size', '{theme-typography-size-s}');
        this.addToken('theme-typography-button-size', '{theme-typography-size-s}');
        this.addToken('theme-typography-note-size', '{theme-typography-size-xs}');

        // Weight
        this.addToken('theme-typography-weight-light', '200');
        this.addToken('theme-typography-weight-regular', '400');
        this.addToken('theme-typography-weight-bold', '600');

        this.addToken('theme-typography-headline-weight', '{theme-typography-weight-bold}');
        this.addToken('theme-typography-title-weight', '{theme-typography-weight-bold}');
        this.addToken('theme-typography-subtitle-weight', '{theme-typography-weight-regular}');
        this.addToken('theme-typography-quote-weight', '{theme-typography-weight-regular}');
        this.addToken('theme-typography-body-weight', '{theme-typography-weight-regular}');
        this.addToken('theme-typography-placeholder-weight', '{theme-typography-weight-regular}');
        this.addToken('theme-typography-button-weight', '{theme-typography-weight-bold}');
        this.addToken('theme-typography-note-weight', '{theme-typography-weight-regular}');

        // Style
        this.addToken('theme-typography-headline-style', 'normal');
        this.addToken('theme-typography-title-style', 'normal');
        this.addToken('theme-typography-subtitle-style', 'normal');
        this.addToken('theme-typography-quote-style', 'italic');
        this.addToken('theme-typography-body-style', 'normal');
        this.addToken('theme-typography-placeholder-style', 'italic');
        this.addToken('theme-typography-button-style', 'normal');
        this.addToken('theme-typography-note-style', 'normal');

        // Transform
        this.addToken('theme-typography-headline-transform', 'none');
        this.addToken('theme-typography-title-transform', 'none');
        this.addToken('theme-typography-subtitle-transform', 'none');
        this.addToken('theme-typography-quote-transform', 'none');
        this.addToken('theme-typography-body-transform', 'none');
        this.addToken('theme-typography-placeholder-transform', 'none');
        this.addToken('theme-typography-button-transform', 'uppercase');
        this.addToken('theme-typography-note-transform', 'none');

        // Font (shorthand)
        // font-style font-variant font-weight font-size/line-height font-family
        //this.addToken('theme-typography-headline', '{theme-typography-headline-style} normal {theme-typography-headline-weight:400} {theme-typography-headline-size:{thing-thing:16px}}/100% {theme-typography-headline-font}');
        this.addToken('theme-typography-headline', '{theme-typography-headline-style} normal {theme-typography-headline-weight} {theme-typography-headline-size}/100% {theme-typography-headline-font}');
        this.addToken('theme-typography-title', '{theme-typography-title-style} normal {theme-typography-title-weight} {theme-typography-title-size}/100% {theme-typography-title-font}');
        this.addToken('theme-typography-subtitle', '{theme-typography-subtitle-style} normal {theme-typography-subtitle-weight} {theme-typography-subtitle-size}/100% {theme-typography-subtitle-font}');
        this.addToken('theme-typography-quote', '{theme-typography-quote-style} normal {theme-typography-quote-weight} {theme-typography-quote-size}/100% {theme-typography-quote-font}');
        this.addToken('theme-typography-body', '{theme-typography-body-style} normal {theme-typography-body-weight} {theme-typography-body-size}/100% {theme-typography-body-font}');
        this.addToken('theme-typography-placeholder', '{theme-typography-placeholder-style} normal {theme-typography-placeholder-weight} {theme-typography-placeholder-size}/100% {theme-typography-placeholder-font}');
        this.addToken('theme-typography-button', '{theme-typography-button-style} normal {theme-typography-button-weight} {theme-typography-button-size}/100% {theme-typography-button-font}');
        this.addToken('theme-typography-note', '{theme-typography-note-style} normal {theme-typography-note-weight} {theme-typography-note-size}/100% {theme-typography-note-font}');


        // Typography TODO - Line spacing & letter spacing?
    }
}

// 200, 700, 900
const defaultThemeBrand = new TestTheme();
const redThemeBrand = new TestTheme('red', '#EF9A9A', '#F44336', '#B71C1C');
const greenThemeBrand = new TestTheme('green', '#A5D6A7', '#388E3C', '#1B5E20');

themeManager.register(defaultThemeBrand);
themeManager.register(redThemeBrand);
themeManager.register(greenThemeBrand);
themeManager.mode = 'system';
themeManager.use(defaultThemeBrand.name);

export { themeManager }
