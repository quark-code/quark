
import { Theme } from '../../lib/Theme.js';

const data = {
    // Face
    font: {
        sans: 'system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Noto Sans,sans-serif',
        serif: 'ui-serif,serif',
        mono: 'Dank Mono,Operator Mono,Inconsolata,Fira Mono,ui-monospace,SF Mono,Monaco,Droid Sans Mono,Source Code Pro,monospace'
    },
    // Size
    size: {
        xs: '11px',
        s: '14px',
        m: '20px',
        l: '30px',
        xl: '40px',
    },
    // Weight
    weight: {
        light: '200',
        regular: '400',
        bold: '600'
    },
    // Style
    style: {
        normal: 'normal',
        italic: 'italic'
    },
    // Transform
    transform: {
        none: 'none',
        uppercase: 'uppercase'
    }
}

export function typography(theme) {
    if (theme instanceof Theme) {
        // Font Face
        theme.addToken('theme-typography-headline-font', data.font.serif);
        theme.addToken('theme-typography-title-font', data.font.sans);
        theme.addToken('theme-typography-subtitle-font', data.font.sans);
        theme.addToken('theme-typography-quote-font', data.font.serif);
        theme.addToken('theme-typography-body-font', data.font.sans);
        theme.addToken('theme-typography-placeholder-font', data.font.sans);
        theme.addToken('theme-typography-button-font', data.font.sans);
        theme.addToken('theme-typography-note-font', data.font.sans);
        theme.addToken('theme-typography-code-font', data.font.mono); 

        // Size
        theme.addToken('theme-typography-headline-size', data.size.xl);
        theme.addToken('theme-typography-title-size', data.size.l);
        theme.addToken('theme-typography-subtitle-size', data.size.m);
        theme.addToken('theme-typography-quote-size', data.size.s);
        theme.addToken('theme-typography-body-size', data.size.s);
        theme.addToken('theme-typography-placeholder-size', data.size.s);
        theme.addToken('theme-typography-button-size', data.size.s);
        theme.addToken('theme-typography-note-size', data.size.xs);
        theme.addToken('theme-typography-code-size', data.size.s);

        // Weight
        theme.addToken('theme-typography-headline-weight', data.weight.bold);
        theme.addToken('theme-typography-title-weight', data.weight.bold);
        theme.addToken('theme-typography-subtitle-weight', data.weight.regular);
        theme.addToken('theme-typography-quote-weight', data.weight.regular);
        theme.addToken('theme-typography-body-weight', data.weight.regular);
        theme.addToken('theme-typography-placeholder-weight', data.weight.regular);
        theme.addToken('theme-typography-button-weight', data.weight.bold);
        theme.addToken('theme-typography-note-weight', data.weight.regular);
        theme.addToken('theme-typography-code-weight', data.weight.regular);

        // Style
        theme.addToken('theme-typography-headline-style', data.style.normal);
        theme.addToken('theme-typography-title-style', data.style.normal);
        theme.addToken('theme-typography-subtitle-style', data.style.normal);
        theme.addToken('theme-typography-quote-style', data.style.italic);
        theme.addToken('theme-typography-body-style', data.style.normal);
        theme.addToken('theme-typography-placeholder-style', data.style.italic);
        theme.addToken('theme-typography-button-style', data.style.normal);
        theme.addToken('theme-typography-note-style', data.style.normal);
        theme.addToken('theme-typography-code-style', data.style.normal);

        // Transform
        theme.addToken('theme-typography-headline-transform', data.transform.none);
        theme.addToken('theme-typography-title-transform', data.transform.none);
        theme.addToken('theme-typography-subtitle-transform', data.transform.none);
        theme.addToken('theme-typography-quote-transform', data.transform.none);
        theme.addToken('theme-typography-body-transform', data.transform.none);
        theme.addToken('theme-typography-placeholder-transform', data.transform.none);
        theme.addToken('theme-typography-button-transform', data.transform.uppercase);
        theme.addToken('theme-typography-note-transform', data.transform.none);
        theme.addToken('theme-typography-code-transform', data.transform.none);

        // Font (shorthand)
        // font-style font-variant font-weight font-size/line-height font-family;
        theme.addToken('theme-typography-headline', '{theme-typography-headline-style} normal {theme-typography-headline-weight} {theme-typography-headline-size}/100% {theme-typography-headline-font}');
        theme.addToken('theme-typography-title', '{theme-typography-title-style} normal {theme-typography-title-weight} {theme-typography-title-size}/100% {theme-typography-title-font}');
        theme.addToken('theme-typography-subtitle', '{theme-typography-subtitle-style} normal {theme-typography-subtitle-weight} {theme-typography-subtitle-size}/100% {theme-typography-subtitle-font}');
        theme.addToken('theme-typography-quote', '{theme-typography-quote-style} normal {theme-typography-quote-weight} {theme-typography-quote-size}/100% {theme-typography-quote-font}');
        theme.addToken('theme-typography-body', '{theme-typography-body-style} normal {theme-typography-body-weight} {theme-typography-body-size}/100% {theme-typography-body-font}');
        theme.addToken('theme-typography-placeholder', '{theme-typography-placeholder-style} normal {theme-typography-placeholder-weight} {theme-typography-placeholder-size}/100% {theme-typography-placeholder-font}');
        theme.addToken('theme-typography-button', '{theme-typography-button-style} normal {theme-typography-button-weight} {theme-typography-button-size}/100% {theme-typography-button-font}');
        theme.addToken('theme-typography-note', '{theme-typography-note-style} normal {theme-typography-note-weight} {theme-typography-note-size}/100% {theme-typography-note-font}');
        theme.addToken('theme-typography-code', '{theme-typography-code-style} normal {theme-typography-code-weight} {theme-typography-code-size}/100% {theme-typography-code-font}');

        // Typography TODO - Line spacing & letter spacing?
    } else {
        console.warn('Invalid Theme.');
    }
}