/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { Theme, themeManager } from '../index.js';
import './components';

/**
This is based on the "Wireframe Web Kit (desktop)" for Adobe XD.
 */
class TestTheme extends Theme {
    static get icons() {
        return {
            'chevron-left': '<g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>',
            'chevron-right': '<g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>',
            'chevron-up': '<g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g>',
            'chevron-down': {
                content: '<g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g>',
                size: 24
            }
        }
    }

    constructor(name = null, primaryLight = null, primary = null, primaryDark = null) {
        super(name ?? 'default');

        this._addColorTokens(primaryLight, primary, primaryDark)
        this._addTypographyTokens();
        //this._addIcons();
    }

    _addIcons() {
        this.addIcon('chevron-left', '<g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g>');
        this.addIcon('chevron-right', '<g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g>');
        this.addIcon('chevron-up', '<g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g>');
        this.addIcon('chevron-down', '<g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g>');
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

defaultThemeBrand.aliasIcon('chevron-left', 'foo-bar');
TestTheme.aliasIcon('chevron-left', 'thing-icon');
redThemeBrand.addIcon('chevron-right', '<g><path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"></path></g>');

themeManager.register(defaultThemeBrand);
themeManager.register(redThemeBrand);
themeManager.register(greenThemeBrand);
themeManager.mode = 'system';
themeManager.use(defaultThemeBrand.name);

export { themeManager }
