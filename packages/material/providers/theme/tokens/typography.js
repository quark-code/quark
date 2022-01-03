/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css } from 'lit';

 /**
  * @type designtoken
  * @summary The theme typography tokens.
  * @description - Some random description.
  */
export const TypographyTokens = {
    // Font Family
    'md-ref-typeface-brand-regular': "Roboto, 'Noto Sans SC', sans-serif",
    'md-ref-typeface-brand-mono': "'Roboto Mono', monospace",

    // Weight
    'md-ref-typeface-weight-light': '200',
    'md-ref-typeface-weight-regular': '400',
    'md-ref-typeface-weight-medium': '500', 
    'md-ref-typeface-weight-bold': '600',

    // Font (shorthand)
    'md-sys-typescale-display-large': '{md-ref-typeface-weight-regular} 57px/64px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-display-medium': '{md-ref-typeface-weight-regular} 45px/52px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-display-small': '{md-ref-typeface-weight-regular} 36px/44px {md-ref-typeface-brand-regular}',

    'md-sys-typescale-headline-large': '{md-ref-typeface-weight-regular} 32px/40px {md-ref-typeface-brand-regular}', 
    'md-sys-typescale-headline-medium': '{md-ref-typeface-weight-regular} 28px/36px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-headline-small': '{md-ref-typeface-weight-regular} 24px/32px {md-ref-typeface-brand-regular}',

    'md-sys-typescale-title-large': '{md-ref-typeface-weight-medium} 22px/28px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-title-medium': '{md-ref-typeface-weight-medium} 16px/24px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-title-small': '{md-ref-typeface-weight-medium} 14px/20px {md-ref-typeface-brand-regular}',

    'md-sys-typescale-label-large': '{md-ref-typeface-weight-medium} 14px/20px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-label-medium': '{md-ref-typeface-weight-medium} 12px/16px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-label-small': '{md-ref-typeface-weight-medium} 11px/16px {md-ref-typeface-brand-regular}',

    'md-sys-typescale-body-large': '{md-ref-typeface-weight-regular} 16px/24px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-body-medium': '{md-ref-typeface-weight-regular} 14px/20px {md-ref-typeface-brand-regular}',
    'md-sys-typescale-body-small': '{md-ref-typeface-weight-regular} 12px/16px {md-ref-typeface-brand-regular}',

    'md-sys-typescale-code-large': '{md-ref-typeface-weight-regular} 16px/24px {md-ref-typeface-brand-mono}',
    'md-sys-typescale-code-medium': '{md-ref-typeface-weight-regular} 14px/20px {md-ref-typeface-brand-mono}',
    'md-sys-typescale-code-small': '{md-ref-typeface-weight-regular} 12px/16px {md-ref-typeface-brand-mono}',

    // Tracking (Letter Spacing)
    'md-sys-typescale-display-large-tracking': '0px',
    'md-sys-typescale-display-medium-tracking': '0px',
    'md-sys-typescale-display-small-tracking': '0px',

    'md-sys-typescale-headline-large-tracking': '0px',
    'md-sys-typescale-headline-medium-tracking': '0px',
    'md-sys-typescale-headline-small-tracking': '0px',

    'md-sys-typescale-title-large-tracking': '0px',
    'md-sys-typescale-title-medium-tracking': '0.15px',
    'md-sys-typescale-title-small-tracking': '0.1px',

    'md-sys-typescale-label-large-tracking': '0.1px',
    'md-sys-typescale-label-medium-tracking': '0.5px',
    'md-sys-typescale-label-small-tracking': '0.5px',

    'md-sys-typescale-body-large-tracking': '0.15px',
    'md-sys-typescale-body-medium-tracking': '0.25px',
    'md-sys-typescale-body-small-tracking': '0.4px',

    'md-sys-typescale-code-large-tracking': '0px',
    'md-sys-typescale-code-medium-tracking': '0px',
    'md-sys-typescale-code-small-tracking': '0px'
}

// Display
export const displayLarge = css`
    .typography-display-large {
        font: var(--md-sys-typescale-display-large);
        letter-spacing: var(--md-sys-typescale-display-large-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const displayMedium = css`
    .typography-display-medium {
        font: var(--md-sys-typescale-display-medium);
        letter-spacing: var(--md-sys-typescale-display-medium-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const displaySmall = css`
    .typography-display-small {
        font: var(--md-sys-typescale-display-small);
        letter-spacing: var(--md-sys-typescale-display-small-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

// Headline
export const headlineLarge = css`
    .typography-headline-large {
        font: var(--md-sys-typescale-headline-large);
        letter-spacing: var(--md-sys-typescale-headline-large-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const headlineMedium = css`
    .typography-headline-medium {
        font: var(--md-sys-typescale-headline-medium);
        letter-spacing: var(--md-sys-typescale-headline-medium-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const headlineSmall = css`
    .typography-headline-small {
        font: var(--md-sys-typescale-headline-small);
        letter-spacing: var(--md-sys-typescale-headline-small-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

// Title
export const titleLarge = css`
    .typography-title-large {
        font: var(--md-sys-typescale-title-large);
        letter-spacing: var(--md-sys-typescale-title-large-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const titleMedium = css`
    .typography-title-medium {
        font: var(--md-sys-typescale-title-medium);
        letter-spacing: var(--md-sys-typescale-title-medium-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const titleSmall = css`
    .typography-title-small {
        font: var(--md-sys-typescale-title-small);
        letter-spacing: var(--md-sys-typescale-title-small-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

// Label
export const labelLarge = css`
    .typography-label-large {
        font: var(--md-sys-typescale-label-large);
        letter-spacing: var(--md-sys-typescale-label-large-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const labelMedium = css`
    .typography-label-medium {
        font: var(--md-sys-typescale-label-medium);
        letter-spacing: var(--md-sys-typescale-label-medium-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

export const labelSmall = css`
    .typography-label-small {
        font: var(--md-sys-typescale-label-small);
        letter-spacing: var(--md-sys-typescale-label-small-tracking);
        -webkit-font-smoothing: antialiased;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`;

// Body
export const bodyLarge = css`
    .typography-body-large {
        font: var(--md-sys-typescale-body-large);
        letter-spacing: var(--md-sys-typescale-body-large-tracking);
        -webkit-font-smoothing: antialiased;
    }
`;

export const bodyMedium = css`
    .typography-body-medium {
        font: var(--md-sys-typescale-body-medium);
        letter-spacing: var(--md-sys-typescale-body-medium-tracking);
        -webkit-font-smoothing: antialiased;
    }
`;

export const bodySmall = css`
    .typography-body-small {
        font: var(--md-sys-typescale-body-small);
        letter-spacing: var(--md-sys-typescale-body-small-tracking);
        -webkit-font-smoothing: antialiased;
    }
`;

// Code
export const codeLarge = css`
    .typography-code-large {
        font: var(--md-sys-typescale-code-large);
        letter-spacing: var(--md-sys-typescale-code-large-tracking);
        -webkit-font-smoothing: antialiased;
    }
`;

export const codeMedium = css`
    .typography-code-medium {
        font: var(--md-sys-typescale-code-medium);
        letter-spacing: var(--md-sys-typescale-code-medium-tracking);
        -webkit-font-smoothing: antialiased;
    }
`;

export const codeSmall = css`
    .typography-code-small {
        font: var(--md-sys-typescale-code-small);
        letter-spacing: var(--md-sys-typescale-code-small-tracking);
        -webkit-font-smoothing: antialiased;
    }
`;