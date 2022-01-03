/**
@license
MIT License
Copyright (c) 2021 Paul H Mason. All rights reserved.
*/
import { css } from 'lit';

 /**
  * @type designtoken
  * @summary The theme elevation tokens.
  * @description - Some random description.
  */

 /*
export const ElevationTokens = {
    'md-sys-elevation-transition': 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
    'md-sys-elevation-level-0': 'none',
    'md-sys-elevation-level-1': '0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 2px 1px -1px rgba(0, 0, 0, 0.2)',
    'md-sys-elevation-level-2': '0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4)',
    'md-sys-elevation-level-3': '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4)',
    'md-sys-elevation-level-4': '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4)',
    'md-sys-elevation-level-5': '0 12px 16px 1px rgba(0, 0, 0, 0.14), 0 4px 22px 3px rgba(0, 0, 0, 0.12), 0 6px 7px -4px rgba(0, 0, 0, 0.4)'
};
*/

// ELEVATION TOKENS
export const ElevationTokens = {
    'md-sys-elevation-transition': 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
    'md-sys-elevation-level-0': 'none',
    // 1 - 5%
    'md-sys-elevation-level-1': {
        light: '0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 2px 1px -1px rgba(0, 0, 0, 0.2)',
        dark: 'none'
    },
    // 3 - 8%
    'md-sys-elevation-level-2': {
        light: '0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4)',
        dark: 'none'
    },
    // 6 - 11%
    'md-sys-elevation-level-3': {
        light: '0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12), 0 3px 5px -1px rgba(0, 0, 0, 0.4)',
        dark: 'none'
    },
    // 8 - 12%
    'md-sys-elevation-level-4': {
        light: '0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.4)',
        dark: 'none'
    },
    // 12 - 14%
    'md-sys-elevation-level-5': {
        light: '0 12px 16px 1px rgba(0, 0, 0, 0.14), 0 4px 22px 3px rgba(0, 0, 0, 0.12), 0 6px 7px -4px rgba(0, 0, 0, 0.4)',
        dark: 'none'
    },

    /*
    'md-sys-elevation-level-0-overlay': 'rgba(255, 255, 255, 0)',
    // 1 - 5%
    'md-sys-elevation-level-1-overlay': {
        light: 'rgba(255, 255, 255, 0)',
        dark: 'rgba(255, 255, 255, 0.05)'
    },
    // 3 - 8%
    'md-sys-elevation-level-2-overlay': {
        light: 'rgba(255, 255, 255, 0)',
        dark: 'rgba(255, 255, 255, 0.08)'
    },
    // 6 - 11%
    'md-sys-elevation-level-3-overlay': {
        light: 'rgba(255, 255, 255, 0)',
        dark: 'rgba(255, 255, 255, 0.11)'
    },
    // 8 - 12%
    'md-sys-elevation-level-4-overlay': {
        light: 'rgba(255, 255, 255, 0)',
        dark: 'rgba(255, 255, 255, 0.12)'
    },
    // 12 - 14%
    'md-sys-elevation-level-5-overlay': {
        light: 'rgba(255, 255, 255, 0)',
        dark: 'rgba(255, 255, 255, 0.14)'
    }
    */
};


// ELEVATION CLASSES
/**
  * @type cssmodule
  * @summary Elevation Style 0.
  * @description - Some random description.
  */
export const elevation0 = css`
    .elevation-0 {
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-0);
    }
`;

export const elevation1 = css`
    .elevation-1 {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-1);
    }

    .elevation-1:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.05;
        background-color: var(--md-sys-color-primary);
    }
`;

export const elevation2 = css`
    .elevation-2 {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-2);
    }

    .elevation-2:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.08;
        background-color: var(--md-sys-color-primary);
    }
`;

export const elevation3 = css`
    .elevation-3 {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-3);
    }

    .elevation-3:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.11;
        background-color: var(--md-sys-color-primary);
    }
`;

export const elevation4 = css`
    .elevation-4 {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-4);
    }

    .elevation-4:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.12;
        background-color: var(--md-sys-color-primary);
    }
`;

export const elevation5 = css`
    .elevation-5 {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-5);
    }

    .elevation-5:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.14;
        background-color: var(--md-sys-color-primary);
    }
`;

// HOST ELEVATION CLASSES
export const hostElevation0 = css`
    :host {
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-0);
    }
`;

export const hostElevation1 = css`
    :host {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-1);
    }

    :host:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.05;
        background-color: var(--md-sys-color-primary);
    }
`;

export const hostElevation2 = css`
    :host {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-2);
    }

    :host:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.08;
        background-color: var(--md-sys-color-primary);
    }
`;

export const hostElevation3 = css`
    :host {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-3);
    }

    :host:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.11;
        background-color: var(--md-sys-color-primary);
    }
`;

export const hostElevation4 = css`
    :host {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-4);
    }

    :host:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.12;
        background-color: var(--md-sys-color-primary);
    }
`;

export const hostElevation5 = css`
    :host {
        position: relative;
        overflow: hidden;
        transition: var(--md-sys-elevation-transition);
        box-shadow: var(--md-sys-elevation-level-5);
    }

    :host:before {
        content: '';
        position: absolute;
        pointer-events: none;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0.14;
        background-color: var(--md-sys-color-primary);
    }
`;